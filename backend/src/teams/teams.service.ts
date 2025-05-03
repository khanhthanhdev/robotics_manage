import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ImportTeamsDto } from './dto/import-teams.dto';

interface TeamData {
  name: string;
  organization?: string;
  description?: string;
}

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) { }

  /**
   * Generate a sequential team number in the format 000001, 000002, etc.
   */
  private async generateNextTeamNumber(): Promise<string> {
    try {
      // Find all existing team numbers
      const allTeams = await this.prisma.team.findMany({
        select: {
          teamNumber: true
        }
      });

      // Find the highest numeric team number
      let highestNumber = 0;

      for (const team of allTeams) {
        // Remove any leading zeros
        const cleanNumber = team.teamNumber.replace(/^0+/, '');

        if (/^\d+$/.test(cleanNumber)) {
          const num = parseInt(cleanNumber, 10);
          if (num > highestNumber) {
            highestNumber = num;
          }
        }
      }

      // Increment and format with leading zeros
      const nextNumber = highestNumber + 1;
      return nextNumber.toString().padStart(6, '0');
    } catch (error) {
      console.error("Error generating team number:", error);
      return Math.floor(100000 + Math.random() * 900000).toString(); // Fallback random 6-digit number
    }
  }

  async create(createTeamDto: CreateTeamDto) {
    // Auto-generate team number if not provided
    const teamNumber = createTeamDto.teamNumber || await this.generateNextTeamNumber();

    // Check if team number already exists
    const existingTeam = await this.prisma.team.findUnique({
      where: { teamNumber },
    });

    if (existingTeam) {
      throw new BadRequestException(`Team with number ${teamNumber} already exists`);
    }

    // Format team members if provided
    let teamMembers = undefined;
    try {
      if (createTeamDto.teamMembers !== undefined) {
        teamMembers = Array.isArray(createTeamDto.teamMembers)
          ? createTeamDto.teamMembers
          : typeof createTeamDto.teamMembers === 'string'
            ? JSON.parse(createTeamDto.teamMembers)
            : createTeamDto.teamMembers;
      }
    } catch (error) {
      throw new BadRequestException(`Invalid teamMembers format: ${error.message}`);
    }

    try {
      return this.prisma.team.create({
        data: {
          teamNumber,
          name: createTeamDto.name,
          organization: createTeamDto.organization,
          avatar: createTeamDto.avatar,
          description: createTeamDto.description,
          teamMembers,
          tournamentId: createTeamDto.tournamentId,
        },
        include: {
          tournament: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to create team: ${error.message}`);
    }
  }

  findAll(tournamentId?: string) {
    const where = tournamentId ? { tournamentId } : {};

    return this.prisma.team.findMany({
      where,
      include: {
        tournament: true,
      },
      orderBy: {
        teamNumber: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: {
        tournament: true,
        teamAlliances: {
          include: {
            alliance: {
              include: {
                match: {
                  include: {
                    stage: {
                      include: {
                        tournament: true,
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

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    // Check if team exists
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    // Check if updating to an existing team number
    if (updateTeamDto.teamNumber && updateTeamDto.teamNumber !== team.teamNumber) {
      const existingTeam = await this.prisma.team.findUnique({
        where: { teamNumber: updateTeamDto.teamNumber },
      });

      if (existingTeam && existingTeam.id !== id) {
        throw new BadRequestException(`Team with number ${updateTeamDto.teamNumber} already exists`);
      }
    }

    // Format team members if provided
    let teamMembers = undefined;
    try {
      if (updateTeamDto.teamMembers !== undefined) {
        teamMembers = Array.isArray(updateTeamDto.teamMembers)
          ? updateTeamDto.teamMembers
          : typeof updateTeamDto.teamMembers === 'string'
            ? JSON.parse(updateTeamDto.teamMembers)
            : updateTeamDto.teamMembers;
      }
    } catch (error) {
      throw new BadRequestException(`Invalid teamMembers format: ${error.message}`);
    }

    try {
      return this.prisma.team.update({
        where: { id },
        data: {
          teamNumber: updateTeamDto.teamNumber,
          name: updateTeamDto.name,
          organization: updateTeamDto.organization,
          avatar: updateTeamDto.avatar,
          description: updateTeamDto.description,
          teamMembers,
          tournamentId: updateTeamDto.tournamentId,
        },
        include: {
          tournament: true,
        }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to update team: ${error.message}`);
    }
  }

  async remove(id: string) {
    // Check if team exists
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return this.prisma.team.delete({
      where: { id },
    });
  }

  /**
   * Import multiple teams from CSV content or copy-pasted text
   */
  async importTeams(importTeamsDto: ImportTeamsDto) {
    const { content, format, hasHeader, delimiter, tournamentId } = importTeamsDto;

    try {
      // Parse the content into lines
      const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

      // Skip header if needed
      const dataLines = hasHeader ? lines.slice(1) : lines;

      if (dataLines.length === 0) {
        throw new BadRequestException('No team data found in the content');
      }

      // Parse each line into a team
      const teamsToCreate: TeamData[] = [];
      for (const line of dataLines) {
        const parts = line.split(delimiter).map(part => part.trim());

        if (parts.length < 1) {
          throw new BadRequestException(`Invalid line format: ${line}. Expected at least team name`);
        }

        // First column is now the name, teamNumber will be auto-generated
        const name = parts[0];
        const organization = parts.length > 1 ? parts[1] : undefined;
        const description = parts.length > 2 ? parts[2] : undefined;

        teamsToCreate.push({
          name,
          organization,
          description
        });
      }

      // Create all teams one by one to avoid conflicts
      const createdTeams: any[] = [];

      for (const teamData of teamsToCreate) {
        try {
          // Generate a unique team number for each team
          const teamNumber = await this.generateNextTeamNumber();

          // Ensure this team number doesn't already exist
          const existingTeam = await this.prisma.team.findUnique({
            where: { teamNumber },
          });

          if (existingTeam) {
            console.log(`Team number ${teamNumber} already exists, retrying with a new number`);
            continue; // Skip this iteration and try again
          }

          // Create the team
          const team = await this.prisma.team.create({
            data: {
              teamNumber,
              name: teamData.name,
              organization: teamData.organization,
              description: teamData.description,
              tournamentId // Add the tournament ID to associate teams with a tournament
            },
            include: {
              tournament: true
            }
          });

          createdTeams.push(team);
        } catch (error) {
          console.error(`Error creating team ${teamData.name}:`, error);
          // Continue with other teams
        }
      }

      return {
        success: true,
        message: `Successfully imported ${createdTeams.length} teams`,
        teams: createdTeams
      };

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to import teams: ${error.message}`);
    }
  }
}