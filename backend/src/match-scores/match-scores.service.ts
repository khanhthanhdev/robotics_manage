import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMatchScoresDto, UpdateMatchScoresDto } from './dto';
import { Prisma } from '@prisma/client';
import { ScoreCalculator, IScoreCalculator } from './score-calculator';
import { JsonFieldParser } from './json-field-parser';
import { TeamStatsService } from './team-stats.service';
import { MatchSchedulerService } from '../match-scheduler/match-scheduler.service';

/**
 * Service for managing match scores
 */
@Injectable()
export class MatchScoresService {
  private readonly scoreCalculator: IScoreCalculator;
  private readonly teamStatsService: TeamStatsService;

  constructor(
    private readonly prisma: PrismaService,
    private readonly matchSchedulerService: MatchSchedulerService // Injected
  ) {
    this.scoreCalculator = new ScoreCalculator();
    this.teamStatsService = new TeamStatsService(prisma);
  }

  /**
   * Creates match scores for a match
   * @param createMatchScoresDto - DTO with match score data
   * @returns Created match scores
   */
  async create(createMatchScoresDto: CreateMatchScoresDto) {
    try {
      // Validate that matchId exists and is not empty
      if (!createMatchScoresDto.matchId) {
        throw new BadRequestException('Match ID is required to create match scores');
      }

      // Check if match exists first (outside of transaction)
      const matchExists = await this.prisma.match.findUnique({
        where: { id: createMatchScoresDto.matchId },
      });

      if (!matchExists) {
        throw new NotFoundException(`Match with ID ${createMatchScoresDto.matchId} not found`);
      }

      // Check if match scores already exist for this match (outside of transaction)
      const existingScores = await this.prisma.matchScores.findUnique({
        where: { matchId: createMatchScoresDto.matchId },
      });

      if (existingScores) {
        // If scores already exist, update them instead
        return this.update(existingScores.id, createMatchScoresDto);
      }

      // Apply team count multipliers if not explicitly provided
      if (createMatchScoresDto.redTeamCount && !createMatchScoresDto.redMultiplier) {
        createMatchScoresDto.redMultiplier = this.scoreCalculator.calculateMultiplier(createMatchScoresDto.redTeamCount);
      }

      if (createMatchScoresDto.blueTeamCount && !createMatchScoresDto.blueMultiplier) {
        createMatchScoresDto.blueMultiplier = this.scoreCalculator.calculateMultiplier(createMatchScoresDto.blueTeamCount);
      }

      // Calculate total scores
      const redTotalScore = this.scoreCalculator.calculateTotalScore(
        createMatchScoresDto.redAutoScore || 0,
        createMatchScoresDto.redDriveScore || 0,
        createMatchScoresDto.redMultiplier || 1.0,
      );

      const blueTotalScore = this.scoreCalculator.calculateTotalScore(
        createMatchScoresDto.blueAutoScore || 0,
        createMatchScoresDto.blueDriveScore || 0,
        createMatchScoresDto.blueMultiplier || 1.0,
      );

      // Determine winning alliance
      let winningAlliance: 'RED' | 'BLUE' | 'TIE';
      if (redTotalScore > blueTotalScore) {
        winningAlliance = 'RED';
      } else if (blueTotalScore > redTotalScore) {
        winningAlliance = 'BLUE';
      } else {
        winningAlliance = 'TIE';
      }

      // Create match scores first (outside transaction)
      const matchScores = await this.prisma.matchScores.create({
        data: {
          matchId: createMatchScoresDto.matchId,
          redAutoScore: createMatchScoresDto.redAutoScore || 0,
          redDriveScore: createMatchScoresDto.redDriveScore || 0,
          redTotalScore,
          blueAutoScore: createMatchScoresDto.blueAutoScore || 0,
          blueDriveScore: createMatchScoresDto.blueDriveScore || 0,
          blueTotalScore,
          redTeamCount: createMatchScoresDto.redTeamCount || 0,
          redMultiplier: createMatchScoresDto.redMultiplier || 1.0,
          blueTeamCount: createMatchScoresDto.blueTeamCount || 0,
          blueMultiplier: createMatchScoresDto.blueMultiplier || 1.0,
          redGameElements: createMatchScoresDto.redGameElements
            ? JSON.stringify(createMatchScoresDto.redGameElements)
            : JSON.stringify([]),
          blueGameElements: createMatchScoresDto.blueGameElements
            ? JSON.stringify(createMatchScoresDto.blueGameElements)
            : JSON.stringify([]),
          scoreDetails: createMatchScoresDto.scoreDetails
            ? JSON.stringify(createMatchScoresDto.scoreDetails)
            : JSON.stringify({}),
        },
      });

      // Update match with winning alliance
      await this.prisma.match.update({
        where: { id: createMatchScoresDto.matchId },
        data: {
          winningAlliance,
          status: 'COMPLETED',
          endTime: new Date(),
        },
      });

      // Get match with team data for stats updates
      const match = await this.prisma.match.findUnique({
        where: { id: createMatchScoresDto.matchId },
        include: {
          alliances: {
            include: {
              teamAlliances: {
                include: {
                  team: true,
                },
              },
            },
          },
          stage: {
            include: {
              tournament: true,
            },
          },
        },
      });

      // Update team stats if needed
      if (match?.alliances && match.alliances.length > 0 && match?.stage?.tournament) {
        const teamIds = match.alliances.flatMap(alliance =>
          alliance.teamAlliances.filter(ta => !ta.isSurrogate).map(ta => ta.teamId)
        );
        await this.teamStatsService.recalculateTeamStats(match, teamIds);
        // Recalculate Swiss rankings for the stage
        if (match.stage?.id) {
          await this.matchSchedulerService.updateSwissRankings(match.stage.id);
        }
      }
      
      return JsonFieldParser.parseJsonFields(matchScores);
    } catch (error) {
      console.error('Error creating match scores:', error);
      throw error;
    }
  }

