# Affected Files and Modules for Field-Specific Features

This document lists the key files and modules anticipated to require changes for the implementation of the Field-Specific Control and Viewing feature, based on the revised `new_features_todo.md` plan.

## Backend (NestJS)

### 1. Prisma Schema
-   `prisma/schema.prisma`: Modifications to `Tournament` and `Match` models; new `Field` model.

### 2. Modules
-   `src/tournaments/tournaments.module.ts`: Likely updates to providers or imports if `FieldsService` is integrated here.
-   `src/matches/matches.module.ts`: Updates to link with field data.
-   `src/match-scheduler/match-scheduler.module.ts`: Updates for field assignment logic.
-   `src/websockets/websockets.module.ts`: Ensure `EventsGateway` is correctly configured.
-   Potentially a new `src/fields/fields.module.ts` if Field CRUD becomes extensive, though the current plan suggests management via `TournamentsService`.

### 3. Services
-   `src/tournaments/tournaments.service.ts`: Logic to manage `Field` entities based on `Tournament.numberOfFields`.
-   `src/fields/fields.service.ts` (or methods within `TournamentsService`): To list `Field` entities for a tournament.
-   `src/matches/matches.service.ts`: Handling `fieldId` and `fieldNumber` in `Match` entities, filtering matches by field.
-   `src/match-scheduler/match-scheduler.service.ts`: Implementing auto-assignment of `fieldId` and `fieldNumber` to generated matches.
-   `src/match-scores/match-scores.service.ts`: To ensure score updates are correctly associated with field-specific WebSocket events if needed.

### 4. Controllers
-   `src/tournaments/tournaments.controller.ts`: Endpoint to update `Tournament.numberOfFields`; endpoint to list `Field` entities for a tournament.
-   `src/matches/matches.controller.ts`: Endpoints for filtering matches by field; endpoint for an admin to update a match's assigned field.

### 5. Gateway
-   `src/websockets/events.gateway.ts`: Implementation of field-specific rooms (e.g., `field_{fieldId}`), handling `joinFieldRoom` and `leaveFieldRoom` client events, and emitting new field-specific events (e.g., `activeMatchUpdate`, `matchScoreUpdate`).

### 6. DTOs (Data Transfer Objects)
-   `src/tournaments/dto/update-tournament.dto.ts`: To include `numberOfFields`.
-   `src/matches/dto/update-match.dto.ts`: To include optional `fieldId` for admin updates.
-   `src/matches/dto/query-match.dto.ts` (or similar for query parameters): To include `fieldId` or `fieldNumber` for filtering.
-   Potentially DTOs for WebSocket payloads if not using shared types directly.

## Frontend (Next.js)

### 1. Pages/Routes (Illustrative paths, actual structure may vary)
-   `app/admin/tournaments/[tournamentId]/settings/page.tsx` (or similar): UI for admin to set/update `Tournament.numberOfFields`.
-   `app/control-match/page.tsx` (or `app/admin/tournaments/[tournamentId]/control/page.tsx`): Integration of `FieldSelectDropdown`, logic to filter matches by selected field, and field-specific WebSocket subscriptions.
-   `app/audience-display/page.tsx` (or `app/tournaments/[tournamentId]/audience/page.tsx`): Integration of `FieldSelectDropdown`, logic to display field-specific match data, and field-specific WebSocket subscriptions.
-   `app/admin/matches/[matchId]/edit/page.tsx` (or similar): UI for admin to manually assign/change a match's field.

### 2. Components
-   `components/fields/FieldSelectDropdown.tsx` (New reusable component): For selecting a field.
-   Components displaying match lists (e.g., `components/matches/MatchList.tsx`): To display `fieldNumber`.
-   Components displaying match details (e.g., `components/matches/MatchDetail.tsx`): To display `fieldNumber`.
-   Admin forms for tournament settings (to include `numberOfFields`).

### 3. Hooks
-   `hooks/tanstack-query/useTournamentFields.ts` (New hook): To fetch `Field` entities for a tournament.
-   `hooks/tanstack-query/useMatches.ts` (Update): To accept `fieldId` or `fieldNumber` for filtering.
-   `hooks/tanstack-query/useUpdateTournament.ts` (Update): To handle `numberOfFields`.
-   `hooks/tanstack-query/useUpdateMatch.ts` (Update): To handle `fieldId` assignment.
-   `hooks/websockets/useWebSocket.ts` (Update): Logic for joining/leaving field-specific rooms and handling new field-specific events.

### 4. API Client
-   `lib/api-client.ts` (or `services/api.ts`): Add new functions for API calls related to `GET /tournaments/:tournamentId/fields`, and ensure `PATCH /matches/:id` and `PATCH /tournaments/:id` are correctly implemented.

### 5. Types
-   `types/index.ts` (or `types/prisma.ts`, `types/api.ts`): Update `Tournament` type (add `numberOfFields`), define new `Field` type, and update `Match` type (add `fieldId`, `fieldNumber`). Define types for WebSocket event payloads.

## Documentation & Other

-   `robotics_tournament_doc.md` (Main Technical Document): Multiple sections will require updates to reflect the new field management system, match-field assignments, API changes, and WebSocket strategy.
-   `new_features_todo.md` (Implementation Plan): This document itself, which outlines the plan.

This list provides a general overview. Specific file names and locations might differ based on the actual project structure in the `robotics_manage` repository.
