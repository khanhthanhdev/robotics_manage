import { PrismaService } from '../prisma.service';
import { Match as PrismaMatch } from '../utils/prisma-types';

/**
 * Swiss-style round generation and ranking logic.
 * Extracted from MatchSchedulerService for separation of concerns.
 */
export class SwissScheduler {
  constructor(private readonly prisma: PrismaService) {}

  async updateSwissRankings(stageId: string): Promise<void> {
    let teamStats = await this.prisma.teamStats.findMany({
      where: { stageId },
      include: { team: true }
    });
    const matches = await this.prisma.match.findMany({
      where: { stageId },
      include: {
        alliances: { include: { teamAlliances: true } },
        matchScores: true
      }
    });
    if (teamStats.length === 0) {
      const stageObj = await this.prisma.stage.findUnique({
        where: { id: stageId },
        include: { tournament: { include: { teams: true } } }
      });
      if (stageObj?.tournament?.teams) {
        for (const team of stageObj.tournament.teams) {
          const existing = await this.prisma.teamStats.findUnique({
            where: { teamId_tournamentId: { teamId: team.id, tournamentId: stageObj.tournament.id } }
          });
          if (existing && !existing.stageId) {
            await this.prisma.teamStats.update({
              where: { teamId_tournamentId: { teamId: team.id, tournamentId: stageObj.tournament.id } },
              data: { stageId }
            });
          } else if (!existing) {
            await this.prisma.teamStats.create({
              data: {
                teamId: team.id,
                tournamentId: stageObj.tournament.id,
                stageId,
              }
            });
          }
        }
        teamStats = await this.prisma.teamStats.findMany({
          where: { stageId },
          include: { team: true }
        });
      } else {
        return;
      }
    }
    const teamResults = new Map<string, {
      wins: number,
      losses: number,
      ties: number,
      pointsScored: number,
      pointsConceded: number,
      opponents: Set<string>
    }>();
    for (const stats of teamStats) {
      teamResults.set(stats.teamId, {
        wins: 0,
        losses: 0,
        ties: 0,
        pointsScored: 0,
        pointsConceded: 0,
        opponents: new Set<string>()
      });
    }
    for (const match of matches) {
      const scoreRed = match.matchScores?.redTotalScore ?? 0;
      const scoreBlue = match.matchScores?.blueTotalScore ?? 0;
      const redTeams = match.alliances.find(a => a.color === 'RED')?.teamAlliances.map(ta => ta.teamId) ?? [];
      const blueTeams = match.alliances.find(a => a.color === 'BLUE')?.teamAlliances.map(ta => ta.teamId) ?? [];
      for (const teamId of redTeams) {
        const result = teamResults.get(teamId);
        if (!result) continue;
        result.pointsScored += scoreRed;
        result.pointsConceded += scoreBlue;
        blueTeams.forEach(op => result.opponents.add(op));
        if (scoreRed > scoreBlue) result.wins++;
        else if (scoreRed < scoreBlue) result.losses++;
        else result.ties++;
      }
      for (const teamId of blueTeams) {
        const result = teamResults.get(teamId);
        if (!result) continue;
        result.pointsScored += scoreBlue;
        result.pointsConceded += scoreRed;
        redTeams.forEach(op => result.opponents.add(op));
        if (scoreBlue > scoreRed) result.wins++;
        else if (scoreBlue < scoreRed) result.losses++;
        else result.ties++;
      }
    }
    const winPercents = new Map<string, number>();
    for (const [teamId, result] of teamResults.entries()) {
      const total = result.wins + result.losses + result.ties;
      winPercents.set(teamId, total > 0 ? result.wins / total : 0);
    }
    for (const [teamId, result] of teamResults.entries()) {
      let owp = 0;
      if (result.opponents.size > 0) {
        owp = Array.from(result.opponents)
          .map(opId => winPercents.get(opId) ?? 0)
          .reduce((a, b) => a + b, 0) / result.opponents.size;
      }
      const pointDiff = result.pointsScored - result.pointsConceded;
      const rankingPoints = result.wins * 2 + result.ties;
      await this.prisma.teamStats.updateMany({
        where: { stageId, teamId },
        data: {
          wins: result.wins,
          losses: result.losses,
          ties: result.ties,
          pointsScored: result.pointsScored,
          pointsConceded: result.pointsConceded,
          matchesPlayed: result.wins + result.losses + result.ties,
          rankingPoints,
          opponentWinPercentage: owp,
          pointDifferential: pointDiff
        }
      });
    }
  }

  async getSwissRankings(stageId: string) {
    return this.prisma.teamStats.findMany({
      where: { stageId },
      orderBy: [
        { rankingPoints: 'desc' },
        { opponentWinPercentage: 'desc' },
        { pointDifferential: 'desc' },
        { matchesPlayed: 'desc' }
      ],
      include: { team: true }
    });
  }
}
