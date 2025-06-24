import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ISchedulingStrategy, SwissSchedulingOptions } from '../interfaces/scheduling-strategy.interface';
import { Match, Stage, Team, StageType, MatchState, AllianceColor } from '../../utils/prisma-types';
import { FieldAssignmentService } from '../services/field-assignment.service';
import { MatchupHistoryService } from '../services/matchup-history.service';
import { SwissScheduler } from '../swiss-scheduler';

/**
 * Swiss tournament scheduling strategy
 * Implements the Strategy pattern for Swiss-style tournaments
 */
@Injectable()
export class SwissSchedulingStrategy implements ISchedulingStrategy {
  private readonly TEAMS_PER_MATCH = 4;
  private readonly TEAMS_PER_ALLIANCE = 2;

  constructor(
    private readonly prisma: PrismaService,
    private readonly fieldAssignmentService: FieldAssignmentService,
    private readonly matchupHistoryService: MatchupHistoryService,
    private readonly swissScheduler: SwissScheduler
  ) {}

  canHandle(stage: Stage): boolean {
    return stage.type === StageType.SWISS;
  }

  getStrategyType(): string {
    return 'SWISS';
  }

  async generateMatches(
    stage: Stage & { tournament: any; teams: Team[] },
    options: SwissSchedulingOptions
  ): Promise<Match[]> {
    const { currentRoundNumber, teamsPerAlliance = this.TEAMS_PER_ALLIANCE } = options;

    if (teamsPerAlliance !== this.TEAMS_PER_ALLIANCE) {
      throw new Error(`Swiss strategy currently supports only ${this.TEAMS_PER_ALLIANCE} teams per alliance`);
    }

    // Validate fields
    this.fieldAssignmentService.validateFieldAvailability(stage.tournament.fields);
    
    // Initialize field assignment tracking
    const shuffledFields = this.fieldAssignmentService.shuffleFields(stage.tournament.fields);
    let fieldAssignmentCounts = this.fieldAssignmentService.initializeFieldCounts(shuffledFields);

    // Get team rankings
    const teamStats = await this.getOrCreateTeamStats(stage.id);
    
    // Group teams by record
    const recordGroups = this.groupTeamsByRecord(teamStats);
    
    // Get previous matchup history
    const previousOpponents = await this.matchupHistoryService.getPreviousOpponents(stage.id);
    
    // Generate matches
    const matches = await this.generateSwissMatches(
      stage.id,
      currentRoundNumber + 1,
      recordGroups,
      previousOpponents,
      shuffledFields,
      fieldAssignmentCounts
    );

    return matches;
  }

  /**
   * Gets team stats or creates them if they don't exist
   */
  private async getOrCreateTeamStats(stageId: string) {
    let teamStats = await this.swissScheduler.getSwissRankings(stageId);
    
    if (teamStats.length === 0) {
      console.log(`No team stats found, creating initial stats for all teams`);
      await this.swissScheduler.updateSwissRankings(stageId);
      teamStats = await this.swissScheduler.getSwissRankings(stageId);
    }
    
    console.log(`Found ${teamStats.length} teams for Swiss round generation`);
    return teamStats;
  }

  /**
   * Groups teams by their win-loss record
   */
  private groupTeamsByRecord(teamStats: any[]): Map<string, any[]> {
    const recordGroups = new Map<string, any[]>();
    
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
    
    return recordGroups;
  }

