import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePenaltyConditionDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsNumber()
  threshold?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
