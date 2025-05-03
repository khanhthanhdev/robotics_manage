# Match Scores API Documentation

The Match Scores API provides endpoints for recording, retrieving, and managing match scores for robotics competitions. The system supports automated scoring calculation, winner determination, and tournament statistics tracking.

## API Endpoints

### 1. Create Match Scores

Records scores for a completed match, calculates final scores with team count multipliers, determines the winning alliance, and updates team statistics.

**Endpoint:** `POST /match-scores`

**Authorization:** Admin or Referee role required

**Request Body:**
```json
{
  "matchId": "cltz0982v0001g8mbadcd1234",
  "redAutoScore": 45,
  "redDriveScore": 65,
  "redTeamCount": 3,
  "redMultiplier": 1.75,
  "blueAutoScore": 40,
  "blueDriveScore": 60,
  "blueTeamCount": 3,
  "blueMultiplier": 1.75,
  "redGameElements": {
    "highGoal": 4,
    "midGoal": 5,
    "lowGoal": 2
  },
  "blueGameElements": {
    "highGoal": 3,
    "midGoal": 4,
    "lowGoal": 3
  },
  "scoreDetails": {
    "penalties": {
      "red": 0,
      "blue": 5
    },
    "specialScoring": {
      "endgameClimb": {
        "red": 15,
        "blue": 10
      }
    }
  }
}
```

**Response:**
```json
{
  "id": "cltzab82v0001g8mbadef5678",
  "matchId": "cltz0982v0001g8mbadcd1234",
  "redAutoScore": 45,
  "redDriveScore": 65,
  "redTotalScore": 193,
  "redTeamCount": 3,
  "redMultiplier": 1.75,
  "blueAutoScore": 40,
  "blueDriveScore": 60,
  "blueTotalScore": 175,
  "blueTeamCount": 3,
  "blueMultiplier": 1.75,
  "redGameElements": {
    "highGoal": 4,
    "midGoal": 5,
    "lowGoal": 2
  },
  "blueGameElements": {
    "highGoal": 3,
    "midGoal": 4,
    "lowGoal": 3
  },
  "scoreDetails": {
    "penalties": {
      "red": 0,
      "blue": 5
    },
    "specialScoring": {
      "endgameClimb": {
        "red": 15,
        "blue": 10
      }
    }
  },
  "createdAt": "2025-04-27T15:45:23.456Z",
  "updatedAt": "2025-04-27T15:45:23.456Z"
}
```

### 2. Get All Match Scores

Retrieves all match scores in the system.

**Endpoint:** `GET /match-scores`

**Authorization:** Public

**Response:**
```json
[
  {
    "id": "cltzab82v0001g8mbadef5678",
    "matchId": "cltz0982v0001g8mbadcd1234",
    "redAutoScore": 45,
    "redDriveScore": 65,
    "redTotalScore": 193,
    "redTeamCount": 3,
    "redMultiplier": 1.75,
    "blueAutoScore": 40,
    "blueDriveScore": 60,
    "blueTotalScore": 175,
    "blueTeamCount": 3,
    "blueMultiplier": 1.75,
    "redGameElements": {
      "highGoal": 4,
      "midGoal": 5,
      "lowGoal": 2
    },
    "blueGameElements": {
      "highGoal": 3,
      "midGoal": 4,
      "lowGoal": 3
    },
    "scoreDetails": {
      "penalties": {
        "red": 0,
        "blue": 5
      },
      "specialScoring": {
        "endgameClimb": {
          "red": 15,
          "blue": 10
        }
      }
    },
    "match": {
      "id": "cltz0982v0001g8mbadcd1234",
      "matchNumber": 12,
      "status": "COMPLETED",
      "stage": {
        "name": "Qualification Rounds",
        "tournament": {
          "name": "Regional Championship 2025"
        }
      }
    },
    "createdAt": "2025-04-27T15:45:23.456Z",
    "updatedAt": "2025-04-27T15:45:23.456Z"
  },
  // More match scores...
]
```

