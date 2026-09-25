import { execFileSync } from 'node:child_process';

const maxBytes = 1_000_000;
const imageExtension = /\.(?:avif|bmp|gif|heic|heif|ico|jpe?g|jxl|png|svg|tiff?|webp)$/i;

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
}

try {
  const files = git('diff', '--cached', '--name-only', '--diff-filter=ACMRT', '-z')
    .split('\0')
    .filter((file) => imageExtension.test(file));
  const oversized = files.flatMap((file) => {
    // Inspect the index so unstaged edits cannot hide an oversized staged image.
    const bytes = Number(git('cat-file', '-s', `:${file}`).trim());
    return bytes > maxBytes ? [{ file, bytes }] : [];
  });

  if (oversized.length > 0) {
    console.error('Commit blocked: staged images must be at most 1 MB (1,000,000 bytes).');
    for (const { file, bytes } of oversized) {
      console.error(`  ${JSON.stringify(file)}: ${bytes.toLocaleString('en-US')} bytes`);
    }
    console.error('\nResize or compress these images, review them, then git add the results again.');
    console.error('For photos, for example:');
    console.error('  magick original.jpg -auto-orient -resize "2040x2040>" -colorspace sRGB -strip -quality 82 output.webp');
    console.error('If the filename changes, update references and remove the old image from the staged changes.');
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`Unable to check staged image sizes: ${error.message}`);
  process.exitCode = 1;
}
