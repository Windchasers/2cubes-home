const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(process.cwd(), 'image-migration-map.json');
const DATA_FILE = path.join(process.cwd(), 'src/data/projects.json');
const SRC_DIR = path.join(process.cwd(), 'src');

if (!fs.existsSync(MAPPING_FILE)) {
  console.error('Error: image-migration-map.json not found. Please run upload-images.js first.');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
let replacementCount = 0;

// 1. 更新 projects.json
console.log('Updating src/data/projects.json...');
try {
  let projectsData = fs.readFileSync(DATA_FILE, 'utf8');
  let originalData = projectsData;
  
  // 按路径长度倒序排序，避免部分匹配问题（如 /images/a.jpg 被 /images/a 匹配）
  const sortedKeys = Object.keys(mapping).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(oldPath => {
    const newPath = mapping[oldPath];
    // 全局替换
    const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (projectsData.match(regex)) {
      projectsData = projectsData.replace(regex, newPath);
      replacementCount++;
    }
  });

  if (projectsData !== originalData) {
    fs.writeFileSync(DATA_FILE, projectsData);
    console.log('✓ Updated projects.json');
  } else {
    console.log('No changes needed in projects.json');
  }
} catch (e) {
  console.error('Failed to update projects.json:', e);
}

// 2. 更新源代码文件
function getAllSourceFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllSourceFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

console.log('Updating source files in src/...');
const sourceFiles = getAllSourceFiles(SRC_DIR);
const sortedKeys = Object.keys(mapping).sort((a, b) => b.length - a.length);

sourceFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let fileChanged = false;

    sortedKeys.forEach(oldPath => {
      const newPath = mapping[oldPath];
      const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      
      if (content.match(regex)) {
        content = content.replace(regex, newPath);
        fileChanged = true;
        replacementCount++;
      }
    });

    if (fileChanged) {
      fs.writeFileSync(file, content);
      console.log(`✓ Updated ${path.relative(process.cwd(), file)}`);
    }
  } catch (e) {
    console.error(`Failed to process ${file}:`, e);
  }
});

console.log(`\nMigration completed! Replaced ${replacementCount} occurrences.`);
