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
  const [isAddingBlueElement, setIsAddingBlueElement] = useState<boolean>(false);
  // Add user activity tracking
  const userActiveRef = useRef<NodeJS.Timeout | null>(null);
  const isUserActiveRef = useRef(false);

  // Mark user as active when any score state changes
  const markUserActive = useCallback(() => {
    isUserActiveRef.current = true;
    if (userActiveRef.current) clearTimeout(userActiveRef.current);
    userActiveRef.current = setTimeout(() => {
      isUserActiveRef.current = false;
    }, 2000); // 2 seconds of inactivity
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
  const [blueTotalScore, setBlueTotalScore] = useState<number>(0);
  // Sync local state with match scores data from React Query
  useEffect(() => {
    if (matchScores && !isUserActiveRef.current) {
      console.log("✅ Syncing form data with API data (user not actively typing)");
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
    } else if (matchScores && isUserActiveRef.current) {
      console.log("🚫 Skipping form data sync (user actively typing)");
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
      setScoreDetails(null);
    }
  }, [matchScores, isLoadingScores, selectedMatchId]);

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
        console.log("Score update received for selected match:", data);
          // Update the React Query cache directly
        queryClient.setQueryData(
          ["match-scores", selectedMatchId],
          (oldData: Record<string, any> | undefined) => ({
            ...(oldData || {}),
            ...data,
          })
        );

        // Only refetch if user is not actively typing to prevent form resets
        if (!isUserActiveRef.current) {
          console.log("✅ Refetching scores (user not actively typing)");
          refetchScores();
        } else {
          console.log("🚫 Skipping refetch (user actively typing)");
        }
      }
    };    // Subscribe to real-time score updates using the new WebSocket service
    const unsubscribe = webSocketService.onScoreUpdate(handleScoreUpdate);

    return () => {
      if (unsubscribe) unsubscribe();
    };  }, [selectedMatchId, queryClient, refetchScores, selectedFieldId]);
  // Send real-time update function (no DB persistence)
  const sendRealtimeUpdate = () => {
    if (!selectedMatchId) return;

    // Calculate totals
    const redTotal = (redAutoScore || 0) + (redDriveScore || 0);
    const blueTotal = (blueAutoScore || 0) + (blueDriveScore || 0);

    // Convert game elements to GameElementDto[] for WebSocket (same as persistence function)
    const toGameElementDtoArray = (gameElements: Record<string, number> | GameElement[]): { element: string; count: number; pointsEach: number; totalPoints: number; operation: 'multiply' | 'add'; }[] => {
      if (Array.isArray(gameElements)) {
        return gameElements.map(g => ({ ...g, operation: 'multiply' as const }));
      }
      return Object.entries(gameElements).map(([element, count]) => ({
        element,
        count: Number(count),
        pointsEach: 1,
        totalPoints: Number(count),
        operation: 'multiply' as const,
      }));
    };

    const realtimeData = {
      matchId: selectedMatchId,
      fieldId: selectedFieldId || undefined,
      tournamentId,
      redAutoScore,
      redDriveScore,
      redTotalScore: redTotal,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore: blueTotal,
      redGameElements: toGameElementDtoArray(redGameElements),
      blueGameElements: toGameElementDtoArray(blueGameElements),
      redTeamCount,
      blueTeamCount,
      redMultiplier,
      blueMultiplier,
      scoreDetails,
    };

    console.log("Sending real-time score update (no DB persist):", realtimeData);
    
    // Only send real-time WebSocket update, no DB persistence
    webSocketService.sendRealtimeScoreUpdate(realtimeData);
  };

  // Save scores function (DB persistence)
  const saveScores = async () => {
    if (!selectedMatchId) return;

    // Convert game elements to GameElementDto[] for persistence (backend expects operation: 'multiply' | 'add')
    const toGameElementDtoArray = (gameElements: Record<string, number> | GameElement[]): { element: string; count: number; pointsEach: number; totalPoints: number; operation: 'multiply' | 'add'; }[] => {
      if (Array.isArray(gameElements)) {
        return gameElements.map(g => ({ ...g, operation: 'multiply' as const }));
      }
      return Object.entries(gameElements).map(([element, count]) => ({
        element,
        count: Number(count),
        pointsEach: 1,
        totalPoints: Number(count),
        operation: 'multiply' as const,
      }));
    };

    const scoreData = {
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      redGameElements: toGameElementDtoArray(redGameElements),
      blueGameElements: toGameElementDtoArray(blueGameElements),
      redTeamCount,
      blueTeamCount,
      redMultiplier,
      blueMultiplier,
      scoreDetails,
      fieldId: selectedFieldId || undefined,
      tournamentId,
      type: 'persist',
    };

    // Debug logging for field ID tracking
    console.log("Saving scores with fieldId:", selectedFieldId, "for match:", selectedMatchId);
    try {
      // Emit persistScores event via WebSocket for final DB save
      const result = await webSocketService.persistScores(scoreData);
      if (!result.success) throw new Error(result.error || 'Failed to persist scores');
      // Optionally: handle result, show toast, etc.
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
