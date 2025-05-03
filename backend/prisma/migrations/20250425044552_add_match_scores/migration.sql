/*
  Warnings:

  - You are about to drop the column `blueMinusScore` on the `MatchScores` table. All the data in the column will be lost.
  - You are about to drop the column `blueMultiplyScore` on the `MatchScores` table. All the data in the column will be lost.
  - You are about to drop the column `bluePlusScore` on the `MatchScores` table. All the data in the column will be lost.
  - You are about to drop the column `redMinusScore` on the `MatchScores` table. All the data in the column will be lost.
  - You are about to drop the column `redMultiplyScore` on the `MatchScores` table. All the data in the column will be lost.
  - You are about to drop the column `redPlusScore` on the `MatchScores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchScores" DROP COLUMN "blueMinusScore",
DROP COLUMN "blueMultiplyScore",
DROP COLUMN "bluePlusScore",
DROP COLUMN "redMinusScore",
DROP COLUMN "redMultiplyScore",
DROP COLUMN "redPlusScore",
ADD COLUMN     "blueGameElements" JSONB,
ADD COLUMN     "redGameElements" JSONB;