  /**
   * Generates Swiss matches for all record groups
   */
  private async generateSwissMatches(
    stageId: string,
    nextRoundNumber: number,
    recordGroups: Map<string, any[]>,
    previousOpponents: Map<string, Set<string>>,
    shuffledFields: any[],
    initialFieldCounts: number[]
  ): Promise<Match[]> {
    const matches: Match[] = [];
    const paired = new Set<string>();
    let matchNumber = 1;
    let fieldAssignmentCounts = [...initialFieldCounts];

    // Sort record groups by performance (best records first)
    const sortedRecordGroups = this.sortRecordGroups(recordGroups);

    // Process each record group for pairing
    for (const [record, teams] of sortedRecordGroups) {
      console.log(`\nProcessing ${record} group with ${teams.length} teams`);
      
      const recordMatches = await this.processRecordGroup(
        stageId,
        record,
        teams,
        paired,
        previousOpponents,
        shuffledFields,
        fieldAssignmentCounts,
        matchNumber,
        nextRoundNumber
      );
      
      matches.push(...recordMatches);
      matchNumber += recordMatches.length;
    }

    console.log(`\nGenerated ${matches.length} Swiss matches for round ${nextRoundNumber}`);
    return matches;
  }

  /**
   * Sorts record groups by performance
   */
  private sortRecordGroups(recordGroups: Map<string, any[]>): [string, any[]][] {
    return Array.from(recordGroups.entries()).sort(([recordA], [recordB]) => {
      const [winsA, lossesA, tiesA] = recordA.split('-').map(Number);
      const [winsB, lossesB, tiesB] = recordB.split('-').map(Number);
      
      // Compare by ranking points (wins * 2 + ties)
      const rpA = winsA * 2 + tiesA;
      const rpB = winsB * 2 + tiesB;
      
      return rpB - rpA; // Descending order (best first)
    });
  }

  /**
   * Processes a single record group to create matches
   */
  private async processRecordGroup(
    stageId: string,
    record: string,
    teams: any[],
    paired: Set<string>,
    previousOpponents: Map<string, Set<string>>,
    shuffledFields: any[],
    fieldAssignmentCounts: number[],
    startMatchNumber: number,
    roundNumber: number
  ): Promise<Match[]> {
    const matches: Match[] = [];
    let matchNumber = startMatchNumber;

    // Sort teams within the group by tiebreakers
    const sortedTeams = this.sortTeamsByTiebreakers(teams);
    
    // Get available teams (not yet paired)
    const availableTeams = sortedTeams.filter(team => !paired.has(team.teamId));
    
    // Create matches from available teams
    for (let i = 0; i < availableTeams.length; i += this.TEAMS_PER_MATCH) {
      if (i + this.TEAMS_PER_MATCH > availableTeams.length) {
        console.log(`Not enough teams for complete match in ${record} group, skipping remaining ${availableTeams.length - i} teams`);
        break;
      }
      
      const matchTeams = availableTeams.slice(i, i + this.TEAMS_PER_MATCH);
      
      // Optimize alliance assignment
      const [redTeams, blueTeams] = this.matchupHistoryService.optimizeAllianceAssignment(
        matchTeams, 
        previousOpponents,
        this.TEAMS_PER_ALLIANCE
      );
      
      // Mark teams as paired
      matchTeams.forEach(team => paired.add(team.teamId));
      
      // Assign field
      const { field, updatedCounts } = this.fieldAssignmentService.assignField(
        shuffledFields, 
        fieldAssignmentCounts
      );
      fieldAssignmentCounts = updatedCounts;
      
      // Create match
      const dbMatch = await this.createSwissMatch(
        stageId,
        matchNumber++,
        roundNumber,
        redTeams,
        blueTeams,
        field
      );
      
      matches.push(dbMatch);
      
      console.log(`Created match ${matchNumber - 1}: [${redTeams.map(t => t.team.teamNumber).join(',')}] vs [${blueTeams.map(t => t.team.teamNumber).join(',')}] on ${field.name}`);
    }

    return matches;
  }

  /**
   * Sorts teams by tiebreakers
   */
  private sortTeamsByTiebreakers(teams: any[]): any[] {
    return [...teams].sort((a, b) => {
      if (b.rankingPoints !== a.rankingPoints) return b.rankingPoints - a.rankingPoints;
      if (Math.abs(b.opponentWinPercentage - a.opponentWinPercentage) > 0.001) 
        return b.opponentWinPercentage - a.opponentWinPercentage;
      return b.pointDifferential - a.pointDifferential;
    });
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
  ): Promise<Match> {
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
    }) as Match;
  }
}