### 3. Get Match Scores by ID

Retrieves a specific match score by its ID.

**Endpoint:** `GET /match-scores/:id`

**Authorization:** Public

**URL Parameters:**
- `id`: ID of the match scores to retrieve

**Response:**
```json
{
  "id": "cltzab82v0001g8mbadef5678",
  "matchId": "cltz0982v0001g8mbadcd1234",
  "redAutoScore": 45,
  "redDriveScore": 65,
  "redTotalScore": 193,
  "redTeamCount": 3,
  "redMultiplier": 1.75,
  "blueAutoScore": 40,
  "blueDriveScore": 60,
  "blueTotalScore": 175,
  "blueTeamCount": 3,
  "blueMultiplier": 1.75,
  "redGameElements": {
    "highGoal": 4,
    "midGoal": 5,
    "lowGoal": 2
  },
  "blueGameElements": {
    "highGoal": 3,
    "midGoal": 4,
    "lowGoal": 3
  },
  "scoreDetails": {
    "penalties": {
      "red": 0,
      "blue": 5
    },
    "specialScoring": {
      "endgameClimb": {
        "red": 15,
        "blue": 10
      }
    }
  },
  "match": {
    "id": "cltz0982v0001g8mbadcd1234",
    "matchNumber": 12,
    "status": "COMPLETED",
    "alliances": [
      {
        "color": "RED",
        "teamAlliances": [
          {
            "teamId": "cltya12340001g8mb12345",
            "stationPosition": 1,
            "team": {
              "id": "cltya12340001g8mb12345",
              "name": "Robotic Eagles",
              "teamNumber": "1234"
            }
          },
          // More teams...
        ]
      },
      {
        "color": "BLUE",
        "teamAlliances": [
          // Teams...
        ]
      }
    ]
  },
  "createdAt": "2025-04-27T15:45:23.456Z",
  "updatedAt": "2025-04-27T15:45:23.456Z"
}
```

### 4. Get Match Scores by Match ID

Retrieves the scores for a specific match.

**Endpoint:** `GET /match-scores/match/:matchId`

**Authorization:** Public

**URL Parameters:**
- `matchId`: ID of the match to retrieve scores for

**Response:**
Same as the "Get Match Scores by ID" endpoint.

### 5. Update Match Scores

Updates an existing match score, recalculates totals, and updates team statistics.

**Endpoint:** `PATCH /match-scores/:id`

**Authorization:** Admin or Referee role required

**URL Parameters:**
- `id`: ID of the match scores to update

**Request Body:**
```json
{
  "redAutoScore": 50,
  "redDriveScore": 70,
  "redGameElements": {
    "highGoal": 5,
    "midGoal": 5,
    "lowGoal": 2
  },
  "scoreDetails": {
    "penalties": {
      "red": 0,
      "blue": 10
    }
  }
}
```

**Response:**
```json
{
  "id": "cltzab82v0001g8mbadef5678",
  "matchId": "cltz0982v0001g8mbadcd1234",
  "redAutoScore": 50,
  "redDriveScore": 70,
  "redTotalScore": 210,
  "redTeamCount": 3,
  "redMultiplier": 1.75,
  "blueAutoScore": 40,
  "blueDriveScore": 60,
  "blueTotalScore": 175,
  "blueTeamCount": 3,
  "blueMultiplier": 1.75,
  "redGameElements": {
    "highGoal": 5,
    "midGoal": 5,
    "lowGoal": 2
  },
  "blueGameElements": {
    "highGoal": 3,
    "midGoal": 4,
    "lowGoal": 3
  },
  "scoreDetails": {
    "penalties": {
      "red": 0,
      "blue": 10
    },
    "specialScoring": {
      "endgameClimb": {
        "red": 15,
        "blue": 10
      }
    }
  },
  "updatedAt": "2025-04-27T16:12:45.789Z"
}
```

