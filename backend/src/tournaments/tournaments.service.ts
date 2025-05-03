import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  create(createTournamentDto: CreateTournamentDto) {
    return this.prisma.tournament.create({
      data: {
        name: createTournamentDto.name,
        description: createTournamentDto.description,
        startDate: new Date(createTournamentDto.startDate),
        endDate: new Date(createTournamentDto.endDate),
        adminId: createTournamentDto.adminId,
      },
    });
  }

  findAll() {
    return this.prisma.tournament.findMany({
      include: {
        admin: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.tournament.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            id: true,
            username: true,
          },
        },
        stages: {
          include: {
            matches: {
              include: {
                alliances: {
                  include: {
                    teamAlliances: {
                      include: {
                        team: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  update(id: string, updateTournamentDto: UpdateTournamentDto) {
    const data: any = {};
    
    if (updateTournamentDto.name) {
      data.name = updateTournamentDto.name;
    }
    
    if (updateTournamentDto.description !== undefined) {
      data.description = updateTournamentDto.description;
    }
    
    if (updateTournamentDto.startDate) {
      data.startDate = new Date(updateTournamentDto.startDate);
    }
    
    if (updateTournamentDto.endDate) {
      data.endDate = new Date(updateTournamentDto.endDate);
    }
    
    return this.prisma.tournament.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.tournament.delete({
      where: { id },
    });
  }
}