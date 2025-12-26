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
      <ul className="flex flex-wrap items-center gap-8">
        <li>
          <Link href="/works" className="hover:opacity-80 transition-opacity">Works</Link>
        </li>
        <li>
          <Link href="/preview" className="hover:opacity-80 transition-opacity">Preview</Link>
        </li>
        <li>
          <Link href="/news" className="hover:opacity-80 transition-opacity">News</Link>
        </li>
        <li>
          <Link href="/about" className="hover:opacity-80 transition-opacity">Information</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
        </li>
        <li>
          <span className="opacity-60">|</span>
        </li>
        <li>
          <button onClick={toggleLanguage} className="hover:opacity-80 transition-opacity">Language</button>
        </li>
      </ul>
    </nav>
  );
}
