"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ENTRANCE_VIDEO_URL =
  "https://4p6gppmls93l24ur.public.blob.vercel-storage.com/videos/home-bg.mp4";
const ENTRANCE_SESSION_KEY = "site-intro-completed";
const HOME_ENTERING_CLASS = "site-home-entering";
const EXIT_DURATION_MS = 1800;
const HOME_REVEAL_DURATION_MS = 1800;

export default function SiteEntrance() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const exitTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const hasSeen = window.sessionStorage.getItem(ENTRANCE_SESSION_KEY) === "1";
      setIsVisible(!hasSeen);
    } catch {
      setIsVisible(true);
    }

    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
      if (revealTimerRef.current) {
        window.clearTimeout(revealTimerRef.current);
      }
      document.documentElement.classList.remove(HOME_ENTERING_CLASS);
    };
  }, []);

  const handleEnter = () => {
    if (isExiting) return;

    try {
      window.sessionStorage.setItem(ENTRANCE_SESSION_KEY, "1");
    } catch {
      // Ignore storage failures and continue to enter the site.
    }

    setIsExiting(true);
    document.documentElement.classList.add(HOME_ENTERING_CLASS);

    if (pathname !== "/") {
      router.push("/");
    }

    exitTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, EXIT_DURATION_MS);

    revealTimerRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove(HOME_ENTERING_CLASS);
    }, HOME_REVEAL_DURATION_MS + 100);
  };

  if (!isVisible) return null;

  return (
    <div
      data-state={isExiting ? "exiting" : "idle"}
      className={`site-entrance fixed inset-0 z-[300] cursor-pointer bg-white opacity-100 ${isExiting ? "site-entrance--exiting" : ""}`}
      role="button"
      tabIndex={0}
      onClick={handleEnter}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleEnter();
        }
      }}
      aria-label="Enter site"
    >
      <div
        className="site-entrance-stage flex h-full w-full items-center justify-center px-6"
      >
        <video
          className="pointer-events-none h-auto w-full max-w-[980px] object-contain"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={ENTRANCE_VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      <div
        className="site-entrance-hint pointer-events-none absolute inset-x-0 bottom-12 text-center font-futura text-[12px] tracking-[-0.03em] text-black/70"
      >
        Click anywhere to enter
      </div>
    </div>
  );
}
