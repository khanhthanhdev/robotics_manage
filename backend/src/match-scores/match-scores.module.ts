import { Module } from '@nestjs/common';
import { MatchScoresService } from './match-scores.service';
import { MatchScoresController } from './match-scores.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MatchScoresController],
  providers: [MatchScoresService, PrismaService],
  exports: [MatchScoresService]
})
export class MatchScoresModule {}