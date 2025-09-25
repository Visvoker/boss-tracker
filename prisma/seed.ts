import { PrismaClient } from "../src/generated/prisma";
const db = new PrismaClient();

const bosses = [
  {
    name: "紅寶王",
    minRespawnMin: 23,
    maxRespawnMin: 30,
    imageUrl: "/images/bosses/2220000.png",
  },
  {
    name: "樹妖王",
    minRespawnMin: 23,
    maxRespawnMin: 30,
    imageUrl: "/images/bosses/3220000.png",
  },
  {
    name: "蘑菇王",
    minRespawnMin: 210,
    maxRespawnMin: 240,
    imageUrl: "/images/bosses/6130101.png",
  },
  {
    name: "巴洛古",
    minRespawnMin: 405,
    maxRespawnMin: 540,
    imageUrl: "/images/bosses/6400005.png",
  },
] as const;

async function main() {
  for (const b of bosses) {
    await db.boss.upsert({
      where: { name: b.name },
      update: {
        minRespawnMin: b.minRespawnMin,
        maxRespawnMin: b.maxRespawnMin,
        imageUrl: b.imageUrl,
      },
      create: {
        name: b.name,
        minRespawnMin: b.minRespawnMin,
        maxRespawnMin: b.maxRespawnMin,
        imageUrl: b.imageUrl,
      },
    });
  }
  console.log(`✅ Seed 完成，建立/更新 ${bosses.length} 隻 Boss`);
}

main()
  .catch((e) => {
    console.error("❌ Seed 失敗：", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
