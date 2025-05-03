# Robotics Tournament API Documentation

## Overview

This API provides endpoints for managing robotics tournaments, including users, teams, tournaments, stages, and matches. The API follows RESTful principles and uses JSON for data exchange.

**Base URL**: `http://localhost:3000/api`

**API Documentation**: `/api/docs` (Swagger UI)

## Authentication

The API uses JWT (JSON Web Token) based authentication to secure endpoints and implement role-based access control.

### Authentication Flow

1. Register a user account or use the default admin account
2. Login with your credentials to receive a JWT token
3. Include this token in subsequent requests as a Bearer token in the Authorization header

### Default Admin Account

For initial setup, a default admin account is automatically created when the application starts:
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: `ADMIN`

It's recommended to change the admin password after first login for security purposes.

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |
| GET | `/auth/init-admin` | Initialize default admin (only needed if admin account is missing) |
| GET | `/auth/check-auth` | Check if authentication is working (requires token) |
| GET | `/auth/check-admin` | Check if your admin role permissions are working (requires admin token) |

#### Register
- **Endpoint**: `POST /api/auth/register`
- **Body**: 
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string" // optional
  }
  ```
- **Response**: 
  ```json
  {
    "id": "string",
    "username": "string",
    "role": "COMMON",
    "createdAt": "timestamp"
  }
  ```

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**: 
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "access_token": "JWT_TOKEN_STRING",
    "user": {
      "id": "string",
      "username": "string",
      "role": "ADMIN | HEAD_REFEREE | ALLIANCE_REFEREE | COMMON"
    }
  }
  ```

#### Check Authentication
- **Endpoint**: `GET /api/auth/check-auth`
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Response**: 
  ```json
  {
    "authenticated": true,
    "user": {
      "id": "string",
      "username": "string",
      "role": "string"
    },
    "message": "Your authentication is working correctly"
  }
  ```

#### Check Admin Access
- **Endpoint**: `GET /api/auth/check-admin`
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Response**: 
  ```json
  {
    "authenticated": true,
    "role": "ADMIN",
    "hasAdminAccess": true,
    "message": "Your ADMIN role is working correctly"
  }
  ```
- **Error Response** (if not admin):
  ```json
  {
    "statusCode": 401,
    "message": "User with role XXX does not have permission to access this resource",
    "error": "Unauthorized"
  }
  ```

### Using JWT Tokens

Include the JWT token in the Authorization header for protected API requests:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Important Notes on JWT Authentication

1. **Token Format**: Always include the "Bearer " prefix before your token
2. **Token Validity**: Tokens have a limited lifespan and will expire
3. **Authentication Headers**: Some API testing tools require you to set the token in a specific auth section rather than manually in headers

### Troubleshooting Authentication

If you encounter "Unauthorized" errors when attempting to access protected endpoints:

1. **Check your token** - Make sure it's valid and not expired
2. **Verify header format** - Ensure you're using `Authorization: Bearer YOUR_TOKEN`
3. **Verify role permissions** - Use `/api/auth/check-admin` to confirm your admin privileges
4. **Regenerate token** - Log in again to get a fresh token if needed

### Role-Based Permissions

The API implements role-based access control with the following roles:

| Role | Permissions |
|------|-------------|
| ADMIN | Full access to all resources (create, read, update, delete) |
| HEAD_REFEREE | Currently limited access (more permissions to be configured) |
| ALLIANCE_REFEREE | Currently limited access (more permissions to be configured) |
| COMMON | Read-only access to resources |

**Important**: Currently, only users with the **ADMIN** role can modify matches, stages, tournaments, teams, and users. Other role permissions will be configured in future updates.

## Common Response Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication token is missing or invalid
- `403 Forbidden`: User does not have permission to perform the action
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## API Endpoints

### Users

Base path: `/api/users`

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| GET | `/users` | List all users | Any role |
| GET | `/users/:id` | Get a specific user by ID | Any role |
| POST | `/users` | Create a new user | ADMIN |
| PATCH | `/users/:id` | Update a user | ADMIN |
| DELETE | `/users/:id` | Delete a user | ADMIN |

#### Create User
- **Endpoint**: `POST /api/users`
- **Body**: 
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Response**: Created user object

#### Get All Users
- **Endpoint**: `GET /api/users`
- **Response**: Array of user objects

