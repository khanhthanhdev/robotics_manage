-- CreateEnum
CREATE TYPE "MatchState" AS ENUM ('SCHEDULED', 'READY', 'RUNNING', 'PAUSED', 'COMPLETED', 'CANCELLED', 'ERROR');

-- CreateEnum
CREATE TYPE "ErrorSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ErrorStatus" AS ENUM ('OPEN', 'ACKNOWLEDGED', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "DisplayState" AS ENUM ('STANDBY', 'STARTING_SOON', 'LIVE', 'MATCH_RESULTS', 'FINISHED', 'CANCELLED', 'ERROR', 'CUSTOM_MESSAGE');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "fieldId" TEXT,
ADD COLUMN     "roundType" TEXT,
ADD COLUMN     "scheduleId" TEXT;

-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "teamsPerAlliance" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "teamsPerMatch" INTEGER NOT NULL DEFAULT 4;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "algorithm" TEXT,
    "quality" TEXT,
    "params" JSONB,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "tournamentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchControl" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "currentState" "MatchState" NOT NULL DEFAULT 'SCHEDULED',
    "stateHistory" JSONB,
    "controlledBy" TEXT,
    "lockToken" TEXT,
    "lockTimestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTimer" (
    "id" TEXT NOT NULL,
    "matchControlId" TEXT NOT NULL,
    "timerType" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchTimer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchError" (
    "id" TEXT NOT NULL,
    "matchControlId" TEXT NOT NULL,
    "errorType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" "ErrorSeverity" NOT NULL DEFAULT 'MEDIUM',
    "status" "ErrorStatus" NOT NULL DEFAULT 'OPEN',
    "reportedBy" TEXT NOT NULL,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "affectedAlliance" TEXT,
    "affectedTeamId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudienceDisplay" (
    "id" TEXT NOT NULL,
    "matchControlId" TEXT NOT NULL,
    "currentState" "DisplayState" NOT NULL DEFAULT 'STANDBY',
    "customMessage" TEXT,
    "customData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudienceDisplay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchControl_matchId_key" ON "MatchControl"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "AudienceDisplay_matchControlId_key" ON "AudienceDisplay"("matchControlId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchControl" ADD CONSTRAINT "MatchControl_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTimer" ADD CONSTRAINT "MatchTimer_matchControlId_fkey" FOREIGN KEY ("matchControlId") REFERENCES "MatchControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchError" ADD CONSTRAINT "MatchError_matchControlId_fkey" FOREIGN KEY ("matchControlId") REFERENCES "MatchControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceDisplay" ADD CONSTRAINT "AudienceDisplay_matchControlId_fkey" FOREIGN KEY ("matchControlId") REFERENCES "MatchControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
