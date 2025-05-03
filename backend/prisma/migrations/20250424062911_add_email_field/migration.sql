/*
  Warnings:

  - You are about to drop the `AllianceReferee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AllianceRefereeMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HeadReferee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HeadRefereeMatch` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'HEAD_REFEREE';
ALTER TYPE "UserRole" ADD VALUE 'ALLIANCE_REFEREE';

-- DropForeignKey
ALTER TABLE "AllianceReferee" DROP CONSTRAINT "AllianceReferee_createdById_fkey";

-- DropForeignKey
ALTER TABLE "AllianceRefereeMatch" DROP CONSTRAINT "AllianceRefereeMatch_allianceRefereeId_fkey";

-- DropForeignKey
ALTER TABLE "AllianceRefereeMatch" DROP CONSTRAINT "AllianceRefereeMatch_matchId_fkey";

-- DropForeignKey
ALTER TABLE "HeadReferee" DROP CONSTRAINT "HeadReferee_createdById_fkey";

-- DropForeignKey
ALTER TABLE "HeadRefereeMatch" DROP CONSTRAINT "HeadRefereeMatch_headRefereeId_fkey";

-- DropForeignKey
ALTER TABLE "HeadRefereeMatch" DROP CONSTRAINT "HeadRefereeMatch_matchId_fkey";

-- DropTable
DROP TABLE "AllianceReferee";

-- DropTable
DROP TABLE "AllianceRefereeMatch";

-- DropTable
DROP TABLE "HeadReferee";

-- DropTable
DROP TABLE "HeadRefereeMatch";

-- DropEnum
DROP TYPE "RefereeType";
