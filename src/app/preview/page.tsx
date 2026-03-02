import Footer from '@/components/Footer';
import projectsData from '@/data/projects.json';
import { getProjectRouteParam } from '@/lib/projectData';
import Image from 'next/image';
import Link from 'next/link';

export default function PreviewPage() {
  const projects = projectsData.projects; // Removed slice to show all projects in preview

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="w-full px-[10px] pt-0 pb-10 s:pb-14 l:px-[16px]">
        <div className="grid grid-cols-1 s:grid-cols-2 m:grid-cols-3 gap-[10px]">
          {projects.map((p) => {
            const img = p.thumbnail || p.images?.[0];
            const routeParam = getProjectRouteParam(p.id);
            return (
              <Link key={p.id} href={`/projects/${routeParam}`} className="block group">
                <div className="relative w-full aspect-[4/3] bg-neutral-300">
                  {img && (
                    <Image
                      src={img}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={p.id === 1}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
}
