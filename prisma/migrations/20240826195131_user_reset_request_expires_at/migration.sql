/*
  Warnings:

  - Added the required column `expires` to the `ResetRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetRequest" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;
