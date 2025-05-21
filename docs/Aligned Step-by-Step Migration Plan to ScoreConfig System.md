# Aligned Step-by-Step Migration Plan to ScoreConfig System

This document outlines a practical, incremental approach to implementing the ScoreConfig system in your Robotics Tournament Management application. Each step is directly aligned with the architecture and components detailed in the Flexible Scoring System Proposal.

## Phase 1: Database Schema and Backend Foundation

### Step 1: Add New Prisma Models
**Estimated time: 1-2 days**
**Aligns with: Proposal Section 1.1 (New Prisma Schema Models)**

1. Add the following models to your Prisma schema exactly as defined in the proposal:
   - `ScoreConfig`
   - `ScoreElement` (with the `@@unique([scoreConfigId, code])` constraint)
   - `BonusCondition` (with the `@@unique([scoreConfigId, code])` constraint)
   - `PenaltyCondition` (with the `@@unique([scoreConfigId, code])` constraint)
   - `MatchScore` (with the `@@unique([matchId, allianceId])` constraint)

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

### Step 2: Create Backend Module Structure
**Estimated time: 1 day**
**Aligns with: Proposal Section 2.1 (Module Structure)**

1. Create the directory structure exactly as outlined in the proposal:
   ```bash
   # Create directories
   mkdir -p src/score-config/dto src/score-config/entities
   mkdir -p src/match-score/dto src/match-score/entities
   mkdir -p src/score-calculation/interfaces src/score-calculation/strategies
   
   # Create module files
   touch src/score-config/score-config.module.ts
   touch src/match-score/match-score.module.ts
   touch src/score-calculation/score-calculation.module.ts
   ```

2. Create the basic module files with appropriate imports and exports.

### Step 3: Implement Condition Evaluator Strategy Pattern
**Estimated time: 1-2 days**
**Aligns with: Proposal Section 2.2 (ConditionEvaluator Strategy Pattern)**

1. Create the interfaces and strategy classes:
   ```bash
   touch src/score-calculation/interfaces/condition.interface.ts
   touch src/score-calculation/strategies/condition-evaluator.strategy.ts
   touch src/score-calculation/strategies/threshold-condition.strategy.ts
   touch src/score-calculation/strategies/composite-condition.strategy.ts
   ```

2. Implement the `Condition` and `ConditionEvaluator` interfaces exactly as shown in the proposal. 

3. Implement the `ConditionEvaluatorFactory` with the factory method that creates the appropriate evaluator based on condition type.

4. Implement the `ThresholdConditionEvaluator` class with the logic for evaluating threshold conditions.

5. Implement the `CompositeConditionEvaluator` class with the logic for evaluating composite conditions.

### Step 4: Implement Service Layer
**Estimated time: 2-3 days**
**Aligns with: Proposal Section 2.2 (Service Layer Design)**

1. Create the service files:
   ```bash
   touch src/score-config/score-config.service.ts
   touch src/score-calculation/score-calculation.service.ts
   touch src/match-score/match-score.service.ts
   ```

2. Implement the `ScoreConfigService` with all methods shown in the proposal:
   - `createScoreConfig`
   - `getScoreConfigForTournament`
   - `getScoreConfigById`
   - `updateScoreConfig`
   - `addScoreElement`
   - `addBonusCondition`
   - `addPenaltyCondition`

3. Implement the `ScoreCalculationService` with the `calculateMatchScore` method that:
   - Validates the match and alliance
   - Gets the appropriate score configuration
   - Calculates base scores from element scores
   - Evaluates bonus conditions
   - Evaluates penalty conditions
   - Creates or updates the match score record

4. Write unit tests for the calculation logic and condition evaluators.

### Step 5: Create DTOs and Controllers
**Estimated time: 1-2 days**
**Aligns with: Proposal Sections 2.3 (Controller Layer) and 2.4 (DTOs)**

1. Create the DTO files:
   ```bash
   touch src/score-config/dto/create-score-config.dto.ts
   touch src/score-config/dto/update-score-config.dto.ts
   touch src/score-config/dto/create-score-element.dto.ts
   touch src/score-config/dto/create-bonus-condition.dto.ts
   touch src/score-config/dto/create-penalty-condition.dto.ts
   touch src/match-score/dto/submit-score.dto.ts
   ```

