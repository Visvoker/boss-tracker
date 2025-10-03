"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const NowCtx = createContext<Date | null>(null);

export function NowProvider({
  children,
  tickMs = 30_000,
}: {
  children: React.ReactNode;
  tickMs?: number;
}) {
  const [now, setNow] = useState(() => new Date());
  const savedTick = useRef(tickMs);
  useEffect(() => {
    savedTick.current = tickMs;
  }, [tickMs]);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setNow(new Date());
    }, savedTick.current);
    return () => clearInterval(id);
  }, []);

  // 固定住 Date 實例，避免常態 re-render
  const value = useMemo(() => now, [now.getTime()]);
  return <NowCtx.Provider value={value}>{children}</NowCtx.Provider>;
}

export function useNow() {
  const ctx = useContext(NowCtx);
  if (!ctx) throw new Error("useNow 必須包在 <NowProvider> 內");
  return ctx;
}
