'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AudienceDisplaySettings, 
  MatchStateData, 
  ScoreData, 
  TimerData 
} from '@/lib/websocket-service';

export default function AudienceDisplayPage() {
  // Tournament ID from query params or use default for demo
  const tournamentId = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('tournamentId') || 'demo-tournament'
    : 'demo-tournament';
    
  // Connect to WebSocket with tournament ID
  const { isConnected, subscribe } = useWebSocket({ 
    tournamentId, 
    autoConnect: true 
  });
  
  // State for different data received from WebSocket
  const [displaySettings, setDisplaySettings] = useState<AudienceDisplaySettings>({
    displayMode: 'blank',
    tournamentId,
    updatedAt: Date.now(),
  });
  
  const [timerData, setTimerData] = useState<TimerData>({
    duration: 150000, // 2:30 in milliseconds
    remaining: 150000,
    isRunning: false,
    tournamentId,
  });
  
  const [matchState, setMatchState] = useState<MatchStateData>({
    matchId: '',
    status: 'PENDING',
    currentPeriod: null,
    tournamentId,
  });
  
  const [scoreData, setScoreData] = useState<ScoreData>({
    matchId: '',
    redAutoScore: 0,
    redDriveScore: 0,
    redTotalScore: 0,
    blueAutoScore: 0,
    blueDriveScore: 0,
    blueTotalScore: 0,
    tournamentId,
  });
  
  const [announcement, setAnnouncement] = useState<string>('');
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(false);
  
  // Format timer as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Subscribe to WebSocket events
  useEffect(() => {
    // Handle display mode changes
    const unsubDisplayMode = subscribe<AudienceDisplaySettings>(
      'display_mode_change',
      (data) => {
        console.log('Display mode change received:', data);
        setDisplaySettings(data);
        
        if (data.displayMode === 'announcement') {
          setShowAnnouncement(true);
          setAnnouncement(data.message || '');
          
          // Auto-hide announcement after 10 seconds unless duration specified
          const duration = data.message?.includes('duration:') 
            ? parseInt(data.message.split('duration:')[1]) 
            : 10000;
            
          setTimeout(() => {
            setShowAnnouncement(false);
          }, duration);
        }
      }
    );
    
    // Handle timer updates
    const unsubTimer = subscribe<TimerData>(
      'timer_update',
      (data) => {
        console.log('Timer update received:', data);
        setTimerData(data);
      }
    );
    
    // Handle match state changes
    const unsubMatchState = subscribe<MatchStateData>(
      'match_state_change',
      (data) => {
        console.log('Match state change received:', data);
        setMatchState(data);
      }
    );
    
    // Handle score updates
    const unsubScores = subscribe<ScoreData>(
      'score_update',
      (data) => {
        console.log('Score update received:', data);
        setScoreData(data);
      }
    );
    
    // Handle announcements
    const unsubAnnouncement = subscribe<{ message: string, duration?: number }>(
      'announcement',
      (data) => {
        console.log('Announcement received:', data);
        setAnnouncement(data.message);
        setShowAnnouncement(true);
        
        // Auto-hide announcement after specified duration or default to 10 seconds
        setTimeout(() => {
          setShowAnnouncement(false);
        }, data.duration || 10000);
      }
    );
    
    // Clean up subscriptions
    return () => {
      unsubDisplayMode();
      unsubTimer();
      unsubMatchState();
      unsubScores();
      unsubAnnouncement();
    };
  }, [subscribe]);
  
  // Render different display modes based on current settings
  const renderContent = () => {
    switch (displaySettings.displayMode) {
      case 'match':
        return renderMatchDisplay();
      case 'teams':
        return renderTeamsDisplay();
      case 'schedule':
        return renderScheduleDisplay();
      case 'rankings':
        return renderRankingsDisplay();
      case 'announcement':
        return renderAnnouncementDisplay();
      case 'blank':
      default:
        return <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-lg">Waiting for display content...</p>
        </div>;
    }
  };
  
  // Render match display with scores and timer
  const renderMatchDisplay = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Match Header */}
        <div className="bg-gray-800 text-white p-4 text-center">
          <h2 className="text-4xl font-bold">
            Match {matchState.matchId || displaySettings.matchId || '#'} 
            {matchState.status === 'IN_PROGRESS' && matchState.currentPeriod && (
              <span className="ml-2 text-yellow-300">
                [{matchState.currentPeriod.toUpperCase()}]
              </span>
            )}
          </h2>
          <p className="text-yellow-300">
            Status: {matchState.status.replace('_', ' ')}
          </p>
        </div>
        
        {/* Timer (if enabled) */}
        {displaySettings.showTimer !== false && (
          <div className={`p-4 text-center ${timerData.isRunning ? 'bg-green-100' : ''}`}>
            <div className="text-6xl font-bold">
              {formatTime(timerData.remaining)}
            </div>
            <div className="text-3xl text-yellow-300">
              {timerData.isRunning ? 'Running' : 'Paused'}
            </div>
          </div>
        )}
        
        {/* Scores (if enabled) */}
        {displaySettings.showScores !== false && (
          <div className="flex-1 grid grid-cols-2 gap-4 p-4">
            {/* Red Alliance */}
            <div className="bg-red-700 border-2 border-red-100 rounded-lg p-4">
              <h3 className="text-xl font-bold text-white text-center mb-4">Red Alliance</h3>
              
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Auto:</span>
                <span className="text-white">{scoreData.redAutoScore}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Teleop/Endgame:</span>
                <span className="text-white">{scoreData.redDriveScore}</span>
              </div>
              
              <div className="h-px bg-red-300 my-4" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-white">{scoreData.redTotalScore}</span>
              </div>
            </div>
            
            {/* Blue Alliance */}
            <div className="bg-blue-700 border-2 border-white rounded-lg p-4">
              <h3 className="text-xl font-bold text-white text-center mb-4">Blue Alliance</h3>
              
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Auto:</span>
                <span className="text-white">{scoreData.blueAutoScore}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Teleop/Endgame:</span>
                <span className="text-white">{scoreData.blueDriveScore}</span>
              </div>
              
              <div className="h-px bg-blue-300 my-4" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-white">{scoreData.blueTotalScore}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // TODO: Placeholder for teams display
  const renderTeamsDisplay = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Teams</h2>
          <p className="text-gray-500">Team information would be displayed here</p>
        </div>
      </div>
    );
  };
  
  // TODO: Placeholder for schedule display
  const renderScheduleDisplay = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Match Schedule</h2>
          <p className="text-gray-500">Schedule information would be displayed here</p>
        </div>
      </div>
    );
  };
  
  // TODO: Placeholder for rankings display
  const renderRankingsDisplay = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Team Rankings</h2>
          <p className="text-gray-500">Ranking information would be displayed here</p>
        </div>
      </div>
    );
  };
  
  // TODO: Render announcement display
  const renderAnnouncementDisplay = () => {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800">
        <div className="text-center p-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-6">Announcement</h2>
          <div className="text-2xl text-white bg-gray-700 p-8 rounded-lg border-2 border-yellow-500">
            {displaySettings.message || announcement}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Connection status bar */}
      <div className={`px-4 py-1 text-xs text-white ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <span>
            {isConnected ? 'Connected' : 'Disconnected'} to tournament: {tournamentId}
          </span>
          <span>Display Mode: {displaySettings.displayMode}</span>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      
      {/* Announcement overlay */}
      {showAnnouncement && displaySettings.displayMode !== 'announcement' && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Announcement</h3>
              <p className="text-lg">{announcement}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}