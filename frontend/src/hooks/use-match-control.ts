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

/**
 * A custom hook for retrieving scheduled matches with pagination
 * 
 * @param stageId - Optional stage ID to filter matches by stage
 * @param page - Page number (starting from 0)
 * @param pageSize - Number of matches per page
 * @returns Array of scheduled matches sorted by scheduled time
 * 
 * @example
 * ```tsx
 * const { data: scheduledMatches, isLoading, fetchNextPage } = useScheduledMatches();
 * ```
 */
export function useScheduledMatches(stageId?: string, page: number = 0, pageSize: number = 20) {
  return useQuery({
    queryKey: ['scheduled-matches', stageId, page, pageSize],
    queryFn: async () => {
      try {
        // Add pagination query parameters
        let url = `${API_BASE_URL}/matches?page=${page}&limit=${pageSize}`;
        if (stageId) {
          url += `&stageId=${stageId}`;
        }
        
        const response = await fetch(url, {
          headers: getAuthHeaders()
        });
        
        if (!response.ok) {
          return handleApiError(response);
        }
        
        return response.json();
      } catch (error) {
        console.error("Failed to fetch scheduled matches:", error);
        return [];
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    retry: 1,
  });
}

// Helper function to sort matches by scheduled time
function sortMatchesByScheduledTime(matches: Match[]): Match[] {
  return matches.sort((a: Match, b: Match) => {
    if (!a.scheduledTime) return 1;
    if (!b.scheduledTime) return -1;
    return new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime();
  });
}

/**
 * A custom hook for starting a match by updating its status
 * 
 * @returns Mutation function and state for starting a match
 * 
 * @example
 * ```tsx
 * const { mutate: startMatch, isLoading } = useStartMatch();
 * 
 * function handleStartMatch(matchId: string) {
 *   startMatch(matchId);
 * }
 * ```
 */
export function useStartMatch() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (matchId: string) => {
      try {
        // Include both status and startTime in the payload
        const payload = {
          status: 'IN_PROGRESS',
          startTime: new Date().toISOString() // Backend might expect a startTime when starting a match
        };
        
        const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          // Log the response for debugging
          console.log(`Start match failed with status ${response.status}`);
          try {
            const errorData = await response.json();
            console.log('Error details:', errorData);
          } catch (e) {
            // Response might not include JSON
          }
          return handleApiError(response);
        }
        
        return response.json();
      } catch (error) {
        console.error('Failed to start match:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['active-match', data.id] });
      queryClient.invalidateQueries({ queryKey: ['scheduled-matches'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
    onError: (error) => {
      console.error('Failed to start match:', error);
    },
  });
}

/**
 * A custom hook for completing a match by updating its status
 * 
 * @returns Mutation function and state for completing a match
 * 
 * @example
 * ```tsx
 * const { mutate: completeMatch, isLoading } = useCompleteMatch();
 * 
 * function handleCompleteMatch(matchId: string) {
 *   completeMatch(matchId);
 * }
 * ```
 */
export function useCompleteMatch() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (matchId: string) => {
      try {
        // Include both status and endTime in the payload
        const payload = {
          status: 'COMPLETED',
          endTime: new Date().toISOString() // Include endTime when completing a match
        };
        
        const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          // Log the response for debugging
          console.log(`Complete match failed with status ${response.status}`);
          try {
            const errorData = await response.json();
            console.log('Error details:', errorData);
          } catch (e) {
            // Response might not include JSON
          }
          return handleApiError(response);
        }
        
        return response.json();
      } catch (error) {
        console.error('Failed to complete match:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['active-match', data.id] });
      queryClient.invalidateQueries({ queryKey: ['scheduled-matches'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
    onError: (error) => {
      console.error('Failed to complete match:', error);
    },
  });
}

/**
 * A custom hook for canceling a match by reverting it to PENDING status
 * 
 * @returns Mutation function and state for canceling a match
 * 
 * @example
 * ```tsx
 * const { mutate: cancelMatch, isLoading } = useCancelMatch();
 * 
 * function handleCancelMatch(matchId: string) {
 *   cancelMatch(matchId);
 * }
 * ```
 */
export function useCancelMatch() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (matchId: string) => {
      try {
        // Since there's no CANCELLED status in the backend, revert to PENDING
        const payload = {
          status: 'PENDING',
          // Clear any start/end times
          startTime: null,
          endTime: null
        };
        
        const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          // Log the response for debugging
          console.log(`Cancel match failed with status ${response.status}`);
          try {
            const errorData = await response.json();
            console.log('Error details:', errorData);
          } catch (e) {
            // Response might not include JSON
          }
          return handleApiError(response);
        }
        
        return response.json();
      } catch (error) {
        console.error('Failed to cancel match:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['active-match', data.id] });
      queryClient.invalidateQueries({ queryKey: ['scheduled-matches'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
    onError: (error) => {
      console.error('Failed to cancel match:', error);
    },
  });
}

/**
 * A custom hook for retrieving active match data
 * 
 * @param matchId - Match ID to retrieve
 * @returns The active match data
 */
export function useActiveMatch(matchId: string | null) {
  return useQuery({
    queryKey: ['active-match', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        return handleApiError(response);
      }
      
      return response.json();
    },
    enabled: !!matchId,
    staleTime: 5 * 1000, // 5 seconds
    refetchInterval: matchId ? 2 * 1000 : false, // Refetch every 2 seconds if match ID exists
    retry: 1,
  });
}

/**
 * A custom hook for retrieving match scores
 * 
 * @param matchId - Match ID to retrieve scores for
 * @returns The match scores data
 */
export function useMatchScores(matchId: string | null) {
  return useQuery({
    queryKey: ['match-scores', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      try {
        // First fetch all scores to find the score document that has the matching matchId
        const allScoresResponse = await fetch(`${API_BASE_URL}/match-scores`, {
          headers: getAuthHeaders()
        });
        
        if (!allScoresResponse.ok) {
          return handleApiError(allScoresResponse);
        }
        
        const allScores = await allScoresResponse.json() as MatchScores[];
        const matchScore = allScores.find(score => score.matchId === matchId);
        
        if (!matchScore) {
          return null;
        }
        
        // Now fetch the specific score by its ID (not matchId)
        const scoreResponse = await fetch(`${API_BASE_URL}/match-scores/${matchScore.id}`, {
          headers: getAuthHeaders()
        });
        
        if (!scoreResponse.ok) {
          return handleApiError(scoreResponse);
        }
        
        return scoreResponse.json();
      } catch (error) {
        console.error("Failed to fetch match scores:", error);
        return null;
      }
    },
    enabled: !!matchId,
    staleTime: 2 * 1000, // 2 seconds
    refetchInterval: matchId ? 2 * 1000 : false, // Refetch frequently during a match
    retry: 1,
  });
}

/**
 * A custom hook for updating alliance scores
 * 
 * @returns Functions for updating alliance scores with proper error handling
 * 
 * @example
 * ```tsx
 * const { mutate: updateScore, isLoading } = useUpdateAllianceScore();
 * 
 * updateScore({
 *   matchId: "match-123",
 *   allianceColor: "RED",
 *   scoreData: {
 *     autoScore: 10,
 *     driverScore: 15
 *   }
 * });
 * ```
 */
export function useUpdateAllianceScore() {
  const queryClient = useQueryClient();

  interface UpdateAllianceScoreParams {
    matchId: string;
    allianceColor: 'RED' | 'BLUE';
    scoreData: {
      autoScore?: number;
      driverScore?: number;
      endGameScore?: number;
      penaltyScore?: number;
    };
  }
  
  return useMutation({
    mutationFn: async ({ matchId, allianceColor, scoreData }: UpdateAllianceScoreParams) => {
      try {
        // First, get the match scores
        const scoresResponse = await fetch(`${API_BASE_URL}/match-scores`, {
          headers: getAuthHeaders()
        });
        
        if (!scoresResponse.ok) {
          return handleApiError(scoresResponse);
        }
        
        const allScores = await scoresResponse.json() as MatchScores[];
        const matchScore = allScores.find(score => score.matchId === matchId);
        
        if (!matchScore) {
          // Need to create a new score record first
          const createResponse = await fetch(`${API_BASE_URL}/match-scores`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
              matchId,
              [`${allianceColor.toLowerCase()}AutoScore`]: scoreData.autoScore || 0,
              [`${allianceColor.toLowerCase()}DriveScore`]: scoreData.driverScore || 0,
              // Initialize required fields
              [`${allianceColor.toLowerCase()}TotalScore`]: 
                (scoreData.autoScore || 0) + 
                (scoreData.driverScore || 0) + 
                (scoreData.endGameScore || 0) -
                (scoreData.penaltyScore || 0),
              [`${allianceColor === 'RED' ? 'blue' : 'red'}AutoScore`]: 0,
              [`${allianceColor === 'RED' ? 'blue' : 'red'}DriveScore`]: 0,
              [`${allianceColor === 'RED' ? 'blue' : 'red'}TotalScore`]: 0,
              scoreDetails: {
                penalties: {
                  red: allianceColor === 'RED' ? (scoreData.penaltyScore || 0) : 0,
                  blue: allianceColor === 'BLUE' ? (scoreData.penaltyScore || 0) : 0
                },
                specialScoring: {
                  endgame: {
                    red: allianceColor === 'RED' ? (scoreData.endGameScore || 0) : 0,
                    blue: allianceColor === 'BLUE' ? (scoreData.endGameScore || 0) : 0
                  }
                }
              }
            }),
          });
          
          if (!createResponse.ok) {
            return handleApiError(createResponse);
          }
          
          return createResponse.json();
        }
        
        // Update existing scores
        const updateData: Record<string, any> = {};
        
        if (scoreData.autoScore !== undefined) {
          updateData[`${allianceColor.toLowerCase()}AutoScore`] = scoreData.autoScore;
        }
        
        if (scoreData.driverScore !== undefined) {
          updateData[`${allianceColor.toLowerCase()}DriveScore`] = scoreData.driverScore;
        }
        
        // Handle special scoring like penalties and endgame scoring
        if (scoreData.penaltyScore !== undefined || scoreData.endGameScore !== undefined) {
          updateData.scoreDetails = {
            ...(matchScore.scoreDetails || {}),
            penalties: {
              ...(matchScore.scoreDetails?.penalties || { red: 0, blue: 0 }),
              [allianceColor.toLowerCase() as 'red' | 'blue']: scoreData.penaltyScore || 
                matchScore.scoreDetails?.penalties?.[allianceColor.toLowerCase() as 'red' | 'blue'] || 0
            },
            specialScoring: {
              ...(matchScore.scoreDetails?.specialScoring || {}),
              endgame: {
                ...(matchScore.scoreDetails?.specialScoring?.endgame || { red: 0, blue: 0 }),
                [allianceColor.toLowerCase() as 'red' | 'blue']: scoreData.endGameScore || 
                  matchScore.scoreDetails?.specialScoring?.endgame?.[allianceColor.toLowerCase() as 'red' | 'blue'] || 0
              }
            }
          };
        }
        
        // Update the scores
        const updateResponse = await fetch(`${API_BASE_URL}/match-scores/${matchScore.id}`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify(updateData),
        });
        
        if (!updateResponse.ok) {
          return handleApiError(updateResponse);
        }
        
        return updateResponse.json();
      } catch (error) {
        // Properly handle and transform errors
        if (error instanceof Error) {
          throw new Error(`Failed to update alliance score: ${error.message}`);
        }
        throw new Error('An unknown error occurred while updating the alliance score');
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch all relevant queries
      queryClient.invalidateQueries({ queryKey: ['match-scores', data.matchId] });
      queryClient.invalidateQueries({ queryKey: ['match', data.matchId] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['active-match', data.matchId] });
    },
    onError: (error) => {
      console.error('Failed to update alliance score:', error);
    },
    retry: 1, // Only retry once as per best practices
  });
}

/**
 * A custom hook for controlling audience display settings
 * 
 * @returns Functions for updating audience display settings
 */
export function useUpdateAudienceDisplay() {
  const [displaySettings, setDisplaySettings] = useState<AudienceDisplayData>({
    matchId: null,
    showTimer: true,
    showScores: true,
    showTeams: true,
    displayMode: 'DEFAULT',
    customMessage: '',
    waitingMessage: 'Waiting for final scores...',
    finalScoreDelay: 3000, // Default 3 seconds
  });
  
  // Convert to use useMutation to provide isPending state
  const mutation = useMutation({
    mutationFn: async (settings: Partial<AudienceDisplayData>) => {
      setDisplaySettings(prev => ({
        ...prev,
        ...settings
      }));
      
      // In a real app, you would make an API call here to persist the settings
      // For now we'll just simulate a delay to demonstrate isPending
      return new Promise<AudienceDisplayData>(resolve => {
        setTimeout(() => {
          resolve({...displaySettings, ...settings});
        }, 300);
      });
    },
  });
  
  // Helper functions for specific display modes
  const showIntroVideo = useCallback((videoSource: string, autoplay: boolean = true, loop: boolean = false) => {
    mutation.mutate({
      displayMode: 'INTRO',
      introVideo: {
        source: videoSource,
        autoplay,
        loop
      }
    });
  }, [mutation]);

  const showMatchResults = useCallback((matchId: string) => {
    mutation.mutate({
      displayMode: 'MATCH_RESULTS',
      matchId,
      showScores: true,
      showTeams: true
    });
  }, [mutation]);

  const showWaitingScreen = useCallback((message?: string, matchId?: string) => {
    mutation.mutate({
      displayMode: 'WAITING',
      waitingMessage: message || displaySettings.waitingMessage,
      matchId: matchId || displaySettings.matchId
    });
  }, [mutation, displaySettings.waitingMessage, displaySettings.matchId]);

  const showFinalResults = useCallback((matchId: string, delayMs?: number) => {
    mutation.mutate({
      displayMode: 'WAITING',
      matchId,
      waitingMessage: displaySettings.waitingMessage
    });

    // After delay, show the final results
    const delay = delayMs || displaySettings.finalScoreDelay || 3000;
    setTimeout(() => {
      mutation.mutate({
        displayMode: 'FINAL_RESULTS',
        matchId,
        showScores: true,
        showTeams: true
      });
    }, delay);
  }, [mutation, displaySettings.waitingMessage, displaySettings.finalScoreDelay]);

  const showCustomMessage = useCallback((message: string) => {
    mutation.mutate({
      displayMode: 'CUSTOM_MESSAGE',
      customMessage: message
    });
  }, [mutation]);

  // General update function for custom configurations
  const updateDisplaySettings = useCallback((settings: Partial<AudienceDisplayData>) => {
    mutation.mutate(settings);
  }, [mutation]);
  
  return {
    displaySettings,
    updateDisplaySettings,
    isPending: mutation.isPending,
    
    // Specialized functions for specific display modes
    showIntroVideo,
    showMatchResults,
    showWaitingScreen,
    showFinalResults,
    showCustomMessage
  };
}

/**
 * A custom hook for controlling matches and their scores in an admin interface.
 * 
 * @returns Functions and state for managing matches and scores
 */
export function useMatchControl() {
  const queryClient = useQueryClient();
  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<TimerState>({
    duration: 150, // 2:30 in seconds
    remaining: 150,
    isRunning: false,
  });

  // Query to fetch all matches
  const matchesQuery = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/matches`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status}`);
      }
      
      return response.json() as Promise<Match[]>;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  });

  // Query to fetch current match details
  const currentMatchQuery = useQuery({
    queryKey: ['match', currentMatchId],
    queryFn: async () => {
      if (!currentMatchId) return null;
      const response = await fetch(`${API_BASE_URL}/matches/${currentMatchId}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch match: ${response.status}`);
      }
      
      return response.json() as Promise<Match>;
    },
    enabled: !!currentMatchId,
    staleTime: 5 * 1000, // 5 seconds
    refetchInterval: currentMatchId ? 5 * 1000 : false, // Refetch every 5 seconds if a match is selected
  });

  // Query to fetch current match scores
  const matchScoresQuery = useQuery({
    queryKey: ['matchScores', currentMatchId],
    queryFn: async () => {
      if (!currentMatchId) return null;
      try {
        // First fetch all scores to find the score document that has the matching matchId
        const allScoresResponse = await fetch(`${API_BASE_URL}/match-scores`, {
          headers: getAuthHeaders()
        });
        
        if (!allScoresResponse.ok) {
          throw new Error(`Failed to fetch match scores: ${allScoresResponse.status}`);
        }
        
        const allScores = await allScoresResponse.json() as MatchScores[];
        const matchScore = allScores.find(score => score.matchId === currentMatchId);
        
        if (!matchScore) {
          return null;
        }
        
        // Now fetch the specific score using the score ID (not matchId)
        const scoreResponse = await fetch(`${API_BASE_URL}/match-scores/${matchScore.id}`, {
          headers: getAuthHeaders()
        });
        
        if (!scoreResponse.ok) {
          throw new Error(`Failed to fetch specific match score: ${scoreResponse.status}`);
        }
        
        return scoreResponse.json() as Promise<MatchScores>;
      } catch (error) {
        console.error("Failed to fetch match scores:", error);
        return null;
      }
    },
    enabled: !!currentMatchId,
    staleTime: 2 * 1000, // 2 seconds
    refetchInterval: currentMatchId ? 2 * 1000 : false, // Refetch frequently during a match
  });

  // Mutation to update match status
  const updateMatchStatusMutation = useMutation({
    mutationFn: async ({ id, status, timestamp }: { id: string; status: string; timestamp?: Date }) => {
      const payload: any = { status };
      
      // Add timestamp if provided (startTime or endTime)
      if (timestamp) {
        payload[status === 'IN_PROGRESS' ? 'startTime' : 'endTime'] = timestamp.toISOString();
      }
      
      const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update match status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['match', data.id] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
    onError: (error) => {
      console.error('Failed to update match status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update match status');
    },
  });

  // Mutation to update match scores
  const updateScoresMutation = useMutation({
    mutationFn: async ({ id, scoreUpdates }: { id: string; scoreUpdates: ScoreUpdate }) => {
      const response = await fetch(`${API_BASE_URL}/match-scores/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(scoreUpdates),
      });

      if (!response.ok) {
        // If the score doesn't exist yet, create it
        if (response.status === 404) {
          const createResponse = await fetch(`${API_BASE_URL}/match-scores`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
              matchId: currentMatchId,
              ...scoreUpdates,
              // Initialize other required fields with defaults
              redTotalScore: (scoreUpdates.redAutoScore || 0) + (scoreUpdates.redDriveScore || 0),
              blueTotalScore: (scoreUpdates.blueAutoScore || 0) + (scoreUpdates.blueDriveScore || 0),
            }),
          });
          
          if (!createResponse.ok) {
            throw new Error(`Failed to create scores: ${createResponse.status}`);
          }
          
          return createResponse.json();
        }
        
        throw new Error(`Failed to update scores: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
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
    // Look for PENDING or SCHEDULED matches
    const nextMatch = matches.find(match => 
      match.status === 'PENDING'
    );
    
    if (nextMatch) {
      setCurrentMatchId(nextMatch.id);
      // Reset timer when loading a new match
      setTimer({
        duration: 150,
        remaining: 150,
        isRunning: false,
      });
      return nextMatch;
    } else {
      setError('No pending matches found');
      return null;
    }
  }, [matchesQuery.data]);

  // Load a specific match by ID
  const loadMatchById = useCallback((matchId: string) => {
    setCurrentMatchId(matchId);
    // Reset timer when loading a new match
    setTimer({
      duration: 150,
      remaining: 150,
      isRunning: false,
    });
  }, []);

  // Start the match
  const startMatch = useCallback(() => {
    if (!currentMatchId) {
      setError('No match selected');
      return;
    }

    // Log the payload to help with debugging
    console.log('Starting match with ID:', currentMatchId);
    
    updateMatchStatusMutation.mutate({
      id: currentMatchId,
      status: 'IN_PROGRESS',
      timestamp: new Date()
    });
    
    // Start the timer
    setTimer(prev => ({ ...prev, isRunning: true }));
  }, [currentMatchId, updateMatchStatusMutation]);

  // Stop/finish the match
  const stopMatch = useCallback(() => {
    if (!currentMatchId) {
      setError('No match selected');
      return;
    }

    updateMatchStatusMutation.mutate({
      id: currentMatchId,
      status: 'COMPLETED'
    });
    
    // Stop the timer
    setTimer(prev => ({ ...prev, isRunning: false }));
  }, [currentMatchId, updateMatchStatusMutation]);

  // Update match scores
  const updateScores = useCallback((scoreUpdates: ScoreUpdate) => {
    if (!currentMatchId) {
      setError('No match selected');
      return;
    }
    
    const scoreId = matchScoresQuery.data?.id;
    
    if (scoreId) {
      // Update existing scores
      updateScoresMutation.mutate({
        id: scoreId,
        scoreUpdates,
      });
    } else {
      // Create new scores for this match if they don't exist
      updateScoresMutation.mutate({
        id: currentMatchId, // This will trigger the creation fallback in the mutation
        scoreUpdates,
      });
    }
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
          
          // Auto-stop match when timer reaches 0
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
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning, timer.remaining, currentMatchQuery.data, stopMatch]);

  // Format the timer as MM:SS
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(timer.remaining / 60);
    const seconds = timer.remaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timer.remaining]);

  // Timer control functions
  const resetTimer = useCallback(() => {
    setTimer({
      duration: 150,
      remaining: 150,
      isRunning: false,
    });
  }, []);

  const pauseTimer = useCallback(() => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimer(prev => ({ ...prev, isRunning: true }));
  }, []);

  return {
    // Match data
    matches: matchesQuery.data || [],
    currentMatch: currentMatchQuery.data,
    matchScores: matchScoresQuery.data,
    
    // Loading states
    isLoading: matchesQuery.isLoading || currentMatchQuery.isLoading,
    isMatchesLoading: matchesQuery.isLoading,
    isCurrentMatchLoading: currentMatchQuery.isLoading,
    isScoresLoading: matchScoresQuery.isLoading,
    
    // Error state
    error,
    
    // Match control functions
    loadNextMatch,
    loadMatchById,
    startMatch,
    stopMatch,
    updateScores,
    incrementScore,
    
    // Timer state and functions
    timer: {
      ...timer,
      formatted: formattedTime(),
      reset: resetTimer,
      pause: pauseTimer,
      resume: resumeTimer,
    },
  };
}