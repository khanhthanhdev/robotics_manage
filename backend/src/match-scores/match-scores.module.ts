import { Module } from '@nestjs/common';
import { MatchScoresService } from './match-scores.service';
import { MatchScoresController } from './match-scores.controller';
import { PrismaService } from '../prisma.service';
import { MatchSchedulerModule } from '../match-scheduler/match-scheduler.module';
import { ScoreConfigModule } from '../score-config/score-config.module';

@Module({
  imports: [ScoreConfigModule, MatchSchedulerModule],
  controllers: [MatchScoresController],
  providers: [MatchScoresService, PrismaService],
  exports: [MatchScoresService]
})
export class MatchScoresModule {}