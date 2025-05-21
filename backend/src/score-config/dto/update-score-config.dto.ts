import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreConfigDto } from './create-score-config.dto';

export class UpdateScoreConfigDto extends PartialType(CreateScoreConfigDto) {}
