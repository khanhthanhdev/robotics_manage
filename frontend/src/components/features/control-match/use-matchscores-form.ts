import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { webSocketService } from '@/lib/websocket';
import { useUpdateMatchStatus } from '@/hooks/api/use-matches';
import { MatchStatus } from '@/lib/types';
import type { BaseScoreData, PersistenceResultData } from '@/types/websocket';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// === UTILITY FUNCTIONS (Pure functions - no side effects) ===

export function getMultiplier(teamCount: number): number {
  switch (teamCount) {
    case 1: return 1.25;
    case 2: return 1.5;
    case 3: return 1.75;
    case 4: return 2.0;
    default: return 1.0;
  }
}

export function calculateAllianceScore({ 
  autoScore, 
  driveScore, 
  endgameClimb, 
  penalties, 
  teamCount 
}: {
  autoScore: number,
  driveScore: number,
  endgameClimb: number,
  penalties: number,
  teamCount: number
}) {
  return Math.round((autoScore + driveScore + endgameClimb - penalties) * getMultiplier(teamCount));
}

// === INTERFACES (Interface Segregation Principle) ===

interface IFormDataManager {
  formData: MatchFormData;
  setFormData: (data: MatchFormData | ((prev: MatchFormData) => MatchFormData)) => void;
  handleChange: (section: string, field: string, value: number | string) => void;
  isUserActive?: () => boolean;
}

interface IScoreCalculator {
  redTotalScore: number;
  blueTotalScore: number;
  recalculateScores: () => void;
}

interface IRealtimeManager {
  sendRealtimeUpdate: (data: MatchFormData, redTotalScore: number, blueTotalScore: number) => void;
  isRealtimeEnabled: boolean;
}

interface IPersistenceManager {
  handleSubmitToDatabase: (formData: MatchFormData) => Promise<void>;
  isSubmitting: boolean;
  hasUnsavedChanges: boolean;
  lastSavedScores: MatchFormData | null;
  setLastSavedScores: (data: MatchFormData | null) => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
}

interface MatchFormData {
  redAutoScore: number;
  redDriveScore: number;
  redTeamCount: number;
  redGameElements: Record<string, number>;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTeamCount: number;
  blueGameElements: Record<string, number>;
  scoreDetails: {
    penalties: { red: number; blue: number };
    specialScoring: { endgameClimb: { red: number; blue: number } };
  };
}

// Backward compatibility - make tournamentId and fieldId optional
interface UseMatchScoresFormProps {
  matchId: string;
  tournamentId?: string;
  fieldId?: string;
  onScoresSubmit?: () => void;
  onCompleteMatch?: () => Promise<void>;
}// === FORM DATA MANAGER (Single Responsibility Principle) ===

