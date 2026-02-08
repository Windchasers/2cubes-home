"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef } from "react";

export default function PageScale({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const update = () => {
      if (!outerRef.current || !innerRef.current) return;

      const baseWidth = 1024;
      const vw = window.innerWidth;
      const scale = vw >= baseWidth ? vw / baseWidth : 1;

      document.documentElement.style.setProperty("--page-scale", String(scale));
      outerRef.current.style.setProperty("--page-scale", String(scale));

      // Use visual height after transform to avoid over-estimating container height.
      const visualHeight = innerRef.current.getBoundingClientRect().height;
      if (
        !Number.isFinite(visualHeight) ||
        visualHeight <= 0 ||
        visualHeight > 200000
      ) {
        const fallbackHeight = innerRef.current.scrollHeight * scale;
        outerRef.current.style.height = `${Math.min(Math.max(fallbackHeight, 0), 200000)}px`;
        return;
      }

      outerRef.current.style.height = `${visualHeight}px`;
    };

    const rafId = window.requestAnimationFrame(() => {
      update();
      window.requestAnimationFrame(update);
    });

    const resizeObserver = new ResizeObserver(update);
    if (innerRef.current) resizeObserver.observe(innerRef.current);
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
      document.documentElement.style.setProperty("--page-scale", "1");
      if (outerRef.current) {
        outerRef.current.style.height = "";
      }
    };
  }, [pathname]);

  return (
    <div ref={outerRef} className="page-scale-wrap">
      <div ref={innerRef} className="page-scale">
        {children}
      </div>
    </div>
  );
}
