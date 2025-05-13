"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DisplayControl,
  MatchesList,
  ScoreControl
} from "./tabs";
import CombinedMatchTimerControl from "./CombinedMatchTimerControl";

// Define interface for props
interface MatchControlTabsProps {
  // Common props
  selectedMatchId: string;
  setSelectedMatchId: (id: string) => void;
  selectedMatch: any | null;
  isLoadingMatches: boolean;
  matchesData: any[];
  
  // WebSocket props
  sendMatchStateChange: (params: any) => void;
  sendScoreUpdate: (params: any) => void;
  
  // Display Control props
  displayMode: string;
  setDisplayMode: (mode: string) => void;
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;
  showScores: boolean;
  setShowScores: (show: boolean) => void;
  showTeams: boolean;
  setShowTeams: (show: boolean) => void;
  announcementMessage: string;
  setAnnouncementMessage: (message: string) => void;
  handleDisplayModeChange: () => void;
  handleSendAnnouncement: () => void;
  
  // Match Control props
  matchPeriod: string;
  setMatchPeriod: (period: string) => void;
  
  // Timer Control props
  timerDuration: number;
  setTimerDuration: (duration: number) => void;
  timerRemaining: number;
  timerIsRunning: boolean;
  formatTime: (ms: number) => string;
  handleStartTimer: () => void;
  handlePauseTimer: () => void;
  handleResetTimer: () => void;
  
  // Score Control props
  redAutoScore: number;
  setRedAutoScore: (score: number) => void;
  redDriveScore: number;
  setRedDriveScore: (score: number) => void;
  blueAutoScore: number;
  setBlueAutoScore: (score: number) => void;
  blueDriveScore: number;
  setBlueDriveScore: (score: number) => void;
  redTotalScore: number;
  blueTotalScore: number;
  redGameElements: any[];
  blueGameElements: any[];
  setRedGameElements: (elements: any[]) => void;
  setBlueGameElements: (elements: any[]) => void;
  redTeamCount: number;
  blueTeamCount: number;
  redMultiplier: number;
  blueMultiplier: number;
  setRedTeamCount: (count: number) => void;
  setBlueTeamCount: (count: number) => void;
  setRedMultiplier: (multiplier: number) => void;
  setBlueMultiplier: (multiplier: number) => void;
  updateRedTeamCount: (count: number) => void;
  updateBlueTeamCount: (count: number) => void;
  scoreDetails: any;
  setScoreDetails: (details: any) => void;
  getRedTeams: (match: any) => string[];
  getBlueTeams: (match: any) => string[];
  handleUpdateScores: () => void;
  handleSubmitScores: () => void;
  handleSelectMatch: (match: {id: string; matchNumber: string | number}) => void;
  addRedGameElement: () => void;
  addBlueGameElement: () => void;
  removeGameElement: (alliance: 'red' | 'blue', index: number) => void;
  
  // Utility props
  queryClient: any;
  formatDate: (dateString: string) => string;
  getStatusBadgeColor: (status: string) => string;
  matchScoresMap: Record<string, { redTotalScore: number; blueTotalScore: number }>;
}

