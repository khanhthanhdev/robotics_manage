import { Module } from '@nestjs/common';
import { ScoreConfigService } from './score-config.service';
import { ScoreConfigController } from './score-config.controller';

@Module({
  controllers: [ScoreConfigController],
  providers: [ScoreConfigService],
  exports: [ScoreConfigService],
})
export class ScoreConfigModule {}
