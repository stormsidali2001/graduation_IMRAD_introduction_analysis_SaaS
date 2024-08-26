/*
  Warnings:

  - The primary key for the `ResetRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ResetRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ResetRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ResetRequest" DROP CONSTRAINT "ResetRequest_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ResetRequest_pkey" PRIMARY KEY ("userId", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetRequest_userId_key" ON "ResetRequest"("userId");
