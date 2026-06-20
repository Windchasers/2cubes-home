"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  lerp: 0.08,
  duration: 1.2,
  smoothWheel: true,
  autoRaf: true,
  wheelMultiplier: 0.9,
  prevent: (node: HTMLElement) =>
    node.id === "site-entrance-wrapper" ||
    Boolean(node.closest("#site-entrance-wrapper")),
};

function GsapLenisSync() {
  const lenis = useLenis();
  const entranceActiveRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const setEntranceActive = (active: boolean) => {
      if (entranceActiveRef.current === active) return;
      entranceActiveRef.current = active;

      if (active) {
        lenis.stop();
        return;
      }

      lenis.start();
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onEntranceMounted = () => setEntranceActive(true);
    const onEnterComplete = () => setEntranceActive(false);

    window.addEventListener("site-entrance-mounted", onEntranceMounted);
    window.addEventListener("site-enter-complete", onEnterComplete);

    setEntranceActive(
      Boolean(document.getElementById("site-entrance-wrapper")),
    );

    return () => {
      lenis.off("scroll", onScroll);
      window.removeEventListener("site-entrance-mounted", onEntranceMounted);
      window.removeEventListener("site-enter-complete", onEnterComplete);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
