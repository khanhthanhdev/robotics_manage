import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TeamStatsApiService } from './team-stats-api.service';
import { TeamStatsApiController } from './team-stats-api.controller';

@Module({
  controllers: [TeamStatsApiController],
  providers: [TeamStatsApiService, PrismaService],
  exports: [TeamStatsApiService],
})
export class TeamStatsApiModule {}
