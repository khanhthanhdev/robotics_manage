import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBonusConditionDto } from './create-bonus-condition.dto';
import { CreatePenaltyConditionDto } from './create-penalty-condition.dto';

export class CreateScoreElementDto {
  @IsString()
  label: string;

  @IsNumber()
  maxScore: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBonusConditionDto)
  bonusConditions?: CreateBonusConditionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePenaltyConditionDto)
  penaltyConditions?: CreatePenaltyConditionDto[];
}
