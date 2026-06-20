"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const HOME_MOTION_PREFIX = "home-scroll";

function killHomeScrollTriggers() {
  for (const trigger of ScrollTrigger.getAll()) {
    if (trigger.vars.id?.toString().startsWith(HOME_MOTION_PREFIX)) {
      trigger.kill();
    }
  }
}

function refreshHomeScroll() {
  window.requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** Hero background parallax + headline drift as the hero scrolls away. */
function setupHero(root: HTMLElement) {
  const image = root.querySelector<HTMLElement>("[data-home-hero-image]");
  const text = root.querySelector<HTMLElement>("[data-home-hero-text]");
  const badge = root.querySelector<HTMLElement>("[data-home-hero-badge]");

  if (image) {
    gsap.to(image, {
      yPercent: 16,
      ease: "none",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-hero-image`,
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  }

  if (text) {
    gsap.to(text, {
      yPercent: 40,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-hero-text`,
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  }

  if (badge) {
    gsap.to(badge, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-hero-badge`,
        trigger: root,
        start: "top top",
        end: "20% top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }
}

/** Work cards: clip-style reveal, meta slide-in, plus inner image parallax. */
function setupWorkCards(root: HTMLElement) {
  const head = root.querySelector<HTMLElement>("[data-home-work-head]");
  if (head) {
    gsap.from(head, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-work-head`,
        trigger: head,
        start: "top 88%",
        invalidateOnRefresh: true,
      },
    });
  }

  const cards = gsap.utils.toArray<HTMLElement>("[data-home-work-card]", root);

  for (const [index, card] of cards.entries()) {
    const frame = card.querySelector<HTMLElement>("[data-home-work-frame]");
    const img = card.querySelector<HTMLElement>("[data-home-work-img]");
    const meta = card.querySelector<HTMLElement>("[data-home-work-meta]");
    const align = card.dataset.align === "right" ? 1 : -1;

    if (frame) {
      gsap.fromTo(
        frame,
        { clipPath: "inset(14% 0% 14% 0%)", scale: 1.04 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            id: `${HOME_MOTION_PREFIX}-work-frame-${index}`,
            trigger: card,
            start: "top 82%",
            end: "top 40%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    }

    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            id: `${HOME_MOTION_PREFIX}-work-img-${index}`,
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }

    if (meta) {
      gsap.fromTo(
        meta,
        { x: 48 * align, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            id: `${HOME_MOTION_PREFIX}-work-meta-${index}`,
            trigger: card,
            start: "top 78%",
            end: "top 45%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    }
  }
}

/** Manifesto: emblem drifts up, copy reveals. */
function setupManifesto(root: HTMLElement) {
  const emblem = root.querySelector<HTMLElement>("[data-home-manifesto-emblem]");
  const copy = root.querySelector<HTMLElement>("[data-home-manifesto-copy]");

  if (emblem) {
    gsap.fromTo(
      emblem,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          id: `${HOME_MOTION_PREFIX}-manifesto-emblem`,
          trigger: root,
          start: "top 80%",
          end: "top 45%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  if (copy) {
    gsap.fromTo(
      copy.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          id: `${HOME_MOTION_PREFIX}-manifesto-copy`,
          trigger: root,
          start: "top 72%",
          invalidateOnRefresh: true,
        },
      },
    );
  }
}

/** Diagonal tiles marquee: scroll-linked horizontal drift. */
function setupTiles(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-home-tiles-track]");
  if (!track) return;

  const distance = () => {
    const overflow = track.scrollWidth - window.innerWidth;
    return Math.max(overflow * 0.5, 200);
  };

  gsap.fromTo(
    track,
    { x: 0 },
    {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-tiles`,
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    },
  );
}

/** Expertise rows + contact title slide in. */
function setupReveals(root: HTMLElement) {
  const rows = gsap.utils.toArray<HTMLElement>(
    "[data-home-expertise-row]",
    root,
  );
  for (const [index, row] of rows.entries()) {
    gsap.from(row, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-expertise-${index}`,
        trigger: row,
        start: "top 90%",
        invalidateOnRefresh: true,
      },
    });
  }

  const contactTitle = root.querySelector<HTMLElement>(
    "[data-home-contact-title]",
  );
  if (contactTitle) {
    gsap.from(contactTitle, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        id: `${HOME_MOTION_PREFIX}-contact-title`,
        trigger: contactTitle,
        start: "top 90%",
        invalidateOnRefresh: true,
      },
    });
  }
}

export function useHomeScrollMotion(
  rootRef: RefObject<HTMLElement | null>,
  imagesReady = false,
) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !imagesReady) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      killHomeScrollTriggers();

      const hero = root.querySelector<HTMLElement>("[data-home-hero]");
      if (hero) setupHero(hero);

      const work = root.querySelector<HTMLElement>("[data-home-work]");
      if (work) setupWorkCards(work);

      const manifesto = root.querySelector<HTMLElement>("[data-home-manifesto]");
      if (manifesto) setupManifesto(manifesto);

      const tiles = root.querySelector<HTMLElement>("[data-home-tiles]");
      if (tiles) setupTiles(tiles);

      setupReveals(root);

      const onResize = () => refreshHomeScroll();
      const onEnterComplete = () => refreshHomeScroll();

      window.addEventListener("resize", onResize);
      window.addEventListener("site-enter-complete", onEnterComplete);
      refreshHomeScroll();

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("site-enter-complete", onEnterComplete);
        killHomeScrollTriggers();
      };
    },
    { scope: rootRef, dependencies: [imagesReady] },
  );
}
