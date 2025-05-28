"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScheduledMatches, useActiveMatch } from "@/hooks/features/use-match-control";
import { useAudienceDisplaySettings, useUpdateAudienceDisplay } from "@/hooks/features/use-audience-display";
import { toast } from "sonner";
import type { DisplayMode } from "@/lib/types";

export default function AudienceDisplayController() {
  const [displayMode, setDisplayMode] = useState<string>("intro");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const { data: scheduledMatches, isLoading: isLoadingScheduled } = useScheduledMatches();
  const { data: activeMatch, isLoading: isLoadingActive } = useActiveMatch(selectedMatchId);
  const { data: audienceSettings } = useAudienceDisplaySettings();
  const updateAudienceDisplay = useUpdateAudienceDisplay();
  const router = useRouter();

  const handlePreview = () => {
    // In a real app, this would save the state to be retrieved by the audience display
    window.open("/audience-display", "_blank");
    toast.success("Preview opened in new tab");
  };

  const handleApply = () => {
    updateAudienceDisplay.mutate({
      displayMode: displayMode as DisplayMode,
      matchId: selectedMatchId,
      showTimer: true,
      showScores: true,
      showTeams: true
    }, {
      onSuccess: () => {
        toast.success(`Display mode set to: ${displayMode}`);
      },
      onError: () => {
        toast.error("Failed to update display settings");
      }
    });
  };

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatchId(matchId);
    
    // If selected match and display mode is 'match', update immediately
    if (displayMode === 'match') {
      updateAudienceDisplay.mutate({
        displayMode: 'match',
        matchId: matchId
      });
    }
  };

  const handleDisplayModeChange = (mode: string) => {
    setDisplayMode(mode);
    
    // Update when changing to match mode with a selected match
    if (mode === 'match' && selectedMatchId) {
      updateAudienceDisplay.mutate({
        displayMode: 'match',
        matchId: selectedMatchId
      });
    } else if (mode !== 'match') {
      // For non-match modes, clear the match ID in settings
      updateAudienceDisplay.mutate({
        displayMode: mode as DisplayMode,
        matchId: null
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Audience Display Control</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>
              Control what appears on the audience display screens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <RadioGroup
                value={displayMode}
                onValueChange={handleDisplayModeChange}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intro" id="intro" />
                  <Label htmlFor="intro" className="cursor-pointer">
                    <div className="font-medium">Tournament Introduction</div>
                    <div className="text-sm text-muted-foreground">
                      Display tournament welcome screen
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="queue" id="queue" />
                  <Label htmlFor="queue" className="cursor-pointer">
                    <div className="font-medium">Upcoming Matches</div>
                    <div className="text-sm text-muted-foreground">
                      Show queue of next matches
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="match" 
                    id="match"
                    disabled={!selectedMatchId} 
                  />
                  <Label 
                    htmlFor="match" 
                    className={`cursor-pointer ${!selectedMatchId ? 'opacity-50' : ''}`}
                  >
                    <div className="font-medium">Active Match</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedMatchId 
                        ? `Show match #${activeMatch?.matchNumber || '...'}`
                        : "Select a match first"
                      }
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="results" id="results" />
                  <Label htmlFor="results" className="cursor-pointer">
                    <div className="font-medium">Match Results</div>
                    <div className="text-sm text-muted-foreground">
                      Show results from completed matches
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standings" id="standings" />
                  <Label htmlFor="standings" className="cursor-pointer">
                    <div className="font-medium">Tournament Standings</div>
                    <div className="text-sm text-muted-foreground">
                      Display current tournament standings
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="awards" id="awards" />
                  <Label htmlFor="awards" className="cursor-pointer">
                    <div className="font-medium">Awards Ceremony</div>
                    <div className="text-sm text-muted-foreground">
                      Display for awards presentations
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Button 
                onClick={handlePreview} 
                variant="outline"
              >
                Preview
              </Button>
              <Button 
                onClick={handleApply}
                disabled={updateAudienceDisplay.isPending}
              >
                {updateAudienceDisplay.isPending ? "Applying..." : "Apply to Audience Screens"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Match Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Match</CardTitle>
            <CardDescription>
              Choose a match to display
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="scheduled">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="scheduled" className="flex-1">Scheduled</TabsTrigger>
                <TabsTrigger value="in-progress" className="flex-1">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="scheduled" className="space-y-2 max-h-[400px] overflow-y-auto">
                {isLoadingScheduled ? (
                  <div className="py-8 text-center text-muted-foreground">Loading matches...</div>
                ) : scheduledMatches && scheduledMatches.length > 0 ? (
                  scheduledMatches.map((match: { id: string; matchNumber: number; status: string; stage?: { name: string } }) => (
                    <div 
                      key={match.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedMatchId === match.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                      }`}
                      onClick={() => handleMatchSelect(match.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Match #{match.matchNumber}</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                          {match.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {match.stage?.name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">No scheduled matches found</div>
                )}
              </TabsContent>

              {/* Other tabs would have similar content structure */}
              <TabsContent value="in-progress" className="py-8 text-center text-muted-foreground">
                No matches currently in progress
              </TabsContent>
              <TabsContent value="completed" className="py-8 text-center text-muted-foreground">
                No completed matches found
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}