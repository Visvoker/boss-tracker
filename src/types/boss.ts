import { Prisma } from "@/generated/prisma";

// 定義包含 boss 的查詢形狀
export const bossLogWithBoss = Prisma.validator<Prisma.BossLogDefaultArgs>()({
  include: { boss: true },
});

// 從上面那個形狀推得 payload 型別
export type BossLogWithBoss = Prisma.BossLogGetPayload<typeof bossLogWithBoss>;
