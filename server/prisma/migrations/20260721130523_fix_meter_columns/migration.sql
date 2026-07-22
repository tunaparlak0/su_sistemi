/*
  Warnings:

  - You are about to drop the column `address` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Meter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Meter" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "address";
