import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';
import { PrismaService } from '../prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('TournamentsService', () => {
  let service: TournamentsService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a tournament', async () => {
      const dto = { name: 'Tournament 1', description: "Test tournament using jest", location: 'City', startDate: '2025-05-13', endDate: '2025-05-14', adminId: 'admin1' };
      const now = new Date();
      const tournament = {
        id: 't1',
        name: dto.name,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        createdAt: now,
        updatedAt: now,
        adminId: dto.adminId,
      };
      prisma.tournament.create.mockResolvedValue(tournament);
      const result = await service.create(dto as any);
      expect(result).toHaveProperty('id', 't1');
      expect(prisma.tournament.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          description: dto.description,
          startDate: new Date(dto.startDate),
          endDate: new Date(dto.endDate),
          adminId: dto.adminId,
        },
      });
    });
    it('should throw if prisma throws', async () => {
      prisma.tournament.create.mockRejectedValue(new Error('DB error'));
      await expect(service.create({} as any)).rejects.toThrow('DB error');
    });
  });

  describe('findAll', () => {
    it('should return all tournaments', async () => {
      const now = new Date();
      const tournament = {
        id: 't1',
        name: 'Tournament 1',
        description: 'desc',
        startDate: now,
        endDate: now,
        createdAt: now,
        updatedAt: now,
        adminId: 'admin1',
      };
      prisma.tournament.findMany.mockResolvedValue([tournament]);
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id', 't1');
    });
    it('should handle empty result', async () => {
      prisma.tournament.findMany.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
    it('should throw if prisma throws', async () => {
      prisma.tournament.findMany.mockRejectedValue(new Error('DB error'));
      await expect(service.findAll()).rejects.toThrow('DB error');
    });
  });

  describe('findOne', () => {
    it('should return a tournament by id', async () => {
      const now = new Date();
      const tournament = {
        id: 't1',
        name: 'Tournament 1',
        description: 'desc',
        startDate: now,
        endDate: now,
        createdAt: now,
        updatedAt: now,
        adminId: 'admin1',
      };
      prisma.tournament.findUnique.mockResolvedValue(tournament);
      const result = await service.findOne('t1');
      expect(result).toHaveProperty('id', 't1');
    });
    it('should return null if not found', async () => {
      prisma.tournament.findUnique.mockResolvedValue(null);
      const result = await service.findOne('notfound');
      expect(result).toBeNull();
    });
    it('should throw if prisma throws', async () => {
      prisma.tournament.findUnique.mockRejectedValue(new Error('DB error'));
      await expect(service.findOne('t1')).rejects.toThrow('DB error');
    });
  });

  describe('update', () => {
    it('should update a tournament', async () => {
      const now = new Date();
      const tournament = {
        id: 't1',
        name: 'Updated',
        description: 'desc',
        startDate: now,
        endDate: now,
        createdAt: now,
        updatedAt: now,
        adminId: 'admin1',
      };
      prisma.tournament.update.mockResolvedValue(tournament);
      const result = await service.update('t1', { name: 'Updated' } as any);
      expect(result).toHaveProperty('id', 't1');
      expect(prisma.tournament.update).toHaveBeenCalledWith({
        where: { id: 't1' },
        data: { name: 'Updated' },
      });
    });
    it('should throw if prisma throws', async () => {
      prisma.tournament.update.mockRejectedValue(new Error('DB error'));
      await expect(service.update('t1', { name: 'fail' } as any)).rejects.toThrow('DB error');
    });
  });

  describe('remove', () => {
    it('should delete a tournament', async () => {
      const now = new Date();
      const tournament = {
        id: 't1',
        name: 'Tournament 1',
        description: 'desc',
        startDate: now,
        endDate: now,
        createdAt: now,
        updatedAt: now,
        adminId: 'admin1',
      };
      prisma.tournament.delete.mockResolvedValue(tournament);
      const result = await service.remove('t1');
      expect(result).toHaveProperty('id', 't1');
      expect(prisma.tournament.delete).toHaveBeenCalledWith({ where: { id: 't1' } });
    });
    it('should throw if prisma throws', async () => {
      prisma.tournament.delete.mockRejectedValue(new Error('DB error'));
      await expect(service.remove('t1')).rejects.toThrow('DB error');
    });
  });
});
