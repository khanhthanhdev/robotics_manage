import { useState, useEffect } from "react";
import { useWebSocket } from "@/hooks/common/use-websocket";

interface UseTimerControlProps {
  tournamentId: string;
  selectedFieldId: string | null;
  initialDuration?: number;
}

interface TimerControlReturn {
  // Timer state
  timerDuration: number;
  timerRemaining: number;
  timerIsRunning: boolean;
  matchPeriod: string;
  
  // Timer setters
  setTimerDuration: (duration: number) => void;
  setMatchPeriod: (period: string) => void;
  
  // Timer controls
  handleStartTimer: () => void;
  handlePauseTimer: () => void;
  handleResetTimer: () => void;
  
  // Utility functions
  formatTime: (ms: number) => string;
}

export function useTimerControl({
  tournamentId,
  selectedFieldId,
  initialDuration = 150000, // 2:30 in ms
}: UseTimerControlProps): TimerControlReturn {
  // Timer configuration state
  const [timerDuration, setTimerDuration] = useState<number>(initialDuration);
  const [matchPeriod, setMatchPeriod] = useState<string>("auto");

  // Timer display state for live clock
  const [timerRemaining, setTimerRemaining] = useState<number>(timerDuration);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);

  // WebSocket connection for timer controls
  const {
    startTimer,
    pauseTimer,
    resetTimer,
    subscribe,
  } = useWebSocket({ tournamentId, autoConnect: true });

  // Format timer as MM:SS
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Sync timerRemaining with timerDuration when duration changes
  useEffect(() => {
    setTimerRemaining(timerDuration);
  }, [timerDuration]);

  // Listen for timer updates from WebSocket
  useEffect(() => {
    const handleTimerUpdate = (data: any) => {
      console.log("Timer update received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring timer update for different field: ${data.fieldId}`);
        return;
      }

      // Update local timer state from the websocket data
      if (data) {
        setTimerRemaining(data.remaining || 0);
        setTimerIsRunning(data.isRunning || false);
      }
    };

    // Subscribe to timer updates using the subscribe method from useWebSocket
    const unsubscribe = subscribe("timer_update", handleTimerUpdate);

    // Cleanup subscription when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedFieldId]);  // Timer control handlers
  const handleStartTimer = () => {
    const timerData = {
      duration: timerDuration,
      remaining: timerRemaining,
      isRunning: true, // Start the timer as running
      fieldId: selectedFieldId || undefined,
    };
    startTimer(timerData);
  };

  const handlePauseTimer = () => {
    const timerData = {
      duration: timerDuration,
      remaining: timerRemaining,
      isRunning: false,
      fieldId: selectedFieldId || undefined,
    };
    pauseTimer(timerData);
  };

  const handleResetTimer = () => {
    const timerData = {
      duration: timerDuration,
      remaining: timerDuration, // Reset to full duration
      isRunning: false,
      fieldId: selectedFieldId || undefined,
    };
    resetTimer(timerData);
    setTimerRemaining(timerDuration);
    setTimerIsRunning(false);
  };

  return {
    // Timer state
    timerDuration,
    timerRemaining,
    timerIsRunning,
    matchPeriod,
    
    // Timer setters
    setTimerDuration,
    setMatchPeriod,
    
    // Timer controls
    handleStartTimer,
    handlePauseTimer,
    handleResetTimer,
    
    // Utility functions
    formatTime,
  };
}
