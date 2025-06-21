import { useState, useEffect, useMemo } from "react";
import { useTournaments } from "@/hooks/api/use-tournaments";
import { useStagesByTournament } from "@/hooks/api/use-stages";
import { useTournamentTeams } from "@/hooks/api/use-tournament-teams";
import { useTournamentStats } from "@/hooks/api/use-tournament-stats";
import { useSwissRankings } from "@/hooks/features/use-swiss-ranking";
import { useLeaderboardData } from "@/hooks/features/use-leaderboard-data";
import { apiClient } from "@/lib/api-client";

const ALL_TEAMS_OPTION = "__ALL_TEAMS__";

export function useTeamsPageData() {
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  const [selectedStageId, setSelectedStageId] = useState<string>("");

  // API queries
  const { data: tournaments, isLoading: tournamentsLoading } = useTournaments();
  const { data: stages = [], isLoading: stagesLoading } = useStagesByTournament(selectedTournamentId);
  const { data: tournamentTeams = [], isLoading: tournamentTeamsLoading } = useTournamentTeams(
    selectedStageId === ALL_TEAMS_OPTION ? selectedTournamentId : undefined
  );
  // Always fetch tournament stats for the selected tournament (not conditional on stage)
  const { data: tournamentStats = [], isLoading: tournamentStatsLoading } = useTournamentStats(selectedTournamentId);
  const { data: swissRankings = [], isLoading: swissLoading } = useSwissRankings(
    selectedStageId && selectedStageId !== ALL_TEAMS_OPTION ? selectedStageId : undefined
  );

  // Trigger ranking calculation if we have a tournament but no stats
  useEffect(() => {
    const triggerRankingCalculation = async () => {
      if (selectedTournamentId && tournamentStats.length === 0 && !tournamentStatsLoading) {
        try {
          console.log("🔄 Triggering ranking calculation for tournament:", selectedTournamentId);
          await apiClient.post(`/team-stats/update-rankings?tournamentId=${selectedTournamentId}`);
          // The stats query will automatically refetch due to React Query
        } catch (error) {
          console.error("Failed to trigger ranking calculation:", error);
        }
      }
    };
    
    // Small delay to ensure loading state is stable
    const timeoutId = setTimeout(triggerRankingCalculation, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedTournamentId, tournamentStats.length, tournamentStatsLoading]);

  // Filter stages to ensure they belong to the current tournament (extra safety)
  const filteredStages = useMemo(() => {
    return selectedTournamentId 
      ? stages.filter(stage => stage.tournamentId === selectedTournamentId)
      : [];
  }, [selectedTournamentId, stages]);

  // Transform data to leaderboard rows
  const leaderboardRows = useLeaderboardData(
    selectedStageId,
    tournamentStats,
    tournamentTeams,
    swissRankings,
    ALL_TEAMS_OPTION
  );

  // Debug console logs to check raw data values
  useEffect(() => {
    if (selectedTournamentId) {
      console.log("🔍 Debug: Teams page data check");
      console.log("Selected Tournament ID:", selectedTournamentId);
      console.log("Selected Stage ID:", selectedStageId);
      console.log("Tournament Stats (raw):", tournamentStats);
      console.log("Tournament Teams (raw):", tournamentTeams);
      console.log("Swiss Rankings (raw):", swissRankings);
      console.log("Leaderboard Rows (processed):", leaderboardRows);
      console.log("Loading states:", {
        tournamentStatsLoading,
        tournamentTeamsLoading,
        swissLoading,
        stagesLoading
      });
    }
  }, [selectedTournamentId, selectedStageId, tournamentStats, tournamentTeams, swissRankings, leaderboardRows, tournamentStatsLoading, tournamentTeamsLoading, swissLoading, stagesLoading]);

  // When tournament changes, reset stage selection
  useEffect(() => {
    setSelectedStageId("");
  }, [selectedTournamentId]);

  // When stages are loaded for the tournament, auto-select first option
  useEffect(() => {
    if (selectedTournamentId && filteredStages.length > 0 && !stagesLoading) {
      // Check if the currently selected stage belongs to the current tournament
      const stageExists = filteredStages.find(stage => stage.id === selectedStageId);
      
      if (!selectedStageId || !stageExists) {
        // Auto-select "All Teams" as the default option if no valid stage is selected
        setSelectedStageId(ALL_TEAMS_OPTION);
      }
    }
  }, [selectedTournamentId, filteredStages, stagesLoading, selectedStageId]);

  const isLoading = tournamentsLoading || stagesLoading || 
    (selectedStageId === ALL_TEAMS_OPTION ? (tournamentTeamsLoading || tournamentStatsLoading) : swissLoading);

  return {
    // Selection state
    selectedTournamentId,
    setSelectedTournamentId,
    selectedStageId,
    setSelectedStageId,
    
    // Data
    tournaments,
    filteredStages,
    leaderboardRows,
    
    // Loading states
    isLoading,
    tournamentsLoading,
    stagesLoading,
    
    // Constants
    ALL_TEAMS_OPTION,
  };
}
