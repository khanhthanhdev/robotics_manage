/*
  Warnings:

  - You are about to drop the `AllianceScoring` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AudienceDisplay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchControl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchError` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchTimer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AllianceScoring" DROP CONSTRAINT "AllianceScoring_allianceId_fkey";

-- DropForeignKey
ALTER TABLE "AllianceScoring" DROP CONSTRAINT "AllianceScoring_refereeId_fkey";

-- DropForeignKey
ALTER TABLE "AudienceDisplay" DROP CONSTRAINT "AudienceDisplay_matchControlId_fkey";

-- DropForeignKey
ALTER TABLE "MatchControl" DROP CONSTRAINT "MatchControl_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchError" DROP CONSTRAINT "MatchError_matchControlId_fkey";

-- DropForeignKey
ALTER TABLE "MatchTimer" DROP CONSTRAINT "MatchTimer_matchControlId_fkey";

-- DropTable
DROP TABLE "AllianceScoring";

-- DropTable
DROP TABLE "AudienceDisplay";

-- DropTable
DROP TABLE "MatchControl";

-- DropTable
DROP TABLE "MatchError";

-- DropTable
DROP TABLE "MatchTimer";