function useFormDataManager(initialData: MatchFormData): IFormDataManager {
  const [formData, setFormData] = useState<MatchFormData>(initialData);
  const userActiveRef = useRef<NodeJS.Timeout | null>(null);
  const isUserActiveRef = useRef(false);

  const handleChange = useCallback((
    section: string,
    field: string,
    value: number | string
  ) => {
    // Mark user as actively typing
    isUserActiveRef.current = true;
    if (userActiveRef.current) clearTimeout(userActiveRef.current);
    userActiveRef.current = setTimeout(() => {
      isUserActiveRef.current = false;
    }, 2000); // 2 seconds of inactivity

    const numValue = typeof value === "string" ? parseInt(value, 10) || 0 : value;
    
    setFormData((prev) => {
      let updated = prev;
      
      if (section === "red" || section === "blue") {
        updated = { ...prev, [`${section}${field}`]: numValue };
      } else if (section === "redGameElements" || section === "blueGameElements") {
        updated = {
          ...prev,
          [section]: {
            ...(prev[section as "redGameElements" | "blueGameElements"]),
            [field]: numValue,
          },
        };
      } else if (section === "penalties") {
        updated = {
          ...prev,
          scoreDetails: {
            ...prev.scoreDetails,
            penalties: {
              ...prev.scoreDetails.penalties,
              [field]: numValue,
            },
          },
        };
      } else if (section === "endgameClimb") {
        updated = {
          ...prev,
          scoreDetails: {
            ...prev.scoreDetails,
            specialScoring: {
              ...prev.scoreDetails.specialScoring,
              endgameClimb: {
                ...prev.scoreDetails.specialScoring.endgameClimb,
                [field]: numValue,
              },
            },
          },
        };
      }
      
      return updated;
    });
  }, []);

  const isUserActive = useCallback(() => {
    return isUserActiveRef.current;
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    isUserActive,
  };
}

// === SCORE CALCULATOR ===

function useScoreCalculator(formData: MatchFormData): IScoreCalculator {
  const [redTotalScore, setRedTotalScore] = useState(0);
  const [blueTotalScore, setBlueTotalScore] = useState(0);

  const recalculateScores = useCallback(() => {
    const newRedTotal = calculateAllianceScore({
      autoScore: formData.redAutoScore,
      driveScore: formData.redDriveScore,
      endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.red,
      penalties: formData.scoreDetails.penalties.red,
      teamCount: formData.redTeamCount,
    });

    const newBlueTotal = calculateAllianceScore({
      autoScore: formData.blueAutoScore,
      driveScore: formData.blueDriveScore,
      endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.blue,
      penalties: formData.scoreDetails.penalties.blue,
      teamCount: formData.blueTeamCount,
    });

    setRedTotalScore(newRedTotal);
    setBlueTotalScore(newBlueTotal);
  }, [formData]);

  // Recalculate whenever formData changes
  useEffect(() => {
    recalculateScores();
  }, [recalculateScores]);

  return {
    redTotalScore,
    blueTotalScore,
    recalculateScores,
  };
}

// === REALTIME MANAGER  ===

function useRealtimeManager(
  matchId: string,
  tournamentId?: string,
  fieldId?: string
): IRealtimeManager {
  const [isRealtimeEnabled, setIsRealtimeEnabled] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // On every score change, only emit a WebSocket event (no DB/localStorage)
  const sendRealtimeUpdate = useCallback((formData: MatchFormData, redTotalScore: number, blueTotalScore: number) => {
    if (!isRealtimeEnabled) return;
    try {
      // Always send all score fields, including auto, drive, total, and game elements
      const redGameElements = Array.isArray(formData.redGameElements) 
        ? formData.redGameElements 
        : Object.entries(formData.redGameElements || {}).map(([element, count]) => ({
            element,
            count: Number(count),
            pointsEach: 1,
            totalPoints: Number(count),
            operation: 'multiply' as const,
          }));
      const blueGameElements = Array.isArray(formData.blueGameElements)
        ? formData.blueGameElements 
        : Object.entries(formData.blueGameElements || {}).map(([element, count]) => ({
            element,
            count: Number(count),
            pointsEach: 1,
            totalPoints: Number(count),
            operation: 'multiply' as const,
          }));
      const scoreData: BaseScoreData = {
        matchId,
        tournamentId: tournamentId || '',
        fieldId,
        // RED alliance
        redAutoScore: formData.redAutoScore,
        redDriveScore: formData.redDriveScore,
        redTotalScore,
        redTeamCount: formData.redTeamCount,
        redMultiplier: getMultiplier(formData.redTeamCount),
        redGameElements,
        // BLUE alliance
        blueAutoScore: formData.blueAutoScore,
        blueDriveScore: formData.blueDriveScore,
        blueTotalScore,
        blueTeamCount: formData.blueTeamCount,
        blueMultiplier: getMultiplier(formData.blueTeamCount),
        blueGameElements,
        // Details
        scoreDetails: formData.scoreDetails,
      };
      webSocketService.sendRealtimeScoreUpdate(scoreData);
    } catch (error) {
      console.error('Failed to send real-time score update:', error);
    }
  }, [matchId, tournamentId, fieldId, isRealtimeEnabled]);

  const debouncedSendRealtimeUpdate = useCallback((formData: MatchFormData, redTotalScore: number, blueTotalScore: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      sendRealtimeUpdate(formData, redTotalScore, blueTotalScore);
    }, 150);
  }, [sendRealtimeUpdate]);

  return {
    sendRealtimeUpdate: debouncedSendRealtimeUpdate,
    isRealtimeEnabled,
  };
}

// === PERSISTENCE MANAGER ===

