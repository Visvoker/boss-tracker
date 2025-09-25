import { User2 } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function BoardList() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosses = await db.boss.findMany({
    orderBy: { name: "asc" }, // 可以排序，方便前端顯示
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Board
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new tracker</p>
            <span className="text-xs">20 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
`}
            >
              <HelpCircle className="absolute right-2 bottom-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div> */}
      <div>
        {bosses.map((boss) => (
          <div key={boss.id}>
            <div className="flex items-center justify-star space-y-2">
              <Image width={30} height={30} src={boss.imageUrl} alt="Boss" />
              <div>
                {boss.name} 重生:{boss.minRespawnMin} ~ {boss.maxRespawnMin}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
