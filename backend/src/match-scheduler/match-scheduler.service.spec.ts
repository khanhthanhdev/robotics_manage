import { Test, TestingModule } from '@nestjs/testing';
import { MatchSchedulerService } from './match-scheduler.service';
import { PrismaService } from '../prisma.service';

// Mocks for PrismaService and its methods
const mockPrisma = {
  match: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
  stage: {
    findUnique: jest.fn(),
  },
  teamStats: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
  teamAlliance: {
    create: jest.fn(),
  },
};

describe('MatchSchedulerService', () => {
  let service: MatchSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchSchedulerService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<MatchSchedulerService>(MatchSchedulerService);
    jest.clearAllMocks();
  });

  describe('generateSwissRound', () => {
    it('throws if stage not found', async () => {
      mockPrisma.stage.findUnique.mockResolvedValue(null);
      await expect(service.generateSwissRound('stage1', 1)).rejects.toThrow('Stage with ID stage1 not found');
    });
    // More tests for Swiss round logic, edge cases, and error handling
  });

  describe('generatePlayoffSchedule', () => {
    it('throws if stage not found', async () => {
      mockPrisma.stage.findUnique.mockResolvedValue(null);
      await expect(service.generatePlayoffSchedule('stage1', 3)).rejects.toThrow('Stage with ID stage1 not found');
    });
    // More tests for playoff bracket generation, seeding, and errors
  });

  describe('updatePlayoffBrackets', () => {
    it('throws if match not found', async () => {
      mockPrisma.match.findUnique.mockResolvedValue(null);
      await expect(service.updatePlayoffBrackets('match1')).rejects.toThrow('Match with ID match1 not found');
    });
    // More tests for advancement, missing alliances, and error paths
  });

  describe('finalizePlayoffRankings', () => {
    it('throws if no matches found', async () => {
      mockPrisma.match.findMany.mockResolvedValue([]);
      await expect(service.finalizePlayoffRankings('stage1')).rejects.toThrow('No matches found for stage stage1');
    });
    // More tests for incomplete matches, correct ranking, and error handling
  });

  describe('updateSwissRankings', () => {
    it('handles missing teamStats and creates them', async () => {
      mockPrisma.teamStats.findMany.mockResolvedValue([]);
      mockPrisma.stage.findUnique.mockResolvedValue({ tournament: { id: 't1', teams: [{ id: 'a' }, { id: 'b' }] } });
      mockPrisma.teamStats.findUnique.mockResolvedValue(null);
      mockPrisma.teamStats.create.mockResolvedValue({});
      mockPrisma.teamStats.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([
        { teamId: 'a', team: {}, wins: 0, losses: 0, ties: 0 },
        { teamId: 'b', team: {}, wins: 0, losses: 0, ties: 0 },
      ]);
      mockPrisma.match.findMany.mockResolvedValue([]);
      await expect(service.updateSwissRankings('stage1')).resolves.toBeUndefined();
    });
    // More tests for ranking calculations, OWP, and error/edge cases
  });
});
