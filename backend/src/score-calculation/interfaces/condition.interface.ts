// ConditionEvaluator interface for strategy pattern
export interface ConditionEvaluator {
  evaluate(condition: any, context: any): boolean;
}

// Condition interface to be used by all condition evaluators
export interface Condition {
  type: string;
  [key: string]: any;
}

// More explicit proposal-aligned interfaces
export interface ThresholdCondition extends Condition {
  type: 'threshold';
  field: string;
  operator: '>=' | '>' | '<=' | '<' | '==' | '!=';
  value: number;
}

export interface CompositeCondition extends Condition {
  type: 'composite';
  operator: 'AND' | 'OR';
  conditions: Condition[];
}
