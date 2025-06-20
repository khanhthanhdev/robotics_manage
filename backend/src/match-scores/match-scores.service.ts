import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMatchScoresDto, UpdateMatchScoresDto } from './dto';
import { ScoreCalculationService } from '../score-config/score-calculation.service';
import { TeamStatsService } from './team-stats.service';
import { MatchSchedulerService } from '../match-scheduler/match-scheduler.service';
import { AllianceColor } from '../utils/prisma-types';

/**
 * Service for managing match scores using the new flexible scoring system
 * Provides backward compatibility with legacy match scores format
 */
@Injectable()
export class MatchScoresService {
  private readonly teamStatsService: TeamStatsService;

  constructor(
    private readonly prisma: PrismaService,
    private readonly scoreCalculationService: ScoreCalculationService,
    private readonly matchSchedulerService: MatchSchedulerService
  ) {
    this.teamStatsService = new TeamStatsService(prisma);
  }

  /**
   * Creates match scores using the new flexible scoring system
   * @param createMatchScoresDto - DTO with legacy match score data
   * @returns Legacy format match scores for backward compatibility
   */
  async create(createMatchScoresDto: CreateMatchScoresDto) {
    try {
      if (!createMatchScoresDto.matchId) {
        throw new BadRequestException('Match ID is required to create match scores');
      }

      // Get match with alliances and tournament info
      const match = await this.prisma.match.findUnique({
        where: { id: createMatchScoresDto.matchId },
        include: { 
          alliances: true,
          stage: { include: { tournament: true } }
        },
      });

      if (!match) {
        throw new NotFoundException(`Match with ID ${createMatchScoresDto.matchId} not found`);
      }

      // Find red and blue alliances
      const redAlliance = match.alliances.find(a => a.color === AllianceColor.RED);
      const blueAlliance = match.alliances.find(a => a.color === AllianceColor.BLUE);

      if (!redAlliance || !blueAlliance) {
        throw new BadRequestException('Match must have both RED and BLUE alliances');
      }      // Update alliance scores directly without flexible scoring system
      const redScore = (createMatchScoresDto as any).redTotalScore || 
                       ((createMatchScoresDto as any).redAutoScore || 0) + ((createMatchScoresDto as any).redDriveScore || 0);
      const blueScore = (createMatchScoresDto as any).blueTotalScore || 
                        ((createMatchScoresDto as any).blueAutoScore || 0) + ((createMatchScoresDto as any).blueDriveScore || 0);

      // Update alliance scores
      await this.prisma.alliance.update({
        where: { id: redAlliance.id },
        data: { score: redScore }
      });

      await this.prisma.alliance.update({
        where: { id: blueAlliance.id },
        data: { score: blueScore }
      });

      // Determine winning alliance
      const winningAlliance = redScore > blueScore ? AllianceColor.RED : 
                             blueScore > redScore ? AllianceColor.BLUE : null;await this.prisma.match.update({
        where: { id: createMatchScoresDto.matchId },
        data: { winningAlliance },
      });

      // Update team stats using the correct method
      const matchWithDetails = await this.prisma.match.findUnique({
        where: { id: createMatchScoresDto.matchId },
        include: {
          stage: { include: { tournament: true } },
          alliances: {
            include: {
              teamAlliances: { where: { isSurrogate: false } }
            }
          }
        }
      });

      if (matchWithDetails) {
        const teamIds = matchWithDetails.alliances.flatMap(
          alliance => alliance.teamAlliances.map(ta => ta.teamId)
        );
        await this.teamStatsService.recalculateTeamStats(matchWithDetails, teamIds);
      }

      // Return legacy format for backward compatibility
      return this.convertToLegacyFormat(createMatchScoresDto.matchId);

    } catch (error) {
      throw error;
    }
  }
  /**
   * Finds match scores by match ID
   */
  async findByMatchId(matchId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        alliances: true,
      },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    return this.convertToLegacyFormat(matchId);
  }
  /**
   * Find all match scores - returns legacy format for backward compatibility
   */
  async findAll() {
    const matches = await this.prisma.match.findMany({
      include: {
        alliances: true
      }
    });

    return Promise.all(matches.map(match => this.convertToLegacyFormat(match.id)));
  }

  /**
   * Find match scores by ID - returns legacy format for backward compatibility
   */
  async findOne(id: string) {
    return this.convertToLegacyFormat(id);
  }
  /**
   * Updates match scores using the simplified Alliance-based scoring
   */
  async update(id: string, updateMatchScoresDto: UpdateMatchScoresDto) {
    // For the simplified approach, just call create which will update the alliance scores
    return this.create({
      ...updateMatchScoresDto,
      matchId: updateMatchScoresDto.matchId || id,
    } as CreateMatchScoresDto);
  }
  /**
   * Resets alliance scores to zero for a match
   */
  async remove(matchId: string) {
    // Get the match with alliances
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: { alliances: true },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    // Reset all alliance scores to 0
    await this.prisma.alliance.updateMany({
      where: { matchId },
      data: { score: 0 },
    });

    // Reset match winning alliance
    await this.prisma.match.update({
      where: { id: matchId },
      data: { winningAlliance: null },
    });

    return { message: `Reset scores for match ${matchId}` };
  }/**
   * Converts alliance scores to legacy format
   */
  private async convertToLegacyFormat(matchId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        alliances: true,
      },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    const redAlliance = match.alliances.find(a => a.color === AllianceColor.RED);
    const blueAlliance = match.alliances.find(a => a.color === AllianceColor.BLUE);

    const redTotal = redAlliance?.score || 0;
    const blueTotal = blueAlliance?.score || 0;

    return {
      id: matchId, // Using matchId as the score ID for compatibility
      matchId,
      redAutoScore: 0, // These breakdown fields are not needed for simplified scoring
      redDriveScore: redTotal, // Put total in drive score for compatibility
      redTotalScore: redTotal,
      blueAutoScore: 0,
      blueDriveScore: blueTotal,
      blueTotalScore: blueTotal,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
