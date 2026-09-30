import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readdir, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const inputRoot = path.join(root, 'tmp/raw_images');
const outputRoot = path.join(root, 'src/assets');
const imageExtension = /\.(?:avif|bmp|gif|heic|heif|ico|jpe?g|jxl|png|svg|tiff?|webp)$/i;

async function collectImages(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectImages(file));
    else if (entry.isFile() && imageExtension.test(entry.name)) files.push(file);
  }
  return files.sort();
}

async function main() {
  await mkdir(inputRoot, { recursive: true });
  const files = await collectImages(inputRoot);
  if (files.length === 0) {
    console.log('No images found. Add images to tmp/raw_images, then run npm run images:compress.');
    return;
  }

  const version = spawnSync('magick', ['-version'], { encoding: 'utf8' });
  if (version.error || version.status !== 0) {
    throw new Error('ImageMagick 7 is required. Install it and ensure magick is available on PATH.');
  }

  let succeeded = 0;
  let removed = 0;
  for (const source of files) {
    const relative = path.relative(inputRoot, source);
    const destination = path.join(outputRoot, relative);
    await mkdir(path.dirname(destination), { recursive: true });
    const scratch = await mkdtemp(path.join(path.dirname(destination), '.compress-'));
    try {
      const extension = path.extname(source);
      const temporary = path.join(scratch, `output${extension}`);
      if (extension.toLowerCase() === '.svg') {
        // Preserve vector artwork instead of rasterizing it into an SVG wrapper.
        await copyFile(source, temporary);
      } else {
        const result = spawnSync('magick', [
          source, '-auto-orient', '-coalesce', '-resize', '2040x2040>',
          '-colorspace', 'sRGB', '-strip', '-quality', '82', temporary,
        ], { encoding: 'utf8' });
        if (result.error || result.status !== 0) {
          throw new Error(result.error?.message || result.stderr.trim() || 'ImageMagick failed');
        }
      }
      const original = (await stat(source)).size;
      const compressed = (await stat(temporary)).size;
      if (compressed === 0) throw new Error('Compression produced an empty file; raw source retained.');
      await rename(temporary, destination);
      succeeded++;
      console.log(`${JSON.stringify(relative)}: ${original} → ${compressed} bytes → ${JSON.stringify(path.relative(root, destination))}`);
      // Only remove the raw file after the completed output is in its final location.
      try {
        await rm(source);
        removed++;
      } catch (error) {
        throw new Error(`Output saved, but could not remove raw source: ${error.message}`);
      }
      if (compressed > 1_000_000) {
        console.warn('  Still exceeds the 1 MB commit limit; reduce dimensions or quality further.');
      }
      if (compressed >= original) {
        console.warn('  Output is not smaller than the original input.');
      }
    } catch (error) {
      console.error(`Failed ${JSON.stringify(relative)}: ${error.message}`);
      process.exitCode = 1;
    } finally {
      await rm(scratch, { recursive: true, force: true });
    }
  }
  console.log(`Compressed ${succeeded}/${files.length} images; removed ${removed} raw source files.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
