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
import { useQueryClient } from "@tanstack/react-query";

export default function TournamentsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: tournaments, isLoading: tournamentsLoading, error: tournamentsError } = useTournaments();
  const deleteMutation = useDeleteTournament();
  const queryClient = useQueryClient();
  
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

  // Efficiently load tournaments using cache
  const fetchTournaments = async () => {
    const cached = queryClient.getQueryData<any[]>(["tournaments"]);
    if (cached && Array.isArray(cached)) {
      return cached;
    }
    // fallback to hook's fetch (already handled by useTournaments)
    return null;
  };

  // Handler for confirming delete
  const handleConfirmDelete = async () => {
    if (!selectedTournament) return;
    
    try {
      await deleteMutation.mutateAsync(selectedTournament.id);
      setIsDeleteDialogOpen(false);
      setSelectedTournament(null);
      // Invalidate cache so next fetch gets fresh data
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-1">Tournaments</h1>
          <p className="text-base text-gray-400">Manage all robotics tournaments</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
        >
          <PlusIcon size={18} />
          Add Tournament
        </Button>
      </div>

      {tournamentsError ? (
        <Alert variant="destructive" className="mb-6 border-l-2 border-red-600 bg-red-900/30">
          <AlertTitle className="font-semibold text-red-300">Error</AlertTitle>
          <AlertDescription className="text-red-400">
            Failed to load tournaments. Please try again later.
          </AlertDescription>
        </Alert>
      ) : null}

      {tournamentsLoading ? (
        <Card className="shadow-none border border-gray-800 bg-gray-900">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-700 mb-4"></div>
            <p className="text-base text-gray-400">Loading tournaments...</p>
          </CardContent>
        </Card>
      ) : tournaments && tournaments.length > 0 ? (
        <Card className="shadow-none border border-gray-800 bg-gray-900">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 border-b border-gray-700">
                  <TableHead className="text-gray-300 font-semibold text-sm">Name</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Description</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Start Date</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">End Date</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Fields</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Admin</TableHead>
                  <TableHead className="text-right text-gray-300 font-semibold text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tournaments.map((tournament) => (
                  <TableRow key={tournament.id} className="hover:bg-gray-800/70 transition">
                    <TableCell className="font-medium text-gray-100 whitespace-nowrap">{tournament.name}</TableCell>
                    <TableCell className="text-gray-400 max-w-xs truncate" title={tournament.description}>{tournament.description}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(tournament.startDate)}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(tournament.endDate)}</TableCell>
                    <TableCell className="text-gray-300 text-center">{tournament.numberOfFields ?? 1}</TableCell>
                    <TableCell className="text-gray-300">{tournament.admin?.username || '-'}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-primary-700"
                        onClick={() => handleEditTournament(tournament)}
                      >
                        <PencilIcon size={16} />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-700 text-red-400 hover:bg-red-900/30 hover:text-red-300 focus:ring-2 focus:ring-red-700"
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
        <Card className="shadow-none border border-gray-800 bg-gray-900">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-1">No tournaments found</h3>
              <p className="text-gray-400 text-base">Create your first tournament to get started</p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary-600 text-white font-medium rounded-md px-5 py-2.5 shadow-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none transition">
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