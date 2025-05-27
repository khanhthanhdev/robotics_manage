export enum MatchStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export enum CardType {
  NONE = "NONE",
  YELLOW = "YELLOW",
  RED = "RED"
}

export enum UserRole {
  ADMIN = "ADMIN",
  HEAD_REFEREE = "HEAD_REFEREE",
  ALLIANCE_REFEREE = "ALLIANCE_REFEREE"
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  admin?: {
    id: string;
    username: string;
  };
  numberOfFields?: number;
}

// --- Audience Display Types ---

export type DisplayMode =
  | "intro"
  | "queue"
  | "active"
  | "results"
  | "standings"
  | "awards"
  | "custom";

export interface AudienceDisplaySettings {
  displayMode: DisplayMode;
  matchId?: string | null;
  showTimer?: boolean;
  showScores?: boolean;
  showTeams?: boolean;
  message?: string;
  timerStartedAt?: number | null;
  updatedAt: number;
}

// --- Field ---
export interface Field {
  id: string;
  name: string;
  number: number;
  location?: string;
  description?: string;
  tournamentId: string;
}

// --- Match ---
export interface Match {
  id: string;
  matchNumber: number;
  roundNumber?: number;
  status: string;
  startTime?: string;
  scheduledTime?: string;
  endTime?: string;
  duration?: number;
  winningAlliance?: "RED" | "BLUE";
  stageId: string;
  fieldId?: string;
  fieldNumber?: number;
  matchType?: string;
  matchDuration?: number;
  alliances: Alliance[];
}

// --- Alliance ---
export interface Alliance {
  id: string;
  color: "RED" | "BLUE";
  score: number;
  teamAlliances: TeamAlliance[];
}

export interface TeamAlliance {
  id: string;
  teamId: string;
  stationPosition: number;
  isSurrogate: boolean;
  team: Team;
}

// --- Team ---
export interface Team {
  id: string;
  teamNumber: string;
  name: string;
  organization?: string;
  avatar?: string;
  description?: string;
  teamMembers?: any[];
  tournamentId?: string;
}

// --- Rankings/Stats ---
export interface TeamStats {
  id: string;
  teamId: string;
  tournamentId: string;
  wins: number;
  losses: number;
  ties: number;
  pointsScored: number;
  pointsConceded: number;
  matchesPlayed: number;
  rankingPoints: number;
  rank?: number;
  tiebreaker1?: number;
  tiebreaker2?: number;
}

// --- Preset/Template Types ---
export interface DisplayTemplate {
  id: string;
  name: string;
  layout: "full" | "split" | "minimal";
  components: Array<"scoreboard" | "timer" | "teams" | "rankings" | "custom">;
}

// --- Error/Loading States ---
export interface DisplayError {
  message: string;
  code?: string;
}

export interface LoadingState {
  loading: boolean;
  message?: string;
}

// --- WebSocket/Real-time Types ---

export interface TimerData {
  duration: number;
  remaining: number;
  isRunning: boolean;
  startedAt?: number;
  pausedAt?: number;
  tournamentId: string;
  fieldId?: string;
}

export interface MatchData {
  id: string;
  matchNumber: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  tournamentId: string;
  // Add other match properties as needed
}

export interface ScoreData {
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  tournamentId: string;
  redGameElements?: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }> | Record<string, number>;
  blueGameElements?: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }> | Record<string, number>;
  redTeamCount?: number;
  redMultiplier?: number;
  blueTeamCount?: number;
  blueMultiplier?: number;
  scoreDetails?: Record<string, any>;
}

export interface MatchStateData {
  matchId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  currentPeriod?: 'auto' | 'teleop' | 'endgame' | null;
  tournamentId: string;
}

export interface AnnouncementData {
  message: string;
  tournamentId: string;
  fieldId?: string;
  duration?: number;
}

export type EventCallback<T> = (data: T) => void;

export type WebSocketEvent =
  | 'display_mode_change'
  | 'match_update'
  | 'score_update'
  | 'timer_update'
  | 'match_state_change'
  | 'announcement';

