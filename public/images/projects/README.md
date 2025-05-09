# 项目图片引用规范

## 目录结构

项目图片应存放在以下目录结构中：

```
/public/images/projects/
  ├── [项目ID]/
  │   ├── thumbnail.jpg  (项目缩略图，用于首页展示)
  │   ├── main.jpg       (项目主图，用于项目详情页顶部)
  │   ├── detail-1.jpg   (项目详情图1)
  │   ├── detail-2.jpg   (项目详情图2)
  │   └── ...
  └── ...
```

## 命名规范

1. **项目文件夹**：使用项目ID作为文件夹名称（例如：`1`, `2`, `3`等）
2. **缩略图**：统一命名为 `thumbnail.jpg`，建议尺寸为 600x400 像素
3. **主图**：统一命名为 `main.jpg`，建议尺寸为 800x600 像素
4. **详情图**：使用 `detail-[序号].jpg` 格式命名，序号从1开始递增

## 图片格式要求

- 首选格式：JPEG (.jpg) 用于照片类图片，PNG (.png) 用于需要透明背景的图片
- 分辨率：确保图片清晰但文件大小合理，建议使用适当的压缩
- 文件大小：单张图片不超过500KB，以确保页面加载速度

## 图片引用方式

在代码中引用项目图片时，使用以下格式：

```javascript
// 缩略图引用（首页）
`/images/projects/${projectId}/thumbnail.jpg`

// 主图引用（项目详情页）
`/images/projects/${projectId}/main.jpg`

// 详情图引用（项目详情页）
`/images/projects/${projectId}/detail-1.jpg`
```

## 注意事项

1. 上传图片前请确保图片已经过适当优化，以提高网站性能
2. 确保所有项目都有对应的缩略图，这是首页展示的必要元素
3. 如果项目没有足够的详情图，可以只提供主图
4. 图片命名必须遵循规范，以确保代码能正确引用