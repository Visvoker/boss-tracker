import { User2 } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { BossList } from "./boss-list";
import { FormPopover } from "@/components/form/form-popover";
import { db } from "@/lib/db";

export default async function Board() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosses = await db.boss.findMany({
    select: { id: true, name: true, imageUrl: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Board
      </div>
      <div>
        <div className="border rounded-sm">
          <p className="font-semibold text-lg ml-3 my-3">即將重生的 Boss</p>
          <BossList />
        </div>
      </div>{" "}
      <FormPopover bosses={bosses} sideOffset={10} side="bottom">
        <div className="h-20 w-50 bg-muted rounded-sm flex gap-y-1 items-center justify-center hover:opacity-75 transition">
          <p className="text-sm">Create tracker</p>
        </div>
      </FormPopover>
    </div>
  );
}
