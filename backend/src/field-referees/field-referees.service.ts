import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RefereeAssignment, BatchRefereeAssignment } from './dto/referee-assignment.dto';

@Injectable()
export class FieldRefereesService {
  constructor(private prisma: PrismaService) {}

  async assignRefereesToField(fieldId: string, assignments: RefereeAssignment[]) {
    // Validate: exactly one head referee
    const headRefCount = assignments.filter(a => a.isHeadRef).length;
    if (headRefCount !== 1) {
      throw new BadRequestException('Exactly one head referee must be assigned per field');
    }

    // Validate: 3-4 referees total
    if (assignments.length < 3 || assignments.length > 4) {
      throw new BadRequestException('Must assign 3-4 referees per field');
    }

    // Validate: all users exist and have appropriate roles
    await this.validateRefereeUsers(assignments);

    // Validate: field exists
    await this.validateFieldExists(fieldId);

    return this.prisma.$transaction(async (tx) => {
      // Clear existing assignments
      await tx.fieldReferee.deleteMany({ where: { fieldId } });
      
      // Create new assignments
      await tx.fieldReferee.createMany({
        data: assignments.map(a => ({
          fieldId,
          userId: a.userId,
          isHeadRef: a.isHeadRef
        }))
      });

      // Auto-assign head referee to existing matches without a scorer
      const headReferee = assignments.find(a => a.isHeadRef);
      if (headReferee) {
        await tx.match.updateMany({
          where: { fieldId, scoredById: null },
          data: { scoredById: headReferee.userId }
        });
      }

      return this.getFieldReferees(fieldId);
    });
  }

  async getFieldReferees(fieldId: string) {
    return this.prisma.fieldReferee.findMany({
      where: { fieldId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: [
        { isHeadRef: 'desc' }, // Head referee first
        { createdAt: 'asc' }
      ]
    });
  }

  async removeRefereeFromField(fieldId: string, userId: string) {
    const assignment = await this.prisma.fieldReferee.findUnique({
      where: {
        fieldId_userId: { fieldId, userId }
      }
    });

    if (!assignment) {
      throw new BadRequestException('Referee assignment not found');
    }

    // Check if this is a head referee and prevent removal if matches are assigned
    if (assignment.isHeadRef) {
      const matchesWithHeadRef = await this.prisma.match.count({
        where: { fieldId, scoredById: userId }
      });

      if (matchesWithHeadRef > 0) {
        throw new BadRequestException(
          'Cannot remove head referee: they are assigned as scorer to active matches'
        );
      }
    }

    return this.prisma.fieldReferee.delete({
      where: { fieldId_userId: { fieldId, userId } }
    });
  }

  async batchAssignReferees(assignments: BatchRefereeAssignment[]) {
    // Validate all assignments
    for (const assignment of assignments) {
      await this.validateFieldExists(assignment.fieldId);
    }

    return this.prisma.$transaction(
      assignments.map(assignment => 
        this.prisma.fieldReferee.upsert({
          where: {
            fieldId_userId: {
              fieldId: assignment.fieldId,
              userId: assignment.userId
            }
          },
          update: { isHeadRef: assignment.isHeadRef },
          create: {
            fieldId: assignment.fieldId,
            userId: assignment.userId,
            isHeadRef: assignment.isHeadRef
          }
        })
      )
    );
  }

  async getAvailableReferees() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: ['HEAD_REFEREE', 'ALLIANCE_REFEREE']
        }
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      },
      orderBy: [
        { role: 'asc' }, // HEAD_REFEREE first
        { username: 'asc' }
      ]
    });
  }

  async getRefereesByTournament(tournamentId: string) {
    return this.prisma.fieldReferee.findMany({
      where: {
        field: {
          tournamentId
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        },
        field: {
          select: {
            id: true,
            name: true,
            number: true
          }
        }
      }
    });
  }

  // Private validation methods
  private async validateRefereeUsers(assignments: RefereeAssignment[]) {
    const userIds = assignments.map(a => a.userId);
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
        role: { in: ['HEAD_REFEREE', 'ALLIANCE_REFEREE'] }
      },
      select: { id: true, role: true }
    });

    if (users.length !== userIds.length) {
      throw new BadRequestException('One or more users are not valid referees');
    }

    // Validate head referee role
    const headRefereeAssignment = assignments.find(a => a.isHeadRef);
    const headRefereeUser = users.find(u => u.id === headRefereeAssignment?.userId);
    
    if (headRefereeUser && headRefereeUser.role !== 'HEAD_REFEREE') {
      throw new BadRequestException('Head referee must have HEAD_REFEREE role');
    }
  }

  private async validateFieldExists(fieldId: string) {
    const field = await this.prisma.field.findUnique({
      where: { id: fieldId }
    });

    if (!field) {
      throw new BadRequestException(`Field with ID ${fieldId} not found`);
    }

    return field;
  }
}
