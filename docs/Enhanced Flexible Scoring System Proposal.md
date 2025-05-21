# Enhanced Flexible Scoring System Proposal

This document outlines a detailed proposal for implementing a flexible scoring system in the Robotics Tournament Management System, specifically designed to accommodate complex scoring rules like those in the fire-fighting competition while maintaining adaptability for future competition types.

## 1. Schema Design

### 1.1 New Prisma Schema Models

```prisma
model ScoreConfig {
  id                String           @id @default(uuid())
  tournamentId      String
  tournament        Tournament       @relation(fields: [tournamentId], references: [id])
  name              String           // e.g., "Fire Fighting Competition 2025"
  description       String?
  scoreElements     ScoreElement[]
  bonusConditions   BonusCondition[]
  penaltyConditions PenaltyCondition[]
  matchScores       MatchScore[]     // Relation to match scores using this config
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
}

model ScoreElement {
  id            String      @id @default(uuid())
  scoreConfigId String
  scoreConfig   ScoreConfig @relation(fields: [scoreConfigId], references: [id], onDelete: Cascade)
  name          String      // e.g., "Dry Powder in Own Area"
  code          String      // Unique identifier for this element, e.g., "dry_powder_own"
  description   String?
  pointsPerUnit Int         // e.g., 5 (can be negative for penalties)
  maxUnits      Int?        // Optional limit (e.g., max 10 balls)
  category      String?     // For grouping related elements
  elementType   String      // "counter" (numeric) or "boolean" (yes/no)
  displayOrder  Int         // For UI ordering
  icon          String?     // Optional icon reference
  color         String?     // Optional color for UI
  
  @@unique([scoreConfigId, code])
}

model BonusCondition {
  id            String      @id @default(uuid())
  scoreConfigId String
  scoreConfig   ScoreConfig @relation(fields: [scoreConfigId], references: [id], onDelete: Cascade)
  name          String      // e.g., "5 Dry Powder Balls Bonus"
  code          String      // Unique identifier, e.g., "five_balls_bonus"
  description   String?
  bonusPoints   Int         // e.g., 10
  condition     Json        // JSON for storing condition logic
  displayOrder  Int         // For UI ordering
  
  @@unique([scoreConfigId, code])
}

model PenaltyCondition {
  id            String      @id @default(uuid())
  scoreConfigId String
  scoreConfig   ScoreConfig @relation(fields: [scoreConfigId], references: [id], onDelete: Cascade)
  name          String      // e.g., "Red Area Violation"
  code          String      // Unique identifier, e.g., "red_area_violation"
  description   String?
  penaltyPoints Int         // e.g., -10
  condition     Json        // JSON for storing condition logic
  displayOrder  Int         // For UI ordering
  
  @@unique([scoreConfigId, code])
}

model MatchScore {
  id                String      @id @default(uuid())
  matchId           String
  match             Match       @relation(fields: [matchId], references: [id])
  allianceId        String
  alliance          Alliance    @relation(fields: [allianceId], references: [id])
  scoreConfigId     String
  scoreConfig       ScoreConfig @relation(fields: [scoreConfigId], references: [id])
  elementScores     Json        // Store counts for each ScoreElement
  bonusesEarned     String[]    // IDs of earned BonusCondition
  penaltiesIncurred String[]    // IDs of incurred PenaltyCondition
  calculationLog    Json?       // Optional detailed breakdown of score calculation
  totalScore        Int         // Calculated total
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@unique([matchId, allianceId])
}
```

### 1.2 Condition JSON Structure

For the `condition` field in `BonusCondition` and `PenaltyCondition`, we'll use a structured JSON format:

```json
{
  "type": "threshold",
  "elementCode": "dry_powder_own",
  "operator": ">=",
  "value": 5
}
```

Or for more complex conditions:

```json
{
  "type": "composite",
  "operator": "AND",
  "conditions": [
    {
      "type": "threshold",
      "elementCode": "dry_powder_own",
      "operator": ">=",
      "value": 5
    },
    {
      "type": "threshold",
      "elementCode": "red_area_balls",
      "operator": ">",
      "value": 0
    }
  ]
}
```

## 2. Backend Implementation (NestJS)

### 2.1 Module Structure

```
src/
├── score-config/
│   ├── score-config.module.ts
│   ├── score-config.controller.ts
│   ├── score-config.service.ts
│   ├── dto/
│   │   ├── create-score-config.dto.ts
│   │   ├── update-score-config.dto.ts
│   │   ├── create-score-element.dto.ts
│   │   ├── create-bonus-condition.dto.ts
│   │   └── create-penalty-condition.dto.ts
│   └── entities/
│       ├── score-config.entity.ts
│       ├── score-element.entity.ts
│       ├── bonus-condition.entity.ts
│       └── penalty-condition.entity.ts
├── match-score/
│   ├── match-score.module.ts
│   ├── match-score.controller.ts
│   ├── match-score.service.ts
│   ├── dto/
│   │   ├── submit-score.dto.ts
│   │   └── score-calculation-result.dto.ts
│   └── entities/
│       └── match-score.entity.ts
└── score-calculation/
    ├── score-calculation.module.ts
    ├── score-calculation.service.ts
    ├── interfaces/
    │   ├── condition.interface.ts
    │   └── score-element-value.interface.ts
    └── strategies/
        ├── condition-evaluator.strategy.ts
        ├── threshold-condition.strategy.ts
        └── composite-condition.strategy.ts
```

### 2.2 Service Layer Design

Following SOLID principles, we'll implement:

#### ScoreConfigService

```typescript
@Injectable()
export class ScoreConfigService {
  constructor(private prisma: PrismaService) {}

  async createScoreConfig(data: CreateScoreConfigDto): Promise<ScoreConfig> {
    const { scoreElements, bonusConditions, penaltyConditions, ...configData } = data;
    
    return this.prisma.$transaction(async (prisma) => {
      // Create the score config
      const scoreConfig = await prisma.scoreConfig.create({
        data: {
          ...configData,
          scoreElements: {
            create: scoreElements || [],
          },
          bonusConditions: {
            create: bonusConditions || [],
          },
          penaltyConditions: {
            create: penaltyConditions || [],
          },
        },
        include: {
          scoreElements: true,
          bonusConditions: true,
          penaltyConditions: true,
        },
      });
      
      return scoreConfig;
    });
  }

  async getScoreConfigForTournament(tournamentId: string): Promise<ScoreConfig> {
    return this.prisma.scoreConfig.findFirst({
      where: { tournamentId },
      include: {
        scoreElements: {
          orderBy: { displayOrder: 'asc' },
        },
        bonusConditions: {
          orderBy: { displayOrder: 'asc' },
        },
        penaltyConditions: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });
  }

  async getScoreConfigById(id: string): Promise<ScoreConfig> {
    return this.prisma.scoreConfig.findUnique({
      where: { id },
      include: {
        scoreElements: {
          orderBy: { displayOrder: 'asc' },
        },
        bonusConditions: {
          orderBy: { displayOrder: 'asc' },
        },
        penaltyConditions: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });
  }

  async updateScoreConfig(id: string, data: UpdateScoreConfigDto): Promise<ScoreConfig> {
    // Implementation for updating score config
  }

  async addScoreElement(scoreConfigId: string, data: CreateScoreElementDto): Promise<ScoreElement> {
    // Implementation for adding a score element
  }

  async addBonusCondition(scoreConfigId: string, data: CreateBonusConditionDto): Promise<BonusCondition> {
    // Implementation for adding a bonus condition
  }

  async addPenaltyCondition(scoreConfigId: string, data: CreatePenaltyConditionDto): Promise<PenaltyCondition> {
    // Implementation for adding a penalty condition
  }

  // Other CRUD operations for elements, bonuses, penalties
}
```

#### ScoreCalculationService