2. Implement the DTOs with validation decorators as shown in the proposal.

3. Create the controller files:
   ```bash
   touch src/score-config/score-config.controller.ts
   touch src/match-score/match-score.controller.ts
   ```

4. Implement the `ScoreConfigController` with endpoints for:
   - Creating a score configuration
   - Getting a configuration for a tournament
   - Getting a configuration by ID
   - Updating a configuration
   - Adding elements, bonuses, and penalties

5. Implement the `MatchScoresController` with endpoints for:
   - Submitting match scores
   - Getting match scores

## Phase 2: Frontend Implementation

### Step 6: Create TypeScript Types
**Estimated time: 1 day**
**Aligns with: Proposal Section 3.2 (Types)**

1. Create the types directory and files:
   ```bash
   mkdir -p src/types
   touch src/types/score-config.ts
   touch src/types/match-score.ts
   touch src/types/condition.ts
   ```

2. Implement the TypeScript interfaces exactly as defined in the proposal:
   - `ScoreConfig`
   - `ScoreElement`
   - `Condition`, `ThresholdCondition`, and `CompositeCondition`
   - `BonusCondition`
   - `PenaltyCondition`
   - `MatchScore`

### Step 7: Implement TanStack Query Hooks
**Estimated time: 1-2 days**
**Aligns with: Proposal Section 3.3 (TanStack Query Hooks)**

1. Create the hooks directory and files:
   ```bash
   mkdir -p src/hooks/tanstack-query
   touch src/hooks/tanstack-query/useScoreConfig.ts
   touch src/hooks/tanstack-query/useScoreConfigById.ts
   touch src/hooks/tanstack-query/useCreateScoreConfig.ts
   touch src/hooks/tanstack-query/useUpdateScoreConfig.ts
   touch src/hooks/tanstack-query/useMatchScore.ts
   touch src/hooks/tanstack-query/useSubmitScore.ts
   ```

2. Implement each hook as shown in the proposal, using the TanStack Query library to handle data fetching, caching, and mutations.

### Step 8: Create Core UI Components
**Estimated time: 3-4 days**
**Aligns with: Proposal Section 3.4 (Components)**

1. Create the components directory and files:
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

2. Implement the `ScoreConfigForm` component as shown in the proposal, with:
   - Form fields for configuration name and description
   - Tabs for score elements, bonus conditions, and penalty conditions
   - Logic for adding and displaying elements, bonuses, and penalties

3. Implement the `ConditionBuilder` component with:
   - Support for threshold and composite conditions
   - UI for selecting elements, operators, and values
   - Recursive rendering for composite conditions

4. Implement the `DynamicScoreInput` component with:
   - Dynamic rendering based on score elements
   - Support for counter and boolean element types
   - Score submission functionality

5. Implement the `ScoreDisplay` component with:
   - Tables for elements, bonuses, and penalties
   - Calculation breakdown
   - Total score display

### Step 9: Create Admin Pages
**Estimated time: 2-3 days**
**Aligns with: Proposal Section 3.5 (Pages)**

1. Create the admin page directories and files:
   ```bash
   mkdir -p src/app/admin/tournaments/[tournamentId]/score-config/create
   mkdir -p src/app/admin/tournaments/[tournamentId]/score-config/[configId]/edit
   touch src/app/admin/tournaments/[tournamentId]/score-config/page.tsx
   touch src/app/admin/tournaments/[tournamentId]/score-config/create/page.tsx
   touch src/app/admin/tournaments/[tournamentId]/score-config/[configId]/edit/page.tsx
   ```

2. Implement the score configuration list page as shown in the proposal, with:
   - Display of existing configuration details
   - Links to create or edit configurations

3. Implement the create and edit pages using the `ScoreConfigForm` component.

### Step 10: Create Referee and Audience Pages
**Estimated time: 2-3 days**
**Aligns with: Proposal Section 3.5 (Pages)**

1. Create the referee and audience page directories and files:
   ```bash
   mkdir -p src/app/referee/matches/[matchId]/scoring
   mkdir -p src/app/audience/matches/[matchId]/scores
   touch src/app/referee/matches/[matchId]/scoring/page.tsx
   touch src/app/audience/matches/[matchId]/scores/page.tsx
   ```

