import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { QueryKeys } from "@/lib/query-keys";

export interface TournamentTeamStats {
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

export function useTournamentStats(tournamentId: string | undefined) {
  return useQuery({
    queryKey: QueryKeys.tournamentStats.byTournament(tournamentId ?? ''),
    queryFn: async () => {
      if (!tournamentId) return [];
      return await apiClient.get<TournamentTeamStats[]>(`/team-stats/tournament/${tournamentId}`);
    },
    enabled: !!tournamentId,
  });
}
