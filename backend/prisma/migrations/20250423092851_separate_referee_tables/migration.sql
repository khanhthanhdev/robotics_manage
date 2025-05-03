/*
  Warnings:

  - The values [HEAD_REFEREE,ALLIANCE_REFEREE] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RefereeType" AS ENUM ('HEAD_REFEREE', 'ALLIANCE_REFEREE');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'COMMON');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "DateOfBirth" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gender" BOOLEAN,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "HeadReferee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "HeadReferee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllianceReferee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "AllianceReferee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeadRefereeMatch" (
    "id" TEXT NOT NULL,
    "headRefereeId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeadRefereeMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllianceRefereeMatch" (
    "id" TEXT NOT NULL,
    "allianceRefereeId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "allianceColor" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllianceRefereeMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeadReferee_email_key" ON "HeadReferee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AllianceReferee_email_key" ON "AllianceReferee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HeadRefereeMatch_headRefereeId_matchId_key" ON "HeadRefereeMatch"("headRefereeId", "matchId");

-- CreateIndex
CREATE UNIQUE INDEX "AllianceRefereeMatch_allianceRefereeId_matchId_allianceColo_key" ON "AllianceRefereeMatch"("allianceRefereeId", "matchId", "allianceColor");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "HeadReferee" ADD CONSTRAINT "HeadReferee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllianceReferee" ADD CONSTRAINT "AllianceReferee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadRefereeMatch" ADD CONSTRAINT "HeadRefereeMatch_headRefereeId_fkey" FOREIGN KEY ("headRefereeId") REFERENCES "HeadReferee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadRefereeMatch" ADD CONSTRAINT "HeadRefereeMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllianceRefereeMatch" ADD CONSTRAINT "AllianceRefereeMatch_allianceRefereeId_fkey" FOREIGN KEY ("allianceRefereeId") REFERENCES "AllianceReferee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllianceRefereeMatch" ADD CONSTRAINT "AllianceRefereeMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
