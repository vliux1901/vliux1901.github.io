import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'compress-images-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'scripts'));
  await mkdir(path.join(root, 'tmp/raw_images/nested'), { recursive: true });
  await mkdir(path.join(root, 'src/assets/nested'), { recursive: true });
  await copyFile(new URL('./compress-images.mjs', import.meta.url), path.join(root, 'scripts/compress-images.mjs'));
  return {
    raw: path.join(root, 'tmp/raw_images/nested'),
    output: path.join(root, 'src/assets/nested'),
    run: () => spawnSync(process.execPath, [path.join(root, 'scripts/compress-images.mjs')], { encoding: 'utf8' }),
  };
}

const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="red"/></svg>';

async function raster(file) {
  const result = spawnSync('magick', ['-size', '30x20', 'xc:blue', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}

test('saved raster and SVG outputs remove only their raw sources; reruns are harmless', async (t) => {
  const f = await fixture(t);
  await raster(path.join(f.raw, 'photo.jpg'));
  await writeFile(path.join(f.raw, 'drawing.svg'), svg);
  await writeFile(path.join(f.raw, 'notes.txt'), 'keep');
  await writeFile(path.join(f.output, 'unrelated.txt'), 'keep');
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Compressed 2\/2 images; removed 2 raw source files/);
  assert.deepEqual(await readdir(f.raw), ['notes.txt']);
  assert.ok((await stat(path.join(f.output, 'photo.jpg'))).size > 0);
  assert.equal(await readFile(path.join(f.output, 'drawing.svg'), 'utf8'), svg);
  assert.equal(await readFile(path.join(f.output, 'unrelated.txt'), 'utf8'), 'keep');
  const rerun = f.run();
  assert.equal(rerun.status, 0, rerun.stderr);
  assert.match(rerun.stdout, /No images found/);
});

test('failed conversion keeps its raw source and existing output while other images succeed', async (t) => {
  const f = await fixture(t);
  await writeFile(path.join(f.raw, 'broken.jpg'), 'not an image');
  await writeFile(path.join(f.output, 'broken.jpg'), 'previous output');
  await writeFile(path.join(f.raw, 'valid.svg'), svg);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.equal(await readFile(path.join(f.raw, 'broken.jpg'), 'utf8'), 'not an image');
  assert.equal(await readFile(path.join(f.output, 'broken.jpg'), 'utf8'), 'previous output');
  assert.deepEqual(await readdir(f.raw), ['broken.jpg']);
  assert.match(result.stdout, /Compressed 1\/2 images; removed 1 raw source files/);
  assert.ok(!(await readdir(f.output)).some((name) => name.startsWith('.compress-')));
});

test('failure to save the final output retains the raw source', async (t) => {
  const f = await fixture(t);
  await writeFile(path.join(f.raw, 'blocked.svg'), svg);
  await mkdir(path.join(f.output, 'blocked.svg'));
  const result = f.run();
  assert.equal(result.status, 1);
  assert.equal(await readFile(path.join(f.raw, 'blocked.svg'), 'utf8'), svg);
  assert.match(result.stdout, /Compressed 0\/1 images; removed 0 raw source files/);
  assert.deepEqual(await readdir(f.output), ['blocked.svg']);
});
