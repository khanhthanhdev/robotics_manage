# Robotics Tournament API Documentation

## Overview
This API provides endpoints for managing robotics tournaments, including users, teams, tournaments, stages, matches, match scores, and match scheduling. The API follows RESTful principles and uses JSON for data exchange.

**Base URL**: `http://localhost:3000/api`
**Swagger UI**: `/api/docs`

---

## Authentication

- Uses JWT (JSON Web Token) for authentication and role-based access control.
- After login, JWT is set as an HTTP-only cookie named `token`.
- Use the cookie for all authenticated requests.

### Endpoints
| Method | Endpoint           | Description                       |
|--------|--------------------|-----------------------------------|
| POST   | /auth/register     | Register a new user               |
| POST   | /auth/login        | Login and receive JWT cookie      |
| POST   | /auth/logout       | Logout and clear cookie           |
| GET    | /auth/init-admin   | Initialize default admin          |
| GET    | /auth/check-auth   | Check authentication (JWT needed) |
| GET    | /auth/check-admin  | Check admin role (JWT needed)     |

#### Register
- **POST /auth/register**
- **Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string" // optional
}
```
- **Response:**
```json
{
  "id": "string",
  "username": "string",
  "role": "COMMON",
  "createdAt": "timestamp"
}
```

#### Login
- **POST /auth/login**
- **Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "role": "ADMIN | HEAD_REFEREE | ALLIANCE_REFEREE | COMMON"
  },
  "message": "Login successful"
}
```
- **Cookie:**
  - Name: `token`
  - httpOnly: true
  - maxAge: 7 days

#### Logout
- **POST /auth/logout**
- **Response:**
```json
{ "message": "Logged out" }
```

#### Check Auth
- **GET /auth/check-auth**
- **Headers:**
  - Cookie: `token=...`
- **Response:**
```json
{
  "authenticated": true,
  "user": { "id": "string", "username": "string", "role": "string" },
  "message": "Your authentication is working correctly"
}
```

#### Check Admin
- **GET /auth/check-admin**
- **Headers:**
  - Cookie: `token=...`
- **Response:**
```json
{
  "authenticated": true,
  "role": "ADMIN",
  "hasAdminAccess": true,
  "message": "Your ADMIN role is working correctly"
}
```

---

## Users

| Method | Endpoint         | Description           | Body/Params |
|--------|------------------|----------------------|-------------|
| GET    | /users           | List all users       |             |
| GET    | /users/:id       | Get user by ID       |             |
| POST   | /users           | Create user          | JSON body   |
| PATCH  | /users/:id       | Update user          | JSON body   |
| DELETE | /users/:id       | Delete user          |             |

#### Create User
- **POST /users**
- **Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

#### Update User
- **PATCH /users/:id**
- **Body:**
```json
{
  "username": "string", // optional
  "email": "string",    // optional
  "role": "string"      // optional
}
```

---

## Teams

| Method | Endpoint         | Description           | Body/Params |
|--------|------------------|----------------------|-------------|
| GET    | /teams           | List all teams       |             |
| GET    | /teams/:id       | Get team by ID       |             |
| POST   | /teams           | Create team          | JSON body   |
| PATCH  | /teams/:id       | Update team          | JSON body   |
| DELETE | /teams/:id       | Delete team          |             |
| POST   | /teams/import    | Import teams         | JSON body   |

#### Create Team
- **POST /teams**
- **Body:**
```json
{
  "name": "string",
  "teamNumber": "string", // optional
  "organization": "string", // optional
  "avatar": "string (URL)", // optional
  "description": "string", // optional
  "teamMembers": [ { "name": "string", "role": "string", "email": "string", "phone": "string" } ], // optional
  "tournamentId": "string (UUID)" // optional
}
```

#### Import Teams
- **POST /teams/import**
- **Body:**
```json
{
  "content": "Team Alpha\nTeam Beta,School XYZ",
  "format": "text",      // optional
  "hasHeader": false,     // optional
  "delimiter": ","       // optional
}
```

---

## Tournaments

