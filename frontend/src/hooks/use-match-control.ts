import { useState, useEffect, useCallback } from 'react';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';

// API base URL - should be from env vars in a real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get the auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
};

// Helper function to create headers with auth token
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `Error: ${response.status}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch (e) {
    // Ignore JSON parse errors
  }
  
  throw new Error(errorMessage);
};

// Types
export interface Match {
  id: string;
  matchNumber: number;
  roundNumber: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  startTime?: string;
  endTime?: string;
  scheduledTime?: string;
  winningAlliance?: 'RED' | 'BLUE' | 'TIE';
  stageId: string;
  stage?: {
    id: string;
    name: string;
    tournament?: {
      id: string;
      name: string;
    }
  };
  alliances?: Alliance[];
}

export interface MatchScores {
  id: string;
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  redTeamCount?: number;
  redMultiplier?: number;
  // Detailed red alliance scoring properties
  redHighGoals?: number;
  redLowGoals?: number;
  redPenalties?: number;
  redEndgamePoints?: number;

  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  blueTeamCount?: number;
  blueMultiplier?: number;
  // Detailed blue alliance scoring properties
  blueHighGoals?: number;
  blueLowGoals?: number;
  bluePenalties?: number;
  blueEndgamePoints?: number;

  redGameElements?: Record<string, number>;
  blueGameElements?: Record<string, number>;
  scoreDetails?: {
    penalties?: {
      red: number;
      blue: number;
    };
    specialScoring?: Record<string, {
      red: number;
      blue: number;
    }>;
  };
  match?: {
    id: string;
    matchNumber: number;
    status: string;
    stage?: {
      name: string;
      tournament?: {
        name: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface ScoreUpdate {
  redAutoScore?: number;
  redDriveScore?: number;
  blueAutoScore?: number;
  blueDriveScore?: number;
}

export interface TimerState {
  duration: number;
  remaining: number;
  isRunning: boolean;
}

export interface Alliance {
  id: string;
  color: 'RED' | 'BLUE';
  matchId: string;
  score: number;
  teamAlliances?: {
    team: {
      id: string;
      name: string;
      teamNumber: string;
    }
  }[]; 
  allianceScoring?: AllianceScoring;
}

export interface AllianceScoring {
  id: string;
  allianceId: string;
  autoScore: number;
  driverScore: number;
  endGameScore: number;
  penaltyScore: number;
  totalScore: number;
}

export interface AllianceScoreUpdate {
  allianceId: string;
  autoScore?: number;
  driverScore?: number;
  endGameScore?: number;
  penaltyScore?: number;
}

export interface AudienceDisplayData {
  matchId: string | null;
  showTimer: boolean;
  showScores: boolean;
  showTeams: boolean;
  displayMode: 'INTRO' | 'MATCH_RESULTS' | 'WAITING' | 'FINAL_RESULTS' | 'CUSTOM_MESSAGE' | 'DEFAULT';
  customMessage?: string;
  introVideo?: {
    source: string;
    autoplay: boolean;
    loop: boolean;
  };
  waitingMessage?: string;
  finalScoreDelay?: number; // Delay in ms before showing final results
}

// --- SOLID: Service Layer for Match Control ---
class MatchControlService {
  static async fetchMatches() {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch matches: ${response.status}`);
    return response.json();
  }

  static async fetchMatchById(matchId: string) {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch match: ${response.status}`);
    return response.json();
  }

  static async fetchMatchScores(matchId: string) {
    // Fetch all scores, then find by matchId
    const allScoresResponse = await fetch(`${API_BASE_URL}/match-scores`, {
      headers: getAuthHeaders(),
    });
    if (!allScoresResponse.ok) throw new Error(`Failed to fetch match scores: ${allScoresResponse.status}`);
    const allScores = await allScoresResponse.json();
    const matchScore = allScores.find((score: any) => score.matchId === matchId);
    if (!matchScore) return null;
    const scoreResponse = await fetch(`${API_BASE_URL}/match-scores/${matchScore.id}`, {
      headers: getAuthHeaders(),
    });
    if (!scoreResponse.ok) throw new Error(`Failed to fetch specific match score: ${scoreResponse.status}`);
    return scoreResponse.json();
  }

  static async updateMatchStatus({ id, status, timestamp }: { id: string; status: string; timestamp?: Date }) {
    const payload: any = { status };
    if (timestamp) payload[status === 'IN_PROGRESS' ? 'startTime' : 'endTime'] = timestamp.toISOString();
    const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Failed to update match status: ${response.status}`);
    return response.json();
  }

  static async updateOrCreateScores({ id, matchId, scoreUpdates }: { id?: string; matchId: string; scoreUpdates: ScoreUpdate }) {
    if (id) {
      // Try update
      const response = await fetch(`${API_BASE_URL}/match-scores/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(scoreUpdates),
      });
      if (response.ok) return response.json();
      if (response.status !== 404) throw new Error(`Failed to update scores: ${response.status}`);
    }
    // Create if not found
    const createResponse = await fetch(`${API_BASE_URL}/match-scores`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        matchId,
        ...scoreUpdates,
        redTotalScore: (scoreUpdates.redAutoScore || 0) + (scoreUpdates.redDriveScore || 0),
        blueTotalScore: (scoreUpdates.blueAutoScore || 0) + (scoreUpdates.blueDriveScore || 0),
      }),
    });
    if (!createResponse.ok) throw new Error(`Failed to create scores: ${createResponse.status}`);
    return createResponse.json();
  }
}
// --- End Service Layer ---

export function useMatchControl() {
  const queryClient = useQueryClient();
  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<TimerState>({ duration: 150, remaining: 150, isRunning: false });

  // Fetch all matches
  const matchesQuery = useQuery({
    queryKey: ['matches'],
    queryFn: MatchControlService.fetchMatches,
    staleTime: 30 * 1000,
    refetchInterval: 15 * 1000,
  });

  // Fetch current match details
  const currentMatchQuery = useQuery({
    queryKey: ['match', currentMatchId],
    queryFn: () => currentMatchId ? MatchControlService.fetchMatchById(currentMatchId) : null,
    enabled: !!currentMatchId,
    staleTime: 5 * 1000,
    refetchInterval: currentMatchId ? 5 * 1000 : false,
  });

  // Fetch current match scores
  const matchScoresQuery = useQuery({
    queryKey: ['matchScores', currentMatchId],
    queryFn: () => currentMatchId ? MatchControlService.fetchMatchScores(currentMatchId) : null,
    enabled: !!currentMatchId,
    staleTime: 2 * 1000,
    refetchInterval: currentMatchId ? 2 * 1000 : false,
  });

  // Mutations
  const updateMatchStatusMutation = useMutation({
    mutationFn: MatchControlService.updateMatchStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['match', data.id] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
    onError: (error) => {
      console.error('Failed to update match status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update match status');
    },
  });

  const updateScoresMutation = useMutation({
    mutationFn: ({ id, scoreUpdates }: { id?: string; scoreUpdates: ScoreUpdate }) =>
      MatchControlService.updateOrCreateScores({ id, matchId: currentMatchId!, scoreUpdates }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['matchScores', data.matchId] });
    },
    onError: (error) => {
      console.error('Failed to update scores:', error);
      setError(error instanceof Error ? error.message : 'Failed to update scores');
    },
  });

  // Find and load the next pending match
  const loadNextMatch = useCallback(() => {
    const matches = matchesQuery.data || [];
    const nextMatch = matches.find((match: Match) => match.status === 'PENDING');
    if (nextMatch) {
      setCurrentMatchId(nextMatch.id);
      setTimer({ duration: 150, remaining: 150, isRunning: false });
      return nextMatch;
    } else {
      setError('No pending matches found');
      return null;
    }
  }, [matchesQuery.data]);

  // Load a specific match by ID
  const loadMatchById = useCallback((matchId: string) => {
    setCurrentMatchId(matchId);
    setTimer({ duration: 150, remaining: 150, isRunning: false });
  }, []);

  // Start the match
  const startMatch = useCallback(() => {
    if (!currentMatchId) {
      setError('No match selected');
      return;
    }
    updateMatchStatusMutation.mutate({ id: currentMatchId, status: 'IN_PROGRESS', timestamp: new Date() });
    setTimer(prev => ({ ...prev, isRunning: true }));
  }, [currentMatchId, updateMatchStatusMutation]);

  // Stop/finish the match
  const stopMatch = useCallback(() => {
    if (!currentMatchId) {
      setError('No match selected');
      return;
    }
    updateMatchStatusMutation.mutate({ id: currentMatchId, status: 'COMPLETED' });
    setTimer(prev => ({ ...prev, isRunning: false }));
  }, [currentMatchId, updateMatchStatusMutation]);

  // Update match scores
  const updateScores = useCallback((scoreUpdates: ScoreUpdate) => {
    if (!currentMatchId) {
      setError('No match selected');
      return;
    }
    const scoreId = matchScoresQuery.data?.id;
    updateScoresMutation.mutate({ id: scoreId, scoreUpdates });
  }, [currentMatchId, matchScoresQuery.data, updateScoresMutation]);

  // Helper to increment a specific score field
  const incrementScore = useCallback((field: keyof ScoreUpdate, amount: number = 1) => {
    const currentMatchScores = matchScoresQuery.data;
    let currentValue = 0;
    if (currentMatchScores) {
      currentValue = currentMatchScores[field as keyof MatchScores] as number || 0;
    }
    const update = { [field]: currentValue + amount } as ScoreUpdate;
    updateScores(update);
  }, [matchScoresQuery.data, updateScores]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning && timer.remaining > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newRemaining = prev.remaining - 1;
          if (newRemaining <= 0 && currentMatchQuery.data?.status === 'IN_PROGRESS') {
            stopMatch();
          }
          return {
            ...prev,
            remaining: Math.max(0, newRemaining),
            isRunning: newRemaining > 0 ? prev.isRunning : false,
          };
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timer.isRunning, timer.remaining, currentMatchQuery.data, stopMatch]);

  // Format the timer as MM:SS
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(timer.remaining / 60);
    const seconds = timer.remaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timer.remaining]);

  // Timer control functions
  const resetTimer = useCallback(() => {
    setTimer({ duration: 150, remaining: 150, isRunning: false });
  }, []);
  const pauseTimer = useCallback(() => { setTimer(prev => ({ ...prev, isRunning: false })); }, []);
  const resumeTimer = useCallback(() => { setTimer(prev => ({ ...prev, isRunning: true })); }, []);

  return {
    matches: matchesQuery.data || [],
    currentMatch: currentMatchQuery.data,
    matchScores: matchScoresQuery.data,
    isLoading: matchesQuery.isLoading || currentMatchQuery.isLoading,
    isMatchesLoading: matchesQuery.isLoading,
    isCurrentMatchLoading: currentMatchQuery.isLoading,
    isScoresLoading: matchScoresQuery.isLoading,
    error,
    loadNextMatch,
    loadMatchById,
    startMatch,
    stopMatch,
    updateScores,
    incrementScore,
    timer: {
      ...timer,
      formatted: formattedTime(),
      reset: resetTimer,
      pause: pauseTimer,
      resume: resumeTimer,
    },
  };
}