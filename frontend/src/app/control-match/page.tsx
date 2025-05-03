'use client';

import React, { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchMatches, Match } from '@/lib/match-service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Client component using WebSockets
export default function ControlMatchPage() {
  // Get tournament ID from query params or use a default for demo
  const tournamentId =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('tournamentId') ||
        'demo-tournament'
      : 'demo-tournament';

  // Connect to WebSocket with the tournament ID
  const {
    isConnected,
    currentTournament,
    changeDisplayMode,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    subscribe
  } = useWebSocket({ tournamentId });

  // UI state for display controls
  const [displayMode, setDisplayMode] = React.useState<string>('match');
  const [selectedMatchId, setSelectedMatchId] = React.useState<string>('');
  const [showTimer, setShowTimer] = React.useState<boolean>(true);
  const [showScores, setShowScores] = React.useState<boolean>(true);
  const [showTeams, setShowTeams] = React.useState<boolean>(true);
  const [announcementMessage, setAnnouncementMessage] =
    React.useState<string>('');

  // UI state for timer controls
  const [timerDuration, setTimerDuration] = React.useState<number>(150000); // 2:30 in ms
  const [matchPeriod, setMatchPeriod] = React.useState<string>('auto');

  // Timer display state for live clock
  const [timerRemaining, setTimerRemaining] = useState<number>(timerDuration);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);

  // Format timer as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Sync timerRemaining and timerIsRunning with timerDuration and timer state
  useEffect(() => {
    setTimerRemaining(timerDuration);
  }, [timerDuration]);

  // Listen for timer updates from WebSocket
  useEffect(() => {
    // Handler for timer updates from WebSocket
    const handleTimerUpdate = (data: any) => {
      console.log('Timer update received:', data);
      
      // Update local timer state from the websocket data
      if (data) {
        setTimerRemaining(data.remaining || 0);
        setTimerIsRunning(data.isRunning || false);
      }
    };
    
    // Subscribe to timer updates using the subscribe method from useWebSocket
    const unsubscribe = subscribe('timer_update', handleTimerUpdate);
    
    // Cleanup subscription when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe]);

  // UI state for score controls
  const [redAutoScore, setRedAutoScore] = React.useState<number>(0);
  const [redDriveScore, setRedDriveScore] = React.useState<number>(0);
  const [blueAutoScore, setBlueAutoScore] = React.useState<number>(0);
  const [blueDriveScore, setBlueDriveScore] = React.useState<number>(0);

  // Enhanced scoring states
  const [redGameElements, setRedGameElements] = useState<Array<{element: string, count: number, pointsEach: number, totalPoints: number, operation: string}>>([]);
  const [blueGameElements, setBlueGameElements] = useState<Array<{element: string, count: number, pointsEach: number, totalPoints: number, operation: string}>>([]);
  const [redTeamCount, setRedTeamCount] = useState<number>(0);
  const [blueTeamCount, setBlueTeamCount] = useState<number>(0);
  const [redMultiplier, setRedMultiplier] = useState<number>(1.0);
  const [blueMultiplier, setBlueMultiplier] = useState<number>(1.0);
  const [scoreDetails, setScoreDetails] = useState<any>(null);
  const [isAddingRedElement, setIsAddingRedElement] = useState<boolean>(false);
  const [isAddingBlueElement, setIsAddingBlueElement] = useState<boolean>(false);

  // New element state
  const [newElement, setNewElement] = useState<{
    element: string,
    count: number,
    pointsEach: number,
    operation: string
  }>({
    element: '',
    count: 1,
    pointsEach: 1,
    operation: 'multiply'
  });

  // Add states for total scores
  const [redTotalScore, setRedTotalScore] = useState<number>(0);
  const [blueTotalScore, setBlueTotalScore] = useState<number>(0);

  // State for matches list
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('matches');

  // Fetch matches when the component mounts or tournamentId changes
  useEffect(() => {
    async function loadMatches() {
      setIsLoading(true);
      try {
        const matchesList = await fetchMatches(tournamentId);
        setMatches(matchesList);
      } catch (error) {
        console.error('Failed to load matches:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMatches();
  }, [tournamentId]);

  // Handle selecting a match
  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    setSelectedMatchId(match.id);
    
    // Automatically update display settings to show the selected match
    changeDisplayMode({
      displayMode: 'match',
      matchId: match.id,
      showTimer,
      showScores,
      showTeams,
      tournamentId,
    });
  };

  // Handle display mode change
  const handleDisplayModeChange = () => {
    changeDisplayMode({
      displayMode: displayMode as any,
      matchId: selectedMatchId || null,
      showTimer,
      showScores,
      showTeams,
      tournamentId: currentTournament!,
    });
  };

  // Handle timer controls
  const handleStartTimer = () => {
    // If timer is already running, do nothing
    if (timerIsRunning) return;
    // If timerRemaining is 0, reset to duration
    const startTime = timerRemaining > 0 ? timerRemaining : timerDuration;
    startTimer({
      duration: timerDuration,
      remaining: startTime,
    });
    setTimerIsRunning(true);
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: 'IN_PROGRESS',
      currentPeriod: matchPeriod as any,
    });
  };

  const handlePauseTimer = () => {
    // Only pause, do not reset
    pauseTimer({
      duration: timerDuration,
      remaining: timerRemaining,
      isRunning: false,
    });
    setTimerIsRunning(false);
  };

  const handleResetTimer = () => {
    resetTimer({
      duration: timerDuration,
      remaining: timerDuration,
      isRunning: false,
    });
    setTimerRemaining(timerDuration);
    setTimerIsRunning(false);
    sendMatchStateChange({
      matchId: selectedMatchId,
      status: 'PENDING',
      currentPeriod: null,
    });
  };

  // Handle score updates
  const handleUpdateScores = () => {
    sendScoreUpdate({
      matchId: selectedMatchId,
      redAutoScore,
      redDriveScore,
      redTotalScore,
      blueAutoScore,
      blueDriveScore,
      blueTotalScore,
      // Additional details for the backend
      redGameElements,
      blueGameElements,
      redTeamCount,
      redMultiplier,
      blueTeamCount,
      blueMultiplier,
      scoreDetails
    });
  };

  // Handle sending an announcement
  const handleSendAnnouncement = () => {
    if (announcementMessage.trim()) {
      sendAnnouncement(announcementMessage.trim());

      // Switch display mode to announcement
      changeDisplayMode({
        displayMode: 'announcement',
        message: announcementMessage.trim(),
        tournamentId: currentTournament!,
      });

      // Clear input after sending
      setAnnouncementMessage('');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'IN_PROGRESS':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Update total scores with multipliers and game elements
  useEffect(() => {
    if (selectedMatchId) {
      const redElementsTotal = redGameElements.reduce((sum, item) => sum + item.totalPoints, 0);
      const blueElementsTotal = blueGameElements.reduce((sum, item) => sum + item.totalPoints, 0);
      
      const newRedTotalScore = Math.round((redAutoScore + redDriveScore + redElementsTotal) * redMultiplier);
      const newBlueTotalScore = Math.round((blueAutoScore + blueDriveScore + blueElementsTotal) * blueMultiplier);
      
      // Only update state if needed to prevent render loops
      if (redTotalScore !== newRedTotalScore) {
        setRedTotalScore(newRedTotalScore);
      }
      
      if (blueTotalScore !== newBlueTotalScore) {
        setBlueTotalScore(newBlueTotalScore);
      }
    }
  }, [redAutoScore, redDriveScore, blueAutoScore, blueDriveScore, redGameElements, blueGameElements, redMultiplier, blueMultiplier]);

  // Handle multiplier selection based on team count
  const updateRedMultiplier = (count: number) => {
    setRedTeamCount(count);
    switch(count) {
      case 1: setRedMultiplier(1.25); break;
      case 2: setRedMultiplier(1.5); break;
      case 3: setRedMultiplier(1.75); break;
      case 4: setRedMultiplier(2.0); break;
      default: setRedMultiplier(1.0);
    }
  };
  
  const updateBlueMultiplier = (count: number) => {
    setBlueTeamCount(count);
    switch(count) {
      case 1: setBlueMultiplier(1.25); break;
      case 2: setBlueMultiplier(1.5); break;
      case 3: setBlueMultiplier(1.75); break;
      case 4: setBlueMultiplier(2.0); break;
      default: setBlueMultiplier(1.0);
    }
  };

  // Fetch match score details with retry logic
  const fetchMatchScores = async (matchId: string, retryCount = 0) => {
    try {
      const authToken = localStorage.getItem('auth-token');
      // Make sure we're using the correct URL format according to documentation:
      // GET /match-scores/match/:matchId
      const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
      const response = await fetch(`${baseUrl}/match-scores/match/${matchId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Fetching match scores from API:', response.status, response.statusText);
      
      // If match scores don't exist yet, create them
      if (response.status === 404) {
        console.log('Match scores not found. Creating initial match scores...');
        try {
          // Create initial match scores with all zeroes
          const createResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/match-scores`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              matchId: matchId,
              redAutoScore: 0,
              redDriveScore: 0,
              redTotalScore: 0,
              blueAutoScore: 0,
              blueDriveScore: 0,
              blueTotalScore: 0,
              redTeamCount: 0,
              blueTeamCount: 0,
              redMultiplier: 1.0,
              blueMultiplier: 1.0,
              redGameElements: [],
              blueGameElements: [],
              scoreDetails: {}
            })
          });
          
          if (!createResponse.ok) {
            const errorText = await createResponse.text();
            console.error('Failed to create match scores:', errorText);
            
            // Set default values if creation fails
            updateScoreStates({
              redAutoScore: 0,
              redDriveScore: 0,
              blueAutoScore: 0,
              blueDriveScore: 0,
              redTotalScore: 0,
              blueTotalScore: 0,
              redGameElements: [],
              blueGameElements: [],
              redTeamCount: 0,
              blueTeamCount: 0,
              redMultiplier: 1.0,
              blueMultiplier: 1.0,
              scoreDetails: {}
            });
            return;
          }
          
          const scoreData = await createResponse.json();
          updateScoreStates(scoreData);
          
          // Try to fetch the newly created scores to confirm
          setTimeout(async () => {
            await fetchMatchScores(matchId);
          }, 1000);
        } catch (createError) {
          console.error('Error creating match scores:', createError);
          // Set default values on error
          updateScoreStates({
            redAutoScore: 0,
            redDriveScore: 0,
            blueAutoScore: 0,
            blueDriveScore: 0,
            redTotalScore: 0,
            blueTotalScore: 0,
            redGameElements: [],
            blueGameElements: [],
            redTeamCount: 0,
            blueTeamCount: 0,
            redMultiplier: 1.0,
            blueMultiplier: 1.0,
            scoreDetails: {}
          });
        }
        return;
      }
      
      if (!response.ok) {
        console.error('Failed to fetch match scores:', await response.text());
        return;
      }
      
      const scoreData = await response.json();
      updateScoreStates(scoreData);
    } catch (error) {
      console.error('Failed to fetch match score details:', error);
      
      // Retry logic for network errors (max 3 retries with increasing delay)
      if (retryCount < 3) {
        const retryDelay = 1000 * (retryCount + 1); // 1s, 2s, 3s
        console.log(`Retrying fetch match scores in ${retryDelay/1000}s...`);
        
        setTimeout(() => {
          fetchMatchScores(matchId, retryCount + 1);
        }, retryDelay);
      } else {
        // After max retries, set default values
        updateScoreStates({
          redAutoScore: 0,
          redDriveScore: 0,
          blueAutoScore: 0,
          blueDriveScore: 0,
          redTotalScore: 0,
          blueTotalScore: 0,
          redGameElements: [],
          blueGameElements: [],
          redTeamCount: 0,
          blueTeamCount: 0,
          redMultiplier: 1.0,
          blueMultiplier: 1.0,
          scoreDetails: {}
        });
      }
    }
  };

  // Helper function to update all score states with fetched data
  const updateScoreStates = (scoreData: any) => {
    setRedAutoScore(scoreData.redAutoScore || 0);
    setRedDriveScore(scoreData.redDriveScore || 0);
    setBlueAutoScore(scoreData.blueAutoScore || 0);
    setBlueDriveScore(scoreData.blueDriveScore || 0);
    
    // Ensure gameElements are always arrays
    const safeRedElements = Array.isArray(scoreData.redGameElements) 
      ? scoreData.redGameElements 
      : [];
      
    const safeBlueElements = Array.isArray(scoreData.blueGameElements)
      ? scoreData.blueGameElements
      : [];
    
    setRedGameElements(safeRedElements);
    setBlueGameElements(safeBlueElements);
    setRedTeamCount(scoreData.redTeamCount || 0);
    setBlueTeamCount(scoreData.blueTeamCount || 0);
    setRedMultiplier(scoreData.redMultiplier || 1.0);
    setBlueMultiplier(scoreData.blueMultiplier || 1.0);
    setScoreDetails(scoreData.scoreDetails || null);
  };

  // Add a new game element to red alliance
  const addRedGameElement = () => {
    if (!newElement.element.trim()) return;
    
    const totalPoints = newElement.operation === 'multiply' 
      ? newElement.count * newElement.pointsEach 
      : newElement.count + newElement.pointsEach;
      
    const updatedElements = [
      ...redGameElements, 
      { 
        ...newElement, 
        totalPoints 
      }
    ];
    
    setRedGameElements(updatedElements);
    setIsAddingRedElement(false);
    setNewElement({
      element: '',
      count: 1,
      pointsEach: 1,
      operation: 'multiply'
    });
  };
  
  // Add a new game element to blue alliance
  const addBlueGameElement = () => {
    if (!newElement.element.trim()) return;
    
    const totalPoints = newElement.operation === 'multiply' 
      ? newElement.count * newElement.pointsEach 
      : newElement.count + newElement.pointsEach;
      
    const updatedElements = [
      ...blueGameElements, 
      { 
        ...newElement, 
        totalPoints 
      }
    ];
    
    setBlueGameElements(updatedElements);
    setIsAddingBlueElement(false);
    setNewElement({
      element: '',
      count: 1,
      pointsEach: 1,
      operation: 'multiply'
    });
  };
  
  // Remove a game element
  const removeGameElement = (alliance: 'red' | 'blue', index: number) => {
    if (alliance === 'red') {
      const updatedElements = [...redGameElements];
      updatedElements.splice(index, 1);
      setRedGameElements(updatedElements);
    } else {
      const updatedElements = [...blueGameElements];
      updatedElements.splice(index, 1);
      setBlueGameElements(updatedElements);
    }
  };

  // Load match scores when a match is selected
  useEffect(() => {
    if (selectedMatchId) {
      fetchMatchScores(selectedMatchId);
    }
  }, [selectedMatchId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Match Control Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                Tournament ID: {currentTournament}
              </span>
            </div>
          </CardContent>
        </Card>
        
        {selectedMatch && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge 
                  className={getStatusBadgeColor(selectedMatch.status)}
                >
                  {selectedMatch.status}
                </Badge>
                <span className="font-semibold">
                  Match {selectedMatch.matchNumber}
                </span>
                <span className="text-sm text-gray-500">
                  ({formatDate(selectedMatch.scheduledStartTime)})
                </span>
              </div>
              <div className="flex mt-2 gap-2">
                <div className="flex-1 text-red-700 text-sm">
                  Red: {selectedMatch.redTeams?.join(', ') || 'N/A'}
                </div>
                <div className="flex-1 text-blue-700 text-sm">
                  Blue: {selectedMatch.blueTeams?.join(', ') || 'N/A'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="display">Display Control</TabsTrigger>
          <TabsTrigger value="match">Match Control</TabsTrigger>
          <TabsTrigger value="timer">Timer Control</TabsTrigger>
          <TabsTrigger value="scores">Score Control</TabsTrigger>
        </TabsList>
        
        {/* Matches List Tab */}
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Matches</CardTitle>
              <CardDescription>
                Select a match to control
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center p-4">Loading matches...</div>
              ) : matches.length === 0 ? (
                <div className="text-center p-4">No matches found for this tournament</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match #</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow 
                        key={match.id} 
                        className={selectedMatch?.id === match.id ? 'bg-blue-50' : ''}
                      >
                        <TableCell>{match.matchNumber}</TableCell>
                        <TableCell>{formatDate(match.scheduledStartTime)}</TableCell>
                        <TableCell>
                          <Badge 
                            className={getStatusBadgeColor(match.status)}
                          >
                            {match.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 text-xs">
                            <span className="text-red-700">R: {match.redTeams?.join(', ') || 'N/A'}</span>
                            <span className="mx-1">|</span>
                            <span className="text-blue-700">B: {match.blueTeams?.join(', ') || 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant={selectedMatch?.id === match.id ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handleSelectMatch(match)}
                          >
                            {selectedMatch?.id === match.id ? 'Selected' : 'Select'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsLoading(true);
                  fetchMatches(tournamentId)
                    .then(setMatches)
                    .finally(() => setIsLoading(false));
                }}
              >
                Refresh Matches
              </Button>
              
              {selectedMatch && (
                <Button 
                  onClick={() => setCurrentTab('match')}
                >
                  Control Selected Match
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Display Control Tab */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Audience Display Settings</CardTitle>
              <CardDescription>
                Control what is shown on the audience display
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="displayMode">Display Mode</Label>
                  <Select value={displayMode} onValueChange={setDisplayMode}>
                    <SelectTrigger id="displayMode">
                      <SelectValue placeholder="Select display mode" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="match">Match Details</SelectItem>
                      <SelectItem value="teams">Teams</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="rankings">Rankings</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="blank">Blank Screen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {displayMode === 'match' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="matchId">Match ID</Label>
                    <Input
                      id="matchId"
                      value={selectedMatchId}
                      onChange={(e) => setSelectedMatchId(e.target.value)}
                      placeholder="Enter match ID"
                    />
                    {selectedMatch && (
                      <div className="text-sm text-gray-600">
                        Selected match: {selectedMatch.matchNumber}
                      </div>
                    )}
                  </div>
                )}

                {displayMode === 'announcement' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="announcement">Announcement</Label>
                    <Input
                      id="announcement"
                      value={announcementMessage}
                      onChange={(e) => setAnnouncementMessage(e.target.value)}
                      placeholder="Enter announcement message"
                    />
                    <Button variant="secondary" onClick={handleSendAnnouncement}>
                      Send Announcement
                    </Button>
                  </div>
                )}

                {displayMode === 'match' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        id="showTimer"
                        type="checkbox"
                        checked={showTimer}
                        onChange={() => setShowTimer(!showTimer)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label
                        htmlFor="showTimer"
                        className="text-sm font-medium"
                      >
                        Show Timer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="showScores"
                        type="checkbox"
                        checked={showScores}
                        onChange={() => setShowScores(!showScores)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label
                        htmlFor="showScores"
                        className="text-sm font-medium"
                      >
                        Show Scores
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="showTeams"
                        type="checkbox"
                        checked={showTeams}
                        onChange={() => setShowTeams(!showTeams)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label
                        htmlFor="showTeams"
                        className="text-sm font-medium"
                      >
                        Show Teams
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDisplayModeChange}>Update Display</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Match Control Tab */}
        <TabsContent value="match">
          <Card>
            <CardHeader>
              <CardTitle>Match Control</CardTitle>
              <CardDescription>Control the current match state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="matchIdControl">Match ID</Label>
                  <Input
                    id="matchIdControl"
                    value={selectedMatchId}
                    onChange={(e) => setSelectedMatchId(e.target.value)}
                    placeholder="Enter match ID"
                    readOnly={selectedMatch !== null}
                  />
                  {selectedMatch && (
                    <div className="text-sm text-gray-600">
                      Using selected match: {selectedMatch.matchNumber}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="matchPeriod">Match Period</Label>
                  <Select value={matchPeriod} onValueChange={setMatchPeriod}>
                    <SelectTrigger id="matchPeriod">
                      <SelectValue placeholder="Select match period" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="auto">Autonomous</SelectItem>
                      <SelectItem value="teleop">Teleop</SelectItem>
                      <SelectItem value="endgame">Endgame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() =>
                  sendMatchStateChange({
                    matchId: selectedMatchId,
                    status: 'PENDING',
                    currentPeriod: null,
                  })
                }
              >
                Reset Match
              </Button>

              <Button
                onClick={() =>
                  sendMatchStateChange({
                    matchId: selectedMatchId,
                    status: 'IN_PROGRESS',
                    currentPeriod: matchPeriod as any,
                  })
                }
              >
                Update Match State
              </Button>

              <Button
                onClick={() =>
                  sendMatchStateChange({
                    matchId: selectedMatchId,
                    status: 'COMPLETED',
                    currentPeriod: null,
                  })
                }
              >
                Complete Match
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Timer Control Tab */}
        <TabsContent value="timer">
          <Card>
            <CardHeader>
              <CardTitle>Match Timer</CardTitle>
              <CardDescription>Control the match timer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                {selectedMatch && (
                  <div className="text-sm bg-blue-50 p-2 rounded-md border border-blue-200">
                    Currently controlling timer for Match {selectedMatch.matchNumber} (ID: {selectedMatch.id})
                  </div>
                )}
                {/* Timer Clock Display */}
                <div className="flex flex-col items-center my-4">
                  <div className={`text-5xl font-mono font-bold ${timerIsRunning ? 'text-green-700' : 'text-gray-700'}`}>{formatTime(timerRemaining)}</div>
                  <div className="text-xs text-gray-500 mt-1">{timerIsRunning ? 'Running' : 'Paused'}</div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="timerDuration">Timer Duration (ms)</Label>
                  <Input
                    id="timerDuration"
                    type="number"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(Number(e.target.value))}
                    placeholder="Enter timer duration in milliseconds"
                  />
                  <div className="text-sm text-gray-500">
                    {Math.floor(timerDuration / 60000)}:
                    {String(Math.floor((timerDuration % 60000) / 1000)).padStart(
                      2,
                      '0'
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="timerPresets">Timer Presets</Label>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setTimerDuration(30000)}>30s</Button>
                    <Button size="sm" variant="outline" onClick={() => setTimerDuration(60000)}>1m</Button>
                    <Button size="sm" variant="outline" onClick={() => setTimerDuration(120000)}>2m</Button>
                    <Button size="sm" variant="outline" onClick={() => setTimerDuration(150000)}>2m30s</Button>
                    <Button size="sm" variant="outline" onClick={() => setTimerDuration(180000)}>3m</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={handleStartTimer}
                disabled={!selectedMatchId}
              >
                Start Timer
              </Button>
              <Button 
                onClick={handlePauseTimer}
                disabled={!selectedMatchId}
              >
                Pause Timer
              </Button>
              <Button 
                onClick={handleResetTimer}
                disabled={!selectedMatchId}
              >
                Reset Timer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Score Control Tab */}
        <TabsContent value="scores">
          <Card className="bg-gray-900 border-gray-700 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
              <CardTitle className="flex items-center text-gray-100">
                <span className="text-xl font-bold">Match Scores</span>
                {selectedMatch && (
                  <Badge className="ml-2 bg-blue-600 text-white">
                    Match #{selectedMatch.matchNumber}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-gray-300">
                Update the current match scores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-gray-900 text-gray-100">
              {selectedMatch && (
                <div className="text-sm bg-blue-900 p-3 rounded-md border-l-4 border-blue-500 mb-4 flex items-center text-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Updating scores for <strong className="text-white">Match {selectedMatch.matchNumber}</strong> (ID: {selectedMatch.id})
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Red Alliance */}
                <div className="space-y-4 p-5 bg-gradient-to-br from-red-950 to-red-900 rounded-lg border-2 border-red-600 shadow-md">
                  <h3 className="text-xl font-bold text-red-200 text-center mb-2 pb-2 border-b-2 border-red-700">
                    RED ALLIANCE
                  </h3>
                  
                  {selectedMatch && (
                    <div className="text-sm font-medium bg-red-900 bg-opacity-70 text-red-100 p-2 rounded mb-3 text-center border-l-4 border-red-500">
                      Teams: {selectedMatch.redTeams?.join(', ') || 'N/A'}
                    </div>
                  )}
                  
                  {/* Team Count Multiplier */}
                  <div className="bg-gray-800 rounded-md p-3 space-y-2 mb-4">
                    <Label htmlFor="redTeamCount" className="text-red-200 font-semibold flex justify-between">
                      <span>Team Count</span>
                      <span className="text-red-300">Multiplier: x{redMultiplier.toFixed(2)}</span>
                    </Label>
                    <Select
                      value={redTeamCount.toString()}
                      onValueChange={(value) => updateRedMultiplier(parseInt(value))}
                    >
                      <SelectTrigger className="bg-gray-800 border-red-700 text-red-100">
                        <SelectValue placeholder="Select team count" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-red-700 text-red-100">
                        <SelectItem value="0">No teams</SelectItem>
                        <SelectItem value="1">1 team (x1.25)</SelectItem>
                        <SelectItem value="2">2 teams (x1.5)</SelectItem>
                        <SelectItem value="3">3 teams (x1.75)</SelectItem>
                        <SelectItem value="4">4 teams (x2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Score Inputs */}
                  <div className="bg-gray-800 rounded-md p-3 space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="redAutoScore" className="text-red-200 font-semibold">
                        Auto Score
                      </Label>
                      <div className="flex">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-300 hover:bg-red-800 hover:text-red-100"
                          onClick={() => setRedAutoScore(Math.max(0, redAutoScore - 1))}
                        >
                          −
                        </Button>
                        <Input
                          id="redAutoScore"
                          type="number"
                          value={redAutoScore}
                          onChange={(e) => setRedAutoScore(Number(e.target.value))}
                          className="mx-2 text-center font-medium border-red-700 bg-gray-800 text-red-100 focus:border-red-500 focus:ring-red-500"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-300 hover:bg-red-800 hover:text-red-100"
                          onClick={() => setRedAutoScore(redAutoScore + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="redDriveScore" className="text-red-200 font-semibold">
                        Teleop/Endgame Score
                      </Label>
                      <div className="flex">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-300 hover:bg-red-800 hover:text-red-100"
                          onClick={() => setRedDriveScore(Math.max(0, redDriveScore - 1))}
                        >
                          −
                        </Button>
                        <Input
                          id="redDriveScore"
                          type="number"
                          value={redDriveScore}
                          onChange={(e) => setRedDriveScore(Number(e.target.value))}
                          className="mx-2 text-center font-medium border-red-700 bg-gray-800 text-red-100 focus:border-red-500 focus:ring-red-500"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-300 hover:bg-red-800 hover:text-red-100"
                          onClick={() => setRedDriveScore(redDriveScore + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Game Elements Scoring */}
                  <Accordion type="single" collapsible className="bg-gray-800 rounded-md mt-4">
                    <AccordionItem value="red-elements" className="border-red-700">
                      <AccordionTrigger className="px-3 py-2 text-red-200 hover:text-red-100 hover:no-underline">
                        Game Elements Scoring
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        {redGameElements.length === 0 ? (
                          <div className="text-center py-2 text-red-300">
                            No game elements added
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {redGameElements.map((item, index) => (
                              <div key={index} className="flex justify-between items-center bg-red-950 p-2 rounded-md">
                                <div className="flex-1">
                                  <div className="font-medium text-red-200">{item.element}</div>
                                  <div className="text-xs text-red-300">
                                    {item.count} × {item.pointsEach} pts {item.operation === 'add' ? '(added)' : '(multiplied)'}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-red-100">{item.totalPoints} pts</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0 text-red-400 hover:text-red-100 hover:bg-red-800"
                                    onClick={() => removeGameElement('red', index)}
                                  >
                                    ×
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-3 flex justify-center">
                          <Dialog open={isAddingRedElement} onOpenChange={setIsAddingRedElement}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-red-600 text-red-200 hover:bg-red-800 hover:text-red-100"
                              >
                                Add Game Element
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 text-gray-100 border-red-700">
                              <DialogHeader>
                                <DialogTitle className="text-red-200">Add Red Alliance Game Element</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Add a new scoring element for the red alliance
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="element-name" className="text-red-200">Element Name</Label>
                                  <Input
                                    id="element-name"
                                    value={newElement.element}
                                    onChange={(e) => setNewElement({...newElement, element: e.target.value})}
                                    className="bg-gray-800 border-red-700 text-red-100"
                                    placeholder="e.g., Ball, Robot, Zone"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="element-count" className="text-red-200">Count</Label>
                                    <Input
                                      id="element-count"
                                      type="number"
                                      value={newElement.count}
                                      onChange={(e) => setNewElement({...newElement, count: Number(e.target.value)})}
                                      className="bg-gray-800 border-red-700 text-red-100"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="element-points" className="text-red-200">Points Each</Label>
                                    <Input
                                      id="element-points"
                                      type="number"
                                      value={newElement.pointsEach}
                                      onChange={(e) => setNewElement({...newElement, pointsEach: Number(e.target.value)})}
                                      className="bg-gray-800 border-red-700 text-red-100"
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="element-operation" className="text-red-200">Operation</Label>
                                  <Select
                                    value={newElement.operation}
                                    onValueChange={(value) => setNewElement({...newElement, operation: value})}
                                  >
                                    <SelectTrigger id="element-operation" className="bg-gray-800 border-red-700 text-red-100">
                                      <SelectValue placeholder="Select operation" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-red-100">
                                      <SelectItem value="multiply">Multiply (Count × Points)</SelectItem>
                                      <SelectItem value="add">Add (Count + Points)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="bg-gray-800 p-3 rounded-md mt-2 text-center">
                                  <div className="text-sm text-gray-400">Preview:</div>
                                  <div className="text-lg font-bold text-red-100">
                                    {newElement.operation === 'multiply'
                                      ? `${newElement.count} × ${newElement.pointsEach} = ${newElement.count * newElement.pointsEach} points`
                                      : `${newElement.count} + ${newElement.pointsEach} = ${newElement.count + newElement.pointsEach} points`
                                    }
                                  </div>
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setIsAddingRedElement(false)}
                                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={addRedGameElement}
                                  className="bg-red-700 text-white hover:bg-red-600"
                                >
                                  Add Element
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        
                        {redGameElements.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-red-700 flex justify-between items-center">
                            <span className="text-red-200">Elements Total:</span>
                            <span className="font-bold text-red-100">
                              {redGameElements.reduce((sum, item) => sum + item.totalPoints, 0)} pts
                            </span>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4 pt-3 border-t-2 border-red-700 bg-red-800 rounded-lg p-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center text-sm text-red-200">
                        <span>Auto + Teleop:</span>
                        <span>{redAutoScore + redDriveScore} pts</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-red-200">
                        <span>Game Elements:</span>
                        <span>{redGameElements.reduce((sum, item) => sum + item.totalPoints, 0)} pts</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-red-200">
                        <span>Multiplier:</span>
                        <span>×{redMultiplier.toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-red-600 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-red-100">Total:</span>
                        <span className="text-2xl font-bold text-white">
                          {redTotalScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blue Alliance */}
                <div className="space-y-4 p-5 bg-gradient-to-br from-blue-950 to-blue-900 rounded-lg border-2 border-blue-600 shadow-md">
                  <h3 className="text-xl font-bold text-blue-200 text-center mb-2 pb-2 border-b-2 border-blue-700">
                    BLUE ALLIANCE
                  </h3>
                  
                  {selectedMatch && (
                    <div className="text-sm font-medium bg-blue-900 bg-opacity-70 text-blue-100 p-2 rounded mb-3 text-center border-l-4 border-blue-500">
                      Teams: {selectedMatch.blueTeams?.join(', ') || 'N/A'}
                    </div>
                  )}
                  
                  {/* Team Count Multiplier */}
                  <div className="bg-gray-800 rounded-md p-3 space-y-2 mb-4">
                    <Label htmlFor="blueTeamCount" className="text-blue-200 font-semibold flex justify-between">
                      <span>Team Count</span>
                      <span className="text-blue-300">Multiplier: x{blueMultiplier.toFixed(2)}</span>
                    </Label>
                    <Select
                      value={blueTeamCount.toString()}
                      onValueChange={(value) => updateBlueMultiplier(parseInt(value))}
                    >
                      <SelectTrigger className="bg-gray-800 border-blue-700 text-blue-100">
                        <SelectValue placeholder="Select team count" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-blue-700 text-blue-100">
                        <SelectItem value="0">No teams</SelectItem>
                        <SelectItem value="1">1 team (x1.25)</SelectItem>
                        <SelectItem value="2">2 teams (x1.5)</SelectItem>
                        <SelectItem value="3">3 teams (x1.75)</SelectItem>
                        <SelectItem value="4">4 teams (x2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Score Inputs */}
                  <div className="bg-gray-800 rounded-md p-3 space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="blueAutoScore" className="text-blue-200 font-semibold">
                        Auto Score
                      </Label>
                      <div className="flex">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                          onClick={() => setBlueAutoScore(Math.max(0, blueAutoScore - 1))}
                        >
                          −
                        </Button>
                        <Input
                          id="blueAutoScore"
                          type="number"
                          value={blueAutoScore}
                          onChange={(e) => setBlueAutoScore(Number(e.target.value))}
                          className="mx-2 text-center font-medium border-blue-700 bg-gray-800 text-blue-100 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                          onClick={() => setBlueAutoScore(blueAutoScore + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="blueDriveScore" className="text-blue-200 font-semibold">
                        Teleop/Endgame Score
                      </Label>
                      <div className="flex">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                          onClick={() => setBlueDriveScore(Math.max(0, blueDriveScore - 1))}
                        >
                          −
                        </Button>
                        <Input
                          id="blueDriveScore"
                          type="number"
                          value={blueDriveScore}
                          onChange={(e) => setBlueDriveScore(Number(e.target.value))}
                          className="mx-2 text-center font-medium border-blue-700 bg-gray-800 text-blue-100 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                          onClick={() => setBlueDriveScore(blueDriveScore + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Game Elements Scoring */}
                  <Accordion type="single" collapsible className="bg-gray-800 rounded-md mt-4">
                    <AccordionItem value="blue-elements" className="border-blue-700">
                      <AccordionTrigger className="px-3 py-2 text-blue-200 hover:text-blue-100 hover:no-underline">
                        Game Elements Scoring
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        {blueGameElements.length === 0 ? (
                          <div className="text-center py-2 text-blue-300">
                            No game elements added
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {blueGameElements.map((item, index) => (
                              <div key={index} className="flex justify-between items-center bg-blue-950 p-2 rounded-md">
                                <div className="flex-1">
                                  <div className="font-medium text-blue-200">{item.element}</div>
                                  <div className="text-xs text-blue-300">
                                    {item.count} × {item.pointsEach} pts {item.operation === 'add' ? '(added)' : '(multiplied)'}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-blue-100">{item.totalPoints} pts</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0 text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                                    onClick={() => removeGameElement('blue', index)}
                                  >
                                    ×
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-3 flex justify-center">
                          <Dialog open={isAddingBlueElement} onOpenChange={setIsAddingBlueElement}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-blue-600 text-blue-200 hover:bg-blue-800 hover:text-blue-100"
                              >
                                Add Game Element
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 text-gray-100 border-blue-700">
                              <DialogHeader>
                                <DialogTitle className="text-blue-200">Add Blue Alliance Game Element</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Add a new scoring element for the blue alliance
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="element-name" className="text-blue-200">Element Name</Label>
                                  <Input
                                    id="element-name"
                                    value={newElement.element}
                                    onChange={(e) => setNewElement({...newElement, element: e.target.value})}
                                    className="bg-gray-800 border-blue-700 text-blue-100"
                                    placeholder="e.g., Ball, Robot, Zone"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="element-count" className="text-blue-200">Count</Label>
                                    <Input
                                      id="element-count"
                                      type="number"
                                      value={newElement.count}
                                      onChange={(e) => setNewElement({...newElement, count: Number(e.target.value)})}
                                      className="bg-gray-800 border-blue-700 text-blue-100"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="element-points" className="text-blue-200">Points Each</Label>
                                    <Input
                                      id="element-points"
                                      type="number"
                                      value={newElement.pointsEach}
                                      onChange={(e) => setNewElement({...newElement, pointsEach: Number(e.target.value)})}
                                      className="bg-gray-800 border-blue-700 text-blue-100"
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="element-operation" className="text-blue-200">Operation</Label>
                                  <Select
                                    value={newElement.operation}
                                    onValueChange={(value) => setNewElement({...newElement, operation: value})}
                                  >
                                    <SelectTrigger id="element-operation" className="bg-gray-800 border-blue-700 text-blue-100">
                                      <SelectValue placeholder="Select operation" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-blue-100">
                                      <SelectItem value="multiply">Multiply (Count × Points)</SelectItem>
                                      <SelectItem value="add">Add (Count + Points)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="bg-gray-800 p-3 rounded-md mt-2 text-center">
                                  <div className="text-sm text-gray-400">Preview:</div>
                                  <div className="text-lg font-bold text-blue-100">
                                    {newElement.operation === 'multiply'
                                      ? `${newElement.count} × ${newElement.pointsEach} = ${newElement.count * newElement.pointsEach} points`
                                      : `${newElement.count} + ${newElement.pointsEach} = ${newElement.count + newElement.pointsEach} points`
                                    }
                                  </div>
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setIsAddingBlueElement(false)}
                                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={addBlueGameElement}
                                  className="bg-blue-700 text-white hover:bg-blue-600"
                                >
                                  Add Element
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        
                        {blueGameElements.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-blue-700 flex justify-between items-center">
                            <span className="text-blue-200">Elements Total:</span>
                            <span className="font-bold text-blue-100">
                              {blueGameElements.reduce((sum, item) => sum + item.totalPoints, 0)} pts
                            </span>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4 pt-3 border-t-2 border-blue-700 bg-blue-800 rounded-lg p-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center text-sm text-blue-200">
                        <span>Auto + Teleop:</span>
                        <span>{blueAutoScore + blueDriveScore} pts</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-blue-200">
                        <span>Game Elements:</span>
                        <span>{blueGameElements.reduce((sum, item) => sum + item.totalPoints, 0)} pts</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-blue-200">
                        <span>Multiplier:</span>
                        <span>×{blueMultiplier.toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-blue-600 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-blue-100">Total:</span>
                        <span className="text-2xl font-bold text-white">
                          {blueTotalScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Score Comparison */}
              <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-lg font-bold text-center text-gray-200 mb-3">Score Comparison</h4>
                <div className="flex items-center justify-center">
                  <div className={`text-3xl font-bold ${redTotalScore > blueTotalScore ? 'text-red-400 text-4xl' : 'text-red-500'}`}>
                    {redTotalScore}
                  </div>
                  <div className="mx-4 text-2xl font-semibold text-gray-400">vs</div>
                  <div className={`text-3xl font-bold ${blueTotalScore > redTotalScore ? 'text-blue-400 text-4xl' : 'text-blue-500'}`}>
                    {blueTotalScore}
                  </div>
                </div>
                <div className="text-center mt-2 text-sm">
                  {redTotalScore > blueTotalScore ? (
                    <Badge className="bg-red-700 text-white hover:bg-red-600">Red Leading</Badge>
                  ) : blueTotalScore > redTotalScore ? (
                    <Badge className="bg-blue-700 text-white hover:bg-blue-600">Blue Leading</Badge>
                  ) : (
                    <Badge className="bg-yellow-700 text-white hover:bg-yellow-600">Tied</Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-800 border-t border-gray-700 pt-4 pb-4">
              <Button 
                onClick={handleUpdateScores} 
                className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3"
                disabled={!selectedMatchId}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Update Scores
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-medium mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>First, select a match from the Matches tab</li>
          <li>Use the other tabs to control the match, timer, scores, and display settings</li>
          <li>Open the audience display in another window to see the live updates</li>
        </ol>
      </div>
    </div>
  );
}
