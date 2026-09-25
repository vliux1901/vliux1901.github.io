# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Batch image compression

Put images under `tmp/raw_images/`, then run:

```sh
npm run images:compress
```

Requires ImageMagick 7 (`magick` on PATH). The command searches subfolders and
writes WebP copies under `tmp/compressed_images/`, preserving the folder structure
and originals. For example, `tmp/raw_images/trip/photo.jpg` becomes
`tmp/compressed_images/trip/photo.jpg.webp`. Keeping the source extension avoids
collisions between files such as `photo.jpg` and `photo.png`.

Images are auto-oriented, limited to 2040 × 2040 pixels without enlargement,
converted to sRGB, stripped of metadata, and encoded at quality 82. Common image
extensions are recognized (including SVG, which is rasterized); available input
formats depend on your ImageMagick installation. Non-image files and symlinks
are skipped. Failed conversions are reported and cause a nonzero exit status.
Rerunning replaces successful outputs using the originals.

Review the results and copy selected images into `src/assets/`, then reference
and stage those copies. Outputs over the 1 MB commit limit or larger than their
originals produce warnings. The entire root `tmp/` directory is ignored by Git.

## Image size check before committing

After cloning, install the repository's Git hook (Node.js is required):

```sh
npm run hooks:install
```

This sets the local `core.hooksPath` to `.githooks`. If you already use a custom
hooks directory, integrate this check into your existing hook instead.

The pre-commit hook rejects added or modified staged image files larger than
1 MB (1,000,000 bytes). It checks the staged content, including renamed images,
without modifying any files. Deleted files and non-image files are skipped.
Image detection uses common image filename extensions.

You can also run the check manually:

```sh
npm run check:images
```

Keep full-resolution originals outside the repository. Compress images before
staging them, review the result, and run `git add` again. For example:

```sh
magick ~/Pictures/blog-originals/trip.jpg \
  -auto-orient -resize '2040x2040>' -colorspace sRGB -strip -quality 82 \
  src/assets/trip.webp
```

Update image references if the filename changes. This hook checks individual
staged files; it does not enforce the total published site size.

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
