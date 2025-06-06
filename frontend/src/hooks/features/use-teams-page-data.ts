import { useState, useEffect, useMemo } from "react";
import { useTournaments } from "@/hooks/api/use-tournaments";
import { useStagesByTournament } from "@/hooks/api/use-stages";
import { useTournamentTeams } from "@/hooks/api/use-tournament-teams";
import { useTournamentStats } from "@/hooks/api/use-tournament-stats";
import { useSwissRankings } from "@/hooks/features/use-swiss-ranking";
import { useLeaderboardData } from "@/hooks/features/use-leaderboard-data";

const ALL_TEAMS_OPTION = "__ALL_TEAMS__";

export function useTeamsPageData() {
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  const [selectedStageId, setSelectedStageId] = useState<string>("");

  // API queries
  const { data: tournaments, isLoading: tournamentsLoading } = useTournaments();
  const { data: stages = [], isLoading: stagesLoading } = useStagesByTournament(selectedTournamentId);
  const { data: tournamentTeams = [], isLoading: tournamentTeamsLoading } = useTournamentTeams(
    selectedStageId === ALL_TEAMS_OPTION ? selectedTournamentId : undefined
  );  const { data: tournamentStats = [], isLoading: tournamentStatsLoading } = useTournamentStats(
    selectedStageId === ALL_TEAMS_OPTION ? selectedTournamentId : undefined
  );
  const { data: swissRankings = [], isLoading: swissLoading } = useSwissRankings(
    selectedStageId && selectedStageId !== ALL_TEAMS_OPTION ? selectedStageId : undefined
  );

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
