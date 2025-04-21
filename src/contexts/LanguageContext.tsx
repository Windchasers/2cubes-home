'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// 同步导入所有翻译文件
import zhTranslations from '../locales/zh.json';
import enTranslations from '../locales/en.json';

// 定义支持的语言类型
export type Language = 'zh' | 'en';

// 定义语言上下文的类型
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供器组件的属性类型
type LanguageProviderProps = {
  children: ReactNode;
};

// 语言提供器组件
export function LanguageProvider({ children }: LanguageProviderProps) {
  // 从本地存储中获取语言设置，默认为中文
  const [language, setLanguage] = useState<Language>('zh');
  
  // 初始化翻译文件，同步包含所有语言翻译
  const [translations] = useState<Record<string, Record<string, string>>>({ 
    zh: zhTranslations,
    en: enTranslations
  });

  // 初始化时从本地存储加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 当语言变化时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // 翻译函数
  const t = (key: string): string => {
    // 如果当前语言的翻译不存在，回退到中文
    const currentLang = translations[language] ? language : 'zh';
    
    // 处理嵌套的键值，如 'categories.all'
    const keys = key.split('.');
    let value = translations[currentLang];
    
    // 遍历键路径
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 如果在任何层级找不到键，返回原始键名作为回退
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // 提供上下文值
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// 自定义钩子，用于在组件中访问语言上下文
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}