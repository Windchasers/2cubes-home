// 项目类别类型定义
export interface Category {
  id: string;
  name: string;
}

// 项目类型定义
export interface Project {
  id: number;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  category: string;
  year: string;
  client: string;
  clientEn?: string;
  services: string[];
  servicesEn?: string[];
  description: string;
  descriptionEn?: string;
  content: string[];
  contentEn?: string[];
  images: string[];
  thumbnail: string;
  videos?: string[];
  detailedInfo?: ProjectDetailedInfo;
}

// 项目详细信息类型定义
export interface ProjectDetailedInfo {
  challenge: string;
  challengeEn?: string;
  solution: string;
  solutionEn?: string;
  process: string[];
  processEn?: string[];
  results: string;
  resultsEn?: string;
  testimonial?: {
    quote: string;
    quoteEn?: string;
    author: string;
    authorEn?: string;
    position: string;
    positionEn?: string;
  };
  teamMembers?: {
    name: string;
    nameEn?: string;
    role: string;
    roleEn?: string;
  }[];
  technologies?: string[];
  technologiesEn?: string[];
  duration?: string;
  durationEn?: string;
  location?: string;
  locationEn?: string;
}

// 项目数据类型定义
export interface ProjectsData {
  categories: Category[];
  projects: Project[];
}