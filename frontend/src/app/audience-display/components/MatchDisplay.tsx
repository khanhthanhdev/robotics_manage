import React from "react";
import { formatTime } from "./audienceDisplayUtils";

interface Team {
  name: string;
}

interface MatchState {
  matchId: string | null;
  matchNumber: string | null;
  name: string | null;
  status: string | null;
  currentPeriod: string | null;
  redTeams: Team[];
  blueTeams: Team[];
}

interface TimerState {
  isRunning: boolean;
  remaining: number;
  initial?: number;
  phase?: string;
}

interface ScoreState {
  redTotalScore?: number;
  blueTotalScore?: number;
  redAutoScore?: number;
  redDriveScore?: number;
  blueAutoScore?: number;
  blueDriveScore?: number;
}

interface MatchDisplayProps {
  matchState: MatchState;
  timer: TimerState;
  score: ScoreState;
}

export const MatchDisplay: React.FC<MatchDisplayProps> = ({ matchState, timer, score }) => (
  <>
    {/* Match Info */}
    <div className="mb-6 text-center">
      <div className="bg-gradient-to-r from-gray-800 to-blue-900 py-5 px-6 rounded-xl shadow-lg border-b-4 border-yellow-400">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-white uppercase tracking-wide">
              {matchState?.matchNumber || matchState?.name || matchState?.matchId
                ? `Match ${matchState.matchNumber || matchState.name || "Unknown"}`
                : "Match Information"}
            </h2>
            <p className="text-sm font-medium text-blue-300 mt-1">
              {matchState?.matchId
                ? `ID: ${matchState.matchId}`
                : matchState?.redTeams?.length > 0 || matchState?.blueTeams?.length > 0
                ? "Teams ready for match"
                : "Waiting for match selection..."}
            </p>
          </div>
          <div className="flex-1 text-right">
            <div className="inline-block bg-blue-800 text-white text-xl px-4 py-2 rounded-lg font-bold uppercase">
              {matchState?.currentPeriod ? (
                <span className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 mr-2 rounded-full ${
                      matchState.currentPeriod === "auto"
                        ? "bg-yellow-400"
                        : matchState.currentPeriod === "teleop"
                        ? "bg-green-400"
                        : matchState.currentPeriod === "endgame"
                        ? "bg-red-400"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {matchState.currentPeriod.toUpperCase()}
                </span>
              ) : (
                "SETUP"
              )}
            </div>
            <div className="mt-2 text-lg font-semibold text-yellow-300">
              Status: {matchState?.status ? matchState.status.replace(/_/g, " ").toUpperCase() : "PENDING"}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-12 text-white">
          <div className="text-left">
            <h3 className="text-lg font-bold text-red-400">RED ALLIANCE</h3>
            <p className="text-md">
              {Array.isArray(matchState?.redTeams) && matchState.redTeams.length > 0
                ? matchState.redTeams.filter((t) => t && t.name).map((t) => t.name).join(", ")
                : "Teams TBD"}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-blue-400">BLUE ALLIANCE</h3>
            <p className="text-md">
              {Array.isArray(matchState?.blueTeams) && matchState.blueTeams.length > 0
                ? matchState.blueTeams.filter((t) => t && t.name).map((t) => t.name).join(", ")
                : "Teams TBD"}
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Timer Clock */}
    <div className="flex flex-col items-center mb-8 bg-black text-white p-4 rounded-xl shadow-xl border-4 border-gray-700">
      <div className="w-full flex justify-between items-center mb-2">
        <h2 className="text-xl uppercase font-bold text-gray-300">Match Timer</h2>
        {timer && (
          <div className="flex items-center">
            <span
              className={`inline-block w-4 h-4 rounded-full mr-2 ${
                timer.isRunning
                  ? "bg-green-500 animate-pulse"
                  : timer?.remaining === 0
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            ></span>
            <span className="font-mono text-sm">
              {timer.isRunning
                ? "RUNNING"
                : timer?.remaining === 0
                ? "COMPLETED"
                : "PAUSED"}
            </span>
          </div>
        )}
      </div>
      <div className="bg-gray-900 w-full p-4 rounded-lg mb-2">
        <div
          className={`text-8xl font-extrabold font-mono tracking-wider text-center ${
            timer?.isRunning
              ? "text-green-400 animate-pulse"
              : timer?.remaining === 0
              ? "text-red-400"
              : "text-yellow-300"
          }`}
        >
          {formatTime(timer?.remaining ?? 0)}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full text-center">
        <div className="bg-gray-800 p-2 rounded">
          <div className="text-xs text-gray-400">PERIOD</div>
          <div className="text-lg font-bold">
            {matchState?.currentPeriod
              ? matchState.currentPeriod.toUpperCase()
              : timer?.phase
              ? timer.phase.toUpperCase()
              : "—"}
          </div>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <div className="text-xs text-gray-400">STATUS</div>
          <div className="text-lg font-bold">
            {matchState?.status
              ? matchState.status.replace(/_/g, " ").toUpperCase()
              : "STANDBY"}
          </div>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <div className="text-xs text-gray-400">ELAPSED</div>
          <div className="text-lg font-bold">
            {formatTime((timer?.initial || 0) - (timer?.remaining || 0))}
          </div>
        </div>
      </div>
    </div>
    {/* Scoreboard */}
    <div className="relative mb-8">
      <div className="scoreboard-container border-4 border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2 gap-0 bg-black">
          {/* Header */}
          <div className="col-span-2 bg-gradient-to-r from-gray-800 to-gray-900 p-3 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-wider uppercase">
              Match Scoreboard
            </h2>
          </div>
          {/* Alliance Headers */}
          <div className="bg-red-800 text-white text-center p-3 border-r-2 border-gray-800">
            <h3 className="text-4xl font-extrabold tracking-wider">RED</h3>
          </div>
          <div className="bg-blue-800 text-white text-center p-3 border-l-2 border-gray-800">
            <h3 className="text-4xl font-extrabold tracking-wider">BLUE</h3>
          </div>
          {/* Main Score Display */}
          <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-6 flex justify-center items-center border-r-2 border-gray-800">
            <div className="text-9xl font-extrabold text-red-100 text-shadow-xl">
              {score?.redTotalScore || 0}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 flex justify-center items-center border-l-2 border-gray-800">
            <div className="text-9xl font-extrabold text-blue-100 text-shadow-xl">
              {score?.blueTotalScore || 0}
            </div>
          </div>
          {/* Score Breakdown */}
          <div className="bg-red-100 p-4 border-t-2 border-r-2 border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-lg font-bold text-red-800">Auto:</p>
                <p className="text-lg font-bold text-red-800">TeleOp:</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-900">{score?.redAutoScore || 0}</p>
                <p className="text-lg font-bold text-red-900">{score?.redDriveScore || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 border-t-2 border-l-2 border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-lg font-bold text-blue-800">Auto:</p>
                <p className="text-lg font-bold text-blue-800">TeleOp:</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-900">{score?.blueAutoScore || 0}</p>
                <p className="text-lg font-bold text-blue-900">{score?.blueDriveScore || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
