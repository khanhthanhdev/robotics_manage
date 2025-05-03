# Match Scheduler API Documentation

The Match Scheduler API provides endpoints for generating and managing match schedules for robotics competitions, including qualification rounds, Swiss-style tournaments, and playoff brackets.

## API Endpoints

### 1. Generate Swiss Round

Creates the next round of Swiss-style matches based on team rankings within a stage.

**Endpoint:** `POST /match-scheduler/generate-swiss-round`

**Authorization:** Admin role required

**Request Body:**
```json
{
  "stageId": "cltyg56k80000y8mwasdf1234",
  "currentRoundNumber": 2
}
```

**Response:**
```json
{
  "message": "Successfully generated Swiss round 3",
  "matches": [
    {
      "id": "cltz0982v0001g8mbadcd1234",
      "matchNumber": 1,
      "roundNumber": 3,
      "status": "PENDING",
      "scheduledTime": "2025-04-27T15:30:00.000Z",
      "alliances": [
        {
          "color": "RED",
          "teamAlliances": [
            {
              "teamId": "cltya12340001g8mb12345",
              "stationPosition": 1,
              "team": { "id": "cltya12340001g8mb12345", "name": "Robotic Eagles", "teamNumber": "1234" }
            },
            {
              "teamId": "cltya56780003g8mb67890",
              "stationPosition": 2,
              "team": { "id": "cltya56780003g8mb67890", "name": "Tech Tigers", "teamNumber": "5678" }
            },
            {
              "teamId": "cltya91230005g8mb90123",
              "stationPosition": 3,
              "team": { "id": "cltya91230005g8mb90123", "name": "Circuit Breakers", "teamNumber": "9123" }
            }
          ]
        },
        {
          "color": "BLUE",
          "teamAlliances": [
            {
              "teamId": "cltya34560002g8mb34567",
              "stationPosition": 1,
              "team": { "id": "cltya34560002g8mb34567", "name": "Binary Bolts", "teamNumber": "3456" }
            },
            {
              "teamId": "cltya78900004g8mb78901",
              "stationPosition": 2,
              "team": { "id": "cltya78900004g8mb78901", "name": "Quantum Mechanics", "teamNumber": "7890" }
            },
            {
              "teamId": "cltya01230006g8mb01234",
              "stationPosition": 3,
              "team": { "id": "cltya01230006g8mb01234", "name": "Gear Grinders", "teamNumber": "0123" }
            }
          ]
        }
      ]
    },
    // More matches...
  ]
}
```

### 2. Generate Playoff Schedule

Creates an elimination tournament bracket structure with the specified number of rounds.

**Endpoint:** `POST /match-scheduler/generate-playoff`

**Authorization:** Admin role required

**Request Body:**
```json
{
  "stageId": "cltyg67k80001y8mwasdf5678",
  "numberOfRounds": 3
}
```

**Response:**
```json
{
  "message": "Successfully generated playoff tournament with 3 rounds",
  "matches": [
    {
      "id": "cltz1092v0001g8mbcdcd5678",
      "matchNumber": 1,
      "roundNumber": 1,
      "status": "PENDING",
      "scheduledTime": "2025-04-27T16:00:00.000Z",
      "alliances": [
        {
          "color": "RED",
          "teamAlliances": [
            {
              "teamId": "cltya12340001g8mb12345",
              "stationPosition": 1,
              "team": { "id": "cltya12340001g8mb12345", "name": "Robotic Eagles", "teamNumber": "1234" }
            }
          ]
        },
        {
          "color": "BLUE",
          "teamAlliances": [
            {
              "teamId": "cltya01230006g8mb01234",
              "stationPosition": 1,
              "team": { "id": "cltya01230006g8mb01234", "name": "Gear Grinders", "teamNumber": "0123" }
            }
          ]
        }
      ]
    },
    // More matches...
  ]
}
```

### 3. Update Playoff Brackets

Advances winners to the next match in the bracket after a match is completed.

**Endpoint:** `POST /match-scheduler/update-playoff-brackets/:matchId`

**Authorization:** Admin role required

**URL Parameters:**
- `matchId`: ID of the completed match

**Response:**
```json
{
  "message": "Updated 2 playoff bracket matches",
  "matches": [
    {
      "id": "cltz1092v0001g8mbcdcd5678",
      "matchNumber": 1,
      "roundNumber": 1,
      "status": "COMPLETED",
      "winningAlliance": "RED",
      "alliances": [
        {
          "color": "RED",
          "teamAlliances": [
            {
              "teamId": "cltya12340001g8mb12345",
              "stationPosition": 1,
              "team": { "id": "cltya12340001g8mb12345", "name": "Robotic Eagles", "teamNumber": "1234" }
            }
          ]
        },
        {
          "color": "BLUE",
          "teamAlliances": [
            {
              "teamId": "cltya01230006g8mb01234",
              "stationPosition": 1,
              "team": { "id": "cltya01230006g8mb01234", "name": "Gear Grinders", "teamNumber": "0123" }
            }
          ]
        }
      ]
    },
    {
      "id": "cltz1093v0002g8mbcdcd9012",
      "matchNumber": 5,
      "roundNumber": 2,
      "status": "PENDING",
      "alliances": [
        {
          "color": "RED",
          "teamAlliances": [
            {
              "teamId": "cltya12340001g8mb12345",
              "stationPosition": 1,
              "team": { "id": "cltya12340001g8mb12345", "name": "Robotic Eagles", "teamNumber": "1234" }
            }
          ]
        },
        {
          "color": "BLUE",
          "teamAlliances": []
        }
      ]
    }
  ]
}
```

