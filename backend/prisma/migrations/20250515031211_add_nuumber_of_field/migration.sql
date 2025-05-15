/*
  Warnings:

  - A unique constraint covering the columns `[tournamentId,number]` on the table `Field` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "fieldNumber" INTEGER;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "numberOfFields" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Field_tournamentId_number_key" ON "Field"("tournamentId", "number");