```typescript
@Injectable()
export class ScoreCalculationService {
  constructor(
    private prisma: PrismaService,
    private conditionEvaluatorFactory: ConditionEvaluatorFactory,
  ) {}

  async calculateMatchScore(
    matchId: string, 
    allianceId: string, 
    elementScores: Record<string, number>,
    scoreConfigId?: string
  ): Promise<MatchScore> {
    // 1. Get the match and alliance to verify they exist
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: { 
        stage: { 
          include: { tournament: true } 
        } 
      },
    });
    
    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }
    
    const alliance = await this.prisma.alliance.findUnique({
      where: { id: allianceId },
    });
    
    if (!alliance) {
      throw new NotFoundException(`Alliance with ID ${allianceId} not found`);
    }
    
    // 2. Get the score config (either provided or from tournament)
    const configId = scoreConfigId || 
      (await this.prisma.scoreConfig.findFirst({
        where: { tournamentId: match.stage.tournamentId },
        orderBy: { createdAt: 'desc' },
      }))?.id;
    
    if (!configId) {
      throw new NotFoundException(`No score configuration found for this match`);
    }
    
    const scoreConfig = await this.prisma.scoreConfig.findUnique({
      where: { id: configId },
      include: {
        scoreElements: true,
        bonusConditions: true,
        penaltyConditions: true,
      },
    });
    
    // 3. Calculate base scores from elementScores
    let totalScore = 0;
    const calculationLog: any = { elements: [], bonuses: [], penalties: [] };
    
    // Process each score element
    for (const element of scoreConfig.scoreElements) {
      const value = elementScores[element.code] || 0;
      const elementScore = value * element.pointsPerUnit;
      totalScore += elementScore;
      
      calculationLog.elements.push({
        elementCode: element.code,
        elementName: element.name,
        value,
        pointsPerUnit: element.pointsPerUnit,
        totalPoints: elementScore,
      });
    }
    
    // 4. Evaluate bonus conditions
    const bonusesEarned: string[] = [];
    
    for (const bonus of scoreConfig.bonusConditions) {
      const conditionEvaluator = this.conditionEvaluatorFactory.createEvaluator(bonus.condition);
      const conditionMet = conditionEvaluator.evaluate(elementScores);
      
      if (conditionMet) {
        totalScore += bonus.bonusPoints;
        bonusesEarned.push(bonus.id);
        
        calculationLog.bonuses.push({
          bonusCode: bonus.code,
          bonusName: bonus.name,
          bonusPoints: bonus.bonusPoints,
        });
      }
    }
    
    // 5. Evaluate penalty conditions
    const penaltiesIncurred: string[] = [];
    
    for (const penalty of scoreConfig.penaltyConditions) {
      const conditionEvaluator = this.conditionEvaluatorFactory.createEvaluator(penalty.condition);
      const conditionMet = conditionEvaluator.evaluate(elementScores);
      
      if (conditionMet) {
        totalScore += penalty.penaltyPoints; // Note: penalty points are already negative
        penaltiesIncurred.push(penalty.id);
        
        calculationLog.penalties.push({
          penaltyCode: penalty.code,
          penaltyName: penalty.name,
          penaltyPoints: penalty.penaltyPoints,
        });
      }
    }
    
    calculationLog.totalScore = totalScore;
    
    // 6. Save and return MatchScore
    return this.prisma.matchScore.upsert({
      where: {
        matchId_allianceId: {
          matchId,
          allianceId,
        },
      },
      update: {
        scoreConfigId: configId,
        elementScores,
        bonusesEarned,
        penaltiesIncurred,
        calculationLog,
        totalScore,
      },
      create: {
        matchId,
        allianceId,
        scoreConfigId: configId,
        elementScores,
        bonusesEarned,
        penaltiesIncurred,
        calculationLog,
        totalScore,
      },
    });
  }
}
```

#### ConditionEvaluator Strategy Pattern

```typescript
// interfaces/condition.interface.ts
export interface Condition {
  type: string;
  [key: string]: any;
}

export interface ConditionEvaluator {
  evaluate(elementScores: Record<string, number>): boolean;
}

// strategies/condition-evaluator.strategy.ts
@Injectable()
export class ConditionEvaluatorFactory {
  createEvaluator(condition: Condition): ConditionEvaluator {
    switch (condition.type) {
      case 'threshold':
        return new ThresholdConditionEvaluator(condition);
      case 'composite':
        return new CompositeConditionEvaluator(condition, this);
      default:
        throw new Error(`Unknown condition type: ${condition.type}`);
    }
  }
}

// strategies/threshold-condition.strategy.ts
export class ThresholdConditionEvaluator implements ConditionEvaluator {
  private elementCode: string;
  private operator: string;
  private value: number;
  
  constructor(condition: Condition) {
    this.elementCode = condition.elementCode;
    this.operator = condition.operator;
    this.value = condition.value;
  }
  
  evaluate(elementScores: Record<string, number>): boolean {
    const elementValue = elementScores[this.elementCode] || 0;
    
    switch (this.operator) {
      case '==': return elementValue === this.value;
      case '!=': return elementValue !== this.value;
      case '>': return elementValue > this.value;
      case '>=': return elementValue >= this.value;
      case '<': return elementValue < this.value;
      case '<=': return elementValue <= this.value;
      default: throw new Error(`Unknown operator: ${this.operator}`);
    }
  }
}

// strategies/composite-condition.strategy.ts
export class CompositeConditionEvaluator implements ConditionEvaluator {
  private operator: string;
  private conditions: ConditionEvaluator[];
  
  constructor(
    condition: Condition,
    private factory: ConditionEvaluatorFactory,
  ) {
    this.operator = condition.operator;
    this.conditions = condition.conditions.map(c => factory.createEvaluator(c));
  }
  
  evaluate(elementScores: Record<string, number>): boolean {
    if (this.operator === 'AND') {
      return this.conditions.every(c => c.evaluate(elementScores));
    } else if (this.operator === 'OR') {
      return this.conditions.some(c => c.evaluate(elementScores));
    } else {
      throw new Error(`Unknown composite operator: ${this.operator}`);
    }
  }
}
```

### 2.3 Controller Layer

```typescript
@Controller('score-configs')
export class ScoreConfigController {
  constructor(private scoreConfigService: ScoreConfigService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createScoreConfigDto: CreateScoreConfigDto) {
    return this.scoreConfigService.createScoreConfig(createScoreConfigDto);
  }

  @Get('tournament/:tournamentId')
  async getForTournament(@Param('tournamentId') tournamentId: string) {
    return this.scoreConfigService.getScoreConfigForTournament(tournamentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scoreConfigService.getScoreConfigById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateScoreConfigDto: UpdateScoreConfigDto,
  ) {
    return this.scoreConfigService.updateScoreConfig(id, updateScoreConfigDto);
  }

  @Post(':id/elements')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async addElement(
    @Param('id') id: string,
    @Body() createScoreElementDto: CreateScoreElementDto,
  ) {
    return this.scoreConfigService.addScoreElement(id, createScoreElementDto);
  }

  // Additional endpoints for bonuses, penalties, etc.
}

@Controller('match-scores')
export class MatchScoresController {
  constructor(
    private scoreCalculationService: ScoreCalculationService,
    private matchesService: MatchesService,
  ) {}

  @Post(':matchId/alliance/:allianceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('REFEREE', 'ADMIN')
  async submitMatchScore(
    @Param('matchId') matchId: string,
    @Param('allianceId') allianceId: string,
    @Body() scoreData: SubmitScoreDto,
  ) {
    const matchScore = await this.scoreCalculationService.calculateMatchScore(
      matchId,
      allianceId,
      scoreData.elementScores,
      scoreData.scoreConfigId,
    );
    
    // Update alliance score in the Alliance model
    await this.matchesService.updateAllianceScore(allianceId, matchScore.totalScore);
    
    return matchScore;
  }

  @Get(':matchId/alliance/:allianceId')
  async getMatchScore(
    @Param('matchId') matchId: string,
    @Param('allianceId') allianceId: string,
  ) {
    return this.prisma.matchScore.findUnique({
      where: {
        matchId_allianceId: {
          matchId,
          allianceId,
        },
      },
      include: {
        scoreConfig: {
          include: {
            scoreElements: true,
            bonusConditions: true,
            penaltyConditions: true,
          },
        },
      },
    });
  }
}
```

