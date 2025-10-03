import { AlarmClockPlus, User2 } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getBosses } from "@/server/get-bosses";

import { BossList } from "./boss-list";
import { FormPopover } from "@/components/form/form-popover";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma";
import { Serialized } from "@/types/serialized";

const bossLogWithBoss = Prisma.validator<Prisma.BossLogDefaultArgs>()({
  include: { boss: true },
});
type BossLogWithBoss = Prisma.BossLogGetPayload<typeof bossLogWithBoss>;

export default async function Board() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosses = await getBosses();
  const bossLogQuery = (orgId: string) =>
    Prisma.validator<Prisma.BossLogFindManyArgs>()({
      where: { orgId },
      include: { boss: true },
      orderBy: [{ bossId: "asc" }, { createdAt: "desc" }],
    });

  const raw = await db.bossLog.findMany(bossLogQuery(orgId)); // BossLogWithBoss[]
  const bosslogs = raw.map((b) => ({
    ...b,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  })) satisfies Serialized<BossLogWithBoss>[];

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center font-semibold text-lg text-neutral-700 gap-x-2">
        <User2 className="h-5 w-5" />
        <p className="font-semibold">Your Board</p>
        <FormPopover bosses={bosses} sideOffset={10} side="bottom">
          <div className="hover:opacity-50 transition cursor-pointer">
            <AlarmClockPlus className="h-8 w-8 text-sky-700 ml-2" />
          </div>
        </FormPopover>
      </div>
      <div>
        <BossList bosslogs={bosslogs} />
      </div>
    </div>
  );
}
