"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import RotatingText from "@/components/home/RotatingText";
import WebGLHero from "@/components/home/WebGLHero";
import { useHomeScrollMotion } from "@/components/home/useHomeScrollMotion";
import projectsData from "@/data/projects.json";
import projectRoutes from "@/data/projectRoutes.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ENTRANCE_SESSION_KEY = "site-intro-completed";
const LOGO_SRC =
  "https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg";

const slugById = Object.fromEntries(
  projectRoutes.routes.map((route) => [route.id, route.slug]),
);

const projects = projectsData.projects.map((project) => ({
  ...project,
  slug: slugById[project.id] ?? String(project.id),
}));

const [project1, project2, project3] = projects;

const HERO_LINES = [
  { lead: "Design", tail: "Beyond Boundaries" },
  { lead: "超越边界", tail: "的视觉设计" },
];

type WorkItem = {
  index: string;
  slug: string;
  category: string;
  title: string;
  year: string;
  services: string[];
  image: string;
};

const workItems: WorkItem[] = [
  project1 && {
    index: "01",
    slug: project1.slug,
    category: "Book Design",
    title: (project1.titleEn || project1.title).toUpperCase(),
    year: project1.year,
    services: project1.servicesEn ?? project1.services ?? [],
    image: project1.images?.[0] ?? project1.thumbnail ?? "",
  },
  project2 && {
    index: "02",
    slug: project2.slug,
    category: "Exhibition",
    title: (project2.titleEn || project2.title).toUpperCase(),
    year: project2.year,
    services: project2.servicesEn ?? project2.services ?? [],
    image: project2.images?.[0] ?? project2.thumbnail ?? "",
  },
  project3 && {
    index: "03",
    slug: project3.slug,
    category: "Festival Identity",
    title: (project3.titleEn || project3.title).toUpperCase(),
    year: project3.year,
    services: project3.servicesEn ?? project3.services ?? [],
    image: project3.images?.[0] ?? project3.thumbnail ?? "",
  },
].filter(Boolean) as WorkItem[];

const tileImages: string[] = (() => {
  const pool = [
    project2?.images?.[1],
    project1?.images?.[1],
    project3?.images?.[2],
    project2?.images?.[3],
    project1?.images?.[3],
    project3?.images?.[5],
    project2?.images?.[6],
    project1?.images?.[5],
    project3?.images?.[8],
    project2?.images?.[9],
  ].filter((url): url is string => Boolean(url));
  return pool.length ? pool : [];
})();

const expertise = [
  {
    id: "brand",
    en: "Brand Design",
    zh: "品牌设计",
    desc: "Visual identity systems, logotypes, and brand languages that translate a studio's intent into a recognizable, lasting presence.",
  },
  {
    id: "exhibition",
    en: "Exhibition & Space",
    zh: "展陈与空间",
    desc: "Curation, spatial rhythm, and immersive exhibition experiences — built from a rational reading of space and an aesthetic sense of pace.",
  },
  {
    id: "book",
    en: "Book & Editorial",
    zh: "书籍与编辑设计",
    desc: "Editorial design and typographic systems that carry literary imagery into a contemporary, elegant reading experience.",
  },
  {
    id: "culture",
    en: "Cultural Products",
    zh: "文化衍生",
    desc: "Cultural product and packaging design — objects that extend a project's narrative beyond the page and into everyday life.",
  },
  {
    id: "media",
    en: "New Media",
    zh: "新媒体",
    desc: "Motion graphics, video, and digital experiences that give a brand momentum across platforms and audiences.",
  },
];

const offices = [
  {
    city: "Changsha",
    cityZh: "长沙",
    region: "China",
    lines: ["233 Art Community", "Changsha, Hunan", "China"],
  },
  {
    city: "Tokyo",
    cityZh: "东京",
    region: "Japan",
    lines: ["Shibuya-ku", "Tokyo", "Japan"],
  },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "WeChat", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Email", href: "mailto:contact@2cubes.cn" },
];

