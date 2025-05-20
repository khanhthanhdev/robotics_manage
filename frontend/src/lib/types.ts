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

export enum MatchType {
  FULL = "FULL",
  TELEOP_ENDGAME = "TELEOP_ENDGAME"
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

export interface MatchResponse {
  id: string;
  matchNumber: number;
  roundNumber: number;
  status: MatchStatus;
  startTime: string | null;
  scheduledTime: string | null;
  endTime: string | null;
  duration: number | null;
  winningAlliance: string | null;
  stageId: string;
  scoredById: string | null;
  createdAt: string;
  updatedAt: string;
  matchType?: string;
  fieldNumber?: number | null;
  stage: {
    id: string;
    name: string;
    type: string;
    startDate: string;
    endDate: string;
    tournamentId: string;
    createdAt: string;
    updatedAt: string;
    tournament: {
      id: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      createdAt: string;
      updatedAt: string;
      adminId: string;
    };
  };
  alliances: Array<{
    id: string;
    color: string;
    score: number;
    matchId: string;
    createdAt: string;
    updatedAt: string;
    teamAlliances: Array<{
      id: string;
      teamId: string;
      allianceId: string;
      stationPosition: number;
      isSurrogate: boolean;
      createdAt: string;
      updatedAt: string;
      team: {
        id: string;
        teamNumber: string;
        name: string;
        organization: string | null;
        avatar: string | null;
        description: string | null;
        teamMembers: string | null;
        tournamentId: string;
        createdAt: string;
        updatedAt: string;
      };
    }>;
    allianceScoring: any | null;
  }>;
  scoredBy: any | null;
}