#### Get User by ID
- **Endpoint**: `GET /api/users/:id`
- **Parameters**: `id` - User ID
- **Response**: User object

#### Update User
- **Endpoint**: `PATCH /api/users/:id`
- **Parameters**: `id` - User ID
- **Body**: 
  ```json
  {
    "username": "string", // optional
    "email": "string",    // optional
    "role": "string"      // optional
  }
  ```
- **Response**: Updated user object

#### Delete User
- **Endpoint**: `DELETE /api/users/:id`
- **Parameters**: `id` - User ID
- **Response**: Success message or deleted user object

### Teams

Base path: `/api/teams`

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| GET | `/teams` | List all teams (can filter by tournamentId) | Any role |
| GET | `/teams/:id` | Get a specific team by ID | Any role |
| POST | `/teams` | Create a new team | ADMIN |
| POST | `/teams/import` | Import multiple teams from CSV/text | ADMIN |
| PATCH | `/teams/:id` | Update a team | ADMIN |
| DELETE | `/teams/:id` | Delete a team | ADMIN |

#### Create Team
- **Endpoint**: `POST /api/teams`
- **Body**: 
  ```json
  {
    "name": "string",
    "teamNumber": "string",          // optional, will be auto-generated if not provided (format: 000001)
    "organization": "string",        // optional
    "avatar": "string (URL)",        // optional, URL to team avatar/logo
    "description": "string",         // optional
    "teamMembers": [                 // optional, array of team members
      {
        "name": "string",
        "role": "string",            // optional
        "email": "string",           // optional
        "phone": "string"            // optional
      }
    ],
    "tournamentId": "string (UUID)"  // optional, links team to a tournament
  }
  ```
- **Response**: Created team object with auto-generated teamNumber if not provided

#### Get All Teams
- **Endpoint**: `GET /api/teams`
- **Query Parameters**:
  - `tournamentId` - Optional UUID to filter teams by tournament
- **Response**: Array of team objects including tournament information

#### Get Team by ID
- **Endpoint**: `GET /api/teams/:id`
- **Parameters**: `id` - Team ID
- **Response**: Team object including tournament and match history

#### Update Team
- **Endpoint**: `PATCH /api/teams/:id`
- **Parameters**: `id` - Team ID
- **Body**: 
  ```json
  {
    "name": "string",                // optional
    "teamNumber": "string",          // optional
    "organization": "string",        // optional
    "avatar": "string (URL)",        // optional
    "description": "string",         // optional
    "teamMembers": [                 // optional
      {
        "name": "string",
        "role": "string",            // optional
        "email": "string",           // optional
        "phone": "string"            // optional
      }
    ],
    "tournamentId": "string (UUID)"  // optional
  }
  ```
- **Response**: Updated team object

#### Delete Team
- **Endpoint**: `DELETE /api/teams/:id`
- **Parameters**: `id` - Team ID
- **Response**: Deleted team object

#### Import Teams
- **Endpoint**: `POST /api/teams/import`
- **Body**: 
  ```json
  {
    "content": "Team Alpha\nTeam Beta,School XYZ\nTeam Gamma,School ABC,A great team",
    "format": "text",      // optional, "csv" or "text", default: "text"
    "hasHeader": false,    // optional, default: false
    "delimiter": ","       // optional, default: ","
  }
  ```
