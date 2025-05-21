-- CreateTable
CREATE TABLE "ScoreConfig" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScoreConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreElement" (
    "id" TEXT NOT NULL,
    "scoreConfigId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "pointsPerUnit" INTEGER NOT NULL,
    "maxUnits" INTEGER,
    "category" TEXT,
    "elementType" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "icon" TEXT,
    "color" TEXT,

    CONSTRAINT "ScoreElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusCondition" (
    "id" TEXT NOT NULL,
    "scoreConfigId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "bonusPoints" INTEGER NOT NULL,
    "condition" JSONB NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "BonusCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenaltyCondition" (
    "id" TEXT NOT NULL,
    "scoreConfigId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "penaltyPoints" INTEGER NOT NULL,
    "condition" JSONB NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "PenaltyCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchScore" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "allianceId" TEXT NOT NULL,
    "scoreConfigId" TEXT NOT NULL,
    "elementScores" JSONB NOT NULL,
    "bonusesEarned" TEXT[],
    "penaltiesIncurred" TEXT[],
    "calculationLog" JSONB,
    "totalScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScoreElement_scoreConfigId_code_key" ON "ScoreElement"("scoreConfigId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "BonusCondition_scoreConfigId_code_key" ON "BonusCondition"("scoreConfigId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PenaltyCondition_scoreConfigId_code_key" ON "PenaltyCondition"("scoreConfigId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "MatchScore_matchId_allianceId_key" ON "MatchScore"("matchId", "allianceId");

-- AddForeignKey
ALTER TABLE "ScoreConfig" ADD CONSTRAINT "ScoreConfig_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreElement" ADD CONSTRAINT "ScoreElement_scoreConfigId_fkey" FOREIGN KEY ("scoreConfigId") REFERENCES "ScoreConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusCondition" ADD CONSTRAINT "BonusCondition_scoreConfigId_fkey" FOREIGN KEY ("scoreConfigId") REFERENCES "ScoreConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenaltyCondition" ADD CONSTRAINT "PenaltyCondition_scoreConfigId_fkey" FOREIGN KEY ("scoreConfigId") REFERENCES "ScoreConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchScore" ADD CONSTRAINT "MatchScore_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchScore" ADD CONSTRAINT "MatchScore_allianceId_fkey" FOREIGN KEY ("allianceId") REFERENCES "Alliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchScore" ADD CONSTRAINT "MatchScore_scoreConfigId_fkey" FOREIGN KEY ("scoreConfigId") REFERENCES "ScoreConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
