"use client";

import Image from "next/image";
import { Hourglass, RotateCcw, Trash2 } from "lucide-react";

import { formatTime } from "@/lib/datetime";
import { Prisma } from "@/generated/prisma";
import { useAction } from "@/hooks/use-actions";
import { deleteChannel } from "@/actions/delete-boss";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";

type BossLogWithBoss = Prisma.BossLogGetPayload<{ include: { boss: true } }>;

export function BossCard({ bosslog }: { bosslog: BossLogWithBoss }) {
  const bosslogId = bosslog.id;
  const baseTime = useMemo(
    () => new Date(bosslog.createdAt),
    [bosslog.createdAt]
  );
  const minMin = bosslog.boss.minRespawnMin;
  const maxMin = bosslog.boss.maxRespawnMin;

  const respawnStart = new Date(baseTime.getTime() + minMin * 60_000);
  const respawnEnd = new Date(baseTime.getTime() + maxMin * 60_000);

  const now = new Date();

  type Lamp = "red" | "yellow" | "green";
  const lamp: Lamp =
    now < respawnStart ? "red" : now <= respawnEnd ? "yellow" : "green";

  const lampClass =
    lamp === "red"
      ? "bg-red-500"
      : lamp === "yellow"
      ? "bg-yellow-500"
      : "bg-green-500";

  const lampText =
    lamp === "red" ? "未重生" : lamp === "yellow" ? "準備重生" : "已重生";

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { execute, isLoading } = useAction(deleteChannel, {
    onSuccess: () => {
      toast.success("Boss deleted!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id: bosslogId });
  };

  if (!isMounted) {
    return null;
  }

  return (
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
        <div className="ml-2 flex-1 min-w-0 ">
          <div className="flex items-center ">
            <p className="mr-2 truncate">{bosslog.boss.name}</p>
            <p className="text-sm text-muted-foreground truncate">頻道:</p>
            <p className="text-sm text-muted-foreground break-words">
              {bosslog.channel}
            </p>
          </div>
          <div className="flex items-center text-xs text-muted-foreground gap-x-2">
            <Hourglass className="h-3 w-3" />
            {formatTime(respawnStart)}~{formatTime(respawnEnd)}
          </div>
          {/* 燈號 */}
          <div className="mt-1 flex items-center gap-x-2 text-xs">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${lampClass}`}
              aria-label={lampText}
            />
            <span className="text-muted-foreground">{lampText}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center text-xs text-muted-foreground">
        {(lamp === "yellow" || lamp === "green") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            // disabled={}
            title="從現在重新計時"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
