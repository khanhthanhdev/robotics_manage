import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMatchScores,
  useCreateMatchScores,
  useUpdateMatchScores,
} from "@/hooks/api/use-matches";
import { useWebSocket } from "@/hooks/common/use-websocket";

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
  setScoreDetails: (details: any) => void;
  setIsAddingRedElement: (adding: boolean) => void;
  setIsAddingBlueElement: (adding: boolean) => void;
  
  // Actions
  saveScores: () => Promise<void>;
  sendScoreUpdate: (data: any) => void;
  
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

  // WebSocket connection for score updates
  const { sendScoreUpdate, subscribe } = useWebSocket({ 
    tournamentId, 
    autoConnect: true 
  });

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
      setScoreDetails(null);
    }
  }, [matchScores, isLoadingScores, selectedMatchId]);

  // Subscribe to WebSocket score updates and update React Query cache
  useEffect(() => {
    if (!selectedMatchId) return;

    const handleScoreUpdate = (data: {
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
  }, [selectedMatchId, subscribe, queryClient, refetchScores, selectedFieldId]);

  // Save scores function
  const saveScores = async () => {
    if (!selectedMatchId) return;

    const scoreData = {
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      redGameElements: arrayToObjectGameElements(redGameElements),
      blueGameElements: arrayToObjectGameElements(blueGameElements),
      redTeamCount,
      blueTeamCount,
      redMultiplier,
      blueMultiplier,
      scoreDetails,
      fieldId: selectedFieldId,
    };    try {
      if (matchScores?.id) {
        // Update existing scores
        await updateMatchScores.mutateAsync({
          id: matchScores.id,
          ...scoreData,
        });
      } else {
        // Create new scores
        await createMatchScores.mutateAsync(scoreData);
      }

      // Send score update via WebSocket
      sendScoreUpdate(scoreData);
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
    setRedAutoScore,
    setRedDriveScore,
    setBlueAutoScore,
    setBlueDriveScore,
    setRedTotalScore,
    setBlueTotalScore,
    setRedGameElements,
    setBlueGameElements,
    setRedTeamCount,
    setBlueTeamCount,
    setRedMultiplier,
    setBlueMultiplier,
    setScoreDetails,
    setIsAddingRedElement,
    setIsAddingBlueElement,
    
    // Actions
    saveScores,
    sendScoreUpdate,
    
    // Query states
    isLoadingScores,
    matchScores,
  };
}