| Method | Endpoint         | Description           | Body/Params |
|--------|------------------|----------------------|-------------|
| GET    | /tournaments     | List all tournaments |             |
| GET    | /tournaments/:id | Get tournament by ID |             |
| POST   | /tournaments     | Create tournament    | JSON body   |
| PATCH  | /tournaments/:id | Update tournament    | JSON body   |
| DELETE | /tournaments/:id | Delete tournament    |             |

#### Create Tournament
- **POST /tournaments**
- **Body:**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "string (ISO date)",
  "endDate": "string (ISO date)",
  "adminId": "string"
}
```

---

## Stages

| Method | Endpoint         | Description           | Body/Params |
|--------|------------------|----------------------|-------------|
| GET    | /stages          | List all stages      |             |
| GET    | /stages/:id      | Get stage by ID      |             |
| POST   | /stages          | Create stage         | JSON body   |
| PATCH  | /stages/:id      | Update stage         | JSON body   |
| DELETE | /stages/:id      | Delete stage         |             |

#### Create Stage
- **POST /stages**
- **Body:**
```json
{
  "name": "string",
  "type": "SWISS | PLAYOFF | FINAL",
  "startDate": "string (ISO date)",
  "endDate": "string (ISO date)",
  "tournamentId": "string (UUID)"
}
```

---

## Matches

| Method | Endpoint             | Description                | Body/Params |
|--------|----------------------|---------------------------|-------------|
| GET    | /matches             | List all matches           |             |
| GET    | /matches/:id         | Get match by ID            |             |
| POST   | /matches             | Create match               | JSON body   |
| PATCH  | /matches/:id         | Update match               | JSON body   |
| PATCH  | /matches/:id/status  | Update match status        | JSON body   |
| DELETE | /matches/:id         | Delete match               |             |

#### Create Match
- **POST /matches**
- **Body:**
```json
{
  "matchNumber": 1,
  "status": "PENDING",
  "startTime": "2025-04-27T10:00:00.000Z",
  "endTime": "2025-04-27T10:30:00.000Z",
  "stageId": "string (UUID)",
  "alliances": [
    {
      "color": "RED",
      "teamIds": ["teamId1", "teamId2"]
    },
    {
      "color": "BLUE",
      "teamIds": ["teamId3", "teamId4"]
    }
  ]
}
```

#### Update Match Status
- **PATCH /matches/:id/status**
- **Body:**
```json
{
  "status": "PENDING | IN_PROGRESS | COMPLETED | CANCELLED"
}
```

---

## Match Scores

| Method | Endpoint                        | Description                        | Body/Params |
|--------|----------------------------------|------------------------------------|-------------|
| GET    | /match-scores                   | List all match scores              |             |
| GET    | /match-scores/:id               | Get match scores by ID             |             |
| GET    | /match-scores/match/:matchId    | Get match scores by match ID       |             |
| POST   | /match-scores                   | Create match scores                | JSON body   |
| PATCH  | /match-scores/:id               | Update match scores                | JSON body   |
| DELETE | /match-scores/:id               | Delete match scores                |             |
| POST   | /match-scores/initialize/:matchId | Initialize scores for a match     |             |

#### Create/Update Match Scores
- **POST /match-scores** or **PATCH /match-scores/:id**
- **Body:**
```json
{
  "matchId": "string (UUID)",
  "redAutoScore": 45,
  "redDriveScore": 65,
  "redTeamCount": 3,
  "redMultiplier": 1.75,
  "blueAutoScore": 40,
  "blueDriveScore": 60,
  "blueTeamCount": 3,
  "blueMultiplier": 1.75,
  "redGameElements": { "highGoal": 4, "midGoal": 5, "lowGoal": 2 },
  "blueGameElements": { "highGoal": 3, "midGoal": 4, "lowGoal": 3 },
  "scoreDetails": { "penalties": { "red": 0, "blue": 5 }, "specialScoring": { "endgameClimb": { "red": 15, "blue": 10 } } }
}
```

#### Team Count Multipliers
| Team Count | Multiplier |
|------------|------------|
| 1          | 1.25       |
| 2          | 1.5        |
| 3          | 1.75       |
| 4          | 2.0        |
| Other      | 1.0        |

#### Score Calculation
`TotalScore = Round((AutoScore + DriveScore) * Multiplier)`

---

## Match Scheduler

| Method | Endpoint                                         | Description                                 | Body/Params |
|--------|--------------------------------------------------|---------------------------------------------|-------------|
| POST   | /match-scheduler/generate-frc-schedule           | Generate FRC-style schedule                 | JSON body   |
| POST   | /match-scheduler/generate-swiss-round            | Generate Swiss round                        | JSON body   |
| POST   | /match-scheduler/generate-playoff                | Generate playoff bracket                    | JSON body   |
| POST   | /match-scheduler/update-playoff-brackets/:matchId| Update playoff brackets after match         | URL param   |
| POST   | /match-scheduler/finalize-playoff-rankings/:stageId | Finalize playoff rankings                | URL param   |
| GET    | /match-scheduler/swiss-rankings/:stageId         | Get Swiss rankings for a stage              | URL param   |

#### Generate Swiss Round
- **POST /match-scheduler/generate-swiss-round**
- **Body:**
```json
{
  "stageId": "string (UUID)",
  "currentRoundNumber": 2
}
```

#### Get Swiss Rankings
- **GET /match-scheduler/swiss-rankings/:stageId**
- **Response:**
```json
[
  {
    "team": { "id": "uuid", "name": "Robotic Eagles", ... },
    "rankingPoints": 12,
    "opponentWinPercentage": 0.75,
    "pointDifferential": 45,
    "matchesPlayed": 5
  }
]
```

#### Generate Playoff Bracket
- **POST /match-scheduler/generate-playoff**
- **Body:**
```json
{
  "stageId": "string (UUID)",
  "numberOfRounds": 3
}
```

#### Update Playoff Brackets
- **POST /match-scheduler/update-playoff-brackets/:matchId**
- **URL Param:** `matchId` (completed match ID)

#### Finalize Playoff Rankings
- **POST /match-scheduler/finalize-playoff-rankings/:stageId**
- **URL Param:** `stageId` (playoff stage ID)

---

## Usage Examples

### Record Match Scores (Frontend)
```javascript
const scoreData = {
  matchId: "cltz0982v0001g8mbadcd1234",
  redAutoScore: 45,
  redDriveScore: 65,
  redTeamCount: 3,
  blueAutoScore: 40,
  blueDriveScore: 60,
  blueTeamCount: 3,
  redGameElements: { highGoal: 4, midGoal: 5, lowGoal: 2 },
  blueGameElements: { highGoal: 3, midGoal: 4, lowGoal: 3 },
  scoreDetails: { penalties: { red: 0, blue: 10 } }
};
fetch('/api/match-scores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
  body: JSON.stringify(scoreData)
});
```

### Display Tournament Results (Frontend)
```javascript
async function loadTournamentResults(tournamentId) {
  const matches = await fetch(`/api/tournaments/${tournamentId}/matches`).then(r => r.json());
  const completedMatches = matches.filter(m => m.status === 'COMPLETED');
  const matchResults = await Promise.all(
    completedMatches.map(async match => {
      const scoreData = await fetch(`/api/match-scores/match/${match.id}`).then(r => r.json());
      return {
        matchNumber: match.matchNumber,
        round: match.roundNumber,
        stageName: match.stage.name,
        redTeams: match.alliances.find(a => a.color === 'RED').teamAlliances.map(ta => ta.team.teamNumber).join(', '),
        blueTeams: match.alliances.find(a => a.color === 'BLUE').teamAlliances.map(ta => ta.team.teamNumber).join(', '),
        redScore: scoreData.redTotalScore,
        blueScore: scoreData.blueTotalScore,
        winner: scoreData.redTotalScore > scoreData.blueTotalScore ? 'RED' : scoreData.blueTotalScore > scoreData.redTotalScore ? 'BLUE' : 'TIE'
      };
    })
  );
  // ...render table
}
```

---

## Notes
- All endpoints use JSON for request and response bodies unless otherwise specified.
- For more details, see the Swagger UI at `/api/docs`.
- The match scheduler implements simulated annealing for qualification, Swiss-style pairing, and elimination bracket generation.
- Team statistics are updated automatically when match scores are created or updated.