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
} from "@/hooks/use-matches";
import { MatchStatus } from "@/lib/types";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Card } from "@/components/ui/card";
// Import the extracted ConnectionStatus component
import ConnectionStatus from "./components/ConnectionStatus";
import { toast } from "sonner";
import MatchControlTabs from "./components/MatchControlTabs";

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
  // Get tournament ID from query params or use a default for demo
  const tournamentId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tournamentId") ||
        "demo-tournament"
      : "demo-tournament";

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

  // State for storing all match scores
  const [matchScoresMap, setMatchScoresMap] = useState<
    Record<string, { redTotalScore: number; blueTotalScore: number }>
  >({});

  // Fetch matches using React Query
  const { data: matchesData = [], isLoading: isLoadingMatches } = useMatches();

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
  useEffect(() => {
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
      setMatchScoresMap(scoresMap);
    }
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

  // Connect to WebSocket with the tournament ID
  const {
    isConnected,
    currentTournament,
    changeDisplayMode,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    subscribe,
  } = useWebSocket({ tournamentId });

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
  }, [subscribe]);

  // Subscribe to WebSocket score updates and update React Query cache
  useEffect(() => {
    if (!selectedMatchId) return;

    const handleScoreUpdate = (data: {
      matchId: string;
      redAutoScore?: number;
      redDriveScore?: number;
      redTotalScore?: number;
      blueAutoScore?: number;
      blueDriveScore?: number;
      blueTotalScore?: number;
      [key: string]: any;
    }) => {
      if (data.matchId === selectedMatchId) {
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
  }, [matchScores, isLoadingScores, selectedMatchId]);

  // Handle selecting a match
  const handleSelectMatch = (match: {
    id: string;
    matchNumber: string | number;
  }) => {
    setSelectedMatchId(match.id);

    // Automatically update display settings to show the selected match
    changeDisplayMode({
      displayMode: "match",
      matchId: match.id,
      showTimer,
      showScores,
      showTeams,
      tournamentId,
    });
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
    });
  };

  // Handle timer controls
  const handleStartTimer = () => {
    // If timer is already running, do nothing
    if (timerIsRunning) return;    // If timerRemaining is 0, reset to duration
    const startTime = timerRemaining > 0 ? timerRemaining : timerDuration;
    startTimer({
      duration: timerDuration,
      remaining: startTime,
    });
    setTimerIsRunning(true);
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: "IN_PROGRESS",
      currentPeriod: matchPeriod as any,
    });
    
    // Also update the match status in the database
    updateMatchStatus.mutate({ 
      matchId: selectedMatchId, 
      status: MatchStatus.IN_PROGRESS 
    });
  };

  const handlePauseTimer = () => {
    // Only pause, do not reset
    pauseTimer({
      duration: timerDuration,
      remaining: timerRemaining,
      isRunning: false,
    });
    setTimerIsRunning(false);
  };

  const handleResetTimer = () => {    resetTimer({
      duration: timerDuration,
      remaining: timerDuration,
      isRunning: false,
    });
    setTimerRemaining(timerDuration);
    setTimerIsRunning(false);
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: "PENDING",
      currentPeriod: null,
    });
    
    // Also update the match status in the database
    updateMatchStatus.mutate({ 
      matchId: selectedMatchId, 
      status: MatchStatus.PENDING 
    });
  };

  // Handle score updates
  const handleUpdateScores = () => {
    if (!selectedMatchId) return;

    // Convert game elements arrays to object format for API compatibility
    const redGameElementsObj = arrayToObjectGameElements(redGameElements);
    const blueGameElementsObj = arrayToObjectGameElements(blueGameElements);

    // Create data for React Query mutations (using arrays for game elements)
    const mutationData = {
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      redGameElements, // Keep as array for mutations
      blueGameElements, // Keep as array for mutations
      redTeamCount,
      redMultiplier,
      blueTeamCount,
      blueMultiplier,
      scoreDetails,
    };

    // Create data for WebSocket (using objects for game elements)
    const wsScoreData = {
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      redGameElements: redGameElementsObj, // Use object format for WebSocket
      blueGameElements: blueGameElementsObj, // Use object format for WebSocket
      redTeamCount,
      redMultiplier,
      blueTeamCount,
      blueMultiplier,
      scoreDetails,
    };

    if (matchScores?.id) {
      // Update existing scores
      updateMatchScores.mutate({
        id: matchScores.id,
        ...mutationData, // Use array format for mutations
      });
    } else {
      // Create new scores
      createMatchScores.mutate(mutationData); // Use array format for mutations
    }

    // Send the WebSocket update with object format
    sendScoreUpdate(wsScoreData);
  };  // Get the match status update mutation
  const updateMatchStatus = useUpdateMatchStatus();
  
  // Handle submitting final scores and completing the match
  const handleSubmitScores = () => {
    // First update the scores
    handleUpdateScores();

    // Then mark the match as completed via both WebSocket and API
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: "COMPLETED",
      currentPeriod: null,
    });
    
    // Update the match status in database as well
    updateMatchStatus.mutate({ 
      matchId: selectedMatchId, 
      status: MatchStatus.COMPLETED 
    });

    // Show toast notification
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Match Control Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ConnectionStatus
          isConnected={isConnected}
          tournamentId={currentTournament}
        />

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
