"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CONTENT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "blockquote",
  "[data-motion-reveal]",
].join(", ");

const DIVIDER_SELECTOR = [
  "hr",
  "[class*='h-px']",
  "[class*='h-[0.5px]']",
  "[data-motion-divider]",
].join(", ");

const TITLE_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);
const EXCLUDED_TAGS = new Set([
  "IMG",
  "VIDEO",
  "PICTURE",
  "CANVAS",
  "SVG",
  "FIGURE",
]);

const MOTION_PREFIX = "site-motion";

function isDividerElement(element: HTMLElement) {
  if (element.dataset.motionDivider === "true") return true;
  if (element.tagName === "HR") return true;

  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  const hasNoText = !element.textContent?.trim();
  const hasNoChildren = element.children.length === 0;
  const isThin = rect.height <= 2.5;
  const isWide = rect.width >= 42;
  const hasVisibleTopBorder =
    Number.parseFloat(style.borderTopWidth) > 0 &&
    style.borderTopStyle !== "none" &&
    style.borderTopColor !== "rgba(0, 0, 0, 0)";
  const hasVisibleBackground =
    style.backgroundColor !== "transparent" &&
    style.backgroundColor !== "rgba(0, 0, 0, 0)";

  return (
    hasNoText &&
    hasNoChildren &&
    isThin &&
    isWide &&
    (hasVisibleTopBorder || hasVisibleBackground)
  );
}

function isVisibleElement(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}

function resolveGroup(element: HTMLElement, main: Element) {
  return (
    element.closest<HTMLElement>("section, article, [data-motion-group]") ??
    element.parentElement ??
    (main as HTMLElement)
  );
}

function killMotionTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.id?.toString().startsWith(MOTION_PREFIX)) {
      trigger.kill();
    }
  });
}

export default function AppleMotion() {
  const pathname = usePathname();
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pathname) return;

      if (pathname === "/") return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const main = document.querySelector("main");
      if (!main) return;

      killMotionTriggers();

      if (prefersReducedMotion) return;

      const contentTargets = Array.from(
        main.querySelectorAll<HTMLElement>(CONTENT_SELECTOR),
      ).filter((element) => {
        if (EXCLUDED_TAGS.has(element.tagName)) return false;
        if (element.closest("[data-no-motion='true']")) return false;
        if (isDividerElement(element)) return false;
        return isVisibleElement(element);
      });

      const dividerTargets = Array.from(
        main.querySelectorAll<HTMLElement>(DIVIDER_SELECTOR),
      ).filter((element) => {
        if (element.closest("[data-no-motion='true']")) return false;
        return isVisibleElement(element) && isDividerElement(element);
      });

      const groupMap = new Map<HTMLElement, number>();
      const groupPhaseCount = new Map<string, number>();

      for (const element of contentTargets) {
        const group = resolveGroup(element, main);
        if (!groupMap.has(group)) {
          groupMap.set(group, groupMap.size);
        }

        const groupIndex = groupMap.get(group) ?? 0;
        const phase = TITLE_TAGS.has(element.tagName) ? "title" : "body";
        const phaseCountKey = `${groupIndex}:${phase}`;
        const indexInPhase = groupPhaseCount.get(phaseCountKey) ?? 0;
        groupPhaseCount.set(phaseCountKey, indexInPhase + 1);

        const delay =
          Math.min(groupIndex * 0.07, 0.18) +
          (phase === "body" ? 0.12 : 0) +
          indexInPhase * 0.04;

        gsap.from(element, {
          y: TITLE_TAGS.has(element.tagName) ? 36 : 48,
          opacity: 0,
          duration: 1.05,
          delay: Math.min(delay, 0.42),
          ease: "power3.out",
          scrollTrigger: {
            id: `${MOTION_PREFIX}-text-${groupIndex}-${indexInPhase}`,
            trigger: element,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });
      }

      for (const [index, divider] of dividerTargets.entries()) {
        gsap.from(divider, {
          scaleX: 0,
          opacity: 0.4,
          duration: 0.95,
          ease: "power3.inOut",
          transformOrigin: "center center",
          scrollTrigger: {
            id: `${MOTION_PREFIX}-divider-${index}`,
            trigger: divider,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const imageContainers = Array.from(
        main.querySelectorAll<HTMLElement>("[data-motion-parallax]"),
      ).filter((element) => {
        if (element.closest("[data-no-motion='true']")) return false;
        if (!element.querySelector("img")) return false;
        return isVisibleElement(element);
      });

      for (const [index, container] of imageContainers.entries()) {
        const image = container.querySelector("img");
        if (!image) continue;

        const rect = container.getBoundingClientRect();
        if (rect.height < 175) continue;

        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.06 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              id: `${MOTION_PREFIX}-parallax-${index}`,
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }

      const refresh = () => ScrollTrigger.refresh();
      window.requestAnimationFrame(refresh);

      return () => {
        killMotionTriggers();
      };
    },
    { dependencies: [pathname], scope: scopeRef },
  );

  return <div ref={scopeRef} className="hidden" aria-hidden="true" />;
}
