-- CreateTable
CREATE TABLE "MatchScores" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "redAutoScore" INTEGER NOT NULL DEFAULT 0,
    "redDriveScore" INTEGER NOT NULL DEFAULT 0,
    "redTotalScore" INTEGER NOT NULL DEFAULT 0,
    "blueAutoScore" INTEGER NOT NULL DEFAULT 0,
    "blueDriveScore" INTEGER NOT NULL DEFAULT 0,
    "blueTotalScore" INTEGER NOT NULL DEFAULT 0,
    "redPlusScore" INTEGER NOT NULL DEFAULT 0,
    "redMinusScore" INTEGER NOT NULL DEFAULT 0,
    "redMultiplyScore" INTEGER NOT NULL DEFAULT 0,
    "bluePlusScore" INTEGER NOT NULL DEFAULT 0,
    "blueMinusScore" INTEGER NOT NULL DEFAULT 0,
    "blueMultiplyScore" INTEGER NOT NULL DEFAULT 0,
    "redTeamCount" INTEGER NOT NULL DEFAULT 0,
    "redMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "blueTeamCount" INTEGER NOT NULL DEFAULT 0,
    "blueMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "scoreDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchScores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchScores_matchId_key" ON "MatchScores"("matchId");

-- AddForeignKey
ALTER TABLE "MatchScores" ADD CONSTRAINT "MatchScores_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
