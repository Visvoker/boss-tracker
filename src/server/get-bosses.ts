import { cache } from "react";
import { db } from "@/lib/db";

export const getBosses = cache(async () => {
  return db.boss.findMany({
    select: { id: true, name: true, imageUrl: true },
    orderBy: { name: "asc" },
  });
});
