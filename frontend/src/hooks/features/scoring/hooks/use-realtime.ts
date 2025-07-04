import { useEffect, useCallback, useRef, useMemo } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { WebSocketServiceAdapter } from '../services/websocket.service';
import { CacheService } from '../services/cache.service';
import { DataTransformationService } from '../services/data-transformation.service';
import { MatchScoreData } from '../types/index';

interface UseRealtimeProps {
  selectedMatchId: string;
  selectedFieldId: string | null;
  tournamentId: string;
  isUserActive: boolean;
}

export function useRealtime({ selectedMatchId, selectedFieldId, tournamentId, isUserActive }: UseRealtimeProps) {
  const queryClient = useQueryClient();
  const previousMatchIdRef = useRef<string | null>(null);
  
  // Create stable service instances to prevent infinite loops
  const webSocketService = useMemo(() => new WebSocketServiceAdapter(), []);
  const cacheService = useMemo(() => new CacheService(queryClient), [queryClient]);
  const transformationService = useMemo(() => new DataTransformationService(), []);

  // Subscribe to WebSocket score updates
  useEffect(() => {
    if (!selectedMatchId) return;

    const handleScoreUpdate = (data: {
      matchId: string;
      fieldId?: string;
      redAutoScore?: number;
      redDriveScore?: number;
      redTotalScore?: number;
      blueAutoScore?: number;
      blueDriveScore?: number;
      blueTotalScore?: number;
      [key: string]: any;
    }) => {
      console.log("Score update received in control-match:", data, "selectedFieldId:", selectedFieldId);
      
      // Accept updates if no field filtering or field matches
      const shouldAccept = 
        !selectedFieldId || // No field selected in control
        !data.fieldId || // No fieldId in update (tournament-wide)
        data.fieldId === selectedFieldId; // Exact field match
      
      if (!shouldAccept) {
        console.log(`Ignoring score update for different field: ${data.fieldId} (expected: ${selectedFieldId})`);
        return;
      }

      if (data.matchId === selectedMatchId) {
        console.log("Score update received for selected match:", data);
        
        // Only update cache if user is not actively typing
        if (!isUserActive) {
          cacheService.updateScoreCache(selectedMatchId, data);
        } else {
          console.log("🚫 Skipping cache update (user actively typing)");
        }
      }
    };

    const unsubscribe = webSocketService.onScoreUpdate(handleScoreUpdate);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedMatchId, selectedFieldId, isUserActive, webSocketService, cacheService]);

  const sendRealtimeUpdate = useCallback((scoreData: MatchScoreData) => {
    if (!selectedMatchId) return;

    const realtimeData = transformationService.transformToRealtimeFormat(scoreData, {
      matchId: selectedMatchId,
      fieldId: selectedFieldId || undefined,
      tournamentId,
    });

    console.log("📊 Real-time update calculations:", realtimeData);
    console.log("Sending real-time score update (no DB persist):", realtimeData);
    
    webSocketService.sendRealtimeScoreUpdate(realtimeData);
  }, [selectedMatchId, selectedFieldId, tournamentId, webSocketService, transformationService]);

  const broadcastForNewMatch = useCallback((scoreData: MatchScoreData) => {
    // Only broadcast if the match ID actually changed
    if (!selectedMatchId || previousMatchIdRef.current === selectedMatchId) {
      return;
    }
    
    previousMatchIdRef.current = selectedMatchId;
    
    const realtimeData = transformationService.transformToRealtimeFormat(scoreData, {
      matchId: selectedMatchId,
      fieldId: selectedFieldId || undefined,
      tournamentId,
    });
    
    console.log("📡 Broadcasting scores for NEW match:", selectedMatchId, realtimeData);
    webSocketService.sendRealtimeScoreUpdate(realtimeData);
  }, [selectedMatchId, selectedFieldId, tournamentId, webSocketService, transformationService]);

  return {
    sendRealtimeUpdate,
    broadcastForNewMatch,
  };
}
