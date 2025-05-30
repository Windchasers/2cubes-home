# 项目详情页JSON规范文档

## 概述

本文档定义了vansion-home项目中用于项目详情页的JSON数据结构规范。所有项目详情页的文字信息将以JSON格式存储在前端，遵循本规范进行组织和管理。

## 文件位置

项目详情数据存储在以下位置：

- 基本项目数据：`src/data/projects.json`
- 详细项目数据：`src/data/projectDetails.json`

## 数据结构

### 项目基本信息 (projects.json)

```json
{
  "categories": [
    { "id": "string", "name": "string" }
  ],
  "projects": [
    {
      "id": number,
      "title": "string",
      "subtitle": "string",
      "category": "string",
      "year": "string",
      "client": "string",
      "services": ["string"],
      "description": "string",
      "content": ["string"],
      "images": ["string"],
      "thumbnail": "string"
    }
  ]
}
```

### 项目详细信息 (projectDetails.json)

```json
{
  "projectDetails": [
    {
      "id": number,
      "title": "string",
      "subtitle": "string",
      "category": "string",
      "year": "string",
      "client": "string",
      "services": ["string"],
      "description": "string",
      "content": ["string"],
      "images": ["string"],
      "thumbnail": "string",
      "detailedInfo": {
        "challenge": "string",
        "solution": "string",
        "process": ["string"],
        "results": "string",
        "testimonial": {
          "quote": "string",
          "author": "string",
          "position": "string"
        },
        "teamMembers": [
          {
            "name": "string",
            "role": "string"
          }
        ],
        "technologies": ["string"],
        "duration": "string",
        "location": "string"
      }
    }
  ]
}
```

## 字段说明

### 基本字段

| 字段名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| id | number | 是 | 项目唯一标识符 |
| title | string | 是 | 项目标题 |
| subtitle | string | 是 | 项目副标题 |
| category | string | 是 | 项目类别ID |
| year | string | 是 | 项目年份 |
| client | string | 是 | 客户名称 |
| services | string[] | 是 | 提供的服务列表 |
| description | string | 是 | 项目简短描述 |
| content | string[] | 是 | 项目内容段落 |
| images | string[] | 是 | 项目图片URL列表 |
| thumbnail | string | 是 | 项目缩略图URL |

### 详细信息字段

| 字段名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| challenge | string | 是 | 项目面临的挑战 |
| solution | string | 是 | 提供的解决方案 |
| process | string[] | 是 | 项目流程步骤 |
| results | string | 是 | 项目成果 |
| testimonial | object | 否 | 客户评价 |
| testimonial.quote | string | 是* | 评价内容 |
| testimonial.author | string | 是* | 评价人 |
| testimonial.position | string | 是* | 评价人职位 |
| teamMembers | object[] | 否 | 项目团队成员 |
| teamMembers[].name | string | 是* | 成员姓名 |
| teamMembers[].role | string | 是* | 成员角色 |
| technologies | string[] | 否 | 使用的技术 |
| duration | string | 否 | 项目持续时间 |
| location | string | 否 | 项目地点 |

*当包含父字段时必填

## 使用方法

### 获取项目数据

在代码中可以使用以下函数获取项目数据：

```typescript
// 获取所有项目
getAllProjects(): Project[]

// 根据ID获取项目
getProjectById(id: number | string): Project | undefined

// 根据类别获取项目
getProjectsByCategory(categoryId: string): Project[]

// 获取项目详细信息
getProjectDetailById(id: number | string): Project | undefined

// 获取项目的详细信息部分
getProjectDetailedInfo(id: number | string): ProjectDetailedInfo | undefined
```

## 示例

### 基本项目信息示例

```json
{
  "id": 1,
  "title": "品牌重塑项目",
  "subtitle": "为客户打造全新品牌形象",
  "category": "branding",
  "year": "2024",
  "client": "某科技公司",
  "services": ["品牌设计", "视觉识别系统", "营销物料"],
  "description": "这是一个全面的品牌重塑项目，我们为客户创建了新的品牌标识、视觉语言和应用系统。",
  "content": [
    "项目背景：客户是一家成立十年的科技公司，随着业务的发展和市场的变化，原有的品牌形象已经无法准确传达公司的价值观和愿景。",
    "设计挑战：如何在保留品牌原有认知的基础上，注入新的活力和现代感，同时确保新的品牌形象能够适应各种应用场景。"
  ],
  "images": [
    "/images/projects/1/main.jpg",
    "/images/projects/1/detail1.jpg"
  ],
  "thumbnail": "/images/projects/1/thumbnail.jpg"
}
```

### 详细项目信息示例

```json
{
  "id": 1,
  "title": "品牌重塑项目",
  "subtitle": "为客户打造全新品牌形象",
  "category": "branding",
  "year": "2024",
  "client": "某科技公司",
  "services": ["品牌设计", "视觉识别系统", "营销物料"],
  "description": "这是一个全面的品牌重塑项目，我们为客户创建了新的品牌标识、视觉语言和应用系统。",
  "content": ["项目背景：客户是一家成立十年的科技公司..."],
  "images": ["/images/projects/1/main.jpg"],
  "thumbnail": "/images/projects/1/thumbnail.jpg",
  "detailedInfo": {
    "challenge": "客户面临的主要挑战是如何在保持品牌认知的同时，更新其视觉形象以反映公司的发展和现代价值观。",
    "solution": "我们通过深入研究和多轮设计迭代，创造了一个既尊重品牌历史又面向未来的新形象。",
    "process": [
      "研究与发现：深入了解客户业务、目标受众和市场环境",
      "概念开发：探索多种设计方向和视觉语言"
    ],
    "results": "新品牌形象获得了客户团队和市场的积极反响。品牌重塑后的六个月内，客户报告品牌认知度提升了35%。",
    "testimonial": {
      "quote": "这次品牌重塑不仅给了我们一个全新的视觉形象，更重要的是帮助我们重新思考了品牌价值和市场定位。",
      "author": "张总监",
      "position": "市场部负责人"
    },
    "teamMembers": [
      {
        "name": "李设计师",
        "role": "创意总监"
      }
    ],
    "technologies": ["Adobe Illustrator", "Adobe Photoshop"],
    "duration": "3个月",
    "location": "上海"
  }
}
```

## 注意事项

1. 所有项目必须有唯一的ID
2. 图片路径应使用相对于public目录的路径
3. 添加新项目时，确保同时更新projects.json和projectDetails.json
4. 所有必填字段必须提供有效值
5. 字符串内容中如包含引号，需正确转义

## 维护与更新

本规范由开发团队维护。如需修改规范，请先与团队成员讨论并达成共识，然后更新本文档和相关代码。