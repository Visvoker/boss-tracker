"use client";

import { Prisma } from "@/generated/prisma";
import { useNow } from "./use-now";
import { useMemo } from "react";
import {
  computeRespawnWindow,
  getLamp,
  Lamp,
  lampMeta,
} from "@/lib/boss-timer";

type BossLogWithBoss = Prisma.BossLogGetPayload<{ include: { boss: true } }>;

export function useRespawn(item: BossLogWithBoss) {
  const now = useNow();
  const { start, end } = useMemo(
    () =>
      computeRespawnWindow(
        item.createdAt,
        item.boss.minRespawnMin,
        item.boss.maxRespawnMin
      ),
    [item.createdAt, item.boss.minRespawnMin, item.boss.maxRespawnMin]
  );
  const lamp: Lamp = useMemo(() => getLamp(now, start, end), [now, start, end]);
  const meta = useMemo(() => lampMeta(lamp), [lamp]);
  return { now, start, end, lamp, ...meta };
}

export function useRespawnBuckets<T extends BossLogWithBoss>(items: T[]) {
  const now = useNow();

  return useMemo(() => {
    const ready: T[] = [];
    const maybe: T[] = [];
    const notYet: T[] = [];

    for (const i of items) {
      const { start, end } = computeRespawnWindow(
        i.createdAt,
        i.boss.minRespawnMin,
        i.boss.maxRespawnMin
      );
      const lamp = getLamp(now, start, end);
      if (lamp === "green") ready.push(i);
      else if (lamp === "yellow") maybe.push(i);
      else notYet.push(i);
    }
    return { ready, maybe, notYet };
  }, [items, now]);
}
