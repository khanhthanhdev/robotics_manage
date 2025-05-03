import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: hashedPassword,
        role: createUserDto.role,
        createdById: createUserDto.createdById,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists before updating
    const userExists = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true }
    });

    if (!userExists) {
      throw new Error(`User with ID ${id} not found`);
    }

    const data: any = {};
    
    if (updateUserDto.username) {
      data.username = updateUserDto.username;
    }
    
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    if (updateUserDto.role) {
      data.role = updateUserDto.role;
    }
    
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  remove(id: string) {
    // Check if user exists before deleting
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true }
    }).then(user => {
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return this.prisma.user.delete({
        where: { id },
      });
    });
  }
}