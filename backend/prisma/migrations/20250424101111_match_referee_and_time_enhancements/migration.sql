-- CreateEnum
CREATE TYPE "RefereeRole" AS ENUM ('HEAD_REFEREE', 'ALLIANCE_REFEREE');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "scheduledTime" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "MatchReferee" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "RefereeRole" NOT NULL,
    "position" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchReferee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MatchReferee_matchId_idx" ON "MatchReferee"("matchId");

-- CreateIndex
CREATE INDEX "MatchReferee_userId_idx" ON "MatchReferee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchReferee_matchId_userId_key" ON "MatchReferee"("matchId", "userId");

-- AddForeignKey
ALTER TABLE "MatchReferee" ADD CONSTRAINT "MatchReferee_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchReferee" ADD CONSTRAINT "MatchReferee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
