"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsEnabled(true);
  }, []);

  useEffect(() => {
    if (!isEnabled || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const ua = navigator.userAgent;
    const detectedSafari =
      /Safari/i.test(ua) &&
      !/Chrome|Chromium|CriOS|Edg|OPR|Brave|FxiOS|Firefox/i.test(ua);

    xTo.current = gsap.quickTo(cursor, "x", {
      duration: 0.42,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(cursor, "y", {
      duration: 0.42,
      ease: "power3.out",
    });

    const moveCursor = (event: MouseEvent) => {
      const viewport = window.visualViewport;
      const offsetX = detectedSafari && viewport ? viewport.offsetLeft : 0;
      const offsetY = detectedSafari && viewport ? viewport.offsetTop : 0;

      xTo.current?.(event.clientX + offsetX - 15);
      yTo.current?.(event.clientY + offsetY - 15);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isClicked ? 0.82 : 1,
      duration: 0.18,
      ease: "power2.out",
    });
  }, [isClicked]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body,
          a,
          button,
          input,
          textarea,
          select {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[30px] w-[30px] rounded-full border border-white bg-transparent mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
