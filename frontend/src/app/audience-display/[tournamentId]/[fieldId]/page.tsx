"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTournament } from "@/hooks/use-tournaments";
import { useTournamentFields } from "@/components/fields/FieldSelectDropdown";
import { useWebSocket } from "@/hooks/useWebSocket";
import { AudienceDisplaySettings } from "@/lib/websocket-service";
import TeamsDisplay from "../../components/TeamsDisplay";
import ScheduleDisplay, { Match } from "../../components/ScheduleDisplay";
import { useTeams } from "@/hooks/use-teams";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

// Custom hook to fetch matches for a tournament
function useMatchesByTournament(tournamentId: string) {
  return useQuery({
    queryKey: ['matches', 'tournament', tournamentId],
    queryFn: async () => {
      if (!tournamentId) return [];
      try {
        // Explicitly type the returned data to match the Match[] interface
        const data = await apiClient.get<Match[]>(`/matches?tournamentId=${tournamentId}`);
        return data;
      } catch (error) {
        console.error("Error fetching tournament matches:", error);
        return [];
      }
    },
    enabled: !!tournamentId,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}

export default function LiveFieldDisplayPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params?.tournamentId as string;
  const fieldId = params?.fieldId as string;
  
  // Add CSS for text-shadow directly to the document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        .text-shadow-xl {
          text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
        }
      `;
      document.head.appendChild(styleEl);
      
      return () => {
        document.head.removeChild(styleEl);
      };
    }
  }, []);

  // Fetch tournament and field details
  const { data: tournament, isLoading: isLoadingTournament } = useTournament(tournamentId);
  const { data: fields = [], isLoading: isLoadingFields } = useTournamentFields(tournamentId);
  const field = fields.find(f => f.id === fieldId);
    // State for live data
  const [score, setScore] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);
  const [matchState, setMatchState] = useState<any>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  // Display mode and announcement state
  const [displaySettings, setDisplaySettings] = useState<AudienceDisplaySettings>({
    displayMode: 'match',
    tournamentId,
    fieldId,
    updatedAt: Date.now(),
  });
  
  const [announcement, setAnnouncement] = useState<string>('');
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(false);
  const [announcementCountdown, setAnnouncementCountdown] = useState<number | null>(null);
  
  // Validate field exists for this tournament
  const [fieldError, setFieldError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoadingFields && fields.length > 0 && fieldId && !field) {
      setFieldError(`Field with ID "${fieldId}" was not found in tournament "${tournament?.name || tournamentId}"`);
    } else {
      setFieldError(null);
    }
  }, [fields, fieldId, field, tournament, isLoadingFields, tournamentId]);

  // Fetch teams for the tournament
  const { data: teams = [], isLoading: isLoadingTeams } = useTeams(tournamentId);
  
  // Fetch match schedule for the tournament
  const { data: matches = [], isLoading: isLoadingMatches } = useMatchesByTournament(tournamentId);

  // WebSocket connection and state
  const {
    isConnected,
    joinFieldRoom,
    leaveFieldRoom,
    subscribe,
    changeDisplayMode,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
    joinTournament,
    joinFieldRoom: wsJoinFieldRoom,
    leaveFieldRoom: wsLeaveFieldRoom
  } = useWebSocket({ tournamentId, autoConnect: true });

  // Expose WebSocket testing interface on window for manual testing and debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).audienceDisplayWS = {
        // Display settings
        changeDisplayMode: (settings: any) => changeDisplayMode({ 
          ...settings, 
          fieldId, 
          tournamentId 
        }),
        setToMatchDisplay: () => changeDisplayMode({
          displayMode: 'match', 
          fieldId, 
          tournamentId
        }),
        setToTeamsDisplay: () => changeDisplayMode({
          displayMode: 'teams', 
          fieldId, 
          tournamentId
        }),
        setToScheduleDisplay: () => changeDisplayMode({
          displayMode: 'schedule', 
          fieldId, 
          tournamentId
        }),
        setToBlankDisplay: () => changeDisplayMode({
          displayMode: 'blank', 
          fieldId, 
          tournamentId
        }),
        
        // Match management
        sendMatchUpdate: (data: any) => sendMatchUpdate({
          ...data, 
          fieldId
        }),
        sendMatchStateChange: (data: any) => sendMatchStateChange({
          ...data, 
          fieldId
        }),
        sendScoreUpdate: (data: any) => sendScoreUpdate({
          ...data, 
          fieldId
        }),
        
        // Timer controls
        startTimer: (data: any) => startTimer({
          ...data, 
          fieldId
        }),
        pauseTimer: (data: any) => pauseTimer({
          ...data, 
          fieldId
        }),
        resetTimer: (data: any) => resetTimer({
          ...data, 
          fieldId
        }),
          // Announcements
        sendAnnouncement: (message: string, duration?: number) => 
          sendAnnouncement(message, duration, fieldId),
        showTestAnnouncement: (message: string, seconds: number = 10) => {
          // Helper for testing announcements with countdown directly
          setAnnouncement(message);
          setShowAnnouncement(true);
          setAnnouncementCountdown(seconds);
          setTimeout(() => setShowAnnouncement(false), seconds * 1000);
        },
        
        // Room management
        joinFieldRoom: () => wsJoinFieldRoom(fieldId),
        leaveFieldRoom: () => wsLeaveFieldRoom(fieldId),
        
        // Debugging info
        getFieldId: () => fieldId,
        getTournamentId: () => tournamentId,
        getCurrentDisplayMode: () => displaySettings.displayMode,
        getCurrentDisplaySettings: () => displaySettings
      };
      
      console.log(`WebSocket testing interface available at window.audienceDisplayWS for field ${fieldId}`);
    }
  }, [
    changeDisplayMode, sendMatchUpdate, sendMatchStateChange, sendScoreUpdate, 
    startTimer, pauseTimer, resetTimer, sendAnnouncement, wsJoinFieldRoom, wsLeaveFieldRoom,
    fieldId, tournamentId, displaySettings  ]);

  // Join tournament and field rooms on mount
  useEffect(() => {
    if (!tournamentId) return;
    joinTournament(tournamentId);
    
    if (fieldId) {
      joinFieldRoom(fieldId);
      console.log(`Joining field room: ${fieldId} in tournament: ${tournamentId}`);
    }
    
    return () => {
      if (fieldId) {
        leaveFieldRoom(fieldId);
        console.log(`Leaving field room: ${fieldId}`);
      }
    };
  }, [tournamentId, fieldId, joinTournament, joinFieldRoom, leaveFieldRoom]);
  
  // Track connection status and attempts
  const [connectionAttempts, setConnectionAttempts] = useState<number>(0);
  
  // Update connection error message based on connection status
  useEffect(() => {
    if (!isConnected) {
      const attemptMessage = connectionAttempts > 0 ? ` (Attempt ${connectionAttempts + 1})` : '';
      setConnectionError(`WebSocket connection not established${attemptMessage}. Ensure the server is running.`);
      
      // Increment connection attempts and retry after delay
      const timeoutId = setTimeout(() => {
        setConnectionAttempts(prev => prev + 1);
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else {
      setConnectionError(null);
      setConnectionAttempts(0);
    }
  }, [isConnected, connectionAttempts]);

  // Subscribe to WebSocket events and sync all live data with field-specific filtering
  useEffect(() => {
    // Display mode changes - can be tournament-wide or field-specific
    const unsubDisplayMode = subscribe<AudienceDisplaySettings>(
      'display_mode_change',
      (data) => {
        // Apply if global tournament update (no fieldId) or specific to this field
        if (!data.fieldId || data.fieldId === fieldId) {
          console.log('Received display mode change:', data);
          console.log('Current display mode before update:', displaySettings.displayMode);
          
          // Ensure we're using the full data object with all required properties
          const updatedSettings = {
            ...data,
            // Make sure fieldId is preserved
            fieldId: data.fieldId || fieldId,
            // Make sure tournamentId is preserved
            tournamentId: data.tournamentId || tournamentId,
            // Ensure updatedAt is present
            updatedAt: data.updatedAt || Date.now()
          };
          
          setDisplaySettings(updatedSettings);
          console.log('Updated display settings to:', updatedSettings);
        }
      }
    );
      // Match updates - should be field-specific
    const unsubMatchUpdate = subscribe<any>(
      'match_update',
      (data) => {
        // Only process updates for this specific field
        if (data.fieldId === fieldId) {
          console.log('Receiving match update for field:', fieldId, data);
          // Match data will be handled by the control panel
        }
      }
    );
    
    // Timer updates - should be field-specific
    const unsubTimer = subscribe<any>(
      'timer_update',
      (data) => {
        // Only process timer updates for this specific field
        if (data.fieldId === fieldId) {
          console.log('Applying timer update for field:', fieldId, data);
          setTimer(data);
        }
      }
    );
    
    // Match state changes - should be field-specific
    const unsubMatchState = subscribe<any>(
      'match_state_change',
      (data) => {
        // Only process match state changes for this specific field
        if (data.fieldId === fieldId) {
          console.log('Applying match state change for field:', fieldId, data);
          setMatchState(data);
        }
      }
    );
    
    // Score updates - should be field-specific
    const unsubScore = subscribe<any>(
      'score_update',
      (data) => {
        // Only process score updates for this specific field
        if (data.fieldId === fieldId) {
          console.log('Applying score update for field:', fieldId, data);
          setScore(data);
        }
      }
    );
    
    // Announcements - can be tournament-wide or field-specific
    const unsubAnnouncement = subscribe<{ message: string, duration?: number, fieldId?: string, tournamentId: string }>(
      'announcement',
      (data) => {
        // Show if it's a tournament-wide announcement or specific to this field
        if (!data.fieldId || data.fieldId === fieldId) {
          console.log('Displaying announcement for field:', fieldId, data);
          setAnnouncement(data.message);
          setShowAnnouncement(true);
          
          // Use the provided duration or default to 10 seconds
          const displayDuration = data.duration || 10000;
          
          // Auto-hide announcement after duration
          const timerId = setTimeout(() => setShowAnnouncement(false), displayDuration);
          
          // Clear timeout if component unmounts while announcement is showing
          return () => clearTimeout(timerId);
        }
      }
    );
      return () => {
      unsubDisplayMode();
      unsubMatchUpdate(); // Keep for cleanup
      unsubTimer();
      unsubMatchState();
      unsubScore();
      unsubAnnouncement();
    };
  }, [subscribe, fieldId, displaySettings.displayMode, tournamentId]);

  // Robust timer countdown effect: always use latest timer state from server, prevent drift
  useEffect(() => {
    if (!timer?.isRunning || typeof timer.remaining !== 'number' || timer.remaining <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev: any) => {
        // Only decrement if still running and remaining > 0
        if (!prev?.isRunning || prev.remaining <= 0) return prev;
        // Decrement by 1000ms, but never go below 0
        return { ...prev, remaining: Math.max(0, prev.remaining - 1000) };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer?.isRunning, timer?.remaining]);
  // Effect to handle announcement countdown
  useEffect(() => {
    if (!showAnnouncement) {
      setAnnouncementCountdown(null);
      return;
    }
    
    // Start with 10 seconds by default if countdown is not already set
    if (announcementCountdown === null) {
      setAnnouncementCountdown(10);
    }
    
    // Update countdown every second
    const intervalId = setInterval(() => {
      setAnnouncementCountdown(prev => {
        if (prev === null || prev <= 1) {
          // Auto-hide announcement when countdown reaches 0
          if (prev === 1) setTimeout(() => setShowAnnouncement(false), 100);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [showAnnouncement, announcementCountdown]);

  // UI helpers
  const formatTime = (ms: number) => {
    if (typeof ms !== "number" || isNaN(ms) || ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  // Render announcement overlay
  const renderAnnouncement = () => {
    if (!showAnnouncement || !announcement) return null;
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-pulse">
        <div className="bg-white p-10 rounded-xl max-w-3xl text-center shadow-2xl border-4 border-yellow-400">
          <div className="uppercase text-yellow-600 font-semibold mb-2">Important</div>
          <h2 className="text-4xl font-bold mb-6 text-blue-800 uppercase tracking-wider">ANNOUNCEMENT</h2>
          <p className="text-3xl font-medium">{announcement}</p>
          {announcementCountdown !== null && (
            <div className="mt-6 px-4 py-2 bg-gray-100 rounded-full inline-block text-gray-600">
              Closing in <span className="font-bold">{announcementCountdown}</span> seconds...
            </div>
          )}
        </div>
      </div>
    );
  };
  // Debug component to show current display mode and other info
  const DebugInfo = () => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return (
      <div className="text-xs bg-gray-800 text-white p-3 rounded-lg mt-4 border border-gray-600">
        <div className="font-semibold border-b border-gray-600 pb-1 mb-1">Debug Information</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>Mode: <span className="font-mono bg-blue-900 px-1 rounded">{displaySettings.displayMode}</span></div>
          <div>Field: <span className="font-mono">{fieldId}</span></div>
          <div>Tournament: <span className="font-mono">{tournamentId.substring(0, 8)}...</span></div>
          <div>Connection: {isConnected ? 
            <span className="text-green-400">✓ Connected</span> : 
            <span className="text-red-400">✗ Disconnected</span>}
          </div>
          <div>Last Update: <span className="font-mono">{new Date(displaySettings.updatedAt).toLocaleTimeString()}</span></div>
          <div>Match State: <span className="font-mono">{matchState?.status || 'none'}</span></div>
          <div>Timer: <span className="font-mono">{timer?.isRunning ? 'running' : 'stopped'}</span></div>
          <div>Match: <span className="font-mono">{matchState?.matchId ? `✓` : '✗'}</span></div>
        </div>
        <div className="text-right mt-1 pt-1 border-t border-gray-600">
          <span className="text-blue-300">Test with window.audienceDisplayWS</span>
        </div>
      </div>
    );
  };

  // Render content based on display mode
  const renderContent = () => {
    // Force a key update every time display mode changes to ensure full re-render
    const contentKey = `${displaySettings.displayMode}-${displaySettings.updatedAt}`;
    console.log(`Rendering content for display mode: ${displaySettings.displayMode} with key: ${contentKey}`);
    
    switch (displaySettings.displayMode) {
      case 'teams':
        return (
          <div key={contentKey}>
            <TeamsDisplay teams={teams} isLoading={isLoadingTeams} />
            <DebugInfo />
          </div>
        );
      
      case 'schedule':
        return (
          <div key={contentKey}>
            <ScheduleDisplay 
              tournamentId={tournamentId} 
              matches={matches} 
              isLoading={isLoadingMatches} 
            />
            <DebugInfo />
          </div>
        );
      
      case 'rankings':
        return (
          <div key={contentKey} className="text-center p-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Tournament Rankings</h1>
            <p className="text-xl">Rankings display is coming soon...</p>
            <DebugInfo />
          </div>
        );
      
      case 'blank':
        return (
          <div key={contentKey} className="min-h-screen">
            <DebugInfo />
          </div>
        );
      
      case 'announcement':
        return (
          <div key={contentKey} className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="bg-blue-100 p-10 rounded-xl max-w-4xl text-center shadow-xl border-2 border-blue-300">
              <h2 className="text-4xl font-bold mb-6 text-blue-800">ANNOUNCEMENT</h2>
              <p className="text-3xl">{displaySettings.message || 'No announcement message'}</p>
            </div>
            <DebugInfo />
          </div>
        );
        case 'match':
      default:
        // Display match information regardless of active match state
        return (
          <div key={contentKey}>{/* Match Info */}            <div className="mb-6 text-center">
              <div className="bg-gradient-to-r from-gray-800 to-blue-900 py-5 px-6 rounded-xl shadow-lg border-b-4 border-yellow-400">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex-1 text-left">                    <h2 className="text-4xl font-bold text-white uppercase tracking-wide">
                      {matchState?.matchId ? 
                        `Match ${matchState.matchNumber || matchState.name || matchState.matchId}` :
                        'Match Information'
                      }
                    </h2>
                    <p className="text-sm font-medium text-blue-300 mt-1">
                      {matchState?.matchId ? 
                        `ID: ${matchState.matchId || 'Unknown'}` :
                        'Waiting for match selection...'
                      }
                    </p>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <div className="inline-block bg-blue-800 text-white text-xl px-4 py-2 rounded-lg font-bold uppercase">
                      {matchState?.currentPeriod ? 
                        <span className="flex items-center">
                          <span className={`inline-block w-3 h-3 mr-2 rounded-full ${
                            matchState.currentPeriod === 'auto' ? 'bg-yellow-400' : 
                            matchState.currentPeriod === 'teleop' ? 'bg-green-400' : 
                            matchState.currentPeriod === 'endgame' ? 'bg-red-400' : 'bg-gray-400'
                          }`}></span>
                          {matchState.currentPeriod.toUpperCase()}
                        </span> 
                        : 'SETUP'
                      }
                    </div>
                    <div className="mt-2 text-lg font-semibold text-yellow-300">
                      Status: {matchState?.status ? matchState.status.replace(/_/g, ' ') : 'PENDING'}
                    </div>
                  </div>
                </div>                <div className="mt-4 flex justify-center space-x-12 text-white">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-red-400">RED ALLIANCE</h3>
                    <p className="text-md">
                      {matchState?.redTeams?.map((t: any) => t.name).join(", ") || "Teams TBD"}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-blue-400">BLUE ALLIANCE</h3>
                    <p className="text-md">
                      {matchState?.blueTeams?.map((t: any) => t.name).join(", ") || "Teams TBD"}
                    </p>
                  </div>
                </div>
              </div>
            </div>            {/* Timer Clock */}
            <div className="flex flex-col items-center mb-8 bg-black text-white p-4 rounded-xl shadow-xl border-4 border-gray-700">
              <div className="w-full flex justify-between items-center mb-2">
                <h2 className="text-xl uppercase font-bold text-gray-300">Match Timer</h2>
                {timer && (
                  <div className="flex items-center">
                    <span className={`inline-block w-4 h-4 rounded-full mr-2 ${
                      timer.isRunning 
                        ? 'bg-green-500 animate-pulse' 
                        : timer?.remaining === 0 
                          ? 'bg-red-500' 
                          : 'bg-yellow-500'
                    }`}></span>
                    <span className="font-mono text-sm">
                      {timer.isRunning ? 'RUNNING' : (timer?.remaining === 0 ? 'COMPLETED' : 'PAUSED')}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-900 w-full p-4 rounded-lg mb-2">
                <div className={`text-8xl font-extrabold font-mono tracking-wider text-center ${
                  timer?.isRunning 
                    ? 'text-green-400 animate-pulse' 
                    : timer?.remaining === 0 
                      ? 'text-red-400' 
                      : 'text-yellow-300'
                }`}>
                  {formatTime(timer?.remaining ?? 0)}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full text-center">
                <div className="bg-gray-800 p-2 rounded">
                  <div className="text-xs text-gray-400">PERIOD</div>
                  <div className="text-lg font-bold">
                    {matchState?.currentPeriod 
                      ? matchState.currentPeriod.toUpperCase() 
                      : (timer?.phase ? timer.phase.toUpperCase() : '—')}
                  </div>
                </div>
                
                <div className="bg-gray-800 p-2 rounded">
                  <div className="text-xs text-gray-400">STATUS</div>
                  <div className="text-lg font-bold">
                    {matchState?.status 
                      ? matchState.status.replace(/_/g, ' ').toUpperCase() 
                      : 'STANDBY'}
                  </div>
                </div>
                
                <div className="bg-gray-800 p-2 rounded">
                  <div className="text-xs text-gray-400">ELAPSED</div>
                  <div className="text-lg font-bold">
                    {formatTime((timer?.initial || 0) - (timer?.remaining || 0))}
                  </div>
                </div>
              </div>
            </div>
              {/* Scoreboard */}            {/* Match Scoreboard */}
            <div className="relative mb-8">
              <div className="scoreboard-container border-4 border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-2 gap-0 bg-black">
                  {/* Header */}
                  <div className="col-span-2 bg-gradient-to-r from-gray-800 to-gray-900 p-3 text-center">
                    <h2 className="text-3xl font-extrabold text-white tracking-wider uppercase">Match Scoreboard</h2>
                  </div>
                  
                  {/* Alliance Headers */}
                  <div className="bg-red-800 text-white text-center p-3 border-r-2 border-gray-800">
                    <h3 className="text-4xl font-extrabold tracking-wider">RED</h3>
                  </div>
                  <div className="bg-blue-800 text-white text-center p-3 border-l-2 border-gray-800">
                    <h3 className="text-4xl font-extrabold tracking-wider">BLUE</h3>
                  </div>
                  
                  {/* Main Score Display */}
                  <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-6 flex justify-center items-center border-r-2 border-gray-800">
                    <div className="text-9xl font-extrabold text-red-100 text-shadow-xl">
                      {score?.redTotalScore || 0}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 flex justify-center items-center border-l-2 border-gray-800">
                    <div className="text-9xl font-extrabold text-blue-100 text-shadow-xl">
                      {score?.blueTotalScore || 0}
                    </div>
                  </div>
                  
                  {/* Score Breakdown */}
                  <div className="bg-red-100 p-4 border-t-2 border-r-2 border-gray-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left">
                        <p className="text-lg font-bold text-red-800">Auto:</p>
                        <p className="text-lg font-bold text-red-800">TeleOp:</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-900">{score?.redAutoScore || 0}</p>
                        <p className="text-lg font-bold text-red-900">{score?.redDriveScore || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 border-t-2 border-l-2 border-gray-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left">
                        <p className="text-lg font-bold text-blue-800">Auto:</p>
                        <p className="text-lg font-bold text-blue-800">TeleOp:</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-900">{score?.blueAutoScore || 0}</p>
                        <p className="text-lg font-bold text-blue-900">{score?.blueDriveScore || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DebugInfo />
          </div>
        );
    }
  };

  // Loading and error states
  if (isLoadingTournament || isLoadingFields) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading display...</h2>
          {connectionError && (
            <p className="mt-4 text-red-600">
              {connectionError}
            </p>
          )}
        </div>
      </div>
    );
  }
  
  // Field not found error state
  if (fieldError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg shadow-lg max-w-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Field Not Found</h2>
          <p className="text-red-600 mb-6">{fieldError}</p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push(`/audience-display/${tournamentId}`)}
          >
            Back to Tournament Display
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {renderAnnouncement()}
      
      {/* Header with tournament and field info */}
      <header className="mb-8">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-lg shadow-lg text-white">
            <h1 className="text-3xl font-bold text-center mb-2">
              {tournament?.name || 'Tournament'} - Field {field?.number || field?.name || fieldId}
            </h1>
            <p className="text-center text-sm">
              {isConnected ? (
                <span className="text-green-400 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                  Connected to Field {field?.number || field?.name || fieldId}
                </span>
              ) : (
                <span className="text-red-400 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"></span>
                  Disconnected - Attempting to reconnect...
                </span>
              )}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-center text-xs text-blue-300 mt-1">
                WebSocket testing interface available at <code>window.audienceDisplayWS</code>
              </p>
            )}
          </div>
        </div>
      </header>      {/* Main content area */}
      <main className="container mx-auto bg-gray-800 rounded-xl shadow-lg p-8 text-white">
        {connectionError ? (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-6" role="alert">
            <p className="font-bold">Connection Error</p>
            <p>{connectionError}</p>
          </div>
        ) : fieldError ? (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-6" role="alert">
            <p className="font-bold">Field Not Found</p>
            <p>{fieldError}</p>
          </div>
        ) : renderContent()}
      </main>

      {/* Footer */}      <footer className="container mx-auto mt-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Robotics Tournament Management System</p>
      </footer>
    </div>
  );
}

// Add CSS for text-shadow to improve scoreboard visibility
const styles = `
  .text-shadow-xl {
    text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
  }
`;

// Inject styles into the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
