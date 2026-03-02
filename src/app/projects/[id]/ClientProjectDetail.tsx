"use client";

import Footer from "@/components/Footer";
import { getProjectDetailByRouteParam } from "@/lib/projectData";
import type { Project } from "@/types/project";

interface ClientProjectDetailProps {
  routeParam: string;
}

const ClientProjectDetail = ({ routeParam }: ClientProjectDetailProps) => {
  const project: Project | undefined = getProjectDetailByRouteParam(routeParam);

  if (!project) {
    return <div className="container mx-auto p-6 pt-16">Project not found</div>;
  }

  const titleEn = (project.titleEn || project.title).toUpperCase();
  const titleZh = project.title;
  const category = project.category;
  const servicesLabel = project.services?.join(" / ") || "";
  const descriptionZh = project.description;
  const descriptionEn = project.descriptionEn || "";
  const ad = project.ad || "2cubes";
  const designer = project.designer || "2cubes";
  const images = project.images || [];

  return (
    <div className="w-full bg-white text-black">
      <div className="w-full px-[10px] l:px-[16px] pt-10 s:pt-12 l:pt-[50px] pb-10 l:pb-[35px] l:-mt-[46px]">
        <div className="grid grid-cols-1 l:grid-cols-12 gap-x-[18px] gap-y-5 font-futura text-black tracking-[-0.03em]">
          <div className="l:col-span-4">
            <h1 className="text-[48px] s:text-[58px] l:text-[62px] leading-[0.95] uppercase">
              {titleEn}
            </h1>
            <p className="mt-[8px] text-[30px] s:text-[34px] l:text-[54px] leading-[1]">
              {titleZh}
            </p>
          </div>

          <p className="l:col-span-4 text-[12px] l:text-[9px] leading-[1.7] l:leading-[16px]">
            {descriptionZh}
          </p>

          <p className="l:col-span-4 text-[16px] l:text-[13px] leading-[1.7] l:leading-[20px]">
            {descriptionEn}
          </p>
        </div>

        <div className="mt-[16px] grid grid-cols-1 l:grid-cols-12 gap-x-[18px] gap-y-[4px] text-[14px] l:text-[11px] leading-[1.5] l:leading-[16px] tracking-[-0.03em] text-black">
          <div className="l:col-span-4">
            {project.year} / {category} / {servicesLabel}
          </div>
          <div className="l:col-span-4">CL : {project.client}</div>
          <div className="l:col-span-4 space-y-[2px]">
            <p>AD : {ad}</p>
            <p>D : {designer}</p>
          </div>
        </div>

        <div className="mt-[12px] space-y-[12px]">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="w-full bg-[#d9d9d9]">
              <img
                src={image}
                alt={`${project.title} ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="block w-full h-auto"
              />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ClientProjectDetail;
