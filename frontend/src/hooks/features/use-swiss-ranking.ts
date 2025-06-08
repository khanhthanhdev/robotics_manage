import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/query-keys';

export function useSwissRankings(stageId: string | undefined) {
  return useQuery({
    queryKey: QueryKeys.swissRankings.byStage(stageId ?? ''),
    queryFn: async () => {
      if (!stageId) return [];
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/match-scheduler/get-swiss-rankings/${stageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch Swiss rankings');
      const data = await response.json();
      return data.rankings || [];
    },
    enabled: !!stageId,
    staleTime: 2000,
  });
}
