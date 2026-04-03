/*
  Warnings:

  - You are about to drop the column `subscribers` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `subscriptionCode` to the `MUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MUser" ADD COLUMN     "subscriptionCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "subscribers";

-- AddForeignKey
ALTER TABLE "MUser" ADD CONSTRAINT "MUser_subscriptionCode_fkey" FOREIGN KEY ("subscriptionCode") REFERENCES "Subscription"("subscriptionCode") ON DELETE RESTRICT ON UPDATE CASCADE;