### 2.4 DTOs

```typescript
// dto/create-score-config.dto.ts
export class CreateScoreConfigDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  tournamentId: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateScoreElementDto)
  scoreElements?: CreateScoreElementDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBonusConditionDto)
  bonusConditions?: CreateBonusConditionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePenaltyConditionDto)
  penaltyConditions?: CreatePenaltyConditionDto[];
}

// dto/create-score-element.dto.ts
export class CreateScoreElementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  pointsPerUnit: number;

  @IsInt()
  @IsOptional()
  maxUnits?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsIn(['counter', 'boolean'])
  elementType: string;

  @IsInt()
  @IsOptional()
  displayOrder?: number = 0;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string;
}

// dto/submit-score.dto.ts
export class SubmitScoreDto {
  @IsObject()
  @ValidateNested()
  elementScores: Record<string, number>;

  @IsString()
  @IsOptional()
  scoreConfigId?: string;
}
```

## 3. Frontend Implementation (Next.js)

### 3.1 Directory Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── tournaments/
│   │   │   ├── [tournamentId]/
│   │   │   │   ├── score-config/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── create/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── [configId]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── edit/
│   │   │   │   │           └── page.tsx
│   │   │   │   └── matches/
│   │   │   │       └── [matchId]/
│   │   │   │           └── scoring/
│   │   │   │               └── page.tsx
│   ├── referee/
│   │   ├── matches/
│   │   │   └── [matchId]/
│   │   │       └── scoring/
│   │   │           └── page.tsx
│   └── audience/
│       └── matches/
│           └── [matchId]/
│               └── scores/
│                   └── page.tsx
├── components/
│   ├── scoring/
│   │   ├── ScoreConfigForm.tsx
│   │   ├── ScoreElementForm.tsx
│   │   ├── BonusConditionForm.tsx
│   │   ├── PenaltyConditionForm.tsx
│   │   ├── ConditionBuilder.tsx
│   │   ├── DynamicScoreInput.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── ScoreSummary.tsx
│   └── ui/
│       ├── Counter.tsx
│       ├── Checkbox.tsx
│       └── ...
├── hooks/
│   ├── tanstack-query/
│   │   ├── useScoreConfig.ts
│   │   ├── useCreateScoreConfig.ts
│   │   ├── useUpdateScoreConfig.ts
│   │   ├── useMatchScore.ts
│   │   └── useSubmitScore.ts
│   └── ...
├── lib/
│   ├── api-client.ts
│   └── score-calculation.ts
└── types/
    ├── score-config.ts
    ├── match-score.ts
    └── condition.ts
```

### 3.2 Types

```typescript
// types/score-config.ts
export interface ScoreConfig {
  id: string;
  tournamentId: string;
  name: string;
  description?: string;
  scoreElements: ScoreElement[];
  bonusConditions: BonusCondition[];
  penaltyConditions: PenaltyCondition[];
  createdAt: string;
  updatedAt: string;
}

export interface ScoreElement {
  id: string;
  scoreConfigId: string;
  name: string;
  code: string;
  description?: string;
  pointsPerUnit: number;
  maxUnits?: number;
  category?: string;
  elementType: 'counter' | 'boolean';
  displayOrder: number;
  icon?: string;
  color?: string;
}

export interface Condition {
  type: 'threshold' | 'composite';
  [key: string]: any;
}

export interface ThresholdCondition extends Condition {
  type: 'threshold';
  elementCode: string;
  operator: '==' | '!=' | '>' | '>=' | '<' | '<=';
  value: number;
}

export interface CompositeCondition extends Condition {
  type: 'composite';
  operator: 'AND' | 'OR';
  conditions: Condition[];
}

export interface BonusCondition {
  id: string;
  scoreConfigId: string;
  name: string;
  code: string;
  description?: string;
  bonusPoints: number;
  condition: Condition;
  displayOrder: number;
}

export interface PenaltyCondition {
  id: string;
  scoreConfigId: string;
  name: string;
  code: string;
  description?: string;
  penaltyPoints: number;
  condition: Condition;
  displayOrder: number;
}

// types/match-score.ts
export interface MatchScore {
  id: string;
  matchId: string;
  allianceId: string;
  scoreConfigId: string;
  elementScores: Record<string, number>;
  bonusesEarned: string[];
  penaltiesIncurred: string[];
  calculationLog?: any;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
  scoreConfig?: ScoreConfig;
}
```

### 3.3 TanStack Query Hooks

```typescript
// hooks/tanstack-query/useScoreConfig.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ScoreConfig } from '@/types/score-config';

export const useScoreConfig = (tournamentId: string) => {
  return useQuery<ScoreConfig>({
    queryKey: ['scoreConfig', tournamentId],
    queryFn: () => apiClient.get(`/score-configs/tournament/${tournamentId}`),
  });
};

export const useScoreConfigById = (configId: string | undefined) => {
  return useQuery<ScoreConfig>({
    queryKey: ['scoreConfig', configId],
    queryFn: () => apiClient.get(`/score-configs/${configId}`),
    enabled: !!configId,
  });
};

// hooks/tanstack-query/useCreateScoreConfig.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ScoreConfig } from '@/types/score-config';

export const useCreateScoreConfig = () => {
  const queryClient = useQueryClient();
  
  return useMutation<
    ScoreConfig, 
    Error, 
    { 
      name: string; 
      description?: string; 
      tournamentId: string;
      scoreElements?: any[];
      bonusConditions?: any[];
      penaltyConditions?: any[];
    }
  >({
    mutationFn: (data) => apiClient.post('/score-configs', data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['scoreConfig', data.tournamentId] });
    },
  });
};

// hooks/tanstack-query/useMatchScore.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { MatchScore } from '@/types/match-score';

export const useMatchScore = (matchId: string, allianceId: string) => {
  return useQuery<MatchScore>({
    queryKey: ['matchScore', matchId, allianceId],
    queryFn: () => apiClient.get(`/match-scores/${matchId}/alliance/${allianceId}`),
  });
};

// hooks/tanstack-query/useSubmitScore.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { MatchScore } from '@/types/match-score';

