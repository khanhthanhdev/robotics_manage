import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/common/use-websocket";
import { QueryKeys } from "@/lib/query-keys";

interface UseWebSocketSubscriptionsProps {
  tournamentId: string;
  selectedFieldId: string | null;
  selectedMatchId: string;
  onTimerUpdate?: (data: any) => void;
  onScoreUpdate?: (data: any) => void;
  onMatchUpdate?: (data: any) => void;
  onMatchStateChange?: (data: any) => void;
}

interface WebSocketSubscriptionsReturn {
  // WebSocket actions
  joinTournament: (tournamentId: string) => void;
  joinFieldRoom: (fieldId: string) => void;
  leaveFieldRoom: (fieldId: string) => void;
  changeDisplayMode: (settings: any) => void; // Updated to match useWebSocket signature
  sendAnnouncement: (message: string) => void;
  sendMatchUpdate: (data: any) => void;
  sendMatchStateChange: (data: any) => void;
  sendScoreUpdate: (data: any) => void;
  
  // Connection state
  isConnected: boolean;
  currentTournament: string | null;
}

export function useWebSocketSubscriptions({
  tournamentId,
  selectedFieldId,
  selectedMatchId,
  onTimerUpdate,
  onScoreUpdate,
  onMatchUpdate,
  onMatchStateChange,
}: UseWebSocketSubscriptionsProps): WebSocketSubscriptionsReturn {
  const queryClient = useQueryClient();

  // Connect to WebSocket with the tournament ID and auto-connect
  const {
    isConnected,
    currentTournament,
    joinTournament,
    changeDisplayMode,
    sendAnnouncement,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    subscribe,
    joinFieldRoom,
    leaveFieldRoom,
  } = useWebSocket({ tournamentId, autoConnect: true });
  // Join tournament and field rooms on mount
  useEffect(() => {
    if (!tournamentId) return;
    
    // Handle "all tournaments" mode - don't join a specific tournament room
    if (tournamentId === "all") {
      console.log("Monitoring all tournaments mode");
      // In "all tournaments" mode, we still join field room if selected
      if (selectedFieldId) {
        joinFieldRoom(selectedFieldId);
        console.log(`Joining field room: ${selectedFieldId} for all tournaments`);
      }
    } else {
      // Join specific tournament room
      joinTournament(tournamentId);
      console.log(`Joining tournament: ${tournamentId}`);
      
      // Then join field room if selected
      if (selectedFieldId) {
        joinFieldRoom(selectedFieldId);
        console.log(`Joining field room: ${selectedFieldId} in tournament: ${tournamentId}`);
      }
    }
    
    // On unmount, leave the field room
    return () => {
      if (selectedFieldId) {
        leaveFieldRoom(selectedFieldId);
        console.log(`Leaving field room: ${selectedFieldId}`);
      }
    };
  }, [tournamentId, selectedFieldId, joinTournament, joinFieldRoom, leaveFieldRoom]);

  // Listen for timer updates from WebSocket
  useEffect(() => {
    if (!onTimerUpdate) return;    const handleTimerUpdate = (data: any) => {
      console.log("Timer update received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring timer update for different field: ${data.fieldId}`);
        return;
      }

      // In "all tournaments" mode, accept updates from any tournament
      // In specific tournament mode, filter by tournament ID
      if (tournamentId !== "all" && data.tournamentId && data.tournamentId !== tournamentId) {
        console.log(`Ignoring timer update for different tournament: ${data.tournamentId}`);
        return;
      }

      onTimerUpdate(data);
    };

    // Subscribe to timer updates using the subscribe method from useWebSocket
    const unsubscribe = subscribe("timer_update", handleTimerUpdate);

    // Cleanup subscription when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedFieldId, onTimerUpdate]);

  // Subscribe to WebSocket score updates and update React Query cache
  useEffect(() => {
    if (!selectedMatchId || !onScoreUpdate) return;    const handleScoreUpdate = (data: {
      matchId: string;
      fieldId?: string;
      tournamentId?: string;
      redAutoScore?: number;
      redDriveScore?: number;
      redTotalScore?: number;
      blueAutoScore?: number;
      blueDriveScore?: number;
      blueTotalScore?: number;
      [key: string]: any;
    }) => {
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring score update for different field: ${data.fieldId}`);
        return;
      }
      
      // In "all tournaments" mode, accept updates from any tournament
      // In specific tournament mode, filter by tournament ID
      if (tournamentId !== "all" && data.tournamentId && data.tournamentId !== tournamentId) {
        console.log(`Ignoring score update for different tournament: ${data.tournamentId}`);
        return;
      }
      
      if (data.matchId === selectedMatchId) {
        console.log("Score update received for selected match:", data);
        
        // Update the React Query cache directly
        queryClient.setQueryData(
          ["match-scores", selectedMatchId],
          (oldData: Record<string, any> | undefined) => ({
            ...(oldData || {}),
            ...data,
          })
        );

        onScoreUpdate(data);
      }
    };

    // Subscribe to score updates using the websocket hook
    const unsubscribe = subscribe("score_update", handleScoreUpdate);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedMatchId, subscribe, queryClient, selectedFieldId, onScoreUpdate]);

  // Listen for match updates from WebSocket
  useEffect(() => {
    if (!onMatchUpdate) return;    const handleMatchUpdate = (data: any) => {
      console.log("Match update received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring match update for different field: ${data.fieldId}`);
        return;
      }
      
      // In "all tournaments" mode, accept updates from any tournament
      // In specific tournament mode, filter by tournament ID
      if (tournamentId !== "all" && data.tournamentId && data.tournamentId !== tournamentId) {
        console.log(`Ignoring match update for different tournament: ${data.tournamentId}`);
        return;
      }
      
      // If this is the currently selected match, update the cache
      if (data.id === selectedMatchId) {
        queryClient.setQueryData(
          ["match", selectedMatchId],
          (oldData: Record<string, any> | undefined) => {
            if (!oldData) return data;
            
            return {
              ...oldData,
              ...data,
            };
          }
        );
      }

      onMatchUpdate(data);
    };
    
    // Subscribe to match updates
    const unsubscribe = subscribe("match_update", handleMatchUpdate);
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedMatchId, queryClient, selectedFieldId, onMatchUpdate]);

  // Listen for match state changes from WebSocket
  useEffect(() => {
    if (!onMatchStateChange) return;    const handleMatchStateChange = (data: any) => {
      console.log("Match state change received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring match state update for different field: ${data.fieldId}`);
        return;
      }
      
      // In "all tournaments" mode, accept updates from any tournament
      // In specific tournament mode, filter by tournament ID
      if (tournamentId !== "all" && data.tournamentId && data.tournamentId !== tournamentId) {
        console.log(`Ignoring match state update for different tournament: ${data.tournamentId}`);
        return;
      }
      
      // Update the selected match if it's the same match
      if (data.matchId === selectedMatchId) {
        // Update match query cache with new status
        queryClient.setQueryData(
          QueryKeys.matches.byId(selectedMatchId),
          (oldData: Record<string, any> | undefined) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              status: data.status || oldData.status,
            };
          }
        );
      }

      onMatchStateChange(data);
    };
    
    // Subscribe to match state changes
    const unsubscribe = subscribe("match_state_change", handleMatchStateChange);
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedMatchId, queryClient, selectedFieldId, onMatchStateChange]);

  return {
    // WebSocket actions
    joinTournament,
    joinFieldRoom,
    leaveFieldRoom,
    changeDisplayMode,
    sendAnnouncement,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    
    // Connection state
    isConnected,
    currentTournament,
  };
}
