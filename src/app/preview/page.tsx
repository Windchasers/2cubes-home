import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';

export default function PreviewPage() {
  const projects = projectsData.projects;

  const getImage = (project: (typeof projects)[number]) => {
    return project.thumbnail || (project.images && project.images[0]) || undefined;
  };

  return (
    <div className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-10 sm:py-14">
        {/* 响应式项目网格：可滚动，块可点击 */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {projects.map((p) => {
            const img = getImage(p);
            return (
              <div key={p.id} className="col-span-12 md:col-span-4">
                <Link href={`/projects/${p.id}`} className="block group">
                  <div className="relative w-full aspect-[4/3] bg-neutral-700">
                    {img && (
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 480px"
                        priority={p.id === 1}
                      />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}