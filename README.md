# Junaid Ali — Portfolio

<p align="center">
  <a href="https://developer-junaid.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-developer--junaid.vercel.app-2F80ED?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Bun-1.4-FFB000?style=flat-square&logo=bun&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-7-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-Hosted-000000?style=flat-square&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
</p>

## Overview

My personal portfolio website — a single-page React application served by a lightweight Bun HTTP server and bundled for production with Bun's bundler. It showcases my projects, experience, and contact details.

**Live:** https://developer-junaid.vercel.app/

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Runtime & bundler | Bun |
| Language | TypeScript 7 |
| Hosting | Vercel |

## Getting started

Prerequisites: [Bun](https://bun.sh) 1.4 or newer.

```bash
bun install
bun run dev
```

The dev server runs with hot reload (`bun --hot src/index.ts`).

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start the dev server with hot reload |
| `bun run build` | Bundle the app into `dist/` (minified, with source maps) and copy `public/` |
| `bun run start` | Run the production build |

## Project structure

```
src/        Application source (entry HTML and TypeScript)
public/     Static assets copied into the build output
assets/     Images and other media
docs/       Project documentation
.github/    Community health files
```

## Deployment

`vercel.json` contains the production configuration, so pushing to `main` deploys automatically.

## License

Distributed under the [MIT License](LICENSE).
