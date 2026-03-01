"use client";

import AppleMotion from "@/components/AppleMotion";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import PageScale from "@/components/PageScale";
import SiteEntrance from "@/components/SiteEntrance";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function LayoutContent({
  children,
}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isScaled = true;
  const isPreview = pathname === "/preview";
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [pageScale, setPageScale] = useState(1);

  useEffect(() => {
    const measureHeader = () => {
      if (!headerRef.current) return;
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      const scaleValue = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--page-scale",
        ),
      );
      setPageScale(
        Number.isFinite(scaleValue) && scaleValue > 0 ? scaleValue : 1,
      );
    };

    measureHeader();
    window.addEventListener("resize", measureHeader);

    const observer = new ResizeObserver(measureHeader);
    if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      window.removeEventListener("resize", measureHeader);
      observer.disconnect();
    };
  }, []);

  const mainClassName = isHome ? "" : isPreview ? "" : "pt-24";
  const previewPaddingTop = Math.ceil((headerHeight || 86) + 10 * pageScale);

  return (
    <div className="bg-white text-black">
      <SiteEntrance />
      <CustomCursor />
      <AppleMotion />
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] px-[10px] pt-6 s:pt-8 l:px-0 l:pt-[10px] pointer-events-none mix-blend-difference"
      >
        <div
          className={`${isScaled ? "page-scale-header-wrap" : ""} pointer-events-auto`}
        >
          <div
            className={`flex items-center justify-between l:mx-auto l:w-[1024px] l:px-[16px] text-white ${isScaled ? "page-scale-header" : ""}`}
          >
            <div className="logo-nav">
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity inline-flex items-baseline gap-1 font-futura font-[450] cursor-pointer tracking-[-0.03em]"
              >
                <span className="text-[9px] s:text-[7px] m:text-[1.171875vw] l:text-[12px] leading-none">
                  2cubes
                </span>
                <span className="text-[9px] s:text-[7px] m:text-[1.171875vw] l:text-[12px] opacity-80 leading-none">
                  Design
                </span>
              </Link>
            </div>

            <div className="[&_a]:!text-white [&_button]:!text-white [&_span]:!text-white">
              <Navigation />
            </div>
          </div>
        </div>
      </header>

      <main
        className={mainClassName}
        style={isPreview ? { paddingTop: `${previewPaddingTop}px` } : undefined}
      >
        {isScaled ? <PageScale>{children}</PageScale> : children}
      </main>
    </div>
  );
}
