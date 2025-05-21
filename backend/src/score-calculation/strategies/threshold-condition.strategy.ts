// ThresholdConditionEvaluator implementation
import { ConditionEvaluator, ThresholdCondition, Condition } from '../interfaces/condition.interface';

export class ThresholdConditionEvaluator implements ConditionEvaluator {
  evaluate(condition: Condition, context: any): boolean {
    const { field, operator, value } = condition as ThresholdCondition;
    const actual = context[field];
    switch (operator) {
      case '>=':
        return actual >= value;
      case '>':
        return actual > value;
      case '<=':
        return actual <= value;
      case '<':
        return actual < value;
      case '==':
        return actual == value;
      case '!=':
        return actual != value;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }
}
