"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTournament } from "@/hooks/use-tournaments";
import { useTournamentFields } from "@/components/fields/FieldSelectDropdown";
import { useWebSocket } from "@/hooks/useWebSocket";
import { AudienceDisplaySettings } from "@/lib/websocket-service";
import TeamsDisplay from "../../components/TeamsDisplay";
import ScheduleDisplay, { Match } from "../../components/ScheduleDisplay";
import { useTeams } from "@/hooks/use-teams";
import { apiClient } from "@/lib/api-client";
import { useInjectTextShadowStyle } from "../../components/useInjectTextShadowStyle";
import { useAnnouncement } from "../../components/useAnnouncement";
import { AnnouncementOverlay } from "../../components/AnnouncementOverlay";
import { FieldNotFound } from "../../components/FieldNotFound";
import { LoadingDisplay } from "../../components/LoadingDisplay";
import { MatchDisplay } from "../../components/MatchDisplay";
import { useMatchesByTournament } from "../../components/useMatchesByTournament";

export default function LiveFieldDisplayPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params?.tournamentId as string;
  const fieldId = params?.fieldId as string;

  useInjectTextShadowStyle();

  // Fetch tournament and field details
  const { data: tournament, isLoading: isLoadingTournament } =
    useTournament(tournamentId);
  const { data: fields = [], isLoading: isLoadingFields } =
    useTournamentFields(tournamentId);
  const field = fields.find((f) => f.id === fieldId); // State for live data
  const [score, setScore] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);
  const [matchState, setMatchState] = useState<any>({
    matchId: null,
    matchNumber: null,
    name: null,
    status: null,
    currentPeriod: null,
    redTeams: [],
    blueTeams: [],
  });
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Display mode and announcement state
  const [displaySettings, setDisplaySettings] =
    useState<AudienceDisplaySettings>({
      displayMode: "match",
      tournamentId,
      fieldId,
      updatedAt: Date.now(),
    });

  const {
    announcement,
    setAnnouncement,
    showAnnouncement,
    setShowAnnouncement,
    announcementCountdown,
    setAnnouncementCountdown,
  } = useAnnouncement();

  // Validate field exists for this tournament
  const [fieldError, setFieldError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoadingFields && fields.length > 0 && fieldId && !field) {
      setFieldError(
        `Field with ID "${fieldId}" was not found in tournament "${
          tournament?.name || tournamentId
        }"`
      );
    } else {
      setFieldError(null);
    }
  }, [fields, fieldId, field, tournament, isLoadingFields, tournamentId]);

  // Fetch teams for the tournament
  const { data: teams = [], isLoading: isLoadingTeams } =
    useTeams(tournamentId);

  // Fetch match schedule for the tournament
  const { data: matches = [], isLoading: isLoadingMatches } =
    useMatchesByTournament(tournamentId);

  // WebSocket connection and state
  const {
    isConnected,
    joinFieldRoom,
    leaveFieldRoom,
    subscribe,
    changeDisplayMode,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
    joinTournament,
    joinFieldRoom: wsJoinFieldRoom,
    leaveFieldRoom: wsLeaveFieldRoom,
  } = useWebSocket({ tournamentId, autoConnect: true });

  // Expose WebSocket testing interface on window for manual testing and debugging
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).audienceDisplayWS = {
        // Display settings
        changeDisplayMode: (settings: any) =>
          changeDisplayMode({
            ...settings,
            fieldId,
            tournamentId,
          }),
        setToMatchDisplay: () =>
          changeDisplayMode({
            displayMode: "match",
            fieldId,
            tournamentId,
          }),
        setToTeamsDisplay: () =>
          changeDisplayMode({
            displayMode: "teams",
            fieldId,
            tournamentId,
          }),
        setToScheduleDisplay: () =>
          changeDisplayMode({
            displayMode: "schedule",
            fieldId,
            tournamentId,
          }),
        setToBlankDisplay: () =>
          changeDisplayMode({
            displayMode: "blank",
            fieldId,
            tournamentId,
          }),

        // Match management
        sendMatchUpdate: (data: any) =>
          sendMatchUpdate({
            ...data,
            fieldId,
          }),
        sendMatchStateChange: (data: any) =>
          sendMatchStateChange({
            ...data,
            fieldId,
          }),
        sendScoreUpdate: (data: any) =>
          sendScoreUpdate({
            ...data,
            fieldId,
          }),

        // Timer controls
        startTimer: (data: any) =>
          startTimer({
            ...data,
            fieldId,
          }),
        pauseTimer: (data: any) =>
          pauseTimer({
            ...data,
            fieldId,
          }),
        resetTimer: (data: any) =>
          resetTimer({
            ...data,
            fieldId,
          }),
        // Announcements
        sendAnnouncement: (message: string, duration?: number) =>
          sendAnnouncement(message, duration, fieldId),
        showTestAnnouncement: (message: string, seconds: number = 10) => {
          // Helper for testing announcements with countdown directly
          setAnnouncement(message);
          setShowAnnouncement(true);
          setAnnouncementCountdown(seconds);
          setTimeout(() => setShowAnnouncement(false), seconds * 1000);
        },

        // Room management
        joinFieldRoom: () => wsJoinFieldRoom(fieldId),
        leaveFieldRoom: () => wsLeaveFieldRoom(fieldId),

        // Debugging info
        getFieldId: () => fieldId,
        getTournamentId: () => tournamentId,
        getCurrentDisplayMode: () => displaySettings.displayMode,
        getCurrentDisplaySettings: () => displaySettings,
      };
    }
  }, [
    changeDisplayMode,
    sendMatchUpdate,
    sendMatchStateChange,
    sendScoreUpdate,
    startTimer,
    pauseTimer,
    resetTimer,
    sendAnnouncement,
    wsJoinFieldRoom,
    wsLeaveFieldRoom,
    fieldId,
    tournamentId,
    displaySettings,
  ]);

  // Join tournament and field rooms on mount
  useEffect(() => {
    if (!tournamentId) return;
    joinTournament(tournamentId);

    if (fieldId) {
      joinFieldRoom(fieldId);
      console.log(
        `Joining field room: ${fieldId} in tournament: ${tournamentId}`
      );
    }

    return () => {
      if (fieldId) {
        leaveFieldRoom(fieldId);
        console.log(`Leaving field room: ${fieldId}`);
      }
    };
  }, [tournamentId, fieldId, joinTournament, joinFieldRoom, leaveFieldRoom]);

  // Track connection status and attempts
  const [connectionAttempts, setConnectionAttempts] = useState<number>(0);

  // Update connection error message based on connection status
  useEffect(() => {
    if (!isConnected) {
      const attemptMessage =
        connectionAttempts > 0 ? ` (Attempt ${connectionAttempts + 1})` : "";
      setConnectionError(
        `WebSocket connection not established${attemptMessage}. Ensure the server is running.`
      );

      // Increment connection attempts and retry after delay
      const timeoutId = setTimeout(() => {
        setConnectionAttempts((prev) => prev + 1);
      }, 5000);

      return () => clearTimeout(timeoutId);
    } else {
      setConnectionError(null);
      setConnectionAttempts(0);
    }
  }, [isConnected, connectionAttempts]);

  // Helper to fetch and sync full match details and score
  async function fetchAndSyncMatch(matchId: string) {
    try {
      // Fetch match metadata (teams, period, status, etc.)
      const matchDetails = await apiClient.get<any>(`/matches/${matchId}`);
      setMatchState((prev: any) => ({
        ...prev,
        matchId: matchDetails.id,
        matchNumber: matchDetails.matchNumber,
        name: matchDetails.name || matchDetails.match_name || "",
        status: matchDetails.status || "",
        currentPeriod: matchDetails.currentPeriod || matchDetails.period || "",
        redTeams: matchDetails.redTeams || matchDetails.red_teams || [],
        blueTeams: matchDetails.blueTeams || matchDetails.blue_teams || [],
      }));
      // Fetch score breakdown
      const scoreDetails = await apiClient.get(`/match-scores/match/${matchId}`);
      setScore(scoreDetails);
    } catch (error) {
      console.error("Error syncing match data:", error);
    }
  }

  // Subscribe to WebSocket events and sync all live data with field-specific filtering
  useEffect(() => {
    // Display mode changes - can be tournament-wide or field-specific
    const unsubDisplayMode = subscribe<AudienceDisplaySettings>(
      "display_mode_change",
      (data) => {
        // Apply if global tournament update (no fieldId) or specific to this field
        if (!data.fieldId || data.fieldId === fieldId) {
          console.log("Received display mode change:", data);
          console.log(
            "Current display mode before update:",
            displaySettings.displayMode
          );

          // Ensure we're using the full data object with all required properties
          const updatedSettings = {
            ...data,
            // Make sure fieldId is preserved
            fieldId: data.fieldId || fieldId,
            // Make sure tournamentId is preserved
            tournamentId: data.tournamentId || tournamentId,
            // Ensure updatedAt is present
            updatedAt: data.updatedAt || Date.now(),
          };

          setDisplaySettings(updatedSettings);
          console.log("Updated display settings to:", updatedSettings);

          // If changing to match display mode and matchId is provided,
          // fetch and sync all match data immediately
          if (
            updatedSettings.displayMode === "match" &&
            updatedSettings.matchId
          ) {
            fetchAndSyncMatch(updatedSettings.matchId);
          }
        }
      }
    ); // Match updates - should be field-specific or global tournament updates
    const unsubMatchUpdate = subscribe<any>("match_update", (data) => {
      // Process updates for this specific field OR updates without a fieldId (global updates)
      if (!data.fieldId || data.fieldId === fieldId) {
        console.log("Receiving match update for field:", fieldId, data);

        const newMatchId = data.matchId || data.id; // Extract newMatchId

        // Store match data in matchState to show it on the audience display
        setMatchState((prevState: any) => ({
          ...prevState,
          ...data,
          // Ensure we have matchId set properly (could be in id or matchId property)
          matchId: newMatchId || prevState?.matchId,
          matchNumber: data.matchNumber || prevState?.matchNumber,
          status: data.status || prevState?.status,
          // If we have alliance data, keep it; otherwise use previous data
          redTeams: data.redTeams || prevState?.redTeams || [],
          blueTeams: data.blueTeams || prevState?.blueTeams || [],
        }));

        // If a new matchId is provided, and it's different from the current one,
        // or if the current matchId is null, fetch its full details.
        if (newMatchId && (newMatchId !== matchState.matchId || !matchState.matchId)) {
          console.log(`Match ID update: current ${matchState.matchId}, new ${newMatchId}. Fetching full details.`);
          fetchAndSyncMatch(newMatchId);
        }

        // Also ensure display mode is set to match
        if (displaySettings.displayMode !== "match") {
          setDisplaySettings({
            ...displaySettings,
            displayMode: "match",
            matchId: newMatchId, // Use extracted newMatchId
            updatedAt: Date.now(),
          });
        }
      }
    });

    // Timer updates - should be field-specific
    const unsubTimer = subscribe<any>("timer_update", (data) => {
      // Only process timer updates for this specific field
      if (data.fieldId === fieldId) {
        console.log("Applying timer update for field:", fieldId, data);
        setTimer(data);
      }
    }); // Match state changes - should be field-specific
    const unsubMatchState = subscribe<any>("match_state_change", (data) => {
      // Only process match state changes for this specific field
      if (data.fieldId === fieldId) {
        console.log("Applying match state change for field:", fieldId, data);
        console.log("Previous match state:", matchState);

        // Update the match state with the new status and period information
        // Use the same fallback pattern as match_update to preserve existing data
        setMatchState((prevState: any) => {
          const updatedState = {
            ...prevState,
            // Ensure we maintain matchId and don't overwrite with undefined
            matchId: data.matchId || prevState?.matchId,
            // Preserve match name and number if not provided in update
            matchNumber: data.matchNumber || prevState?.matchNumber,
            name: data.name || prevState?.name,
            // Update status and period
            status: data.status || prevState?.status,
            currentPeriod: data.currentPeriod || prevState?.currentPeriod,
            // Ensure team data is preserved
            redTeams: data.redTeams || prevState?.redTeams || [],
            blueTeams: data.blueTeams || prevState?.blueTeams || [],
          };

          console.log("Updated match state:", updatedState);
          return updatedState;
        });

        // If we're not already in match display mode, switch to it
        if (displaySettings.displayMode !== "match") {
          setDisplaySettings({
            ...displaySettings,
            displayMode: "match",
            matchId: data.matchId || matchState?.matchId, // Use existing matchId as fallback
            updatedAt: Date.now(),
          });
        }
      }
    }); // Score updates - should be field-specific
    const unsubScore = subscribe<any>("score_update", (data) => {
      // Only process score updates for this specific field
      if (data.fieldId === fieldId) {
        console.log("Applying score update for field:", fieldId, data);
        setScore(data);

        // If this is for the current match and we're not in match display mode, switch to it
        if (
          data.matchId &&
          data.matchId === matchState?.matchId &&
          displaySettings.displayMode !== "match"
        ) {
          setDisplaySettings({
            ...displaySettings,
            displayMode: "match",
            matchId: data.matchId,
            updatedAt: Date.now(),
          });
        }
      }
    });

    // Announcements - can be tournament-wide or field-specific
    const unsubAnnouncement = subscribe<{
      message: string;
      duration?: number;
      fieldId?: string;
      tournamentId: string;
    }>("announcement", (data) => {
      // Show if it's a tournament-wide announcement or specific to this field
      if (!data.fieldId || data.fieldId === fieldId) {
        console.log("Displaying announcement for field:", fieldId, data);
        setAnnouncement(data.message);
        setShowAnnouncement(true);

        // Use the provided duration or default to 10 seconds
        const displayDuration = data.duration || 10000;

        // Auto-hide announcement after duration
        const timerId = setTimeout(
          () => setShowAnnouncement(false),
          displayDuration
        );

        // Clear timeout if component unmounts while announcement is showing
        return () => clearTimeout(timerId);
      }
    });
    return () => {
      unsubDisplayMode();
      unsubMatchUpdate(); // Keep for cleanup
      unsubTimer();
      unsubMatchState();
      unsubScore();
      unsubAnnouncement();
    };
  }, [subscribe, fieldId, displaySettings.displayMode, tournamentId]);

  // Robust timer countdown effect: always use latest timer state from server, prevent drift
  useEffect(() => {
    if (
      !timer?.isRunning ||
      typeof timer.remaining !== "number" ||
      timer.remaining <= 0
    )
      return;
    const interval = setInterval(() => {
      setTimer((prev: any) => {
        // Only decrement if still running and remaining > 0
        if (!prev?.isRunning || prev.remaining <= 0) return prev;
        // Decrement by 1000ms, but never go below 0
        return { ...prev, remaining: Math.max(0, prev.remaining - 1000) };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer?.isRunning, timer?.remaining]);

  // Effect to automatically update match period based on timer
  useEffect(() => {
    // Only update period if the timer is actively running
    if (timer && typeof timer.remaining === 'number' && timer.isRunning) {
      const remainingSeconds = Math.floor(timer.remaining / 1000);
      let newPeriod = ""; 

      // Timer counts down from 150 seconds (2:30)
      // Auto: 2:30 (150s) down to 2:01 (121s)
      // Teleop: 2:00 (120s) down to 0:31 (31s)
      // Endgame: 0:30 (30s) down to 0:00 (0s)
      if (remainingSeconds > 120) { 
        newPeriod = "auto";
      } else if (remainingSeconds > 30) { 
        newPeriod = "teleop";
      } else if (remainingSeconds >= 0) { 
        newPeriod = "endgame";
      } else {
        // Timer has gone below 0 or is in an unexpected state; do not attempt to set a period.
        return;
      }

      // Only update state if the calculated period is different from the current one.
      if (newPeriod && newPeriod !== matchState.currentPeriod) {
        console.log(`Timer-based period change: ${matchState.currentPeriod} -> ${newPeriod} (Remaining: ${remainingSeconds}s)`);
        setMatchState((prevMatchState: any) => ({
          ...prevMatchState,
          currentPeriod: newPeriod,
        }));
      }
    }
  }, [timer, matchState.currentPeriod]); // Dependency array includes timer and currentPeriod

  // Effect to handle announcement countdown
  useEffect(() => {
    if (!showAnnouncement) {
      setAnnouncementCountdown(null);
      return;
    }

    // Start with 10 seconds by default if countdown is not already set
    if (announcementCountdown === null) {
      setAnnouncementCountdown(10);
    }

    // Update countdown every second
    const intervalId = setInterval(() => {
      setAnnouncementCountdown((prev) => {
        if (prev === null || prev <= 1) {
          // Auto-hide announcement when countdown reaches 0
          if (prev === 1) setTimeout(() => setShowAnnouncement(false), 100);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [showAnnouncement, announcementCountdown]);

  // Debug component to show current display mode and other info
  const DebugInfo = () => {
    if (process.env.NODE_ENV !== "development") return null;

    return (
      <div className="text-xs bg-gray-800 text-white p-3 rounded-lg mt-4 border border-gray-600">
        <div className="font-semibold border-b border-gray-600 pb-1 mb-1">
          Debug Information
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            Mode:{" "}
            <span className="font-mono bg-blue-900 px-1 rounded">
              {displaySettings.displayMode}
            </span>
          </div>
          <div>
            Field: <span className="font-mono">{fieldId}</span>
          </div>
          <div>
            Tournament:{" "}
            <span className="font-mono">{tournamentId.substring(0, 8)}...</span>
          </div>
          <div>
            Connection:{" "}
            {isConnected ? (
              <span className="text-green-400">✓ Connected</span>
            ) : (
              <span className="text-red-400">✗ Disconnected</span>
            )}
          </div>
          <div>
            Last Update:{" "}
            <span className="font-mono">
              {new Date(displaySettings.updatedAt).toLocaleTimeString()}
            </span>
          </div>
          <div>
            Match State:{" "}
            <span className="font-mono">{matchState?.status || "none"}</span>
          </div>
          <div>
            Timer:{" "}
            <span className="font-mono">
              {timer?.isRunning ? "running" : "stopped"}
            </span>
          </div>
          <div>
            Match ID:{" "}
            <span className="font-mono">{matchState?.matchId || "none"}</span>
          </div>
        </div>
        <div className="mt-2 text-xs border-t border-gray-600 pt-1">
          <div>Match Data: {matchState ? "Present" : "Missing"}</div>
          {matchState && (
            <div className="grid grid-cols-2 gap-1 mt-1">
              <div>
                Number:{" "}
                <span className="font-mono">
                  {matchState.matchNumber || "none"}
                </span>
              </div>
              <div>
                Name:{" "}
                <span className="font-mono">{matchState.name || "none"}</span>
              </div>
              <div>
                Period:{" "}
                <span className="font-mono">
                  {matchState.currentPeriod || "none"}
                </span>
              </div>
              <div>
                Red Teams:{" "}
                <span className="font-mono">
                  {Array.isArray(matchState.redTeams)
                    ? matchState.redTeams.length
                    : "none"}
                </span>
              </div>
              <div>
                Blue Teams:{" "}
                <span className="font-mono">
                  {Array.isArray(matchState.blueTeams)
                    ? matchState.blueTeams.length
                    : "none"}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="text-right mt-1 pt-1 border-t border-gray-600">
          <span className="text-blue-300">
            Test with window.audienceDisplayWS
          </span>
        </div>
      </div>
    );
  };

  // Log match state changes for debugging
  useEffect(() => {
    if (matchState) {
      console.log("Match state updated:", {
        matchId: matchState.matchId,
        matchNumber: matchState.matchNumber,
        status: matchState.status,
        currentPeriod: matchState.currentPeriod,
        redTeams: Array.isArray(matchState.redTeams)
          ? matchState.redTeams.length
          : 0,
        blueTeams: Array.isArray(matchState.blueTeams)
          ? matchState.blueTeams.length
          : 0,
      });
    }
  }, [matchState]);

  // Render content based on display mode
  const renderContent = () => {
    // Force a key update every time display mode changes to ensure full re-render
    const contentKey = `${displaySettings.displayMode}-${displaySettings.updatedAt}`;
    console.log(
      `Rendering content for display mode: ${displaySettings.displayMode} with key: ${contentKey}`
    );

    switch (displaySettings.displayMode) {
      case "teams":
        return (
          <div key={contentKey}>
            <TeamsDisplay teams={teams} isLoading={isLoadingTeams} />
            <DebugInfo />
          </div>
        );

      case "schedule":
        return (
          <div key={contentKey}>
            <ScheduleDisplay
              tournamentId={tournamentId}
              matches={matches}
              isLoading={isLoadingMatches}
            />
            <DebugInfo />
          </div>
        );

      case "rankings":
        return (
          <div key={contentKey} className="text-center p-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">
              Tournament Rankings
            </h1>
            <p className="text-xl">Rankings display is coming soon...</p>
            <DebugInfo />
          </div>
        );

      case "blank":
        return (
          <div key={contentKey} className="min-h-screen">
            <DebugInfo />
          </div>
        );

      case "announcement":
        return (
          <div
            key={contentKey}
            className="flex flex-col items-center justify-center min-h-[70vh]"
          >
            <div className="bg-blue-100 p-10 rounded-xl max-w-4xl text-center shadow-xl border-2 border-blue-300">
              <h2 className="text-4xl font-bold mb-6 text-blue-800">
                ANNOUNCEMENT
              </h2>
              <p className="text-3xl">
                {displaySettings.message || "No announcement message"}
              </p>
            </div>
            <DebugInfo />
          </div>
        );
      case "match":
      default:
        // Display match information regardless of active match state
        return (
          <div key={contentKey}>
            <MatchDisplay matchState={matchState} timer={timer} score={score} />
            <DebugInfo />
          </div>
        );
    }
  };

  // Loading and error states
  if (isLoadingTournament || isLoadingFields) {
    return <LoadingDisplay connectionError={connectionError} />;
  }

  // Field not found error state
  if (fieldError) {
    return (
      <FieldNotFound
        fieldError={fieldError}
        onBack={() => router.push(`/audience-display/${tournamentId}`)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <AnnouncementOverlay
        announcement={announcement}
        showAnnouncement={showAnnouncement}
        announcementCountdown={announcementCountdown}
      />
      {/* Header with tournament and field info */}
      <header className="mb-8">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-lg shadow-lg text-white">
            <h1 className="text-3xl font-bold text-center mb-2">
              {tournament?.name || "Tournament"} - Field{" "}
              {field?.number || field?.name || fieldId}
            </h1>
            <p className="text-center text-sm">
              {isConnected ? (
                <span className="text-green-400 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                  Connected to Field {field?.number || field?.name || fieldId}
                </span>
              ) : (
                <span className="text-red-400 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"></span>
                  Disconnected - Attempting to reconnect...
                </span>
              )}
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-center text-xs text-blue-300 mt-1">
                WebSocket testing interface available at{" "}
                <code>window.audienceDisplayWS</code>
              </p>
            )}
          </div>
        </div>
      </header>{" "}
      {/* Main content area */}
      <main className="container mx-auto bg-gray-800 rounded-xl shadow-lg p-8 text-white">
        {connectionError ? (
          <div
            className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-6"
            role="alert"
          >
            <p className="font-bold">Connection Error</p>
            <p>{connectionError}</p>
          </div>
        ) : fieldError ? (
          <div
            className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-6"
            role="alert"
          >
            <p className="font-bold">Field Not Found</p>
            <p>{fieldError}</p>
          </div>
        ) : (
          renderContent()
        )}
      </main>
      {/* Footer */}{" "}
      <footer className="container mx-auto mt-8 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} Robotics Tournament Management System
        </p>
      </footer>
    </div>
  );
}

// Add CSS for text-shadow to improve scoreboard visibility
const styles = `
  .text-shadow-xl {
    text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
  }
`;

// Inject styles into the document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
