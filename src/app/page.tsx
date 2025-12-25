'use client';

import Image from 'next/image';
import projectsData from '@/data/projects.json';

export default function HomePage() {
  const projects = projectsData.projects;
  const heroSrc = 'https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/projects/4/thumbnail.jpg';

  return (
    <div className="bg-white text-black">
      <section className="relative w-screen h-screen">
        <Image
          src={heroSrc}
          alt="2cubes Design hero"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[20px] text-black">
          <div>@ 2cubesDesign.com</div>·
          <div>China & Japan</div>
        </div>
      </section>
    </div>
  );
}
