"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMatches } from "@/hooks/use-matches";
import { useAuth } from "@/hooks/use-auth";
import { MatchStatus, MatchType } from "@/lib/types";
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
import { useUpdateMatch } from "@/hooks/use-matches";
import { MatchTable } from "@/components/MatchTable";
import { ColumnDef } from "@tanstack/react-table";
import { MatchService } from "@/lib/match-service";
import { useQueryClient } from "@tanstack/react-query";

export default function MatchesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: matches, isLoading: matchesLoading, error: matchesError } = useMatches();
  const updateMatchMutation = useUpdateMatch();
  const queryClient = useQueryClient();

  // State for sorting
  const [sortField, setSortField] = useState<string>('tournamentName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // State for filter
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Add state for match scores map
  const [matchScoresMap, setMatchScoresMap] = useState<Record<string, { redTotalScore: number, blueTotalScore: number }>>({});

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

  // Table columns for react-table
  const columns = useMemo<ColumnDef<any, any>[]>(() => [
    {
      accessorKey: 'stage.tournament.name',
      header: 'Tournament',
      cell: info => info.row.original.stage.tournament.name,
      enableSorting: true,
    },
    {
      accessorKey: 'stage.name',
      header: 'Stage',
      cell: info => info.row.original.stage.name,
      enableSorting: true,
    },
    {
      accessorKey: 'matchNumber',
      header: 'Match',
      cell: info => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: 'roundNumber',
      header: 'Round',
      cell: info => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => getStatusBadge(info.getValue()),
      enableSorting: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true;
        return row.getValue(columnId) === filterValue;
      },
    },
    {
      accessorKey: 'scheduledTime',
      header: 'Scheduled Time',
      cell: info => formatDate(info.getValue()),
      enableSorting: true,
    },
    {
      id: 'teams',
      header: 'Teams',
      cell: info => (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs font-semibold text-red-400">Red</div>
            {info.row.original.alliances.find((a: any) => a.color === 'RED')?.teamAlliances.map((ta: any) => (
              <div key={ta.id} className="text-xs text-gray-200">{ta.team.name}</div>
            ))}
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-400">Blue</div>
            {info.row.original.alliances.find((a: any) => a.color === 'BLUE')?.teamAlliances.map((ta: any) => (
              <div key={ta.id} className="text-xs text-gray-200">{ta.team.name}</div>
            ))}
          </div>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: 'scores',
      header: 'Scores',
      cell: info => (
        info.row.original.status === "COMPLETED" ? (
          <div className="flex items-center space-x-1">
            <span className="text-red-400 font-medium">
              {matchScoresMap[info.row.original.id]?.redTotalScore ?? 0}
            </span>
            <span className="text-gray-500">-</span>
            <span className="text-blue-400 font-medium">
              {matchScoresMap[info.row.original.id]?.blueTotalScore ?? 0}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">-</span>
        )
      ),
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-primary-700"
          onClick={e => {
            e.stopPropagation();
            handleMatchClick(info.row.original.id);
          }}
        >
          View Details
        </Button>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'matchType',
      header: 'Match Type',
      cell: info => (
        user?.role === 'ADMIN' ? (
          <Select
            value={info.row.original.matchType || MatchType.FULL}
            onValueChange={val => {
              if (val !== info.row.original.matchType) {
                updateMatchMutation.mutate({ matchId: info.row.original.id, data: { matchType: val } });
              }
            }}
            disabled={updateMatchMutation.isPending}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectGroup>
                <SelectLabel>Match Type</SelectLabel>
                <SelectItem value={MatchType.FULL}>Full</SelectItem>
                <SelectItem value={MatchType.TELEOP_ENDGAME}>Teleop + Endgame</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <span>{info.row.original.matchType || MatchType.FULL}</span>
        )
      ),
      enableSorting: true,
    },
  ], [user, updateMatchMutation, matchScoresMap]);

  // Filter UI for status
  const filterUI = (
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
  );

  // Prepare table data with status filter
  const filteredMatches = useMemo(() => {
    if (!matches) return [];
    return statusFilter === "all"
      ? matches
      : matches.filter(match => match.status === statusFilter);
  }, [matches, statusFilter]);

  // Fetch match scores for all matches, using cache if available
  useEffect(() => {
    async function fetchScores() {
      if (!matches || matches.length === 0) {
        setMatchScoresMap({});
        return;
      }
      const scores: Record<string, { redTotalScore: number, blueTotalScore: number }> = {};
      const toFetch: string[] = [];
      // Try to get scores from cache first
      matches.forEach((match) => {
        const cached = queryClient.getQueryData([
          "matchScores",
          "byMatch",
          match.id
        ]) as { redTotalScore?: number; blueTotalScore?: number } | undefined;
        if (cached && cached.redTotalScore !== undefined && cached.blueTotalScore !== undefined) {
          scores[match.id] = {
            redTotalScore: cached.redTotalScore,
            blueTotalScore: cached.blueTotalScore,
          };
        } else {
          toFetch.push(match.id);
        }
      });
      // Only fetch from server for those not in cache
      await Promise.all(
        toFetch.map(async (matchId) => {
          try {
            const score = await MatchService.getMatchScores(matchId);
            if (score) {
              scores[matchId] = {
                redTotalScore: score.redTotalScore,
                blueTotalScore: score.blueTotalScore,
              };
              // Prefill cache for future use
              queryClient.setQueryData([
                "matchScores",
                "byMatch",
                matchId
              ], score);
            }
          } catch (e) {
            // ignore errors for missing scores
          }
        })
      );
      setMatchScoresMap(scores);
    }
    fetchScores();
  }, [matches, queryClient]);

  // Loading and error states remain unchanged
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
        {filterUI}
      </div>
      <MatchTable
        data={filteredMatches}
        columns={columns}
        filterUI={null}
        loading={matchesLoading}
        emptyMessage={matches && matches.length === 0 ? "There are no matches in the system yet." : undefined}
      />
    </div>
  );
}