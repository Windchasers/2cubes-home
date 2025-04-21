'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock project categories
const categoryIds = [
  'all',
  'branding',
  'web',
  'installation',
  'curation',
  'digital',
  'exhibition',
  'books',
  'environment',
  'animation',
];

// Mock projects
const projects = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  category: categoryIds[Math.floor(Math.random() * categoryIds.length)],
  image: `https://placehold.co/600x400/e2e2e2/white?text=Project+${i + 1}`,
}));

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

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
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
