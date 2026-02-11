"use client";

import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getCategoryName,
  getLocalizedProjectDetailById,
  getProjectById,
  getProjectDetailById,
} from "@/lib/projectData";
import type { Project } from "@/types/project";

interface ClientProjectDetailProps {
  id: string;
}

const ClientProjectDetail = ({ id }: ClientProjectDetailProps) => {
  const { language } = useLanguage();
  const localizedProject: Project | undefined = getLocalizedProjectDetailById(
    id,
    language,
  );
  const baseProject: Project | undefined = getProjectById(id);
  const project: Project | undefined = localizedProject ?? baseProject;
  const rawProject: Project | undefined =
    getProjectDetailById(id) ?? baseProject;

  if (!project) {
    return <div className="container mx-auto p-6 pt-16">Project not found</div>;
  }

  const displayProject = rawProject ?? project;
  const titleEn = displayProject.titleEn || displayProject.title;
  const subtitleZh = displayProject.subtitle;
  const descriptionZh = displayProject.description;
  const descriptionEn =
    displayProject.descriptionEn || displayProject.description;
  const servicesLabel = displayProject.services?.join(" / ") || "";
  const categoryName = getCategoryName(displayProject.category);
  const content = project.content ?? [];
  const images = project.images ?? [];

  // 使用真实项目数据或占位图
  const mainImageUrl =
    project.images[0] ||
    `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Main+Image`;
  const detail1ImageUrl =
    project.images[1] ||
    `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Detail+1`;
  const detail2ImageUrl =
    project.images[2] ||
    `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Detail+2`;
  const hasVideo = project.videos && project.videos.length > 0;
  const videoUrl = hasVideo ? project.videos[0] : null;

  return (
    <div className="w-full">
      {/* XS / S / M Layout */}
      <div className="block l:hidden px-[10px] pt-16">
        {/* 视频或主图展示 - 全屏宽度 */}
        <div className="mb-12 w-full max-w-none">
          {hasVideo ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
              poster={mainImageUrl}
            />
          ) : (
            <img
              src={mainImageUrl}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        <div className="flex flex-col m:flex-row gap-12">
          {/* 左侧：项目标题和基本信息 */}
          <div className="w-full m:w-1/4">
            <h1 className="text-3xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl mb-8 text-gray-600">{project.subtitle}</p>

            <div className="mb-6">
              <h3 className="text-sm text-gray-500 mb-1">Client</h3>
              <p className="font-medium">{project.client}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm text-gray-500 mb-1">Services</h3>
              <p className="font-medium">{project.services.join(", ")}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm text-gray-500 mb-1">Year</h3>
              <p className="font-medium">{project.year}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm text-gray-500 mb-1">Category</h3>
              <p className="font-medium">{project.category}</p>
            </div>

            {project.detailedInfo?.duration && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-500 mb-1">Duration</h3>
                <p className="font-medium">{project.detailedInfo.duration}</p>
              </div>
            )}

            {project.detailedInfo?.location && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-500 mb-1">Location</h3>
                <p className="font-medium">{project.detailedInfo.location}</p>
              </div>
            )}

            {project.detailedInfo?.teamMembers &&
              project.detailedInfo.teamMembers.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm text-gray-500 mb-1">Team</h2>
                  <div className="space-y-2">
                    {project.detailedInfo.teamMembers.map((member) => (
                      <div key={`${member.name}-${member.role}`}>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* 右侧：详细描述和内容 */}
          <div className="w-full m:w-3/4">
            <p className="mb-8 text-lg">{project.description}</p>

            {content.map((paragraph) => (
              <p key={paragraph} className="mb-6">
                {paragraph}
              </p>
            ))}

            {project.detailedInfo && (
              <div className="mt-12">
                {/* 合并challenge内容 */}
                <p className="mb-8">{project.detailedInfo.challenge}</p>

                {/* 合并solution内容 */}
                <p className="mb-8">{project.detailedInfo.solution}</p>

                {/* 合并process内容 */}
                {project.detailedInfo.process.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 mb-8">
                    {project.detailedInfo.process.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                )}

                {/* 合并results内容 */}
                <p className="mb-8">{project.detailedInfo.results}</p>

                {/* 保留testimonial */}
                {project.detailedInfo.testimonial && (
                  <div className="bg-gray-50 p-6 mb-8 border-l-4 border-gray-300">
                    <p className="italic mb-4">
                      "{project.detailedInfo.testimonial.quote}"
                    </p>
                    <p className="font-bold">
                      {project.detailedInfo.testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {project.detailedInfo.testimonial.position}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 图片网格展示 - 全屏宽度 */}
            <div className="grid grid-cols-1 m:grid-cols-2 gap-6 mt-12 w-full max-w-none">
              {images.slice(1, 5).map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.title} - Detail ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              ))}
            </div>

            {/* 额外图片展示 - 全屏宽度 */}
            {images.length > 5 && (
              <div className="mt-12 w-full max-w-none">
                {images.slice(5).map((image, index) => (
                  <div key={image} className="mb-8 w-full max-w-none">
                    <img
                      src={image}
                      alt={`${project.title} - Additional ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>

      {/* L Layout */}
      <div className="hidden l:block">
        <div className="w-full px-[10px] l:px-[16px] l:pt-[50px] l:pb-[35px] l:-mt-[46px]">
          <div className="grid grid-cols-12 gap-x-[18px] font-futura text-black">
            <div className="col-span-4">
              <h1 className="text-[44px] leading-[1] tracking-[-0.03em] uppercase">
                {titleEn}
              </h1>
              <p className="mt-[6px] text-[26px] leading-[1.2] tracking-[-0.03em]">
                {subtitleZh}
              </p>
            </div>
            <div className="col-span-5 text-[9px] leading-[16px] tracking-[-0.03em]">
              {descriptionZh}
            </div>
            <div className="col-span-3 text-[9px] leading-[16px] tracking-[-0.03em]">
              {descriptionEn}
            </div>
          </div>

          <div className="mt-[18px] grid grid-cols-12 text-[7px] leading-[12px] tracking-[-0.03em] text-black">
            <div className="col-span-4">
              {displayProject.year} / {categoryName} / {servicesLabel}
            </div>
            <div className="col-span-5">CL : {displayProject.client}</div>
            <div className="col-span-3 space-y-[2px]">
              <p>AD : 2cubes</p>
              <p>D : 2cubes</p>
            </div>
          </div>

          <div className="mt-[12px] h-[520px] w-full bg-[#d9d9d9]" />
          <div className="mt-[12px] h-[520px] w-full bg-[#d9d9d9]" />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ClientProjectDetail;
