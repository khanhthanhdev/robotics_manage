"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMatch } from "@/hooks/use-matches";
import { cn } from "@/lib/utils";
import { MatchStatus } from "@/lib/types";
import { format, parseISO } from "date-fns";

// Components
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  Clock,
  Calendar,
  Trophy,
  ArrowLeft,
  Users,
  BarChart3,
} from "lucide-react";

export default function MatchDetailsPage() {
  const { id } = useParams();
  const { data: match, isLoading, error } = useMatch(id as string);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load match data. Please try again later.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => window.location.reload()}>Retry</Button>
              <Button variant="outline" asChild>
                <Link href="/matches">Back to Matches</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Find red and blue alliances
  const redAlliance = match.alliances.find((a) => a.color === "RED");
  const blueAlliance = match.alliances.find((a) => a.color === "BLUE");

  // Format time with date-fns
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    try {
      return format(parseISO(dateString), "MMM d, yyyy • h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };

  // Format team names
  const formatTeams = (alliance: typeof match.alliances[0]) => {
    if (!alliance?.teamAlliances || alliance.teamAlliances.length === 0) {
      return "No teams";
    }

    return alliance.teamAlliances
      .sort((a, b) => a.stationPosition - b.stationPosition)
      .map((ta) => ta.team);
  };

  // Get status badge with appropriate color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case MatchStatus.PENDING:
      case MatchStatus.PENDING:
        return <Badge variant="outline">Scheduled</Badge>;
      case MatchStatus.IN_PROGRESS:
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">In Progress</Badge>;
      case MatchStatus.COMPLETED:
        return <Badge className="bg-green-500 text-white hover:bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Prepare data for pie chart
  const redTeams = formatTeams(redAlliance || { 
    id: '', color: 'RED', score: 0, matchId: '', 
    createdAt: '', updatedAt: '', teamAlliances: [], allianceScoring: null 
  });
  const blueTeams = formatTeams(blueAlliance || { 
    id: '', color: 'BLUE', score: 0, matchId: '', 
    createdAt: '', updatedAt: '', teamAlliances: [], allianceScoring: null 
  });
  
  // Score data for pie chart
  const scoreData = [
    { name: "Red", value: redAlliance?.score || 0, color: "#ef4444" },
    { name: "Blue", value: blueAlliance?.score || 0, color: "#3b82f6" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href="/matches">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">
            Match #{match.matchNumber}
          </h1>
          {getStatusBadge(match.status)}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/stages/${match.stage.id}`}>
              View Stage
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/tournaments/${match.stage.tournament.id}`}>
              View Tournament
            </Link>
          </Button>
          {match.status === MatchStatus.PENDING && (
            <Button>
              Start Match
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Match Information */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="mr-2 size-5 text-muted-foreground" />
                      Match Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tournament</p>
                      <p className="font-medium">{match.stage.tournament.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stage</p>
                      <p className="font-medium">{match.stage.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Round Number</p>
                      <p className="font-medium">{match.roundNumber || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stage Type</p>
                      <p className="font-medium">{match.stage.type}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Clock className="mr-2 size-5 text-muted-foreground" />
                      Time Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Scheduled Time</p>
                      <p className="font-medium">{formatDateTime(match.scheduledTime)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p className="font-medium">{formatDateTime(match.startTime)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Time</p>
                      <p className="font-medium">{formatDateTime(match.endTime)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {match.duration ? `${match.duration} seconds` : "Not completed"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {match.status === MatchStatus.COMPLETED && (
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <Trophy className="mr-2 size-5 text-muted-foreground" />
                        Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="flex items-center space-x-4">
                            <div 
                              className="size-4 rounded-full" 
                              style={{ backgroundColor: "#ef4444" }}
                            />
                            <h3 className="text-xl">Red Alliance: {redAlliance?.score || 0} points</h3>
                          </div>
                          {redAlliance?.teamAlliances.map((ta) => (
                            <div key={ta.id} className="text-center">
                              <p>{ta.team.name}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="flex items-center space-x-4">
                            <div 
                              className="size-4 rounded-full" 
                              style={{ backgroundColor: "#3b82f6" }}
                            />
                            <h3 className="text-xl">Blue Alliance: {blueAlliance?.score || 0} points</h3>
                          </div>
                          {blueAlliance?.teamAlliances.map((ta) => (
                            <div key={ta.id} className="text-center">
                              <p>{ta.team.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-center">
                        {match.winningAlliance && (
                          <div className="text-center">
                            <p className="text-lg font-medium">Winner</p>
                            <Badge 
                              className={cn(
                                "mt-1 text-white",
                                match.winningAlliance === "RED" ? "bg-red-500" : "bg-blue-500"
                              )}
                            >
                              {match.winningAlliance} Alliance
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="h-[200px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={scoreData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              dataKey="value"
                              paddingAngle={5}
                              label={({ name, value }) => `${name}: ${value}`}
                            >
                              {scoreData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="teams" className="mt-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className={cn(
                  "border-t-4",
                  redAlliance ? "border-t-red-500" : "border-t-gray-300"
                )}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Users className="mr-2 size-5 text-muted-foreground" />
                      Red Alliance Teams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!redAlliance || redAlliance.teamAlliances.length === 0 ? (
                      <p className="py-4 text-center text-muted-foreground">No teams assigned</p>
                    ) : (
                      <div className="space-y-4">
                        {redAlliance.teamAlliances
                          .sort((a, b) => a.stationPosition - b.stationPosition)
                          .map((ta) => (
                            <div key={ta.id} className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <p className="font-medium">{ta.team.name}</p>
                                <p className="text-sm text-muted-foreground">#{ta.team.teamNumber}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline">Station {ta.stationPosition}</Badge>
                                {ta.isSurrogate && (
                                  <Badge variant="secondary" className="ml-2">Surrogate</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className={cn(
                  "border-t-4",
                  blueAlliance ? "border-t-blue-500" : "border-t-gray-300"
                )}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Users className="mr-2 size-5 text-muted-foreground" />
                      Blue Alliance Teams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!blueAlliance || blueAlliance.teamAlliances.length === 0 ? (
                      <p className="py-4 text-center text-muted-foreground">No teams assigned</p>
                    ) : (
                      <div className="space-y-4">
                        {blueAlliance.teamAlliances
                          .sort((a, b) => a.stationPosition - b.stationPosition)
                          .map((ta) => (
                            <div key={ta.id} className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <p className="font-medium">{ta.team.name}</p>
                                <p className="text-sm text-muted-foreground">#{ta.team.teamNumber}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline">Station {ta.stationPosition}</Badge>
                                {ta.isSurrogate && (
                                  <Badge variant="secondary" className="ml-2">Surrogate</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Display additional team stats if available */}
                {(redAlliance?.allianceScoring || blueAlliance?.allianceScoring) && (
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <BarChart3 className="mr-2 size-5 text-muted-foreground" />
                        Team Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* You can add detailed team performance stats here if available */}
                      <p className="text-center text-muted-foreground">
                        Detailed team performance data is available but not shown in this simple version.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar with Match Status */}
        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Match Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    {getStatusBadge(match.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tournament:</span>
                    <span className="font-medium">{match.stage.tournament.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stage:</span>
                    <span className="font-medium">{match.stage.name}</span>
                  </div>
                  {match.scheduledTime && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scheduled:</span>
                      <span className="font-medium">
                        {format(parseISO(match.scheduledTime), "MMM d, h:mm a")}
                      </span>
                    </div>
                  )}
                </div>
                
                {match.status === MatchStatus.COMPLETED && match.winningAlliance && (
                  <div className="mt-4 rounded-lg bg-muted p-3 text-center">
                    <p className="text-sm text-muted-foreground">MATCH WINNER</p>
                    <p className="text-xl font-bold">
                      {match.winningAlliance} Alliance
                    </p>
                    <div className="mt-2 grid grid-cols-2">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">RED</p>
                        <p className="text-xl font-medium text-red-500">
                          {redAlliance?.score || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">BLUE</p>
                        <p className="text-xl font-medium text-blue-500">
                          {blueAlliance?.score || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {match.status !== MatchStatus.COMPLETED && (
                  <div className="mt-4">
                    <Button className="w-full">
                      {match.status === MatchStatus.PENDING
                        ? "Start Match"
                        : "End Match"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Related Matches Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tournament Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">
                    {match.stage.tournament.description || "No description available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tournament Dates</p>
                  <p className="font-medium">
                    {format(parseISO(match.stage.tournament.startDate), "MMM d")} - {format(parseISO(match.stage.tournament.endDate), "MMM d, yyyy")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}