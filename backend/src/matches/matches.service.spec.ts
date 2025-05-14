import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaService } from '../prisma.service';
import { MatchScoresService } from '../match-scores/match-scores.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('MatchesController', () => {
  let app: INestApplication;
  let matchesService: MatchesService;
  let prisma: DeepMockProxy<PrismaService>;
  let matchScoresService: DeepMockProxy<MatchScoresService>;

  beforeAll(async () => {
    prisma = mockDeep<PrismaService>();
    matchScoresService = mockDeep<MatchScoresService>();
    matchScoresService.initializeForMatch.mockResolvedValue(undefined);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [
        MatchesService,
        { provide: PrismaService, useValue: prisma },
        { provide: MatchScoresService, useValue: matchScoresService },
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
      prisma.match.create.mockResolvedValue({ id: 'match1', alliances: [] } as any);
      prisma.alliance.create.mockResolvedValue({ id: 'alliance1' } as any);
      prisma.teamAlliance.create.mockResolvedValue({} as any);
      prisma.allianceScoring.create.mockResolvedValue({} as any);
      prisma.match.findUnique.mockResolvedValue({ id: 'match1', alliances: [] } as any);

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
      expect(prisma.match.create).toHaveBeenCalled();
      expect(prisma.alliance.create).toHaveBeenCalledTimes(2);
      expect(matchScoresService.initializeForMatch).toHaveBeenCalledWith('match1');
    });
  });

  describe('findAll', () => {
    it('should return all matches', async () => {
      prisma.match.findMany.mockResolvedValue([{ id: 'match1' } as any]);
      const result = await matchesService.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id', 'match1');
    });
  });

  describe('findOne', () => {
    it('should return a match by id', async () => {
      prisma.match.findUnique.mockResolvedValue({ id: 'match1' } as any);
      const result = await matchesService.findOne('match1');
      expect(result).toHaveProperty('id', 'match1');
    });
  });

  describe('update', () => {
    it('should update a match', async () => {
      prisma.match.update.mockResolvedValue({ id: 'match1', alliances: [] } as any);
      const result = await matchesService.update('match1', { matchNumber: 2 } as any);
      expect(result).toHaveProperty('id', 'match1');
      expect(prisma.match.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a match', async () => {
      prisma.match.delete.mockResolvedValue({ id: 'match1' } as any);
      const result = await matchesService.remove('match1');
      expect(result).toHaveProperty('id', 'match1');
      expect(prisma.match.delete).toHaveBeenCalledWith({ where: { id: 'match1' } });
    });
  });
});
