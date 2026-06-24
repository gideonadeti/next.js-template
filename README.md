# Next.js Template

A production-ready [Next.js 16](https://nextjs.org) template with [Clerk](https://clerk.com) authentication, [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), and dark mode.

## Features

- **Authentication** — Clerk (sign-in, sign-up, user button) with middleware
- **Dark mode** — Light/dark/system toggle via `next-themes`
- **UI components** — shadcn/ui (radix-nova style) with Tailwind v4
- **Code quality** — Biome (linter + formatter), Husky + lint-staged
- **TypeScript** — Strict mode, `@/*` path alias
- **React Compiler** — Enabled in `next.config.ts`
- **Data fetching** — TanStack Query + Axios with Clerk JWT auth interceptor
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

Visit `http://localhost:3001`. Sign up via the nav to test authentication.

## Project structure

```text
src/
├── app/
│   ├── globals.css          # Tailwind v4 + shadcn theme tokens
│   ├── layout.tsx           # Root layout (Clerk, ThemeProvider, header/footer)
│   ├── page.tsx             # Home page (auth-aware greeting)
│   ├── loading.tsx          # Loading spinner (page transitions)
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # 404 page
│   └── users/
│       └── page.tsx         # Users listing via useUsers() hook
├── components/
│   ├── ui/
│   │   ├── button.tsx       # shadcn/ui Button
│   │   ├── card.tsx         # shadcn/ui Card
│   │   ├── dialog.tsx       # shadcn/ui Dialog
│   │   ├── form.tsx         # shadcn/ui Form
│   │   ├── input.tsx        # shadcn/ui Input
│   │   ├── label.tsx        # shadcn/ui Label
│   │   └── sonner.tsx       # shadcn/ui Sonner toasts
│   ├── query-provider.tsx   # TanStack Query provider (staleTime: 30s)
│   ├── theme-provider.tsx   # next-themes provider wrapper
│   └── theme-toggle.tsx     # Light/dark toggle button
├── hooks/
│   └── use-users.ts         # useUsers() / useUser() hooks
├── lib/
│   ├── api.ts               # Axios instance + auth interceptor
│   ├── auth-token-setter.tsx # Clerk JWT → Axios interceptor
│   ├── users.ts             # Typed user API functions
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
└── proxy.ts                 # Clerk middleware (Next.js 16 name)
```

## Configuration

| Variable                            | Description                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (public, starts with `pk_`)           |
| `CLERK_SECRET_KEY`                  | Clerk secret key (private, starts with `sk_`)               |
| `NEXT_PUBLIC_BACKEND_BASE_URL`      | NestJS backend URL (default: `http://localhost:3000/api/v1`) |

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Start dev server on port 3001    |
| `pnpm build`     | Production build                 |
| `pnpm start`     | Start production server          |
| `pnpm lint`      | Biome check (linter + formatter) |
| `pnpm format`    | Biome format (`--write`)         |
| `pnpm typecheck` | TypeScript check (`--noEmit`)    |

## Docs

- [Authentication](docs/auth.md) — Clerk setup, middleware, auth patterns
- [Theming](docs/theming.md) — Dark mode, CSS variables, custom tokens
- [Deployment](docs/deployment.md) — Build, environment variables, deploy targets

## License

MIT
