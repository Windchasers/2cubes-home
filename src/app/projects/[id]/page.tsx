import { getProjectDetailById } from "@/lib/projectData";
import type { Metadata } from "next";
import ClientProjectDetail from "./ClientProjectDetail";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectDetailById(params.id);
  // 注意：这里无法使用客户端的语言上下文，所以使用默认的中文标题
  // 实际页面内容会在客户端组件中根据语言环境动态显示
  return {
    title: project
      ? `${project.title} - another design`
      : `Project ${params.id} - another design`,
  };
}

export async function generateStaticParams() {
  // Generate params for project IDs 1 through 6 (based on available project folders)
  return Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function ProjectDetailPage({ params }: Props) {
  const { id } = params;

  return <ClientProjectDetail id={id} />;
}
