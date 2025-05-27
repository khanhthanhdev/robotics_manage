import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Team } from "@/lib/types"; // Use shared Team type

export function useTeams(tournamentId: string | undefined) {
  return useQuery({
    queryKey: ["teams", tournamentId],
    queryFn: async () => {
      if (!tournamentId) return [];
      return await apiClient.get<Team[]>(`teams?tournamentId=${tournamentId}`);
    },
    enabled: !!tournamentId,
  });
}