function usePersistenceManager(
  matchId: string,
  tournamentId?: string,
  fieldId?: string,
  onScoresSubmit?: () => void,
  onCompleteMatch?: () => Promise<void>
): IPersistenceManager {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSavedScores, setLastSavedScores] = useState<MatchFormData | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const updateMatchStatus = useUpdateMatchStatus();
  
  const handleSubmitToDatabase = useCallback(async (currentFormData: MatchFormData) => {
    setIsSubmitting(true);
    
    try {
      // Use the WebSocket service for persistence
      const formData = currentFormData;
      
      if (!formData) {
        throw new Error('No form data available to submit');
      }

      // Convert game elements format
      const redGameElements = Array.isArray(formData.redGameElements) 
        ? formData.redGameElements 
        : Object.entries(formData.redGameElements || {}).map(([element, count]) => ({
            element,
            count: Number(count),
            pointsEach: 1,
            totalPoints: Number(count),
            operation: 'multiply' as const,
          }));

      const blueGameElements = Array.isArray(formData.blueGameElements)
        ? formData.blueGameElements 
        : Object.entries(formData.blueGameElements || {}).map(([element, count]) => ({
            element,
            count: Number(count),
            pointsEach: 1,
            totalPoints: Number(count),
            operation: 'multiply' as const,
          }));

      const scoreData: BaseScoreData = {
        matchId,
        tournamentId: tournamentId || '', // Default to empty string for backward compatibility
        fieldId,
        redAutoScore: formData.redAutoScore,
        redDriveScore: formData.redDriveScore,
        redTotalScore: calculateAllianceScore({
          autoScore: formData.redAutoScore,
          driveScore: formData.redDriveScore,
          endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.red,
          penalties: formData.scoreDetails.penalties.red,
          teamCount: formData.redTeamCount,
        }),
        blueAutoScore: formData.blueAutoScore,
        blueDriveScore: formData.blueDriveScore,
        blueTotalScore: calculateAllianceScore({
          autoScore: formData.blueAutoScore,
          driveScore: formData.blueDriveScore,
          endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.blue,
          penalties: formData.scoreDetails.penalties.blue,
          teamCount: formData.blueTeamCount,
        }),
        redTeamCount: formData.redTeamCount,
        redMultiplier: getMultiplier(formData.redTeamCount),
        blueTeamCount: formData.blueTeamCount,
        blueMultiplier: getMultiplier(formData.blueTeamCount),
        redGameElements,
        blueGameElements,
        scoreDetails: formData.scoreDetails,
      };

      const result: PersistenceResultData = await webSocketService.persistScores(scoreData);
      
      if (result.success) {
        setLastSavedScores({ ...formData });
        setHasUnsavedChanges(false);
        toast.success("Scores saved to database");
        
        if (onScoresSubmit) onScoresSubmit();
        updateMatchStatus.mutate({ matchId, status: MatchStatus.COMPLETED });
        if (onCompleteMatch) await onCompleteMatch();
      } else {
        throw new Error(result.error || 'Failed to save scores');
      }
    } catch (error: any) {
      console.error('Failed to submit scores to database:', error);
      toast.error(error.message || "Failed to save match scores");
    } finally {
      setIsSubmitting(false);
    }
  }, [matchId, tournamentId, fieldId, onScoresSubmit, onCompleteMatch, updateMatchStatus]);

  return {
    handleSubmitToDatabase,
    isSubmitting,
    hasUnsavedChanges,
    lastSavedScores,
    setLastSavedScores: setLastSavedScores,
    setHasUnsavedChanges: setHasUnsavedChanges,
  };
}

