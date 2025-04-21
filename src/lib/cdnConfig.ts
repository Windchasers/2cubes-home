/**
 * CDN配置文件
 * 用于管理项目中的图片CDN设置
 */

// CDN基础URL
export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

// CDN是否启用
export const CDN_ENABLED = !!CDN_BASE_URL;

/**
 * 将本地图片路径转换为CDN URL
 * @param imagePath 图片路径（相对于public目录）
 * @returns CDN URL或原始路径
 */
export function getCdnUrl(imagePath: string): string {
  // 如果路径为空或不是字符串，返回原始路径
  if (!imagePath || typeof imagePath !== 'string') {
    return imagePath;
  }

  // 如果CDN未启用，返回原始路径
  if (!CDN_ENABLED) {
    return imagePath;
  }

  // 确保路径以/开头
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // 构建CDN URL
  return `${CDN_BASE_URL}${normalizedPath}`;
}

/**
 * 批量将图片路径数组转换为CDN URL
 * @param imagePaths 图片路径数组
 * @returns CDN URL数组
 */
export function getCdnUrls(imagePaths: string[]): string[] {
  if (!imagePaths || !Array.isArray(imagePaths)) {
    return imagePaths;
  }
  
  return imagePaths.map(getCdnUrl);
}