  /**
   * Retrieves all match scores
   * @returns Array of match scores
   */
  async findAll() {
    const scores = await this.prisma.matchScores.findMany({
      include: {
        match: {
          select: {
            id: true,
            matchNumber: true,
            status: true,
            stage: {
              select: {
                name: true,
                tournament: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Parse JSON fields
    return scores.map((score) => JsonFieldParser.parseJsonFields(score));
  }

  /**
   * Retrieves a specific match score by ID
   * @param id Match score ID
   * @returns Match score details
   */
  async findOne(id: string) {
    const score = await this.prisma.matchScores.findUnique({
      where: { id },
      include: {
        match: {
          include: {
            alliances: {
              include: {
                teamAlliances: {
                  include: {
                    team: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!score) {
      throw new NotFoundException(`Match scores with ID ${id} not found`);
    }

    // Parse JSON fields
    return JsonFieldParser.parseJsonFields(score);
  }

  /**
   * Retrieves match scores by match ID
   * @param matchId Match ID
   * @returns Match scores for the specified match
   */
  async findByMatchId(matchId: string) {
    const score = await this.prisma.matchScores.findUnique({
      where: { matchId },
      include: {
        match: {
          include: {
            alliances: {
              include: {
                teamAlliances: {
                  include: {
                    team: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!score) {
      throw new NotFoundException(`Match scores for match ID ${matchId} not found`);
    }

    // Parse JSON fields
    return JsonFieldParser.parseJsonFields(score);
  }

  /**
   * Updates match scores
   * @param id Match score ID
   * @param updateMatchScoresDto DTO with updated match score data
   * @returns Updated match scores
   */
  async update(id: string, updateMatchScoresDto: UpdateMatchScoresDto) {
    // Check if match scores exist
    const existingScores = await this.prisma.matchScores.findUnique({
      where: { id },
      include: {
        match: {
          select: {
            id: true,
            stageId: true,
            stage: {
              select: {
                tournamentId: true
              }
            }
          }
        }
      }
    });

    if (!existingScores) {
      throw new NotFoundException(`Match scores with ID ${id} not found`);
    }

    // Apply team count multipliers if needed
    if (updateMatchScoresDto.redTeamCount && !updateMatchScoresDto.redMultiplier) {
      updateMatchScoresDto.redMultiplier = this.scoreCalculator.calculateMultiplier(updateMatchScoresDto.redTeamCount);
    }

    if (updateMatchScoresDto.blueTeamCount && !updateMatchScoresDto.blueMultiplier) {
      updateMatchScoresDto.blueMultiplier = this.scoreCalculator.calculateMultiplier(updateMatchScoresDto.blueTeamCount);
    }

    // Recalculate total scores if component scores are updated
    let redTotalScore: number | undefined = undefined;
    let blueTotalScore: number | undefined = undefined;

    if (
      updateMatchScoresDto.redAutoScore !== undefined ||
      updateMatchScoresDto.redDriveScore !== undefined ||
      updateMatchScoresDto.redMultiplier !== undefined
    ) {
      redTotalScore = this.scoreCalculator.calculateTotalScore(
        updateMatchScoresDto.redAutoScore ?? existingScores.redAutoScore,
        updateMatchScoresDto.redDriveScore ?? existingScores.redDriveScore,
        updateMatchScoresDto.redMultiplier ?? existingScores.redMultiplier,
      );
    }

    if (
      updateMatchScoresDto.blueAutoScore !== undefined ||
      updateMatchScoresDto.blueDriveScore !== undefined ||
      updateMatchScoresDto.blueMultiplier !== undefined
    ) {
      blueTotalScore = this.scoreCalculator.calculateTotalScore(
        updateMatchScoresDto.blueAutoScore ?? existingScores.blueAutoScore,
        updateMatchScoresDto.blueDriveScore ?? existingScores.blueDriveScore,
        updateMatchScoresDto.blueMultiplier ?? existingScores.blueMultiplier,
      );
    }

    const updateData: any = { ...updateMatchScoresDto };

    // Remove matchId as it can't be updated
    if (updateData.matchId) delete updateData.matchId;

    // Convert objects to JSON strings
    if (updateData.redGameElements) {
      updateData.redGameElements = JSON.stringify(updateData.redGameElements);
    }

    if (updateData.blueGameElements) {
      updateData.blueGameElements = JSON.stringify(updateData.blueGameElements);
    }

    if (updateData.scoreDetails) {
      updateData.scoreDetails = JSON.stringify(updateData.scoreDetails);
    }

    if (redTotalScore !== undefined) {
      updateData.redTotalScore = redTotalScore;
    }

    if (blueTotalScore !== undefined) {
      updateData.blueTotalScore = blueTotalScore;
    }

    // Use transaction for related updates
    const updatedScores = await this.prisma.$transaction(async (tx) => {
      // Update scores first
      const scores = await tx.matchScores.update({
        where: { id },
        data: updateData,
      });
      
      // If total scores were updated, update winning alliance
      if (redTotalScore !== undefined || blueTotalScore !== undefined) {
        let winningAlliance: 'RED' | 'BLUE' | 'TIE';
        
        if (scores.redTotalScore > scores.blueTotalScore) {
          winningAlliance = 'RED';
        } else if (scores.blueTotalScore > scores.redTotalScore) {
          winningAlliance = 'BLUE';
        } else {
          winningAlliance = 'TIE';
        }

        // Update the match with winning alliance
        await tx.match.update({
          where: { id: scores.matchId },
          data: {
            winningAlliance,
          },
        });
      }
      
      return scores;
    });
    
    // If total scores were updated, recalculate team stats
    if (redTotalScore !== undefined || blueTotalScore !== undefined) {
      let winningAlliance: 'RED' | 'BLUE' | 'TIE';
      
      if (updatedScores.redTotalScore > updatedScores.blueTotalScore) {
        winningAlliance = 'RED';
      } else if (updatedScores.blueTotalScore > updatedScores.redTotalScore) {
        winningAlliance = 'BLUE';
      } else {
        winningAlliance = 'TIE';
      }
      
      // Re-calculate team statistics for this match
      const match = await this.prisma.match.findUnique({
        where: { id: updatedScores.matchId },
        include: {
          alliances: {
            include: {
              teamAlliances: true,
            },
          },
          stage: {
            include: {
              tournament: true,
            },
          },
        },
      });
      if (match?.alliances && match.alliances.length > 0 && match?.stage?.tournament) {
        const teamIds = match.alliances.flatMap(alliance =>
          alliance.teamAlliances.filter(ta => !ta.isSurrogate).map(ta => ta.teamId)
        );
        await this.teamStatsService.recalculateTeamStats(match, teamIds);
        // Recalculate Swiss rankings for the stage
        if (match.stage?.id) {
          await this.matchSchedulerService.updateSwissRankings(match.stage.id);
        }
      }
    }

    return JsonFieldParser.parseJsonFields(updatedScores);
  }

  /**
   * Deletes match scores
   * @param id Match score ID
   * @returns Deleted match scores
   */
  async remove(id: string) {
    // Check if match scores exist
    const existingScores = await this.prisma.matchScores.findUnique({
      where: { id },
      include: {
        match: {
          select: {
            id: true,
            stageId: true,
            stage: {
              select: {
                tournamentId: true
              }
            }
          }
        }
      }
    });

    if (!existingScores) {
      throw new NotFoundException(`Match scores with ID ${id} not found`);
    }

    const result = await this.prisma.matchScores.delete({
      where: { id },
    });

    return result;
  }

  /**
   * Initialize match scores with zero values for a newly created match
   * @param matchId - ID of the match to initialize scores for
   * @returns Created match scores with all values initialized to zero
   */
  async initializeForMatch(matchId: string) {
    try {
      // Check if match exists
      const match = await this.prisma.match.findUnique({
        where: { id: matchId },
      });

      if (!match) {
        throw new NotFoundException(`Match with ID ${matchId} not found`);
      }

      // Check if scores already exist for this match
      const existingScores = await this.prisma.matchScores.findUnique({
        where: { matchId },
      });

      // If scores already exist, just return them
      if (existingScores) {
        return JsonFieldParser.parseJsonFields(existingScores);
      }

      // Create initial scores with zero values
      const initialScores = await this.prisma.matchScores.create({
        data: {
          match: { connect: { id: matchId } },
          redAutoScore: 0,
          redDriveScore: 0,
          redTotalScore: 0,
          blueAutoScore: 0,
          blueDriveScore: 0,
          blueTotalScore: 0,
          redTeamCount: 0,
          redMultiplier: 1.0,
          blueTeamCount: 0,
          blueMultiplier: 1.0,
          // Initialize JSON fields as empty arrays/objects
          redGameElements: JSON.stringify([]),
          blueGameElements: JSON.stringify([]),
          scoreDetails: JSON.stringify({}),
        },
      });

      return JsonFieldParser.parseJsonFields(initialScores);
    } catch (error) {
      console.error(`Error initializing match scores for match ${matchId}:`, error);
      throw error;
    }
  }
}