export const useSubmitScore = (matchId: string, allianceId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<
    MatchScore, 
    Error, 
    { 
      elementScores: Record<string, number>; 
      scoreConfigId?: string;
    }
  >({
    mutationFn: (data) => 
      apiClient.post(`/match-scores/${matchId}/alliance/${allianceId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchScore', matchId, allianceId] });
      // Also invalidate the match data to update alliance scores
      queryClient.invalidateQueries({ queryKey: ['match', matchId] });
    },
  });
};
```

### 3.4 Components

#### ScoreConfigForm Component

```tsx
// components/scoring/ScoreConfigForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea, Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { ScoreElementForm } from './ScoreElementForm';
import { BonusConditionForm } from './BonusConditionForm';
import { PenaltyConditionForm } from './PenaltyConditionForm';
import { useCreateScoreConfig } from '@/hooks/tanstack-query/useCreateScoreConfig';
import { ScoreConfig, ScoreElement, BonusCondition, PenaltyCondition } from '@/types/score-config';

interface ScoreConfigFormProps {
  tournamentId: string;
  initialData?: Partial<ScoreConfig>;
  isEditing?: boolean;
}

export const ScoreConfigForm = ({ 
  tournamentId, 
  initialData = {}, 
  isEditing = false 
}: ScoreConfigFormProps) => {
  const router = useRouter();
  const createMutation = useCreateScoreConfig();
  
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    tournamentId,
  });
  
  const [scoreElements, setScoreElements] = useState<Partial<ScoreElement>[]>(
    initialData.scoreElements || []
  );
  
  const [bonusConditions, setBonusConditions] = useState<Partial<BonusCondition>[]>(
    initialData.bonusConditions || []
  );
  
  const [penaltyConditions, setPenaltyConditions] = useState<Partial<PenaltyCondition>[]>(
    initialData.penaltyConditions || []
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddScoreElement = (element: Partial<ScoreElement>) => {
    setScoreElements(prev => [...prev, { ...element, displayOrder: prev.length }]);
  };
  
  const handleAddBonusCondition = (bonus: Partial<BonusCondition>) => {
    setBonusConditions(prev => [...prev, { ...bonus, displayOrder: prev.length }]);
  };
  
  const handleAddPenaltyCondition = (penalty: Partial<PenaltyCondition>) => {
    setPenaltyConditions(prev => [...prev, { ...penalty, displayOrder: prev.length }]);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        ...formData,
        scoreElements,
        bonusConditions,
        penaltyConditions,
      };
      
      if (isEditing && initialData.id) {
        // Handle update logic
      } else {
        await createMutation.mutateAsync(payload);
        router.push(`/admin/tournaments/${tournamentId}/score-config`);
      }
    } catch (error) {
      console.error('Error saving score config:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? 'Edit Score Configuration' : 'Create Score Configuration'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Configuration Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Fire Fighting Competition 2025"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the scoring system..."
              rows={3}
            />
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="elements">
        <TabsList>
          <TabsTrigger value="elements">Score Elements</TabsTrigger>
          <TabsTrigger value="bonuses">Bonus Conditions</TabsTrigger>
          <TabsTrigger value="penalties">Penalty Conditions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="elements">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Score Elements</h3>
            
            <div className="space-y-4">
              {scoreElements.map((element, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h4>{element.name}</h4>
                  <p>{element.pointsPerUnit} points per {element.elementType === 'boolean' ? 'yes' : 'unit'}</p>
                  {/* Add edit/delete buttons */}
                </div>
              ))}
              
              <ScoreElementForm onAdd={handleAddScoreElement} />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="bonuses">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Bonus Conditions</h3>
            
            <div className="space-y-4">
              {bonusConditions.map((bonus, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h4>{bonus.name}</h4>
                  <p>+{bonus.bonusPoints} points when condition is met</p>
                  {/* Add edit/delete buttons */}
                </div>
              ))}
              
              <BonusConditionForm 
                onAdd={handleAddBonusCondition} 
                scoreElements={scoreElements} 
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="penalties">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Penalty Conditions</h3>
            
            <div className="space-y-4">
              {penaltyConditions.map((penalty, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h4>{penalty.name}</h4>
                  <p>{penalty.penaltyPoints} points when condition is met</p>
                  {/* Add edit/delete buttons */}
                </div>
              ))}
              
              <PenaltyConditionForm 
                onAdd={handleAddPenaltyCondition} 
                scoreElements={scoreElements} 
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(`/admin/tournaments/${tournamentId}/score-config`)}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
```

#### ConditionBuilder Component

```tsx
// components/scoring/ConditionBuilder.tsx
import { useState } from 'react';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from '@/components/ui';
import { Condition, ThresholdCondition, CompositeCondition, ScoreElement } from '@/types/score-config';

interface ConditionBuilderProps {
  scoreElements: Partial<ScoreElement>[];
  initialCondition?: Condition;
  onChange: (condition: Condition) => void;
}

export const ConditionBuilder = ({ 
  scoreElements, 
  initialCondition, 
  onChange 
}: ConditionBuilderProps) => {
  const [conditionType, setConditionType] = useState<'threshold' | 'composite'>(
    initialCondition?.type || 'threshold'
  );
  
  const [thresholdCondition, setThresholdCondition] = useState<Partial<ThresholdCondition>>({
    type: 'threshold',
    elementCode: initialCondition?.type === 'threshold' ? initialCondition.elementCode : '',
    operator: initialCondition?.type === 'threshold' ? initialCondition.operator : '>=',
    value: initialCondition?.type === 'threshold' ? initialCondition.value : 0,
  });
  
  const [compositeCondition, setCompositeCondition] = useState<Partial<CompositeCondition>>({
    type: 'composite',
    operator: initialCondition?.type === 'composite' ? initialCondition.operator : 'AND',
    conditions: initialCondition?.type === 'composite' ? initialCondition.conditions : [],
  });
  
  const [subConditions, setSubConditions] = useState<Condition[]>(
    initialCondition?.type === 'composite' ? initialCondition.conditions : []
  );
  
  const handleThresholdChange = (field: keyof ThresholdCondition, value: any) => {
    const updated = { ...thresholdCondition, [field]: value };
    setThresholdCondition(updated);
    
    if (updated.elementCode && updated.operator && updated.value !== undefined) {
      onChange(updated as ThresholdCondition);
    }
  };
  
  const handleCompositeOperatorChange = (operator: 'AND' | 'OR') => {
    const updated = { ...compositeCondition, operator };
    setCompositeCondition(updated);
    
    if (subConditions.length > 0) {
      onChange({ ...updated, conditions: subConditions } as CompositeCondition);
    }
  };
  
  const handleAddSubCondition = (condition: Condition) => {
    const updated = [...subConditions, condition];
    setSubConditions(updated);
    
    onChange({
      type: 'composite',
      operator: compositeCondition.operator,
      conditions: updated,
    } as CompositeCondition);
  };
  
  const handleRemoveSubCondition = (index: number) => {
    const updated = subConditions.filter((_, i) => i !== index);
    setSubConditions(updated);
    
    if (updated.length > 0) {
      onChange({
        type: 'composite',
        operator: compositeCondition.operator,
        conditions: updated,
      } as CompositeCondition);
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Condition Type</label>
        <Select
          value={conditionType}
          onValueChange={(value: 'threshold' | 'composite') => setConditionType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select condition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="threshold">Threshold (Simple)</SelectItem>
            <SelectItem value="composite">Composite (AND/OR)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {conditionType === 'threshold' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Score Element</label>
            <Select
              value={thresholdCondition.elementCode}
              onValueChange={(value) => handleThresholdChange('elementCode', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select score element" />
              </SelectTrigger>
              <SelectContent>
                {scoreElements.map((element) => (
                  <SelectItem key={element.code} value={element.code!}>
                    {element.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Operator</label>
            <Select
              value={thresholdCondition.operator}
              onValueChange={(value) => handleThresholdChange('operator', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="==">Equal to (==)</SelectItem>
                <SelectItem value="!=">Not equal to (!=)</SelectItem>
                <SelectItem value=">">Greater than (>)</SelectItem>
                <SelectItem value=">=">Greater than or equal to (>=)</SelectItem>
                <SelectItem value="<">Less than (<)</SelectItem>
                <SelectItem value="<=">Less than or equal to (<=)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <Input
              type="number"
              value={thresholdCondition.value}
              onChange={(e) => handleThresholdChange('value', parseInt(e.target.value))}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Composite Operator</label>
            <Select
              value={compositeCondition.operator}
              onValueChange={(value: 'AND' | 'OR') => handleCompositeOperatorChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND (All conditions must be true)</SelectItem>
                <SelectItem value="OR">OR (Any condition must be true)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Sub-Conditions</label>
            
            {subConditions.map((condition, index) => (
              <div key={index} className="p-3 border rounded-md">
                {condition.type === 'threshold' ? (
                  <div className="flex justify-between items-center">
                    <span>
                      {scoreElements.find(e => e.code === condition.elementCode)?.name} 
                      {' '}{condition.operator}{' '}
                      {condition.value}
                    </span>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRemoveSubCondition(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>Composite {condition.operator} condition</span>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRemoveSubCondition(index)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            <div className="border border-dashed p-4 rounded-md">
              <h4 className="font-medium mb-2">Add Sub-Condition</h4>
              <ConditionBuilder 
                scoreElements={scoreElements}
                onChange={handleAddSubCondition}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

#### DynamicScoreInput Component

```tsx
// components/scoring/DynamicScoreInput.tsx
import { useState, useEffect } from 'react';
import { Card, Button, Counter, Checkbox, Alert, AlertTitle, AlertDescription } from '@/components/ui';
import { useScoreConfig } from '@/hooks/tanstack-query/useScoreConfig';
import { useMatchScore } from '@/hooks/tanstack-query/useMatchScore';
import { useSubmitScore } from '@/hooks/tanstack-query/useSubmitScore';
import { ScoreElement } from '@/types/score-config';

interface DynamicScoreInputProps {
  tournamentId: string;
  matchId: string;
  allianceId: string;
  allianceColor: string;
}

export const DynamicScoreInput = ({ 
  tournamentId, 
  matchId, 
  allianceId,
  allianceColor
}: DynamicScoreInputProps) => {
  const { data: scoreConfig, isLoading: configLoading } = useScoreConfig(tournamentId);
  const { data: existingScore } = useMatchScore(matchId, allianceId);
  const submitMutation = useSubmitScore(matchId, allianceId);
  
  const [elementScores, setElementScores] = useState<Record<string, number>>({});
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  
  // Initialize scores from existing data or defaults
  useEffect(() => {
    if (scoreConfig?.scoreElements) {
      const initialScores: Record<string, number> = {};
      
      // Start with zeros for all elements
      scoreConfig.scoreElements.forEach(element => {
        initialScores[element.code] = 0;
      });
      
      // Override with existing scores if available
      if (existingScore?.elementScores) {
        Object.assign(initialScores, existingScore.elementScores);
      }
      
      setElementScores(initialScores);
      setCalculatedScore(existingScore?.totalScore || null);
    }
  }, [scoreConfig, existingScore]);
  
  const handleChange = (code: string, value: number) => {
    setElementScores(prev => ({ ...prev, [code]: value }));
    // Reset calculated score when user makes changes
    setCalculatedScore(null);
  };
  
  const handleSubmit = async () => {
    try {
      const result = await submitMutation.mutateAsync({
        elementScores,
        scoreConfigId: scoreConfig?.id,
      });
      
      setCalculatedScore(result.totalScore);
    } catch (error) {
      console.error('Error submitting scores:', error);
    }
  };
  
  if (configLoading) return <div>Loading score configuration...</div>;
  if (!scoreConfig) return <div>No score configuration found for this tournament</div>;
  
  // Group elements by category
  const elementsByCategory: Record<string, ScoreElement[]> = {};
  scoreConfig.scoreElements.forEach(element => {
    const category = element.category || 'Uncategorized';
    if (!elementsByCategory[category]) {
      elementsByCategory[category] = [];
    }
    elementsByCategory[category].push(element);
  });
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Score Input - {allianceColor} Alliance
        </h2>
        
        {Object.entries(elementsByCategory).map(([category, elements]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{category}</h3>
            
            <div className="space-y-4">
              {elements
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map(element => (
                  <div key={element.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <span className="font-medium">{element.name}</span>
                      <div className="text-sm text-gray-500">
                        {element.pointsPerUnit > 0 ? '+' : ''}{element.pointsPerUnit} points each
                      </div>
                    </div>
                    
                    {element.elementType === 'counter' ? (
                      <Counter
                        value={elementScores[element.code] || 0}
                        onChange={(value) => handleChange(element.code, value)}
                        min={0}
                        max={element.maxUnits || undefined}
                      />
                    ) : (
                      <Checkbox
                        checked={!!elementScores[element.code]}
                        onCheckedChange={(checked) => handleChange(element.code, checked ? 1 : 0)}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
        
        {calculatedScore !== null && (
          <Alert className="mt-4">
            <AlertTitle>Score Calculated</AlertTitle>
            <AlertDescription>
              Total score: <span className="font-bold">{calculatedScore}</span> points
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? 'Submitting...' : 'Submit Scores'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
```

#### ScoreDisplay Component

```tsx
// components/scoring/ScoreDisplay.tsx
import { Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { useMatchScore } from '@/hooks/tanstack-query/useMatchScore';

interface ScoreDisplayProps {
  matchId: string;
  allianceId: string;
  allianceColor: string;
}

export const ScoreDisplay = ({ 
  matchId, 
  allianceId,
  allianceColor
}: ScoreDisplayProps) => {
  const { data: matchScore, isLoading } = useMatchScore(matchId, allianceId);
  
  if (isLoading) return <div>Loading scores...</div>;
  if (!matchScore) return <div>No score data available</div>;
  
  const { scoreConfig, elementScores, bonusesEarned, penaltiesIncurred, calculationLog, totalScore } = matchScore;
  
  if (!scoreConfig) return <div>Score configuration not found</div>;
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {allianceColor} Alliance Score: {totalScore}
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Score Elements</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Element</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Points Each</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreConfig.scoreElements.map(element => {
                const count = elementScores[element.code] || 0;
                const points = count * element.pointsPerUnit;
                
                return (
                  <TableRow key={element.id}>
                    <TableCell>{element.name}</TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell>{element.pointsPerUnit}</TableCell>
                    <TableCell>{points}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {bonusesEarned.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Bonuses</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bonusesEarned.map(bonusId => {
                  const bonus = scoreConfig.bonusConditions.find(b => b.id === bonusId);
                  if (!bonus) return null;
                  
                  return (
                    <TableRow key={bonus.id}>
                      <TableCell>{bonus.name}</TableCell>
                      <TableCell>+{bonus.bonusPoints}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        
        {penaltiesIncurred.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Penalties</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Penalty</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {penaltiesIncurred.map(penaltyId => {
                  const penalty = scoreConfig.penaltyConditions.find(p => p.id === penaltyId);
                  if (!penalty) return null;
                  
                  return (
                    <TableRow key={penalty.id}>
                      <TableCell>{penalty.name}</TableCell>
                      <TableCell>{penalty.penaltyPoints}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <div className="text-xl font-bold">Total Score: {totalScore}</div>
        </div>
      </div>
    </Card>
  );
};
```

### 3.5 Pages

#### Admin Score Config Page

```tsx
// app/admin/tournaments/[tournamentId]/score-config/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import { useScoreConfig } from '@/hooks/tanstack-query/useScoreConfig';

export default function ScoreConfigPage() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.tournamentId as string;
  
  const { data: scoreConfig, isLoading } = useScoreConfig(tournamentId);
  
  if (isLoading) {
    return <div>Loading score configuration...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Score Configuration</h1>
        
        {!scoreConfig && (
          <Button 
            onClick={() => router.push(`/admin/tournaments/${tournamentId}/score-config/create`)}
          >
            Create Score Configuration
          </Button>
        )}
        
        {scoreConfig && (
          <Button 
            onClick={() => router.push(`/admin/tournaments/${tournamentId}/score-config/${scoreConfig.id}/edit`)}
          >
            Edit Configuration
          </Button>
        )}
      </div>
      
      {scoreConfig ? (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{scoreConfig.name}</h2>
            {scoreConfig.description && (
              <p className="text-gray-600 mb-4">{scoreConfig.description}</p>
            )}
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Score Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoreConfig.scoreElements.map(element => (
                <div key={element.id} className="p-4 border rounded-md">
                  <div className="font-semibold">{element.name}</div>
                  <div className="text-sm text-gray-600">{element.description}</div>
                  <div className="mt-2">
                    <span className="font-medium">
                      {element.pointsPerUnit > 0 ? '+' : ''}{element.pointsPerUnit} points
                    </span>
                    {' '}per {element.elementType === 'boolean' ? 'yes' : 'unit'}
                  </div>
                  {element.maxUnits && (
                    <div className="text-sm text-gray-600">
                      Maximum: {element.maxUnits} units
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          {scoreConfig.bonusConditions.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Bonus Conditions</h3>
              <div className="space-y-4">
                {scoreConfig.bonusConditions.map(bonus => (
                  <div key={bonus.id} className="p-4 border rounded-md">
                    <div className="font-semibold">{bonus.name}</div>
                    <div className="text-sm text-gray-600">{bonus.description}</div>
                    <div className="mt-2">
                      <span className="font-medium">+{bonus.bonusPoints} points</span>
                      {' '}when condition is met
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {scoreConfig.penaltyConditions.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Penalty Conditions</h3>
              <div className="space-y-4">
                {scoreConfig.penaltyConditions.map(penalty => (
                  <div key={penalty.id} className="p-4 border rounded-md">
                    <div className="font-semibold">{penalty.name}</div>
                    <div className="text-sm text-gray-600">{penalty.description}</div>
                    <div className="mt-2">
                      <span className="font-medium">{penalty.penaltyPoints} points</span>
                      {' '}when condition is met
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="p-6">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">No Score Configuration</h2>
            <p className="text-gray-600 mb-4">
              This tournament doesn't have a score configuration yet.
            </p>
            <Button 
              onClick={() => router.push(`/admin/tournaments/${tournamentId}/score-config/create`)}
            >
              Create Score Configuration
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
```

#### Referee Scoring Page

```tsx
// app/referee/matches/[matchId]/scoring/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { DynamicScoreInput } from '@/components/scoring/DynamicScoreInput';
import { ScoreDisplay } from '@/components/scoring/ScoreDisplay';
import { useMatch } from '@/hooks/tanstack-query/useMatch';

export default function MatchScoringPage() {
  const params = useParams();
  const matchId = params.matchId as string;
  
  const { data: match, isLoading } = useMatch(matchId);
  const [tournamentId, setTournamentId] = useState<string | null>(null);
  
  useEffect(() => {
    if (match?.stage?.tournamentId) {
      setTournamentId(match.stage.tournamentId);
    }
  }, [match]);
  
  if (isLoading) {
    return <div>Loading match data...</div>;
  }
  
  if (!match) {
    return <div>Match not found</div>;
  }
  
  if (!tournamentId) {
    return <div>Tournament information not available</div>;
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Match Scoring</h1>
      <h2 className="text-xl">Match #{match.matchNumber}</h2>
      
      <Tabs defaultValue="input">
        <TabsList>
          <TabsTrigger value="input">Score Input</TabsTrigger>
          <TabsTrigger value="display">Score Display</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {match.alliances.map(alliance => (
              <DynamicScoreInput
                key={alliance.id}
                tournamentId={tournamentId}
                matchId={matchId}
                allianceId={alliance.id}
                allianceColor={alliance.color}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="display">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {match.alliances.map(alliance => (
              <ScoreDisplay
                key={alliance.id}
                matchId={matchId}
                allianceId={alliance.id}
                allianceColor={alliance.color}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## 4. Complete Prisma Schema

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  HEAD_REFEREE
  ALLIANCE_REFEREE
  COMMON
}

enum StageType {
  SWISS
  PLAYOFF
  FINAL
}

enum CardType {
  NONE
  YELLOW
  RED
}

enum RefereeRole {
  HEAD_REFEREE
  ALLIANCE_REFEREE
}

enum MatchState {
  SCHEDULED
  READY
  RUNNING
  PAUSED
  COMPLETED
  CANCELLED
  ERROR
}

enum ErrorSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum ErrorStatus {
  OPEN
  ACKNOWLEDGED
  RESOLVED
  CLOSED
}

enum DisplayState {
  STANDBY
  STARTING_SOON
  LIVE
  MATCH_RESULTS
  FINISHED
  CANCELLED
  ERROR
  CUSTOM_MESSAGE
}

enum MatchType {
  FULL         // auto + teleop + endgame (150s)
  TELEOP_ENDGAME // teleop + endgame (120s)
}

model User {
  id              String           @id @default(uuid())
  username        String           @unique
  password        String
  role            UserRole
  email           String?          @unique
  gender          Boolean?
  DateOfBirth     DateTime?
  phoneNumber     String?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  createdBy       User?            @relation("CreatedUsers", fields: [createdById], references: [id])
  createdById     String?
  createdUsers    User[]           @relation("CreatedUsers")
  tournaments     Tournament[]
  scoredMatches   Match[]          @relation("ScoredBy")
  allianceRefFor  AllianceScoring[] @relation("AllianceReferee")
  matchReferees   MatchReferee[]   // New relation for match referees
}

model Tournament {
  id              String        @id @default(uuid())
  name            String
  description     String?
  startDate       DateTime
  endDate         DateTime
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  adminId         String
  admin           User          @relation(fields: [adminId], references: [id])
  stages          Stage[]
  teams           Team[]        // Added teams relationship
  teamStats       TeamStats[]   // New relation to track team statistics
  fields          Field[]       // New relation: Tournament has many Fields
  numberOfFields  Int           @default(1)
  scoreConfigs    ScoreConfig[] // New relation: Tournament has many ScoreConfigs
}

model Stage {
  id           String    @id @default(uuid())
  name         String
  type         StageType
  startDate    DateTime
  endDate      DateTime
  tournamentId String
  tournament   Tournament @relation(fields: [tournamentId], references: [id], onDelete: Cascade)
  matches      Match[]
  teamStats    TeamStats[] // Added relation field for TeamStats
  teamsPerAlliance Int @default(2) // Number of teams per alliance (2v2, 3v3, etc.)
  teamsPerMatch    Int @default(4) // Number of teams per match (all alliances)
  schedules        Schedule[] // Add this line for relation
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Match {
  id            String    @id @default(uuid())
  matchNumber   Int
  roundNumber   Int?      // The round number this match belongs to
  status        String    @default("PENDING") // PENDING, IN_PROGRESS, COMPLETED
  startTime     DateTime? // Full timestamp with hour-minute precision
  scheduledTime DateTime? // New field for the scheduled time with hour-minute precision
  endTime       DateTime? // Full timestamp with hour-minute precision
  duration      Int?      // Duration in minutes
  winningAlliance String?  // "RED" or "BLUE" - indicates which alliance won
  stageId       String
  stage         Stage     @relation(fields: [stageId], references: [id], onDelete: Cascade)
  alliances     Alliance[]
  scoredById    String?
  scoredBy      User?     @relation("ScoredBy", fields: [scoredById], references: [id])
  referees      MatchReferee[] // New relation for match referees
  matchScores   MatchScores?
  matchControl  MatchControl? // Optional relation to match control for display state
  roundType     String? // e.g., "QUALIFICATION", "SWISS", "PLAYOFF", "FINAL"
  scheduleId    String?
  schedule      Schedule? @relation(fields: [scheduleId], references: [id], onDelete: SetNull)
  fieldId       String?
  field         Field?     @relation(fields: [fieldId], references: [id], onDelete: SetNull)
  fieldNumber   Int?
  matchType     MatchType  @default(FULL) // Type of match: FULL, TELEOP_ENDGAME
  matchDuration Int?       // Duration of the match in seconds (overrides default if set)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  matchScoreRecords MatchScore[] // New relation to flexible match scores
}

model MatchReferee {
  id        String      @id @default(uuid())
  matchId   String
  match     Match       @relation(fields: [matchId], references: [id], onDelete: Cascade)
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  role      RefereeRole // HEAD_REFEREE or ALLIANCE_REFEREE
  position  String?     // Optional position identifier (e.g. "RED1", "BLUE2")
  createdAt DateTime    @default(now()) 
  updatedAt DateTime    @updatedAt

  @@unique([matchId, userId])
  @@index([matchId])
  @@index([userId])
}

model Alliance {
  id            String    @id @default(uuid())
  color         String    // e.g., "RED", "BLUE"
  score         Int       @default(0)
  matchId       String
  match         Match     @relation(fields: [matchId], references: [id], onDelete: Cascade)
  teamAlliances TeamAlliance[]
  allianceScoring AllianceScoring?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  matchScores   MatchScore[] // New relation to flexible match scores
}

model AllianceScoring {
  id            String    @id @default(uuid())
  allianceId    String    @unique
  alliance      Alliance  @relation(fields: [allianceId], references: [id], onDelete: Cascade)
  refereeId     String?
  referee       User?     @relation("AllianceReferee", fields: [refereeId], references: [id])
  scoreDetails  Json?     // Store detailed scoring information as JSON
  card          CardType  @default(NONE)
  notes         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Team {
  id            String         @id @default(uuid())
  teamNumber    String         @unique
  name          String
  organization  String?
  avatar        String?        // URL to team avatar image
  description   String?        // Team description
  teamMembers   Json?          // Store team members as a JSON array
  tournamentId  String?        // Optional link to tournament
  tournament    Tournament?    @relation(fields: [tournamentId], references: [id])
  teamAlliances TeamAlliance[]
  teamStats     TeamStats[]    // New relation to track team statistics
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@index([tournamentId])
}

model TeamAlliance {
  id          String   @id @default(uuid())
  teamId      String
  team        Team     @relation(fields: [teamId], references: [id])
  allianceId  String
  alliance    Alliance @relation(fields: [allianceId], references: [id], onDelete: Cascade)
  stationPosition Int   @default(1)  // Station position: 1, 2, or 3 within an alliance
  isSurrogate Boolean  @default(false) // Indicates if this is a surrogate appearance
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([teamId, allianceId])
}

model MatchScores {
  id                String   @id @default(uuid())
  matchId           String   @unique
  match             Match    @relation(fields: [matchId], references: [id], onDelete: Cascade)
  
  // Red Alliance Scores
  redAutoScore      Int      @default(0)
  redDriveScore     Int      @default(0)
  redTotalScore     Int      @default(0)
  
  // Blue Alliance Scores
  blueAutoScore     Int      @default(0)
  blueDriveScore    Int      @default(0)
  blueTotalScore    Int      @default(0)
  
  // Game Elements Scoring for Red Alliance
  redGameElements   Json?    // Structure: [{ "element": "ball", "count": 3, "pointsEach": 20, "totalPoints": 60, "operation": "multiply" }]
  
  // Game Elements Scoring for Blue Alliance
  blueGameElements  Json?    // Structure: [{ "element": "ball", "count": 3, "pointsEach": 20, "totalPoints": 60, "operation": "multiply" }]
  
  // Team count multipliers (applied automatically based on team count)
  redTeamCount      Int      @default(0)  // Number of teams in red alliance (1-4)
  redMultiplier     Float    @default(1.0) // Calculated multiplier based on team count: 1 team (x1.25), 2 teams (x1.5), 3 teams (x1.75), 4 teams (x2)
  
  blueTeamCount     Int      @default(0)  // Number of teams in blue alliance (1-4)
  blueMultiplier    Float    @default(1.0) // Calculated multiplier based on team count: 1 team (x1.25), 2 teams (x1.5), 3 teams (x1.75), 4 teams (x2)
  
  // Additional metadata
  scoreDetails      Json?    // Other scoring details or game-specific information
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model TeamStats {
  id                  String   @id @default(uuid())
  teamId              String
  team                Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  tournamentId        String
  tournament          Tournament @relation(fields: [tournamentId], references: [id], onDelete: Cascade)
  stageId             String?    // Adding optional stageId field for stage-specific stats
  stage               Stage?     @relation(fields: [stageId], references: [id], onDelete: SetNull)
  wins                Int       @default(0)
  losses              Int       @default(0)
  ties                Int       @default(0)
  pointsScored        Int       @default(0)
  pointsConceded      Int       @default(0)
  matchesPlayed       Int       @default(0)
  rankingPoints       Int       @default(0)
  opponentWinPercentage Float   @default(0)
  pointDifferential   Int       @default(0)
  rank                Int?      // For playoff rankings
  tiebreaker1         Float     @default(0) // First tiebreaker metric (e.g., average score)
  tiebreaker2         Float     @default(0) // Second tiebreaker metric (e.g., strength of schedule)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  @@unique([teamId, tournamentId])
  @@index([teamId])
  @@index([tournamentId])
  @@index([stageId])
}

model Schedule {
  id        String   @id @default(uuid())
  stageId   String
  stage     Stage    @relation(fields: [stageId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  matches   Match[]
  algorithm String?  // e.g., "simulated_annealing", "swiss"
  quality   String?  // e.g., "low", "medium", "high"
  params    Json?    // Store algorithm parameters
}

model Field {
  id           String      @id @default(uuid())
  name         String
  number       Int
  location     String?
  description  String?
  tournamentId String
  tournament   Tournament @relation(fields: [tournamentId], references: [id], onDelete: Cascade)
  matches      Match[]
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  @@unique([tournamentId, number])
}

model MatchControl {
  id              String      @id @default(uuid())
  matchId         String      @unique
  match           Match       @relation(fields: [matchId], references: [id], onDelete: Cascade)
  currentState    MatchState  @default(SCHEDULED)
  stateHistory    Json?       // Array of state transitions with timestamps
  controlledBy    String?     // Admin who is currently controlling the match
  lockToken       String?     // Token for locking control to prevent race conditions
  lockTimestamp   DateTime?   // When the lock was acquired
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  matchTimers     MatchTimer[] 
  matchErrors     MatchError[] 
  audienceDisplay AudienceDisplay?
}

model MatchTimer {
  id              String      @id @default(uuid())
  matchControlId  String
  matchControl    MatchControl @relation(fields: [matchControlId], references: [id], onDelete: Cascade)
  timerType       String      // "AUTO", "TELEOP", "ENDGAME", "FULL_MATCH", etc.
  duration        Int         // Total duration in seconds
  remaining       Int         // Remaining time in seconds
  isRunning       Boolean     @default(false)
  startedAt       DateTime?   // When the timer was started
  pausedAt        DateTime?   // When the timer was last paused
  completedAt     DateTime?   // When the timer completed
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model MatchError {
  id              String        @id @default(uuid())
  matchControlId  String
  matchControl    MatchControl  @relation(fields: [matchControlId], references: [id], onDelete: Cascade)
  errorType       String        // "ROBOT_FAILURE", "FIELD_FAULT", "NETWORK_ISSUE", etc.
  description     String
  severity        ErrorSeverity @default(MEDIUM)
  status          ErrorStatus   @default(OPEN)
  reportedBy      String        // User ID who reported the error
  resolvedBy      String?       // User ID who resolved the error
  resolvedAt      DateTime?
  affectedAlliance String?      // "RED", "BLUE", or null if affects both
  affectedTeamId  String?       // Optional reference to specific team
  notes           String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model AudienceDisplay {
  id              String        @id @default(uuid())
  matchControlId  String        @unique
  matchControl    MatchControl  @relation(fields: [matchControlId], references: [id], onDelete: Cascade)
  currentState    DisplayState  @default(STANDBY)
  customMessage   String?
  customData      Json?         // Additional display data
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

// New models for flexible scoring system

model ScoreConfig {
  id                String           @id @default(uuid())
  tournamentId      String
  tournament        Tournament       @relation(fields: [tournamentId], references: [id])
  name              String           // e.g., "Fire Fighting Competition 2025"
  description       String?
  scoreElements     ScoreElement[]
  bonusConditions   BonusCondition[]
  penaltyConditions PenaltyCondition[]
  matchScores       MatchScore[]     // Relation to match scores using this config
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
}

model ScoreElement {
  id            String      @id @default(uuid())
  scoreConfigId String
  scoreConfig   ScoreConfig @relation(fields: [scoreConfigId], references: [id], onDelete: Cascade)
  name          String      // e.g., "Dry Powder in Own Area"
  code          String      // Unique identifier for this element, e.g., "dry_powder_own"
  description   String?
  pointsPerUnit Int         // e.g., 5 (can be negative for penalties)
  maxUnits      Int?        // Optional limit (e.g., max 10 balls)
  category      String?     // For grouping related elements
  elementType   String      // "counter" (numeric) or "boolean" (yes/no)
  displayOrder  Int         // For UI ordering
  icon          String?     // Optional icon reference
  color         String?     // Optional color for UI
  
  @@unique([scoreConfigId, code])
}

model BonusCondition {
  id            String      @id @default(uuid())
  scoreConfigId String
  scoreConfig   ScoreConfig @relation(fields: [scoreConfigId], references: [id], onDelete: Cascade)
  name          String      // e.g., "5 Dry Powder Balls Bonus"
  code          String      // Unique identifier, e.g., "five_balls_bonus"
  description   String?
  bonusPoints   Int         // e.g., 10
  condition     Json        // JSON for storing condition logic
  displayOrder  Int         // For UI ordering
  
  @@unique([scoreConfigId, code])
}

model PenaltyCondition {
  id            String      @id @default(uuid())
  scoreConfigId String
  scoreConfig   ScoreConfig @relation(fields: [scoreConfigId], references: [id], onDelete: Cascade)
  name          String      // e.g., "Red Area Violation"
  code          String      // Unique identifier, e.g., "red_area_violation"
  description   String?
  penaltyPoints Int         // e.g., -10
  condition     Json        // JSON for storing condition logic
  displayOrder  Int         // For UI ordering
  
  @@unique([scoreConfigId, code])
}

model MatchScore {
  id                String      @id @default(uuid())
  matchId           String
  match             Match       @relation(fields: [matchId], references: [id])
  allianceId        String
  alliance          Alliance    @relation(fields: [allianceId], references: [id])
  scoreConfigId     String
  scoreConfig       ScoreConfig @relation(fields: [scoreConfigId], references: [id])
  elementScores     Json        // Store counts for each ScoreElement
  bonusesEarned     String[]    // IDs of earned BonusCondition
  penaltiesIncurred String[]    // IDs of incurred PenaltyCondition
  calculationLog    Json?       // Optional detailed breakdown of score calculation
  totalScore        Int         // Calculated total
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@unique([matchId, allianceId])
}
```

## 5. Example Configuration for Fire-Fighting Competition

### 5.1 ScoreElements

```json
[
  {
    "name": "Dry Powder in Own Area",
    "code": "dry_powder_own",
    "description": "Yellow balls placed in team's designated area",
    "pointsPerUnit": 5,
    "maxUnits": 10,
    "category": "Balls",
    "elementType": "counter",
    "displayOrder": 1
  },
  {
    "name": "Dry Powder in Red Area",
    "code": "dry_powder_red",
    "description": "Yellow balls placed in red area",
    "pointsPerUnit": 20,
    "category": "Balls",
    "elementType": "counter",
    "displayOrder": 2
  },
  {
    "name": "Water Ball in Red Area",
    "code": "water_ball_red",
    "description": "Water balls placed in red area",
    "pointsPerUnit": 10,
    "category": "Balls",
    "elementType": "counter",
    "displayOrder": 3
  },
  {
    "name": "Dry Powder Helping Opponent",
    "code": "dry_powder_help",
    "description": "Yellow balls placed in opponent's area (after 5 in own area)",
    "pointsPerUnit": 7,
    "category": "Balls",
    "elementType": "counter",
    "displayOrder": 4
  },
  {
    "name": "Water Ball Wrong Position",
    "code": "water_ball_wrong",
    "description": "Water balls placed in incorrect positions",
    "pointsPerUnit": -3,
    "category": "Penalties",
    "elementType": "counter",
    "displayOrder": 5
  },
  {
    "name": "Robot Returned to End Position",
    "code": "robot_returned",
    "description": "Robot successfully returned to end position",
    "pointsPerUnit": 20,
    "category": "Bonus",
    "elementType": "boolean",
    "displayOrder": 6
  }
]
```

### 5.2 BonusConditions

```json
[
  {
    "name": "5 Dry Powder Balls Bonus",
    "code": "five_balls_bonus",
    "description": "Bonus for placing 5 or more dry powder balls in own area",
    "bonusPoints": 10,
    "condition": {
      "type": "threshold",
      "elementCode": "dry_powder_own",
      "operator": ">=",
      "value": 5
    },
    "displayOrder": 1
  }
]
```

### 5.3 PenaltyConditions

```json
[
  {
    "name": "Red Area Violation",
    "code": "red_area_violation",
    "description": "Penalty for placing balls in red area before unlocking it with 5 dry powder balls",
    "penaltyPoints": -10,
    "condition": {
      "type": "composite",
      "operator": "AND",
      "conditions": [
        {
          "type": "threshold",
          "elementCode": "dry_powder_own",
          "operator": "<",
          "value": 5
        },
        {
          "type": "threshold",
          "elementCode": "dry_powder_red",
          "operator": ">",
          "value": 0
        }
      ]
    },
    "displayOrder": 1
  }
]
```

## 6. SOLID Principles Implementation

### 6.1 Single Responsibility Principle (SRP)

- `ScoreConfigService`: Manages score configurations
- `ScoreCalculationService`: Handles score calculation logic
- `MatchScoresController`: Manages HTTP requests for scores
- `ConditionEvaluatorFactory`: Creates appropriate condition evaluators
- Frontend components are separated by responsibility (input, display, configuration)

### 6.2 Open/Closed Principle (OCP)

- The scoring system is open for extension (new competition types) without modification
- New score elements, bonuses, or penalties can be added without changing code
- Strategy pattern for condition evaluation allows adding new condition types

### 6.3 Liskov Substitution Principle (LSP)

- All score element types (counter, boolean) can be used interchangeably in the UI
- Condition types (threshold, composite) follow consistent interfaces
- All condition evaluators implement the `ConditionEvaluator` interface

### 6.4 Interface Segregation Principle (ISP)

- DTOs are specific to their use cases
- Frontend components accept only the props they need
- Clear interfaces for condition evaluation

### 6.5 Dependency Inversion Principle (DIP)

- Services depend on abstractions (interfaces) rather than concrete implementations
- Dependency injection is used throughout the NestJS backend
- Frontend components receive dependencies via props

## 7. Implementation Steps

1. **Database Schema Updates**:
   - Add the new models to the Prisma schema
   - Run migrations

2. **Backend Implementation**:
   - Create DTOs for score configuration and submission
   - Implement services for score configuration and calculation
   - Add controllers for managing score configurations and submitting scores

3. **Frontend Implementation**:
   - Create reusable components for score input and display
   - Implement TanStack Query hooks for data fetching and mutation
   - Update admin UI for creating and managing score configurations
   - Update referee UI for score input
   - Update audience display for showing scores

4. **Testing**:
   - Unit tests for score calculation logic
   - Integration tests for API endpoints
   - End-to-end tests for the complete scoring workflow

## 8. Conclusion

This flexible scoring system design allows for:

1. **Adaptability**: Can handle virtually any scoring system through configuration
2. **Maintainability**: Clear separation of concerns following SOLID principles
3. **User Experience**: Dynamic UI generation based on configuration
4. **Future-Proofing**: New competition types can be added without code changes

The fire-fighting competition scoring rules can be fully implemented using this system, and it will accommodate future competition types with different scoring rules as well.
