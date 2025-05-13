import { Module } from '@nestjs/common';
import { MatchScoresService } from './match-scores.service';
import { MatchScoresController } from './match-scores.controller';
import { PrismaService } from '../prisma.service';
import { MatchSchedulerService } from '../match-scheduler/match-scheduler.service';

@Module({
  controllers: [MatchScoresController],
  providers: [MatchScoresService, PrismaService, MatchSchedulerService],
  exports: [MatchScoresService]
})
export class MatchScoresModule {}