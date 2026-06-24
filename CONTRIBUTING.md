# Contributing

Thanks for your interest in contributing to the Next.js template.

## Prerequisites

- Node 24+, pnpm 11.2.2
- A [Clerk](https://clerk.com) application

## Setup

```bash
pnpm install
cp .env.local.example .env.local
# Fill in your Clerk publishable and secret keys
pnpm dev
```

The dev server runs on port 3001.

## Commands

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Dev server on port 3001             |
| `pnpm build`     | Production build                    |
| `pnpm lint`      | Biome check (linter + formatter)    |
| `pnpm format`    | Biome format write                  |
| `pnpm typecheck` | `tsc --noEmit`                      |

Run `pnpm typecheck && pnpm lint` before submitting changes.

## Pull request guidelines

- Branch: `feat/`, `fix/`, `chore/`, `docs/` prefix
- Keep changes focused to a single concern
- If adding an env var, update `.env.local.example` and document it in the README

See [docs/](docs/) for detailed guides on auth, theming, and deployment.
