-- AlterTable
ALTER TABLE "MatchScores" ADD COLUMN     "fieldId" TEXT;

-- AddForeignKey
ALTER TABLE "MatchScores" ADD CONSTRAINT "MatchScores_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;
