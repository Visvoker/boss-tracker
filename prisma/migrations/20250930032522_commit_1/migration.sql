-- CreateTable
CREATE TABLE "public"."Boss" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "minRespawnMin" INTEGER NOT NULL,
    "maxRespawnMin" INTEGER NOT NULL,

    CONSTRAINT "Boss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BossLog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "channel" INTEGER NOT NULL,
    "killedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clearedAt" TIMESTAMP(3),
    "bossId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BossLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boss_name_key" ON "public"."Boss"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Boss_imageUrl_key" ON "public"."Boss"("imageUrl");

-- CreateIndex
CREATE INDEX "Boss_name_idx" ON "public"."Boss"("name");

-- CreateIndex
CREATE INDEX "BossLog_orgId_bossId_channel_killedAt_idx" ON "public"."BossLog"("orgId", "bossId", "channel", "killedAt");

-- CreateIndex
CREATE INDEX "BossLog_orgId_bossId_channel_clearedAt_idx" ON "public"."BossLog"("orgId", "bossId", "channel", "clearedAt");

-- AddForeignKey
ALTER TABLE "public"."BossLog" ADD CONSTRAINT "BossLog_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "public"."Boss"("id") ON DELETE CASCADE ON UPDATE CASCADE;
