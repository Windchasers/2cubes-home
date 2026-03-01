"use client";

import { useEffect, useState } from "react";

const ENTRANCE_VIDEO_URL =
  "https://4p6gppmls93l24ur.public.blob.vercel-storage.com/videos/home-bg.mp4";
const ENTRANCE_SESSION_KEY = "site-intro-completed";

export default function SiteEntrance() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = window.sessionStorage.getItem(ENTRANCE_SESSION_KEY) === "1";
      setIsVisible(!hasSeen);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleEnter = () => {
    try {
      window.sessionStorage.setItem(ENTRANCE_SESSION_KEY, "1");
    } catch {
      // Ignore storage failures and continue to enter the site.
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[300] cursor-pointer bg-white"
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
      <div className="flex h-full w-full items-center justify-center px-6">
        <video
          className="pointer-events-none h-auto w-full max-w-[920px] object-contain"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={ENTRANCE_VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-12 text-center font-futura text-[12px] tracking-[-0.03em] text-black/70">
        Click anywhere to enter
      </div>
    </div>
  );
}