### 6. Delete Match Scores

Deletes a match score record. Note that this will not update team statistics.

**Endpoint:** `DELETE /match-scores/:id`

**Authorization:** Admin role required

**URL Parameters:**
- `id`: ID of the match scores to delete

**Response:**
```json
{
  "id": "cltzab82v0001g8mbadef5678",
  "matchId": "cltz0982v0001g8mbadcd1234",
  "redAutoScore": 50,
  "redDriveScore": 70,
  "redTotalScore": 210,
  "blueTotalScore": 175,
  "deletedAt": "2025-04-27T16:30:12.345Z"
}
```

## Team Count Multipliers

The scoring system includes team count multipliers to ensure fairness when alliances have different numbers of teams (e.g., if a team is absent). Multipliers are applied as follows:

| Team Count | Multiplier |
|------------|------------|
| 1          | 1.25       |
| 2          | 1.5        |
| 3          | 1.75       |
| 4          | 2.0        |
| Other      | 1.0        |

## Score Calculation

Total scores are calculated using the following formula:

```
TotalScore = Round((AutoScore + DriveScore) * Multiplier)
```

## Team Statistics

When match scores are recorded or updated, team statistics are automatically calculated and updated. The system tracks:

- Wins
- Losses
- Ties
- Total matches played
- Association with tournament and stage

## Usage Examples

### Example 1: Recording Match Scores in a Frontend Application

```javascript
// After a match is completed, record the scores
async function submitMatchScores() {
  const scoreData = {
    matchId: "cltz0982v0001g8mbadcd1234",
    redAutoScore: parseInt(document.getElementById('redAuto').value),
    redDriveScore: parseInt(document.getElementById('redDrive').value),
    redTeamCount: parseInt(document.getElementById('redTeamCount').value),
    blueAutoScore: parseInt(document.getElementById('blueAuto').value),
    blueDriveScore: parseInt(document.getElementById('blueDrive').value),
    blueTeamCount: parseInt(document.getElementById('blueTeamCount').value),
    redGameElements: {
      highGoal: parseInt(document.getElementById('redHigh').value),
      midGoal: parseInt(document.getElementById('redMid').value),
      lowGoal: parseInt(document.getElementById('redLow').value)
    },
    blueGameElements: {
      highGoal: parseInt(document.getElementById('blueHigh').value),
      midGoal: parseInt(document.getElementById('blueMid').value),
      lowGoal: parseInt(document.getElementById('blueLow').value)
    },
    scoreDetails: {
      penalties: {
        red: parseInt(document.getElementById('redPenalties').value),
        blue: parseInt(document.getElementById('bluePenalties').value)
      }
    }
  };

  try {
    const response = await fetch('/api/match-scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(scoreData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit scores');
    }

    const result = await response.json();
    console.log('Match scores recorded:', result);
    
    // Update UI to show the winning alliance
    const winningAlliance = result.redTotalScore > result.blueTotalScore ? 'RED' :
      result.blueTotalScore > result.redTotalScore ? 'BLUE' : 'TIE';
    document.getElementById('matchResult').textContent = `Winner: ${winningAlliance}`;
    
    // Redirect to match list
    window.location.href = '/matches';
  } catch (error) {
    console.error('Error submitting scores:', error);
    document.getElementById('errorMessage').textContent = error.message;
  }
}
```

### Example 2: Using cURL for API Testing

1. Create Match Scores:
   ```bash
   curl -X POST http://localhost:3000/match-scores \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "matchId": "cltz0982v0001g8mbadcd1234",
       "redAutoScore": 45,
       "redDriveScore": 65,
       "redTeamCount": 3,
       "blueAutoScore": 40,
       "blueDriveScore": 60,
       "blueTeamCount": 3,
       "redGameElements": {
         "highGoal": 4,
         "midGoal": 5,
         "lowGoal": 2
       },
       "blueGameElements": {
         "highGoal": 3,
         "midGoal": 4,
         "lowGoal": 3
       }
     }'
   ```

