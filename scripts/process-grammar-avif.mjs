import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import sharp from 'sharp';
import { put } from '@vercel/blob';
import { config } from 'dotenv';

// Load environmental variables from .env.local
config({ path: '.env.local' });

const BLOB_TOKEN = process.env.twocubes_read_write_token_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
if (!BLOB_TOKEN) {
  console.error('❌ Error: twocubes_read_write_token_READ_WRITE_TOKEN or BLOB_READ_WRITE_TOKEN is not defined in .env.local');
  process.exit(1);
}

const SRC_DIR = join(process.cwd(), 'public', '生长的语法');
const DEST_DIR = join(process.cwd(), 'public', 'grammar-of-growth');
const MAP_FILE = join(process.cwd(), 'grammar-of-growth-blob-map.json');

// Dynamic compression logic to ensure size is under 1MB (1,048,576 bytes)
async function compressToAvif(srcBuf, fileName) {
  let quality = 60;
  let maxDimension = 2560;
  let buffer;

  while (true) {
    buffer = await sharp(srcBuf)
      .resize({
        width: maxDimension,
        height: maxDimension,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .avif({ quality, effort: 4 })
      .toBuffer();

    const sizeMB = buffer.length / (1024 * 1024);
    if (sizeMB < 1.0) {
      break;
    }

    if (quality > 40) {
      console.log(`   ⚠️  Size is ${sizeMB.toFixed(2)}MB. Retrying with quality ${quality - 10}...`);
      quality -= 10;
    } else if (maxDimension > 1920) {
      console.log(`   ⚠️  Size is still ${sizeMB.toFixed(2)}MB. Retrying with resolution limit ${1920}px...`);
      maxDimension = 1920;
      quality = 50; // reset to 50 for the smaller size
    } else {
      console.log(`   ⚠️  Size is ${sizeMB.toFixed(2)}MB even at max compression. Proceeding anyway.`);
      break;
    }
  }

  return { buffer, quality, maxDimension };
}

async function main() {
  // Clean up any old WebP or files in the destination directory
  try {
    await rm(DEST_DIR, { recursive: true, force: true });
    console.log('🧹 Cleaned up old destination directory.');
  } catch (e) {
    // Directory might not exist yet
  }

  // Ensure the destination folder exists
  await mkdir(DEST_DIR, { recursive: true });

  const allFiles = await readdir(SRC_DIR);
  // Filter JPG images and sort them alphabetically
  const jpgFiles = allFiles
    .filter(f => /\.jpe?g$/i.test(f) && !f.startsWith('._'))
    .sort();

  if (jpgFiles.length === 0) {
    console.error(`❌ No JPG files found in public/生长的语法`);
    process.exit(1);
  }

  console.log(`📸 Found ${jpgFiles.length} JPG files to convert to AVIF and upload.\n`);

  const results = {};

  for (let i = 0; i < jpgFiles.length; i++) {
    const file = jpgFiles[i];
    const srcPath = join(SRC_DIR, file);
    
    // Output filename: 1.avif, 2.avif, etc.
    const destName = `${i + 1}.avif`;
    const destPath = join(DEST_DIR, destName);

    console.log(`[${i + 1}/${jpgFiles.length}] Processing ${file} -> ${destName}...`);

    const srcBuf = await readFile(srcPath);
    const srcSizeMB = (srcBuf.length / (1024 * 1024)).toFixed(2);

    // Compress dynamically
    const { buffer: avifBuf, quality, maxDimension } = await compressToAvif(srcBuf, file);

    const avifSizeKB = (avifBuf.length / 1024).toFixed(0);
    const ratio = ((1 - avifBuf.length / srcBuf.length) * 100).toFixed(0);

    console.log(`   Compressed (quality:${quality}, max:${maxDimension}px): ${srcSizeMB}MB -> ${avifSizeKB}KB (-${ratio}%)`);

    // Save locally
    await writeFile(destPath, avifBuf);
    console.log(`   Saved locally: public/grammar-of-growth/${destName}`);

    // 2. Upload to Vercel Blob
    const blobPath = `grammar-of-growth/${destName}`;
    console.log(`   Uploading to Vercel Blob: ${blobPath}...`);
    const blob = await put(blobPath, avifBuf, {
      access: 'public',
      token: BLOB_TOKEN,
      contentType: 'image/avif',
      addRandomSuffix: false,
    });

    console.log(`   Uploaded: ${blob.url}`);
    
    // Add mapping (local relative path to Vercel Blob URL)
    results[`/grammar-of-growth/${destName}`] = blob.url;
    console.log('');
  }

  // Generate and upload cover image (cover.avif) using the first image (1.avif)
  if (jpgFiles.length > 0) {
    const coverDestName = 'cover.avif';
    const coverDestPath = join(DEST_DIR, coverDestName);
    const firstAvifPath = join(DEST_DIR, '1.avif');

    console.log(`Generating cover image (cover.avif) from 1.avif...`);
    const avifBuf = await readFile(firstAvifPath);
    
    // Save cover locally
    await writeFile(coverDestPath, avifBuf);
    console.log(`   Saved cover locally: public/grammar-of-growth/${coverDestName}`);

    // Upload cover to Vercel Blob
    const blobPath = `grammar-of-growth/${coverDestName}`;
    console.log(`   Uploading cover to Vercel Blob: ${blobPath}...`);
    const blob = await put(blobPath, avifBuf, {
      access: 'public',
      token: BLOB_TOKEN,
      contentType: 'image/avif',
      addRandomSuffix: false,
    });

    console.log(`   Uploaded cover: ${blob.url}`);
    results[`/grammar-of-growth/${coverDestName}`] = blob.url;
    console.log('');
  }

  // Write the results to mapping JSON file
  await writeFile(MAP_FILE, JSON.stringify(results, null, 2), 'utf8');
  console.log(`🎉 Done! Mapping saved to: ${MAP_FILE}\n`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
