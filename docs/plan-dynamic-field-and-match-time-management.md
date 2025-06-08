# Plan: Dynamic Field and Match Time Management for Tournament Scheduling

## Overview
This document outlines the plan to implement dynamic field assignment and match time management in the Robotics Tournament Management System. The goal is to allow administrators to:
- Reassign matches to fields when the number of fields in a tournament changes.
- Safely update the scheduled time of matches, ensuring no conflicts.

---

## 1. Problem Statement
- **Field Change:** When the admin changes the number of fields in a tournament, existing matches may not be optimally or validly assigned to fields.
- **Time Change:** When the admin changes the scheduled time of a match, it may cause conflicts (e.g., two matches on the same field at the same time).

---

## 2. Goals
- Enable reassigning all matches to available fields in a balanced, conflict-free way when fields change.
- Enable updating the scheduled time of a match with conflict detection and resolution.
- Provide batch tools for rescheduling or shifting matches if needed.

---

## 3. Solution Design

### 3.1. Field Reassignment Logic
- Add a service method (e.g., `reassignFieldsForStage(stageId: string)`) that:
  - Fetches the current list of fields for the stage's tournament.
  - Fetches all matches for the stage, ordered by scheduled time.
  - Assigns each match to a field in round-robin fashion.
  - Updates each match's `fieldId` and `fieldNumber` in the database.
- Expose this as an admin action (API endpoint or UI button).

### 3.2. Match Time Update Logic
- Add a service method (e.g., `updateMatchTime(matchId: string, newTime: Date)`) that:
  - Checks if any other match is scheduled on the same field at the new time.
  - If a conflict exists, prevents the update and returns an error.
  - If no conflict, updates the match's `scheduledTime`.
- Optionally, provide a batch reschedule tool to shift all matches in a stage by a time delta.

### 3.3. Batch Reschedule (Optional)
- Add a method (e.g., `shiftStageMatches(stageId: string, minutesDelta: number)`) to shift all matches in a stage by a specified number of minutes, using the conflict-aware update logic.

---

## 4. Implementation Steps
1. **Design and implement the `reassignFieldsForStage` method in the scheduling service.**
2. **Design and implement the `updateMatchTime` method with conflict detection.**
3. (Optional) **Implement the `shiftStageMatches` batch reschedule method.**
4. **Add API endpoints and/or admin UI controls to trigger these actions.**
5. **Test thoroughly with various field and match scenarios.**
6. **Update documentation and communicate new admin capabilities.**

---

## 5. Example Code Snippets

### Field Reassignment
```typescript
async reassignFieldsForStage(stageId: string): Promise<void> {
  // ...fetch stage, fields, and matches...
  // ...assign matches to fields round-robin and update DB...
}
```

### Match Time Update
```typescript
async updateMatchTime(matchId: string, newTime: Date): Promise<void> {
  // ...check for conflicts and update scheduledTime if safe...
}
```

---

## 6. Risks & Considerations
- Ensure all updates are transactional to avoid partial updates.
- Communicate changes to teams and staff if match times or fields are updated.
- Consider UI/UX for admin actions and error handling.

---

## 7. Documentation & Communication
- Update API and admin UI documentation.
- Provide clear admin instructions for using new features.

---

## 8. Future Enhancements
- Allow for more advanced scheduling algorithms (e.g., minimize team downtime).
- Visualize field/match schedules for easier admin management.

---

**Author:** GitHub Copilot
**Date:** 2025-06-09
