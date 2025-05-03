import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMatchScoresDto, UpdateMatchScoresDto } from './dto';
import { Prisma } from '@prisma/client';

/**
 * Service for managing match scores
 */
@Injectable()
export class MatchScoresService {
  constructor(private readonly prisma: PrismaService) {}

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
        createMatchScoresDto.redMultiplier = this.calculateMultiplier(createMatchScoresDto.redTeamCount);
      }

      if (createMatchScoresDto.blueTeamCount && !createMatchScoresDto.blueMultiplier) {
        createMatchScoresDto.blueMultiplier = this.calculateMultiplier(createMatchScoresDto.blueTeamCount);
      }

      // Calculate total scores
      const redTotalScore = this.calculateTotalScore(
        createMatchScoresDto.redAutoScore || 0,
        createMatchScoresDto.redDriveScore || 0,
        createMatchScoresDto.redMultiplier || 1.0,
      );

      const blueTotalScore = this.calculateTotalScore(
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
        await this.recalculateTeamStats(createMatchScoresDto.matchId, winningAlliance);
      }
      
      return this.parseJsonFields(matchScores);
    } catch (error) {
      console.error('Error creating match scores:', error);
      
      // // Enhance error handling for Prisma errors
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2014') {
      //     throw new BadRequestException(
      //       `Failed to establish relationship between MatchScores and Match. Please ensure the match with ID ${createMatchScoresDto.matchId} exists.`
      //     );
      //   }
      //   // Add specific handling for other Prisma error codes as needed
      // }
      
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
    return scores.map((score) => this.parseJsonFields(score));
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
    return this.parseJsonFields(score);
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
    return this.parseJsonFields(score);
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
      updateMatchScoresDto.redMultiplier = this.calculateMultiplier(updateMatchScoresDto.redTeamCount);
    }

    if (updateMatchScoresDto.blueTeamCount && !updateMatchScoresDto.blueMultiplier) {
      updateMatchScoresDto.blueMultiplier = this.calculateMultiplier(updateMatchScoresDto.blueTeamCount);
    }

    // Recalculate total scores if component scores are updated
    let redTotalScore: number | undefined = undefined;
    let blueTotalScore: number | undefined = undefined;

    if (
      updateMatchScoresDto.redAutoScore !== undefined ||
      updateMatchScoresDto.redDriveScore !== undefined ||
      updateMatchScoresDto.redMultiplier !== undefined
    ) {
      redTotalScore = this.calculateTotalScore(
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
      blueTotalScore = this.calculateTotalScore(
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
      await this.recalculateTeamStats(updatedScores.matchId, winningAlliance);
    }

    return this.parseJsonFields(updatedScores);
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
        return this.parseJsonFields(existingScores);
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

      return this.parseJsonFields(initialScores);
    } catch (error) {
      console.error(`Error initializing match scores for match ${matchId}:`, error);
      throw error;
    }
  }

  /**
   * Recalculates team statistics for a match
   * @param matchId - Match ID
   * @param winningAlliance - Alliance that won the match
   */
  private async recalculateTeamStats(matchId: string, winningAlliance: 'RED' | 'BLUE' | 'TIE'): Promise<void> {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
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

    if (!match) return;

    // Get all team IDs in this match (excluding surrogates)
    const teamIds = match.alliances.flatMap(alliance => 
      alliance.teamAlliances
        .filter(ta => !ta.isSurrogate)
        .map(ta => ta.teamId)
    );
    
    // Use a single optimized query to get all relevant matches for these teams
    const allTeamMatches = await this.prisma.match.findMany({
      where: {
        stage: {
          tournamentId: match.stage.tournament.id,
        },
        alliances: {
          some: {
            teamAlliances: {
              some: {
                teamId: {
                  in: teamIds
                },
                isSurrogate: false,
              },
            },
          },
        },
        status: 'COMPLETED',
      },
      include: {
        alliances: {
          include: {
            teamAlliances: {
              where: {
                teamId: {
                  in: teamIds
                }
              },
            },
          },
        },
      },
    });

    // Group matches by team for more efficient processing
    const matchesByTeam = new Map<string, any[]>();
    
    // Initialize with empty arrays
    teamIds.forEach(teamId => matchesByTeam.set(teamId, []));
    
    // Populate with relevant matches
    for (const teamMatch of allTeamMatches) {
      for (const alliance of teamMatch.alliances) {
        for (const teamAlliance of alliance.teamAlliances) {
          const matches = matchesByTeam.get(teamAlliance.teamId) || [];
          matches.push({
            ...teamMatch,
            teamAllianceColor: alliance.color
          });
          matchesByTeam.set(teamAlliance.teamId, matches);
        }
      }
    }
    
    // Use batched updates for better performance
    const statsUpdates: Promise<any>[] = [];
    
    // Calculate and update stats for each team
    for (const [teamId, teamMatches] of matchesByTeam.entries()) {
      // Calculate team stats
      let wins = 0;
      let losses = 0;
      let ties = 0;
      const matchesPlayed = teamMatches.length;

      for (const teamMatch of teamMatches) {
        if (teamMatch.winningAlliance === 'TIE') {
          ties++;
        } else if (teamMatch.winningAlliance === teamMatch.teamAllianceColor) {
          wins++;
        } else {
          losses++;
        }
      }

      // Add stats update to batch
      statsUpdates.push(
        this.prisma.teamStats.upsert({
          where: {
            teamId_tournamentId: {
              teamId,
              tournamentId: match.stage.tournament.id,
            },
          },
          create: {
            teamId,
            tournamentId: match.stage.tournament.id,
            wins,
            losses,
            ties,
            matchesPlayed,
          },
          update: {
            wins,
            losses,
            ties,
            matchesPlayed,
          },
        })
      );
    }
    
    // Execute all stats updates in parallel
    await Promise.all(statsUpdates);
  }
  
  /**
   * Parse JSON fields from database strings
   * @param score Match score object with potentially stringified JSON fields
   * @returns Score with parsed JSON fields
   */
  private parseJsonFields(score: any): any {
    return {
      ...score,
      redGameElements: score.redGameElements ? JSON.parse(String(score.redGameElements)) : null,
      blueGameElements: score.blueGameElements ? JSON.parse(String(score.blueGameElements)) : null,
      scoreDetails: score.scoreDetails ? JSON.parse(String(score.scoreDetails)) : null,
    };
  }

  /**
   * Calculates score multiplier based on team count
   * @param teamCount Number of teams
   * @returns Score multiplier
   */
  private calculateMultiplier(teamCount: number): number {
    switch (teamCount) {
      case 1:
        return 1.25;
      case 2:
        return 1.5;
      case 3:
        return 1.75;
      case 4:
        return 2.0;
      default:
        return 1.0;
    }
  }

  /**
   * Calculates total score
   * @param autoScore Autonomous score
   * @param driveScore Driver-controlled score
   * @param multiplier Score multiplier
   * @returns Total score
   */
  private calculateTotalScore(autoScore: number, driveScore: number, multiplier: number = 1.0): number {
    return Math.round((autoScore + driveScore) * multiplier);
  }
}