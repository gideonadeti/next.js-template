# Deployment

## Build

```bash
pnpm build
```

Output goes to `.next/`. You can test it locally with:

```bash
pnpm start
```

## Environment variables

These must be set in your deployment environment:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_***
CLERK_SECRET_KEY=sk_***
```

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is public and must be available to the browser. `CLERK_SECRET_KEY` is server-only.

## Deploy targets

### Vercel (recommended)

1. Push to a Git repository
2. Import on [Vercel](https://vercel.com/new)
3. Set the two environment variables in the project settings
4. Deploy — zero configuration needed for Next.js

### Other platforms

Most platforms (Netlify, Railway, Docker) can deploy Next.js. Make sure:

- The build command is `pnpm build`
- The output directory is `.next` (default)
- The start command is `pnpm start`
- Both Clerk env vars are set

## Clerk configuration

In your Clerk Dashboard > **Sessions**, add your production URL to:

- **Application URLs** → **Redirect URLs** (e.g. `https://yourdomain.com`)
- **Application URLs** → **Post-sign-up URL**
- **Application URLs** → **Post-sign-in URL**

## Checklist

1. Run `pnpm typecheck` and `pnpm lint`
2. Run `pnpm build` — confirm it succeeds
3. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in the deployment
4. Update Clerk Dashboard with your production URLs
5. Deploy and test sign-up/sign-in flow
