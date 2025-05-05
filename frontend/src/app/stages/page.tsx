"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { useTournaments } from "@/hooks/use-tournaments";
import { useStage, useStagesByTournament, useDeleteStage } from "@/hooks/use-stages";
import { useMatchesByStage } from "@/hooks/use-matches";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { PlusIcon, PencilIcon, TrashIcon, InfoIcon, CalendarIcon, ArrowLeftIcon, ListIcon, ClipboardIcon, BarChart3Icon, AlarmClock, Medal } from "lucide-react";
import StageDialog from "./stage-dialog";

export default function StagesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: tournaments, isLoading: tournamentsLoading } = useTournaments();
  
  // State for selected tournament and stages
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  const { 
    data: stages, 
    isLoading: stagesLoading, 
    error: stagesError 
  } = useStagesByTournament(selectedTournamentId);
  
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
  
  const deleteMutation = useDeleteStage(selectedTournamentId);
  
  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<any>(null);

  // Reset selected stage when tournament changes
  useEffect(() => {
    setSelectedStageId("");
    setSelectedStage(null);
  }, [selectedTournamentId]);

  // Check if user is admin for access control
  useEffect(() => {
    if (!authLoading && user && user.role !== UserRole.ADMIN) {
      toast.error("You don't have permission to access this page", {
        duration: 5000,
        id: "admin-access-denied",
      });
      router.push("/");
    }
  }, [user, authLoading, router]);
  
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
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Stages</h1>
          <p className="text-gray-500">Manage tournament stages</p>
        </div>
      </div>

      {/* Tournament selection - only show if no stage is selected */}
      {!selectedStageId && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Tournament</CardTitle>
            <CardDescription>Choose a tournament to manage its stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col space-y-3">
                <Select
                  value={selectedTournamentId}
                  onValueChange={setSelectedTournamentId}
                  disabled={tournamentsLoading}
                >
                  <SelectTrigger className="w-full md:w-[400px]">
                    <SelectValue placeholder="Select a tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournaments && tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {tournamentsLoading && (
                  <p className="text-sm text-muted-foreground">Loading tournaments...</p>
                )}
                {!tournamentsLoading && tournaments?.length === 0 && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <InfoIcon size={16} />
                    <p className="text-sm">No tournaments found. Create a tournament first.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          {selectedTournament && (
            <CardFooter className="bg-muted/50 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">Selected:</span> {selectedTournament.name}
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarIcon size={12} />
                  {formatDate(selectedTournament.startDate)} - {formatDate(selectedTournament.endDate)}
                </div>
              </div>
              {selectedTournamentId && (
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="flex items-center gap-2"
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
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
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
              className="flex items-center gap-1 mb-4"
            >
              <ArrowLeftIcon size={16} />
              Back to Stages
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditStage(stageDetails)}
              >
                <PencilIcon size={16} className="mr-1" />
                Edit Stage
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteClick(stageDetails)}
              >
                <TrashIcon size={16} className="mr-1" />
                Delete Stage
              </Button>
            </div>
          </div>

          {/* Stage Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{stageDetails.name}</CardTitle>
                    {getStageTypeBadge(stageDetails.type)}
                  </div>
                  <CardDescription>
                    Part of {stageDetails?.tournament?.name || "tournament"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-primary" />
                    <span>{formatDate(stageDetails.startDate)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">End Date</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-primary" />
                    <span>{formatDate(stageDetails.endDate)}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Stage Type</div>
                <div className="font-medium">
                  {stageDetails.type === "SWISS" && "Swiss Tournament System"}
                  {stageDetails.type === "PLAYOFF" && "Playoff Elimination Bracket"}
                  {stageDetails.type === "FINAL" && "Finals"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stageDetails.type === "SWISS" && "Teams are paired based on their win-loss record. Teams with similar records play against each other."}
                  {stageDetails.type === "PLAYOFF" && "Single elimination bracket where winners advance to the next round."}
                  {stageDetails.type === "FINAL" && "Final matches to determine the tournament champions."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Matches List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListIcon size={20} />
                Matches in this Stage
              </CardTitle>
              <CardDescription>
                All scheduled matches for {stageDetails.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {matchesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading matches...</p>
                  </div>
                </div>
              ) : matchesError ? (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to load matches for this stage. Please try again later.
                  </AlertDescription>
                </Alert>
              ) : stageMatches && stageMatches.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match #</TableHead>
                      <TableHead>Round</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled Time</TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead>Scores</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stageMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{match.matchNumber}</TableCell>
                        <TableCell>{match.roundNumber}</TableCell>
                        <TableCell>{getMatchStatusBadge(match.status)}</TableCell>
                        <TableCell>{match.scheduledTime ? formatDate(match.scheduledTime) : "Not scheduled"}</TableCell>
                        <TableCell>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs font-semibold text-red-600">Red</div>
                              {match.alliances.find(a => a.color === 'RED')?.teamAlliances.map(ta => (
                                <div key={ta.id} className="text-xs">{ta.team.name}</div>
                              ))}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-blue-600">Blue</div>
                              {match.alliances.find(a => a.color === 'BLUE')?.teamAlliances.map(ta => (
                                <div key={ta.id} className="text-xs">{ta.team.name}</div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {match.status === "COMPLETED" ? (
                            <div className="flex items-center space-x-1">
                              <span className="text-red-600 font-medium">
                                {match.alliances.find(a => a.color === 'RED')?.score || 0}
                              </span>
                              <span className="text-gray-500">-</span>
                              <span className="text-blue-600 font-medium">
                                {match.alliances.find(a => a.color === 'BLUE')?.score || 0}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {match.status === "COMPLETED" ? (
                            <div className="text-sm">
                              {match.winningAlliance === "RED" && (
                                <span className="text-red-600 font-semibold">Red Wins</span>
                              )}
                              {match.winningAlliance === "BLUE" && (
                                <span className="text-blue-600 font-semibold">Blue Wins</span>
                              )}
                              {!match.winningAlliance && "No winner"}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Pending</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/matches/${match.id}`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-1">No matches found</h3>
                    <p className="text-gray-500">This stage doesn't have any scheduled matches yet</p>
                  </div>
                  <Button onClick={() => router.push(`/match-scheduler?stageId=${stageDetails.id}`)}>
                    Create Matches
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        // Stages table - show when no stage is selected
        <>
          {selectedTournamentId ? (
            stagesLoading ? (
              <Card>
                <CardContent className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading stages...</p>
                  </div>
                </CardContent>
              </Card>
            ) : stages && stages.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Stages for {selectedTournament?.name}</CardTitle>
                  <CardDescription>Manage qualification, playoff, and final stages</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stages.map((stage) => (
                        <TableRow 
                          key={stage.id}
                          className="cursor-pointer"
                          onClick={() => setSelectedStageId(stage.id)}
                        >
                          <TableCell className="font-medium">{stage.name}</TableCell>
                          <TableCell>{getStageTypeBadge(stage.type)}</TableCell>
                          <TableCell>{formatDate(stage.startDate)}</TableCell>
                          <TableCell>{formatDate(stage.endDate)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
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
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-1">No stages found</h3>
                    <p className="text-gray-500">Create your first stage for this tournament</p>
                  </div>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Create Stage
                  </Button>
                </CardContent>
              </Card>
            )
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-1">Select a Tournament</h3>
                  <p className="text-gray-500">Please select a tournament to view and manage its stages</p>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Stage</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedStage?.name}</span>?
              This action cannot be undone and will also delete all associated matches.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}