- **Notes**:
  - Each line format: `<name>,<organization>,<description>`
  - Team numbers are auto-generated in format 000001, 000002, etc.
  - At minimum, only team name is required
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Successfully imported 3 teams",
    "teams": [
      {
        "id": "uuid",
        "teamNumber": "000001",
        "name": "Team Alpha",
        "organization": null,
        "description": null,
        "avatar": null,
        "teamMembers": null,
        "tournamentId": null,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      // ...more teams
    ]
  }
  ```

### Tournaments

Base path: `/api/tournaments`

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| GET | `/tournaments` | List all tournaments | Any role |
| GET | `/tournaments/:id` | Get a specific tournament by ID | Any role |
| POST | `/tournaments` | Create a new tournament | ADMIN |
| PATCH | `/tournaments/:id` | Update a tournament | ADMIN |
| DELETE | `/tournaments/:id` | Delete a tournament | ADMIN |

#### Create Tournament
- **Endpoint**: `POST /api/tournaments`
- **Body**: 
  ```json
  {
    "name": "string",
    "description": "string",
    "startDate": "string (ISO date)",
    "endDate": "string (ISO date)",
    "adminId": "string"
  }
  ```
- **Response**: Created tournament object

#### Get All Tournaments
- **Endpoint**: `GET /api/tournaments`
- **Response**: Array of tournament objects with admin information

#### Get Tournament by ID
- **Endpoint**: `GET /api/tournaments/:id`
- **Parameters**: `id` - Tournament ID
- **Response**: Tournament object

#### Update Tournament
- **Endpoint**: `PATCH /api/tournaments/:id`
- **Parameters**: `id` - Tournament ID
- **Body**: 
  ```json
  {
    "name": "string",                // optional
    "description": "string",         // optional
    "startDate": "string (ISO date)", // optional
    "endDate": "string (ISO date)"    // optional
  }
  ```
- **Response**: Updated tournament object

#### Delete Tournament
- **Endpoint**: `DELETE /api/tournaments/:id`
- **Parameters**: `id` - Tournament ID
- **Response**: Success message or deleted tournament object

### Stages

Base path: `/api/stages`

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| GET | `/stages` | List all stages | Any role |
| GET | `/stages/:id` | Get a specific stage by ID | Any role |
| POST | `/stages` | Create a new stage | ADMIN |
| PATCH | `/stages/:id` | Update a stage | ADMIN |
| DELETE | `/stages/:id` | Delete a stage | ADMIN |

#### Create Stage
- **Endpoint**: `POST /api/stages`
- **Body**: 
  ```json
  {
    "name": "string",
    "type": "SWISS | PLAYOFF | FINAL",
    "startDate": "string (ISO date with time)",
    "endDate": "string (ISO date with time)",
    "tournamentId": "string (UUID)"
  }
  ```
- **Important Notes**:
  - Stage dates (startDate and endDate) must be within the tournament's date range
  - Validation will fail if stage dates are outside tournament dates
- **Response**: Created stage object

#### Get All Stages
- **Endpoint**: `GET /api/stages`
- **Response**: Array of stage objects with their associated tournaments

#### Get Stage by ID
- **Endpoint**: `GET /api/stages/:id`
- **Parameters**: `id` - Stage ID
- **Response**: Stage object with tournament and matches data (including alliances and teams)

#### Update Stage
- **Endpoint**: `PATCH /api/stages/:id`
- **Parameters**: `id` - Stage ID
- **Body**: 
  ```json
  {
    "name": "string",                // optional
    "type": "SWISS | PLAYOFF | FINAL", // optional
    "startDate": "string (ISO date)", // optional
    "endDate": "string (ISO date)"    // optional
  }
  ```
- **Response**: Updated stage object

#### Delete Stage
- **Endpoint**: `DELETE /api/stages/:id`
- **Parameters**: `id` - Stage ID
- **Response**: Deleted stage object

### Match Scheduler

Base path: `/api/match-scheduler`

The Match Scheduler API provides functionality to automatically generate match schedules for tournament stages using different scheduling algorithms.

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| POST | `/match-scheduler/generate-frc-schedule` | Generate a schedule using the FRC algorithm | ADMIN |
| POST | `/match-scheduler/generate-swiss-round` | Generate a single round for a Swiss-system tournament | ADMIN |
| POST | `/match-scheduler/generate-playoff` | Generate a playoff tournament schedule | ADMIN |
| POST | `/match-scheduler/update-playoff-brackets/:matchId` | Update playoff brackets based on match results | ADMIN |
| POST | `/match-scheduler/finalize-playoff-rankings/:stageId` | Finalize rankings for the final playoff round | ADMIN |

#### Generate FRC Schedule
- **Endpoint**: `POST /api/match-scheduler/generate-frc-schedule`
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Body**: 
  ```json
  {
    "stageId": "string (UUID)",      // ID of the stage to create matches for
    "rounds": 5,                     // Number of rounds each team plays
    "teamsPerAlliance": 2,           // Number of teams per alliance (configured as 2)
    "minMatchSeparation": 1,         // Minimum number of matches between appearances for a team
    "maxIterations": 10000,          // Maximum iterations for schedule optimization (higher = better quality but slower)
    "qualityLevel": "medium"         // Options: "low", "medium", "high" - affects scheduling quality
  }
  ```
- **Response**: 
  ```json
  {
    "message": "Successfully created 15 matches for stage Qualification Rounds",
    "matches": [
      {
        "id": "cltz0982v0001g8mbadcd1234",
        "matchNumber": 1,
        "roundNumber": 1,
        "status": "PENDING",
        "scheduledTime": "2025-04-27T15:30:00.000Z",
        "stageId": "cltyg56k80000y8mwasdf1234",
        "alliances": [
          {
            "color": "RED",
            "teamAlliances": [
              {
                "teamId": "cltya12340001g8mb12345",
                "stationPosition": 1,
                "team": { "name": "Robotic Eagles", "teamNumber": "1234" }
              },
              {
                "teamId": "cltya56780003g8mb67890",
                "stationPosition": 2,
                "team": { "name": "Tech Tigers", "teamNumber": "5678" }
              }
            ]
          },
          {
            "color": "BLUE",
            "teamAlliances": [
              {
                "teamId": "cltya34560002g8mb34567",
                "stationPosition": 1,
                "team": { "name": "Binary Bolts", "teamNumber": "3456" }
              },
              {
                "teamId": "cltya78900004g8mb78901",
                "stationPosition": 2,
                "team": { "name": "Quantum Mechanics", "teamNumber": "7890" }
              }
            ]
          }
        ]
      },
      // More matches...
    ]
  }
  ```
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/match-scheduler/generate-frc-schedule \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{
      "stageId": "cltyg56k80000y8mwasdf1234",
      "rounds": 5,
      "teamsPerAlliance": 2,
      "minMatchSeparation": 1,
      "qualityLevel": "medium"
    }'
  ```

