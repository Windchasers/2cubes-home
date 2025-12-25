# 图片管理与 Vercel Blob 工作流指南

本文档介绍了本项目如何管理图片资源并将其同步到 Vercel Blob 存储的最佳实践。

## 核心理念

本项目采用 **"本地暂存 -> 一键同步 -> 云端分发"** 的策略：
1. **本地暂存**：开发时，将新图片直接放入 `public/images` 目录，保持传统开发习惯。
2. **一键同步**：使用脚本自动将新文件上传到 Vercel Blob，并更新代码中的引用链接。
3. **云端分发**：生产环境中，图片直接由 Vercel 全球 CDN 提供，不再打包在应用中。

---

## 快速上手：如何添加新图片

### 第一步：放置图片
将您的新图片放入 `public/images` 文件夹下的任意位置。建议保持良好的目录结构，例如：
- `public/images/projects/7/main.jpg`
- `public/images/team/member-new.png`

### 第二步：同步到云端
在终端运行以下命令：

```bash
npm run sync-images
```

### 第三步：发生了什么？
这个命令会自动执行两个操作：
1. **上传**：自动检测 `public/images` 中新增的文件，将其上传到 Vercel Blob。
   - *注意：已上传过的文件会自动跳过，不会重复上传。*
2. **替换**：自动扫描您的源代码（`.tsx`, `.ts`, `.json`），将其中引用的本地路径（如 `/images/projects/7/main.jpg`）替换为云端 URL（如 `https://...public.blob.vercel-storage.com/...`）。

---

## 手动操作（高级）

如果您需要分步执行，可以使用以下独立命令：

- **仅上传图片**：
  ```bash
  node scripts/upload-images.js
  ```
  此命令会生成/更新 `image-migration-map.json` 文件，记录本地路径与云端 URL 的映射关系。

- **仅替换路径**：
  ```bash
  node scripts/replace-paths.js
  ```
  此命令依据映射文件，更新代码中的图片引用。

---

## 环境配置

为了使脚本正常工作，您的 `.env.local` 文件中必须包含以下 Token：

```env
# Vercel Blob 读写权限 Token
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx
```
*请勿将此 Token 提交到 Git 仓库中。*

## 文件清理

确认图片在网页上正常显示后，您可以安全地删除 `public/images` 中已上传的源文件，以减小项目体积（建议保留 `fonts` 和 `videos` 等其他静态资源）。
