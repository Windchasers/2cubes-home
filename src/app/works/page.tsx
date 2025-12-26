import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '@/data/projects.json';

export default function WorksPage() {
  const projects = projectsData.projects;
  const getCategoryName = (id: string) => {
    const category = projectsData.categories.find((c) => c.id === id);
    return category ? category.name : id;
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="w-full px-6 sm:px-8 py-10 sm:py-14">
        <div className="space-y-32">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col">
              {/* Header: Title & Metadata */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-4 gap-4 lg:gap-0 mix-blend-difference text-white">
                <h2 className="text-4xl sm:text-[60px] font-normal uppercase leading-tight font-['Futura_PT']">
                  {project.title}
                </h2>
                <div className="text-right text-[18px] font-medium font-['Futura_PT']">
                  {project.year} / {getCategoryName(project.category)} / {project.services?.slice(0, 2).join(' & ')}
                </div>
              </div>

              {/* Top Divider */}
              <div className="w-full border-t border-black"></div>

              {/* Content Grid (Between Dividers) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-black">
                {/* Left Column: Description & Arrow */}
                <div className="lg:col-span-2 flex flex-col justify-between h-full min-h-[200px] lg:min-h-0 py-4">
                  <p className="text-sm leading-relaxed text-gray-800 max-w-xs">
                    {project.description}
                  </p>
                  
                  {/* Arrow Button */}
                  <div className="mt-8 lg:mt-0">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center justify-center w-[54px] h-[54px] rounded-full border border-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <ArrowUpRight size={20} strokeWidth={1} />
                    </Link>
                  </div>
                </div>

                {/* Middle Column: Image 1 */}
                <div className="lg:col-span-5">
                   <div className="relative w-full aspect-[600/383] bg-gray-100">
                      {project.images?.[0] ? (
                         <Image
                           src={project.images[0]}
                           alt={project.title}
                           fill
                           className="object-cover"
                           sizes="(max-width: 1024px) 100vw, 40vw"
                         />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                   </div>
                </div>

                {/* Right Column: Image 2 */}
                <div className="lg:col-span-5">
                   <div className="relative w-full aspect-[600/383] bg-gray-100">
                      {project.images?.[1] ? (
                         <Image
                           src={project.images[1]}
                           alt={project.title}
                           fill
                           className="object-cover"
                           sizes="(max-width: 1024px) 100vw, 40vw"
                         />
                      ) : (
                         // Fallback to thumbnail if second image is missing
                         project.thumbnail ? (
                            <Image
                              src={project.thumbnail}
                              alt={project.title}
                              fill
                              className="object-cover opacity-80"
                              sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                         ) : null
                      )}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Footer */}
        <div className="flex justify-between items-end mt-32 text-sm font-medium">
            <div className="flex items-center gap-2">
               <span>@ 2cubes Design.com</span>
            </div>
            <div>China & Japan</div>
        </div>
      </div>
    </div>
  );
}
