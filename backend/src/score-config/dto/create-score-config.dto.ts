import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateScoreElementDto } from './create-score-element.dto';

export class CreateScoreConfigDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScoreElementDto)
  elements: CreateScoreElementDto[];
}
