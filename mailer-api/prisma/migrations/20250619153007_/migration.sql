/*
  Warnings:

  - You are about to drop the column `template` on the `EmailLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailLog" DROP COLUMN "template",
ADD COLUMN     "emailTemplatePlain" TEXT,
ADD COLUMN     "templateId" INTEGER,
ADD COLUMN     "templateS3Path" TEXT;
