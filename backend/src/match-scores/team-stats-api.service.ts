import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TeamStatsFilterDto } from './dto/team-stats-filter.dto';
import { TeamStatsResponseDto } from './dto/team-stats-response.dto';
import { LeaderboardResponseDto, LeaderboardEntryDto } from './dto/leaderboard-response.dto';

@Injectable()
export class TeamStatsApiService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeamStats(teamId: string, tournamentId?: string, stageId?: string): Promise<TeamStatsResponseDto[]> {
    const where: any = { teamId };
    if (tournamentId) where.tournamentId = tournamentId;
    if (stageId) where.stageId = stageId;
    const stats = await this.prisma.teamStats.findMany({
      where,
      include: {
        team: true,
        tournament: true,
        stage: true,
      },
    });
    return stats.map(this.toDto);
  }

  async getStatsForTournament(tournamentId: string, filter?: TeamStatsFilterDto): Promise<TeamStatsResponseDto[]> {
    const where: any = { tournamentId };
    if (filter?.teamName) where.team = { name: { contains: filter.teamName, mode: 'insensitive' } };
    if (filter?.teamNumber) where.team = { ...(where.team || {}), teamNumber: { contains: filter.teamNumber, mode: 'insensitive' } };
    if (filter?.minWins !== undefined) where.wins = { gte: filter.minWins };
    if (filter?.maxWins !== undefined) where.wins = { ...(where.wins || {}), lte: filter.maxWins };
    if (filter?.minRank !== undefined) where.rank = { gte: filter.minRank };
    if (filter?.maxRank !== undefined) where.rank = { ...(where.rank || {}), lte: filter.maxRank };
    if (filter?.minScore !== undefined) where.pointsScored = { gte: filter.minScore };
    if (filter?.maxScore !== undefined) where.pointsScored = { ...(where.pointsScored || {}), lte: filter.maxScore };
    // Fix: Prisma expects 'asc' | 'desc' not string
    let orderBy: any = undefined;
    if (filter?.sortBy) {
      orderBy = { [filter.sortBy]: filter.sortDir === 'desc' ? 'desc' : 'asc' };
    } else {
      orderBy = { rank: 'asc' };
    }
    const stats = await this.prisma.teamStats.findMany({
      where,
      include: {
        team: true,
        tournament: true,
        stage: true,
      },
      orderBy,
      skip: filter?.offset,
      take: filter?.limit,
    });
    return stats.map(this.toDto);
  }

  async getLeaderboard(tournamentId: string, filter?: TeamStatsFilterDto): Promise<LeaderboardResponseDto> {
    const stats = await this.getStatsForTournament(tournamentId, filter);
    const tournament = stats[0]?.tournamentName || '';
    // Calculate highestScore for each team (use pointsScored as the highest for now, or extend if you have per-match data)
    const rankings = stats.map((s, i) => ({
      ...s,
      position: i + 1,
      highestScore: s.pointsScored, // You can replace this with the real highest if you have per-match breakdown
      totalScore: s.pointsScored,   // Alias for clarity in frontend
    }));
    return {
      tournamentId,
      tournamentName: tournament,
      totalTeams: rankings.length,
      rankings,
    };
  }

  private toDto = (stat: any): TeamStatsResponseDto => {
    const winPercentage = stat.matchesPlayed > 0 ? stat.wins / stat.matchesPlayed : 0;
    const avgPointsScored = stat.matchesPlayed > 0 ? stat.pointsScored / stat.matchesPlayed : 0;
    const avgPointsConceded = stat.matchesPlayed > 0 ? stat.pointsConceded / stat.matchesPlayed : 0;
    return {
      id: stat.id,
      teamId: stat.teamId,
      teamNumber: stat.team?.teamNumber || '',
      teamName: stat.team?.name || '',
      organization: stat.team?.organization,
      tournamentId: stat.tournamentId,
      tournamentName: stat.tournament?.name || '',
      stageId: stat.stageId,
      stageName: stat.stage?.name,
      wins: stat.wins,
      losses: stat.losses,
      ties: stat.ties,
      pointsScored: stat.pointsScored,
      pointsConceded: stat.pointsConceded,
      matchesPlayed: stat.matchesPlayed,
      rankingPoints: stat.rankingPoints,
      opponentWinPercentage: stat.opponentWinPercentage,
      pointDifferential: stat.pointDifferential,
      rank: stat.rank,
      tiebreaker1: stat.tiebreaker1,
      tiebreaker2: stat.tiebreaker2,
      winPercentage,
      avgPointsScored,
      avgPointsConceded,
    };
  };

  /**
   * Calculates rankings for all teams in a tournament (optionally by stage) and writes them to the database.
   * Ranking is by total score (pointsScored desc), then by number of wins (desc).
   * Updates the 'rank' field in teamStats for each team.
   */
  async calculateAndWriteRankings(tournamentId: string, stageId?: string): Promise<void> {
    const where: any = { tournamentId };
    if (stageId) where.stageId = stageId;
    const stats = await this.prisma.teamStats.findMany({
      where,
      include: { team: true }
    });
    // Sort: total score desc, then wins desc
    const sorted = stats.slice().sort((a, b) => {
      if (b.pointsScored !== a.pointsScored) return b.pointsScored - a.pointsScored;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return 0;
    });
    // Assign and write ranks
    for (let i = 0; i < sorted.length; i++) {
      const stat = sorted[i];
      const rank = i + 1;
      await this.prisma.teamStats.update({
        where: { id: stat.id },
        data: { rank }
      });
    }
  }
}