### 4. Finalize Playoff Rankings

Updates team statistics and rankings after all playoff matches are completed.

**Endpoint:** `POST /match-scheduler/finalize-playoff-rankings/:stageId`

**Authorization:** Admin role required

**URL Parameters:**
- `stageId`: ID of the playoff stage

**Response:**
```json
{
  "message": "Finalized rankings for 7 playoff matches",
  "matches": [
    // List of all playoff matches with results
  ]
}
```

## Usage Examples

### Example 1: Complete Tournament Workflow

1. Create a qualification stage and generate matches:
   ```javascript
   // First create a tournament and stage in your application
   
   // Then generate qualification schedule with simulated annealing
   const schedulerService = new MatchSchedulerService(prisma);
   const qualificationMatches = await schedulerService.generateSchedule(24, 8, 2);
   
   // Save these matches to the database
   // ...
   ```

2. After qualification rounds are completed, create a Swiss-style stage:
   ```javascript
   // Create a new stage with type SWISS in your database
   
   // Generate first Swiss round
   fetch('/api/match-scheduler/generate-swiss-round', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer YOUR_TOKEN'
     },
     body: JSON.stringify({
       stageId: "cltyg56k80000y8mwasdf1234",
       currentRoundNumber: 0
     })
   })
   .then(response => response.json())
   .then(data => console.log(data));
   ```

3. Generate playoff brackets for final elimination rounds:
   ```javascript
   // Create a new stage with type PLAYOFF in your database
   
   fetch('/api/match-scheduler/generate-playoff', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer YOUR_TOKEN'
     },
     body: JSON.stringify({
       stageId: "cltyg67k80001y8mwasdf5678",
       numberOfRounds: 3  // For 8 teams (2^3)
     })
   })
   .then(response => response.json())
   .then(data => console.log(data));
   ```

4. After each playoff match is completed and scored:
   ```javascript
   // First update match with scores and set winning alliance
   // ...
   
   // Then update playoff brackets
   fetch('/api/match-scheduler/update-playoff-brackets/cltz1092v0001g8mbcdcd5678', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer YOUR_TOKEN'
     }
   })
   .then(response => response.json())
   .then(data => console.log(data));
   ```

5. Finally, when the tournament is complete:
   ```javascript
   fetch('/api/match-scheduler/finalize-playoff-rankings/cltyg67k80001y8mwasdf5678', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer YOUR_TOKEN'
     }
   })
   .then(response => response.json())
   .then(data => console.log(data));
   ```

### Example 2: Using cURL for API Testing

1. Generate Swiss Round:
   ```bash
   curl -X POST http://localhost:3000/match-scheduler/generate-swiss-round \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"stageId": "cltyg56k80000y8mwasdf1234", "currentRoundNumber": 2}'
   ```

2. Generate Playoff Schedule:
   ```bash
   curl -X POST http://localhost:3000/match-scheduler/generate-playoff \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"stageId": "cltyg67k80001y8mwasdf5678", "numberOfRounds": 3}'
   ```

3. Update Playoff Brackets:
   ```bash
   curl -X POST http://localhost:3000/match-scheduler/update-playoff-brackets/cltz1092v0001g8mbcdcd5678 \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

4. Finalize Playoff Rankings:
   ```bash
   curl -X POST http://localhost:3000/match-scheduler/finalize-playoff-rankings/cltyg67k80001y8mwasdf5678 \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## Notes on Algorithm Implementation

The match scheduler implements several advanced algorithms:

1. **Simulated Annealing** for qualification rounds:
   - Optimizes for round uniformity (teams play once per round)
   - Maintains minimum match separation
   - Minimizes partner/opponent duplication
   - Balances red/blue alliance and station position appearances

2. **Swiss-Style Pairing** for intermediate rounds:
   - Ranks teams based on performance (wins and scores)
   - Pairs teams with similar rankings
   - Creates competitive matches

3. **Elimination Bracket Generation** for playoffs:
   - Creates tournament-style elimination brackets
   - Properly seeds teams based on performance
   - Handles winner advancement through the bracket
   - Updates team statistics and rankings

For more information on the internal algorithm implementation, see the `MatchSchedulerService` class in the codebase.