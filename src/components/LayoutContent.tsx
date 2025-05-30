'use client';

import React from 'react';
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-8">
        <div className="flex justify-between items-center">
          <div className="logo-nav p-2">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <span className="text-3xl font-bold">vansion</span>
            </a>
            {/* <span id="random" className="ml-2 text-4xl font-bold">design</span> */}
          </div>

          <Navigation />
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="mt-auto">
        <div className="container mx-auto px-6">
          <div className="footerinfo">
            <p className="text-sm">info@vansion.cn&nbsp;&nbsp;{t('footer.tel')}: 020-89636400</p>
          </div>
        </div>
      </footer>
    </div>
  );
}