import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // Use environment variable in production
    });
  }

  async validate(payload: any) {
    try {
      // Log the payload for debugging
      this.logger.debug(`JWT payload: ${JSON.stringify(payload)}`);
      
      // Find the user by ID from JWT payload
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          username: true,
          role: true,
        },
      });

      if (!user) {
        this.logger.warn(`User with ID ${payload.sub} not found`);
        throw new UnauthorizedException('User not found');
      }

      this.logger.debug(`User authenticated: ${user.username}, role: ${user.role}`);
      return user;
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}