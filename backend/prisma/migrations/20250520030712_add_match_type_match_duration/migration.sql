-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('FULL', 'TELEOP_ENDGAME');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "matchDuration" INTEGER,
ADD COLUMN     "matchType" "MatchType" NOT NULL DEFAULT 'FULL';
