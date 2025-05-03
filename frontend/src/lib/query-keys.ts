/**
 * Query keys for TanStack Query
 * 
 * This file defines all the query keys used in the application,
 * making it easy to manage cache invalidation and dependencies.
 */
export const QueryKeys = {
  // Auth related queries
  auth: {
    user: () => ['auth', 'user'],
  },
  
  // Tournament related queries
  tournaments: {
    all: () => ['tournaments'],
    byId: (id: string) => ['tournaments', id],
    mine: () => ['tournaments', 'mine'],
  },
  
  // Stage related queries
  stages: {
    all: () => ['stages'],
    byId: (id: string) => ['stages', id],
    byTournament: (tournamentId: string) => ['stages', 'tournament', tournamentId],
  },
  
  // Match related queries
  matches: {
    all: () => ['matches'],
    byId: (id: string) => ['matches', id],
    byStage: (stageId: string) => ['matches', 'stage', stageId],
    byTournament: (tournamentId: string) => ['matches', 'tournament', tournamentId],
  },
  
  // Team related queries
  teams: {
    all: () => ['teams'],
    byId: (id: string) => ['teams', id],
    byTournament: (tournamentId: string) => ['teams', 'tournament', tournamentId],
    rankings: (stageId: string) => ['teams', 'rankings', stageId],
  },
  
  // Match scores related queries
  matchScores: {
    byMatch: (matchId: string) => ['match-scores', matchId],
  },
  
  // User related queries
  users: {
    all: () => ['users'],
    byId: (id: string) => ['users', id],
  },
};