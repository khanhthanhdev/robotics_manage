import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMatchScores,
  useCreateMatchScores,
  useUpdateMatchScores,
} from "@/hooks/api/use-matches";
import { webSocketService } from "@/lib/websocket";


interface GameElement {
  element: string;
  count: number;
  pointsEach: number;
  totalPoints: number;
  operation: string;
}

interface UseScoringControlProps {
  tournamentId: string;
  selectedMatchId: string;
  selectedFieldId: string | null;
}

interface ScoringControlReturn {
  // Score states
  redAutoScore: number;
  redDriveScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  redTotalScore: number;
  blueTotalScore: number;
  
  // Game elements
  redGameElements: GameElement[];
  blueGameElements: GameElement[];
  
  // Team counts and multipliers
  redTeamCount: number;
  blueTeamCount: number;
  redMultiplier: number;
  blueMultiplier: number;
  
  // Score details
  scoreDetails: any;
  
  // UI states
  isAddingRedElement: boolean;
  isAddingBlueElement: boolean;
  
  // Setters
  setRedAutoScore: (score: number) => void;
  setRedDriveScore: (score: number) => void;
  setBlueAutoScore: (score: number) => void;
  setBlueDriveScore: (score: number) => void;
  setRedTotalScore: (score: number) => void;
  setBlueTotalScore: (score: number) => void;
  setRedGameElements: (elements: GameElement[]) => void;
  setBlueGameElements: (elements: GameElement[]) => void;
  setRedTeamCount: (count: number) => void;
  setBlueTeamCount: (count: number) => void;
  setRedMultiplier: (multiplier: number) => void;
  setBlueMultiplier: (multiplier: number) => void;
  setScoreDetails: (details: any) => void;  setIsAddingRedElement: (adding: boolean) => void;
  setIsAddingBlueElement: (adding: boolean) => void;
    // Actions
  sendRealtimeUpdate: () => void;
  saveScores: () => Promise<void>;
  
  // Query states
  isLoadingScores: boolean;
  matchScores: any;
}

