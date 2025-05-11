"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";
import { QueryKeys } from "@/lib/query-keys";
import { MatchStatus } from "@/lib/types";
import { MatchService } from "@/lib/match-service";

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
        return await MatchService.getAllMatches();
      } catch (error: any) {
        toast.error("Failed to fetch matches");
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch matches by stage ID
 */
export function useMatchesByStage(stageId: string) {
  return useQuery({
    queryKey: QueryKeys.matches.byStage(stageId),
    queryFn: async () => {
      try {
        return await MatchService.getMatchesByStage(stageId);
      } catch (error: any) {
        toast.error(`Failed to fetch matches for stage: ${error.message}`);
        throw error;
      }
    },
    enabled: !!stageId,
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
        return await MatchService.getMatchById(matchId);
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
    mutationFn: async ({ matchId, status }: { matchId: string; status: MatchStatus }) => {
      try {
        return await MatchService.updateMatchStatus(matchId, status);
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Match status updated successfully");
      queryClient.invalidateQueries({ queryKey: QueryKeys.matches.all() });
      queryClient.invalidateQueries({ queryKey: QueryKeys.matches.byId(data.id) });
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
  return useQuery({
    queryKey: QueryKeys.matchScores.byMatch(matchId),
    queryFn: async () => {
      if (!matchId) throw new Error("Match ID is required");
      try {
        return await MatchService.getMatchScores(matchId);
      } catch (error: any) {
        if (error.status === 401 || error.message?.includes('Unauthorized')) {
          toast.error("Authentication required. Please log in to view match scores.");
          throw new Error("Authentication required");
        }
        if (error.status === 404 || error.message?.includes('not found')) {
          return null;
        }
        toast.error(`Failed to fetch match scores: ${error.message}`);
        throw error;
      }
    },
    enabled: !!matchId,
    staleTime: 1000 * 60 * 1, // 1 minute
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        if (error.message.includes("not found")) return false;
        if (error.message.includes("Authentication required")) return false;
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
      try {
        return await MatchService.createOrUpdateMatchScores(data);
      } catch (error: any) {
        if (error.status === 401 || error.message?.includes('Unauthorized')) {
          toast.error("Authentication required. Please log in to create match scores.");
          throw new Error("Authentication required");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.matchId) {
        queryClient.invalidateQueries({ queryKey: QueryKeys.matchScores.byMatch(data.matchId) });
        queryClient.invalidateQueries({ queryKey: QueryKeys.matches.byId(data.matchId) });
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
      try {
        return await MatchService.updateMatchScores(data);
      } catch (error: any) {
        if (error.status === 401 || error.message?.includes('Unauthorized')) {
          toast.error("Authentication required. Please log in to update match scores.");
          throw new Error("Authentication required");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.matchId) {
        queryClient.invalidateQueries({ queryKey: QueryKeys.matchScores.byMatch(data.matchId) });
        queryClient.invalidateQueries({ queryKey: QueryKeys.matches.byId(data.matchId) });
        toast.success("Match scores updated successfully");
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to update match scores: ${error.message}`);
    },
  });
}