export default function MatchControlTabs({
  // Common props
  selectedMatchId,
  setSelectedMatchId,
  selectedMatch,
  isLoadingMatches,
  matchesData,
  
  // WebSocket props
  sendMatchStateChange,
  sendScoreUpdate,
  
  // Display Control props
  displayMode,
  setDisplayMode,
  showTimer,
  setShowTimer,
  showScores,
  setShowScores,
  showTeams,
  setShowTeams,
  announcementMessage,
  setAnnouncementMessage,
  handleDisplayModeChange,
  handleSendAnnouncement,
  
  // Match Control props
  matchPeriod,
  setMatchPeriod,
  
  // Timer Control props
  timerDuration,
  setTimerDuration,
  timerRemaining,
  timerIsRunning,
  formatTime,
  handleStartTimer,
  handlePauseTimer,
  handleResetTimer,
  
  // Score Control props
  redAutoScore,
  setRedAutoScore,
  redDriveScore,
  setRedDriveScore,
  blueAutoScore,
  setBlueAutoScore,
  blueDriveScore,
  setBlueDriveScore,
  redTotalScore,
  blueTotalScore,
  redGameElements,
  blueGameElements,
  setRedGameElements,
  setBlueGameElements,
  redTeamCount,
  blueTeamCount,
  redMultiplier,
  blueMultiplier,
  setRedTeamCount,
  setBlueTeamCount,
  setRedMultiplier,
  setBlueMultiplier,
  updateRedTeamCount,
  updateBlueTeamCount,
  scoreDetails,
  setScoreDetails,
  getRedTeams,
  getBlueTeams,
  handleUpdateScores,
  handleSubmitScores,
  handleSelectMatch,
  addRedGameElement,
  addBlueGameElement,
  removeGameElement,
  
  // Utility props
  queryClient,
  formatDate,
  getStatusBadgeColor,
  matchScoresMap
}: MatchControlTabsProps) {
  // State for current tab
  const [currentTab, setCurrentTab] = useState<string>("matches");
  
  // Create a game element type object for consistency (used by ScoreControl)
  const gameElementType = {
    element: "",
    count: 0,
    pointsEach: 0,
    operation: "multiply",
    totalPoints: 0,
  };

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="matches">Matches</TabsTrigger>
        <TabsTrigger value="display">Display Control</TabsTrigger>
        <TabsTrigger value="match">Match & Timer Control</TabsTrigger>
        <TabsTrigger value="scores">Score Control</TabsTrigger>
      </TabsList>

      {/* Matches List Tab */}
      <TabsContent value="matches">
        <MatchesList
          isLoadingMatches={isLoadingMatches}
          matchesData={matchesData}
          selectedMatch={selectedMatch}
          handleSelectMatch={handleSelectMatch}
          formatDate={formatDate}
          getStatusBadgeColor={getStatusBadgeColor}
          getRedTeams={getRedTeams}
          getBlueTeams={getBlueTeams}
          matchScoresMap={matchScoresMap}
          setCurrentTab={setCurrentTab}
        />
      </TabsContent>

      {/* Display Control Tab */}
      <TabsContent value="display">
        <DisplayControl
          selectedMatchId={selectedMatchId}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
          showScores={showScores}
          setShowScores={setShowScores}
          showTeams={showTeams}
          setShowTeams={setShowTeams}
          announcementMessage={announcementMessage}
          setAnnouncementMessage={setAnnouncementMessage}
          handleDisplayModeChange={handleDisplayModeChange}
          handleSendAnnouncement={handleSendAnnouncement}
          selectedMatch={selectedMatch}
        />
      </TabsContent>

      {/* Match & Timer Control Tab */}
      <TabsContent value="match">
        <CombinedMatchTimerControl
          selectedMatchId={selectedMatchId}
          setSelectedMatchId={setSelectedMatchId}
          matchPeriod={matchPeriod}
          setMatchPeriod={setMatchPeriod}
          sendMatchStateChange={sendMatchStateChange}
          selectedMatch={selectedMatch}
          timerDuration={timerDuration}
          setTimerDuration={setTimerDuration}
          timerRemaining={timerRemaining}
          timerIsRunning={timerIsRunning}
          formatTime={formatTime}
          handleStartTimer={handleStartTimer}
          handlePauseTimer={handlePauseTimer}
          handleResetTimer={handleResetTimer}

        />
      </TabsContent>

      {/* Score Control Tab */}
      <TabsContent value="scores">
        <ScoreControl
          selectedMatch={selectedMatch}
          selectedMatchId={selectedMatchId}
          redAutoScore={redAutoScore}
          setRedAutoScore={setRedAutoScore}
          redDriveScore={redDriveScore}
          setRedDriveScore={setRedDriveScore}
          redTeamCount={redTeamCount}
          setRedTeamCount={setRedTeamCount}
          redMultiplier={redMultiplier}
          setRedMultiplier={setRedMultiplier}
          blueAutoScore={blueAutoScore}
          setBlueAutoScore={setBlueAutoScore}
          blueDriveScore={blueDriveScore}
          setBlueDriveScore={setBlueDriveScore}
          blueTeamCount={blueTeamCount}
          setBlueTeamCount={setBlueTeamCount}
          blueMultiplier={blueMultiplier}
          setBlueMultiplier={setBlueMultiplier}
          handleUpdateScores={handleUpdateScores}
          handleSubmitScores={handleSubmitScores}
          gameElementType={gameElementType}
          redGameElements={redGameElements}
          blueGameElements={blueGameElements}
          getRedTeams={getRedTeams}
          getBlueTeams={getBlueTeams}
          scoreDetails={scoreDetails}
          setScoreDetails={setScoreDetails}
          updateRedTeamCount={updateRedTeamCount}
          updateBlueTeamCount={updateBlueTeamCount}
          addRedGameElement={addRedGameElement}
          addBlueGameElement={addBlueGameElement}
          removeGameElement={removeGameElement}
        />
      </TabsContent>
    </Tabs>
  );
}