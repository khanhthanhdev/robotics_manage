-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "roundNumber" INTEGER;

-- AlterTable
ALTER TABLE "TeamAlliance" ADD COLUMN     "isSurrogate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stationPosition" INTEGER NOT NULL DEFAULT 1;
