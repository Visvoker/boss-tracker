import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BossCard } from "./boss-card";

export async function BossList() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosslogs = await db.bossLog.findMany({
    where: { orgId },
    include: { boss: true },
    orderBy: [{ bossId: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 m-3">
      {" "}
      {bosslogs.map((bosslog) => (
        <BossCard bosslog={bosslog} key={bosslog.id} />
      ))}
    </div>
  );
}
