import { useEffect, useRef } from "react";

export const useAutoScroll = (deps: unknown[]) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, deps);

  return containerRef;
};