// Convert game elements from object format to array format
const objectToArrayGameElements = (
  gameElements: Record<string, any> | any[] | null | undefined
): GameElement[] => {
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
const arrayToObjectGameElements = (gameElements: GameElement[]): Record<string, number> => {
  const result: Record<string, number> = {};
  gameElements.forEach((item) => {
    result[item.element] = item.count;
  });
  return result;
};

export function useScoringControl({
  tournamentId,
  selectedMatchId,
  selectedFieldId,
}: UseScoringControlProps): ScoringControlReturn {
  const queryClient = useQueryClient();

  // Fetch match scores for the selected match
  const {
    data: matchScores,
    isLoading: isLoadingScores,
    refetch: refetchScores,
  } = useMatchScores(selectedMatchId || "");

  // Mutations for creating and updating scores
  const createMatchScores = useCreateMatchScores();
  const updateMatchScores = useUpdateMatchScores();

  // UI state for score controls
  const [redAutoScore, setRedAutoScore] = useState<number>(0);
  const [redDriveScore, setRedDriveScore] = useState<number>(0);
  const [blueAutoScore, setBlueAutoScore] = useState<number>(0);
  const [blueDriveScore, setBlueDriveScore] = useState<number>(0);

  // Enhanced scoring states
  const [redGameElements, setRedGameElements] = useState<GameElement[]>([]);
  const [blueGameElements, setBlueGameElements] = useState<GameElement[]>([]);
  const [redTeamCount, setRedTeamCount] = useState<number>(0);
  const [blueTeamCount, setBlueTeamCount] = useState<number>(0);
  const [redMultiplier, setRedMultiplier] = useState<number>(1.0);
  const [blueMultiplier, setBlueMultiplier] = useState<number>(1.0);
  const [scoreDetails, setScoreDetails] = useState<any>(null);
  const [isAddingRedElement, setIsAddingRedElement] = useState<boolean>(false);
  const [isAddingBlueElement, setIsAddingBlueElement] = useState<boolean>(false);  // Add user activity tracking
  const userActiveRef = useRef<NodeJS.Timeout | null>(null);
  const isUserActiveRef = useRef(false);
  const justSentRealtimeUpdateRef = useRef(false);
  const lastBroadcastedMatchIdRef = useRef<string | null>(null);
  // Mark user as active when any score state changes
  const markUserActive = useCallback(() => {
    isUserActiveRef.current = true;
    if (userActiveRef.current) clearTimeout(userActiveRef.current);
    userActiveRef.current = setTimeout(() => {
      isUserActiveRef.current = false;
    }, 5000); // Increase to 5 seconds of inactivity to prevent premature syncing
  }, []);

  // Wrap setters to mark user activity
  const setRedAutoScoreWithActivity = useCallback((score: number) => {
    markUserActive();
    setRedAutoScore(score);
  }, [markUserActive]);

  const setRedDriveScoreWithActivity = useCallback((score: number) => {
    markUserActive();
    setRedDriveScore(score);
  }, [markUserActive]);

  const setBlueAutoScoreWithActivity = useCallback((score: number) => {
    markUserActive();
    setBlueAutoScore(score);
  }, [markUserActive]);  const setBlueDriveScoreWithActivity = useCallback((score: number) => {
    markUserActive();
    setBlueDriveScore(score);
  }, [markUserActive]);

  // Also wrap team count and multiplier setters with activity tracking
  const setRedTeamCountWithActivity = useCallback((count: number) => {
    markUserActive();
    setRedTeamCount(count);
  }, [markUserActive]);

  const setBlueTeamCountWithActivity = useCallback((count: number) => {
    markUserActive();
    setBlueTeamCount(count);
  }, [markUserActive]);

  const setRedMultiplierWithActivity = useCallback((multiplier: number) => {
    markUserActive();
    setRedMultiplier(multiplier);
  }, [markUserActive]);

  const setBlueMultiplierWithActivity = useCallback((multiplier: number) => {
    markUserActive();
    setBlueMultiplier(multiplier);
  }, [markUserActive]);

  // Add states for total scores
  const [redTotalScore, setRedTotalScore] = useState<number>(0);
  const [blueTotalScore, setBlueTotalScore] = useState<number>(0);  // Sync local state with match scores data from React Query
  useEffect(() => {
    if (matchScores && !isUserActiveRef.current) {
      console.log("✅ Syncing form data with API data (user not actively typing)");
        // Only sync if the base score data (auto/drive) is different from current state
      const hasChanges = 
        (matchScores.redAutoScore || 0) !== redAutoScore ||
        (matchScores.redDriveScore || 0) !== redDriveScore ||
        (matchScores.blueAutoScore || 0) !== blueAutoScore ||
        (matchScores.blueDriveScore || 0) !== blueDriveScore;
        if (hasChanges) {
        console.log("📝 API data differs from current state, syncing...");
        setRedAutoScore(matchScores.redAutoScore || 0);
        setRedDriveScore(matchScores.redDriveScore || 0);
        setBlueAutoScore(matchScores.blueAutoScore || 0);
        setBlueDriveScore(matchScores.blueDriveScore || 0);
        
        // Only sync total scores if they exist in API data and are non-zero,
        // or if the auto/drive scores changed (requiring recalculation)
        const autoScoresChanged = 
          (matchScores.redAutoScore || 0) !== redAutoScore ||
          (matchScores.redDriveScore || 0) !== redDriveScore ||
          (matchScores.blueAutoScore || 0) !== blueAutoScore ||
          (matchScores.blueDriveScore || 0) !== blueDriveScore;
          
        if (autoScoresChanged || (matchScores.redTotalScore && matchScores.redTotalScore > 0)) {
          setRedTotalScore(matchScores.redTotalScore || 0);
        }
        if (autoScoresChanged || (matchScores.blueTotalScore && matchScores.blueTotalScore > 0)) {
          setBlueTotalScore(matchScores.blueTotalScore || 0);
        }
      } else {
        console.log("📋 API data matches current state, no sync needed");
      }

      // Keep the enhanced features for UI compatibility, but initialize to defaults if not in API response
      setRedTeamCount(matchScores.redTeamCount || 0);
      setBlueTeamCount(matchScores.blueTeamCount || 0);
      setRedMultiplier(matchScores.redMultiplier || 1.0);
      setBlueMultiplier(matchScores.blueMultiplier || 1.0);
      setRedGameElements(objectToArrayGameElements(matchScores.redGameElements) || []);
      setBlueGameElements(objectToArrayGameElements(matchScores.blueGameElements) || []);
      setScoreDetails(matchScores.scoreDetails || {});
    } else if (matchScores && isUserActiveRef.current) {
      console.log("🚫 Skipping form data sync (user actively typing)");
    } else if (!isLoadingScores && selectedMatchId) {
      // If we finished loading and there are no scores yet, reset to default values
      console.log("🔄 No scores found, resetting to defaults");
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
      setScoreDetails(null);
    }
  }, [matchScores, isLoadingScores, selectedMatchId, redAutoScore, redDriveScore, blueAutoScore, blueDriveScore]);  // Send initial scores to audience display when match changes (only on match ID change)
  useEffect(() => {
    if (!selectedMatchId || isLoadingScores) return;
    
    // Prevent duplicate broadcasts for the same match
    if (lastBroadcastedMatchIdRef.current === selectedMatchId) {
      console.log("📡 Skipping broadcast - already sent for match:", selectedMatchId);
      return;
    }
    
    // Only broadcast when we have a definitive match ID and loading is complete
    // This prevents infinite loops by not depending on matchScores changes
    const currentScores = {
      matchId: selectedMatchId,
      fieldId: selectedFieldId || undefined,
      tournamentId,
      redAutoScore: matchScores?.redAutoScore || 0,
      redDriveScore: matchScores?.redDriveScore || 0,
      redTotalScore: matchScores?.redTotalScore || 0,
      blueAutoScore: matchScores?.blueAutoScore || 0,
      blueDriveScore: matchScores?.blueDriveScore || 0,
      blueTotalScore: matchScores?.blueTotalScore || 0,
    };
    
    console.log("📡 Broadcasting initial scores for match change:", selectedMatchId, currentScores);
    webSocketService.sendRealtimeScoreUpdate(currentScores);
    
    // Track that we've broadcasted for this match
    lastBroadcastedMatchIdRef.current = selectedMatchId;
  }, [selectedMatchId, isLoadingScores]); // Only depend on match ID and loading state

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
      console.log("Score update received in control-match:", data, "selectedFieldId:", selectedFieldId);
      
      // Accept updates if:
      // 1. No fieldId filtering needed (selectedFieldId is null), OR
      // 2. fieldId matches, OR  
      // 3. No fieldId in update (tournament-wide)
      const shouldAccept = 
        !selectedFieldId || // No field selected in control
        !data.fieldId || // No fieldId in update (tournament-wide)
        data.fieldId === selectedFieldId; // Exact field match
      
      if (!shouldAccept) {
        console.log(`Ignoring score update for different field: ${data.fieldId} (expected: ${selectedFieldId})`);
        return;
      }
      
      if (data.matchId === selectedMatchId) {
        console.log("Score update received for selected match:", data);        // Update the React Query cache directly
        queryClient.setQueryData(
          ["match-scores", selectedMatchId],
          (oldData: Record<string, any> | undefined) => ({
            ...(oldData || {}),
            ...data,
          })
        );        // Only refetch if user is not actively typing AND we didn't just send this update ourselves
        if (!isUserActiveRef.current && !justSentRealtimeUpdateRef.current) {
          console.log("✅ Refetching scores (user not actively typing and not our own update)");
          // Add a small delay to ensure the backend has processed the update
          setTimeout(() => {
            refetchScores();
          }, 100);
        } else if (justSentRealtimeUpdateRef.current) {
          console.log("🚫 Skipping refetch (this is our own real-time update)");
          // Reset the flag after a short delay
          setTimeout(() => {
            justSentRealtimeUpdateRef.current = false;
          }, 500);
        } else {
          console.log("🚫 Skipping refetch (user actively typing)");
        }
      }
    };    // Subscribe to real-time score updates using the new WebSocket service
    const unsubscribe = webSocketService.onScoreUpdate(handleScoreUpdate);

    return () => {
      if (unsubscribe) unsubscribe();
    };  }, [selectedMatchId, queryClient, refetchScores, selectedFieldId]);  // Send real-time update function (no DB persistence, but immediate UI feedback)
  const sendRealtimeUpdate = () => {
    if (!selectedMatchId) return;    // Calculate totals from current auto and drive scores
    const redTotal = (redAutoScore || 0) + (redDriveScore || 0);
    const blueTotal = (blueAutoScore || 0) + (blueDriveScore || 0);
    
    console.log("Calculating totals for real-time update:", { 
      redAuto: redAutoScore, 
      redDrive: redDriveScore, 
      redTotal,
      blueAuto: blueAutoScore, 
      blueDrive: blueDriveScore, 
      blueTotal 
    });

    // Immediately update UI with calculated totals for instant feedback
    setRedTotalScore(redTotal);
    setBlueTotalScore(blueTotal);

    const realtimeData = {
      matchId: selectedMatchId,
      fieldId: selectedFieldId || undefined,
      tournamentId,
      redAutoScore: redAutoScore || 0,
      redDriveScore: redDriveScore || 0,
      redTotalScore: redTotal,
      blueAutoScore: blueAutoScore || 0,
      blueDriveScore: blueDriveScore || 0,
      blueTotalScore: blueTotal,
    };    console.log("Sending simplified real-time score update:", realtimeData);
      // Mark that we just sent a real-time update to prevent refetch loops
    justSentRealtimeUpdateRef.current = true;
    
    // Reset the flag after 2 seconds as a failsafe (in case WebSocket doesn't come back)
    setTimeout(() => {
      justSentRealtimeUpdateRef.current = false;
    }, 2000);
    
    // Send real-time WebSocket update to other displays
    webSocketService.sendRealtimeScoreUpdate(realtimeData);
    
    // Reset user activity state so the UI can receive future updates
    isUserActiveRef.current = false;
    if (userActiveRef.current) {
      clearTimeout(userActiveRef.current);
      userActiveRef.current = null;
    }
  };
  // Save scores function (DB persistence)
  const saveScores = async () => {
    if (!selectedMatchId) return;    // Calculate totals from current auto and drive scores
    const redTotal = (redAutoScore || 0) + (redDriveScore || 0);
    const blueTotal = (blueAutoScore || 0) + (blueDriveScore || 0);

    // Simplified score data to match the new schema
    const scoreData = {
      matchId: selectedMatchId,
      redAutoScore: redAutoScore || 0,
      redDriveScore: redDriveScore || 0,
      redTotalScore: redTotal,
      blueAutoScore: blueAutoScore || 0,
      blueDriveScore: blueDriveScore || 0,
      blueTotalScore: blueTotal,
    };

    console.log("Saving simplified scores:", scoreData);
      try {
      // Use the existing match scores API instead of WebSocket for persistence
      if (matchScores?.id) {
        // Update existing scores
        await updateMatchScores.mutateAsync({
          id: matchScores.id,
          ...scoreData,
        });
      } else {
        // Create new scores
        await createMatchScores.mutateAsync(scoreData);
      }      console.log("Scores saved successfully");
      
      // Force an immediate update of the UI state with the saved data
      // This ensures the UI reflects the persisted data even if user is still "active"
      setRedAutoScore(scoreData.redAutoScore);
      setRedDriveScore(scoreData.redDriveScore);
      setRedTotalScore(scoreData.redTotalScore);
      setBlueAutoScore(scoreData.blueAutoScore);
      setBlueDriveScore(scoreData.blueDriveScore);
      setBlueTotalScore(scoreData.blueTotalScore);
        // Reset user activity state so future data syncs work properly
      isUserActiveRef.current = false;
      if (userActiveRef.current) {
        clearTimeout(userActiveRef.current);
        userActiveRef.current = null;
      }
      
      // Also refetch to get the latest data from the server
      await refetchScores();
      
    } catch (error) {
      console.error("Failed to save scores:", error);
      throw error;
    }
  };

  return {
    // Score states
    redAutoScore,
    redDriveScore,
    blueAutoScore,
    blueDriveScore,
    redTotalScore,
    blueTotalScore,
    
    // Game elements
    redGameElements,
    blueGameElements,
    
    // Team counts and multipliers
    redTeamCount,
    blueTeamCount,
    redMultiplier,
    blueMultiplier,
    
    // Score details
    scoreDetails,
    
    // UI states
    isAddingRedElement,
    isAddingBlueElement,
      // Setters
    setRedAutoScore: setRedAutoScoreWithActivity,
    setRedDriveScore: setRedDriveScoreWithActivity,
    setBlueAutoScore: setBlueAutoScoreWithActivity,
    setBlueDriveScore: setBlueDriveScoreWithActivity,    setRedTotalScore,
    setBlueTotalScore,
    setRedGameElements,
    setBlueGameElements,
    setRedTeamCount: setRedTeamCountWithActivity,
    setBlueTeamCount: setBlueTeamCountWithActivity,
    setRedMultiplier: setRedMultiplierWithActivity,
    setBlueMultiplier: setBlueMultiplierWithActivity,
    setScoreDetails,    setIsAddingRedElement,    setIsAddingBlueElement,
    
    // Actions
    sendRealtimeUpdate,
    saveScores,
    
    // Query states
    isLoadingScores,
    matchScores,
  };
}
