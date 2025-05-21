# Step-by-Step Migration Plan to ScoreConfig System

This document outlines a practical, incremental approach to implementing the ScoreConfig system in your Robotics Tournament Management application. The plan is designed to minimize disruption to existing functionality while gradually introducing the new flexible scoring capabilities.

## Phase 1: Database Schema and Backend Foundation

### Step 1: Add New Prisma Models
**Estimated time: 1-2 days**

1. Add the new models to your Prisma schema:
   - `ScoreConfig`
   - `ScoreElement`
   - `BonusCondition`
   - `PenaltyCondition`
   - `MatchScore`

2. Create a migration without applying it yet:
   ```bash
   npx prisma migrate dev --create-only --name add_score_config_system
   ```

3. Review the generated migration to ensure it won't disrupt existing data.

4. Apply the migration:
   ```bash
   npx prisma migrate dev
   ```

5. Generate the updated Prisma client:
   ```bash
   npx prisma generate
   ```

### Step 2: Create Core Backend Services
**Estimated time: 2-3 days**

1. Create the basic service files:
   ```bash
   # Create directories
   mkdir -p src/score-config/dto src/score-config/entities
   mkdir -p src/match-score/dto src/match-score/entities
   mkdir -p src/score-calculation/interfaces src/score-calculation/strategies
   
   # Create service files
   touch src/score-config/score-config.service.ts
   touch src/match-score/match-score.service.ts
   touch src/score-calculation/score-calculation.service.ts
   ```

2. Implement the `ScoreConfigService` with basic CRUD operations.

3. Implement the condition evaluator strategy pattern:
   - Create the `ConditionEvaluator` interface
   - Implement `ThresholdConditionEvaluator`
   - Implement `CompositeConditionEvaluator`
   - Create the `ConditionEvaluatorFactory`

4. Implement the `ScoreCalculationService` with the core calculation logic.

5. Write unit tests for the calculation logic and condition evaluators.

### Step 3: Create DTOs and Controllers
**Estimated time: 1-2 days**

1. Create the necessary DTOs:
   - `CreateScoreConfigDto`
   - `UpdateScoreConfigDto`
   - `CreateScoreElementDto`
   - `CreateBonusConditionDto`
   - `CreatePenaltyConditionDto`
   - `SubmitScoreDto`

2. Implement the controllers:
   - `ScoreConfigController`
   - `MatchScoresController`

3. Add appropriate validation and error handling.

4. Write integration tests for the API endpoints.

## Phase 2: Integration with Existing System

### Step 4: Create Bridge Between Old and New Scoring
**Estimated time: 2-3 days**

1. Create a service to handle the transition between the old and new scoring systems:
   ```typescript
   // src/scoring-bridge/scoring-bridge.service.ts
   @Injectable()
   export class ScoringBridgeService {
     constructor(
       private prisma: PrismaService,
       private scoreCalculationService: ScoreCalculationService,
     ) {}
     
     // Method to convert old scores to new format
     async migrateMatchScores(matchId: string): Promise<void> {
       // Implementation
     }
     
     // Method to sync scores between systems during transition
     async syncScores(matchId: string): Promise<void> {
       // Implementation
     }
   }
   ```

2. Implement a feature flag system to control which scoring system is active:
   ```typescript
   // src/config/feature-flags.service.ts
   @Injectable()
   export class FeatureFlagsService {
     constructor(private configService: ConfigService) {}
     
     isNewScoringEnabled(tournamentId?: string): boolean {
       // Check if new scoring is enabled globally or for specific tournament
     }
   }
   ```

3. Modify the existing scoring endpoints to use the bridge service.

### Step 5: Create Default Score Configurations
**Estimated time: 1-2 days**

1. Create a script to generate default score configurations for existing tournaments:
   ```typescript
   // src/scripts/generate-default-score-configs.ts
   async function generateDefaultScoreConfigs() {
     const prisma = new PrismaService();
     const tournaments = await prisma.tournament.findMany();
     
     for (const tournament of tournaments) {
       // Create default score config based on tournament type
     }
   }
   ```

2. Run the script to populate the database with default configurations.

3. Add a hook to automatically create a default score configuration when a new tournament is created.

## Phase 3: Frontend Implementation

### Step 6: Create Core Frontend Components
**Estimated time: 3-4 days**

