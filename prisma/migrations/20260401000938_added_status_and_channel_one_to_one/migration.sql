/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `CurrentStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `CurrentStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "associatedStatus" "MealStatus";

-- AlterTable
ALTER TABLE "CurrentStatus" ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStatus_channelId_key" ON "CurrentStatus"("channelId");

-- AddForeignKey
ALTER TABLE "CurrentStatus" ADD CONSTRAINT "CurrentStatus_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;
