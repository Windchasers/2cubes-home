import {
  getProjectDetailByRouteParam,
  getProjectRoutes,
} from "@/lib/projectData";
import type { Metadata } from "next";
import ClientProjectDetail from "./ClientProjectDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectDetailByRouteParam(id);
  // 注意：这里无法使用客户端的语言上下文，所以使用默认的中文标题
  // 实际页面内容会在客户端组件中根据语言环境动态显示
  return {
    title: project
      ? `${project.title} - another design`
      : `Project ${id} - another design`,
  };
}

export async function generateStaticParams() {
  const routes = getProjectRoutes();

  return routes.map((route) => ({
    id: route.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  return <ClientProjectDetail routeParam={id} />;
}
