/*
  Warnings:

  - The primary key for the `MailTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MailTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MailTemplate" DROP CONSTRAINT "MailTemplate_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MailTemplate_pkey" PRIMARY KEY ("id");
