'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const toggleMenu = () => {
    console.log('toggleMenu called, current isOpen:', isOpen);
    
    // Force state update with a callback to ensure it's applied
    setIsOpen(prevState => {
      const newState = !prevState;
      console.log('isOpen set to:', newState);
      
      // Toggle body scroll
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      
      return newState;
    });
  };

  // 切换语言函数
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // 添加媒体查询样式到组件
  useEffect(() => {
    // 创建样式元素
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (max-width: 640px) {
        .language-switcher {
          top: 4rem !important;
          right: 6px !important;
        }
      }
    `;
    // 添加到文档头部
    document.head.appendChild(styleEl);

    // 清理函数
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <>
      {/* 语言切换按钮 */}
      <div 
        className="cursor-pointer fixed top-6 right-20 z-50 bg-transparent p-2 flex space-x-1 language-switcher" 
        style={{ width: '60px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <span 
          className={`text-sm font-medium ${language === 'zh' ? 'text-black' : 'text-gray-400 hover:text-blue-500'} transition-colors duration-200`}
          onClick={() => setLanguage('zh')}
        >
          ZH
        </span>
        <span className="text-sm">/</span>
        <span 
          className={`text-sm font-medium ${language === 'en' ? 'text-black' : 'text-gray-400 hover:text-blue-500'} transition-colors duration-200`}
          onClick={() => setLanguage('en')}
        >
          EN
        </span>
      </div>

      <div 
        className="cursor-pointer fixed top-6 right-6 z-50 bg-transparent p-2" 
        onClick={toggleMenu}
        style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          src={isOpen ? "/images/close.svg" : "/images/menu_icon.svg"}
          alt="Menu"
          className="menu-icon w-full h-full"
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 fade-in">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-10">
              <div className="head-text entitle">
                <Link href="/" onClick={() => setIsOpen(false)}>2cubes_</Link>
                <span>design</span>
              </div>
              <div className="cursor-pointer" onClick={toggleMenu}>
                <span className="text-2xl">&times;</span>
              </div>
            </div>

            <div className="nav-list">
              <ul>
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    {t('navigation.design')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    {t('navigation.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    {t('navigation.contact')}
                  </Link>
                </li>
                <li className="mt-6">
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage('zh');
                      }}
                      className={`text-lg ${language === 'zh' ? 'font-bold' : 'text-gray-500'}`}
                    >
                      {t('language.zh')}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage('en');
                      }}
                      className={`text-lg ${language === 'en' ? 'font-bold' : 'text-gray-500'}`}
                    >
                      {t('language.en')}
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
