"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  "[data-apple-reveal]",
].join(", ");

const DIVIDER_SELECTOR = [
  "hr",
  "[class*='border-t']",
  "[class*='h-px']",
  "[class*='h-[0.5px]']",
  "[data-apple-divider]",
].join(", ");

const TITLE_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);
const BODY_TAGS = new Set(["P", "LI", "BLOCKQUOTE"]);
const EXCLUDED_TAGS = new Set([
  "IMG",
  "VIDEO",
  "PICTURE",
  "CANVAS",
  "SVG",
  "FIGURE",
]);

const PHASE_ORDER = {
  title: 0,
  divider: 0,
  body: 180,
} as const;

const PHASE_VALUES = ["title", "divider", "body"] as const;
const GROUP_DELAY_MS = 70;
const MAX_GROUP_DELAY_MS = 180;
const MAX_DELAY_MS = 460;
const STEP_DELAY_MS = 40;

type RevealPhase = (typeof PHASE_VALUES)[number];

function isDividerElement(element: HTMLElement) {
  if (element.dataset.appleDivider === "true") return true;
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

function resolvePhase(element: HTMLElement): RevealPhase {
  const forcedPhase = element.dataset.appleReveal;
  if (forcedPhase && PHASE_VALUES.includes(forcedPhase as RevealPhase)) {
    return forcedPhase as RevealPhase;
  }

  if (isDividerElement(element)) return "divider";
  if (TITLE_TAGS.has(element.tagName)) return "title";
  if (BODY_TAGS.has(element.tagName)) return "body";
  return "body";
}

function resolveGroup(element: HTMLElement, main: Element) {
  return (
    element.closest<HTMLElement>("section, article, [data-apple-group]") ??
    element.parentElement ??
    (main as HTMLElement)
  );
}

const PHASE_CLASS_MAP: Record<RevealPhase, string> = {
  title: "apple-reveal-title",
  divider: "apple-reveal-divider",
  body: "apple-reveal-body",
};

export default function AppleMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === "undefined") return;

    const main = document.querySelector("main");
    if (!main) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const contentTargets = Array.from(
      main.querySelectorAll<HTMLElement>(CONTENT_SELECTOR),
    );
    const dividerTargets = Array.from(
      main.querySelectorAll<HTMLElement>(DIVIDER_SELECTOR),
    );

    const targets = Array.from(
      new Set([...contentTargets, ...dividerTargets]),
    ).filter((element) => {
      if (EXCLUDED_TAGS.has(element.tagName)) return false;
      if (element.closest("[data-no-motion='true']")) return false;
      if (element.classList.contains("apple-reveal")) return false;

      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    });

    if (targets.length === 0) return;

    const groupMap = new Map<HTMLElement, number>();
    const groupPhaseCount = new Map<string, number>();

    for (const element of targets) {
      const phase = resolvePhase(element);
      const group = resolveGroup(element, main);

      if (!groupMap.has(group)) {
        groupMap.set(group, groupMap.size);
      }

      const groupIndex = groupMap.get(group) ?? 0;
      const phaseCountKey = `${groupIndex}:${phase}`;
      const indexInPhase = groupPhaseCount.get(phaseCountKey) ?? 0;
      groupPhaseCount.set(phaseCountKey, indexInPhase + 1);

      const groupDelay = Math.min(
        groupIndex * GROUP_DELAY_MS,
        MAX_GROUP_DELAY_MS,
      );
      const phaseDelay = PHASE_ORDER[phase];
      const steppedDelay = indexInPhase * STEP_DELAY_MS;
      const finalDelay = Math.min(
        groupDelay + phaseDelay + steppedDelay,
        MAX_DELAY_MS,
      );

      element.classList.add("apple-reveal", PHASE_CLASS_MAP[phase]);

      if (prefersReducedMotion) {
        element.classList.add("apple-reveal-visible");
        continue;
      }

      element.style.setProperty("--apple-reveal-delay", `${finalDelay}ms`);
    }

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const target = entry.target as HTMLElement;
          target.classList.add("apple-reveal-visible");
          observer.unobserve(target);
        }
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.12,
      },
    );

    for (const element of targets) {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight * 0.88) {
        element.classList.add("apple-reveal-visible");
      } else {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
