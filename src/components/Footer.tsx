"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isInformationPage = pathname === "/about";

  useEffect(() => {
    setMounted(true);
  }, []);

  const commonClasses = `fixed bottom-[10px] left-0 right-0 z-[90] w-full px-[10px] l:px-0 pointer-events-none ${isInformationPage ? "" : "mix-blend-difference"}`;
  const scaleWrapClasses = "page-scale-footer-wrap";
  const innerClasses = `flex justify-between items-center text-[9px] s:text-[7px] m:text-[1.171875vw] l:text-[12px] leading-none font-futura font-[450] tracking-[-0.03em] l:mx-auto l:w-[1024px] l:px-[16px] page-scale-footer ${isInformationPage ? "text-black" : "text-white"}`;

  if (!mounted) return null;

  return createPortal(
    <div className={commonClasses}>
      <div className={scaleWrapClasses}>
        <div className={innerClasses}>
          <div>@ 2cubes.cn</div>
          <div className="text-right">China &amp; Japan</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
