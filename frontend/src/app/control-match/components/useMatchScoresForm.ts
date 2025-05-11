import { useState } from "react";
import { toast } from "sonner";
import { useWebSocket } from '@/hooks/useWebSocket';

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

export function useMatchScoresForm({ matchId, onScoresSubmit }: { matchId: string, onScoresSubmit?: () => void }) {
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

  const { sendScoreUpdate } = useWebSocket();

  const redTotalScore = calculateAllianceScore({
    autoScore: formData.redAutoScore,
    driveScore: formData.redDriveScore,
    endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.red,
    penalties: formData.scoreDetails.penalties.red,
    teamCount: formData.redTeamCount,
  });

  const blueTotalScore = calculateAllianceScore({
    autoScore: formData.blueAutoScore,
    driveScore: formData.blueDriveScore,
    endgameClimb: formData.scoreDetails.specialScoring.endgameClimb.blue,
    penalties: formData.scoreDetails.penalties.blue,
    teamCount: formData.blueTeamCount,
  });

  // Generic handler for updating values
  const handleChange = (
    section: string,
    field: string,
    value: number | string
  ) => {
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

      // Only emit score update if team count changes
      if ((section === "red" && field === "TeamCount") || (section === "blue" && field === "TeamCount")) {
        const redTeamCount = section === "red" ? numValue : updated.redTeamCount;
        const blueTeamCount = section === "blue" ? numValue : updated.blueTeamCount;
        const redMultiplier = getMultiplier(redTeamCount);
        const blueMultiplier = getMultiplier(blueTeamCount);
        sendScoreUpdate({
          matchId,
          redAutoScore: updated.redAutoScore,
          redDriveScore: updated.redDriveScore,
          blueAutoScore: updated.blueAutoScore,
          blueDriveScore: updated.blueDriveScore,
          redTotalScore: calculateAllianceScore({
            autoScore: updated.redAutoScore,
            driveScore: updated.redDriveScore,
            endgameClimb: updated.scoreDetails.specialScoring.endgameClimb.red,
            penalties: updated.scoreDetails.penalties.red,
            teamCount: redTeamCount,
          }),
          blueTotalScore: calculateAllianceScore({
            autoScore: updated.blueAutoScore,
            driveScore: updated.blueDriveScore,
            endgameClimb: updated.scoreDetails.specialScoring.endgameClimb.blue,
            penalties: updated.scoreDetails.penalties.blue,
            teamCount: blueTeamCount,
          }),
          redTeamCount,
          blueTeamCount,
          redMultiplier,
          blueMultiplier,
        });
      }
      return updated;
    });
  };

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
      const authToken = localStorage.getItem('auth-token');
      if (!authToken) {
        toast.error("Authentication required. Please log in again.");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/match-scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error: ${response.status}`);
      }
      await response.json();
      toast.success("Match scores saved successfully");
      if (onScoresSubmit) onScoresSubmit();
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
