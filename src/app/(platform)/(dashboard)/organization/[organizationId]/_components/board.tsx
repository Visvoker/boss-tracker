import { AlarmClockPlus, User2 } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getBosses } from "@/server/get-bosses";

import { BossList } from "./boss-list";
import { FormPopover } from "@/components/form/form-popover";

export default async function Board() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosses = await getBosses();

  return (
    <div className="space-y-4 w-full">
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
        <div className="border rounded-sm">
          <p className="font-semibold text-lg ml-3 my-3">即將重生的 Boss</p>
          <BossList />
        </div>
      </div>{" "}
    </div>
  );
}
