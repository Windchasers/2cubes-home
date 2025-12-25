const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');
require('dotenv').config({ path: '.env.local' });

// 检查环境变量
const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.twocubes_read_write_token_READ_WRITE_TOKEN;

if (!token) {
  console.error('Error: BLOB_READ_WRITE_TOKEN or twocubes_read_write_token_READ_WRITE_TOKEN is not defined in .env.local');
  console.error('Please create a Blob store on Vercel and add the token to your .env.local file.');
  process.exit(1);
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const MAPPING_FILE = path.join(process.cwd(), 'image-migration-map.json');

// 递归获取所有文件
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      // 忽略 .DS_Store 等文件
      if (file !== '.DS_Store' && !file.endsWith('.txt')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

async function uploadImages() {
  console.log('Starting image migration to Vercel Blob...');
  
  const allFiles = getAllFiles(IMAGES_DIR);
  const mapping = {};
  
  // 如果已经有映射文件，读取它以避免重复上传
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      const existingMapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
      Object.assign(mapping, existingMapping);
    } catch (e) {
      console.log('Could not read existing mapping file, starting fresh.');
    }
  }

  console.log(`Found ${allFiles.length} files in public/images`);

  for (const filePath of allFiles) {
    // 获取相对于 public 的路径，例如 /images/projects/1/thumbnail.jpg
    const relativePath = filePath.replace(PUBLIC_DIR, '');
    
    // 如果已经上传过，跳过
    if (mapping[relativePath]) {
      console.log(`Skipping ${relativePath} (already uploaded)`);
      continue;
    }

    console.log(`Uploading ${relativePath}...`);

    try {
      const fileBuffer = fs.readFileSync(filePath);
      // 使用相对路径作为 pathname，保持目录结构
      // access: 'public' 是默认值，这里显式指定
      const blob = await put(relativePath.replace(/^\//, ''), fileBuffer, {
        access: 'public',
        addRandomSuffix: false, // 保持文件名不变，如果需要唯一性可以设为 true
        token: token // 显式传递 token
      });

      mapping[relativePath] = blob.url;
      console.log(`✓ Uploaded: ${blob.url}`);

      // 每次上传后保存映射，防止中断丢失
      fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));

    } catch (error) {
      console.error(`✗ Failed to upload ${relativePath}:`, error.message);
    }
  }

  console.log('Migration completed!');
  console.log(`Mapping file saved to ${MAPPING_FILE}`);
}

uploadImages();
