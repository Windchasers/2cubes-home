import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';
import Footer from '@/components/Footer';

export default function PreviewPage() {
  const projects = projectsData.projects; // Removed slice to show all projects in preview

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="w-full px-[10px] py-10 s:py-14">
        <div className="grid grid-cols-1 s:grid-cols-2 m:grid-cols-3 gap-[10px]">
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
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={p.id === 1}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <Footer className="mt-10 text-gray-600" />
      </div>
    </div>
  );
}
