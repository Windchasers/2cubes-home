"use client";

import { useId } from "react";

type RotatingTextProps = {
  text: string;
  className?: string;
  /** Diameter of the SVG viewBox; text sits on a circle inside it. */
  size?: number;
  /** Seconds for one full rotation. */
  duration?: number;
  reverse?: boolean;
};

/**
 * Circular text that spins continuously — used for the hero "scroll" badge
 * and the manifesto emblem (mirrors monopo.vn's rotating type marks).
 */
export default function RotatingText({
  text,
  className = "",
  size = 100,
  duration = 18,
  reverse = false,
}: RotatingTextProps) {
  const rawId = useId();
  const pathId = `rot-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const r = size / 2 - 2;
  const c = size / 2;

  return (
    <span
      className={`home-rot-spin inline-block ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        <defs>
          <path
            id={pathId}
            fill="none"
            d={`M ${c},${c} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text className="home-rot-text">
          <textPath href={`#${pathId}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
    </span>
  );
}
