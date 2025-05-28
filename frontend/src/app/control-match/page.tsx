"use client";

import React, { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  useMatches,
  useMatch,
  useMatchScores,
  useUpdateMatchScores,
  useCreateMatchScores,
  useUpdateMatchStatus,
} from "@/hooks/api/use-matches";
import { MatchStatus } from "@/lib/types";
import { useWebSocket } from "@/hooks/common/use-websocket";
import { useTournaments } from "@/hooks/api/use-tournaments";
import { MatchData } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ConnectionStatus from "../../components/features/control-match/connection-status";
import { toast } from "sonner";
import MatchControlTabs from "../../components/features/control-match/match-control-tab";
import FieldSelectDropdown from "@/components/fields/FieldSelectDropdown";


// Convert game elements from object format to array format
const objectToArrayGameElements = (
  gameElements: Record<string, any> | any[] | null | undefined
) => {
  // Handle null/undefined case
  if (!gameElements) return [];

  // If it's already an array, return it
  if (Array.isArray(gameElements)) return gameElements;

  // Handle empty object case
  if (
    typeof gameElements === "object" &&
    Object.keys(gameElements).length === 0
  )
    return [];

  try {
    // Convert object format to array format
    return Object.entries(gameElements).map(([element, value]) => {
      // Handle the case where value is already an object with required properties
      if (typeof value === "object" && value !== null && "count" in value) {
        return {
          element,
          count: Number(value.count || 0),
          pointsEach: Number(value.pointsEach || 1),
          totalPoints: Number(value.totalPoints || value.count),
          operation: value.operation || "multiply",
        };
      }

      // Standard case where value is just a number
      return {
        element,
        count: Number(value),
        pointsEach: 1, // Default value
        totalPoints: Number(value), // Default to same as count
        operation: "multiply", // Default operation
      };
    });
  } catch (error) {
    console.error("Error converting game elements:", error, gameElements);
    return [];
  }
};

// Convert game elements from array format to object format for API
const arrayToObjectGameElements = (
  gameElements: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }>
) => {
  const result: Record<string, number> = {};
  gameElements.forEach((item) => {
    result[item.element] = item.count;
  });
  return result;
};

