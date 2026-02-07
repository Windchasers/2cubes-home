'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';

export default function PageScale({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current || !innerRef.current) return;

      const baseWidth = 1024;
      const vw = window.innerWidth;
      const scale = vw >= baseWidth ? vw / baseWidth : 1;

      document.documentElement.style.setProperty('--page-scale', String(scale));
      outerRef.current.style.setProperty('--page-scale', String(scale));

      const rawHeight = innerRef.current.scrollHeight;
      outerRef.current.style.height = `${rawHeight * scale}px`;
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    if (innerRef.current) resizeObserver.observe(innerRef.current);
    window.addEventListener('resize', update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
      document.documentElement.style.setProperty('--page-scale', '1');
    };
  }, []);

  return (
    <div ref={outerRef} className="page-scale-wrap">
      <div ref={innerRef} className="page-scale">
        {children}
      </div>
    </div>
  );
}
