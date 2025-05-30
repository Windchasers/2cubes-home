'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

import { getAllProjects, getAllCategories } from '@/lib/projectData';

// 获取真实项目数据和分类
const categoryIds = getAllCategories().map(category => category.id);
const projects = getAllProjects();

// 为项目添加占位图
const projectsWithFallback = projects.map(project => ({
  ...project,
  imageFallback: `https://placehold.co/600x400/e2e2e2/white?text=Project+${project.id}`
}));

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projectsWithFallback
    : projectsWithFallback.filter(project => project.category === activeCategory);

  return (
    <div className="container mx-auto p-6 pt-16">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">{t('projectType')}</div>
        <div className="flex flex-wrap gap-4">
          {categoryIds.map((categoryId) => (
            <button
              key={categoryId}
              className={`text-sm ${
                activeCategory === categoryId ? 'font-bold' : 'text-gray-600'
              }`}
              onClick={() => setActiveCategory(categoryId)}
            >
              {t(`categories.${categoryId}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="bg-gray-200 aspect-square hover:opacity-90 transition-opacity">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 如果图片加载失败，使用占位图
                  e.currentTarget.src = project.imageFallback;
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
