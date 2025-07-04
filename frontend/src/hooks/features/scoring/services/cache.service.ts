import { ICacheService } from '../interfaces/index';
import { RealtimeScoreUpdate } from '../types/index';
import { QueryClient } from "@tanstack/react-query";

export class CacheService implements ICacheService {
  constructor(private queryClient: QueryClient) {}

  updateScoreCache(matchId: string, data: Partial<RealtimeScoreUpdate>): void {
    // Filter out undefined values to prevent accidentally clearing existing scores
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    console.log("🔄 Filtered WebSocket data:", filteredData);

    // Update the React Query cache directly, preserving existing data
    this.queryClient.setQueryData(
      ["match-scores", matchId],
      (oldData: Record<string, any> | undefined) => {
        // Preserve existing data and only update provided fields
        const baseData = oldData || {
          redAutoScore: 0,
          redDriveScore: 0,
          blueAutoScore: 0,
          blueDriveScore: 0,
          redTotalScore: 0,
          blueTotalScore: 0,
          redTeamCount: 0,
          blueTeamCount: 0,
          redMultiplier: 1.0,
          blueMultiplier: 1.0,
          redGameElements: {},
          blueGameElements: {},
          scoreDetails: {},
        };

        return {
          ...baseData,
          ...filteredData, // Only override with provided data (excluding undefined values)
        };
      }
    );

    console.log("✅ Updated cache with WebSocket data");
  }

  clearCache(matchId: string): void {
    this.queryClient.removeQueries({ queryKey: ["match-scores", matchId] });
  }

  getCache(matchId: string): any {
    return this.queryClient.getQueryData(["match-scores", matchId]);
  }
}
