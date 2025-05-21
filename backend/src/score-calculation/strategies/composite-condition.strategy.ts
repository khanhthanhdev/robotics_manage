// CompositeConditionEvaluator implementation
import { ConditionEvaluator, CompositeCondition, Condition } from '../interfaces/condition.interface';

export class CompositeConditionEvaluator implements ConditionEvaluator {
  constructor(private evaluators: ConditionEvaluator[]) {}

  evaluate(condition: Condition, context: any): boolean {
    const { operator, conditions } = condition as CompositeCondition;
    if (operator === 'AND') {
      return this.evaluators.every((evaluator, idx) => evaluator.evaluate(conditions[idx], context));
    } else if (operator === 'OR') {
      return this.evaluators.some((evaluator, idx) => evaluator.evaluate(conditions[idx], context));
    } else {
      throw new Error(`Unknown composite operator: ${operator}`);
    }
  }
}
