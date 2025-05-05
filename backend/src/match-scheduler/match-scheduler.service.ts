import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Match as PrismaMatch, StageType } from '../utils/prisma-types';

// Internal Match interface for scheduling algorithm
interface Match {
  matchNumber: number;
  redAlliance: number[];
  blueAlliance: number[];
  surrogates?: number[];
}

interface Schedule {
  matches: Match[];
  score: number;
  // Track teams' appearances and partners/opponents for scoring
  teamStats: Map<number, {
    appearances: number[];
    partners: Map<number, number>;
    opponents: Map<number, number>;
    redCount: number;
    blueCount: number;
    stationAppearances: number[];
  }>;
}

// Store bracket advancement metadata
interface BracketAdvancement {
  matchId: string;
  nextMatchId: string;
  advancesAs: 'RED' | 'BLUE';
}

/**
 * Service responsible for scheduling matches in FRC competitions.
 * Implements different scheduling algorithms for qualification, swiss rounds, and playoff brackets.
 */
@Injectable()
export class MatchSchedulerService {
  // Constants for the algorithm - UPDATED for 2 teams per alliance
  private readonly RED_ALLIANCE_SIZE = 2; // Changed from 3 to 2
  private readonly BLUE_ALLIANCE_SIZE = 2; // Changed from 3 to 2
  private readonly TEAMS_PER_MATCH = 4; // Changed from 6 to 4
  private readonly STATIONS_PER_ALLIANCE = 2; // Changed from 3 to 2
  
  // Scoring weights
  private readonly PARTNER_REPEAT_WEIGHT = 3.0;
  private readonly OPPONENT_REPEAT_WEIGHT = 2.0;
  private readonly GENERAL_REPEAT_WEIGHT = 1.0;
  
  // Simulated annealing parameters
  private readonly INITIAL_TEMPERATURE = 100.0;
  private readonly COOLING_RATE = 0.95;
  private readonly MIN_TEMPERATURE = 0.01;
  private readonly ITERATIONS_PER_TEMPERATURE = 100;

  // Store bracket advancement information
  private bracketAdvancements: BracketAdvancement[] = [];

  constructor(private readonly prisma: PrismaService) {}
  
  /**
   * Helper method to create initial match scores with 0-0 for all new matches
   * This ensures that score data is always available when requested
   * 
   * @param matchId ID of the match to create scores for
   * @returns Created match score record
   */
  private async createInitialMatchScore(matchId: string) {
    return this.prisma.matchScores.create({
      data: {
        matchId,
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
        redGameElements: {},
        blueGameElements: {},
        scoreDetails: {
          penalties: {
            red: 0,
            blue: 0
          },
          specialScoring: {
            endgameClimb: {
              red: 0,
              blue: 0
            }
          }
        }
      }
    });
  }

