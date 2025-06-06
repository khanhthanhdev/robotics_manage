import { useMemo } from "react";

import type { Team } from "@/lib/types";
import type { TournamentTeamStats } from "../api/use-tournament-stats";

export interface SwissRanking {
  teamId: string;
  team?: {
    id: string;
    name: string;
    teamNumber: string;
  };
  teamName?: string;
  teamNumber?: string;
  rank?: number;
  totalScore?: number;
  highestScore?: number;
  pointsScored?: number;
  wins?: number;
  losses?: number;
  ties?: number;
  matchesPlayed?: number;
  rankingPoints?: number;
  opponentWinPercentage?: number;
  pointDifferential?: number;
}

export function useLeaderboardData(
  selectedStageId: string,
  tournamentStats: TournamentTeamStats[],
  tournamentTeams: Team[],
  swissRankings: SwissRanking[],
  allTeamsOption: string
) {
  return useMemo(() => {
    if (selectedStageId === allTeamsOption) {
      // Show all teams in tournament with stats if available
      if (tournamentStats.length > 0) {
        return tournamentStats.map((r: TournamentTeamStats, i: number) => ({
          id: r.teamId || r.team?.id || `row-${i}`,
          teamName: r.team?.name || r.teamName || "",
          teamCode: r.team?.teamNumber || r.teamNumber || "",
          rank: r.rank ?? i + 1,
          totalScore: r.totalScore ?? r.pointsScored ?? 0,
          highestScore: r.highestScore ?? r.pointsScored ?? 0,
          wins: r.wins ?? 0,
          losses: r.losses ?? 0,
          ties: r.ties ?? 0,
          matchesPlayed: r.matchesPlayed ?? 0,
          rankingPoints: r.rankingPoints ?? 0,
          opponentWinPercentage: r.opponentWinPercentage ?? 0,
          pointDifferential: r.pointDifferential ?? 0,
        }));
      }
      // Fallback: just show team list if no stats
      return tournamentTeams.map((t, i) => ({
        id: t.id,
        teamName: t.name,
        teamCode: t.teamNumber,
        rank: i + 1,
        totalScore: 0,
        highestScore: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        matchesPlayed: 0,
        rankingPoints: 0,
        opponentWinPercentage: 0,
        pointDifferential: 0,
      }));
    }
    
    // Default: Swiss rankings for stage
    return swissRankings.map((r: SwissRanking, i: number) => ({
      id: r.teamId || r.team?.id || `row-${i}`,
      teamName: r.team?.name || r.teamName || "",
      teamCode: r.team?.teamNumber || r.teamNumber || "",
      rank: r.rank ?? i + 1,
      totalScore: r.totalScore ?? r.pointsScored ?? 0,
      highestScore: r.highestScore ?? r.pointsScored ?? 0,
      wins: r.wins ?? 0,
      losses: r.losses ?? 0,
      ties: r.ties ?? 0,
      matchesPlayed: r.matchesPlayed ?? 0,
      rankingPoints: r.rankingPoints ?? 0,
      opponentWinPercentage: r.opponentWinPercentage ?? 0,
      pointDifferential: r.pointDifferential ?? 0,
    }));
  }, [selectedStageId, tournamentStats, tournamentTeams, swissRankings, allTeamsOption]);
}
