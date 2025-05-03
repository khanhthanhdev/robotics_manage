"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";
import { QueryKeys } from "@/lib/query-keys";
import { MatchStatus } from "@/lib/types";

// Type definition for our match response
export interface MatchResponse {
  id: string;
  matchNumber: number;
  roundNumber: number;
  status: MatchStatus;
  startTime: string | null;
  scheduledTime: string | null;
  endTime: string | null;
  duration: number | null;
  winningAlliance: string | null;
  stageId: string;
  scoredById: string | null;
  createdAt: string;
  updatedAt: string;
  stage: {
    id: string;
    name: string;
    type: string;
    startDate: string;
    endDate: string;
    tournamentId: string;
    createdAt: string;
    updatedAt: string;
    tournament: {
      id: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      createdAt: string;
      updatedAt: string;
      adminId: string;
    };
  };
  alliances: Array<{
    id: string;
    color: string;
    score: number;
    matchId: string;
    createdAt: string;
    updatedAt: string;
    teamAlliances: Array<{
      id: string;
      teamId: string;
      allianceId: string;
      stationPosition: number;
      isSurrogate: boolean;
      createdAt: string;
      updatedAt: string;
      team: {
        id: string;
        teamNumber: string;
        name: string;
        organization: string | null;
        avatar: string | null;
        description: string | null;
        teamMembers: string | null;
        tournamentId: string;
        createdAt: string;
        updatedAt: string;
      };
    }>;
    allianceScoring: any | null;
  }>;
  scoredBy: any | null;
}

// Match Scores interface
export interface MatchScores {
  id: string;
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  redGameElements: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }>;
  blueGameElements: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }>;
  redTeamCount: number;
  redMultiplier: number;
  blueTeamCount: number;
  blueMultiplier: number;
  scoreDetails: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  match?: {
    id: string;
    matchNumber: number;
    status: string;
    winningAlliance: string | null;
  };
}

/**
 * Hook to fetch all matches
 */
export function useMatches() {
  return useQuery({
    queryKey: QueryKeys.matches.all(),
    queryFn: async () => {
      try {
        const data = await apiClient.get<MatchResponse[]>("/matches");
        return data;
      } catch (error: any) {
        toast.error("Failed to fetch matches");
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a specific match by ID
 */
export function useMatch(matchId: string) {
  return useQuery({
    queryKey: QueryKeys.matches.byId(matchId),
    queryFn: async () => {
      if (!matchId) throw new Error("Match ID is required");

      try {
        const data = await apiClient.get<MatchResponse>(`/matches/${matchId}`);
        return data;
      } catch (error: any) {
        toast.error(`Failed to fetch match details: ${error.message}`);
        throw error;
      }
    },
    enabled: !!matchId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to update a match status
 */
export function useUpdateMatchStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      matchId,
      status,
    }: {
      matchId: string;
      status: MatchStatus;
    }) => {
      try {
        const data = await apiClient.patch<MatchResponse>(
          `/matches/${matchId}/status`,
          { status }
        );
        return data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Match status updated successfully");

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: QueryKeys.matches.all() });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.matches.byId(data.id),
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to update match status: ${error.message}`);
    },
  });
}

/**
 * Hook to fetch match scores by match ID
 */
export function useMatchScores(matchId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QueryKeys.matchScores.byMatch(matchId),
    queryFn: async () => {
      if (!matchId) throw new Error("Match ID is required");

      try {
        // First verify match exists to prevent relationship errors
        await apiClient.get(`/matches/${matchId}`);

        // Fix: Remove the trailing slash to avoid double slash in the URL
        const data = await apiClient.get<MatchScores>(`/match-scores/match/${matchId}`);
        return data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          // If scores don't exist yet, we'll handle it
          throw new Error(`Match scores not found: ${error.message}`);
        }
        throw error;
      }
    },
    enabled: !!matchId,
    staleTime: 1000 * 60 * 1, // 1 minute
    retry: (failureCount, error) => {
      // Don't retry for 404 errors (scores don't exist yet)
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

/**
 * Hook to create match scores for a match
 */
export function useCreateMatchScores() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      matchId: string;
      redAutoScore?: number;
      redDriveScore?: number;
      redTotalScore?: number;
      blueAutoScore?: number;
      blueDriveScore?: number;
      blueTotalScore?: number;
      redTeamCount?: number;
      blueTeamCount?: number;
      redMultiplier?: number;
      blueMultiplier?: number;
      redGameElements?: any[];
      blueGameElements?: any[];
      scoreDetails?: Record<string, any>;
    }) => {
      // First verify the match exists to prevent relationship errors
      try {
        await apiClient.get(`/matches/${data.matchId}`);
      } catch (error) {
        throw new Error(
          `Match not found. Cannot create scores for non-existent match.`
        );
      }

      // Check if scores already exist
      try {
        // Use the correct endpoint format based on backend implementation
        const existingScores = await apiClient.get(
          `/match-scores/match/${data.matchId}`
        );
        if (existingScores) {
          // If scores exist, update them instead
          return await apiClient.patch(`/match-scores/${existingScores.id}`, data);
        }
      } catch (error) {
        // Scores don't exist, proceed with creation
      }

      // Create new match scores with proper match relationship
      return await apiClient.post(`/match-scores`, {
        matchId: data.matchId,
        redAutoScore: data.redAutoScore || 0,
        redDriveScore: data.redDriveScore || 0,
        redTotalScore: data.redTotalScore || 0,
        blueAutoScore: data.blueAutoScore || 0,
        blueDriveScore: data.blueDriveScore || 0,
        blueTotalScore: data.blueTotalScore || 0,
        redTeamCount: data.redTeamCount || 0,
        blueTeamCount: data.blueTeamCount || 0,
        redMultiplier: data.redMultiplier || 1.0,
        blueMultiplier: data.blueMultiplier || 1.0,
        redGameElements: data.redGameElements || [],
        blueGameElements: data.blueGameElements || [],
        scoreDetails: data.scoreDetails || {},
      });
    },
    onSuccess: (data) => {
      if (data?.matchId) {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.matchScores.byMatch(data.matchId),
        });
        queryClient.invalidateQueries({
          queryKey: QueryKeys.matches.byId(data.matchId),
        });
        toast.success("Match scores created successfully");
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to create match scores: ${error.message}`);
    },
  });
}

/**
 * Hook to update match scores
 */
export function useUpdateMatchScores() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      matchId?: string;
      redAutoScore?: number;
      redDriveScore?: number;
      redTotalScore?: number;
      blueAutoScore?: number;
      blueDriveScore?: number;
      blueTotalScore?: number;
      redTeamCount?: number;
      blueTeamCount?: number;
      redMultiplier?: number;
      blueMultiplier?: number;
      redGameElements?: any[];
      blueGameElements?: any[];
      scoreDetails?: Record<string, any>;
    }) => {
      if (!data.id) {
        throw new Error("Match scores ID is required for updates");
      }

      // Update match scores with patch operation
      return await apiClient.patch(`/match-scores/${data.id}`, data);
    },
    onSuccess: (data) => {
      if (data?.matchId) {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.matchScores.byMatch(data.matchId),
        });
        queryClient.invalidateQueries({
          queryKey: QueryKeys.matches.byId(data.matchId),
        });
        toast.success("Match scores updated successfully");
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to update match scores: ${error.message}`);
    },
  });
}