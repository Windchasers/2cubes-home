'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // 全局强制启用滚动功能
  useEffect(() => {
    // 确保在组件挂载后启用滚动
    document.body.style.overflow = 'auto';
    
    // 添加路由变化监听器，确保在每次路由变化后启用滚动
    const enableScroll = () => {
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        console.log('Global scroll enabled by route change');
      }, 500);
    };
    
    // 监听路由变化事件
    window.addEventListener('popstate', enableScroll);
    
    return () => {
      window.removeEventListener('popstate', enableScroll);
    };
  }, []);

  // Close menu when route changes and ensure body scroll is restored
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      // Ensure body scroll is restored when navigating between pages
      document.body.style.overflow = 'auto';
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Also handle Next.js client-side navigation
    const handleClick = () => {
      // 强制设置body滚动为可用，无论菜单状态如何
      // 增加延迟时间以确保导航完成后再启用滚动
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        console.log('Navigation complete: scroll enabled');
      }, 300);
    };
    
    // Add click event listeners to all internal links
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => link.addEventListener('click', handleClick));
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, [isOpen]);

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
                <Link href="/" onClick={() => setIsOpen(false)}>vansion_</Link>
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
                    onClick={() => {
                      setIsOpen(false);
                      // 确保在导航到主页时恢复滚动
                      document.body.style.overflow = 'auto';
                      // 增加延迟以确保导航完成后再次设置滚动状态
                      setTimeout(() => {
                        document.body.style.overflow = 'auto';
                        console.log('Home page navigation: scroll enabled');
                      }, 300);
                    }}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    {t('navigation.design')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => {
                      setIsOpen(false);
                      // 确保在导航到about页面时恢复滚动
                      document.body.style.overflow = 'auto';
                      // 增加延迟以确保导航完成后再次设置滚动状态
                      setTimeout(() => {
                        document.body.style.overflow = 'auto';
                        console.log('About page navigation: scroll enabled');
                      }, 300);
                    }}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    {t('navigation.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => {
                      setIsOpen(false);
                      // 确保在导航到联系页面时恢复滚动
                      document.body.style.overflow = 'auto';
                      // 增加延迟以确保导航完成后再次设置滚动状态
                      setTimeout(() => {
                        document.body.style.overflow = 'auto';
                        console.log('Contact page navigation: scroll enabled');
                      }, 300);
                    }}
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
