import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaService } from '../prisma.service';
import { MatchScoresService } from '../match-scores/match-scores.service';

// Mock dependencies
const mockMatchScoresService = {
  initializeForMatch: jest.fn().mockResolvedValue(undefined),
};

const mockPrismaService = {
  match: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  alliance: {
    create: jest.fn(),
    update: jest.fn(),
  },
  teamAlliance: {
    create: jest.fn(),
  },
  allianceScoring: {
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('MatchesController', () => {
  let app: INestApplication;
  let matchesService: MatchesService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [
        MatchesService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: MatchScoresService, useValue: mockMatchScoresService },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    matchesService = moduleRef.get<MatchesService>(MatchesService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(matchesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a match and alliances', async () => {
      mockPrismaService.match.create.mockResolvedValue({ id: 'match1' });
      mockPrismaService.alliance.create.mockResolvedValue({ id: 'alliance1' });
      mockPrismaService.teamAlliance.create.mockResolvedValue({});
      mockPrismaService.allianceScoring.create.mockResolvedValue({});
      mockPrismaService.match.findUnique.mockResolvedValue({ id: 'match1', alliances: [] });

      const dto = {
        matchNumber: 1,
        status: 'PENDING',
        stageId: 'stage1',
        alliances: [
          { color: 'RED', teamIds: ['team1', 'team2'] },
          { color: 'BLUE', teamIds: ['team3', 'team4'] },
        ],
      };

      const result = await matchesService.create(dto as any);
      expect(result).toHaveProperty('id', 'match1');
      expect(mockPrismaService.match.create).toHaveBeenCalled();
      expect(mockPrismaService.alliance.create).toHaveBeenCalledTimes(2);
      expect(mockMatchScoresService.initializeForMatch).toHaveBeenCalledWith('match1');
    });
  });

  describe('findAll', () => {
    it('should return all matches', async () => {
      mockPrismaService.match.findMany.mockResolvedValue([{ id: 'match1' }]);
      const result = await matchesService.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id', 'match1');
    });
  });

  describe('findOne', () => {
    it('should return a match by id', async () => {
      mockPrismaService.match.findUnique.mockResolvedValue({ id: 'match1' });
      const result = await matchesService.findOne('match1');
      expect(result).toHaveProperty('id', 'match1');
    });
  });

  describe('update', () => {
    it('should update a match', async () => {
      mockPrismaService.match.update.mockResolvedValue({ id: 'match1', alliances: [] });
      const result = await matchesService.update('match1', { matchNumber: 2 } as any);
      expect(result).toHaveProperty('id', 'match1');
      expect(mockPrismaService.match.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a match', async () => {
      mockPrismaService.match.delete.mockResolvedValue({ id: 'match1' });
      const result = await matchesService.remove('match1');
      expect(result).toHaveProperty('id', 'match1');
      expect(mockPrismaService.match.delete).toHaveBeenCalledWith({ where: { id: 'match1' } });
    });
  });
});
