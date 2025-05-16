# Audience Display UI/UX Flow

This document details the user interface (UI), user experience (UX), data points, and logic for the `/audience-display` feature of the Robotics Tournament Management System.

## 1. Tournament Selection Page

-   **URL:** `/audience-display`
-   **Purpose:** Allows users to view a list of available robotics tournaments and select one to view its details and live field displays.

### 1.1. UI Components

-   **Page Title:** "Robotics Tournaments" or similar.
-   **Tournament List:** A primary section displaying a list of tournaments. Each tournament could be represented by a:
    -   **Tournament Card (Shadcn Card Component):**
        -   Tournament Name (e.g., "RoboCup Nationals 2025")
        -   Tournament Date(s) (e.g., "July 15-17, 2025")
        -   Tournament Location (if available, e.g., "City Convention Center")
        -   Number of Registered Teams (e.g., "32 Teams")
        -   A "View Tournament" button or the entire card can be clickable.
-   **Loading State:** A loading spinner or skeleton UI while the tournament list is being fetched.
-   **Empty State:** A message like "No tournaments available at the moment" if the list is empty.
-   **Error State:** A message indicating an error if fetching tournaments fails (e.g., "Could not load tournaments. Please try again later.").
-   **Filtering/Search (Optional):** A search bar to filter tournaments by name, or filter controls for status/date.

### 1.2. Data Points Displayed (per tournament)

-   `tournament.name`
-   `tournament.startDate` / `tournament.endDate`
-   `tournament.location` (if applicable)
-   Count of `tournament.teams`


### 1.3. Logic

-   **On Page Load:**
    -   The frontend makes an API call to fetch a list of all public/available tournaments (e.g., `GET /api/tournaments?status=public`).
    -   The `useTournaments` TanStack Query hook would manage this data fetching, caching, and state (loading, error, success).
-   **User Interaction:**
    -   User clicks on a "View Tournament" button or a tournament card.
    -   The application navigates the user to the Field Selection page for the chosen tournament, typically `/audience-display/:tournamentId` (e.g., `/audience-display/clxqz8v0o000008l3g2kch369`).

## 2. Field Selection Page

-   **URL:** `/audience-display/:tournamentId` (e.g., `/audience-display/clxqz8v0o000008l3g2kch369`)
-   **Purpose:** After selecting a tournament, this page allows users to choose a specific field to view its live match display.

### 2.1. UI Components

-   **Page Title:** Dynamically set to the selected Tournament Name (e.g., "RoboCup Nationals 2025 - Select Field").
-   **Tournament Information Display (Optional but Recommended):** A small section reiterating key details of the selected tournament (name, date).
-   **Field Selection Dropdown (`FieldSelectDropdown` - Reusable Shadcn Select Component):**
    -   Label: "Select a Field to View"
    -   Options: Dynamically populated with the available fields for the selected tournament (e.g., "Field 1", "Field 2", ..., "Field N"). The options should display the `Field.number`.
    -   Default state: Placeholder text like "-- Select Field --".
