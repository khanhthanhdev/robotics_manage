import { Module } from '@nestjs/common';
import { MatchSchedulerService } from './match-scheduler.service';
import { MatchSchedulerController } from './match-scheduler.controller';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [MatchSchedulerService, PrismaService],
    controllers: [MatchSchedulerController],
    exports: [MatchSchedulerService],
})
export class MatchSchedulerModule { }