export function useMatchScoresForm({
  matchId,
  tournamentId,
  fieldId,
  onScoresSubmit,
  onCompleteMatch
}: UseMatchScoresFormProps) {
  // Initialize form data
  const initialFormData: MatchFormData = {
    redAutoScore: 0,
    redDriveScore: 0,
    redTeamCount: 2,
    redGameElements: { highGoal: 0, midGoal: 0, lowGoal: 0 },
    blueAutoScore: 0,
    blueDriveScore: 0,
    blueTeamCount: 2,
    blueGameElements: { highGoal: 0, midGoal: 0, lowGoal: 0 },
    scoreDetails: {
      penalties: { red: 0, blue: 0 },
      specialScoring: { endgameClimb: { red: 0, blue: 0 } },
    },
  };

  // Compose functionality from focused managers
  const formDataManager = useFormDataManager(initialFormData);
  const scoreCalculator = useScoreCalculator(formDataManager.formData);
  const realtimeManager = useRealtimeManager(matchId, tournamentId, fieldId);
  const persistenceManager = usePersistenceManager(
    matchId, 
    tournamentId, 
    fieldId, 
    onScoresSubmit, 
    onCompleteMatch
  );

  // Track unsaved changes
  useEffect(() => {
    if (persistenceManager.lastSavedScores) {
      const hasChanges = JSON.stringify(formDataManager.formData) !== 
                        JSON.stringify(persistenceManager.lastSavedScores);
      persistenceManager.setHasUnsavedChanges(hasChanges);
    }
  }, [formDataManager.formData, persistenceManager.lastSavedScores, persistenceManager]);

  // Send real-time updates when form data changes
  useEffect(() => {
    realtimeManager.sendRealtimeUpdate(
      formDataManager.formData,
      scoreCalculator.redTotalScore,
      scoreCalculator.blueTotalScore
    );
  }, [formDataManager.formData, realtimeManager, scoreCalculator.redTotalScore, scoreCalculator.blueTotalScore]);
  // Listen for persistence confirmations from WebSocket
  useEffect(() => {
    const handlePersisted = (result: PersistenceResultData) => {
      if (result.matchId === matchId) {
        if (result.success) {
          persistenceManager.setLastSavedScores({ ...formDataManager.formData });
          persistenceManager.setHasUnsavedChanges(false);
          toast.success("Scores saved to database");
        } else {
          toast.error("Failed to save scores: " + result.error);
        }
      }
    };

    const unsubscribe = webSocketService.onScoresPersisted(handlePersisted);
    
    return unsubscribe;
  }, [matchId, formDataManager.formData, persistenceManager]);

  // Listen for incoming WebSocket score updates with user activity protection
  useEffect(() => {
    const handleIncomingScoreUpdate = (data: any) => {
      if (data.matchId === matchId) {
        if (formDataManager.isUserActive && formDataManager.isUserActive()) {
          console.log('🚫 Ignoring incoming score update (user actively typing):', data);
          return;
        }
        
        console.log('✅ Applying incoming score update (user not active):', data);
        
        // Update form data with incoming score data
        formDataManager.setFormData(prev => ({
          ...prev,
          redAutoScore: data.redAutoScore ?? prev.redAutoScore,
          redDriveScore: data.redDriveScore ?? prev.redDriveScore,
          blueAutoScore: data.blueAutoScore ?? prev.blueAutoScore,
          blueDriveScore: data.blueDriveScore ?? prev.blueDriveScore,
          // Update other fields as needed
        }));
      }
    };

    const unsubscribe = webSocketService.onScoreUpdate(handleIncomingScoreUpdate);
    return unsubscribe;
  }, [matchId, formDataManager]);

  // Return composed interface with backward compatibility
  return {
    // Form data management
    formData: formDataManager.formData,
    setFormData: formDataManager.setFormData,
    handleChange: formDataManager.handleChange,
    // Only expose a single unified realtimeScore object for consumers
    realtimeScore: {
      red: {
        auto: formDataManager.formData.redAutoScore,
        drive: formDataManager.formData.redDriveScore,
        total: scoreCalculator.redTotalScore,
        gameElements: formDataManager.formData.redGameElements,
        teamCount: formDataManager.formData.redTeamCount,
        multiplier: getMultiplier(formDataManager.formData.redTeamCount),
      },
      blue: {
        auto: formDataManager.formData.blueAutoScore,
        drive: formDataManager.formData.blueDriveScore,
        total: scoreCalculator.blueTotalScore,
        gameElements: formDataManager.formData.blueGameElements,
        teamCount: formDataManager.formData.blueTeamCount,
        multiplier: getMultiplier(formDataManager.formData.blueTeamCount),
      },
      scoreDetails: formDataManager.formData.scoreDetails,
    },
    isRealtimeEnabled: realtimeManager.isRealtimeEnabled,
    handleSubmitToDatabase: () => persistenceManager.handleSubmitToDatabase(formDataManager.formData),
    isSubmitting: persistenceManager.isSubmitting,
    hasUnsavedChanges: persistenceManager.hasUnsavedChanges,
    handleSubmit: () => persistenceManager.handleSubmitToDatabase(formDataManager.formData),
    setIsSubmitting: (value: boolean) => {},
  };
}
