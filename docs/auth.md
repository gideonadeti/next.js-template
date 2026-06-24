# Authentication

[Clerk](https://clerk.com) handles sign-in, sign-up, session management, and user profiles. The template uses `@clerk/nextjs`.

## Setup

### Environment variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_***
CLERK_SECRET_KEY=sk_***
```

Get both keys from the Clerk Dashboard > **API Keys**.

### Middleware

Defined in `src/proxy.ts` (named `proxy.ts` because Next.js 16 renamed the convention; the file acts as `middleware.ts`):

```ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

This protects all routes by default.

### Provider

In `src/app/layout.tsx`, `ClerkProvider` wraps the app inside `<body>`:

```tsx
<body>
  <ClerkProvider>
    {children}
  </ClerkProvider>
</body>
```

## Auth controls in the layout

The header conditionally renders sign-in/sign-up buttons or the user menu:

```tsx
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

<header>
  <Show when="signed-out">
    <SignInButton />
    <SignUpButton />
  </Show>
  <Show when="signed-in">
    <UserButton />
  </Show>
</header>
```

- `Show` renders children when the condition (`"signed-in"` / `"signed-out"`) is met
- `SignInButton` and `SignUpButton` open Clerk's default auth flows
- `UserButton` shows the signed-in user's avatar with a dropdown menu

## Server-side usage

Use `currentUser()` in server components or server actions:

```tsx
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  if (!user) return <p>Sign in to view this page.</p>;

  return <p>Welcome, {user.firstName}!</p>;
}
```

> **Note:** `auth()` and `currentUser()` are async. Always `await` them.

## Protecting routes

By default, middleware runs on all routes. To make a route public, add a `publicRoutes` or use `clerkMiddleware` with an allowlist. See [Clerk docs](https://clerk.com/docs/nextjs/getting-started/quickstart).

## Client-side usage

Use `useUser()` and `useAuth()` hooks in client components:

```tsx
"use client";
import { useUser } from "@clerk/nextjs";

export function Profile() {
  const { user } = useUser();
  return <p>{user?.fullName}</p>;
}
```
