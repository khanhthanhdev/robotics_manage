import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FrcScheduler } from './frc-scheduler';
import { SwissScheduler } from './swiss-scheduler';
import { PlayoffScheduler } from './playoff-scheduler';
import { Match as PrismaMatch, StageType } from '../utils/prisma-types';


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
    }

    console.log(`Generating Swiss round for stage ${stageId} and tournamentId ${stage.tournament.id}`);
    
    // Field assignment logic
    const fields = stage.tournament.fields;
    if (!fields || fields.length === 0) {
      throw new Error('No fields found for this tournament.');
    }
    const shuffledFields = [...fields].sort(() => Math.random() - 0.5);
    const fieldAssignmentCounts = new Array(shuffledFields.length).fill(0);
    
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
        updatedAt: new Date(),
        pointsScored: 0,
        pointsConceded: 0,
        rankingPoints: 0,
        opponentWinPercentage: 0,
        pointDifferential: 0
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
      
      // Find the field with the fewest matches assigned (random tie-break)
      let minCount = Math.min(...fieldAssignmentCounts);
      let candidateIndexes = fieldAssignmentCounts
        .map((count, idx) => (count === minCount ? idx : -1))
        .filter(idx => idx !== -1);
      let chosenIdx = candidateIndexes[Math.floor(Math.random() * candidateIndexes.length)];
      let chosenField = shuffledFields[chosenIdx];
      fieldAssignmentCounts[chosenIdx]++;
      
      // Create the match
      const dbMatch = await this.prisma.match.create({
        data: {
          stageId,
          matchNumber: matchNumber++,
          roundNumber: nextRoundNumber,
          scheduledTime: new Date(Date.now() + ((matchNumber - 1) * 6 * 60 * 1000)), // Schedule 6 minutes apart
          status: 'PENDING',
          fieldId: chosenField.id,
          fieldNumber: chosenField.number,
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