#### Generate Swiss Round
- **Endpoint**: `POST /api/match-scheduler/generate-swiss-round`
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Body**: 
  ```json
  {
    "stageId": "string (UUID)",      // ID of the stage to create matches for
    "currentRoundNumber": 1          // Current round number (next round will be this number + 1)
  }
  ```
- **Response**: 
  ```json
  {
    "message": "Successfully generated Swiss round 2",
    "matches": [
      {
        "id": "cltz0982v0001g8mbadcd5678",
        "matchNumber": 1,
        "roundNumber": 2,
        "status": "PENDING",
        "scheduledTime": "2025-04-27T16:00:00.000Z",
        "stageId": "cltyg56k80000y8mwasdf1234",
        "alliances": [
          {
            "color": "RED",
            "teamAlliances": [
              {
                "teamId": "cltya12340001g8mb12345", // Top ranked team
                "stationPosition": 1,
                "team": { "name": "Robotic Eagles", "teamNumber": "1234" }
              },
              {
                "teamId": "cltya91230005g8mb90123", // Third ranked team
                "stationPosition": 2,
                "team": { "name": "Circuit Breakers", "teamNumber": "9123" }
              }
            ]
          },
          {
            "color": "BLUE",
            "teamAlliances": [
              {
                "teamId": "cltya34560002g8mb34567", // Second ranked team
                "stationPosition": 1,
                "team": { "name": "Binary Bolts", "teamNumber": "3456" }
              },
              {
                "teamId": "cltya01230006g8mb01234", // Fourth ranked team
                "stationPosition": 2,
                "team": { "name": "Gear Grinders", "teamNumber": "0123" }
              }
            ]
          }
        ]
      },
      // More matches...
    ]
  }
  ```
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/match-scheduler/generate-swiss-round \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{
      "stageId": "cltyg56k80000y8mwasdf1234",
      "currentRoundNumber": 1
    }'
  ```

#### Generate Playoff Tournament
- **Endpoint**: `POST /api/match-scheduler/generate-playoff`
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Body**: 
  ```json
  {
    "stageId": "string (UUID)",      // ID of the stage to create matches for
    "numberOfRounds": 3              // Number of rounds in the playoff tournament (for 8 teams)
  }
  ```
- **Response**: 
  ```json
  {
    "message": "Successfully generated playoff tournament with 3 rounds",
    "matches": [
      {
        "id": "cltz1092v0001g8mbcdcd5678",
        "matchNumber": 1,
        "roundNumber": 1,
        "status": "PENDING",
        "scheduledTime": "2025-04-27T16:30:00.000Z",
        "stageId": "cltyg67k80001y8mwasdf5678",
        "alliances": [
          {
            "color": "RED",
            "teamAlliances": [
              {
                "teamId": "cltya12340001g8mb12345", // #1 seed
                "stationPosition": 1,
                "team": { "name": "Robotic Eagles", "teamNumber": "1234" }
              }
            ]
          },
          {
            "color": "BLUE",
            "teamAlliances": [
              {
                "teamId": "cltya01230006g8mb01234", // #8 seed
                "stationPosition": 1,
                "team": { "name": "Gear Grinders", "teamNumber": "0123" }
              }
            ]
          }
        ]
      },
      // More matches for all rounds...
    ]
  }
  ```
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/match-scheduler/generate-playoff \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{
      "stageId": "cltyg67k80001y8mwasdf5678",
      "numberOfRounds": 3
    }'
  ```

