'use client';

import { useState } from 'react';
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
  image: `https://placehold.co/600x400/e2e2e2/white?text=Project+${i + 1}`,
}));

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
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
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
