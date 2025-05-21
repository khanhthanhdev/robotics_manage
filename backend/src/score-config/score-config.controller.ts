import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ScoreConfigService } from './score-config.service';
import { CreateScoreConfigDto } from './dto/create-score-config.dto';
import { UpdateScoreConfigDto } from './dto/update-score-config.dto';
import { CreateScoreElementDto } from './dto/create-score-element.dto';
import { CreateBonusConditionDto } from './dto/create-bonus-condition.dto';
import { CreatePenaltyConditionDto } from './dto/create-penalty-condition.dto';

@Controller('score-config')
export class ScoreConfigController {
  constructor(private readonly scoreConfigService: ScoreConfigService) {}

  @Post()
  async create(@Body() createDto: CreateScoreConfigDto) {
    try {
      return await this.scoreConfigService.create(createDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.scoreConfigService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scoreConfigService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateScoreConfigDto) {
    try {
      return await this.scoreConfigService.update(id, updateDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.scoreConfigService.remove(id);
  }

  @Get('tournament/:tournamentId')
  async getForTournament(@Param('tournamentId') tournamentId: string) {
    return this.scoreConfigService.getScoreConfigForTournament(tournamentId);
  }

  @Post(':id/elements')
  async addElement(@Param('id') id: string, @Body() dto: CreateScoreElementDto) {
    return this.scoreConfigService.addScoreElement(id, dto);
  }

  @Post(':id/bonus')
  async addBonus(@Param('id') id: string, @Body() dto: CreateBonusConditionDto) {
    return this.scoreConfigService.addBonusCondition(id, dto);
  }

  @Post(':id/penalty')
  async addPenalty(@Param('id') id: string, @Body() dto: CreatePenaltyConditionDto) {
    return this.scoreConfigService.addPenaltyCondition(id, dto);
  }
}
