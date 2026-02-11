import Footer from "@/components/Footer";
import projectsData from "@/data/projects.json";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WorksPage() {
  const projects = projectsData.projects;
  const categoryEnglishMap: Record<string, string> = {
    all: "All",
    branding: "Branding",
    web: "Web",
    installation: "Installation",
    curation: "Curation",
    digital: "Digital",
    exhibition: "Exhibition",
    books: "Books",
    environment: "Environment",
    animation: "Animation",
  };

  const serviceEnglishMap: Record<string, string> = {
    品牌设计: "Brand Design",
    视觉识别系统: "Visual Identity System",
    营销物料: "Marketing Collateral",
    网站设计: "Web Design",
    用户体验: "UX",
    前端开发: "Frontend Development",
    装置设计: "Installation Design",
    交互设计: "Interaction Design",
    技术实现: "Technical Implementation",
    展览策划: "Exhibition Curation",
    艺术家协调: "Artist Coordination",
    展览设计: "Exhibition Design",
    数字艺术: "Digital Art",
    编程: "Programming",
    视觉设计: "Visual Design",
    书籍设计: "Book Design",
    排版: "Typography",
    封面设计: "Cover Design",
  };

  const getCategoryName = (id: string) => categoryEnglishMap[id] || id;
  const getServiceName = (service: string) =>
    serviceEnglishMap[service] || service;

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="w-full px-[10px] py-10 l:px-[16px] l:pt-[50px] l:pb-[35px] l:-mt-[46px]">
        <div className="flex flex-col gap-[10px]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col pb-[10px] border-b-[0.5px] border-black last:border-0"
            >
              {/* Header: Title & Metadata */}
              <div className="flex flex-col m:flex-row m:justify-between m:items-end mb-[10px]">
                <h2 className="text-[26px] m:text-[34px] l:text-[48px] font-normal leading-tight m:leading-none l:leading-[42px] tracking-[-0.03em] font-futura uppercase">
                  VISION DESIGN
                </h2>
                {/* Metadata shown here on M and Large screens */}
                <div className="hidden m:block text-[7px] font-medium leading-[7px] text-right font-['Helvetica_Neue',_sans-serif]">
                  {project.year} / {getCategoryName(project.category)} /{" "}
                  {project.services
                    ?.slice(0, 2)
                    .map(getServiceName)
                    .join(" & ")}
                </div>
              </div>

              {/* Content Grid: Description & Images */}
              {/* layout changes:
                    XS: 1 col (Desc, Img1)
                    S:  1 col (Desc), then 2 cols (Img1, Img2) below
                    M/L:  3 cols (Desc, Img1, Img2) side-by-side
                */}
              <div className="grid grid-cols-1 m:grid-cols-3 gap-[10px]">
                {/* Col 1: Description */}
                <div className="text-[9px] s:text-[10px] m:text-[7px] l:text-[9px] font-normal leading-[16px] font-['Helvetica_Neue',_sans-serif] mb-[10px] m:mb-0">
                  <p className="max-w-full l:max-w-[324px]">
                    Illusion Architecture, a pioneering studio based in Nanning,
                    embraces the philosophy of a “dialogue between space and
                    perception.” Its visual identity draws inspiration from
                    water ripples—symbols of spatial extension, energy flow, and
                    infinite design possibilities.
                  </p>
                </div>

                {/* XS/S View of Images (Hidden on M+) */}
                <div className="grid grid-cols-1 s:grid-cols-2 gap-[10px] m:hidden">
                  <div className="relative w-full aspect-[324/201.5] s:aspect-[219/128] bg-[#D9D9D9]">
                    {project.images?.[0] && (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 480px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  {/* Image 2 hidden on XS, shown on S */}
                  <div className="hidden s:block relative w-full aspect-[219/128] bg-[#D9D9D9]">
                    {project.images?.[1] ? (
                      <Image
                        src={project.images[1]}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    ) : project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80"
                        sizes="50vw"
                      />
                    ) : null}
                  </div>
                </div>

                {/* M/L View of Images (Hidden on XS/S) */}
                <div className="hidden m:block relative w-full aspect-[324/201.5] bg-[#D9D9D9]">
                  {project.images?.[0] && (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  )}
                </div>
                <div className="hidden m:block relative w-full aspect-[324/201.5] bg-[#D9D9D9]">
                  {project.images?.[1] ? (
                    <Image
                      src={project.images[1]}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  ) : project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80"
                      sizes="33vw"
                    />
                  ) : null}
                </div>
              </div>

              {/* Metadata shown at bottom only on XS/S screens */}
              <div className="m:hidden mt-[10px] text-[7px] font-medium leading-[7px] font-['Helvetica_Neue',_sans-serif]">
                {project.year} / {getCategoryName(project.category)} /{" "}
                {project.services?.slice(0, 2).map(getServiceName).join(" & ")}
              </div>
            </div>
          ))}
        </div>

        {/* Page Footer */}
        <Footer />
      </div>
    </div>
  );
}
