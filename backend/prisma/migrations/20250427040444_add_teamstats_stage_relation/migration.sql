-- AlterTable
ALTER TABLE "TeamStats" ADD COLUMN     "rank" INTEGER,
ADD COLUMN     "stageId" TEXT,
ADD COLUMN     "tiebreaker1" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tiebreaker2" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "TeamStats_stageId_idx" ON "TeamStats"("stageId");

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
