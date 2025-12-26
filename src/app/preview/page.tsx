import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';

export default function PreviewPage() {
  const projects = projectsData.projects; // Removed slice to show all projects in preview

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="w-full px-[30px] py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {projects.map((p) => {
            const img = p.thumbnail || p.images?.[0];
            return (
              <Link key={p.id} href={`/projects/${p.id}`} className="block group">
                <div className="relative w-full aspect-[4/3] bg-neutral-300">
                  {img && (
                    <Image
                      src={img}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={p.id === 1}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-10 text-[20px] text-gray-600">
          <div>@ 2cubesDesign.com</div>
          <div>China & Japan</div>
        </div>
      </div>
    </div>
  );
}
