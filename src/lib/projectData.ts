import { ProjectsData, Project, Category, ProjectDetailedInfo } from '../types/project';
import projectsData from '../data/projects.json';
import projectDetailsData from '../data/projectDetails.json';
import { processProjectImages, processProjectsImages } from './imageUtils';

/**
 * 获取所有项目类别
 * @returns 项目类别数组
 */
export function getCategories(): Category[] {
  return projectsData.categories;
}

/**
 * 获取所有项目
 * @returns 项目数组
 */
export function getAllProjects(): Project[] {
  return processProjectsImages(projectsData.projects);
}

/**
 * 根据ID获取单个项目
 * @param id 项目ID
 * @returns 项目对象或undefined
 */
export function getProjectById(id: number | string): Project | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const project = projectsData.projects.find(project => project.id === numericId);
  return project ? processProjectImages(project) : undefined;
}

/**
 * 根据类别获取项目
 * @param categoryId 类别ID
 * @returns 项目数组
 */
export function getProjectsByCategory(categoryId: string): Project[] {
  if (categoryId === 'all') {
    return processProjectsImages(projectsData.projects);
  }
  const filteredProjects = projectsData.projects.filter(project => project.category === categoryId);
  return processProjectsImages(filteredProjects);
}

/**
 * 获取项目类别名称
 * @param categoryId 类别ID
 * @returns 类别名称
 */
export function getCategoryName(categoryId: string): string {
  const category = projectsData.categories.find(cat => cat.id === categoryId);
  return category ? category.name : categoryId;
}

/**
 * 根据项目ID获取项目详细信息
 * @param id 项目ID
 * @returns 项目详细信息对象或undefined
 */
export function getProjectDetailById(id: number | string): Project | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const projectDetail = projectDetailsData.projectDetails.find(project => project.id === numericId);
  
  // 如果在详细信息中找到项目，返回完整的项目信息
  if (projectDetail) {
    return projectDetail;
  }
  
  // 如果在详细信息中没有找到，返回基本项目信息
  return getProjectById(numericId);
}

/**
 * 获取项目的详细信息部分
 * @param id 项目ID
 * @returns 项目详细信息对象或undefined
 */
export function getProjectDetailedInfo(id: number | string): ProjectDetailedInfo | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const projectDetail = projectDetailsData.projectDetails.find(project => project.id === numericId);
  
  return projectDetail?.detailedInfo;
}