import { TeamStatsService } from './team-stats.service';

describe('TeamStatsService', () => {
  let service: TeamStatsService;
  let prisma: any;

  const mockPrismaService = {
    match: {
      findMany: jest.fn(),
    },
    teamStats: {
      upsert: jest.fn(),
    },
  };

  beforeEach(() => {
    service = new TeamStatsService(mockPrismaService as any);
    prisma = mockPrismaService;
    jest.clearAllMocks();
  });

  it('should do nothing if no match or teamIds', async () => {
    await expect(service.recalculateTeamStats(null as any, [])).resolves.toBeUndefined();
    await expect(service.recalculateTeamStats({ stage: { tournament: { id: 't1' } } }, [])).resolves.toBeUndefined();
    await expect(service.recalculateTeamStats(null as any, ['t1'])).resolves.toBeUndefined();
  });

  it('should handle no matches found', async () => {
    prisma.match.findMany.mockResolvedValue([]);
    prisma.teamStats.upsert.mockResolvedValue({});
    const match = { stage: { tournament: { id: 'tournament1' } } };
    await expect(service.recalculateTeamStats(match, ['t1', 't2'])).resolves.toBeUndefined();
    expect(prisma.match.findMany).toHaveBeenCalled();
    // No upsert should be called since no matches
    expect(prisma.teamStats.upsert).toHaveBeenCalledTimes(2); // still called for each team with 0 matches
  });

  it('should recalculate stats for teams with wins/losses/ties', async () => {
    prisma.match.findMany.mockResolvedValue([
      {
        id: 'm1',
        alliances: [
          { color: 'RED', teamAlliances: [{ teamId: 't1' }] },
          { color: 'BLUE', teamAlliances: [{ teamId: 't2' }] },
        ],
        winningAlliance: 'RED',
      },
      {
        id: 'm2',
        alliances: [
          { color: 'RED', teamAlliances: [{ teamId: 't1' }] },
          { color: 'BLUE', teamAlliances: [{ teamId: 't2' }] },
        ],
        winningAlliance: 'TIE',
      },
    ]);
    prisma.teamStats.upsert.mockResolvedValue({});
    const match = { stage: { tournament: { id: 'tournament1' } } };
    await expect(service.recalculateTeamStats(match, ['t1', 't2'])).resolves.toBeUndefined();
    expect(prisma.match.findMany).toHaveBeenCalled();
    expect(prisma.teamStats.upsert).toHaveBeenCalledTimes(2);
    // Check upsert args for correct stats
    const upsertCalls = prisma.teamStats.upsert.mock.calls;
    expect(upsertCalls[0][0].create).toMatchObject({ teamId: 't1', wins: 1, ties: 1, losses: 0, matchesPlayed: 2 });
    expect(upsertCalls[1][0].create).toMatchObject({ teamId: 't2', wins: 0, ties: 1, losses: 1, matchesPlayed: 2 });
  });

  it('should handle upsert errors gracefully', async () => {
    prisma.match.findMany.mockResolvedValue([
      {
        id: 'm1',
        alliances: [
          { color: 'RED', teamAlliances: [{ teamId: 't1' }] },
          { color: 'BLUE', teamAlliances: [{ teamId: 't2' }] },
        ],
        winningAlliance: 'RED',
      },
    ]);
    prisma.teamStats.upsert.mockRejectedValueOnce(new Error('DB error'));
    const match = { stage: { tournament: { id: 'tournament1' } } };
    await expect(service.recalculateTeamStats(match, ['t1', 't2'])).rejects.toThrow('DB error');
  });

  it('should call upsert with correct tournamentId and teamId', async () => {
    prisma.match.findMany.mockResolvedValue([
      {
        id: 'm1',
        alliances: [
          { color: 'RED', teamAlliances: [{ teamId: 't1' }] },
        ],
        winningAlliance: 'RED',
      },
    ]);
    prisma.teamStats.upsert.mockResolvedValue({});
    const match = { stage: { tournament: { id: 'tournament1' } } };
    await service.recalculateTeamStats(match, ['t1']);
    expect(prisma.teamStats.upsert).toHaveBeenCalledWith({
      where: { teamId_tournamentId: { teamId: 't1', tournamentId: 'tournament1' } },
      create: expect.objectContaining({ teamId: 't1', tournamentId: 'tournament1' }),
      update: expect.objectContaining({ wins: expect.any(Number), losses: expect.any(Number), ties: expect.any(Number), matchesPlayed: expect.any(Number) }),
    });
  });
});
