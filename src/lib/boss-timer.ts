export type Lamp = "red" | "yellow" | "green";

export function computeRespawnWindow(
  createdAt: Date | string,
  minMin: number,
  maxMin: number
) {
  const base = new Date(createdAt);
  const start = new Date(base.getTime() + minMin * 60_000);
  const end = new Date(base.getTime() + maxMin * 60_000);
  return { start, end };
}

export function getLamp(now: Date, start: Date, end: Date): Lamp {
  if (now < start) return "red";
  if (now <= end) return "yellow";
  return "green";
}

export function lampMeta(lamp: Lamp) {
  if (lamp === "red") return { className: "bg-red-500", text: "未重生" };
  if (lamp === "yellow")
    return { className: "bg-yellow-500", text: "可能重生" };
  return { className: "bg-green-500", text: "已重生" };
}
