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
 * 获取所有项目类别 (别名函数，与getCategories功能相同)
 * @returns 项目类别数组
 */
export function getAllCategories(): Category[] {
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
 * 根据项目ID和语言获取项目详细信息
 * @param id 项目ID
 * @param language 语言 ('zh' | 'en')
 * @returns 项目详细信息对象或undefined
 */
export function getLocalizedProjectDetailById(id: number | string, language: 'zh' | 'en'): Project | undefined {
  const project = getProjectDetailById(id);
  
  if (!project) {
    return undefined;
  }
  
  // 如果是中文，直接返回原始数据
  if (language === 'zh') {
    return project;
  }
  
  // 如果是英文，返回英文版本的数据
  if (language === 'en') {
    const localizedProject: Project = {
      ...project,
      title: project.titleEn || project.title,
      subtitle: project.subtitleEn || project.subtitle,
      client: project.clientEn || project.client,
      services: project.servicesEn || project.services,
      description: project.descriptionEn || project.description,
      content: project.contentEn || project.content
    };
    
    // 处理详细信息的本地化
    if (project.detailedInfo) {
      localizedProject.detailedInfo = {
        ...project.detailedInfo,
        challenge: project.detailedInfo.challengeEn || project.detailedInfo.challenge,
        solution: project.detailedInfo.solutionEn || project.detailedInfo.solution,
        process: project.detailedInfo.processEn || project.detailedInfo.process,
        results: project.detailedInfo.resultsEn || project.detailedInfo.results,
        duration: project.detailedInfo.durationEn || project.detailedInfo.duration,
        location: project.detailedInfo.locationEn || project.detailedInfo.location,
        technologies: project.detailedInfo.technologiesEn || project.detailedInfo.technologies
      };
      
      // 处理团队成员信息
      if (project.detailedInfo.teamMembers) {
        localizedProject.detailedInfo.teamMembers = project.detailedInfo.teamMembers.map(member => ({
          name: member.nameEn || member.name,
          role: member.roleEn || member.role
        }));
      }
      
      // 处理推荐语信息
      if (project.detailedInfo.testimonial) {
        localizedProject.detailedInfo.testimonial = {
          quote: project.detailedInfo.testimonial.quoteEn || project.detailedInfo.testimonial.quote,
          author: project.detailedInfo.testimonial.authorEn || project.detailedInfo.testimonial.author,
          position: project.detailedInfo.testimonial.positionEn || project.detailedInfo.testimonial.position
        };
      }
    }
    
    return localizedProject;
  }
  
  return project;
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