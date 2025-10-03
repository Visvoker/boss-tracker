"use client";

import { BossLogWithBoss } from "@/types/boss";
import { BossCard } from "./boss-card";
import { useRespawnBuckets } from "@/hooks/use-respawn";
import { Serialized } from "@/types/serialized";

type BossListProps = {
  bosslogs: Serialized<BossLogWithBoss>[];
};

export function BossList({ bosslogs }: BossListProps) {
  const normalized = bosslogs.map((b) => ({
    ...b,
    createdAt: new Date(b.createdAt),
    updatedAt: new Date(b.updatedAt),
  })) as BossLogWithBoss[];

  const { ready, maybe, notYet } = useRespawnBuckets(normalized);

  return (
    <div className="ml-3">
      {ready.length > 0 && (
        <div>
          <p className="font-semibold text-lg my-3">已重生Boss</p>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {ready.map((b) => (
              <BossCard key={b.id} bosslog={b} />
            ))}
          </div>
        </div>
      )}

      {maybe.length > 0 && (
        <div>
          <div>
            <p className="font-semibold text-lg my-3">可能重生Boss</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {maybe.map((b) => (
                <BossCard key={b.id} bosslog={b} />
              ))}
            </div>
          </div>
        </div>
      )}

      {notYet.length > 0 && (
        <div>
          <p className="font-semibold text-lg my-3">未重生Boss</p>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {notYet.map((b) => (
              <BossCard key={b.id} bosslog={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
