'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AudienceDisplaySettings, 
  MatchStateData, 
  ScoreData, 
  TimerData 
} from '@/lib/websocket-service';
import { useSwissRankings } from '../../hooks/useSwissRankings';
import { useStagesByTournament } from '@/hooks/use-stages';
import { SwissRankingsDisplay } from './components/SwissRankingsDisplay';
import TeamsDisplay, { Team } from './components/TeamsDisplay';
import ScheduleDisplay, { Match } from './components/ScheduleDisplay';

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

  // Add state for selected stage (for rankings)
  const [selectedStageId, setSelectedStageId] = useState<string>("");

  // Fetch stages for the current tournament
  const { data: stages = [], isLoading: isLoadingStages } = useStagesByTournament(tournamentId);

  // Fetch Swiss rankings for the selected stage
  const {
    data: swissRankings = [],
    isLoading: isLoadingSwissRankings,
    refetch: refetchSwissRankings,
  } = useSwissRankings(selectedStageId);

  useEffect(() => {
    console.log('Selected Stage ID:', selectedStageId);
    console.log('Swiss Rankings:', swissRankings);
  }, [selectedStageId, swissRankings]);

  // Refetch rankings when display mode is 'rankings' or selectedStageId changes
  useEffect(() => {
    if (displaySettings.displayMode === 'rankings' && selectedStageId) {
      refetchSwissRankings();
    }
  }, [displaySettings.displayMode, selectedStageId, refetchSwissRankings]);
  
  // Smooth local countdown for timer
  useEffect(() => {
    if (!timerData.isRunning || timerData.remaining <= 0) return;
    const interval = setInterval(() => {
      setTimerData(prev => {
        if (!prev.isRunning || prev.remaining <= 0) return prev;
        return { ...prev, remaining: prev.remaining - 1000 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerData.isRunning, timerData.remaining]);

  // Format timer as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Fetch teams using TanStack Query
  const {
    data: teamsData = [],
    isLoading: isLoadingTeamsQuery,
    refetch: refetchTeams,
  } = useQuery({
    queryKey: ['teams', tournamentId],
    queryFn: async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/teams`);
      if (!response.ok) throw new Error('Failed to fetch teams');
      return await response.json();
    },
    enabled: !!tournamentId,
    staleTime: 60 * 1000,
  });

  // Fetch matches (schedule) using TanStack Query
  const {
    data: matchesData = [],
    isLoading: isLoadingMatchesQuery,
    refetch: refetchMatches,
  } = useQuery({
    queryKey: ['matches', tournamentId],
    queryFn: async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/matches`);
      if (!response.ok) throw new Error('Failed to fetch matches');
      return await response.json();
    },
    enabled: !!tournamentId,
    staleTime: 60 * 1000,
  });

  // TanStack Query: fetch match scores by matchId when match changes
  const matchId = displaySettings.matchId || matchState.matchId;
  const {
    data: matchScoresData,
    isLoading: isLoadingMatchScores,
    refetch: refetchMatchScores,
  } = useQuery({
    queryKey: ['match-scores', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/match-scores/match/${matchId}`, {
        credentials: 'include',
      });
      if (!response.ok) return null;
      return await response.json();
    },
    enabled: !!matchId && displaySettings.displayMode === 'match',
    staleTime: 2000,
  });

  // Update scoreData state when matchScoresData changes (if not from socket)
  useEffect(() => {
    if (
      displaySettings.displayMode === 'match' &&
      matchScoresData &&
      matchScoresData.matchId === matchId
    ) {
      setScoreData((prev) => ({
        ...prev,
        ...matchScoresData,
        tournamentId,
      }));
    }
  }, [matchScoresData, matchId, displaySettings.displayMode, tournamentId]);

  // Subscribe to WebSocket events
  useEffect(() => {
    // Handle display mode changes
    const unsubDisplayMode = subscribe<AudienceDisplaySettings>(
      'display_mode_change',
      (data) => {
        console.log('Display mode change received:', data);
        setDisplaySettings(data);
        
        // Fetch teams when display mode changes to 'teams'
        if (data.displayMode === 'teams' && teamsData.length === 0) {
          refetchTeams();
        }
        
        // Fetch schedule when display mode changes to 'schedule'
        if (data.displayMode === 'schedule' && matchesData.length === 0) {
          refetchMatches();
        }
        
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
        // Use the dedicated TeamsDisplay component
        return <TeamsDisplay teams={teamsData} isLoading={isLoadingTeamsQuery} />;
      case 'schedule':
        // Use the new ScheduleDisplay component
        return <ScheduleDisplay matches={matchesData} isLoading={isLoadingMatchesQuery} tournamentId={tournamentId} />;
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
        <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 shadow-xl text-white p-8 text-center rounded-b-3xl border-b-4 border-blue-400 relative animate-fade-in">
          <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-lg mb-2">
            Match <span className="text-yellow-300">{matchState.matchId || displaySettings.matchId || '#'}</span>
            {matchState.status === 'IN_PROGRESS' && matchState.currentPeriod && (
              <span className="ml-4 text-3xl text-green-300 animate-pulse">
                [{matchState.currentPeriod.toUpperCase()}]
              </span>
            )}
          </h2>
          <p className="text-2xl text-yellow-300 font-bold animate-fade-in-slow">
            Status: <span className={
              matchState.status === 'IN_PROGRESS' ? 'text-green-400' :
              matchState.status === 'COMPLETED' ? 'text-blue-300' :
              'text-yellow-300'
            }>{matchState.status.replace('_', ' ')}</span>
          </p>
        </div>
        {/* Timer (if enabled) */}
        {displaySettings.showTimer !== false && (
          <div className={`p-8 text-center ${timerData.isRunning ? 'bg-green-100' : 'bg-yellow-50'} animate-fade-in`}> 
            <div className="text-7xl font-extrabold text-blue-900 drop-shadow-lg">
              {formatTime(timerData.remaining)}
            </div>
            <div className={`text-3xl font-bold mt-2 ${timerData.isRunning ? 'text-green-600 animate-pulse' : 'text-yellow-600'}`}> 
              {timerData.isRunning ? 'Running' : 'Paused'}
            </div>
          </div>
        )}
        {/* Scores (if enabled) */}
        {displaySettings.showScores !== false && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 animate-fade-in-slow">
            {/* Red Alliance */}
            <div className="bg-gradient-to-br from-red-700 to-red-500 border-4 border-yellow-300 rounded-2xl p-8 shadow-xl flex flex-col justify-between">
              <h3 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wider drop-shadow">Red Alliance</h3>
              <div className="flex justify-between mb-4 text-xl font-semibold">
                <span className="text-yellow-200">Auto:</span>
                <span className="text-white">{scoreData.redAutoScore}</span>
              </div>
              <div className="flex justify-between mb-4 text-xl font-semibold">
                <span className="text-yellow-200">Teleop/Endgame:</span>
                <span className="text-white">{scoreData.redDriveScore}</span>
              </div>
              <div className="h-1 bg-yellow-300 my-6 rounded-full" />
              <div className="flex justify-between text-3xl font-extrabold">
                <span className="text-yellow-200">Total:</span>
                <span className="text-white">{scoreData.redTotalScore}</span>
              </div>
            </div>
            {/* Blue Alliance */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-500 border-4 border-yellow-300 rounded-2xl p-8 shadow-xl flex flex-col justify-between">
              <h3 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wider drop-shadow">Blue Alliance</h3>
              <div className="flex justify-between mb-4 text-xl font-semibold">
                <span className="text-yellow-200">Auto:</span>
                <span className="text-white">{scoreData.blueAutoScore}</span>
              </div>
              <div className="flex justify-between mb-4 text-xl font-semibold">
                <span className="text-yellow-200">Teleop/Endgame:</span>
                <span className="text-white">{scoreData.blueDriveScore}</span>
              </div>
              <div className="h-1 bg-yellow-300 my-6 rounded-full" />
              <div className="flex justify-between text-3xl font-extrabold">
                <span className="text-yellow-200">Total:</span>
                <span className="text-white">{scoreData.blueTotalScore}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Rankings display
  const renderRankingsDisplay = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in">
        <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-yellow-50 rounded-2xl shadow-xl border-2 border-blue-200 mb-6">
          <h2 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">Team Rankings</h2>
          <div className="mb-4">
            <label htmlFor="stage-select" className="text-blue-700 font-semibold mr-2">Stage:</label>
            <select
              id="stage-select"
              value={selectedStageId}
              onChange={e => setSelectedStageId(e.target.value)}
              className="border rounded px-2 py-1 text-blue-900"
              disabled={isLoadingStages}
            >
              <option value="">Select Stage</option>
              {stages.filter(s => s.type === 'SWISS').map(stage => (
                <option key={stage.id} value={stage.id}>{stage.name}</option>
              ))}
            </select>
          </div>
        </div>
        {isLoadingSwissRankings ? (
          <div className="text-blue-400 text-xl">Loading rankings...</div>
        ) : (
          <SwissRankingsDisplay rankings={swissRankings} />
        )}
      </div>
    );
  };

  // Render announcement display
  const renderAnnouncementDisplay = () => {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-200 to-blue-100 animate-fade-in">
        <div className="text-center p-12 max-w-4xl bg-white rounded-2xl border-4 border-yellow-400 shadow-xl">
          <h2 className="text-4xl font-extrabold text-yellow-600 mb-8 drop-shadow">Announcement</h2>
          <div className="text-3xl text-blue-900 bg-yellow-100 p-10 rounded-lg border-2 border-yellow-500 font-bold animate-pulse">
            {displaySettings.message || announcement}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Connection status bar */}
      <div className={`px-4 py-2 text-sm font-bold text-white shadow-lg ${isConnected ? 'bg-green-600' : 'bg-red-600'} animate-fade-in`}> 
        <div className="container mx-auto flex justify-between items-center">
          <span>
            <span className="inline-block w-3 h-3 rounded-full mr-2 align-middle bg-green-300 animate-pulse"></span>
            {isConnected ? <span className="text-green-200">Connected</span> : <span className="text-red-200">Disconnected</span>} to tournament: <span className="text-yellow-300 font-extrabold">{tournamentId}</span>
          </span>
          <span className="text-blue-100">Display Mode: <span className="font-bold text-yellow-200">{displaySettings.displayMode}</span></span>
        </div>
      </div>
      {/* Main content area */}
      <div className="flex-1 overflow-hidden bg-gradient-to-b from-blue-50 to-yellow-50 animate-fade-in-slow">
        {renderContent()}
      </div>
      {/* Announcement overlay */}
      {showAnnouncement && displaySettings.displayMode !== 'announcement' && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-2xl mx-4 shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-10">
              <h3 className="text-3xl font-extrabold mb-6 text-yellow-600 drop-shadow">Announcement</h3>
              <p className="text-2xl text-blue-900 font-bold animate-pulse">{announcement}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}