#### Update Playoff Brackets
- **Endpoint**: `POST /api/match-scheduler/update-playoff-brackets/:matchId`
- **Parameters**: `matchId` - The ID of a completed match
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Response**: 
  ```json
  {
    "message": "Updated 2 playoff bracket matches",
    "matches": [
      {
        "id": "cltz1092v0001g8mbcdcd5678", // The completed match
        "matchNumber": 1,
        "roundNumber": 1,
        "status": "COMPLETED",
        "winningAlliance": "RED",
        "scheduledTime": "2025-04-27T16:30:00.000Z",
        "stageId": "cltyg67k80001y8mwasdf5678",
        "alliances": [
          {
            "color": "RED",
            "teamAlliances": [
              {
                "teamId": "cltya12340001g8mb12345",
                "stationPosition": 1,
                "team": { "name": "Robotic Eagles", "teamNumber": "1234" }
              }
            ]
          },
          {
            "color": "BLUE",
            "teamAlliances": [
              {
                "teamId": "cltya01230006g8mb01234",
                "stationPosition": 1,
                "team": { "name": "Gear Grinders", "teamNumber": "0123" }
              }
            ]
          }
        ]
      },
      {
        "id": "cltz1093v0002g8mbcdcd9012", // The next match updated with winners
        "matchNumber": 5,
        "roundNumber": 2,
        "status": "PENDING",
        "scheduledTime": "2025-04-27T17:30:00.000Z",
        "stageId": "cltyg67k80001y8mwasdf5678",
        "alliances": [
          {
            "color": "RED", // Winner advances as RED
            "teamAlliances": [
              {
                "teamId": "cltya12340001g8mb12345", // Winner of previous match
                "stationPosition": 1,
                "team": { "name": "Robotic Eagles", "teamNumber": "1234" }
              }
            ]
          },
          {
            "color": "BLUE",
            "teamAlliances": []  // Will be filled by another match winner
          }
        ]
      }
    ]
  }
  ```
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/match-scheduler/update-playoff-brackets/cltz1092v0001g8mbcdcd5678 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
  ```

#### Finalize Playoff Rankings
- **Endpoint**: `POST /api/match-scheduler/finalize-playoff-rankings/:stageId`
- **Parameters**: `stageId` - The ID of the playoff stage
- **Headers**:
  ``` 
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Response**: 
  ```json
  {
    "message": "Finalized rankings for 7 playoff matches",
    "matches": [
      // Array of all playoff matches with results and rankings
    ]
  }
  ```
- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/match-scheduler/finalize-playoff-rankings/cltyg67k80001y8mwasdf5678 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"
  ```

### Complete Match Scheduling Workflow Examples

#### Example 1: Qualification Round Generation

```javascript
// First, log in to get your JWT token
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
});

const { access_token } = await loginResponse.json();

// Create a new tournament
const tournamentResponse = await fetch('http://localhost:3000/api/tournaments', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    name: '2025 Regional Competition',
    description: 'Annual robotics competition',
    startDate: '2025-04-27T09:00:00.000Z',
    endDate: '2025-04-29T18:00:00.000Z',
    adminId: 'your-user-id'
  })
});

const tournament = await tournamentResponse.json();

// Create a qualification stage
const stageResponse = await fetch('http://localhost:3000/api/stages', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    name: 'Qualification Rounds',
    type: 'SWISS',
    startDate: '2025-04-27T10:00:00.000Z',
    endDate: '2025-04-28T16:00:00.000Z',
    tournamentId: tournament.id
  })
});

