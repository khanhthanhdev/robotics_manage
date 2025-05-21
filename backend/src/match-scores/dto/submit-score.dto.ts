// Moved from match-score/dto/submit-score.dto.ts
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitScoreDto {
  @IsString()
  matchId: string;

  @IsString()
  teamId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  elements: any[]; // Replace with a more specific type if available
}
