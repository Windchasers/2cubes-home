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
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 sm:px-8 pt-6 sm:pt-8">
        <div className="flex items-center justify-between">
          <div className="logo-nav">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-flex items-baseline gap-1 font-futura font-[450] cursor-pointer">
              <span className="text-[28px] sm:text-[30px] leading-none">2cubes</span>
              <span className="text-[26px] sm:text-[28px] opacity-80 leading-none">design</span>
            </Link>
          </div>

          <Navigation />
        </div>
      </header>

      <main className={`${isHome ? '' : 'pt-24'} flex-grow`}>{children}</main>

    </div>
  );
}
