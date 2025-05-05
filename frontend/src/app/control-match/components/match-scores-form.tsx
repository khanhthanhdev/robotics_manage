"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { SaveIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL|| 'http://localhost:5000';

interface MatchScoresFormProps {
  matchId: string;
  onScoresSubmit?: () => void;
  className?: string;
}

export default function MatchScoresForm({ 
  matchId, 
  onScoresSubmit, 
  className = "" 
}: MatchScoresFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Red alliance scores
    redAutoScore: 0,
    redDriveScore: 0,
    redTeamCount: 3,
    redGameElements: {
      highGoal: 0,
      midGoal: 0,
      lowGoal: 0,
    },
    
    // Blue alliance scores
    blueAutoScore: 0,
    blueDriveScore: 0,
    blueTeamCount: 3,
    blueGameElements: {
      highGoal: 0,
      midGoal: 0,
      lowGoal: 0,
    },
    
    // Penalties and special scoring
    scoreDetails: {
      penalties: {
        red: 0,
        blue: 0,
      },
      specialScoring: {
        endgameClimb: {
          red: 0,
          blue: 0,
        },
      },
    },
  });

  // Calculate total scores for display
  const redTotalScore = Math.round(
    (formData.redAutoScore + formData.redDriveScore + 
     formData.scoreDetails.specialScoring.endgameClimb.red - 
     formData.scoreDetails.penalties.red) * getMultiplier(formData.redTeamCount)
  );

  const blueTotalScore = Math.round(
    (formData.blueAutoScore + formData.blueDriveScore + 
     formData.scoreDetails.specialScoring.endgameClimb.blue - 
     formData.scoreDetails.penalties.blue) * getMultiplier(formData.blueTeamCount)
  );

  function getMultiplier(teamCount: number): number {
    switch (teamCount) {
      case 1: return 1.25;
      case 2: return 1.5;
      case 3: return 1.75;
      case 4: return 2.0;
      default: return 1.0;
    }
  }

  // Generic handler for updating values
  const handleChange = (
    section: string,
    field: string,
    value: number | string
  ) => {
    const numValue = typeof value === "string" ? parseInt(value, 10) || 0 : value;

    if (section === "red" || section === "blue") {
      // Handle top-level scores
      setFormData((prev) => ({
        ...prev,
        [`${section}${field}`]: numValue,
      }));
    } else if (section === "redGameElements" || section === "blueGameElements") {
      // Handle game elements
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as "redGameElements" | "blueGameElements"]),
          [field]: numValue,
        },
      }));
    } else if (section === "penalties") {
      // Handle penalties
      setFormData((prev) => ({
        ...prev,
        scoreDetails: {
          ...prev.scoreDetails,
          penalties: {
            ...prev.scoreDetails.penalties,
            [field]: numValue,
          },
        },
      }));
    } else if (section === "endgameClimb") {
      // Handle special scoring
      setFormData((prev) => ({
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
      }));
    }
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
        // Calculate total scores
        redTotalScore,
        blueTotalScore,
        // Include multipliers based on team counts
        redMultiplier: getMultiplier(formData.redTeamCount),
        blueMultiplier: getMultiplier(formData.blueTeamCount),
      };

      // Get auth token from localStorage
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

      const result = await response.json();
      toast.success("Match scores saved successfully");
      
      // Callback for parent component
      if (onScoresSubmit) {
        onScoresSubmit();
      }
    } catch (error: any) {
      console.error("Failed to submit scores:", error);
      toast.error(error.message || "Failed to save match scores");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Match Scoring</h3>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="flex items-center gap-2"
        >
          <SaveIcon className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Submit Scores"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Red Alliance Column */}
        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-red-700 dark:text-red-400">Red Alliance</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Auto Score */}
              <div className="space-y-2">
                <Label htmlFor="redAutoScore">Auto Score</Label>
                <Input
                  id="redAutoScore"
                  type="number"
                  min="0"
                  value={formData.redAutoScore}
                  onChange={(e) => handleChange("red", "AutoScore", e.target.value)}
                />
              </div>
              
              {/* Drive Score */}
              <div className="space-y-2">
                <Label htmlFor="redDriveScore">Drive Score</Label>
                <Input
                  id="redDriveScore"
                  type="number"
                  min="0"
                  value={formData.redDriveScore}
                  onChange={(e) => handleChange("red", "DriveScore", e.target.value)}
                />
              </div>
              
              {/* Team Count */}
              <div className="space-y-2">
                <Label htmlFor="redTeamCount">Team Count</Label>
                <Select
                  value={formData.redTeamCount.toString()}
                  onValueChange={(value) => handleChange("red", "TeamCount", value)}
                >
                  <SelectTrigger id="redTeamCount">
                    <SelectValue placeholder="Select team count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Team (1.25x)</SelectItem>
                    <SelectItem value="2">2 Teams (1.5x)</SelectItem>
                    <SelectItem value="3">3 Teams (1.75x)</SelectItem>
                    <SelectItem value="4">4 Teams (2.0x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Game Elements */}
              <div className="space-y-2">
                <Label>Game Elements</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="redHighGoal" className="text-xs">High Goal</Label>
                    <Input
                      id="redHighGoal"
                      type="number"
                      min="0"
                      value={formData.redGameElements.highGoal}
                      onChange={(e) => handleChange("redGameElements", "highGoal", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="redMidGoal" className="text-xs">Mid Goal</Label>
                    <Input
                      id="redMidGoal"
                      type="number"
                      min="0"
                      value={formData.redGameElements.midGoal}
                      onChange={(e) => handleChange("redGameElements", "midGoal", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="redLowGoal" className="text-xs">Low Goal</Label>
                    <Input
                      id="redLowGoal"
                      type="number"
                      min="0"
                      value={formData.redGameElements.lowGoal}
                      onChange={(e) => handleChange("redGameElements", "lowGoal", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Special Scoring */}
              <div className="space-y-2">
                <Label htmlFor="redEndgameClimb">Endgame Climb</Label>
                <Input
                  id="redEndgameClimb"
                  type="number"
                  min="0"
                  value={formData.scoreDetails.specialScoring.endgameClimb.red}
                  onChange={(e) => handleChange("endgameClimb", "red", e.target.value)}
                />
              </div>

              {/* Penalties */}
              <div className="space-y-2">
                <Label htmlFor="redPenalties">Penalties</Label>
                <Input
                  id="redPenalties"
                  type="number"
                  min="0"
                  value={formData.scoreDetails.penalties.red}
                  onChange={(e) => handleChange("penalties", "red", e.target.value)}
                />
              </div>

              {/* Calculated Total */}
              <div className="pt-4 border-t mt-4">
                <div className="text-lg font-bold flex justify-between">
                  <span>Total Score:</span>
                  <span className="text-red-600">{redTotalScore}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Multiplier: {getMultiplier(formData.redTeamCount)}x
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blue Alliance Column */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
            <CardTitle className="text-blue-700 dark:text-blue-400">Blue Alliance</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Auto Score */}
              <div className="space-y-2">
                <Label htmlFor="blueAutoScore">Auto Score</Label>
                <Input
                  id="blueAutoScore"
                  type="number"
                  min="0"
                  value={formData.blueAutoScore}
                  onChange={(e) => handleChange("blue", "AutoScore", e.target.value)}
                />
              </div>
              
              {/* Drive Score */}
              <div className="space-y-2">
                <Label htmlFor="blueDriveScore">Drive Score</Label>
                <Input
                  id="blueDriveScore"
                  type="number"
                  min="0"
                  value={formData.blueDriveScore}
                  onChange={(e) => handleChange("blue", "DriveScore", e.target.value)}
                />
              </div>
              
              {/* Team Count */}
              <div className="space-y-2">
                <Label htmlFor="blueTeamCount">Team Count</Label>
                <Select
                  value={formData.blueTeamCount.toString()}
                  onValueChange={(value) => handleChange("blue", "TeamCount", value)}
                >
                  <SelectTrigger id="blueTeamCount">
                    <SelectValue placeholder="Select team count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Team (1.25x)</SelectItem>
                    <SelectItem value="2">2 Teams (1.5x)</SelectItem>
                    <SelectItem value="3">3 Teams (1.75x)</SelectItem>
                    <SelectItem value="4">4 Teams (2.0x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Game Elements */}
              <div className="space-y-2">
                <Label>Game Elements</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="blueHighGoal" className="text-xs">High Goal</Label>
                    <Input
                      id="blueHighGoal"
                      type="number"
                      min="0"
                      value={formData.blueGameElements.highGoal}
                      onChange={(e) => handleChange("blueGameElements", "highGoal", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blueMidGoal" className="text-xs">Mid Goal</Label>
                    <Input
                      id="blueMidGoal"
                      type="number"
                      min="0"
                      value={formData.blueGameElements.midGoal}
                      onChange={(e) => handleChange("blueGameElements", "midGoal", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blueLowGoal" className="text-xs">Low Goal</Label>
                    <Input
                      id="blueLowGoal"
                      type="number"
                      min="0"
                      value={formData.blueGameElements.lowGoal}
                      onChange={(e) => handleChange("blueGameElements", "lowGoal", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Special Scoring */}
              <div className="space-y-2">
                <Label htmlFor="blueEndgameClimb">Endgame Climb</Label>
                <Input
                  id="blueEndgameClimb"
                  type="number"
                  min="0"
                  value={formData.scoreDetails.specialScoring.endgameClimb.blue}
                  onChange={(e) => handleChange("endgameClimb", "blue", e.target.value)}
                />
              </div>

              {/* Penalties */}
              <div className="space-y-2">
                <Label htmlFor="bluePenalties">Penalties</Label>
                <Input
                  id="bluePenalties"
                  type="number"
                  min="0"
                  value={formData.scoreDetails.penalties.blue}
                  onChange={(e) => handleChange("penalties", "blue", e.target.value)}
                />
              </div>

              {/* Calculated Total */}
              <div className="pt-4 border-t mt-4">
                <div className="text-lg font-bold flex justify-between">
                  <span>Total Score:</span>
                  <span className="text-blue-600">{blueTotalScore}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Multiplier: {getMultiplier(formData.blueTeamCount)}x
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall match winner indicator */}
      <Card className="bg-gradient-to-r from-blue-50 via-white to-red-50 dark:from-blue-950/20 dark:via-transparent dark:to-red-950/20">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-between items-center">
            <div className="text-red-600 font-bold text-lg">
              {redTotalScore}
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-1">Match Result</h4>
              {blueTotalScore > redTotalScore ? (
                <div className="text-blue-600 font-bold">BLUE WINS</div>
              ) : redTotalScore > blueTotalScore ? (
                <div className="text-red-600 font-bold">RED WINS</div>
              ) : (
                <div className="text-yellow-600 font-bold">TIE</div>
              )}
            </div>
            <div className="text-blue-600 font-bold text-lg">
              {blueTotalScore}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom submit button */}
      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="w-full sm:w-auto px-8 py-2"
          size="lg"
          variant="default"
        >
          <SaveIcon className="h-5 w-5 mr-2" />
          {isSubmitting ? "Saving..." : "Submit Final Scores"}
        </Button>
      </div>
    </div>
  );
}