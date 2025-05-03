# WebSocket Implementation Plan for Real-Time Communication

This document outlines the step-by-step plan to implement real-time communication between the `/control-match` and `/audience-display` features using WebSockets.

## Overview

The goal is to establish bidirectional communication between:
- The control panel at `/control-match` (sends commands and updates)
- The audience display at `/audience-display` (receives and displays real-time updates)

We'll leverage the existing `EventsGateway` in the backend and implement corresponding client-side functionality in the frontend.

## Implementation Steps

### 1. Backend Setup (NestJS)
- [x] Create WebSocket Gateway (already implemented in `events.gateway.ts`)
- [ ] Update the Gateway to handle specific events for match control and audience display
- [ ] Add audience display settings handling
- [ ] Implement room-based connections for tournament-specific broadcasts
- [ ] Add authentication for WebSocket connections (optional enhancement)

### 2. Frontend Setup (Next.js)
- [ ] Create a WebSocket service using Socket.IO client
- [ ] Implement connection management and reconnection logic
- [ ] Set up event listeners and emitters

### 3. Control Panel Implementation (`/control-match`)
- [ ] Connect to WebSocket server on component mount
- [ ] Implement UI controls for match management
- [ ] Add event emitters for:
  - Match selection/changes
  - Timer controls (start, pause, reset)
  - Score updates
  - Display mode changes
  - Custom announcements

### 4. Audience Display Implementation (`/audience-display`)
- [ ] Connect to WebSocket server on component mount
- [ ] Create responsive display components
- [ ] Implement event listeners for:
  - Match updates
  - Timer updates
  - Score changes
  - Display mode changes
  - Announcements

### 5. Data Models

#### Match Control Data
```typescript
interface AudienceDisplaySettings {
  displayMode: 'match' | 'teams' | 'schedule' | 'rankings' | 'announcement' | 'blank';
  matchId?: string | null;
  showTimer?: boolean;
  showScores?: boolean;
  showTeams?: boolean;
  message?: string;
  tournamentId: string;
  updatedAt: number;
}

interface TimerData {
  duration: number;
  remaining: number;
  isRunning: boolean;
  startedAt?: number;
  pausedAt?: number;
  tournamentId: string;
}

interface MatchStateData {
  matchId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  currentPeriod?: 'auto' | 'teleop' | 'endgame' | null;
  tournamentId: string;
}

interface ScoreUpdateData {
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  tournamentId: string;
}
```

### 6. WebSocket Events

| Event Name | Direction | Description | Payload |
|------------|-----------|-------------|---------|
| `display_mode_change` | Control → Display | Change the audience display mode | `AudienceDisplaySettings` |
| `match_update` | Control → Display | Updates current match details | `MatchData` |
| `score_update` | Control → Display | Updates current match scores | `ScoreUpdateData` |
| `timer_update` | Control → Display | Updates timer state | `TimerData` |
| `match_state_change` | Control → Display | Updates match state | `MatchStateData` |
| `announcement` | Control → Display | Sends announcement message | `{ message: string, tournamentId: string }` |

### 7. Room-Based Communication
- Implement rooms based on tournament IDs to isolate communication
- Join pattern: `client.join(tournamentId)`
- Broadcast pattern: `server.to(tournamentId).emit(event, payload)`

### 8. Testing Strategy
- Test WebSocket connections with multiple clients
- Verify real-time updates across different devices
- Test reconnection behavior
- Monitor performance with multiple active connections

### 9. Security Considerations
- Implement authentication for WebSocket connections
- Validate payload data on both client and server
- Protect against cross-site WebSocket hijacking
- Rate limit connection attempts

### 10. Deployment Considerations
- Ensure proper WebSocket configurations in production environment
- Configure CORS settings appropriately
- Plan for WebSocket scaling (potential use of Redis adapter for multiple instances)
- Implement heartbeat mechanism to detect disconnections

## Next Steps
1. Enhance the existing `EventsGateway` with the new event handlers
2. Create the frontend WebSocket service
3. Implement the control panel WebSocket integration
4. Implement the audience display WebSocket integration
5. Test the complete flow and refine as needed