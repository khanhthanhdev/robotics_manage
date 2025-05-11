import { useState, useEffect, useCallback } from 'react';
import websocketService, { IWebSocketService } from '@/lib/websocket';
import {
  TimerData,
  MatchData,
  ScoreData,
  MatchStateData,
  AudienceDisplaySettings,
  AnnouncementData,
} from '@/lib/websocket-service';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  url?: string;
  tournamentId?: string;
}

/**
 * React hook for using the WebSocket service (SOLID: depends on interface)
 */
export function useWebSocket(options: UseWebSocketOptions = {}, ws: IWebSocketService = websocketService) {
  const { autoConnect = true, url, tournamentId } = options;
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentTournament, setCurrentTournament] = useState<string | null>(tournamentId || null);

  // Connect to the WebSocket server
  const connect = useCallback(() => {
    ws.connect(url);
  }, [url, ws]);
  // Disconnect from the WebSocket server
  const disconnect = useCallback(() => {
    ws.disconnect();
  }, [ws]);
  // Join a tournament room
  const joinTournament = useCallback((id: string) => {
    ws.joinTournament(id);
    setCurrentTournament(id);
  }, [ws]);
  // Leave a tournament room
  const leaveTournament = useCallback((id: string) => {
    ws.leaveTournament(id);
    setCurrentTournament(null);
  }, [ws]);
  // Subscribe to WebSocket events
  const subscribe = useCallback(<T>(eventName: string, callback: (data: T) => void) => {
    return ws.on<T>(eventName, callback);
  }, [ws]);
  // Unsubscribe from WebSocket events
  const unsubscribe = useCallback((eventName: string) => {
    ws.off(eventName);
  }, [ws]);
  // Display mode control functions
  const changeDisplayMode = useCallback((settings: Omit<AudienceDisplaySettings, 'updatedAt'>) => {
    if (!currentTournament && !settings.tournamentId) {
      console.error('No tournament ID available for changeDisplayMode');
      return;
    }
    ws.sendDisplayModeChange({
      ...settings,
      tournamentId: settings.tournamentId || currentTournament!,
      updatedAt: Date.now(),
    });
  }, [currentTournament, ws]);
  // Match update functions
  const sendMatchUpdate = useCallback((matchData: Omit<MatchData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendMatchUpdate');
      return;
    }
    ws.sendMatchUpdate({ ...matchData, tournamentId: currentTournament });
  }, [currentTournament, ws]);
  // Score update functions
  const sendScoreUpdate = useCallback((scoreData: Omit<ScoreData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendScoreUpdate');
      return;
    }
    ws.sendScoreUpdate({ ...scoreData, tournamentId: currentTournament });
  }, [currentTournament, ws]);
  // Match state change functions
  const sendMatchStateChange = useCallback((stateData: Omit<MatchStateData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendMatchStateChange');
      return;
    }
    ws.sendMatchStateChange({ ...stateData, tournamentId: currentTournament });
  }, [currentTournament, ws]);
  // Timer control functions
  const startTimer = useCallback((timerData: Omit<TimerData, 'tournamentId' | 'startedAt' | 'isRunning'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for startTimer');
      return;
    }
    ws.startTimer({ ...timerData, tournamentId: currentTournament, startedAt: Date.now(), isRunning: true });
  }, [currentTournament, ws]);
  const pauseTimer = useCallback((timerData: Omit<TimerData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for pauseTimer');
      return;
    }
    ws.pauseTimer({ ...timerData, tournamentId: currentTournament });
  }, [currentTournament, ws]);
  const resetTimer = useCallback((timerData: Omit<TimerData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for resetTimer');
      return;
    }
    ws.resetTimer({ ...timerData, tournamentId: currentTournament });
  }, [currentTournament, ws]);
  // Announcement functions
  const sendAnnouncement = useCallback((message: string, duration?: number) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendAnnouncement');
      return;
    }
    ws.sendAnnouncement({ message, duration, tournamentId: currentTournament });
  }, [currentTournament, ws]);

  // Setup connection tracking
  useEffect(() => {
    const checkConnectionStatus = () => {
      setIsConnected(ws.isConnected());
    };
    const intervalId = setInterval(checkConnectionStatus, 1000);
    if (autoConnect) connect();
    if (tournamentId) joinTournament(tournamentId);
    checkConnectionStatus();
    return () => { clearInterval(intervalId); };
  }, [autoConnect, connect, tournamentId, joinTournament, ws]);

  return {
    isConnected,
    connect,
    disconnect,
    currentTournament,
    joinTournament,
    leaveTournament,
    subscribe,
    unsubscribe,
    changeDisplayMode,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
  };
}