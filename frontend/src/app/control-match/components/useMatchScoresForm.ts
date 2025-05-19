import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useWebSocket } from '@/hooks/useWebSocket';
import { useUpdateMatchStatus } from '@/hooks/use-matches';
import { MatchStatus } from '@/lib/types';
import type { ScoreData } from '@/lib/websocket-service';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL|| 'http://localhost:5000';

export function getMultiplier(teamCount: number): number {
  switch (teamCount) {
    case 1: return 1.25;
    case 2: return 1.5;
    case 3: return 1.75;
    case 4: return 2.0;
    default: return 1.0;
  }
}

export function calculateAllianceScore({ autoScore, driveScore, endgameClimb, penalties, teamCount }: {
  autoScore: number,
  driveScore: number,
  endgameClimb: number,
  penalties: number,
  teamCount: number
}) {
  return Math.round((autoScore + driveScore + endgameClimb - penalties) * getMultiplier(teamCount));
}

export function useMatchScoresForm({ matchId, onScoresSubmit, onCompleteMatch }: { matchId: string, onScoresSubmit?: () => void, onCompleteMatch?: () => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  // Store previous form state for optimistic UI rollback
  const prevFormDataRef = useRef<typeof formData | null>(null);

  const { sendScoreUpdate } = useWebSocket();
  const updateMatchStatus = useUpdateMatchStatus();

  // --- Real-time total score calculation ---
  const [redTotalScore, setRedTotalScore] = useState(() => calculateAllianceScore({
    autoScore: formData.redAutoScore,
    driveScore: formData.redDriveScore,
    endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.red,
    penalties: formData.scoreDetails.penalties.red,
    teamCount: formData.redTeamCount,
  }));
  const [blueTotalScore, setBlueTotalScore] = useState(() => calculateAllianceScore({
    autoScore: formData.blueAutoScore,
    driveScore: formData.blueDriveScore,
    endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.blue,
    penalties: formData.scoreDetails.penalties.blue,
    teamCount: formData.blueTeamCount,
  }));

  useEffect(() => {
    setRedTotalScore(calculateAllianceScore({
      autoScore: formData.redAutoScore,
      driveScore: formData.redDriveScore,
      endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.red,
      penalties: formData.scoreDetails.penalties.red,
      teamCount: formData.redTeamCount,
    }));
    setBlueTotalScore(calculateAllianceScore({
      autoScore: formData.blueAutoScore,
      driveScore: formData.blueDriveScore,
      endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.blue,
      penalties: formData.scoreDetails.penalties.blue,
      teamCount: formData.blueTeamCount,
    }));
  }, [formData]);

  // --- Debounced Score Update ---
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const emitScoreUpdate = useCallback((nextFormData: typeof formData) => {
    const payload: ScoreData = {
      matchId,
      redAutoScore: nextFormData.redAutoScore,
      redDriveScore: nextFormData.redDriveScore,
      blueAutoScore: nextFormData.blueAutoScore,
      blueDriveScore: nextFormData.blueDriveScore,
      redTotalScore: calculateAllianceScore({
        autoScore: nextFormData.redAutoScore,
        driveScore: nextFormData.redDriveScore,
        endgameClimb: nextFormData.scoreDetails.specialScoring.endgameClimb.red,
        penalties: nextFormData.scoreDetails.penalties.red,
        teamCount: nextFormData.redTeamCount,
      }),
      blueTotalScore: calculateAllianceScore({
        autoScore: nextFormData.blueAutoScore,
        driveScore: nextFormData.blueDriveScore,
        endgameClimb: nextFormData.scoreDetails.specialScoring.endgameClimb.blue,
        penalties: nextFormData.scoreDetails.penalties.blue,
        teamCount: nextFormData.blueTeamCount,
      }),
      redTeamCount: nextFormData.redTeamCount,
      blueTeamCount: nextFormData.blueTeamCount,
      redMultiplier: getMultiplier(nextFormData.redTeamCount),
      blueMultiplier: getMultiplier(nextFormData.blueTeamCount),
      redGameElements: nextFormData.redGameElements,
      blueGameElements: nextFormData.blueGameElements,
      scoreDetails: nextFormData.scoreDetails,
      tournamentId: '', // TODO: set tournamentId if available in context
    };
    sendScoreUpdate(payload);
  }, [matchId, sendScoreUpdate]);

  const debouncedEmitScoreUpdate = useCallback((nextFormData: typeof formData) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      emitScoreUpdate(nextFormData);
    }, 150); // 100-200ms debounce
  }, [emitScoreUpdate]);

  // --- SOLID: handleChange only updates state, but stores previous for optimistic UI ---
  const handleChange = (
    section: string,
    field: string,
    value: number | string
  ) => {
    const numValue = typeof value === "string" ? parseInt(value, 10) || 0 : value;
    setFormData((prev) => {
      prevFormDataRef.current = prev; // Store previous state before optimistic update
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
  };

  // Debounced emit always uses latest formData
  // This fixes the bug with rapid + button clicks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    debouncedEmitScoreUpdate(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSubmit = async () => {
    if (!matchId) {
      toast.error("No match selected");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        matchId,
        ...formData,
        redTotalScore,
        blueTotalScore,
        redMultiplier: getMultiplier(formData.redTeamCount),
        blueMultiplier: getMultiplier(formData.blueTeamCount),
      };
      const response = await fetch(`${API_BASE_URL}/api/match-scores`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        // Rollback to previous state on error
        if (prevFormDataRef.current) {
          setFormData(prevFormDataRef.current);
        }
        throw new Error(error.message || `Error: ${response.status}`);
      }
      await response.json();
      toast.success("Match scores saved successfully");
      if (onScoresSubmit) onScoresSubmit();
      updateMatchStatus.mutate({ matchId, status: MatchStatus.COMPLETED });
      if (onCompleteMatch) await onCompleteMatch();
    } catch (error: any) {
      console.error("Failed to submit scores:", error);
      toast.error(error.message || "Failed to save match scores");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleSubmit,
    redTotalScore,
    blueTotalScore
  };
}
