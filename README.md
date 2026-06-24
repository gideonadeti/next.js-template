# Next.js Template

A production-ready [Next.js 16](https://nextjs.org) template with [Clerk](https://clerk.com) authentication, [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), and dark mode.

## Features

- **Authentication** — Clerk (sign-in, sign-up, user button) with middleware
- **Dark mode** — Light/dark/system toggle via `next-themes`
- **UI components** — shadcn/ui (radix-nova style) with Tailwind v4
- **Code quality** — Biome (linter + formatter), Husky + lint-staged
- **TypeScript** — Strict mode, `@/*` path alias
- **React Compiler** — Enabled in `next.config.ts`
- **Layout** — Semantic header/main/footer, loading, error, and 404 pages

## Prerequisites

- [Node.js](https://nodejs.org) 24+
- [pnpm](https://pnpm.io) 11.2.2
- A [Clerk](https://clerk.com) application (free tier)

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
#    Copy .env.local.example to .env.local and fill in your Clerk values:
#    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk Dashboard > API Keys)
#    - CLERK_SECRET_KEY                (from Clerk Dashboard > API Keys)

# 3. Start the dev server
pnpm dev
```

Visit `http://localhost:3000`. Sign up via the nav to test authentication.

## Project structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 + shadcn theme tokens
│   ├── layout.tsx           # Root layout (Clerk, ThemeProvider, header/footer)
│   ├── page.tsx             # Home page (auth-aware greeting)
│   ├── loading.tsx          # Loading spinner (page transitions)
│   ├── error.tsx            # Error boundary
│   └── not-found.tsx        # 404 page
├── components/
│   ├── ui/button.tsx        # shadcn/ui Button component
│   ├── theme-provider.tsx   # next-themes provider wrapper
│   └── theme-toggle.tsx     # Light/dark toggle button
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
└── proxy.ts                 # Clerk middleware (Next.js 16 name)
```

## Configuration

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (public, starts with `pk_`) |
| `CLERK_SECRET_KEY` | Clerk secret key (private, starts with `sk_`) |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (Next.js) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Biome check (linter + formatter) |
| `pnpm format` | Biome format (`--write`) |
| `pnpm typecheck` | TypeScript check (`--noEmit`) |

## Docs

- [Authentication](docs/auth.md) — Clerk setup, middleware, auth patterns
- [Theming](docs/theming.md) — Dark mode, CSS variables, custom tokens
- [Deployment](docs/deployment.md) — Build, environment variables, deploy targets

## License

MIT
