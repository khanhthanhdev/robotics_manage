"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMatches, MatchResponse } from "@/hooks/use-matches";
import { MatchStatus } from "@/lib/types";

export default function MatchesPage() {
  const { data: matches, isLoading, error } = useMatches();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Format team names for an alliance
  const formatTeams = (alliance: MatchResponse["alliances"][0]) => {
    if (!alliance.teamAlliances || alliance.teamAlliances.length === 0) {
      return "No teams";
    }

    return alliance.teamAlliances
      .sort((a, b) => a.stationPosition - b.stationPosition)
      .map((ta) => ta.team?.name || `Team ${ta.teamId.substring(0, 6)}`)
      .join(", ");
  };

  // Status badge color mapping
  const getStatusBadge = (status: string) => {
    switch (status) {
      case MatchStatus.PENDING:
      case "SCHEDULED":
        return <Badge variant="outline">Scheduled</Badge>;
      case MatchStatus.IN_PROGRESS:
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case MatchStatus.COMPLETED:
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Apply filters to matches
  const filteredMatches = useMemo(() => {
    if (!matches) return [];
    
    return matches.filter((match) => {
      const matchesSearchTerm = searchTerm
        ? match.matchNumber.toString().includes(searchTerm) ||
          match.stage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.stage.tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      const matchesStatus = statusFilter
        ? match.status === statusFilter
        : true;
      
      return matchesSearchTerm && matchesStatus;
    });
  }, [matches, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load match data. Please try again later.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Matches</h1>
          <Link href="/match-control">
            <Button>Match Control</Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/40">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>All Matches</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Input
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-[200px] md:w-[250px]"
                />
                <Select
                  value={statusFilter || "all"}
                  onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value={MatchStatus.PENDING}>Pending</SelectItem>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    <SelectItem value={MatchStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={MatchStatus.COMPLETED}>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match #</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Tournament</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Red Alliance</TableHead>
                    <TableHead>Blue Alliance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMatches.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No matches found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMatches.map((match) => {
                      // Find red and blue alliances
                      const redAlliance = match.alliances.find(a => a.color === "RED");
                      const blueAlliance = match.alliances.find(a => a.color === "BLUE");

                      return (
                        <TableRow key={match.id}>
                          <TableCell className="font-medium">
                            {match.matchNumber}
                          </TableCell>
                          <TableCell>{match.roundNumber}</TableCell>
                          <TableCell>
                            <Link href={`/tournaments/${match.stage.tournament.id}`} className="text-blue-600 hover:underline">
                              {match.stage.tournament.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/stages/${match.stage.id}`} className="text-blue-600 hover:underline">
                              {match.stage.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {redAlliance ? formatTeams(redAlliance) : "No red alliance"}
                          </TableCell>
                          <TableCell>
                            {blueAlliance ? formatTeams(blueAlliance) : "No blue alliance"}
                          </TableCell>
                          <TableCell>{getStatusBadge(match.status)}</TableCell>
                          <TableCell>
                            {match.status === MatchStatus.COMPLETED ? (
                              <span className="font-medium">
                                {redAlliance?.score || 0} - {blueAlliance?.score || 0}
                              </span>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/matches/${match.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}