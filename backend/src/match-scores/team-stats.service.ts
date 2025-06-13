import { PrismaService } from '../prisma.service';

export class TeamStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async recalculateTeamStats(match: any, teamIds: string[]): Promise<void> {
    if (!match || !teamIds.length) return;
    const allTeamMatches = await this.prisma.match.findMany({
      where: {
        stage: { tournamentId: match.stage.tournament.id },
        alliances: {
          some: {
            teamAlliances: {
              some: { teamId: { in: teamIds }, isSurrogate: false },
            },
          },
        },
        status: 'COMPLETED',
      },
      include: {
        alliances: {
          include: {
            teamAlliances: { where: { teamId: { in: teamIds } } },
          },
        },
      },
    });
    const matchesByTeam = new Map<string, any[]>();
    teamIds.forEach(teamId => matchesByTeam.set(teamId, []));
    for (const teamMatch of allTeamMatches) {
      for (const alliance of teamMatch.alliances) {
        for (const teamAlliance of alliance.teamAlliances) {
          const matches = matchesByTeam.get(teamAlliance.teamId) || [];
          matches.push({ ...teamMatch, teamAllianceColor: alliance.color });
          matchesByTeam.set(teamAlliance.teamId, matches);
        }
      }
    }
    const statsUpdates: Promise<any>[] = [];
    for (const [teamId, teamMatches] of matchesByTeam.entries()) {
      let wins = 0, losses = 0, ties = 0;
      const matchesPlayed = teamMatches.length;
      for (const teamMatch of teamMatches) {
        if (teamMatch.winningAlliance === 'TIE') ties++;
        else if (teamMatch.winningAlliance === teamMatch.teamAllianceColor) wins++;
        else losses++;
      }
      statsUpdates.push(
        this.prisma.teamStats.upsert({
          where: { teamId_tournamentId: { teamId, tournamentId: match.stage.tournament.id } },
          create: { teamId, tournamentId: match.stage.tournament.id, wins, losses, ties, matchesPlayed },
          update: { wins, losses, ties, matchesPlayed },
        })
      );
    }
    await Promise.all(statsUpdates);
  }
}
