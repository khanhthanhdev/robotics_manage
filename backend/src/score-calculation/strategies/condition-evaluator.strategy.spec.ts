import { ThresholdConditionEvaluator } from './threshold-condition.strategy';
import { CompositeConditionEvaluator } from './composite-condition.strategy';
import { ConditionEvaluatorFactory } from './condition-evaluator.strategy';

describe('ThresholdConditionEvaluator', () => {
  it('should evaluate >= operator', () => {
    const evaluator = new ThresholdConditionEvaluator();
    expect(evaluator.evaluate({ type: 'threshold', field: 'score', operator: '>=', value: 10 }, { score: 12 })).toBe(true);
    expect(evaluator.evaluate({ type: 'threshold', field: 'score', operator: '>=', value: 10 }, { score: 8 })).toBe(false);
  });

  it('should evaluate == operator', () => {
    const evaluator = new ThresholdConditionEvaluator();
    expect(evaluator.evaluate({ type: 'threshold', field: 'score', operator: '==', value: 5 }, { score: 5 })).toBe(true);
    expect(evaluator.evaluate({ type: 'threshold', field: 'score', operator: '==', value: 5 }, { score: 4 })).toBe(false);
  });
});

describe('CompositeConditionEvaluator', () => {
  it('should evaluate AND operator', () => {
    const ev1 = new ThresholdConditionEvaluator();
    const ev2 = new ThresholdConditionEvaluator();
    // Use the same evaluator for each subcondition, not a new instance per call
    const composite = new CompositeConditionEvaluator([
      ev1,
      ev2
    ]);
    const condition = {
      type: 'composite',
      operator: 'AND',
      conditions: [
        { type: 'threshold', field: 'score', operator: '>=', value: 10 },
        { type: 'threshold', field: 'bonus', operator: '==', value: 1 },
      ],
    };
    expect(composite.evaluate(condition, { score: 12, bonus: 1 })).toBe(true);
    expect(composite.evaluate(condition, { score: 12, bonus: 0 })).toBe(false);
  });

  it('should evaluate OR operator', () => {
    const ev1 = new ThresholdConditionEvaluator();
    const ev2 = new ThresholdConditionEvaluator();
    const composite = new CompositeConditionEvaluator([
      ev1,
      ev2
    ]);
    const condition = {
      type: 'composite',
      operator: 'OR',
      conditions: [
        { type: 'threshold', field: 'score', operator: '>=', value: 10 },
        { type: 'threshold', field: 'bonus', operator: '==', value: 1 },
      ],
    };
    expect(composite.evaluate(condition, { score: 8, bonus: 1 })).toBe(true);
    expect(composite.evaluate(condition, { score: 8, bonus: 0 })).toBe(false);
  });
});
