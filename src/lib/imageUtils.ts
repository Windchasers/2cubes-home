/**
 * 图片工具函数
 * 用于处理项目中的图片路径和CDN转换
 */

import { getCdnUrl, getCdnUrls } from './cdnConfig';

/**
 * 获取项目图片的URL
 * @param projectId 项目ID
 * @param imageName 图片名称
 * @returns 完整的图片URL（CDN或本地）
 */
export function getProjectImageUrl(projectId: number | string, imageName: string): string {
  const path = `/images/projects/${projectId}/${imageName}`;
  return getCdnUrl(path);
}

/**
 * 获取项目缩略图URL
 * @param projectId 项目ID
 * @returns 缩略图URL（CDN或本地）
 */
export function getProjectThumbnailUrl(projectId: number | string): string {
  return getProjectImageUrl(projectId, 'thumbnail.jpg');
}

/**
 * 处理项目数据中的图片路径，将其转换为CDN URL
 * @param project 项目数据对象
 * @returns 处理后的项目数据对象
 */
export function processProjectImages(project: any): any {
  if (!project) return project;
  
  return {
    ...project,
    images: getCdnUrls(project.images),
    thumbnail: getCdnUrl(project.thumbnail)
  };
}

/**
 * 批量处理项目数据中的图片路径
 * @param projects 项目数据对象数组
 * @returns 处理后的项目数据对象数组
 */
export function processProjectsImages(projects: any[]): any[] {
  if (!projects || !Array.isArray(projects)) return projects;
  
  return projects.map(processProjectImages);
}