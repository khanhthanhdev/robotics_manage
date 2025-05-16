import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface Team {
  id: string;
  name: string;
  teamNumber?: string;
  organization?: string;
  location?: string;
}

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
