#!/usr/bin/env node
/**
 * Convert JPG thumbnails to AVIF and upload to Vercel Blob Storage.
 *
 * Usage:
 *   node scripts/upload-thumbnails.mjs
 *
 * Requires:
 *   - sharp (already in node_modules)
 *   - @vercel/blob (already in node_modules)
 *   - env var: twocubes_read_write_token_READ_WRITE_TOKEN (from .env.local)
 */

import { readdir, readFile, mkdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import sharp from 'sharp';
import { put } from '@vercel/blob';
import { config } from 'dotenv';

// Load .env.local
config({ path: '.env.local' });

const BLOB_TOKEN = process.env.twocubes_read_write_token_READ_WRITE_TOKEN;
if (!BLOB_TOKEN) {
  console.error('❌ Missing twocubes_read_write_token_READ_WRITE_TOKEN in .env.local');
  process.exit(1);
}

const SRC_DIR = join(process.cwd(), 'public', '2cubes缩略图');
const TMP_DIR = join(process.cwd(), 'scripts', '.avif-tmp');
const BLOB_PREFIX = 'images/preview-thumbnails';

// AVIF quality – 50 gives great visual quality at much smaller size than JPG
const AVIF_QUALITY = 50;

async function main() {
  // Create temp dir
  await mkdir(TMP_DIR, { recursive: true });

  // List source JPGs (skip macOS ._* resource forks)
  const allFiles = await readdir(SRC_DIR);
  const jpgFiles = allFiles
    .filter(f => /\.jpe?g$/i.test(f) && !f.startsWith('._'))
    .sort();

  console.log(`\n📸 Found ${jpgFiles.length} JPG files to convert\n`);

  const results = [];

  for (const file of jpgFiles) {
    const srcPath = join(SRC_DIR, file);
    const stem = basename(file, extname(file));

    // Normalise filename for blob path: replace Chinese & spaces with simple names
    const blobName = normaliseFilename(file);
    const avifPath = join(TMP_DIR, `${blobName}.avif`);

    // 1. Convert to AVIF
    const srcBuf = await readFile(srcPath);
    const srcSizeKB = (srcBuf.length / 1024).toFixed(0);

    const avifBuf = await sharp(srcBuf)
      .avif({ quality: AVIF_QUALITY, effort: 4 })
      .toBuffer();

    const avifSizeKB = (avifBuf.length / 1024).toFixed(0);
    const ratio = ((1 - avifBuf.length / srcBuf.length) * 100).toFixed(0);

    // 2. Upload to Vercel Blob
    const blobPath = `${BLOB_PREFIX}/${blobName}.avif`;
    const blob = await put(blobPath, avifBuf, {
      access: 'public',
      token: BLOB_TOKEN,
      contentType: 'image/avif',
      addRandomSuffix: false,
    });

    console.log(`✅ ${file}  ${srcSizeKB}KB → ${avifSizeKB}KB (−${ratio}%)  →  ${blob.url}`);

    results.push({
      original: file,
      blobName: `${blobName}.avif`,
      url: blob.url,
    });
  }

  // Print summary as JSON (for updating page.tsx)
  console.log('\n─── Upload Results ───');
  console.log(JSON.stringify(results, null, 2));
  console.log(`\n🎉 Done! ${results.length} files uploaded.\n`);
}

/**
 * Convert Chinese filenames to simple English names.
 * e.g. "2cubes案例缩略图_画板 1.jpg" → "thumbnail-01"
 *      "2cubes案例缩略图-02.jpg"    → "thumbnail-02"
 */
function normaliseFilename(file) {
  // Extract trailing number
  const numMatch = file.match(/-(\d+)\.jpe?g$/i);
  if (numMatch) {
    return `thumbnail-${numMatch[1].padStart(2, '0')}`;
  }
  // The "画板 1" variant → thumbnail-01
  if (file.includes('画板')) {
    return 'thumbnail-01';
  }
  // Fallback
  return basename(file, extname(file)).replace(/[^a-zA-Z0-9-]/g, '_');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
