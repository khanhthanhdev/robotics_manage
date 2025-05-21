// ConditionEvaluatorFactory for creating evaluators
import { Condition, ConditionEvaluator } from '../interfaces/condition.interface';
import { ThresholdConditionEvaluator } from './threshold-condition.strategy';
import { CompositeConditionEvaluator } from './composite-condition.strategy';

export class ConditionEvaluatorFactory {
  static create(condition: Condition): ConditionEvaluator {
    switch (condition.type) {
      case 'threshold':
        return new ThresholdConditionEvaluator();
      case 'composite':
        // For composite, recursively create evaluators for subconditions
        const evaluators = (condition.conditions || []).map((sub: Condition) =>
          ConditionEvaluatorFactory.create(sub)
        );
        return new CompositeConditionEvaluator(evaluators);
      default:
        throw new Error(`Unknown condition type: ${condition.type}`);
    }
  }
}
