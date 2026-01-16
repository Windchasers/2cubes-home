'use client';

import type React from 'react';
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <CustomCursor />
      <header className="fixed top-0 left-0 right-0 z-[100] px-[10px] pt-6 s:pt-8 pointer-events-none mix-blend-difference">
        <div className="flex items-center justify-between text-white pointer-events-auto">
          <div className="logo-nav">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-flex items-baseline gap-1 font-futura font-[450] cursor-pointer text-white">
              <span className="text-[9px] s:text-[7px] m:text-[1.171875vw] leading-none">2cubes</span>
              <span className="text-[9px] s:text-[7px] m:text-[1.171875vw] opacity-80 leading-none">design</span>
            </Link>
          </div>

          <div className="[&_a]:!text-white [&_button]:!text-white [&_span]:!text-white">
            <Navigation />
          </div>
        </div>
      </header>

      <main className={`${isHome ? '' : 'pt-24'} flex-grow`}>{children}</main>

    </div>
  );
}