-   **Loading State:** If fetching tournament details or field list takes time, display a loading indicator.
-   **Empty State (No Fields):** If the tournament has no fields configured (e.g., `numberOfFields` is 0 or fields haven't been created), display a message like "This tournament has no fields available for display."
-   **Error State:** Message if fetching tournament details or its fields fails.
-   **Back Button (Optional):** A button to navigate back to the main tournament list (`/audience-display`).

### 2.2. Data Points Displayed

-   `tournament.name` (for title/header)
-   List of `Field` entities associated with the `:tournamentId`, specifically their `field.number` and `field.id` (for selection value).

### 2.3. Logic

-   **On Page Load:**
    -   Extract `:tournamentId` from the URL.
    -   Fetch details for the specified tournament (e.g., `GET /api/tournaments/:tournamentId`) to display its name and confirm its existence.
    -   Fetch the list of fields for this tournament (e.g., `GET /api/tournaments/:tournamentId/fields`). The `useTournamentFields(tournamentId)` TanStack Query hook would handle this.
-   **User Interaction:**
    -   User selects a field (e.g., "Field 1") from the `FieldSelectDropdown`.
    -   The application navigates the user to the Live Field Display page for the chosen tournament and field, typically `/audience-display/:tournamentId/:fieldId` (e.g., `/audience-display/clxqz8v0o000008l3g2kch369/clxqz9abc000108l3g2kch456`). The `:fieldId` is the actual ID of the `Field` entity.

## 3. Live Field Display Page

-   **URL:** `/audience-display/:tournamentId/:fieldId` (e.g., `/audience-display/clxqz8v0o000008l3g2kch369/clxqz9abc000108l3g2kch456`)
-   **Purpose:** Displays real-time information for the selected field within the chosen tournament, including the active match, scores, timer, and match state. This page heavily relies on WebSocket communication.

### 3.1. UI Components

-   **Page Title/Header:** Dynamically set, e.g., "Tournament Name - Field X Live Display" (e.g., "RoboCup Nationals 2025 - Field 1 Live Display").
-   **Connection Status Indicator (Optional but Recommended):** A small visual cue indicating WebSocket connection status (e.g., connected, disconnected, attempting to connect).
-   **Main Display Area:** This is where the live match information is shown. It could include:
    -   **Current Match Information:**
        -   Match Name/Number (e.g., "Qualification Match 23")
        -   Alliance Names/Team Names (e.g., "Red Alliance: Team Alpha, Team Beta" vs "Blue Alliance: Team Gamma, Team Delta")
    -   **Scoreboard:**
        -   Scores for each alliance (Red and Blue), broken down by scoring periods (e.g., Autonomous, Tele-operated) and total score.
        -   Visually clear and easy to read from a distance.
    -   **Match Timer:**
        -   Displays the current match time (e.g., counting down from 2:30).
        -   May change color or style based on match phase (e.g., autonomous, tele-op, endgame).
    -   **Match State Display:**
        -   Indicates the current state of the match (e.g., "Waiting for Start", "Autonomous Period", "Tele-op Period", "Match Paused", "Match Ended", "Results Pending").
-   **"No Active Match" State:** If the selected field currently has no active match, display a message like "Field X is currently idle. Waiting for the next match." or show an upcoming match schedule for that field if available.
-   **Loading/Connecting State:** Initial message like "Connecting to live feed for Field X..."
-   **Error State:** If WebSocket connection fails or data cannot be retrieved, display an appropriate error message.
-   **Back/Change Field Button (Optional):** Button to navigate back to the Field Selection page (`/audience-display/:tournamentId`).

### 3.2. Data Points Displayed (primarily from WebSocket events)

-   `tournament.name` (from URL parameter or initial fetch)
-   `field.number` (from URL parameter or initial fetch)
-   For the active match on the field:
    -   `match.name` or `match.matchNumber`
    -   `match.alliances[0].teams` (names)
    -   `match.alliances[1].teams` (names)
    -   `match.scores.red.auto`, `match.scores.red.teleop`, `match.scores.red.total`
    -   `match.scores.blue.auto`, `match.scores.blue.teleop`, `match.scores.blue.total`
    -   `match.timer.currentTime`, `match.timer.phase`
    -   `match.state`

### 3.3. Logic

-   **On Page Load:**
    -   Extract `:tournamentId` and `:fieldId` from the URL.
    -   (Optional) Fetch basic details for the tournament and field to display in the header and confirm validity.
    -   **Establish WebSocket Connection:**
        -   The frontend client (using `useWebSocket.ts` or similar) attempts to connect to the Socket.io server.
        -   Once connected, it emits a `joinFieldRoom` event with the `{ fieldId }` payload to subscribe to updates for this specific field.
-   **WebSocket Event Handling:**
    -   The client listens for events broadcast to the `field_{fieldId}` room:
        -   `activeMatchUpdate`: When received, updates the UI to display the new active match's details (teams, initial scores if available, state). If `matchId` is `null`, it updates the UI to an "idle" or "waiting for match" state.
        -   `matchScoreUpdate`: Updates the scoreboard UI with the new scores for the currently displayed match.
        -   `matchTimerUpdate`: Updates the timer display.
        -   `matchStateUpdate`: Updates the match state display (e.g., from "Autonomous" to "Tele-op").
    -   All UI updates triggered by WebSocket events should efficiently re-render only the necessary components.
    -   TanStack Query can be used to manage the state derived from WebSocket events (e.g., `queryClient.setQueryData` for an `['activeMatchOnField', fieldId]` query).
-   **On Page Unload/Component Unmount:**
    -   The client should emit a `leaveFieldRoom` event with the `{ fieldId }` to unsubscribe from updates and clean up server resources.
    -   The WebSocket connection might be closed if no other components are using it.

This detailed flow should provide a solid foundation for developing the audience display feature.