const stage = await stageResponse.json();

// Import teams
const teamsResponse = await fetch('http://localhost:3000/api/teams/import', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    content: 'Team Alpha,High School A\nTeam Beta,High School B\nTeam Gamma,High School C\nTeam Delta,High School D\nTeam Epsilon,High School E\nTeam Zeta,High School F\nTeam Eta,High School G\nTeam Theta,High School H',
    format: 'text',
    delimiter: ','
  })
});

// Generate qualification schedule
const scheduleResponse = await fetch('http://localhost:3000/api/match-scheduler/generate-frc-schedule', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    stageId: stage.id,
    rounds: 4,                // Each team plays 4 qualification matches
    teamsPerAlliance: 2,      // 2 teams per alliance (4 teams per match)
    minMatchSeparation: 1,    // At least 1 match between appearances
    qualityLevel: 'high'      // High quality scheduling (more optimization iterations)
  })
});

const schedule = await scheduleResponse.json();
console.log(`Generated ${schedule.matches.length} qualification matches`);
```

#### Example 2: Complete Tournament Workflow with Playoffs

```javascript
// Assuming qualification rounds are complete, check team rankings
const statsResponse = await fetch(`http://localhost:3000/api/teams?tournamentId=${tournament.id}`, {
  headers: { 'Authorization': `Bearer ${access_token}` }
});

const teams = await statsResponse.json();
console.log('Teams ranked by performance:', teams);

// Create a playoff stage
const playoffStageResponse = await fetch('http://localhost:3000/api/stages', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    name: 'Playoff Rounds',
    type: 'PLAYOFF',
    startDate: '2025-04-28T17:00:00.000Z',
    endDate: '2025-04-29T12:00:00.000Z',
    tournamentId: tournament.id
  })
});

const playoffStage = await playoffStageResponse.json();

// Generate playoff brackets (for 8 teams, we need 3 rounds: quarterfinals, semifinals, finals)
const playoffResponse = await fetch('http://localhost:3000/api/match-scheduler/generate-playoff', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    stageId: playoffStage.id,
    numberOfRounds: 3       // 8 teams = 3 rounds (2^3 teams)
  })
});

const playoffs = await playoffResponse.json();
console.log(`Generated ${playoffs.matches.length} playoff matches`);

// After a playoff match is completed and scored:
// 1. Update the match with scores (example for match ID cltz1092v0001g8mbcdcd5678)
const scoreResponse = await fetch('http://localhost:3000/api/match-scores', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    matchId: 'cltz1092v0001g8mbcdcd5678',
    redAutoScore: 20,
    redDriveScore: 30,
    blueAutoScore: 15,
    blueDriveScore: 25,
    redTeamCount: 2,
    blueTeamCount: 2
  })
});

// 2. Update playoff brackets to advance winners
const updateBracketsResponse = await fetch('http://localhost:3000/api/match-scheduler/update-playoff-brackets/cltz1092v0001g8mbcdcd5678', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
});

// After all playoff matches are completed, finalize the rankings
const finalizeResponse = await fetch(`http://localhost:3000/api/match-scheduler/finalize-playoff-rankings/${playoffStage.id}`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
});

const finalRankings = await finalizeResponse.json();
console.log('Tournament rankings finalized');
```

### Match Scheduler Algorithm Notes

The match scheduler implements several advanced algorithms tailored for robotics competitions:

1. **Qualification Scheduling (Simulated Annealing)**
   - Uses simulated annealing to optimize match schedules
   - Balances factors like:
     * Match separation (teams don't play consecutive matches)
     * Partner/opponent distribution (teams play with/against different teams)
     * Red/blue alliance balance (teams play on both alliances equally)
     * Station position balance (teams play at different starting positions)

2. **Swiss-Style Tournament**
   - Pairs teams based on their current performance (win/loss record)
   - Teams with similar records play against each other
   - Creates increasingly competitive matches as the tournament progresses

3. **Playoff Bracket Generation**
   - Creates standard elimination brackets based on seeding
   - Single-elimination format with automatic advancement
   - Handles bracket advancement and finals automatically

**Implementation Notes:**
- Each match has 2 alliances (Red and Blue)
- Each alliance has 2 teams (previously 3, now configured for 2)
- The scheduler automatically handles uneven team counts by creating "bye" matches