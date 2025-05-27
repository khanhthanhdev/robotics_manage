// TimerControl.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useWebSocket } from '@/hooks/common/use-websocket';
import websocketService from '@/lib/websocket';

interface TimerControlProps {
  matchId: string;
  tournamentId: string;
}

const MATCH_DURATION = 150000; // 2:30 in ms

export default function TimerControl({ matchId, tournamentId }: TimerControlProps) {
  const [remaining, setRemaining] = useState<number>(MATCH_DURATION);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // WebSocket connection
  const { startTimer, pauseTimer, resetTimer, subscribe } = useWebSocket({ tournamentId });

  // Format time as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Start timer
  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimer({
      duration: MATCH_DURATION,
      remaining,
    });
  };

  // Stop timer
  const handleStop = () => {
    setIsRunning(false);
    pauseTimer({
      duration: MATCH_DURATION,
      remaining,
      isRunning: false,
    });
  };

  // Reset timer
  const handleReset = () => {
    setIsRunning(false);
    setRemaining(MATCH_DURATION);
    resetTimer({
      duration: MATCH_DURATION,
      remaining: MATCH_DURATION,
      isRunning: false,
    });
  };

  // Local timer countdown
  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          const newRemaining = prev - 1000;
          // Broadcast the new remaining time to audience-display via timer_update
          websocketService.emit('timer_update', {
            duration: MATCH_DURATION,
            remaining: newRemaining > 0 ? newRemaining : 0,
            isRunning: newRemaining > 0,
            tournamentId,
            matchId,
          });
          if (prev <= 1000) {
            setIsRunning(false);
            return 0;
          }
          return newRemaining;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining, tournamentId, matchId]);

  // Listen for timer updates from WebSocket (sync from other clients)
  useEffect(() => {
    const unsubscribe = subscribe('timer_update', (data: any) => {
      if (data.tournamentId === tournamentId && data.matchId === matchId) {
        setRemaining(data.remaining);
        setIsRunning(data.isRunning);
      }
    });
    return () => { unsubscribe(); };
  }, [subscribe, matchId, tournamentId]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-5xl font-mono font-bold mb-2">{formatTime(remaining)}</div>
      <div className="flex gap-2">
        <Button onClick={handleStart} disabled={isRunning}>Start</Button>
        <Button onClick={handleStop} disabled={!isRunning} variant="destructive">Stop</Button>
        <Button onClick={handleReset} variant="outline">Reset</Button>
      </div>
    </div>
  );
}
