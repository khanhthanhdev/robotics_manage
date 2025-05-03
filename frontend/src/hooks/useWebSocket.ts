import { useState, useEffect, useCallback } from 'react';
import webSocketService, {
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
 * React hook for using the WebSocket service
 */
export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { autoConnect = true, url, tournamentId } = options;
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentTournament, setCurrentTournament] = useState<string | null>(tournamentId || null);

  // Connect to the WebSocket server
  const connect = useCallback(() => {
    webSocketService.connect(url);
  }, [url]);
  
  // Disconnect from the WebSocket server
  const disconnect = useCallback(() => {
    webSocketService.disconnect();
  }, []);
  
  // Join a tournament room
  const joinTournament = useCallback((id: string) => {
    webSocketService.joinTournament(id);
    setCurrentTournament(id);
  }, []);
  
  // Leave a tournament room
  const leaveTournament = useCallback((id: string) => {
    webSocketService.leaveTournament(id);
    setCurrentTournament(null);
  }, []);
  
  // Subscribe to WebSocket events
  const subscribe = useCallback(<T>(eventName: string, callback: (data: T) => void) => {
    return webSocketService.on<T>(eventName, callback);
  }, []);
  
  // Unsubscribe from WebSocket events
  const unsubscribe = useCallback((eventName: string) => {
    webSocketService.off(eventName);
  }, []);
  
  // Display mode control functions
  const changeDisplayMode = useCallback((settings: Omit<AudienceDisplaySettings, 'updatedAt'>) => {
    if (!currentTournament && !settings.tournamentId) {
      console.error('No tournament ID available for changeDisplayMode');
      return;
    }
    
    webSocketService.sendDisplayModeChange({
      ...settings,
      tournamentId: settings.tournamentId || currentTournament!,
      updatedAt: Date.now(),
    });
  }, [currentTournament]);
  
  // Match update functions
  const sendMatchUpdate = useCallback((matchData: Omit<MatchData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendMatchUpdate');
      return;
    }
    
    webSocketService.sendMatchUpdate({
      ...matchData,
      tournamentId: currentTournament,
    });
  }, [currentTournament]);
  
  // Score update functions
  const sendScoreUpdate = useCallback((scoreData: Omit<ScoreData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendScoreUpdate');
      return;
    }
    
    webSocketService.sendScoreUpdate({
      ...scoreData,
      tournamentId: currentTournament,
    });
  }, [currentTournament]);
  
  // Match state change functions
  const sendMatchStateChange = useCallback((stateData: Omit<MatchStateData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendMatchStateChange');
      return;
    }
    
    webSocketService.sendMatchStateChange({
      ...stateData,
      tournamentId: currentTournament,
    });
  }, [currentTournament]);
  
  // Timer control functions
  const startTimer = useCallback((timerData: Omit<TimerData, 'tournamentId' | 'startedAt' | 'isRunning'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for startTimer');
      return;
    }
    
    webSocketService.startTimer({
      ...timerData,
      tournamentId: currentTournament,
      startedAt: Date.now(),
      isRunning: true,
    });
  }, [currentTournament]);
  
  const pauseTimer = useCallback((timerData: Omit<TimerData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for pauseTimer');
      return;
    }
    
    webSocketService.pauseTimer({
      ...timerData,
      tournamentId: currentTournament,
    });
  }, [currentTournament]);
  
  const resetTimer = useCallback((timerData: Omit<TimerData, 'tournamentId'>) => {
    if (!currentTournament) {
      console.error('No tournament ID available for resetTimer');
      return;
    }
    
    webSocketService.resetTimer({
      ...timerData,
      tournamentId: currentTournament,
    });
  }, [currentTournament]);
  
  // Announcement functions
  const sendAnnouncement = useCallback((message: string, duration?: number) => {
    if (!currentTournament) {
      console.error('No tournament ID available for sendAnnouncement');
      return;
    }
    
    webSocketService.sendAnnouncement({
      message,
      duration,
      tournamentId: currentTournament,
    });
  }, [currentTournament]);
  
  // Setup connection tracking
  useEffect(() => {
    const checkConnectionStatus = () => {
      setIsConnected(webSocketService.isConnectedToServer());
    };
    
    // Set up interval to check connection status
    const intervalId = setInterval(checkConnectionStatus, 1000);
    
    // Auto-connect if specified
    if (autoConnect) {
      connect();
    }
    
    // Auto-join tournament if specified
    if (tournamentId) {
      joinTournament(tournamentId);
    }
    
    // Initial check
    checkConnectionStatus();
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [autoConnect, connect, tournamentId, joinTournament]);
  
  return {
    // Connection status
    isConnected,
    
    // Connection control
    connect,
    disconnect,
    
    // Tournament room control
    currentTournament,
    joinTournament,
    leaveTournament,
    
    // Event subscription
    subscribe,
    unsubscribe,
    
    // Display control
    changeDisplayMode,
    
    // Match control
    sendMatchUpdate,
    sendMatchStateChange,
    
    // Score control
    sendScoreUpdate,
    
    // Timer control
    startTimer,
    pauseTimer,
    resetTimer,
    
    // Announcements
    sendAnnouncement,
  };
}