  /**
   * Generates an FRC-style schedule using simulated annealing algorithm.
   * This creates a balanced schedule where each team plays in a specified number of rounds.
   * 
   * @param stageId ID of the stage to generate matches for
   * @param rounds Number of rounds each team should play
   * @param teamsPerAlliance Number of teams per alliance (defaults to 2)
   * @param minMatchSeparation Minimum number of matches between team appearances
   * @param maxIterations Maximum number of optimization iterations
   * @param qualityLevel Scheduling quality level (low, medium, high)
   * @returns Array of created match objects
   */
  async generateFrcSchedule(
    stageId: string, 
    rounds: number, 
    teamsPerAlliance: number = this.RED_ALLIANCE_SIZE, 
    minMatchSeparation: number = 1,
    maxIterations?: number,
    qualityLevel: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<PrismaMatch[]> {
    // Validate teams per alliance
    if (teamsPerAlliance !== this.RED_ALLIANCE_SIZE) {
      console.warn(`Requested ${teamsPerAlliance} teams per alliance, but currently only ${this.RED_ALLIANCE_SIZE} is supported.`);
      teamsPerAlliance = this.RED_ALLIANCE_SIZE;
    }
    
    // 1. Get all teams in this stage/tournament
    const stage = await this.prisma.stage.findUnique({
      where: { id: stageId },
      include: {
        tournament: {
          include: {
            teams: true
          }
        }
      }
    });
    
    if (!stage) {
      throw new Error(`Stage with ID ${stageId} not found`);
    }
    
    const teams = stage.tournament.teams;
    const numTeams = teams.length;
    
    if (numTeams < this.TEAMS_PER_MATCH) {
      throw new Error(`Not enough teams (${numTeams}) to create a schedule. Minimum required: ${this.TEAMS_PER_MATCH}`);
    }
    
    // Map team objects to numeric IDs for the scheduler
    const teamIdMap = new Map<number, string>();
    const teamNumberMap = new Map<number, string>();
    teams.forEach((team, idx) => {
      const numId = idx + 1;
      teamIdMap.set(numId, team.id);
      teamNumberMap.set(numId, team.teamNumber);
    });
    
    // Configure simulated annealing parameters based on quality level
    const iterationsMap = {
      low: 5000,
      medium: 10000,
      high: 25000
    };
    
    const iterations = maxIterations || iterationsMap[qualityLevel];
    
    console.log(`Generating schedule with ${rounds} rounds for ${numTeams} teams using ${iterations} iterations...`);
    
    // 2. Generate initial schedule
    let schedule = this.generateInitialSchedule(numTeams, rounds);
    
    // 3. Optimize using simulated annealing
    schedule = this.optimizeSchedule(schedule, iterations, minMatchSeparation);
    
    console.log(`Schedule generated with score ${schedule.score}`);
    
    // 4. Convert internal schedule to database matches
    const createdMatches: PrismaMatch[] = [];
    let matchNumber = 1;
    
    // Create database transactions for all matches
    for (const match of schedule.matches) {
      // Map numeric team IDs back to actual team IDs
      const redTeamIds = match.redAlliance.map(id => teamIdMap.get(id));
      const blueTeamIds = match.blueAlliance.map(id => teamIdMap.get(id));
      
      // Create match in database with proper alliances and teams
      const dbMatch = await this.prisma.match.create({
        data: {
          stageId,
          matchNumber: matchNumber++,
          roundNumber: 1, // All qualification matches are in round 1
          scheduledTime: new Date(Date.now() + ((matchNumber - 1) * 6 * 60 * 1000)), // Schedule 6 minutes apart
          status: 'PENDING',
          alliances: {
            create: [
              {
                color: 'RED',
                teamAlliances: {
                  create: redTeamIds.map((teamId, idx) => ({
                    stationPosition: idx + 1,
                    isSurrogate: match.surrogates?.includes(match.redAlliance[idx]) || false,
                    team: {
                      connect: { id: teamId }
                    }
                  }))
                }
              },
              {
                color: 'BLUE',
                teamAlliances: {
                  create: blueTeamIds.map((teamId, idx) => ({
                    stationPosition: idx + 1,
                    isSurrogate: match.surrogates?.includes(match.blueAlliance[idx]) || false,
                    team: {
                      connect: { id: teamId }
                    }
                  }))
                }
              }
            ]
          }
        },
        include: {
          stage: {
            select: {
              name: true
            }
          },
          alliances: {
            include: {
              teamAlliances: {
                include: {
                  team: true
                }
              }
            }
          }
        }
      });
      
      // Create initial match score record
      await this.createInitialMatchScore(dbMatch.id);
      
      createdMatches.push(dbMatch as any);
    }
    
    return createdMatches;
  }
  
  /**
   * Optimizes a schedule using simulated annealing algorithm.
   * This improves the schedule quality by minimizing partner/opponent repeats
   * and ensuring teams don't play consecutive matches.
   * 
   * @param schedule Initial schedule to optimize
   * @param maxIterations Maximum number of optimization iterations
   * @param minMatchSeparation Minimum matches between team appearances
   * @returns Optimized schedule
   */
  private optimizeSchedule(schedule: Schedule, maxIterations: number, minMatchSeparation: number): Schedule {
    // Calculate initial schedule score
    schedule.score = this.calculateScheduleScore(schedule, minMatchSeparation);
    let bestSchedule = this.cloneSchedule(schedule);
    let bestScore = schedule.score;
    
    // Simulated annealing parameters
    let temperature = this.INITIAL_TEMPERATURE;
    
    for (let iteration = 0; iteration < maxIterations && temperature > this.MIN_TEMPERATURE; iteration++) {
      // Periodically report progress
      if (iteration % 1000 === 0) {
        console.log(`Iteration ${iteration}, Temperature: ${temperature.toFixed(2)}, Score: ${schedule.score.toFixed(2)}, Best: ${bestScore.toFixed(2)}`);
      }
      
      // 1. Create a neighboring schedule by swapping teams
      const neighbor = this.generateNeighborSchedule(schedule);
      
      // 2. Calculate new score
      const neighborScore = this.calculateScheduleScore(neighbor, minMatchSeparation);
      neighbor.score = neighborScore;
      
      // 3. Decide whether to accept this new schedule
      const acceptanceProbability = this.calculateAcceptanceProbability(
        schedule.score, neighborScore, temperature
      );
      
      if (acceptanceProbability > Math.random()) {
        schedule = neighbor;
        
        // Update best schedule if this is better
        if (schedule.score < bestScore) {
          bestSchedule = this.cloneSchedule(schedule);
          bestScore = schedule.score;
        }
      }
      
      // 4. Cool down temperature
      if (iteration % this.ITERATIONS_PER_TEMPERATURE === 0) {
        temperature *= this.COOLING_RATE;
      }
    }
    
    console.log(`Final score: ${bestScore}`);
    return bestSchedule;
  }
  
  /**
   * Calculates the acceptance probability for simulated annealing.
   * This uses the Metropolis acceptance criterion.
   */
  private calculateAcceptanceProbability(currentScore: number, newScore: number, temperature: number): number {
    // If new solution is better, always accept
    if (newScore < currentScore) {
      return 1.0;
    }
    
    // If temperature is effectively zero, reject worse solutions
    if (temperature < 0.0001) {
      return 0.0;
    }
    
    // Calculate acceptance probability using Metropolis criterion
    const scoreDelta = newScore - currentScore;
    return Math.exp(-scoreDelta / temperature);
  }
  
  /**
   * Generates a neighboring schedule by swapping teams between matches.
   * This creates a small variation of the current schedule.
   */
  private generateNeighborSchedule(schedule: Schedule): Schedule {
    const newSchedule = this.cloneSchedule(schedule);
    const matches = newSchedule.matches;
    
    // Random operation: swap 2 teams between different matches
    if (matches.length >= 2) {
      // Choose 2 random matches
      const match1Index = Math.floor(Math.random() * matches.length);
      let match2Index = Math.floor(Math.random() * (matches.length - 1));
      if (match2Index >= match1Index) match2Index++;
      
      const match1 = matches[match1Index];
      const match2 = matches[match2Index];
      
      // Choose which alliances to modify
      const alliance1 = Math.random() < 0.5 ? 'redAlliance' : 'blueAlliance';
      const alliance2 = Math.random() < 0.5 ? 'redAlliance' : 'blueAlliance';
      
      // Choose team positions to swap
      const pos1 = Math.floor(Math.random() * this.RED_ALLIANCE_SIZE);
      const pos2 = Math.floor(Math.random() * this.RED_ALLIANCE_SIZE);
      
      // Swap teams
      const tmp = match1[alliance1][pos1];
      match1[alliance1][pos1] = match2[alliance2][pos2];
      match2[alliance2][pos2] = tmp;
      
      // Update team stats in schedule
      this.recalculateTeamStats(newSchedule);
    }
    
    return newSchedule;
  }
  
  /**
   * Recalculates team statistics for a schedule.
   * This updates the appearance counts, partner/opponent counts, and other stats.
   */
  private recalculateTeamStats(schedule: Schedule): void {
    // Clear the team stats
    for (const team of schedule.teamStats.keys()) {
      schedule.teamStats.set(team, {
        appearances: [],
        partners: new Map(),
        opponents: new Map(),
        redCount: 0,
        blueCount: 0,
        stationAppearances: Array(this.STATIONS_PER_ALLIANCE * 2).fill(0) // Track stations 0-3
      });
    }
    
    // Recalculate team stats for all matches
    for (let matchIndex = 0; matchIndex < schedule.matches.length; matchIndex++) {
      this.updateTeamStats(schedule, schedule.matches[matchIndex], matchIndex);
    }
  }
  
  /**
   * Clones a schedule object to allow manipulation without affecting original.
   */
  private cloneSchedule(schedule: Schedule): Schedule {
    const clonedMatches = schedule.matches.map(match => ({
      matchNumber: match.matchNumber,
      redAlliance: [...match.redAlliance],
      blueAlliance: [...match.blueAlliance],
      surrogates: match.surrogates ? [...match.surrogates] : undefined
    }));
    
    // Clone team stats
    const clonedTeamStats = new Map();
    for (const [team, stats] of schedule.teamStats.entries()) {
      const clonedPartners = new Map();
      for (const [partner, count] of stats.partners.entries()) {
        clonedPartners.set(partner, count);
      }
      
      const clonedOpponents = new Map();
      for (const [opponent, count] of stats.opponents.entries()) {
        clonedOpponents.set(opponent, count);
      }
      
      clonedTeamStats.set(team, {
        appearances: [...stats.appearances],
        partners: clonedPartners,
        opponents: clonedOpponents,
        redCount: stats.redCount,
        blueCount: stats.blueCount,
        stationAppearances: [...stats.stationAppearances]
      });
    }
    
    return {
      matches: clonedMatches,
      score: schedule.score,
      teamStats: clonedTeamStats
    };
  }
  
  /**
   * Calculates the score for a schedule.
   * Lower scores are better, with 0 being theoretically perfect.
   * 
   * @param schedule The schedule to score
   * @param minMatchSeparation Minimum matches between team appearances
   * @returns Numerical score (lower is better)
   */
  private calculateScheduleScore(schedule: Schedule, minMatchSeparation: number): number {
    let score = 0;
    
    // Check each team's stats
    for (const [_, stats] of schedule.teamStats.entries()) {
      // 1. Partner and opponent repeats
      for (const [_, partnerCount] of stats.partners.entries()) {
        if (partnerCount > 1) {
          score += this.PARTNER_REPEAT_WEIGHT * (partnerCount - 1);
        }
      }
      
      for (const [_, opponentCount] of stats.opponents.entries()) {
        if (opponentCount > 1) {
          score += this.OPPONENT_REPEAT_WEIGHT * (opponentCount - 1);
        }
      }
      
      // 2. Match separation
      for (let i = 0; i < stats.appearances.length - 1; i++) {
        const currentMatch = stats.appearances[i];
        const nextMatch = stats.appearances[i + 1];
        const separation = nextMatch - currentMatch;
        
        if (separation < minMatchSeparation) {
          score += (minMatchSeparation - separation) * 10;
        }
      }
      
      // 3. Balance red/blue alliances
      const redBlueImbalance = Math.abs(stats.redCount - stats.blueCount);
      score += redBlueImbalance * 2;
      
      // 4. Balance station positions
      const expectedAppearancesPerStation = stats.appearances.length / (this.STATIONS_PER_ALLIANCE * 2);
      for (const stationCount of stats.stationAppearances) {
        score += Math.abs(stationCount - expectedAppearancesPerStation) * 0.5;
      }
    }
    
    return score;
  }

  /**
   * Updates team stats based on a match assignment.
   * Tracks team appearances, partners, opponents, and positions.
   */
  private updateTeamStats(schedule: Schedule, match: Match, matchIndex?: number): void {
    const matchNum = matchIndex !== undefined ? matchIndex : match.matchNumber - 1;
    
    // Process red alliance
    for (let i = 0; i < match.redAlliance.length; i++) {
      const team = match.redAlliance[i];
      const teamStats = schedule.teamStats.get(team);
      
      if (teamStats) {
        // Record match appearance
        teamStats.appearances.push(matchNum);
        teamStats.redCount++;
        
        // Record station position (0-based: Red1=0, Red2=1, Blue1=2, Blue2=3)
        teamStats.stationAppearances[i]++;
        
        // Record partners
        for (let j = 0; j < match.redAlliance.length; j++) {
          if (i === j) continue;
          const partner = match.redAlliance[j];
          const currentCount = teamStats.partners.get(partner) || 0;
          teamStats.partners.set(partner, currentCount + 1);
        }
        
        // Record opponents
        for (const opponent of match.blueAlliance) {
          const currentCount = teamStats.opponents.get(opponent) || 0;
          teamStats.opponents.set(opponent, currentCount + 1);
        }
      }
    }
    
    // Process blue alliance
    for (let i = 0; i < match.blueAlliance.length; i++) {
      const team = match.blueAlliance[i];
      const teamStats = schedule.teamStats.get(team);
      
      if (teamStats) {
        // Record match appearance
        teamStats.appearances.push(matchNum);
        teamStats.blueCount++;
        
        // Record station position (Blue1=2, Blue2=3)
        teamStats.stationAppearances[i + this.STATIONS_PER_ALLIANCE]++;
        
        // Record partners
        for (let j = 0; j < match.blueAlliance.length; j++) {
          if (i === j) continue;
          const partner = match.blueAlliance[j];
          const currentCount = teamStats.partners.get(partner) || 0;
          teamStats.partners.set(partner, currentCount + 1);
        }
        
        // Record opponents
        for (const opponent of match.redAlliance) {
          const currentCount = teamStats.opponents.get(opponent) || 0;
          teamStats.opponents.set(opponent, currentCount + 1);
        }
      }
    }
  }

  /**
   * Generates initial schedule before optimization.
   * Creates a naive schedule with teams assigned to matches.
   * 
   * @param numTeams Total number of teams
   * @param rounds Number of rounds each team plays
   * @returns Initial schedule
   */
  private generateInitialSchedule(numTeams: number, rounds: number): Schedule {
    const matches: Match[] = [];
    const totalMatches = Math.ceil((numTeams * rounds) / this.TEAMS_PER_MATCH);
    
    console.log(`Generating initial schedule with ${totalMatches} matches`);
    
    // Initialize team stats tracking
    const teamStats = new Map();
    for (let i = 1; i <= numTeams; i++) {
      teamStats.set(i, {
        appearances: [],
        partners: new Map(),
        opponents: new Map(),
        redCount: 0,
        blueCount: 0,
        stationAppearances: Array(this.STATIONS_PER_ALLIANCE * 2).fill(0) // Track stations 0-3
      });
    }
    
    // Generate matches by cycling through teams
    let matchNumber = 1;
    let matchesNeeded = totalMatches;
    
    // For even number of teams, create a simple rotating schedule
    if (numTeams % this.TEAMS_PER_MATCH === 0) {
      while (matchesNeeded > 0) {
        const match: Match = {
          matchNumber: matchNumber++,
          redAlliance: [],
          blueAlliance: []
        };
        
        // Assign teams to alliances in a cyclic fashion
        for (let i = 0; i < this.RED_ALLIANCE_SIZE; i++) {
          const teamIndex = ((matchNumber - 1) * this.TEAMS_PER_MATCH + i) % numTeams;
          match.redAlliance.push(teamIndex + 1); // Teams are 1-indexed
        }
        
        for (let i = 0; i < this.BLUE_ALLIANCE_SIZE; i++) {
          const teamIndex = ((matchNumber - 1) * this.TEAMS_PER_MATCH + i + this.RED_ALLIANCE_SIZE) % numTeams;
          match.blueAlliance.push(teamIndex + 1); // Teams are 1-indexed
        }
        
        matches.push(match);
        this.updateTeamStats({ matches, score: 0, teamStats }, match, matches.length - 1);
        
        matchesNeeded--;
      }
    } else {
      // For uneven number of teams, use surrogates to balance the schedule
      const teamAppearances = Array(numTeams + 1).fill(0); // 1-indexed
      const surrogates: number[] = [];
      
      while (matchesNeeded > 0) {
        const match: Match = {
          matchNumber: matchNumber++,
          redAlliance: [],
          blueAlliance: [],
          surrogates: []
        };
        
        // Find teams that have played the fewest matches
        const sortedTeams = Array.from({ length: numTeams }, (_, i) => i + 1)
          .sort((a, b) => teamAppearances[a] - teamAppearances[b]);
        
        // Assign to red alliance
        for (let i = 0; i < this.RED_ALLIANCE_SIZE; i++) {
          if (match.redAlliance.length < this.RED_ALLIANCE_SIZE) {
            const team = sortedTeams[i];
            match.redAlliance.push(team);
            teamAppearances[team]++;
          }
        }
        
        // Assign to blue alliance
        for (let i = 0; i < this.BLUE_ALLIANCE_SIZE; i++) {
          if (match.blueAlliance.length < this.BLUE_ALLIANCE_SIZE) {
            const team = sortedTeams[i + this.RED_ALLIANCE_SIZE];
            match.blueAlliance.push(team);
            teamAppearances[team]++;
          }
        }
        
        matches.push(match);
        this.updateTeamStats({ matches, score: 0, teamStats }, match, matches.length - 1);
        
        matchesNeeded--;
      }
    }
    
    return { matches, score: 0, teamStats };
  }
  
  /**
   * Generates a Swiss-style tournament round.
   * Teams with similar records play against each other.
   * 
   * @param stageId ID of the stage
   * @param currentRoundNumber Current round number
   * @returns Array of created match objects
   */
  async generateSwissRound(stageId: string, currentRoundNumber: number): Promise<PrismaMatch[]> {
    // Get stage and teams
    const stage = await this.prisma.stage.findUnique({
      where: { id: stageId },
      include: {
        tournament: {
          include: {
            teams: true
          }
        }
      }
    });
    
    if (!stage) {
      throw new Error(`Stage with ID ${stageId} not found`);
    }
    
    if (stage.type !== StageType.SWISS) {
      throw new Error(`Stage with ID ${stageId} is not a SWISS stage`);
    }

    console.log(`Generating Swiss round for stage ${stageId} and tournamentId ${stage.tournament.id}`);
    
    // Try to get team stats for this stage first, if none exist, get them for the tournament
    let teamStats = await this.prisma.teamStats.findMany({
      where: { 
        stageId: stageId
      },
      include: {
        team: true
      },
      orderBy: [
        { wins: 'desc' },
        { tiebreaker1: 'desc' },
        { tiebreaker2: 'desc' }
      ]
    });
    
    // If no stage-specific stats found, get tournament-wide stats
    if (teamStats.length === 0) {
      console.log(`No stage-specific stats found, looking for tournament stats`);
      teamStats = await this.prisma.teamStats.findMany({
        where: { 
          tournamentId: stage.tournament.id
        },
        include: {
          team: true
        },
        orderBy: [
          { wins: 'desc' },
          { tiebreaker1: 'desc' },
          { tiebreaker2: 'desc' }
        ]
      });
    }
    
    // If still no stats, use all teams in the tournament with no stats
    if (teamStats.length === 0) {
      console.log(`No team stats found at all, using raw team list`);
      // Create temporary stats objects based on teams in the tournament
      teamStats = stage.tournament.teams.map(team => ({
        id: `temp-${team.id}`,
        teamId: team.id,
        team: team,
        tournamentId: stage.tournament.id,
        stageId: null,
        stage: null,
        wins: 0,
        losses: 0,
        ties: 0,
        matchesPlayed: 0,
        rank: null,
        tiebreaker1: 0,
        tiebreaker2: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
    }
    
    console.log(`Found ${teamStats.length} teams for Swiss round generation`);
    
    // Pair teams based on their current rank
    const matches: PrismaMatch[] = [];
    const nextRoundNumber = currentRoundNumber + 1;
    const paired = new Set<string>();
    let matchNumber = 1;
    
    // Get previous matches to avoid repeat matchups if possible
    const previousMatches = await this.prisma.match.findMany({
      where: { stageId },
      include: {
        alliances: {
          include: {
            teamAlliances: true
          }
        }
      }
    });
    
    // Track previous opponents
    const previousOpponents = new Map<string, Set<string>>();
    
    for (const match of previousMatches) {
      if (!match.alliances || match.alliances.length < 2) continue;
      
      const redTeams = match.alliances[0].teamAlliances.map(ta => ta.teamId);
      const blueTeams = match.alliances[1].teamAlliances.map(ta => ta.teamId);
      
      // Record opponents
      for (const redTeam of redTeams) {
        if (!previousOpponents.has(redTeam)) {
          previousOpponents.set(redTeam, new Set<string>());
        }
        const redOpponents = previousOpponents.get(redTeam);
        if (redOpponents) {
          for (const blueTeam of blueTeams) {
            redOpponents.add(blueTeam);
          }
        }
      }
      
      for (const blueTeam of blueTeams) {
        if (!previousOpponents.has(blueTeam)) {
          previousOpponents.set(blueTeam, new Set<string>());
        }
        const blueOpponents = previousOpponents.get(blueTeam);
        if (blueOpponents) {
          for (const redTeam of redTeams) {
            blueOpponents.add(redTeam);
          }
        }
      }
    }
    
    // Pair teams by rank with minimal repeat matchups
    for (let i = 0; i < teamStats.length; i += this.TEAMS_PER_MATCH / 2) {
      // If we don't have enough teams left for a full match, stop
      if (i + (this.TEAMS_PER_MATCH / 2) - 1 >= teamStats.length) break;
      
      // Get team groups for this match
      const redTeams = teamStats.slice(i, i + this.RED_ALLIANCE_SIZE)
          .filter(ts => !paired.has(ts.teamId))
          .map(ts => ts);
      
      const blueTeams = teamStats.slice(i + this.RED_ALLIANCE_SIZE, i + this.TEAMS_PER_MATCH)
          .filter(ts => !paired.has(ts.teamId))
          .map(ts => ts);
      
      // If we don't have enough teams for complete alliances, skip
      if (redTeams.length < this.RED_ALLIANCE_SIZE || blueTeams.length < this.BLUE_ALLIANCE_SIZE) {
        continue;
      }
      
      // Mark these teams as paired
      redTeams.forEach(ts => paired.add(ts.teamId));
      blueTeams.forEach(ts => paired.add(ts.teamId));
      
      // Create the match
      const dbMatch = await this.prisma.match.create({
        data: {
          stageId,
          matchNumber: matchNumber++,
          roundNumber: nextRoundNumber,
          scheduledTime: new Date(Date.now() + ((matchNumber - 1) * 6 * 60 * 1000)), // Schedule 6 minutes apart
          status: 'PENDING',
          alliances: {
            create: [
              {
                color: 'RED',
                teamAlliances: {
                  create: redTeams.map((ts, idx) => ({
                    teamId: ts.teamId,
                    stationPosition: idx + 1
                  }))
                }
              },
              {
                color: 'BLUE',
                teamAlliances: {
                  create: blueTeams.map((ts, idx) => ({
                    teamId: ts.teamId,
                    stationPosition: idx + 1
                  }))
                }
              }
            ]
          }
        },
        include: {
          alliances: {
            include: {
              teamAlliances: {
                include: {
                  team: true
                }
              }
            }
          }
        }
      });
      
      // Create initial match score record
      await this.createInitialMatchScore(dbMatch.id);
      
      matches.push(dbMatch as any);
    }
    
    return matches;
  }
  
  /**
   * Generates a playoff tournament bracket.
   * 
   * @param stageId ID of the stage
   * @param numberOfRounds Number of rounds in the playoff
   * @returns Array of created match objects
   */
  async generatePlayoffSchedule(stageId: string, numberOfRounds: number): Promise<PrismaMatch[]> {
    const stage = await this.prisma.stage.findUnique({
      where: { id: stageId },
      include: {
        tournament: {
          include: {
            teams: true
          }
        }
      }
    });
    
    if (!stage) {
      throw new Error(`Stage with ID ${stageId} not found`);
    }
    
    if (stage.type !== StageType.PLAYOFF) {
      throw new Error(`Stage with ID ${stageId} is not a PLAYOFF stage`);
    }
    
    // Calculate how many teams we need for this bracket (2^numberOfRounds)
    const numTeamsNeeded = Math.pow(2, numberOfRounds);
    
    // Get team rankings from team stats - FIXED: Look up by tournamentId instead of stageId
    const teamStats = await this.prisma.teamStats.findMany({
      where: { 
        tournamentId: stage.tournament.id
      },
      include: {
        team: true
      },
      orderBy: [
        { wins: 'desc' },
        { tiebreaker1: 'desc' },
        { tiebreaker2: 'desc' } 
      ]
    });
    
    if (teamStats.length < numTeamsNeeded) {
      throw new Error(`Not enough teams with stats for a ${numberOfRounds}-round playoff. Need ${numTeamsNeeded} teams, got ${teamStats.length}`);
    }
    
    // Create bracket structure
    const matches: PrismaMatch[] = [];
    this.bracketAdvancements = [];
    
    // For each round
    for (let round = 1; round <= numberOfRounds; round++) {
      const matchesInRound = Math.pow(2, numberOfRounds - round);
      
      // For first round, create matchups based on seeding (1 vs 8, 2 vs 7, etc.)
      if (round === 1) {
        for (let i = 0; i < matchesInRound; i++) {
          const highSeedIdx = i;
          const lowSeedIdx = numTeamsNeeded - 1 - i;
          
          const highSeed = teamStats[highSeedIdx];
          const lowSeed = teamStats[lowSeedIdx];
          
          // Create the match
          const dbMatch = await this.prisma.match.create({
            data: {
              stageId,
              matchNumber: i + 1,
              roundNumber: round,
              scheduledTime: new Date(Date.now() + ((i + 1) * 15 * 60 * 1000)), // Schedule 15 minutes apart
              status: 'PENDING',
              alliances: {
                create: [
                  {
                    color: 'RED',
                    teamAlliances: {
                      create: [{
                        teamId: highSeed.teamId,
                        stationPosition: 1
                      }]
                    }
                  },
                  {
                    color: 'BLUE',
                    teamAlliances: {
                      create: [{
                        teamId: lowSeed.teamId,
                        stationPosition: 1
                      }]
                    }
                  }
                ]
              }
            },
            include: {
              alliances: {
                include: {
                  teamAlliances: {
                    include: {
                      team: true
                    }
                  }
                }
              }
            }
          });
          
          // Create initial match score record
          await this.createInitialMatchScore(dbMatch.id);
          
          matches.push(dbMatch as any);
          
          // If not final round, add to advancement map
          if (round < numberOfRounds) {
            // Figure out which match this advances to
            const nextMatchNumber = Math.floor(i / 2) + 1;
            
            // Create empty future match for next round if needed
            if (i % 2 === 0) {
              const nextRoundMatch = await this.prisma.match.create({
                data: {
                  stageId,
                  matchNumber: nextMatchNumber + matchesInRound,
                  roundNumber: round + 1,
                  scheduledTime: new Date(Date.now() + ((nextMatchNumber + matchesInRound) * 15 * 60 * 1000)),
                  status: 'PENDING',
                  alliances: {
                    create: [
                      {
                        color: 'RED',
                        teamAlliances: { create: [] }
                      },
                      {
                        color: 'BLUE',
                        teamAlliances: { create: [] }
                      }
                    ]
                  }
                },
                include: {
                  alliances: {
                    include: {
                      teamAlliances: true
                    }
                  }
                }
              });
              
              matches.push(nextRoundMatch as any);
            }
            
            // Store advancement info
            this.bracketAdvancements.push({
              matchId: dbMatch.id,
              nextMatchId: matches[matches.length - (i % 2 === 0 ? 1 : 2)].id,
              advancesAs: i % 2 === 0 ? 'RED' : 'BLUE'
            });
          }
        }
      }
    }
    
    return matches;
  }
  
  /**
   * Updates playoff brackets after a match is completed.
   * Advances winning teams to the next round.
   * 
   * @param matchId ID of the completed match
   * @returns Array of updated matches
   */
  async updatePlayoffBrackets(matchId: string): Promise<PrismaMatch[]> {
    // Get match result
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        alliances: {
          include: {
            teamAlliances: true
          }
        },
        matchScores: true
      }
    });
    
    if (!match) {
      throw new Error(`Match with ID ${matchId} not found`);
    }
    
    if (match.status !== 'COMPLETED') {
      throw new Error(`Match ${matchId} is not completed`);
    }
    
    if (!match.winningAlliance) {
      throw new Error(`Match ${matchId} has no winning alliance`);
    }
    
    // Find advancement info for this match
    const advancement = this.bracketAdvancements.find(adv => adv.matchId === matchId);
    
    if (!advancement) {
      throw new Error(`No advancement information for match ${matchId}`);
    }
    
    // Get winning team
    const winningAlliance = match.alliances.find(alliance => alliance.color === match.winningAlliance);
    
    if (!winningAlliance) {
      throw new Error(`No winning alliance found for match ${matchId}`);
    }
    
    // Update next match
    const nextMatch = await this.prisma.match.findUnique({
      where: { id: advancement.nextMatchId },
      include: {
        alliances: true
      }
    });
    
    if (!nextMatch) {
      throw new Error(`Next match ${advancement.nextMatchId} not found`);
    }
    
    // Find the alliance to update
    const targetAlliance = nextMatch.alliances.find(alliance => alliance.color === advancement.advancesAs);
    
    if (!targetAlliance) {
      throw new Error(`Target alliance ${advancement.advancesAs} not found in next match`);
    }
    
    // Add winning teams to next match
    for (const teamAlliance of winningAlliance.teamAlliances) {
      await this.prisma.teamAlliance.create({
        data: {
          allianceId: targetAlliance.id,
          teamId: teamAlliance.teamId,
          stationPosition: teamAlliance.stationPosition
        }
      });
    }
    
    // Return updated matches
    const updatedMatches = await this.prisma.match.findMany({
      where: {
        id: {
          in: [matchId, advancement.nextMatchId]
        }
      },
      include: {
        alliances: {
          include: {
            teamAlliances: {
              include: {
                team: true
              }
            }
          }
        }
      }
    });
    
    return updatedMatches as any[];
  }
  
  /**
   * Finalizes rankings after all playoff matches are complete.
   * 
   * @param stageId ID of the playoff stage
   * @returns Array of all playoff matches
   */
  async finalizePlayoffRankings(stageId: string): Promise<PrismaMatch[]> {
    // Get all playoff matches
    const matches = await this.prisma.match.findMany({
      where: { stageId },
      include: {
        alliances: {
          include: {
            teamAlliances: {
              include: {
                team: true
              }
            }
          }
        }
      },
      orderBy: [
        { roundNumber: 'desc' },
        { matchNumber: 'asc' }
      ]
    });
    
    if (matches.length === 0) {
      throw new Error(`No matches found for stage ${stageId}`);
    }
    
    // Check if all matches are complete
    const incompleteMatches = matches.filter(match => match.status !== 'COMPLETED');
    
    if (incompleteMatches.length > 0) {
      throw new Error(`Cannot finalize rankings: ${incompleteMatches.length} matches are still incomplete`);
    }
    
    // For each team that participated, determine their final ranking
    // based on how far they advanced in the playoff bracket
    const teamRankings = new Map<string, number>();
    
    // Process matches in reverse round order (finals first)
    for (const match of matches) {
      // Skip matches with no winning alliance
      if (!match.winningAlliance) continue;
      
      const winningAlliance = match.alliances.find(a => a.color === match.winningAlliance);
      const losingAlliance = match.alliances.find(a => a.color !== match.winningAlliance);
      
      if (!winningAlliance || !losingAlliance) continue;
      
      // Winners of the final match get 1st place
      const maxRound = Math.max(...matches.map(m => m.roundNumber || 0));
      
      if (match.roundNumber === maxRound) {
        for (const ta of winningAlliance.teamAlliances) {
          teamRankings.set(ta.teamId, 1);
        }
        
        for (const ta of losingAlliance.teamAlliances) {
          teamRankings.set(ta.teamId, 2);
        }
      } else {
        // For other rounds, losers get ranked based on the round they lost in
        const roundNumber = match.roundNumber || 0; // Default to 0 if null
        const baseRank = Math.pow(2, maxRound - roundNumber) + 1;
        
        for (const ta of losingAlliance.teamAlliances) {
          teamRankings.set(ta.teamId, baseRank);
        }
      }
    }
    
    // Update team stats with final rankings
    for (const [teamId, rank] of teamRankings.entries()) {
      await this.prisma.teamStats.updateMany({
        where: {
          teamId,
          stageId
        },
        data: {
          rank
        }
      });
    }
    
    return matches as any[];
  }
}