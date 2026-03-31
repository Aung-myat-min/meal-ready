-- CreateEnum
CREATE TYPE "MealStatus" AS ENUM ('NONE', 'STARTED', 'PREPARING', 'COOKING', 'READY');

-- CreateEnum
CREATE TYPE "LogEnum" AS ENUM ('AUTH', 'USER', 'MEALSTATUS', 'CHANNEL', 'SUBSCRIPTION');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "CurrentStatus" (
    "statusId" TEXT NOT NULL,
    "mealStatus" "MealStatus" NOT NULL DEFAULT 'NONE',
    "updatedPerson" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CurrentStatus_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "Channel" (
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "channelCode" TEXT NOT NULL,
    "channelFounder" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscriptionCode" TEXT NOT NULL,
    "subscribers" TEXT[],
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionCode")
);

-- CreateTable
CREATE TABLE "Log" (
    "logId" TEXT NOT NULL,
    "logString" TEXT NOT NULL,
    "logType" "LogEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("logId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelCode_key" ON "Channel"("channelCode");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelFounder_key" ON "Channel"("channelFounder");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_channelId_key" ON "Subscription"("channelId");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_channelFounder_fkey" FOREIGN KEY ("channelFounder") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("channelCode") ON DELETE RESTRICT ON UPDATE CASCADE;
