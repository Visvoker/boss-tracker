/*
  Warnings:

  - You are about to drop the column `clearedAt` on the `BossLog` table. All the data in the column will be lost.
  - You are about to drop the column `killedAt` on the `BossLog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."BossLog_orgId_bossId_channel_clearedAt_idx";

-- DropIndex
DROP INDEX "public"."BossLog_orgId_bossId_channel_killedAt_idx";

-- AlterTable
ALTER TABLE "public"."BossLog" DROP COLUMN "clearedAt",
DROP COLUMN "killedAt";

-- CreateIndex
CREATE INDEX "BossLog_orgId_bossId_channel_createdAt_idx" ON "public"."BossLog"("orgId", "bossId", "channel", "createdAt");
