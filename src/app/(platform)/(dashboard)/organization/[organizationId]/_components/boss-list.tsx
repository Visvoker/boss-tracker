import Image from "next/image";
import { redirect } from "next/navigation";
import { Hourglass, Trash2 } from "lucide-react";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function BossList() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosslogs = await db.bossLog.findMany({
    where: { orgId },
    include: { boss: true },
  });

  function formatTime(value: Date | string) {
    return new Date(value).toLocaleTimeString(undefined, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // xs:[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 m-3">
      {" "}
      {bosslogs.map((bosslog) => (
        <div
          key={bosslog.id}
          className="flex items-center justify-between border rounded-sm gap-x-2 p-3"
        >
          <div className="flex items-center gap-x-2">
            <Image
              src={bosslog.boss.imageUrl}
              alt={bosslog.boss.name}
              width={40}
              height={40}
            />
            <div className="ml-2 flex-1 min-w-0 truncate">
              <div className="flex items-center gap-x-2 ">
                <p>{bosslog.boss.name}</p>
                <p className="text-xs text-muted-foreground ">
                  頻道:{bosslog.channel}
                </p>
              </div>
              <div className="flex items-center text-xs text-muted-foreground gap-x-2">
                <Hourglass className="h-3 w-3" />
                {formatTime(bosslog.createdAt)}~{formatTime(bosslog.createdAt)}
              </div>
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}
