-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Subscriber" ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