function HomeScrollImage({ src, alt }: { src: string; alt: string }) {
  return (
    // Native img avoids Next/Image decode timing during scroll swaps.
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function useHomeImagesReady(urls: string[]) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (urls.length === 0) {
      setReady(true);
      return;
    }

    let cancelled = false;

    void Promise.all(
      urls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return ready;
}

function useHeroLineCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_LINES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return index;
}

export default function HomePageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [openExpertise, setOpenExpertise] = useState<string | null>(
    expertise[0]?.id ?? null,
  );

  const lineIndex = useHeroLineCycle();

  const criticalImages = useMemo(() => {
    const urls = [
      project2?.images?.[0],
      ...workItems.map((item) => item.image),
    ].filter((url): url is string => Boolean(url));
    return urls;
  }, []);

  const imagesReady = useHomeImagesReady(criticalImages);
  useHomeScrollMotion(rootRef, imagesReady);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const heroTextEl = heroTextRef.current;
      if (!heroTextEl) return;

      const hasSeenIntro =
        window.sessionStorage.getItem(ENTRANCE_SESSION_KEY) === "1";

      const revealHero = () => {
        gsap.fromTo(
          heroTextEl.children,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.1,
            // Lag slightly behind the WebGL background reveal.
            delay: 0.4,
            ease: "power3.out",
          },
        );
      };

      if (hasSeenIntro) {
        revealHero();
      } else {
        window.addEventListener(
          "site-enter-complete",
          () => {
            window.setTimeout(revealHero, 120);
          },
          { once: true },
        );
      }
    },
    { scope: rootRef },
  );

  const currentLine = HERO_LINES[lineIndex] ?? HERO_LINES[0];

  return (
    <div ref={rootRef} className="bg-white text-black" data-home-scroll>
      {/* ───────── Hero — pinned full-bleed background + rotating badge ───────── */}
      <section
        data-home-hero
        className="home-hero relative flex min-h-[calc(100vh/var(--page-scale,1))] items-center justify-center overflow-hidden bg-[#f1e9f4] text-black"
      >
        <WebGLHero className="absolute inset-0 h-full w-full" logoSrc={LOGO_SRC} />
        {/* Soft bottom vignette grounds the scroll badge without darkening. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.06]" />

        <div
          ref={heroTextRef}
          data-home-hero-text
          className="relative z-10 flex flex-col items-center px-[10px] text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 font-futura text-[9px] uppercase tracking-[0.28em] text-black/60 l:text-[11px]">
            <span>China</span>
            <span className="text-black/30">/</span>
            <span>Japan</span>
            <span className="text-black/30">/</span>
            <span>Design Studio</span>
          </div>

          <h1 className="home-hero-headline relative mt-[26px] font-futura text-[clamp(2.8rem,9vw,7rem)] font-normal uppercase leading-[0.95] tracking-[-0.04em]">
            {HERO_LINES.map((line, i) => (
              <span
                key={line.lead}
                className="home-hero-line"
                data-active={i === lineIndex}
                aria-hidden={i !== lineIndex}
              >
                <span className="block">{line.lead}</span>
                <span className="block">{line.tail}</span>
              </span>
            ))}
            {/* Spacer keeps layout height stable across line swaps. */}
            <span className="invisible block" aria-hidden="true">
              <span className="block">{currentLine.lead}</span>
              <span className="block">{currentLine.tail}</span>
            </span>
          </h1>
        </div>

        <div
          data-home-hero-badge
          className="pointer-events-none absolute bottom-[36px] left-1/2 z-10 -translate-x-1/2"
        >
          <div className="relative h-[88px] w-[88px] text-black/70 l:h-[104px] l:w-[104px]">
            <RotatingText
              text="SCROLL DOWN · SCROLL DOWN · "
              duration={20}
              className="h-full w-full"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] leading-none">
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* ───────── Selected Work — scroll-reveal staggered list ───────── */}
      <section
        data-home-work
        className="home-section px-[10px] py-[56px] l:mx-auto l:max-w-[1024px] l:px-[16px] l:py-[96px]"
      >
        <div
          data-home-work-head
          className="mb-[40px] flex items-center gap-[14px] l:mb-[64px]"
        >
          <span aria-hidden="true" className="font-futura text-[15px]">
            →
          </span>
          <h2 className="font-futura text-[clamp(1rem,2.2vw,1.5rem)] font-[450] uppercase tracking-[-0.02em]">
            Selected Work
          </h2>
        </div>

        <div className="flex flex-col gap-[64px] l:gap-[120px]">
          {workItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              data-home-work-card
              data-align={i % 2 === 0 ? "left" : "right"}
              className="home-work-card group block"
            >
              <div
                className={`grid items-center gap-[20px] l:grid-cols-12 l:gap-[40px] ${
                  i % 2 === 0 ? "" : "l:[direction:rtl]"
                }`}
              >
                <div className="l:col-span-7 l:[direction:ltr]">
                  <div
                    data-home-work-frame
                    className="relative aspect-[4/3] overflow-hidden bg-[#e8e8e8] l:aspect-[16/11]"
                  >
                    <div
                      data-home-work-img
                      className="absolute inset-[-6%] will-change-transform"
                    >
                      {item.image ? (
                        <HomeScrollImage src={item.image} alt={item.title} />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div
                  data-home-work-meta
                  className="l:col-span-5 l:[direction:ltr]"
                >
                  <div className="flex items-baseline gap-[12px]">
                    <span className="font-futura text-[11px] tracking-[0.12em] text-black/40">
                      {item.index}
                    </span>
                    <span className="font-futura text-[9px] uppercase tracking-[0.18em] text-black/45 l:text-[10px]">
                      {item.category} · {item.year}
                    </span>
                  </div>
                  <h3 className="mt-[12px] font-futura text-[clamp(1.7rem,4.4vw,3.2rem)] uppercase leading-[1.02] tracking-[-0.03em] transition-opacity duration-500 group-hover:opacity-60">
                    {item.title}
                  </h3>
                  <ul className="mt-[18px] flex flex-wrap gap-x-[10px] gap-y-[6px] font-futura text-[9px] uppercase tracking-[0.04em] text-black/55 l:text-[10px]">
                    {item.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full border border-black/15 px-[12px] py-[5px]"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                  <span className="home-view-link mt-[24px] inline-flex items-center gap-2 font-futura text-[9px] uppercase tracking-[0.14em] text-black transition-opacity duration-500 group-hover:opacity-50 l:text-[10px]">
                    View Project
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-[56px] flex justify-center l:mt-[88px]">
          <Link
            href="/works"
            className="home-view-link inline-flex items-center gap-3 border-b border-black/30 pb-[6px] font-futura text-[11px] uppercase tracking-[0.16em] transition-opacity duration-500 hover:opacity-50 l:text-[13px]"
          >
            All Works
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ───────── Manifesto — rotating emblem + statement ───────── */}
      <section
        data-home-manifesto
        className="home-section relative overflow-hidden bg-black px-[10px] py-[100px] text-white l:px-0 l:py-[160px]"
      >
        <div className="l:mx-auto l:flex l:max-w-[1024px] l:items-center l:gap-[64px] l:px-[16px]">
          <div
            data-home-manifesto-emblem
            className="relative mx-auto mb-[48px] h-[180px] w-[180px] shrink-0 l:mx-0 l:mb-0 l:h-[260px] l:w-[260px]"
          >
            <div className="absolute inset-0 text-white/55">
              <RotatingText
                text="THE HEART OF 2CUBES · CONNECTION · "
                duration={26}
                className="h-full w-full"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src={LOGO_SRC}
                alt="2cubes emblem"
                width={72}
                height={95}
                className="h-auto w-[44px] opacity-90 invert l:w-[60px]"
              />
            </div>
          </div>

          <div data-home-manifesto-copy className="max-w-[560px]">
            <p className="font-futura text-[9px] uppercase tracking-[0.22em] text-white/45 l:text-[10px]">
              Philosophy
            </p>
            <h2 className="mt-[20px] font-futura text-[clamp(1.8rem,4.6vw,3.4rem)] uppercase leading-[1.06] tracking-[-0.03em]">
              Connection, beyond deliverables.
            </h2>
            <p className="mt-[24px] font-['Helvetica_Neue',_sans-serif] text-[11px] leading-[1.9] tracking-[-0.02em] text-white/80 l:text-[13px]">
              The people behind each project are not simply makers — they express
              a way of thinking and living. 2cubes exists not only to present
              outcomes, but to share the philosophy behind them, across craft,
              art, and culture.
            </p>
            <Link
              href="/about"
              className="home-view-link mt-[32px] inline-flex items-center gap-2 border-b border-white/30 pb-[6px] font-futura text-[10px] uppercase tracking-[0.16em] text-white transition-opacity duration-500 hover:opacity-60 l:text-[12px]"
            >
              About the Studio
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Tiles — diagonal image marquee ───────── */}
      {tileImages.length > 0 ? (
        <section
          data-home-tiles
          className="home-section relative overflow-hidden bg-[#0a0a0a] py-[120px] l:py-[180px]"
        >
          <div
            data-home-tiles-track
            className="home-tiles-track flex w-max gap-[18px] will-change-transform"
          >
            {[...tileImages, ...tileImages].map((src, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee tiles have no stable id
                key={`tile-${i}`}
                className="relative h-[200px] w-[300px] shrink-0 overflow-hidden bg-[#1a1a1a] l:h-[280px] l:w-[420px]"
              >
                <HomeScrollImage src={src} alt="" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ───────── Expertise — accordion ───────── */}
      <section
        data-home-expertise
        className="home-section px-[10px] py-[80px] l:mx-auto l:max-w-[1024px] l:px-[16px] l:py-[128px]"
      >
        <div className="mb-[40px] flex items-center gap-[14px] l:mb-[56px]">
          <span aria-hidden="true" className="font-futura text-[15px]">
            →
          </span>
          <h2 className="font-futura text-[clamp(1rem,2.2vw,1.5rem)] font-[450] uppercase tracking-[-0.02em]">
            Expertise
          </h2>
        </div>

        <ul className="border-t border-black/15">
          {expertise.map((item, i) => {
            const open = openExpertise === item.id;
            return (
              <li
                key={item.id}
                data-home-expertise-row
                className="border-b border-black/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenExpertise(open ? null : item.id)}
                  className="group flex w-full items-center justify-between gap-4 py-[22px] text-left l:py-[30px]"
                  aria-expanded={open}
                >
                  <span className="flex items-baseline gap-[16px] l:gap-[28px]">
                    <span className="font-futura text-[10px] tracking-[0.12em] text-black/35">
                      0{i + 1}
                    </span>
                    <span className="font-futura text-[clamp(1.4rem,3.6vw,2.6rem)] uppercase leading-none tracking-[-0.03em] transition-opacity duration-500 group-hover:opacity-60">
                      {item.en}
                    </span>
                    <span className="hidden font-['Helvetica_Neue',_sans-serif] text-[11px] text-black/40 s:inline">
                      {item.zh}
                    </span>
                  </span>
                  <span
                    className={`home-acc-sign relative h-[16px] w-[16px] shrink-0 transition-transform duration-500 ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="home-acc-panel grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[620px] pb-[28px] pl-[26px] font-['Helvetica_Neue',_sans-serif] text-[11px] leading-[1.9] tracking-[-0.02em] text-black/65 l:pl-[54px] l:text-[13px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ───────── Contact ───────── */}
      <section
        data-home-contact
        className="home-section relative overflow-hidden bg-black px-[10px] pb-[120px] pt-[100px] text-white l:px-0 l:pb-[160px] l:pt-[140px]"
      >
        <div className="l:mx-auto l:max-w-[1024px] l:px-[16px]">
          <p className="font-futura text-[9px] uppercase tracking-[0.22em] text-white/45 l:text-[10px]">
            Get in touch
          </p>
          <h2
            data-home-contact-title
            className="mt-[20px] font-futura text-[clamp(3rem,12vw,9rem)] font-normal uppercase leading-[0.9] tracking-[-0.04em]"
          >
            Let&apos;s talk
          </h2>

          <a
            href="mailto:contact@2cubes.cn"
            className="home-view-link mt-[28px] inline-flex items-center gap-3 border-b border-white/30 pb-[6px] font-futura text-[clamp(0.9rem,2vw,1.3rem)] tracking-[-0.01em] transition-opacity duration-500 hover:opacity-60"
          >
            contact@2cubes.cn
            <span aria-hidden="true">→</span>
          </a>

          <div className="mt-[72px] grid gap-[40px] s:grid-cols-2 l:mt-[96px] l:grid-cols-[1fr_1fr_auto] l:gap-[48px]">
            {offices.map((office) => (
              <div key={office.city}>
                <p className="font-futura text-[9px] uppercase tracking-[0.2em] text-white/45 l:text-[10px]">
                  {office.city} · {office.cityZh}
                </p>
                <div className="mt-[14px] space-y-[4px] font-['Helvetica_Neue',_sans-serif] text-[11px] leading-[1.7] text-white/75 l:text-[12px]">
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="font-futura text-[9px] uppercase tracking-[0.2em] text-white/45 l:text-[10px]">
                Follow
              </p>
              <ul className="mt-[14px] space-y-[8px]">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="home-view-link inline-flex items-center font-futura text-[11px] uppercase tracking-[0.06em] text-white/80 transition-opacity duration-500 hover:opacity-60 l:text-[12px]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
