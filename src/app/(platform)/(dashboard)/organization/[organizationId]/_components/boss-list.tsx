"use client";

import { BossLogWithBoss } from "@/types/boss";
import { BossCard } from "./boss-card";
import { useRespawnBuckets } from "@/hooks/use-respawn";
import { Serialized } from "@/types/serialized";

type BossListProps = {
  bosslogs: Serialized<BossLogWithBoss>[];
};

const Section = ({
  title,
  data,
}: {
  title: string;
  data: BossLogWithBoss[];
}) => {
  if (data.length === 0) return null;

  return (
    <div>
      <p className="font-semibold text-lg my-3">{title}</p>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.map((b) => (
          <BossCard key={b.id} bosslog={b} />
        ))}
      </div>
    </div>
  );
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
      <Section title="已重生Boss" data={ready} />
      <Section title="可能重生Boss" data={maybe} />
      <Section title="未重生Boss" data={notYet} />
    </div>
  );
}
