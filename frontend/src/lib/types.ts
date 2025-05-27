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

