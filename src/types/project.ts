// 项目类别类型定义
export interface Category {
  id: string;
  name: string;
}

// 项目类型定义
export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  services: string[];
  description: string;
  content: string[];
  images: string[];
  thumbnail: string;
  detailedInfo?: ProjectDetailedInfo;
}

// 项目详细信息类型定义
export interface ProjectDetailedInfo {
  challenge: string;
  solution: string;
  process: string[];
  results: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  teamMembers?: {
    name: string;
    role: string;
  }[];
  technologies?: string[];
  duration?: string;
  location?: string;
}

// 项目数据类型定义
export interface ProjectsData {
  categories: Category[];
  projects: Project[];
}