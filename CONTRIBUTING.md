# Contributing

Thanks for your interest in improving this portfolio site.

## Workflow

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b fix/short-description
   ```
2. Make your changes and verify them locally:
   ```bash
   bun install
   bun run dev
   bun run build
   ```
3. Commit with a clear message describing the change.
4. Open a pull request against `main` and fill in the template.

## Guidelines

- Keep the bundle small: avoid heavy dependencies for small improvements.
- Match the existing TypeScript and React style; the codebase targets strict TypeScript.
- Test the production build (`bun run build`) before requesting review.
- One focused change per pull request.

## Reporting bugs

Use the bug report issue template and include the browser, the steps to reproduce, and what you expected versus what happened.
