import { MatchData } from "./websocket-service";

export interface Match {
  id: string;
  matchNumber: number;
  tournamentId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  scheduledStartTime: string;
  redTeams: string[];
  blueTeams: string[];
}

export async function fetchMatches(tournamentId: string): Promise<Match[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/matches`;
    const response = await fetch(`${apiUrl}?tournamentId=${tournamentId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch matches: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export async function fetchMatchById(matchId: string): Promise<Match | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/matches/${matchId}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch match: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching match ${matchId}:`, error);
    return null;
  }
}