// ScoreCalculationService: Core calculation logic
import { Injectable } from '@nestjs/common';

// import { PrismaService } from '../prisma.service';
// import { ScoreConfigService } from '../score-config/score-config.service';
// import { ConditionEvaluatorFactory } from './strategies/condition-evaluator.strategy';

@Injectable()
export class ScoreCalculationService {
  // constructor(private prisma: PrismaService, private scoreConfigService: ScoreConfigService) {}

  async calculateScore(config: any, input: any) {
    // Implement core score calculation logic
  }

  async calculateMatchScore(matchId: string, alliance: string, input: any) {
    // TODO: Implement calculation logic:
    // 1. Validate match and alliance
    // 2. Get score config for match
    // 3. Calculate base scores from input
    // 4. Evaluate bonus conditions
    // 5. Evaluate penalty conditions
    // 6. Create or update match score record
    return { message: 'calculateMatchScore not implemented', matchId, alliance, input };
  }
}
