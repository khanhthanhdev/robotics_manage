"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trophy, AlertCircle, Clock } from "lucide-react";

// API base URL - should be from env vars in a real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
interface Match {
  id: string;
  matchNumber: number;
  status: 'PENDING' | 'RUNNING' | 'FINISHED';
  startTime?: string;
  endTime?: string;
  winningAlliance?: 'RED' | 'BLUE' | 'TIE';
}

interface MatchScores {
  id: string;
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  createdAt: string;
  updatedAt: string;
}

export default function MatchDisplay() {
  // Query for the currently running match
  const { data: runningMatches, isLoading: isLoadingMatches, error: matchError } = useQuery({
    queryKey: ['running-matches'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/matches`);
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status}`);
      }
      const matches = await response.json() as Match[];
      return matches.filter(match => match.status === 'RUNNING');
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Get the first running match (if any)
  const currentMatch = runningMatches && runningMatches.length > 0 ? runningMatches[0] : null;

  // Query for match scores if we have a current match
  const { data: matchScores, isLoading: isLoadingScores } = useQuery({
    queryKey: ['match-scores', currentMatch?.id],
    queryFn: async () => {
      if (!currentMatch) return null;
      try {
        const response = await fetch(`${API_BASE_URL}/match-scores/match/${currentMatch.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            return null;
          }
          throw new Error(`Failed to fetch match scores: ${response.status}`);
        }
        return response.json() as Promise<MatchScores>;
      } catch (error) {
        if (error instanceof Error && error.message.includes('404')) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!currentMatch,
    refetchInterval: 2000, // Refetch every 2 seconds when we have a current match
  });

  if (matchError) {
    return (
      <div className="container mx-auto py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {matchError instanceof Error ? matchError.message : "Failed to load match data"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoadingMatches) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentMatch) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>No Active Matches</CardTitle>
            <CardDescription>There are no matches currently in progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <Clock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-muted-foreground">
                Please check back later for live match updates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Match #{currentMatch.matchNumber}</CardTitle>
          <CardDescription className="text-lg uppercase font-semibold">
            {currentMatch.status === 'RUNNING' && (
              <span className="text-green-500">MATCH IN PROGRESS</span>
            )}
            {currentMatch.status === 'FINISHED' && (
              <span className="text-blue-500">MATCH COMPLETED</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingScores ? (
            <div className="grid grid-cols-2 gap-8">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : !matchScores ? (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">Score data is not available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Red Alliance Score Display */}
              <div className={`rounded-lg p-6 border-4 ${
                currentMatch.winningAlliance === 'RED' ? 'border-yellow-400' : 'border-transparent'
              } bg-red-100`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-red-800">RED ALLIANCE</h2>
                  {currentMatch.winningAlliance === 'RED' && (
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-lg">Auto Score:</span>
                    <span className="text-lg font-bold">{matchScores.redAutoScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg">Driver Score:</span>
                    <span className="text-lg font-bold">{matchScores.redDriveScore}</span>
                  </div>
                  <div className="h-px bg-red-300 my-4" />
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold">{matchScores.redTotalScore}</span>
                  </div>
                </div>
              </div>

              {/* Blue Alliance Score Display */}
              <div className={`rounded-lg p-6 border-4 ${
                currentMatch.winningAlliance === 'BLUE' ? 'border-yellow-400' : 'border-transparent'
              } bg-blue-100`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-blue-800">BLUE ALLIANCE</h2>
                  {currentMatch.winningAlliance === 'BLUE' && (
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-lg">Auto Score:</span>
                    <span className="text-lg font-bold">{matchScores.blueAutoScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg">Driver Score:</span>
                    <span className="text-lg font-bold">{matchScores.blueDriveScore}</span>
                  </div>
                  <div className="h-px bg-blue-300 my-4" />
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold">{matchScores.blueTotalScore}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Match timing information */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {currentMatch.startTime && (
              <p>
                Started: {new Date(currentMatch.startTime).toLocaleTimeString()}
                {currentMatch.endTime && ` • Ended: ${new Date(currentMatch.endTime).toLocaleTimeString()}`}
              </p>
            )}
            {currentMatch.status === 'FINISHED' && currentMatch.winningAlliance && (
              <p className="mt-2 text-lg">
                Winner: <span className="font-bold">
                  {currentMatch.winningAlliance === 'TIE' ? 'TIE' : `${currentMatch.winningAlliance} ALLIANCE`}
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}