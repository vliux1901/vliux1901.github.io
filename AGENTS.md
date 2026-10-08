## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Photo privacy

Before committing or publishing changes that add, modify, or newly reference photos:

- Visually inspect every affected photo at full resolution, enlarging any small markings. Include existing photos newly reused in a post.
- Remove or mask visible serial numbers and any adjacent machine-readable codes that may encode them. Preserve model names, caliber markings, and measurement results.
- Use precise ImageMagick masks for redaction, as authorized by the user. Preserve the photo's framing and other details; do not regenerate documentary photos with AI.
- Inspect the final compressed image again after editing. Ensure the staged image matches the reviewed version, and keep unredacted originals out of committed or published assets.
- Build the site and verify the generated images and affected page references use the redacted versions. Check shared images wherever they are used.
- Report which photos were checked and redacted. The image-size hook does not detect serial numbers; visual review is required even when automated checks pass.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
