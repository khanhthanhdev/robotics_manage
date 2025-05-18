-- CreateTable
CREATE TABLE "AllianceScoring" (
    "id" TEXT NOT NULL,
    "allianceId" TEXT NOT NULL,
    "refereeId" TEXT,
    "scoreDetails" JSONB,
    "card" "CardType" NOT NULL DEFAULT 'NONE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllianceScoring_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "AllianceScoring_allianceId_key" ON "AllianceScoring"("allianceId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchControl_matchId_key" ON "MatchControl"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "AudienceDisplay_matchControlId_key" ON "AudienceDisplay"("matchControlId");

-- AddForeignKey
ALTER TABLE "AllianceScoring" ADD CONSTRAINT "AllianceScoring_allianceId_fkey" FOREIGN KEY ("allianceId") REFERENCES "Alliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllianceScoring" ADD CONSTRAINT "AllianceScoring_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchControl" ADD CONSTRAINT "MatchControl_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTimer" ADD CONSTRAINT "MatchTimer_matchControlId_fkey" FOREIGN KEY ("matchControlId") REFERENCES "MatchControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchError" ADD CONSTRAINT "MatchError_matchControlId_fkey" FOREIGN KEY ("matchControlId") REFERENCES "MatchControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceDisplay" ADD CONSTRAINT "AudienceDisplay_matchControlId_fkey" FOREIGN KEY ("matchControlId") REFERENCES "MatchControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
