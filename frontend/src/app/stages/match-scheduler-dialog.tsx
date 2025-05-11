"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";

interface Team {
  id: string;
  teamNumber: string;
  name: string;
  organization?: string;
}

interface MatchSchedulerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stageId: string;
  stageName: string;
  stageType: string;
  tournamentId: string;
}

export default function MatchSchedulerDialog({
  isOpen,
  onClose,
  stageId,
  stageName,
  stageType,
  tournamentId,
}: MatchSchedulerDialogProps) {
  const queryClient = useQueryClient();
  
  // Basic state
  const [activeView, setActiveView] = useState<"config" | "teams" | "results">("config");
  const [schedulerType, setSchedulerType] = useState<string>(stageType === "SWISS" ? "swiss" : "playoff");
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(0);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(3);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduledMatches, setScheduledMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state for results view
  const [currentPage, setCurrentPage] = useState<number>(1);
  const matchesPerPage = 10;
  const paginatedMatches = scheduledMatches.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );
  const totalPages = Math.ceil(scheduledMatches.length / matchesPerPage);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setActiveView("config");
      setSchedulerType(stageType === "SWISS" ? "swiss" : "playoff");
      setCurrentRoundNumber(0);
      setNumberOfRounds(3);
      setSelectedTeams([]);
      setSearchQuery("");
      setScheduledMatches([]);
      setCurrentPage(1);
      setError(null);
    }
  }, [isOpen, stageType]);

  // Fetch teams by tournament ID - only when teams view is active
  const { 
    data: teams = [], 
    isLoading: isLoadingTeams, 
    refetch: refetchTeams 
  } = useQuery({
    queryKey: QueryKeys.teams.byTournament(tournamentId),
    queryFn: async () => {
      try {
        const data = await apiClient.get<Team[]>(`/teams?tournamentId=${tournamentId}`);
        return data;
      } catch (error: any) {
        console.error("Error fetching teams:", error);
        toast.error(`Failed to load teams: ${error.message}`);
        return [];
      }
    },
    enabled: !!tournamentId && isOpen && activeView === "teams",
    staleTime: 1000 * 60,
  });

  // Filter teams based on search query
  const filteredTeams = teams.filter(team => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      team.teamNumber.toLowerCase().includes(query) || 
      team.name.toLowerCase().includes(query) || 
      (team.organization && team.organization.toLowerCase().includes(query))
    );
  });

  // Toggle team selection
  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId) 
        : [...prev, teamId]
    );
  };

  // Select/deselect all filtered teams
  const handleSelectAllFiltered = () => {
    if (filteredTeams.length === 0) return;
    
    const filteredIds = filteredTeams.map(team => team.id);
    const allSelected = filteredIds.every(id => selectedTeams.includes(id));
    
    if (allSelected) {
      // Deselect all filtered teams
      setSelectedTeams(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      // Select all filtered teams
      setSelectedTeams(prev => {
        const newSelection = [...prev];
        filteredIds.forEach(id => {
          if (!newSelection.includes(id)) newSelection.push(id);
        });
        return newSelection;
      });
    }
  };

  // Function to schedule matches
  const handleSchedule = async () => {
    if (selectedTeams.length === 0) {
      toast.error("Please select at least one team");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      let endpoint = "";
      let requestBody: any = {
        stageId,
        teamIds: selectedTeams
      };
      
      if (schedulerType === "swiss") {
        endpoint = "/match-scheduler/generate-swiss-round";
        requestBody.currentRoundNumber = currentRoundNumber;
      } else if (schedulerType === "playoff") {
        endpoint = "/match-scheduler/generate-playoff";
        requestBody.numberOfRounds = numberOfRounds;
      }

      const response = await apiClient.post(endpoint, requestBody);
      
      if (response?.matches) {
        setScheduledMatches(response.matches);
        setActiveView("results");
        toast.success(`Successfully created ${response.matches.length} matches`);
        
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: QueryKeys.matches.all() });
        queryClient.invalidateQueries({ queryKey: QueryKeys.matches.byStage(stageId) });
      } else {
        setError("No matches were returned from the server");
      }
    } catch (err: any) {
      console.error("Error scheduling matches:", err);
      setError(err.message || "Failed to schedule matches");
      toast.error(`Failed to schedule matches: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Match Scheduler</DialogTitle>
          <DialogDescription>
            Generate matches for {stageName} ({stageType.toLowerCase()} stage)
          </DialogDescription>
        </DialogHeader>

        {/* Navigation tabs */}
        <div className="flex border-b">
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeView === "config" 
                ? "border-b-2 border-primary font-medium text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveView("config")}
          >
            1. Configuration
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeView === "teams" 
                ? "border-b-2 border-primary font-medium text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveView("teams")}
          >
            2. Select Teams
          </div>
          {scheduledMatches.length > 0 && (
            <div
              className={`px-4 py-2 cursor-pointer ${
                activeView === "results" 
                  ? "border-b-2 border-primary font-medium text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveView("results")}
            >
              3. Results
            </div>
          )}
        </div>

        {/* Content based on active view */}
        {activeView === "config" && (
          <div className="py-2 space-y-4">
            <div className="space-y-2">
              <Label>Scheduler Type</Label>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border rounded-md p-3 cursor-pointer ${
                    schedulerType === "swiss" 
                      ? "bg-primary/10 border-primary" 
                      : stageType !== "SWISS"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-accent"
                  }`}
                  onClick={() => {
                    if (stageType === "SWISS") setSchedulerType("swiss");
                  }}
                >
                  <div className="font-medium">Swiss Tournament</div>
                  <div className="text-xs text-muted-foreground">
                    Multiple rounds where teams face opponents with similar records
                  </div>
                </div>
                <div
                  className={`border rounded-md p-3 cursor-pointer ${
                    schedulerType === "playoff" 
                      ? "bg-primary/10 border-primary" 
                      : stageType !== "PLAYOFF"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-accent"
                  }`}
                  onClick={() => {
                    if (stageType === "PLAYOFF") setSchedulerType("playoff");
                  }}
                >
                  <div className="font-medium">Playoff Bracket</div>
                  <div className="text-xs text-muted-foreground">
                    Elimination tournament with advancing winners
                  </div>
                </div>
              </div>
            </div>
            
            {schedulerType === "swiss" && (
              <div className="space-y-2">
                <Label htmlFor="currentRoundNumber">Current Round Number</Label>
                <Input
                  id="currentRoundNumber"
                  type="number"
                  min={0}
                  value={currentRoundNumber}
                  onChange={(e) => setCurrentRoundNumber(Number(e.target.value))}
                  placeholder="Enter the current round number (0 for first round)"
                />
                <p className="text-xs text-muted-foreground">
                  Enter 0 for the first round. For subsequent rounds, enter the last completed round number.
                </p>
              </div>
            )}

            {schedulerType === "playoff" && (
              <div className="space-y-2">
                <Label htmlFor="numberOfRounds">Number of Rounds</Label>
                <Select
                  value={numberOfRounds.toString()}
                  onValueChange={(value) => setNumberOfRounds(Number(value))}
                >
                  <SelectTrigger id="numberOfRounds">
                    <SelectValue placeholder="Select number of rounds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 rounds (4 teams)</SelectItem>
                    <SelectItem value="3">3 rounds (8 teams)</SelectItem>
                    <SelectItem value="4">4 rounds (16 teams)</SelectItem>
                    <SelectItem value="5">5 rounds (32 teams)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Number of rounds determines the bracket size (2^rounds teams).
                </p>
              </div>
            )}
          </div>
        )}

        {activeView === "teams" && (
          <div className="py-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{selectedTeams.length}</span> of {teams.length} teams selected
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-9 w-[180px]"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSelectAllFiltered}
                >
                  {searchQuery ? "Select Filtered" : "Select All"}
                </Button>
              </div>
            </div>

            {isLoadingTeams ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : teams.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No teams found for this tournament
              </div>
            ) : (
              <ScrollArea className="h-[300px] border rounded-md">
                <div className="p-2">
                  {filteredTeams.map(team => (
                    <div
                      key={team.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedTeams.includes(team.id) ? "bg-primary/10" : "hover:bg-accent"
                      }`}
                      onClick={() => toggleTeam(team.id)}
                    >
                      <Checkbox
                        checked={selectedTeams.includes(team.id)}
                        onCheckedChange={() => toggleTeam(team.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mr-2"
                      />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <span className="bg-muted px-1 rounded text-xs">{team.teamNumber}</span>
                          <span>{team.name}</span>
                        </div>
                        {team.organization && (
                          <div className="text-xs text-muted-foreground">{team.organization}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {activeView === "results" && (
          <div className="py-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Created {scheduledMatches.length} matches
              </h3>
              <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
                Success
              </Badge>
            </div>

            <ScrollArea className="h-[300px] border rounded-md">
              <div className="divide-y">
                {paginatedMatches.map(match => (
                  <div key={match.id} className="p-3 hover:bg-accent/50">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">
                        Match #{match.matchNumber}
                      </div>
                      <Badge variant="outline">{match.status || "PENDING"}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Round: {match.roundNumber}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-xs font-semibold text-red-600">Red Alliance</div>
                        <div>
                          {match.alliances
                            .find((a: any) => a.color === "RED")
                            ?.teamAlliances.map((ta: any) => ta.team?.teamNumber || "TBD")
                            .join(", ") || "No teams"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-blue-600">Blue Alliance</div>
                        <div>
                          {match.alliances
                            .find((a: any) => a.color === "BLUE")
                            ?.teamAlliances.map((ta: any) => ta.team?.teamNumber || "TBD")
                            .join(", ") || "No teams"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          {/* Navigation buttons based on active view */}
          {activeView === "config" && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => setActiveView("teams")}
              >
                Next: Select Teams
              </Button>
            </>
          )}

          {activeView === "teams" && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setActiveView("config")}
              >
                Back
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={isLoading || selectedTeams.length === 0}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Creating...
                  </>
                ) : (
                  "Create Matches"
                )}
              </Button>
            </>
          )}

          {activeView === "results" && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveView("config");
                  setScheduledMatches([]);
                }}
              >
                Create More
              </Button>
              <Button onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}