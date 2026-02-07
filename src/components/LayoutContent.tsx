'use client';

import type React from 'react';
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PageScale from '@/components/PageScale';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isScaled = true;
  const isLightHeader = !isHome;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <CustomCursor />
      <header className={`fixed top-0 left-0 right-0 z-[100] px-[10px] pt-6 s:pt-8 l:px-0 l:pt-[10px] pointer-events-none ${isHome ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
        <div className={`${isScaled ? 'page-scale-header-wrap' : ''} pointer-events-auto`}>
          <div className={`flex items-center justify-between l:mx-auto l:w-[1024px] l:px-[16px] ${isHome ? 'text-white' : 'text-black'} ${isScaled ? 'page-scale-header' : ''}`}>
          <div className="logo-nav">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-flex items-baseline gap-1 font-futura font-[450] cursor-pointer tracking-[-0.03em]">
              <span className="text-[9px] s:text-[7px] m:text-[1.171875vw] l:text-[12px] leading-none">2cubes</span>
              <span className="text-[9px] s:text-[7px] m:text-[1.171875vw] l:text-[12px] opacity-80 leading-none">design</span>
            </Link>
          </div>

          <div className={isHome ? "[&_a]:!text-white [&_button]:!text-white [&_span]:!text-white" : ""}>
            <Navigation />
          </div>
          </div>
        </div>
      </header>

      <main className={`${isHome ? '' : 'pt-24'} flex-grow`}>
        {isScaled ? <PageScale>{children}</PageScale> : children}
      </main>

    </div>
  );
}
