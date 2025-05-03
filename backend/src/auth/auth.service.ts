import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../utils/prisma-types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: { username: string; password: string; email?: string; role?: UserRole }) {
    // Check if username is already taken
    const existingUser = await this.prisma.user.findUnique({
      where: { username: registerDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Check if email is already taken (if provided)
    if (registerDto.email) {
      try {
        const existingEmail = await this.prisma.user.findFirst({
          where: { email: registerDto.email },
        });

        if (existingEmail) {
          throw new ConflictException('Email already exists');
        }
      } catch (error) {
        // If email query fails, likely means email field doesn't exist in schema
        console.warn('Email check skipped, field might not exist in schema');
      }
    }

    // Default role to COMMON if not specified
    const role = registerDto.role || UserRole.COMMON;

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Create user data object
      const userData: any = {
        username: registerDto.username,
        password: hashedPassword,
        role: role,
      };

      // Only add email if provided
      if (registerDto.email) {
        userData.email = registerDto.email;
      }

      // Create new user
      const newUser = await this.prisma.user.create({
        data: userData,
        select: {
          id: true,
          username: true,
          role: true,
          createdAt: true,
        },
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException('Could not create user: ' + error.message);
    }
  }

  async createDefaultAdmin() {
    const adminUsername = 'admin';
    
    try {
      // Check if admin already exists
      const existingAdmin = await this.prisma.user.findUnique({
        where: { username: adminUsername },
        select: {
          id: true,
          username: true,
          role: true
        }
      });

      if (existingAdmin) {
        return { message: 'Admin user already exists' };
      }

      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await this.prisma.user.create({
        data: {
          username: adminUsername,
          password: hashedPassword,
          role: UserRole.ADMIN,
          // Do not include email field here
        },
      });

      return { message: 'Default admin user created successfully' };
    } catch (error) {
      console.error('Error creating default admin account:', error.message);
      throw new BadRequestException('Failed to create admin account: ' + error.message);
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}