2. Implement the referee scoring page with:
   - Tabs for score input and display
   - Dynamic score input for each alliance
   - Score display for each alliance

3. Implement the audience display page with:
   - Score display for each alliance
   - Real-time updates via WebSockets (if applicable)

## Phase 3: Integration and Testing

### Step 11: Create Bridge Between Old and New Scoring
**Estimated time: 2-3 days**
**Aligns with: Proposal Section 7 (Implementation Steps)**

1. Create a service to handle the transition between the old and new scoring systems:
   ```bash
   mkdir -p src/scoring-bridge
   touch src/scoring-bridge/scoring-bridge.service.ts
   touch src/scoring-bridge/scoring-bridge.module.ts
   ```

2. Implement methods to:
   - Convert old scores to the new format
   - Sync scores between systems during the transition
   - Generate default score configurations for existing tournaments

3. Implement a feature flag system to control which scoring system is active.

### Step 12: Implement Example Fire-Fighting Configuration
**Estimated time: 1 day**
**Aligns with: Proposal Section 5 (Example Configuration)**

1. Create a script to generate the fire-fighting competition configuration:
   ```bash
   mkdir -p src/scripts
   touch src/scripts/generate-fire-fighting-config.ts
   ```

2. Implement the script to create:
   - Score elements as defined in Section 5.1
   - Bonus conditions as defined in Section 5.2
   - Penalty conditions as defined in Section 5.3

3. Test the configuration with sample match data.

### Step 13: Comprehensive Testing
**Estimated time: 2-3 days**
**Aligns with: Proposal Section 7 (Implementation Steps)**

1. Write unit tests for:
   - Score calculation logic
   - Condition evaluation
   - Service methods

2. Write integration tests for:
   - API endpoints
   - Database operations

3. Write end-to-end tests for:
   - Score configuration workflow
   - Score input and display
   - Bridge functionality

4. Conduct user acceptance testing with tournament administrators and referees.

## Phase 4: Deployment and Rollout

### Step 14: Gradual Rollout
**Estimated time: 1-2 weeks (spread across tournaments)**
**Aligns with: Proposal Section 7 (Implementation Steps)**

1. Enable the new scoring system for a single tournament as a pilot.

2. Gather feedback and make necessary adjustments.

3. Gradually enable the system for more tournaments using the feature flag system.

4. Monitor performance and user satisfaction.

### Step 15: Documentation and Training
**Estimated time: 2-3 days**
**Aligns with: Proposal Section 7 (Implementation Steps)**

1. Update the technical documentation to reflect the new scoring system.

2. Create user documentation for:
   - Tournament administrators (creating and managing score configurations)
   - Referees (inputting scores)
   - Audience (viewing scores)

3. Provide training materials and sessions for key users.

### Step 16: Full Transition
**Estimated time: 1 day**
**Aligns with: Proposal Section 7 (Implementation Steps)**

1. Once all tournaments are using the new system successfully, remove the old scoring code and database tables (or keep them for historical data but disable in the UI).

2. Remove the bridge service and feature flags.

3. Finalize documentation and training materials.

## Implementation Timeline

The entire migration can be completed in approximately 4-6 weeks, depending on team size and availability. Here's a suggested timeline:

- **Week 1**: Phase 1 (Steps 1-5)
- **Week 2-3**: Phase 2 (Steps 6-10)
- **Week 4**: Phase 3 (Steps 11-13)
- **Weeks 5-6**: Phase 4 (Steps 14-16)

## Alignment with SOLID Principles

This implementation plan follows the SOLID principles as outlined in Section 6 of the proposal:

- **Single Responsibility Principle**: Each service, component, and class has a single responsibility.
- **Open/Closed Principle**: The system is open for extension without modification.
- **Liskov Substitution Principle**: All condition evaluators follow a consistent interface.
- **Interface Segregation Principle**: DTOs and components are specific to their use cases.
- **Dependency Inversion Principle**: Services depend on abstractions rather than concrete implementations.

## Conclusion

This migration plan provides a structured approach to implementing the ScoreConfig system exactly as described in the Flexible Scoring System Proposal. By following these steps, you can gradually transition to the new flexible scoring system while ensuring a smooth experience for all users.
