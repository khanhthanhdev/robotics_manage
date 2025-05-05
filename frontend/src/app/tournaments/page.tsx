"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { useTournaments, useDeleteTournament } from "@/hooks/use-tournaments";
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
import { toast } from "sonner";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import TournamentDialog from "./tournament-dialog";

export default function TournamentsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: tournaments, isLoading: tournamentsLoading, error: tournamentsError } = useTournaments();
  const deleteMutation = useDeleteTournament();
  
  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);

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
  const handleEditTournament = (tournament: any) => {
    setSelectedTournament(tournament);
    setIsEditDialogOpen(true);
  };

  // Handler for opening delete dialog
  const handleDeleteClick = (tournament: any) => {
    setSelectedTournament(tournament);
    setIsDeleteDialogOpen(true);
  };

  // Handler for confirming delete
  const handleConfirmDelete = async () => {
    if (!selectedTournament) return;
    
    try {
      await deleteMutation.mutateAsync(selectedTournament.id);
      setIsDeleteDialogOpen(false);
      setSelectedTournament(null);
    } catch (error) {
      console.error("Failed to delete tournament:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tournaments</h1>
          <p className="text-gray-500">Manage all robotics tournaments</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusIcon size={16} />
          Add Tournament
        </Button>
      </div>

      {tournamentsError ? (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load tournaments. Please try again later.
          </AlertDescription>
        </Alert>
      ) : null}

      {tournamentsLoading ? (
        <Card>
          <CardContent className="flex justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">Loading tournaments...</p>
            </div>
          </CardContent>
        </Card>
      ) : tournaments && tournaments.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tournaments.map((tournament) => (
                  <TableRow key={tournament.id}>
                    <TableCell className="font-medium">{tournament.name}</TableCell>
                    <TableCell>{tournament.description}</TableCell>
                    <TableCell>{formatDate(tournament.startDate)}</TableCell>
                    <TableCell>{formatDate(tournament.endDate)}</TableCell>
                    <TableCell>{tournament.admin?.username || '-'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTournament(tournament)}
                      >
                        <PencilIcon size={16} />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(tournament)}
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
              <h3 className="text-xl font-semibold mb-1">No tournaments found</h3>
              <p className="text-gray-500">Create your first tournament to get started</p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create Tournament
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Tournament Dialog */}
      <TournamentDialog 
        isOpen={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        mode="create"
      />

      {/* Edit Tournament Dialog */}
      {selectedTournament && (
        <TournamentDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedTournament(null);
          }}
          mode="edit"
          tournament={selectedTournament}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tournament</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedTournament?.name}</span>?
              This action cannot be undone and will also delete all associated stages, matches, and team assignments.
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