1. Create the basic UI components:
   ```bash
   mkdir -p src/components/scoring
   touch src/components/scoring/ScoreConfigForm.tsx
   touch src/components/scoring/ScoreElementForm.tsx
   touch src/components/scoring/BonusConditionForm.tsx
   touch src/components/scoring/PenaltyConditionForm.tsx
   touch src/components/scoring/ConditionBuilder.tsx
   touch src/components/scoring/DynamicScoreInput.tsx
   touch src/components/scoring/ScoreDisplay.tsx
   ```

2. Implement the TanStack Query hooks:
   ```bash
   mkdir -p src/hooks/tanstack-query
   touch src/hooks/tanstack-query/useScoreConfig.ts
   touch src/hooks/tanstack-query/useCreateScoreConfig.ts
   touch src/hooks/tanstack-query/useUpdateScoreConfig.ts
   touch src/hooks/tanstack-query/useMatchScore.ts
   touch src/hooks/tanstack-query/useSubmitScore.ts
   ```

3. Create the TypeScript interfaces for the new models.

### Step 7: Implement Admin Score Configuration UI
**Estimated time: 2-3 days**

1. Create the admin pages for managing score configurations:
   ```bash
   mkdir -p src/app/admin/tournaments/[tournamentId]/score-config/create
   mkdir -p src/app/admin/tournaments/[tournamentId]/score-config/[configId]/edit
   touch src/app/admin/tournaments/[tournamentId]/score-config/page.tsx
   touch src/app/admin/tournaments/[tournamentId]/score-config/create/page.tsx
   touch src/app/admin/tournaments/[tournamentId]/score-config/[configId]/edit/page.tsx
   ```

2. Implement the pages using the components created in Step 6.

3. Add navigation links in the tournament admin UI.

### Step 8: Implement Referee Scoring UI
**Estimated time: 2-3 days**

1. Create the referee pages for inputting scores:
   ```bash
   mkdir -p src/app/referee/matches/[matchId]/scoring
   touch src/app/referee/matches/[matchId]/scoring/page.tsx
   ```

2. Implement the page using the `DynamicScoreInput` component.

3. Add a toggle to switch between the old and new scoring systems during the transition period.

### Step 9: Implement Audience Display
**Estimated time: 1-2 days**

1. Create the audience display pages:
   ```bash
   mkdir -p src/app/audience/matches/[matchId]/scores
   touch src/app/audience/matches/[matchId]/scores/page.tsx
   ```

2. Implement the page using the `ScoreDisplay` component.

3. Ensure the display works with both scoring systems.

## Phase 4: Testing and Deployment

### Step 10: Comprehensive Testing
**Estimated time: 2-3 days**

1. Write end-to-end tests for the complete scoring workflow.

2. Test the system with various scoring configurations.

3. Verify that the bridge between old and new systems works correctly.

4. Conduct user acceptance testing with tournament administrators and referees.

### Step 11: Gradual Rollout
**Estimated time: 1-2 weeks (spread across tournaments)**

1. Enable the new scoring system for a single tournament as a pilot.

2. Gather feedback and make necessary adjustments.

3. Gradually enable the system for more tournaments.

4. Monitor performance and user satisfaction.

### Step 12: Full Transition
**Estimated time: 1 day**

1. Once all tournaments are using the new system successfully, remove the old scoring code and database tables (or keep them for historical data but disable in the UI).

2. Update documentation to reflect the new scoring system.

3. Provide training materials for tournament administrators.

## Implementation Timeline

The entire migration can be completed in approximately 4-6 weeks, depending on team size and availability. Here's a suggested timeline:

- **Week 1**: Phase 1 (Steps 1-3)
- **Week 2**: Phase 2 (Steps 4-5)
- **Weeks 3-4**: Phase 3 (Steps 6-9)
- **Weeks 5-6**: Phase 4 (Steps 10-12)

## Risk Mitigation

1. **Data Loss**: The bridge service ensures no data is lost during the transition.

2. **User Disruption**: The feature flag system allows for a gradual rollout and easy rollback if issues arise.

3. **Performance Issues**: Comprehensive testing helps identify and address performance bottlenecks before full deployment.

4. **Complexity**: The step-by-step approach breaks down the complex migration into manageable chunks.

## Conclusion

This migration plan provides a structured approach to implementing the ScoreConfig system while minimizing disruption to existing functionality. By following these steps, you can gradually transition to the new flexible scoring system and ensure a smooth experience for all users.
