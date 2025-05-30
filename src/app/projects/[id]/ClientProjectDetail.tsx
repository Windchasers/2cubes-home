'use client';

import { Project } from '@/types/project';
import { getLocalizedProjectDetailById } from '@/lib/projectData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface ClientProjectDetailProps {
  id: string;
}

const ClientProjectDetail = ({ id }: ClientProjectDetailProps) => {
  const { language } = useLanguage();
  const project: Project | undefined = getLocalizedProjectDetailById(id, language);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  
  if (!project) {
    return <div className="container mx-auto p-6 pt-16">Project not found</div>;
  }
  
  // 使用真实项目数据或占位图
  const mainImageUrl = project.images[0] || `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Main+Image`;
  const detail1ImageUrl = project.images[1] || `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Detail+1`;
  const detail2ImageUrl = project.images[2] || `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Detail+2`;
  const hasVideo = project.videos && project.videos.length > 0;
  // 确保视频URL是有效的，优先使用本地视频文件
  const videoUrl = hasVideo && project.videos[0] ? 
    project.videos[0].startsWith('http') ? 
      `/videos/projects/${id}/${project.videos[0].split('/').pop()}` : 
      `/videos/projects/${id}/${project.videos[0]}` : 
    null;
  console.log('视频URL:', videoUrl); // 调试用，查看视频URL

  return (
    <div className="w-full p-6 pt-16">
      {/* 视频或主图展示 - 全屏宽度 */}
      <div className="mb-12 w-full max-w-none">
        {hasVideo ? (
          <div className="relative w-full">
            {/* 视频加载状态指示器 */}
            {isVideoLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700">视频加载中，请稍候...</p>
              </div>
            )}
            
            {/* 标准视频文件处理 */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto object-cover"
              poster={mainImageUrl}
              onLoadStart={() => setIsVideoLoading(true)}
              onLoadedData={() => setIsVideoLoading(false)}
              onError={(e) => {
                console.error('视频加载失败:', e);
                setIsVideoLoading(false);
                // 在视频加载失败时可以添加额外处理
              }}
            >
              <source src={videoUrl} />
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              <source src={videoUrl} type="video/ogg" />
              您的浏览器不支持视频标签
            </video>
          </div>
        ) : (
          <img
            src={mainImageUrl}
            alt={project.title}
            className="w-full h-auto object-cover"
            onError={(e) => {
              console.error('主图加载失败:', mainImageUrl);
              // 设置一个默认图片或占位符
              e.currentTarget.src = `https://placehold.co/800x600/e2e2e2/white?text=Main+Image+Failed`;
            }}
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* 左侧：项目标题和基本信息 */}
        <div className="w-full md:w-1/4">
          <h1 className="text-3xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl mb-8 text-gray-600">{project.subtitle}</p>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-500 mb-1">Client</h3>
            <p className="font-medium">{project.client}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-500 mb-1">Services</h3>
            <p className="font-medium">{project.services.join(', ')}</p>
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
          
          {project.detailedInfo?.teamMembers && project.detailedInfo.teamMembers.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm text-gray-500 mb-1">Team</h2>
              <div className="space-y-2">
                {project.detailedInfo.teamMembers.map((member, index) => (
                  <div key={index}>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 右侧：详细描述和内容 */}
        <div className="w-full md:w-3/4">
          <p className="mb-8 text-lg">{project.description}</p>
          
          {project.content.map((paragraph, index) => (
            <p key={index} className="mb-6">{paragraph}</p>
          ))}
          
          {project.detailedInfo && (
            <div className="mt-12">
              {/* 移除了Content标题 */}
              
              {/* 合并challenge内容 */}
              <p className="mb-8">{project.detailedInfo.challenge}</p>
              
              {/* 合并solution内容 */}
              <p className="mb-8">{project.detailedInfo.solution}</p>
              
              {/* 合并process内容 */}
              {project.detailedInfo.process.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  {project.detailedInfo.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              )}
              
              {/* 合并results内容 */}
              <p className="mb-8">{project.detailedInfo.results}</p>
              
              {/* 保留testimonial */}
              {project.detailedInfo.testimonial && (
                <div className="bg-gray-50 p-6 mb-8 border-l-4 border-gray-300">
                  <p className="italic mb-4">"{project.detailedInfo.testimonial.quote}"</p>
                  <p className="font-bold">{project.detailedInfo.testimonial.author}</p>
                  <p className="text-sm text-gray-600">{project.detailedInfo.testimonial.position}</p>
                </div>
              )}
            </div>
          )}
          
          {/* 图片网格展示 - 全屏宽度 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-none">
            {project.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} - Detail ${index + 1}`}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error('图片加载失败:', image);
                  // 设置一个默认图片或占位符
                  e.currentTarget.src = `https://placehold.co/800x600/e2e2e2/white?text=Image+Load+Failed`;
                }}
              />
            ))}
          </div>
          
          {/* 额外图片展示 - 全屏宽度 */}
          {project.images.length > 5 && (
            <div className="mt-12 w-full max-w-none">
              {project.images.slice(5).map((image, index) => (
                <div key={index} className="mb-8 w-full max-w-none">
                  <img
                    src={image}
                    alt={`${project.title} - Additional ${index + 1}`}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      console.error('图片加载失败:', image);
                      // 设置一个默认图片或占位符
                      e.currentTarget.src = `https://placehold.co/800x600/e2e2e2/white?text=Image+Load+Failed`;
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProjectDetail;