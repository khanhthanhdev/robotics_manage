import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FrcScheduler } from './frc-scheduler';
import { SwissScheduler } from './swiss-scheduler';
import { PlayoffScheduler } from './playoff-scheduler';
import { Match as PrismaMatch, StageType, MatchState, AllianceColor } from '../utils/prisma-types';


@Injectable()
export class MatchSchedulerService {
  private readonly RED_ALLIANCE_SIZE = 2;
  private readonly BLUE_ALLIANCE_SIZE = 2;
  private readonly TEAMS_PER_MATCH = 4;


  private frcScheduler: FrcScheduler;
  private swissScheduler: SwissScheduler;
  private playoffScheduler: PlayoffScheduler;

  constructor(private readonly prisma: PrismaService) {
    this.frcScheduler = new FrcScheduler(prisma);
    this.swissScheduler = new SwissScheduler(prisma);
    this.playoffScheduler = new PlayoffScheduler(prisma);
  }  
  /**
   * Updates Swiss-style rankings for all teams in a stage.
   * Call this after each round.
   */
  async updateSwissRankings(stageId: string): Promise<void> {
    return this.swissScheduler.updateSwissRankings(stageId);
  }

  /**
   * Returns the current Swiss-style ranking for a stage, ordered by all tiebreakers.
   */
  async getSwissRankings(stageId: string) {
    return this.swissScheduler.getSwissRankings(stageId);
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
    if (teamsPerAlliance !== this.RED_ALLIANCE_SIZE) {
      console.warn(`Requested ${teamsPerAlliance} teams per alliance, but currently only ${this.RED_ALLIANCE_SIZE} is supported.`);
      teamsPerAlliance = this.RED_ALLIANCE_SIZE;
    }
    const stage = await this.prisma.stage.findUnique({
      where: { id: stageId },
      include: {
        tournament: {
          include: {
            teams: true,
            fields: true,
          },
        },
      },
    });
    if (!stage) {
      throw new Error(`Stage with ID ${stageId} not found`);
    }
    return this.frcScheduler.generateFrcSchedule(
      stage,
      rounds,
      minMatchSeparation,
      maxIterations,
      qualityLevel
    );
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
            teams: true,
            fields: true, // Fetch fields for the tournament
          }
        }
      }
    });
    
    if (!stage) {
      throw new Error(`Stage with ID ${stageId} not found`);
    }
    
    if (stage.type !== StageType.SWISS) {
      throw new Error(`Stage with ID ${stageId} is not a SWISS stage`);
    }    console.log(`Generating Swiss round for stage ${stageId} and tournamentId ${stage.tournament.id}`);
    
    // Field assignment logic
    const fields = stage.tournament.fields;
    if (!fields || fields.length === 0) {
      throw new Error('No fields found for this tournament.');
    }
    const shuffledFields = [...fields].sort(() => Math.random() - 0.5);
    const fieldAssignmentCounts = new Array(shuffledFields.length).fill(0);
    
    // 1. Use the Swiss ranking system to get properly ranked teams
    let teamStats = await this.swissScheduler.getSwissRankings(stageId);
    
    // If no stats exist, create initial team stats for all teams in the tournament
    if (teamStats.length === 0) {
      console.log(`No team stats found, creating initial stats for all teams`);
      
      // Update rankings will create team stats if they don't exist
      await this.swissScheduler.updateSwissRankings(stageId);
      
      // Now get the rankings
      teamStats = await this.swissScheduler.getSwissRankings(stageId);
    }
    
    console.log(`Found ${teamStats.length} teams for Swiss round generation`);
    
    // 2. Group teams by their win-loss record for Swiss pairing
    const recordGroups = new Map<string, typeof teamStats>();
    
    for (const teamStat of teamStats) {
      const record = `${teamStat.wins}-${teamStat.losses}-${teamStat.ties}`;
      if (!recordGroups.has(record)) {
        recordGroups.set(record, []);
      }
      recordGroups.get(record)!.push(teamStat);
    }
    
    console.log(`Teams grouped by record:`, 
      Array.from(recordGroups.entries()).map(([record, teams]) => 
        `${record}: ${teams.length} teams`
      ).join(', ')
    );
      // 3. Get previous matches to avoid repeat matchups
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
    
    // Track previous opponents for each team
    const previousOpponents = new Map<string, Set<string>>();
    
    for (const match of previousMatches) {
      if (!match.alliances || match.alliances.length < 2) continue;
      
      const redTeams = match.alliances.find(a => a.color === AllianceColor.RED)?.teamAlliances.map(ta => ta.teamId) || [];
      const blueTeams = match.alliances.find(a => a.color === AllianceColor.BLUE)?.teamAlliances.map(ta => ta.teamId) || [];
      
      // Record opponents for each team
      [...redTeams, ...blueTeams].forEach(teamId => {
        if (!previousOpponents.has(teamId)) {
          previousOpponents.set(teamId, new Set<string>());
        }
        const opponents = previousOpponents.get(teamId)!;
        
        // Add all other teams in this match as opponents
        [...redTeams, ...blueTeams].forEach(otherTeamId => {
          if (otherTeamId !== teamId) {
            opponents.add(otherTeamId);
          }
        });
      });
    }
    
    // 4. Create Swiss pairings within each record group
    const matches: PrismaMatch[] = [];
    const nextRoundNumber = currentRoundNumber + 1;
    const paired = new Set<string>();
    let matchNumber = 1;
    
    // Sort record groups by performance (best records first)
    const sortedRecordGroups = Array.from(recordGroups.entries()).sort(([recordA], [recordB]) => {
      const [winsA, lossesA, tiesA] = recordA.split('-').map(Number);
      const [winsB, lossesB, tiesB] = recordB.split('-').map(Number);
      
      // Compare by ranking points first (wins * 2 + ties)
      const rpA = winsA * 2 + tiesA;
      const rpB = winsB * 2 + tiesB;
      
      return rpB - rpA; // Descending order (best first)
    });
    
    // Process each record group for pairing
    for (const [record, teams] of sortedRecordGroups) {
      console.log(`\nProcessing ${record} group with ${teams.length} teams`);
      
      // Sort teams within the group by tiebreakers (OWP, then Point Differential)
      const sortedTeams = [...teams].sort((a, b) => {
        if (b.rankingPoints !== a.rankingPoints) return b.rankingPoints - a.rankingPoints;
        if (Math.abs(b.opponentWinPercentage - a.opponentWinPercentage) > 0.001) 
          return b.opponentWinPercentage - a.opponentWinPercentage;
        return b.pointDifferential - a.pointDifferential;
      });
      
      // Pair teams within this record group
      const availableTeams = sortedTeams.filter(team => !paired.has(team.teamId));
      
      for (let i = 0; i < availableTeams.length; i += this.TEAMS_PER_MATCH) {
        // Check if we have enough teams for a complete match
        if (i + this.TEAMS_PER_MATCH > availableTeams.length) {
          console.log(`Not enough teams for complete match in ${record} group, skipping remaining ${availableTeams.length - i} teams`);
          break;
        }
        
        // Get teams for this match
        const matchTeams = availableTeams.slice(i, i + this.TEAMS_PER_MATCH);
        
        // Try to minimize repeat matchups when assigning alliances
        const [redTeams, blueTeams] = this.optimizeAllianceAssignment(
          matchTeams, 
          previousOpponents
        );
        
        // Mark teams as paired
        matchTeams.forEach(team => paired.add(team.teamId));
        
        // Assign field (load balancing)
        const minCount = Math.min(...fieldAssignmentCounts);
        const candidateIndexes = fieldAssignmentCounts
          .map((count, idx) => (count === minCount ? idx : -1))
          .filter(idx => idx !== -1);
        const chosenIdx = candidateIndexes[Math.floor(Math.random() * candidateIndexes.length)];
        const chosenField = shuffledFields[chosenIdx];
        fieldAssignmentCounts[chosenIdx]++;
        
        // Create the match in database
        const dbMatch = await this.createSwissMatch(
          stageId,
          matchNumber++,
          nextRoundNumber,
          redTeams,
          blueTeams,
          chosenField
        );
        
        matches.push(dbMatch);
        
        console.log(`Created match ${matchNumber - 1}: [${redTeams.map(t => t.team.teamNumber).join(',')}] vs [${blueTeams.map(t => t.team.teamNumber).join(',')}] on ${chosenField.name}`);
      }
    }
    
    console.log(`\nGenerated ${matches.length} Swiss matches for round ${nextRoundNumber}`);
    return matches;
  }
  
  /**
   * Optimizes alliance assignment to minimize repeat matchups
   */
  private optimizeAllianceAssignment(
    matchTeams: any[], 
    previousOpponents: Map<string, Set<string>>
  ): [any[], any[]] {
    // Default assignment: first half red, second half blue
    const redTeams = matchTeams.slice(0, this.RED_ALLIANCE_SIZE);
    const blueTeams = matchTeams.slice(this.RED_ALLIANCE_SIZE, this.TEAMS_PER_MATCH);
    
    // Calculate repeat matchup penalty for current assignment
    let currentPenalty = 0;
    for (const redTeam of redTeams) {
      for (const blueTeam of blueTeams) {
        if (previousOpponents.get(redTeam.teamId)?.has(blueTeam.teamId)) {
          currentPenalty++;
        }
      }
    }
    
    // Try alternative assignment: swap one team from each alliance
    if (matchTeams.length === this.TEAMS_PER_MATCH) {
      const altRedTeams = [matchTeams[0], matchTeams[2]];
      const altBlueTeams = [matchTeams[1], matchTeams[3]];
      
      let altPenalty = 0;
      for (const redTeam of altRedTeams) {
        for (const blueTeam of altBlueTeams) {
          if (previousOpponents.get(redTeam.teamId)?.has(blueTeam.teamId)) {
            altPenalty++;
          }
        }
      }
      
      // Use alternative if it has fewer repeat matchups
      if (altPenalty < currentPenalty) {
        return [altRedTeams, altBlueTeams];
      }
    }
    
    return [redTeams, blueTeams];
  }
  
  /**
   * Creates a Swiss match in the database
   */
  private async createSwissMatch(
    stageId: string,
    matchNumber: number,
    roundNumber: number,
    redTeams: any[],
    blueTeams: any[],
    field: any
  ): Promise<PrismaMatch> {
    return await this.prisma.match.create({
      data: {
        stageId,
        matchNumber,
        roundNumber,
        scheduledTime: new Date(Date.now() + ((matchNumber - 1) * 6 * 60 * 1000)), // Schedule 6 minutes apart
        status: MatchState.PENDING,
        fieldId: field.id,
        alliances: {
          create: [
            {
              color: AllianceColor.RED,
              teamAlliances: {
                create: redTeams.map((team, idx) => ({
                  teamId: team.teamId,
                  stationPosition: idx + 1
                }))
              }
            },
            {
              color: AllianceColor.BLUE,
              teamAlliances: {
                create: blueTeams.map((team, idx) => ({
                  teamId: team.teamId,
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
    }) as PrismaMatch;
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
    
    return this.playoffScheduler.generatePlayoffSchedule(stage, numberOfRounds);
  }
  
  /**
   * Updates playoff brackets after a match is completed.
   * Advances winning teams to the next round.
   * 
   * @param matchId ID of the completed match
   * @returns Array of updated matches
   */
  async updatePlayoffBrackets(matchId: string): Promise<PrismaMatch[]> {
    return this.playoffScheduler.updatePlayoffBrackets(matchId);
  }

  /**
   * Finalizes rankings after all playoff matches are complete.
   * 
   * @param stageId ID of the playoff stage
   * @returns Array of all playoff matches
   */
  async finalizePlayoffRankings(stageId: string): Promise<PrismaMatch[]> {
    return this.playoffScheduler.finalizePlayoffRankings(stageId);
  }
}