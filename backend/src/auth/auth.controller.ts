import { Controller, Request, Post, UseGuards, Body, Get, UnauthorizedException, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
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
  async login(
    @Body() loginDto: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    // Validate input
    if (!loginDto.username || !loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.authService.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      // Always return the same error for invalid credentials
      throw new UnauthorizedException('Invalid credentials');
    }

    const { access_token, user: userInfo } = await this.authService.login(user);

    // Set JWT as HTTP-only cookie
    res.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    // Do not return the token in the response body for security
    return { user: userInfo, message: 'Login successful' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { message: 'Logged out' };
  }

  @Get('init-admin')
  @HttpCode(201)
  async initializeAdmin() {
    const admin = await this.authService.createDefaultAdmin();
    if ('role' in admin && 'username' in admin) {
      return admin;
    }
    // If only message is returned, still return 201 for idempotency
    return admin;
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