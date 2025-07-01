import { Module } from '@nestjs/common';
import { FieldRefereesService } from './field-referees.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FieldRefereesService, PrismaService],
  exports: [FieldRefereesService],
})
export class FieldRefereesModule {}
