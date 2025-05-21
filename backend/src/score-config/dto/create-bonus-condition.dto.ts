import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBonusConditionDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsNumber()
  threshold?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
