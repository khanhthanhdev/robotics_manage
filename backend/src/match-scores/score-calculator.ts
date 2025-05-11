export interface IScoreCalculator {
  calculateMultiplier(teamCount: number): number;
  calculateTotalScore(autoScore: number, driveScore: number, multiplier?: number): number;
}

export class ScoreCalculator implements IScoreCalculator {
  calculateMultiplier(teamCount: number): number {
    switch (teamCount) {
      case 1:
        return 1.25;
      case 2:
        return 1.5;
      case 3:
        return 1.75;
      case 4:
        return 2.0;
      default:
        return 1.0;
    }
  }

  calculateTotalScore(autoScore: number, driveScore: number, multiplier: number = 1.0): number {
    return Math.round((autoScore + driveScore) * multiplier);
  }
}
