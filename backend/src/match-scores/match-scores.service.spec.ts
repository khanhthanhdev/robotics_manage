import { Test, TestingModule } from '@nestjs/testing';
import { MatchScoresService } from './match-scores.service';
import { PrismaService } from '../prisma.service';
import { TeamStatsService } from './team-stats.service';
import { BadRequestException } from '@nestjs/common';

// Mock for MatchSchedulerService
class MockMatchSchedulerService {}

describe('MatchScoresService', () => {
  let service: MatchScoresService;
  let prisma: any;

  const mockPrismaService = {
    matchScores: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    match: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((cb) => cb(mockPrismaService)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchScoresService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: 'MatchSchedulerService', useClass: MockMatchSchedulerService },
        { provide: require('./../match-scheduler/match-scheduler.service').MatchSchedulerService, useClass: MockMatchSchedulerService },
      ],
    }).compile();
    service = module.get<MatchScoresService>(MatchScoresService);
    prisma = mockPrismaService;
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw if matchId is missing', async () => {
      await expect(service.create({} as any)).rejects.toBeDefined();
    });
    it('should throw if match does not exist', async () => {
      prisma.match.findUnique.mockResolvedValueOnce(null);
      await expect(service.create({ matchId: 'm1' } as any)).rejects.toBeDefined();
    });
    it('should throw if match scores already exist', async () => {
      prisma.match.findUnique.mockResolvedValueOnce({ id: 'm1' });
      prisma.matchScores.findUnique.mockResolvedValueOnce({ id: 's1' });
      await expect(service.create({ matchId: 'm1' } as any)).rejects.toBeDefined();
    });
    it('should create match scores and update match', async () => {
      prisma.match.findUnique.mockResolvedValueOnce({ id: 'm1' });
      prisma.matchScores.findUnique.mockResolvedValueOnce(null);
      prisma.matchScores.create.mockResolvedValue({ id: 's1', matchId: 'm1' });
      prisma.match.update.mockResolvedValue({});
      prisma.match.findUnique.mockResolvedValueOnce({ id: 'm1', alliances: [], stage: { tournament: {} } });
      const dto = { matchId: 'm1', redAutoScore: 10, blueAutoScore: 5 };
      const result = await service.create(dto as any);
      expect(result).toHaveProperty('id', 's1');
      expect(prisma.matchScores.create).toHaveBeenCalled();
      expect(prisma.match.update).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all match scores', async () => {
      prisma.matchScores.findMany.mockResolvedValue([{ id: 's1', match: {} }]);
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a match score by id', async () => {
      prisma.matchScores.findUnique.mockResolvedValue({ id: 's1', match: {} });
      const result = await service.findOne('s1');
      expect(result).toHaveProperty('id', 's1');
    });
    it('should throw if not found', async () => {
      prisma.matchScores.findUnique.mockResolvedValue(null);
      await expect(service.findOne('notfound')).rejects.toBeDefined();
    });
  });

  describe('update', () => {
    it('should throw if not found', async () => {
      prisma.matchScores.findUnique.mockResolvedValue(null);
      await expect(service.update('notfound', {} as any)).rejects.toBeDefined();
    });
    it('should update match scores', async () => {
      prisma.matchScores.findUnique.mockResolvedValue({ id: 's1', match: { id: 'm1', stageId: 'st1', stage: { tournamentId: 't1' } } });
      prisma.matchScores.update = jest.fn().mockResolvedValue({ id: 's1' });
      const result = await service.update('s1', { redAutoScore: 10 } as any);
      expect(result).toHaveProperty('id', 's1');
    });
  });

  describe('remove', () => {
    it('should throw if not found', async () => {
      prisma.matchScores.findUnique.mockResolvedValue(null);
      await expect(service.remove('notfound')).rejects.toBeDefined();
    });
    it('should delete match scores', async () => {
      prisma.matchScores.findUnique.mockResolvedValue({ id: 's1', match: { id: 'm1', stageId: 'st1', stage: { tournamentId: 't1' } } });
      prisma.matchScores.delete.mockResolvedValue({ id: 's1' });
      const result = await service.remove('s1');
      expect(result).toHaveProperty('id', 's1');
      expect(prisma.matchScores.delete).toHaveBeenCalledWith({ where: { id: 's1' } });
    });
  });
});

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
  });

  it('should recalculate stats for teams', async () => {
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
    expect(prisma.teamStats.upsert).toHaveBeenCalled();
  });
});