2. Get All Match Scores:
   ```bash
   curl -X GET http://localhost:3000/match-scores
   ```

3. Get Match Scores by ID:
   ```bash
   curl -X GET http://localhost:3000/match-scores/cltzab82v0001g8mbadef5678
   ```

4. Get Match Scores by Match ID:
   ```bash
   curl -X GET http://localhost:3000/match-scores/match/cltz0982v0001g8mbadcd1234
   ```

5. Update Match Scores:
   ```bash
   curl -X PATCH http://localhost:3000/match-scores/cltzab82v0001g8mbadef5678 \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "redAutoScore": 50,
       "redDriveScore": 70,
       "redGameElements": {
         "highGoal": 5,
         "midGoal": 5,
         "lowGoal": 2
       }
     }'
   ```

6. Delete Match Scores:
   ```bash
   curl -X DELETE http://localhost:3000/match-scores/cltzab82v0001g8mbadef5678 \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

### Example 3: Displaying Match Results

```javascript
// Fetch and display match results for a tournament
async function loadTournamentResults(tournamentId) {
  try {
    // Get all matches for the tournament
    const matchesResponse = await fetch(`/api/tournaments/${tournamentId}/matches`);
    const matches = await matchesResponse.json();
    
    // Get scores for all completed matches
    const completedMatches = matches.filter(match => match.status === 'COMPLETED');
    const matchResults = await Promise.all(
      completedMatches.map(async match => {
        try {
          const scoreResponse = await fetch(`/api/match-scores/match/${match.id}`);
          const scoreData = await scoreResponse.json();
          
          return {
            matchNumber: match.matchNumber,
            round: match.roundNumber,
            stageName: match.stage.name,
            redTeams: match.alliances.find(a => a.color === 'RED').teamAlliances.map(ta => ta.team.teamNumber).join(', '),
            blueTeams: match.alliances.find(a => a.color === 'BLUE').teamAlliances.map(ta => ta.team.teamNumber).join(', '),
            redScore: scoreData.redTotalScore,
            blueScore: scoreData.blueTotalScore,
            winner: scoreData.redTotalScore > scoreData.blueTotalScore ? 'RED' : 
                   scoreData.blueTotalScore > scoreData.redTotalScore ? 'BLUE' : 'TIE'
          };
        } catch (err) {
          console.error(`Error fetching scores for match ${match.id}:`, err);
          return null;
        }
      })
    );
    
    // Filter out any null results from errors
    const validResults = matchResults.filter(result => result !== null);
    
    // Display the results in a table
    const tableBody = document.getElementById('resultsTable');
    tableBody.innerHTML = '';
    
    validResults.forEach(result => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.matchNumber}</td>
        <td>${result.round}</td>
        <td>${result.stageName}</td>
        <td>${result.redTeams}</td>
        <td>${result.blueTeams}</td>
        <td>${result.redScore}</td>
        <td>${result.blueScore}</td>
        <td class="${result.winner.toLowerCase()}-winner">${result.winner}</td>
      `;
      tableBody.appendChild(row);
    });
    
  } catch (error) {
    console.error('Error loading tournament results:', error);
    document.getElementById('errorMessage').textContent = 'Failed to load tournament results';
  }
}
```

## Tournament Statistics Integration

The Match Scores API automatically updates team statistics for the tournament when scores are recorded or updated. This enables real-time rankings and team performance tracking.

Key statistics features:

1. **Automatic Win/Loss/Tie Tracking**: Each team's record is updated when match scores are recorded.

2. **Tournament Context**: Statistics are associated with the specific tournament and can be viewed in context.

3. **Support for Different Match Types**: The system handles qualification, Swiss-style, and playoff matches.

4. **Recalculation on Updates**: If scores are modified, team statistics are automatically recalculated.

See the Teams API and Tournament API documentation for information on how to retrieve team statistics and rankings.