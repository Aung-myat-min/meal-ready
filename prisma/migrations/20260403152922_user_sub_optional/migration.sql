-- DropForeignKey
ALTER TABLE "MUser" DROP CONSTRAINT "MUser_subscriptionCode_fkey";

-- AlterTable
ALTER TABLE "MUser" ALTER COLUMN "subscriptionCode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MUser" ADD CONSTRAINT "MUser_subscriptionCode_fkey" FOREIGN KEY ("subscriptionCode") REFERENCES "Subscription"("subscriptionCode") ON DELETE SET NULL ON UPDATE CASCADE;
