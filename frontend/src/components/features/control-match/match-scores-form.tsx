"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon } from "lucide-react";
import { useMatchScoresForm } from "./use-matchscores-form";
import { SubmitScoreButton } from "./SubmitScoreButton";

interface MatchScoresFormProps {
  matchId: string;
  tournamentId?: string;
  fieldId?: string;
  onScoresSubmit?: () => void;
  onCompleteMatch?: () => Promise<void>;
  className?: string;
}

export default function MatchScoresForm({
  matchId,
  tournamentId,
  fieldId,
  onScoresSubmit,
  onCompleteMatch,
  className = "",
}: MatchScoresFormProps) {
  const {
    formData,
    isSubmitting,
    hasUnsavedChanges,
    handleChange,
    handleSubmit,
    handleSubmitToDatabase,
    realtimeScore, // use the unified realtimeScore object
  } = useMatchScoresForm({
    matchId,
    tournamentId,
    fieldId,
    onScoresSubmit,
    onCompleteMatch,
  });

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Match Scoring</h3>
        <div className="text-sm text-gray-600">
          Real-time updates sent automatically
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Red Alliance Column */}
        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-red-700 dark:text-red-400">
              Red Alliance
            </CardTitle>
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
                  onChange={(e) =>
                    handleChange("red", "AutoScore", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("red", "DriveScore", e.target.value)
                  }
                />
              </div>

              {/* Team Count */}
              <div className="space-y-2">
                <Label htmlFor="redTeamCount">Team Count</Label>
                <Select
                  value={formData.redTeamCount.toString()}
                  onValueChange={(value) =>
                    handleChange("red", "TeamCount", value)
                  }
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
                    <Label htmlFor="redHighGoal" className="text-xs">
                      High Goal
                    </Label>
                    <Input
                      id="redHighGoal"
                      type="number"
                      min="0"
                      value={formData.redGameElements.highGoal}
                      onChange={(e) =>
                        handleChange(
                          "redGameElements",
                          "highGoal",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="redMidGoal" className="text-xs">
                      Mid Goal
                    </Label>
                    <Input
                      id="redMidGoal"
                      type="number"
                      min="0"
                      value={formData.redGameElements.midGoal}
                      onChange={(e) =>
                        handleChange(
                          "redGameElements",
                          "midGoal",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="redLowGoal" className="text-xs">
                      Low Goal
                    </Label>
                    <Input
                      id="redLowGoal"
                      type="number"
                      min="0"
                      value={formData.redGameElements.lowGoal}
                      onChange={(e) =>
                        handleChange(
                          "redGameElements",
                          "lowGoal",
                          e.target.value
                        )
                      }
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
                  onChange={(e) =>
                    handleChange("endgameClimb", "red", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("penalties", "red", e.target.value)
                  }
                />
              </div>

              {/* Calculated Total */}
              <div className="pt-4 border-t mt-4">
                <div className="text-lg font-bold flex justify-between">
                  <span>Total Score:</span>
                  <span className="text-red-600">{realtimeScore.red.total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blue Alliance Column */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
            <CardTitle className="text-blue-700 dark:text-blue-400">
              Blue Alliance
            </CardTitle>
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
                  onChange={(e) =>
                    handleChange("blue", "AutoScore", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("blue", "DriveScore", e.target.value)
                  }
                />
              </div>

              {/* Team Count */}
              <div className="space-y-2">
                <Label htmlFor="blueTeamCount">Team Count</Label>
                <Select
                  value={formData.blueTeamCount.toString()}
                  onValueChange={(value) =>
                    handleChange("blue", "TeamCount", value)
                  }
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
                    <Label htmlFor="blueHighGoal" className="text-xs">
                      High Goal
                    </Label>
                    <Input
                      id="blueHighGoal"
                      type="number"
                      min="0"
                      value={formData.blueGameElements.highGoal}
                      onChange={(e) =>
                        handleChange(
                          "blueGameElements",
                          "highGoal",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blueMidGoal" className="text-xs">
                      Mid Goal
                    </Label>
                    <Input
                      id="blueMidGoal"
                      type="number"
                      min="0"
                      value={formData.blueGameElements.midGoal}
                      onChange={(e) =>
                        handleChange(
                          "blueGameElements",
                          "midGoal",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blueLowGoal" className="text-xs">
                      Low Goal
                    </Label>
                    <Input
                      id="blueLowGoal"
                      type="number"
                      min="0"
                      value={formData.blueGameElements.lowGoal}
                      onChange={(e) =>
                        handleChange(
                          "blueGameElements",
                          "lowGoal",
                          e.target.value
                        )
                      }
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
                  onChange={(e) =>
                    handleChange("endgameClimb", "blue", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("penalties", "blue", e.target.value)
                  }
                />
              </div>

              {/* Calculated Total */}
              <div className="pt-4 border-t mt-4">
                <div className="text-lg font-bold flex justify-between">
                  <span>Total Score:</span>
                  <span className="text-blue-600">{realtimeScore.blue.total}</span>
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
              {realtimeScore.red.total}
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-1">Match Result</h4>
              {realtimeScore.blue.total > realtimeScore.red.total ? (
                <div className="text-blue-600 font-bold">BLUE WINS</div>
              ) : realtimeScore.red.total > realtimeScore.blue.total ? (
                <div className="text-red-600 font-bold">RED WINS</div>
              ) : (
                <div className="text-yellow-600 font-bold">TIE</div>
              )}
            </div>
            <div className="text-blue-600 font-bold text-lg">
              {realtimeScore.blue.total}
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Enhanced Submit Score Button */}
      <SubmitScoreButton
        onSubmit={handleSubmitToDatabase}
        isSubmitting={isSubmitting}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
}
