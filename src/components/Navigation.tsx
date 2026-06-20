'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <nav className="nav-menu">
      <ul className="flex items-center gap-3 m:gap-8 l:gap-[12px] whitespace-nowrap text-[9px] s:text-[7px] m:text-[1.171875vw] l:text-[12px] tracking-[-0.03em]">
        <li>
          <Link href="/works" className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60">Works</Link>
        </li>
        <li>
          <Link href="/preview" className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60">Preview</Link>
        </li>
        <li>
          <Link href="/news" className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60">News</Link>
        </li>
        <li>
          <Link href="/about" className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60">Information</Link>
        </li>
        <li>
          <Link href="/contact" className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60">Contact</Link>
        </li>
        <li>
          <span className="opacity-60">|</span>
        </li>
        <li>
          <button onClick={toggleLanguage} className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60">Language</button>
        </li>
      </ul>
    </nav>
  );
}
