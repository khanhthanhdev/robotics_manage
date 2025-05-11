"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMatches } from "@/hooks/use-matches";
import { useAuth } from "@/hooks/use-auth";
import { MatchStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MatchesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: matches, isLoading: matchesLoading, error: matchesError } = useMatches();

  // State for sorting
  const [sortField, setSortField] = useState<string>('tournamentName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // State for filter
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Handle sort click
  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort and filter matches
  const sortedMatches = useMemo(() => {
    if (!matches) return [];
    
    // First, apply filters
    const filteredMatches = statusFilter === "all" 
      ? matches 
      : matches.filter(match => match.status === statusFilter);
    
    // Then, sort the filtered matches
    return [...filteredMatches].sort((a, b) => {
      let valueA, valueB;

      // Extract the values based on the sort field
      switch (sortField) {
        case 'tournamentName':
          valueA = a.stage.tournament.name.toLowerCase();
          valueB = b.stage.tournament.name.toLowerCase();
          break;
        case 'stageName':
          valueA = a.stage.name.toLowerCase();
          valueB = b.stage.name.toLowerCase();
          break;
        case 'matchNumber':
          valueA = a.matchNumber;
          valueB = b.matchNumber;
          break;
        case 'roundNumber':
          valueA = a.roundNumber;
          valueB = b.roundNumber;
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'scheduledTime':
          valueA = a.scheduledTime ? new Date(a.scheduledTime).getTime() : 0;
          valueB = b.scheduledTime ? new Date(b.scheduledTime).getTime() : 0;
          break;
        default:
          valueA = a.matchNumber;
          valueB = b.matchNumber;
      }
      
      // Sort based on direction
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  }, [matches, sortField, sortDirection, statusFilter]);

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    try {
      return format(new Date(dateString), "PPp");
    } catch (e) {
      return dateString;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case MatchStatus.PENDING:
        return <Badge variant="outline">Pending</Badge>;
      case MatchStatus.IN_PROGRESS:
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case MatchStatus.COMPLETED:
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Navigate to match details
  const handleMatchClick = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };

  // Loading state
  if (matchesLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Matches</h1>
        </div>
        <Card className="border border-gray-800 bg-gray-900">
          <CardContent className="flex justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Loading matches...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (matchesError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Matches</h1>
        </div>
        <Card className="border border-gray-800 bg-gray-900">
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Matches</h3>
              <p className="text-gray-400">There was a problem loading the match data. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-1">Matches</h1>
          <p className="text-base text-gray-400">View and manage all competition matches</p>
        </div>
        <div className="w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all" className="bg-gray-900 text-gray-100 hover:bg-gray-800">All Statuses</SelectItem>
                <SelectItem value={MatchStatus.PENDING} className="bg-gray-900 text-gray-100 hover:bg-gray-800">Pending</SelectItem>
                <SelectItem value={MatchStatus.IN_PROGRESS} className="bg-gray-900 text-gray-100 hover:bg-gray-800">In Progress</SelectItem>
                <SelectItem value={MatchStatus.COMPLETED} className="bg-gray-900 text-gray-100 hover:bg-gray-800">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table of matches */}
      {sortedMatches.length > 0 ? (
        <Card className="border border-gray-800 bg-gray-900">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 border-b border-gray-700">
                  <TableHead className="text-gray-300 font-semibold text-sm cursor-pointer" onClick={() => handleSortClick('tournamentName')}>Tournament{sortField === 'tournamentName' && (<span className="ml-2 inline-block">{sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>)}</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm cursor-pointer" onClick={() => handleSortClick('stageName')}>Stage{sortField === 'stageName' && (<span className="ml-2 inline-block">{sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>)}</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm cursor-pointer" onClick={() => handleSortClick('matchNumber')}>Match{sortField === 'matchNumber' && (<span className="ml-2 inline-block">{sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>)}</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm cursor-pointer" onClick={() => handleSortClick('roundNumber')}>Round{sortField === 'roundNumber' && (<span className="ml-2 inline-block">{sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>)}</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm cursor-pointer" onClick={() => handleSortClick('status')}>Status{sortField === 'status' && (<span className="ml-2 inline-block">{sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>)}</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm cursor-pointer" onClick={() => handleSortClick('scheduledTime')}>Scheduled Time{sortField === 'scheduledTime' && (<span className="ml-2 inline-block">{sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>)}</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Teams</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Scores</TableHead>
                  <TableHead className="text-gray-300 font-semibold text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMatches.map((match) => (
                  <TableRow 
                    key={match.id} 
                    className="hover:bg-gray-800/70 cursor-pointer transition"
                    onClick={() => handleMatchClick(match.id)}
                  >
                    <TableCell className="font-medium text-gray-100">{match.stage.tournament.name}</TableCell>
                    <TableCell className="text-gray-300">{match.stage.name}</TableCell>
                    <TableCell className="text-gray-300">{match.matchNumber}</TableCell>
                    <TableCell className="text-gray-300">{match.roundNumber}</TableCell>
                    <TableCell>{getStatusBadge(match.status)}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(match.scheduledTime)}</TableCell>
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
                      {match.status === "COMPLETED" ? (
                        <div className="flex items-center space-x-1">
                          <span className="text-red-400 font-medium">
                            {match.alliances.find(a => a.color === 'RED')?.score || 0}
                          </span>
                          <span className="text-gray-500">-</span>
                          <span className="text-blue-400 font-medium">
                            {match.alliances.find(a => a.color === 'BLUE')?.score || 0}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-primary-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMatchClick(match.id);
                        }}
                      >
                        View Details
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
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">No Matches Found</h3>
              <p className="text-gray-400">
                {statusFilter !== "all" 
                  ? `There are no matches with status "${statusFilter}". Try changing the filter.` 
                  : "There are no matches in the system yet."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}