// Client component using WebSockets
export default function ControlMatchPage() {
  // Tournament selection state
  const { data: tournaments = [], isLoading: tournamentsLoading } = useTournaments();
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");

  // Set default tournamentId on load (first available or demo)
  useEffect(() => {
    if (!tournamentsLoading && tournaments.length > 0 && !selectedTournamentId) {
      setSelectedTournamentId(tournaments[0].id);
    }
  }, [tournaments, tournamentsLoading, selectedTournamentId]);

  // Use selectedTournamentId for all tournament-specific logic
  const tournamentId = selectedTournamentId || "demo-tournament";

  // React Query client for cache manipulation
  const queryClient = useQueryClient();

  // UI state declarations
  // NOTE: We need to declare selectedMatchId BEFORE we use it in React Query hooks below
  const [displayMode, setDisplayMode] = React.useState<string>("match");
  const [selectedMatchId, setSelectedMatchId] = React.useState<string>("");
  const [showTimer, setShowTimer] = React.useState<boolean>(true);
  const [showScores, setShowScores] = React.useState<boolean>(true);
  const [showTeams, setShowTeams] = React.useState<boolean>(true);
  const [announcementMessage, setAnnouncementMessage] =
    React.useState<string>("");
  // Add state for selected field
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  // Fetch matches using React Query, filtered by selectedFieldId
  const { data: matchesData = [], isLoading: isLoadingMatches } = useMatches({
    fieldId: selectedFieldId,
  });

  // Fetch all match scores at once for the matches list
  const {
    data: allMatchScores = [],
    isLoading: isLoadingAllScores,
    error: allScoresError,
    refetch: refetchAllScores,
  } = useQuery({
    queryKey: ["all-match-scores"],
    queryFn: async () => {
      
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${API_BASE_URL}/api/match-scores`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch match scores");
      return await response.json();
    },
    staleTime: 60 * 1000, // 1 minute
    enabled: !isLoadingMatches && matchesData.length > 0,
  });

  // Build a map of matchId -> { redTotalScore, blueTotalScore }
  const matchScoresMap = React.useMemo(() => {
    if (!isLoadingAllScores && Array.isArray(allMatchScores)) {
      const scoresMap: Record<
        string,
        { redTotalScore: number; blueTotalScore: number }
      > = {};
      allMatchScores.forEach((score: any) => {
        if (
          score.matchId &&
          score.redTotalScore !== undefined &&
          score.blueTotalScore !== undefined
        ) {
          scoresMap[score.matchId] = {
            redTotalScore: score.redTotalScore,
            blueTotalScore: score.blueTotalScore,
          };
        }
      });
      return scoresMap;
    }
    return {};
  }, [allMatchScores, isLoadingAllScores]);

  // Fetch selected match details when a match is selected
  const { data: selectedMatch, isLoading: isLoadingMatchDetails } = useMatch(
    selectedMatchId || ""
  );

  // Fetch match scores for the selected match
  const {
    data: matchScores,
    isLoading: isLoadingScores,
    refetch: refetchScores,
  } = useMatchScores(selectedMatchId || "");

  // Mutations for creating and updating scores
  const createMatchScores = useCreateMatchScores();
  const updateMatchScores = useUpdateMatchScores();

  // Get the match status update mutation
  const updateMatchStatus = useUpdateMatchStatus();

  // Helper function to extract red teams from alliances
  const getRedTeams = (match?: any) => {
    if (!match?.alliances) return [];
    const redAlliance = match.alliances.find(
      (alliance: any) => alliance.color === "RED"
    );
    if (!redAlliance?.teamAlliances) return [];
    return redAlliance.teamAlliances.map(
      (ta: any) => ta.team?.teamNumber || ta.team?.name || "Unknown"
    );
  };

  // Helper function to extract blue teams from alliances
  const getBlueTeams = (match?: any) => {
    if (!match?.alliances) return [];
    const blueAlliance = match.alliances.find(
      (alliance: any) => alliance.color === "BLUE"
    );
    if (!blueAlliance?.teamAlliances) return [];
    return blueAlliance.teamAlliances.map(
      (ta: any) => ta.team?.teamNumber || ta.team?.name || "Unknown"
    );
  };
  // Connect to WebSocket with the tournament ID and auto-connect
  const {
    isConnected,
    currentTournament,
    joinTournament,
    changeDisplayMode,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    subscribe,
    joinFieldRoom,
    leaveFieldRoom,
  } = useWebSocket({ tournamentId, autoConnect: true });
  // Join tournament and field rooms on mount
  useEffect(() => {
    if (!tournamentId) return;
    
    // Join tournament room first
    joinTournament(tournamentId);
    console.log(`Joining tournament: ${tournamentId}`);
    
    // Then join field room if selected
    if (selectedFieldId) {
      joinFieldRoom(selectedFieldId);
      console.log(`Joining field room: ${selectedFieldId} in tournament: ${tournamentId}`);
    }
    
    // On unmount, leave the field room
    return () => {
      if (selectedFieldId) {
        leaveFieldRoom(selectedFieldId);
        console.log(`Leaving field room: ${selectedFieldId}`);
      }
    };
  }, [tournamentId, selectedFieldId, joinTournament, joinFieldRoom, leaveFieldRoom]);

  // UI state for timer controls
  const [timerDuration, setTimerDuration] = React.useState<number>(150000); // 2:30 in ms
  const [matchPeriod, setMatchPeriod] = React.useState<string>("auto");

  // Timer display state for live clock
  const [timerRemaining, setTimerRemaining] = useState<number>(timerDuration);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);

  // Format timer as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Sync timerRemaining and timerIsRunning with timerDuration and timer state
  useEffect(() => {
    setTimerRemaining(timerDuration);
  }, [timerDuration]);
  // Listen for timer updates from WebSocket
  useEffect(() => {
    // Handler for timer updates from WebSocket
    const handleTimerUpdate = (data: any) => {
      console.log("Timer update received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring timer update for different field: ${data.fieldId}`);
        return;
      }

      // Update local timer state from the websocket data
      if (data) {
        setTimerRemaining(data.remaining || 0);
        setTimerIsRunning(data.isRunning || false);
      }
    };

    // Subscribe to timer updates using the subscribe method from useWebSocket
    const unsubscribe = subscribe("timer_update", handleTimerUpdate);

    // Cleanup subscription when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedFieldId]);

  // Subscribe to WebSocket score updates and update React Query cache
  useEffect(() => {
    if (!selectedMatchId) return;    const handleScoreUpdate = (data: {
      matchId: string;
      fieldId?: string;
      redAutoScore?: number;
      redDriveScore?: number;
      redTotalScore?: number;
      blueAutoScore?: number;
      blueDriveScore?: number;
      blueTotalScore?: number;
      [key: string]: any;
    }) => {
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring score update for different field: ${data.fieldId}`);
        return;
      }
      
      if (data.matchId === selectedMatchId) {
        console.log("Score update received for selected match:", data);
        
        // Update the React Query cache directly
        queryClient.setQueryData(
          ["match-scores", selectedMatchId],
          (oldData: Record<string, any> | undefined) => ({
            ...(oldData || {}),
            ...data,
          })
        );

        // Force a refetch to ensure we have the latest data
        refetchScores();
      }
    };

    // Subscribe to score updates using the websocket hook
    const unsubscribe = subscribe("score_update", handleScoreUpdate);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedMatchId, subscribe, queryClient, refetchScores]);

  // State for tracking active match from WebSocket
  const [activeMatch, setActiveMatch] = useState<any>(null);
  
  // Listen for match updates from WebSocket
  useEffect(() => {
    const handleMatchUpdate = (data: any) => {
      console.log("Match update received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring match update for different field: ${data.fieldId}`);
        return;
      }
      
      setActiveMatch(data);
      
      // Auto-select this match if we don't have one selected yet
      if (!selectedMatchId && data.id) {
        setSelectedMatchId(data.id);
      }
      
      // If this is the currently selected match, update the cache
      if (data.id === selectedMatchId) {
        queryClient.setQueryData(
          ["match", selectedMatchId],
          (oldData: Record<string, any> | undefined) => {
            if (!oldData) return data;
            
            return {
              ...oldData,
              ...data,
            };
          }
        );
      }
    };
    
    // Subscribe to match updates
    const unsubscribe = subscribe("match_update", handleMatchUpdate);
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedMatchId, queryClient, selectedFieldId]);

  // State for tracking match state from WebSocket
  const [matchState, setMatchState] = useState<any>(null);
  
  // Listen for match state changes from WebSocket
  useEffect(() => {
    const handleMatchStateChange = (data: any) => {
      console.log("Match state change received:", data);
      
      // Filter messages by fieldId if we're in a specific field room
      if (selectedFieldId && data.fieldId && data.fieldId !== selectedFieldId) {
        console.log(`Ignoring match state update for different field: ${data.fieldId}`);
        return;
      }
      
      setMatchState(data);
      
      // Update the selected match if it's the same match
      if (data.matchId === selectedMatchId) {
        // Update match query cache with new status
        queryClient.setQueryData(
          ["match", selectedMatchId],
          (oldData: Record<string, any> | undefined) => {
            if (!oldData) return oldData;
            
            return {
              ...oldData,
              status: data.status || oldData.status,
            };
          }
        );
      }
    };
    
    // Subscribe to match state changes
    const unsubscribe = subscribe("match_state_change", handleMatchStateChange);
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, selectedMatchId, queryClient, selectedFieldId]);

  // UI state for score controls
  const [redAutoScore, setRedAutoScore] = React.useState<number>(0);
  const [redDriveScore, setRedDriveScore] = React.useState<number>(0);
  const [blueAutoScore, setBlueAutoScore] = React.useState<number>(0);
  const [blueDriveScore, setBlueDriveScore] = React.useState<number>(0);

  // Enhanced scoring states
  const [redGameElements, setRedGameElements] = useState<
    Array<{
      element: string;
      count: number;
      pointsEach: number;
      totalPoints: number;
      operation: string;
    }>
  >([]);
  const [blueGameElements, setBlueGameElements] = useState<
    Array<{
      element: string;
      count: number;
      pointsEach: number;
      totalPoints: number;
      operation: string;
    }>
  >([]);
  const [redTeamCount, setRedTeamCount] = useState<number>(0);
  const [blueTeamCount, setBlueTeamCount] = useState<number>(0);
  const [redMultiplier, setRedMultiplier] = useState<number>(1.0);
  const [blueMultiplier, setBlueMultiplier] = useState<number>(1.0);
  const [scoreDetails, setScoreDetails] = useState<any>(null);
  const [isAddingRedElement, setIsAddingRedElement] = useState<boolean>(false);
  const [isAddingBlueElement, setIsAddingBlueElement] =
    useState<boolean>(false);

  // Add states for total scores
  const [redTotalScore, setRedTotalScore] = useState<number>(0);
  const [blueTotalScore, setBlueTotalScore] = useState<number>(0);

  // Sync local state with match scores data from React Query
  useEffect(() => {
    if (matchScores) {
      // Update all score-related states from fetched data
      setRedAutoScore(matchScores.redAutoScore || 0);
      setRedDriveScore(matchScores.redDriveScore || 0);
      setBlueAutoScore(matchScores.blueAutoScore || 0);
      setBlueDriveScore(matchScores.blueDriveScore || 0);
      setRedTotalScore(matchScores.redTotalScore || 0);
      setBlueTotalScore(matchScores.blueTotalScore || 0);

      // Team counts and multipliers
      setRedTeamCount(matchScores.redTeamCount || 0);
      setBlueTeamCount(matchScores.blueTeamCount || 0);
      setRedMultiplier(matchScores.redMultiplier || 1.0);
      setBlueMultiplier(matchScores.blueMultiplier || 1.0);

      // Game elements - convert from object to array if needed
      setRedGameElements(
        objectToArrayGameElements(matchScores.redGameElements)
      );
      setBlueGameElements(
        objectToArrayGameElements(matchScores.blueGameElements)
      );

      // Score details
      setScoreDetails(matchScores.scoreDetails || {});
    } else if (!isLoadingScores && selectedMatchId) {
      // If we finished loading and there are no scores yet, reset to default values
      setRedAutoScore(0);
      setRedDriveScore(0);
      setBlueAutoScore(0);
      setBlueDriveScore(0);
      setRedTotalScore(0);
      setBlueTotalScore(0);
      setRedTeamCount(0);
      setBlueTeamCount(0);
      setRedMultiplier(1.0);
      setBlueMultiplier(1.0);
      setRedGameElements([]);
      setBlueGameElements([]);
      setScoreDetails({});
    }
  }, [matchScores, isLoadingScores, selectedMatchId]);  // Handle selecting a match
  const handleSelectMatch = (match: {
    id: string;
    matchNumber: string | number;
    fieldId?: string;
  }) => {
    setSelectedMatchId(match.id);
    // If match has a fieldId, use it
    if (match.fieldId) {
      setSelectedFieldId(match.fieldId);
    }
    
    // Automatically update display settings to show the selected match
    changeDisplayMode({
      displayMode: "match",
      matchId: match.id,
      showTimer,
      showScores,
      showTeams,
      tournamentId,
      fieldId: match.fieldId || selectedFieldId || undefined,
    });    // Also send a match_update event to synchronize match data with audience display
    // This ensures the audience display has the complete match details
    if (selectedMatch) {
      // Create properly typed match data
      const matchData: Omit<MatchData, 'tournamentId'> = {
        id: match.id,
        matchNumber: typeof match.matchNumber === 'string' ? parseInt(match.matchNumber, 10) : match.matchNumber,
        status: selectedMatch.status
      };
      
      // Extract team information for both alliances
      const redTeams = getRedTeams(selectedMatch).map((teamNumber: string | number) => ({ 
        name: teamNumber 
      }));
      
      const blueTeams = getBlueTeams(selectedMatch).map((teamNumber: string | number) => ({ 
        name: teamNumber 
      }));
      
      // Send match update with additional field data and team information
      sendMatchUpdate({
        ...matchData,
        fieldId: match.fieldId || selectedFieldId || undefined,
        redTeams,
        blueTeams,
        scheduledTime: selectedMatch.scheduledTime,
      } as any);
    }
  };
  // Handle display mode change
  const handleDisplayModeChange = () => {
    changeDisplayMode({
      displayMode: displayMode as any,
      matchId: selectedMatchId || null,
      showTimer,
      showScores,
      showTeams,
      tournamentId: currentTournament!,
      fieldId: selectedFieldId || undefined,
    });
  };

  // Handle timer controls
  const handleStartTimer = () => {
    if (timerIsRunning) return;
    const startTime = timerRemaining > 0 ? timerRemaining : timerDuration;
    startTimer({
      duration: timerDuration,
      remaining: startTime,
      fieldId: selectedFieldId,
    } as any);
    setTimerIsRunning(true);
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: "IN_PROGRESS",
      currentPeriod: matchPeriod as any,
      fieldId: selectedFieldId,
    } as any);
    updateMatchStatus.mutate({ 
      matchId: selectedMatchId, 
      status: MatchStatus.IN_PROGRESS 
    });
  };

  const handlePauseTimer = () => {
    pauseTimer({
      duration: timerDuration,
      remaining: timerRemaining,
      isRunning: false,
      fieldId: selectedFieldId,
    } as any);
    setTimerIsRunning(false);
  };

  const handleResetTimer = () => {
    resetTimer({
      duration: timerDuration,
      remaining: timerDuration,
      isRunning: false,
      fieldId: selectedFieldId,
    } as any);
    setTimerRemaining(timerDuration);
    setTimerIsRunning(false);
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: "PENDING",
      currentPeriod: null,
      fieldId: selectedFieldId,
    } as any);
    updateMatchStatus.mutate({ 
      matchId: selectedMatchId, 
      status: MatchStatus.PENDING 
    });
  };

  // Handle score updates
  const handleUpdateScores = () => {
    if (!selectedMatchId) return;
    const redGameElementsObj = arrayToObjectGameElements(redGameElements);
    const blueGameElementsObj = arrayToObjectGameElements(blueGameElements);
    const mutationData = {
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      redGameElements: redGameElementsObj, // <-- use object, not array
      blueGameElements: blueGameElementsObj, // <-- use object, not array
      redTeamCount,
      redMultiplier,
      blueTeamCount,
      blueMultiplier,
      scoreDetails,
    };
    const wsScoreData = {
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      redGameElements: redGameElementsObj,
      blueGameElements: blueGameElementsObj,
      redTeamCount,
      redMultiplier,
      blueTeamCount,
      blueMultiplier,
      scoreDetails,
      fieldId: selectedFieldId,
    };
    if (matchScores?.id) {
      updateMatchScores.mutate({
        id: matchScores.id,
        ...mutationData,
      });
    } else {
      createMatchScores.mutate(mutationData);
    }
    sendScoreUpdate(wsScoreData as any);
  };

  // Handle submitting final scores and completing the match
  const handleSubmitScores = () => {
    handleUpdateScores();
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: "COMPLETED",
      currentPeriod: null,
      fieldId: selectedFieldId,
    } as any);
    updateMatchStatus.mutate({ 
      matchId: selectedMatchId, 
      status: MatchStatus.COMPLETED 
    });
    toast.success("Match Completed", {
      description: `Final score: Red ${redTotalScore} - Blue ${blueTotalScore}`,
    });
  };
  // Handle sending an announcement
  const handleSendAnnouncement = () => {
    if (announcementMessage.trim()) {
      sendAnnouncement(announcementMessage.trim());

      // Switch display mode to announcement
      changeDisplayMode({
        displayMode: "announcement",
        message: announcementMessage.trim(),
        tournamentId: currentTournament!,
        fieldId: selectedFieldId || undefined,
      });

      // Clear input after sending
      setAnnouncementMessage("");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_PROGRESS":
        return "bg-green-100 text-green-800 border-green-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Update total scores with multipliers and game elements
  useEffect(() => {
    if (selectedMatchId) {
      const redElementsTotal = redGameElements.reduce(
        (sum, item) => sum + item.totalPoints,
        0
      );
      const blueElementsTotal = blueGameElements.reduce(
        (sum, item) => sum + item.totalPoints,
        0
      );

      const newRedTotalScore = Math.round(
        (redAutoScore + redDriveScore + redElementsTotal) * redMultiplier
      );
      const newBlueTotalScore = Math.round(
        (blueAutoScore + blueDriveScore + blueElementsTotal) * blueMultiplier
      );

      // Only update state if needed to prevent render loops
      if (redTotalScore !== newRedTotalScore) {
        setRedTotalScore(newRedTotalScore);
      }

      if (blueTotalScore !== newBlueTotalScore) {
        setBlueTotalScore(newBlueTotalScore);
      }
    }
  }, [
    redAutoScore,
    redDriveScore,
    blueAutoScore,
    blueDriveScore,
    redGameElements,
    blueGameElements,
    redMultiplier,
    blueMultiplier,
  ]);

  // Handle multiplier selection based on team count
  const updateRedTeamCount = (count: number) => {
    setRedTeamCount(count);
    switch (count) {
      case 1:
        setRedMultiplier(1.25);
        break;
      case 2:
        setRedMultiplier(1.5);
        break;
      case 3:
        setRedMultiplier(1.75);
        break;
      case 4:
        setRedMultiplier(2.0);
        break;
      default:
        setRedMultiplier(1.0);
    }
  };

  const updateBlueTeamCount = (count: number) => {
    setBlueTeamCount(count);
    switch (count) {
      case 1:
        setBlueMultiplier(1.25);
        break;
      case 2:
        setBlueMultiplier(1.5);
        break;
      case 3:
        setBlueMultiplier(1.75);
        break;
      case 4:
        setBlueMultiplier(2.0);
        break;
      default:
        setBlueMultiplier(1.0);
    }
  };

  // Add a new game element to red alliance
  const addRedGameElement = () => {
    if (!document.getElementById("element-name")) return; // Safety check

    const elementName = (
      document.getElementById("element-name") as HTMLInputElement
    ).value.trim();
    const elementCount = Number(
      (document.getElementById("element-count") as HTMLInputElement)?.value || 1
    );
    const elementPoints = Number(
      (document.getElementById("element-points") as HTMLInputElement)?.value ||
        1
    );
    const elementOperation =
      (document.getElementById("element-operation") as HTMLSelectElement)
        ?.value || "multiply";

    if (!elementName) return;

    const totalPoints =
      elementOperation === "multiply"
        ? elementCount * elementPoints
        : elementCount + elementPoints;

    const newElement = {
      element: elementName,
      count: elementCount,
      pointsEach: elementPoints,
      operation: elementOperation,
      totalPoints,
    };

    setRedGameElements([...redGameElements, newElement]);
    setIsAddingRedElement(false);
  };

  // Add a new game element to blue alliance
  const addBlueGameElement = () => {
    if (!document.getElementById("element-name")) return; // Safety check

    const elementName = (
      document.getElementById("element-name") as HTMLInputElement
    ).value.trim();
    const elementCount = Number(
      (document.getElementById("element-count") as HTMLInputElement)?.value || 1
    );
    const elementPoints = Number(
      (document.getElementById("element-points") as HTMLInputElement)?.value ||
        1
    );
    const elementOperation =
      (document.getElementById("element-operation") as HTMLSelectElement)
        ?.value || "multiply";

    if (!elementName) return;

    const totalPoints =
      elementOperation === "multiply"
        ? elementCount * elementPoints
        : elementCount + elementPoints;

    const newElement = {
      element: elementName,
      count: elementCount,
      pointsEach: elementPoints,
      operation: elementOperation,
      totalPoints,
    };

    setBlueGameElements([...blueGameElements, newElement]);
    setIsAddingBlueElement(false);
  };

  // Remove a game element
  const removeGameElement = (alliance: "red" | "blue", index: number) => {
    if (alliance === "red") {
      const updatedElements = [...redGameElements];
      updatedElements.splice(index, 1);
      setRedGameElements(updatedElements);
    } else {
      const updatedElements = [...blueGameElements];
      updatedElements.splice(index, 1);
      setBlueGameElements(updatedElements);
    }
  };

  // Track connection status and attempts
  const [connectionAttempts, setConnectionAttempts] = useState<number>(0);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  // Update connection error message based on connection status
  useEffect(() => {
    if (!isConnected) {
      const attemptMessage = connectionAttempts > 0 ? ` (Attempt ${connectionAttempts + 1})` : '';
      setConnectionError(`WebSocket connection not established${attemptMessage}. Ensure the server is running.`);
      
      // Increment connection attempts and retry after delay
      const timeoutId = setTimeout(() => {
        setConnectionAttempts(prev => prev + 1);
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else {
      setConnectionError(null);
      setConnectionAttempts(0);
    }
  }, [isConnected, connectionAttempts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Match Control Panel</h1>

      {/* Tournament selection dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tournament</label>
        <Select
          value={selectedTournamentId}
          onValueChange={setSelectedTournamentId}
          disabled={tournamentsLoading || tournaments.length === 0}
        >
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select a tournament" />
          </SelectTrigger>
          <SelectContent>
            {tournaments.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Field selection dropdown (per tournament) */}
      <div className="mb-4">
        <FieldSelectDropdown
          tournamentId={tournamentId}
          selectedFieldId={selectedFieldId}
          onFieldSelect={setSelectedFieldId}
          showAllFieldsOption={true}
        />
      </div>      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ConnectionStatus
          isConnected={isConnected}
          tournamentId={tournamentId}
          selectedFieldId={selectedFieldId}
          onFieldSelect={setSelectedFieldId}
        />
        
        {/* Field indicator */}
        {selectedFieldId && (
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium mr-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              Field Mode Active: Field #{selectedFieldId}
            </span>
          </div>
        )}

        {selectedMatch && (
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusBadgeColor(
                  selectedMatch.status
                )}`}
              >
                {selectedMatch.status}
              </span>
              <span className="font-semibold">
                Match {selectedMatch.matchNumber}
              </span>
              <span className="text-sm text-gray-500">
                ({formatDate(selectedMatch.scheduledTime || "")})
              </span>
            </div>
            <div className="flex mt-2 gap-2">
              <div className="flex-1 text-red-700 text-sm">
                Red: {getRedTeams(selectedMatch).join(", ") || "N/A"}
              </div>
              <div className="flex-1 text-blue-700 text-sm">
                Blue: {getBlueTeams(selectedMatch).join(", ") || "N/A"}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Use the new MatchControlTabs component */}
      <MatchControlTabs
        // Common props
        selectedMatchId={selectedMatchId}
        setSelectedMatchId={setSelectedMatchId}
        selectedMatch={selectedMatch}
        isLoadingMatches={isLoadingMatches}
        matchesData={matchesData}
        // WebSocket props
        sendMatchStateChange={sendMatchStateChange}
        sendScoreUpdate={sendScoreUpdate}
        // Display Control props
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        showTimer={showTimer}
        setShowTimer={setShowTimer}
        showScores={showScores}
        setShowScores={setShowScores}
        showTeams={showTeams}
        setShowTeams={setShowTeams}
        announcementMessage={announcementMessage}
        setAnnouncementMessage={setAnnouncementMessage}
        handleDisplayModeChange={handleDisplayModeChange}
        handleSendAnnouncement={handleSendAnnouncement}
        // Match Control props
        matchPeriod={matchPeriod}
        setMatchPeriod={setMatchPeriod}
        // Timer Control props
        timerDuration={timerDuration}
        setTimerDuration={setTimerDuration}
        timerRemaining={timerRemaining}
        timerIsRunning={timerIsRunning}
        formatTime={formatTime}
        handleStartTimer={handleStartTimer}
        handlePauseTimer={handlePauseTimer}
        handleResetTimer={handleResetTimer}
        // Score Control props
        redAutoScore={redAutoScore}
        setRedAutoScore={setRedAutoScore}
        redDriveScore={redDriveScore}
        setRedDriveScore={setRedDriveScore}
        blueAutoScore={blueAutoScore}
        setBlueAutoScore={setBlueAutoScore}
        blueDriveScore={blueDriveScore}
        setBlueDriveScore={setBlueDriveScore}
        redTotalScore={redTotalScore}
        blueTotalScore={blueTotalScore}
        redGameElements={redGameElements}
        blueGameElements={blueGameElements}
        setRedGameElements={setRedGameElements}
        setBlueGameElements={setBlueGameElements}
        redTeamCount={redTeamCount}
        blueTeamCount={blueTeamCount}
        redMultiplier={redMultiplier}
        blueMultiplier={blueMultiplier}
        setRedTeamCount={setRedTeamCount}
        setBlueTeamCount={setBlueTeamCount}
        setRedMultiplier={setRedMultiplier}
        setBlueMultiplier={setBlueMultiplier}
        updateRedTeamCount={updateRedTeamCount}
        updateBlueTeamCount={updateBlueTeamCount}
        scoreDetails={scoreDetails}
        setScoreDetails={setScoreDetails}
        getRedTeams={getRedTeams}
        getBlueTeams={getBlueTeams}
        handleUpdateScores={handleUpdateScores}
        handleSubmitScores={handleSubmitScores}
        handleSelectMatch={handleSelectMatch}
        addRedGameElement={addRedGameElement}
        addBlueGameElement={addBlueGameElement}
        removeGameElement={removeGameElement}
        // Utility props
        queryClient={queryClient}
        formatDate={formatDate}
        getStatusBadgeColor={getStatusBadgeColor}
        matchScoresMap={matchScoresMap}
      />

      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-medium mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>First, select a match from the Matches tab</li>
          <li>
            Use the other tabs to control the match, timer, scores, and display
            settings
          </li>
          <li>
            Open the audience display in another window to see the live updates
          </li>
        </ol>
      </div>
    </div>
  );
}
