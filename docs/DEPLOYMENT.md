# Deployment

This site runs on [Vercel](https://vercel.com).

## Build settings

`vercel.json` in the repository root already defines the configuration, so no dashboard changes are required:

| Setting | Value |
|---|---|
| Build command | `bun run build` |
| Output directory | `dist` |
| Install command | `bun install` |

## How a release works

1. Push to `main` (or merge a pull request).
2. Vercel installs dependencies with Bun.
3. `bun run build` bundles `src/index.html` with Bun's bundler (minified, source maps, production `NODE_ENV`).
4. The `postbuild` step copies `public/` into `dist/`.
5. The new build goes live.

## Environment variables

Only variables prefixed with `BUN_PUBLIC_` are exposed to the browser bundle. Anything else stays server-side — never put secrets in a `BUN_PUBLIC_` variable.

## Local production check

Run the production build locally before pushing:

```bash
bun run build
bun run start
```
