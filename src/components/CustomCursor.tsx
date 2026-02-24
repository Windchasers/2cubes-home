'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Removed spring animation for instant cursor movement
  // const springConfig = { damping: 25, stiffness: 700 };
  // const cursorXSpring = useSpring(cursorX, springConfig);
  // const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (basically non-touch devices)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const ua = navigator.userAgent;
    const detectedSafari =
      /Safari/i.test(ua) &&
      !/Chrome|Chromium|CriOS|Edg|OPR|Brave|FxiOS|Firefox/i.test(ua);
    
    if (!mediaQuery.matches) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      const viewport = window.visualViewport;
      const offsetX = detectedSafari && viewport ? viewport.offsetLeft : 0;
      const offsetY = detectedSafari && viewport ? viewport.offsetTop : 0;

      // Safari zoom/pan: clientX/clientY are visual-viewport relative.
      // Add visualViewport offsets so fixed cursor can continue tracking to the right.
      cursorX.set(e.clientX + offsetX - 15); // Center the cursor (30px width / 2)
      cursorY.set(e.clientY + offsetY - 15); // Center the cursor (30px height / 2)
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-[30px] h-[30px] bg-transparent border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          scale: isClicked ? 0.8 : 1
        }}
        transition={{
          scale: { duration: 0.15, ease: "easeInOut" }
        }}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
