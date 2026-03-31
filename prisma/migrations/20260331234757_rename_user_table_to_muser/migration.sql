/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_channelFounder_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "MUser" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MUser_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MUser_userEmail_key" ON "MUser"("userEmail");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_channelFounder_fkey" FOREIGN KEY ("channelFounder") REFERENCES "MUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
