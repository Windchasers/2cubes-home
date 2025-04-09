'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock project categories
const categories = [
  { id: 'all', name: 'all' },
  { id: 'branding', name: 'branding' },
  { id: 'web', name: 'web' },
  { id: 'installation', name: 'installation' },
  { id: 'curation', name: 'curation' },
  { id: 'digital', name: 'digital' },
  { id: 'exhibition', name: 'exhibition' },
  { id: 'books', name: 'books' },
  { id: 'environment', name: 'environment' },
  { id: 'animation', name: 'animation' },
];

// Mock projects
const projects = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  category: categories[Math.floor(Math.random() * categories.length)].id,
  // 使用新的图片引用规范 - 缩略图路径
  image: `/images/projects/${i + 1}/thumbnail.jpg`,
  // 如果图片不存在，使用占位图
  imageFallback: `https://placehold.co/600x400/e2e2e2/white?text=Project+${i + 1}`,
}));

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [randomWord, setRandomWord] = useState('design');

  // This effect simulates the random word change on the original site
  useEffect(() => {
    const words = ['design', 'creative', 'studio', 'lab'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      setRandomWord(words[currentIndex]);

      // Also update the random word in the header
      const randomElement = document.getElementById('random');
      if (randomElement) {
        randomElement.textContent = words[currentIndex];
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto p-6 pt-16">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">project type</div>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`text-sm ${
                  activeCategory === category.id ? 'font-bold' : 'text-gray-600'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
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

      <div className="fixed-footer">
        <div className="container mx-auto px-6">
          <div className="footerinfo">
            <p className="text-sm">contact us: info@another-lab.com&nbsp;&nbsp;tel: 020-89636400</p>
          </div>
        </div>
      </div>
    </div>
  );
}
