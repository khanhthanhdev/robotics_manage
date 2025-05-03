import { Controller, Request, Post, UseGuards, Body, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../utils/prisma-types';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: {
    username: string;
    password: string;
    email?: string;
    role?: UserRole;
  }) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Get('init-admin')
  async initializeAdmin() {
    return this.authService.createDefaultAdmin();
  }

  @Get('check-auth')
  @UseGuards(JwtAuthGuard)
  async checkAuth(@Request() req) {
    // This endpoint requires a valid JWT token
    return {
      authenticated: true,
      user: req.user,
      message: 'Your authentication is working correctly'
    };
  }

  @Get('check-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async checkAdminRole(@Request() req) {
    // This endpoint requires a valid JWT token AND the ADMIN role
    return {
      authenticated: true,
      role: req.user.role,
      hasAdminAccess: true,
      message: 'Your ADMIN role is working correctly'
    };
  }
}