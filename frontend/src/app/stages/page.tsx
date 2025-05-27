"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAuth } from "@/hooks/common/use-auth";
import { useTournaments } from "@/hooks/api/use-tournaments";
import { useStage, useDeleteStage, useStagesByTournament } from "@/hooks/api/use-stages";
import { useMatchesByStage } from "@/hooks/api/use-matches";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRole } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { PlusIcon, PencilIcon, TrashIcon, InfoIcon, CalendarIcon, ArrowLeftIcon, ListIcon, ClipboardIcon, BarChart3Icon, AlarmClock, Medal } from "lucide-react";
import StageDialog from "./stage-dialog";
import MatchSchedulerDialog from "./match-scheduler-dialog";
import { MatchService } from "@/services/match-service";

export default function StagesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: tournaments, isLoading: tournamentsLoading } = useTournaments();
  
  // State for selected tournament and stages
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  const { 
    data: stagesData, 
    isLoading: stagesLoading, 
    error: stagesError 
  } = useStagesByTournament(selectedTournamentId);
  // Use useMemo to filter stages by selectedTournamentId for extra safety
  const stages = useMemo(
    () =>
      selectedTournamentId && stagesData
        ? stagesData.filter((stage) => stage.tournamentId === selectedTournamentId)
        : [],
    [selectedTournamentId, stagesData]
  );
  
  // State for selected stage
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const { 
    data: stageDetails,
    isLoading: stageDetailsLoading,
  } = useStage(selectedStageId);
  
  // Fetch matches for the selected stage
  const {
    data: stageMatches,
    isLoading: matchesLoading,
    error: matchesError
  } = useMatchesByStage(selectedStageId);

  // Filter matches by selectedStageId for extra safety
  const filteredStageMatches = useMemo(
    () =>
      stageMatches && selectedStageId
        ? stageMatches.filter((match) => match.stageId === selectedStageId)
        : [],
    [stageMatches, selectedStageId]
  );
  
  const deleteMutation = useDeleteStage(selectedTournamentId);
  
  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<any>(null);

  // State for match scheduler dialog
  const [isMatchSchedulerDialogOpen, setIsMatchSchedulerDialogOpen] = useState(false);

  // Add state for match scores map
  const [matchScoresMap, setMatchScoresMap] = useState<Record<string, { redTotalScore: number, blueTotalScore: number }>>({});

  // Reset selected stage when tournament changes
  useEffect(() => {
    setSelectedStageId("");
    setSelectedStage(null);
  }, [selectedTournamentId]);

  // Check if user is admin for access control
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!authLoading && user && user.role !== UserRole.ADMIN && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("You don't have permission to access this page", {
        duration: 5000,
        id: "admin-access-denied",
      });
      router.push("/");
    }
  }, [user, authLoading, router]);
  
  // Fetch match scores for all matches in the current stage
  useEffect(() => {
    async function fetchScores() {
      if (!filteredStageMatches || filteredStageMatches.length === 0) {
        setMatchScoresMap({});
        return;
      }
      const scores: Record<string, { redTotalScore: number, blueTotalScore: number }> = {};
      await Promise.all(
        filteredStageMatches.map(async (match) => {
          try {
            const score = await MatchService.getMatchScores(match.id);
            if (score) {
              scores[match.id] = {
                redTotalScore: score.redTotalScore,
                blueTotalScore: score.blueTotalScore,
              };
            }
          } catch (e) {
            // ignore errors for missing scores
          }
        })
      );
      setMatchScoresMap(scores);
    }
    fetchScores();
  }, [filteredStageMatches]);

  // Return null during authentication check to prevent flash of content
  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // Only allow admins to access this page
  if (user.role !== UserRole.ADMIN) {
    return null;
  }

  // Handler for opening edit dialog
  const handleEditStage = (stage: any) => {
    setSelectedStage(stage);
    setIsEditDialogOpen(true);
  };

  // Handler for opening delete dialog
  const handleDeleteClick = (stage: any) => {
    setSelectedStage(stage);
    setIsDeleteDialogOpen(true);
  };

  // Handler for confirming delete
  const handleConfirmDelete = async () => {
    if (!selectedStage) return;
    
    try {
      await deleteMutation.mutateAsync(selectedStage.id);
      setIsDeleteDialogOpen(false);
      setSelectedStage(null);
      // Clear selected stage if we just deleted it
      if (selectedStageId === selectedStage.id) {
        setSelectedStageId("");
      }
    } catch (error) {
      console.error("Failed to delete stage:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP p");
    } catch (e) {
      return dateString;
    }
  };

  // Get selected tournament (for validation)
  const selectedTournament = tournaments?.find(t => t.id === selectedTournamentId);

  // Determine stage type badge color
  const getStageTypeBadge = (type: string) => {
    switch (type) {
      case 'SWISS':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">SWISS</span>;
      case 'PLAYOFF':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">PLAYOFF</span>;
      case 'FINAL':
        return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">FINAL</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{type}</span>;
    }
  };
  
  // Get match status badge
  const getMatchStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case "COMPLETED":
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Back button handler - clears selected stage
  const handleBackClick = () => {
    setSelectedStageId("");
    setSelectedStage(null);
  };

  // Find the latest round number and check if all matches in that round are completed
  const isSwissStage = stageDetails?.type === 'SWISS';
  let latestRoundNumber = 0;
  let allMatchesCompleted = false;
  if (isSwissStage && filteredStageMatches.length > 0) {
    latestRoundNumber = Math.max(...filteredStageMatches.map(m => m.roundNumber || 0));
    const matchesInLatestRound = filteredStageMatches.filter(m => (m.roundNumber || 0) === latestRoundNumber);
    allMatchesCompleted = matchesInLatestRound.length > 0 && matchesInLatestRound.every(m => m.status === 'COMPLETED');
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-1">Stages</h1>
          <p className="text-base text-gray-400">Manage tournament stages</p>
        </div>
      </div>

      {/* Tournament selection - only show if no stage is selected */}
      {!selectedStageId && (
        <Card className="mb-8 border border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-100">Select Tournament</CardTitle>
            <CardDescription className="text-gray-400">Choose a tournament to manage its stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col space-y-3">
                <Select
                  value={selectedTournamentId}
                  onValueChange={setSelectedTournamentId}
                  disabled={tournamentsLoading}
                >
                  <SelectTrigger className="w-full md:w-[400px] bg-gray-800 border-gray-700 text-gray-100">
                    <SelectValue placeholder="Select a tournament" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-gray-100">
                    {tournaments && tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id} className="bg-gray-900 text-gray-100 hover:bg-gray-800">
                        {tournament.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {tournamentsLoading && (
                  <p className="text-sm text-gray-500">Loading tournaments...</p>
                )}
                {!tournamentsLoading && tournaments?.length === 0 && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <InfoIcon size={16} />
                    <p className="text-sm">No tournaments found. Create a tournament first.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          {selectedTournament && (
            <CardFooter className="bg-gray-800 flex justify-between items-center">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Selected:</span> {selectedTournament.name}
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <CalendarIcon size={12} />
                  {formatDate(selectedTournament.startDate)} - {formatDate(selectedTournament.endDate)}
                </div>
              </div>
              {selectedTournamentId && (
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="flex items-center gap-2 bg-primary-600 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                >
                  <PlusIcon size={16} />
                  Add Stage
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      )}

      {/* Error alert */}
      {stagesError && (
        <Alert variant="destructive" className="mb-6 border-l-2 border-red-600 bg-red-900/30">
          <AlertTitle className="font-semibold text-red-300">Error</AlertTitle>
          <AlertDescription className="text-red-400">
            Failed to load stages. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Stage Detail View - show when a stage is selected */}
      {selectedStageId && stageDetails ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackClick} 
              className="flex items-center gap-1 mb-4 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeftIcon size={16} />
              Back to Stages
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-primary-700"
                onClick={() => handleEditStage(stageDetails)}
              >
                <PencilIcon size={16} className="mr-1" />
                Edit Stage
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-red-400 hover:bg-red-900/30 hover:text-red-300 focus:ring-2 focus:ring-red-700"
                onClick={() => handleDeleteClick(stageDetails)}
              >
                <TrashIcon size={16} className="mr-1" />
                Delete Stage
              </Button>
            </div>
          </div>

          {/* Stage Info Card */}
          <Card className="border border-gray-800 bg-gray-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-gray-100">{stageDetails.name}</CardTitle>
                    {getStageTypeBadge(stageDetails.type)}
                  </div>
                  <CardDescription className="text-gray-400">
                    Part of {stageDetails?.tournament?.name || "tournament"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Start Date</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-primary-400" />
                    <span className="text-gray-200">{formatDate(stageDetails.startDate)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">End Date</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-primary-400" />
                    <span className="text-gray-200">{formatDate(stageDetails.endDate)}</span>
                  </div>
                </div>
              </div>
              <Separator className="bg-gray-700" />
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Stage Type</div>
                <div className="font-medium text-gray-200">
                  {stageDetails.type === "SWISS" && "Swiss Tournament System"}
                  {stageDetails.type === "PLAYOFF" && "Playoff Elimination Bracket"}
                  {stageDetails.type === "FINAL" && "Finals"}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {stageDetails.type === "SWISS" && "Teams are paired based on their win-loss record. Teams with similar records play against each other."}
                  {stageDetails.type === "PLAYOFF" && "Single elimination bracket where winners advance to the next round."}
                  {stageDetails.type === "FINAL" && "Final matches to determine the tournament champions."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Matches List */}
          <Card className="border border-gray-800 bg-gray-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-gray-100">
                    <ListIcon size={20} />
                    Matches in this Stage
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    All scheduled matches for {stageDetails.name}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsMatchSchedulerDialogOpen(true)} 
                    className="flex items-center gap-2 bg-primary-600 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                  >
                    <PlusIcon size={16} />
                    Schedule Matches
                  </Button>
                  {/* Show Generate Next Swiss Round button if all matches in latest round are completed */}
                  {isSwissStage && allMatchesCompleted && (
                    <Button
                      onClick={() => {
                        setIsMatchSchedulerDialogOpen(true);
                        // Optionally, you could pass latestRoundNumber as a prop or context to the dialog
                      }}
                      className="flex items-center gap-2 bg-blue-700 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    >
                      <Medal size={16} />
                      Generate Next Swiss Round
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            {matchesLoading ? (
              <div className="flex justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading matches...</p>
                </div>
              </div>
            ) : matchesError ? (
              <Alert variant="destructive" className="border-l-2 border-red-600 bg-red-900/30">
                <AlertTitle className="font-semibold text-red-300">Error</AlertTitle>
                <AlertDescription className="text-red-400">
                  Failed to load matches for this stage. Please try again later.
                </AlertDescription>
              </Alert>
            ) : filteredStageMatches && filteredStageMatches.length > 0 ? (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800 border-b border-gray-700">
                      <TableHead className="text-gray-300">Match #</TableHead>
                      <TableHead className="text-gray-300">Round</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Scheduled Time</TableHead>
                      <TableHead className="text-gray-300">Teams</TableHead>
                      <TableHead className="text-gray-300">Scores</TableHead>
                      <TableHead className="text-gray-300">Result</TableHead>
                      <TableHead className="text-right text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStageMatches.map((match) => (
                      <TableRow key={match.id} className="hover:bg-gray-800/70 transition">
                        <TableCell className="font-medium text-gray-100">{match.matchNumber}</TableCell>
                        <TableCell className="text-gray-400">{match.roundNumber}</TableCell>
                        <TableCell>{getMatchStatusBadge(match.status)}</TableCell>
                        <TableCell className="text-gray-400">{match.scheduledTime ? formatDate(match.scheduledTime) : "Not scheduled"}</TableCell>
                        <TableCell>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs font-semibold text-red-400">Red</div>
                              {match.alliances.find(a => a.color === 'RED')?.teamAlliances.map(ta => (
                                <div key={ta.id} className="text-xs text-gray-200">{ta.team.name}</div>
                              ))}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-blue-400">Blue</div>
                              {match.alliances.find(a => a.color === 'BLUE')?.teamAlliances.map(ta => (
                                <div key={ta.id} className="text-xs text-gray-200">{ta.team.name}</div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {matchScoresMap[match.id] ? (
                            <div className="flex items-center space-x-1">
                              <span className="text-red-400 font-medium">{matchScoresMap[match.id].redTotalScore}</span>
                              <span className="text-gray-500">-</span>
                              <span className="text-blue-400 font-medium">{matchScoresMap[match.id].blueTotalScore}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {match.status === "COMPLETED" ? (
                            <div className="text-sm">
                              {match.winningAlliance === "RED" && (
                                <span className="text-red-400 font-semibold">Red Wins</span>
                              )}
                              {match.winningAlliance === "BLUE" && (
                                <span className="text-blue-400 font-semibold">Blue Wins</span>
                              )}
                              {!match.winningAlliance && <span className="text-gray-400">No winner</span>}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Pending</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-primary-700"
                            onClick={() => router.push(`/matches/${match.id}`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            ) : (
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-1">No matches found</h3>
                    <p className="text-gray-400">This stage doesn't have any scheduled matches yet</p>
                  </div>
                  <Button onClick={() => router.push(`/match-scheduler?stageId=${stageDetails.id}`)} className="bg-primary-600 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none transition">
                    Create Matches
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      ) : (
        // Stages table - show when no stage is selected
        <>
          {selectedTournamentId ? (
            stagesLoading ? (
              <Card className="border border-gray-800 bg-gray-900">
                <CardContent className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading stages...</p>
                  </div>
                </CardContent>
              </Card>
            ) : stages && stages.length > 0 ? (
              <Card className="border border-gray-800 bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-gray-100">Stages for {selectedTournament?.name}</CardTitle>
                  <CardDescription className="text-gray-400">Manage qualification, playoff, and final stages</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Type</TableHead>
                        <TableHead className="text-gray-400">Start Date</TableHead>
                        <TableHead className="text-gray-400">End Date</TableHead>
                        <TableHead className="text-gray-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stages.map((stage) => (
                        <TableRow 
                          key={stage.id}
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => setSelectedStageId(stage.id)}
                        >
                          <TableCell className="font-medium text-gray-300">{stage.name}</TableCell>
                          <TableCell>{getStageTypeBadge(stage.type)}</TableCell>
                          <TableCell className="text-gray-300">{formatDate(stage.startDate)}</TableCell>
                          <TableCell className="text-gray-300">{formatDate(stage.endDate)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-primary-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditStage(stage);
                              }}
                            >
                              <PencilIcon size={16} />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-red-400 hover:bg-red-900/30 hover:text-red-300 focus:ring-2 focus:ring-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(stage);
                              }}
                            >
                              <TrashIcon size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-gray-800 bg-gray-900">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-1">No stages found</h3>
                    <p className="text-gray-400">Create your first stage for this tournament</p>
                  </div>
                  <Button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-primary-600 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                  >
                    Create Stage
                  </Button>
                </CardContent>
              </Card>
            )
          ) : (
            <Card className="border border-gray-800 bg-gray-900">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-100 mb-1">Select a Tournament</h3>
                  <p className="text-gray-400">Please select a tournament to view and manage its stages</p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Create Stage Dialog */}
      {selectedTournament && (
        <StageDialog 
          isOpen={isCreateDialogOpen} 
          onClose={() => setIsCreateDialogOpen(false)}
          mode="create"
          tournament={selectedTournament}
        />
      )}

      {/* Edit Stage Dialog */}
      {selectedStage && selectedTournament && (
        <StageDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedStage(null);
          }}
          mode="edit"
          tournament={selectedTournament}
          stage={selectedStage}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">Delete Stage</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-300">{selectedStage?.name}</span>?
              This action cannot be undone and will also delete all associated matches.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-gray-400 hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Match Scheduler Dialog */}
      {stageDetails && (
        <MatchSchedulerDialog
          isOpen={isMatchSchedulerDialogOpen}
          onClose={() => setIsMatchSchedulerDialogOpen(false)}
          stageId={stageDetails.id}
          stageName={stageDetails.name}
          stageType={stageDetails.type}
          tournamentId={stageDetails.tournamentId || selectedTournamentId}
        />
      )}
    </div>
  );
}