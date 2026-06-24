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

`clerkMiddleware()` parses the session on every matched request — it does **not** protect routes by itself. Use `auth().protect()` in server components or `@clerk/nextjs` helpers on the client to enforce authentication (see below).

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

Use `auth().protect()` in server components or server actions to require authentication:

```tsx
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = await auth.protect();
  return <p>Hello {userId}</p>;
}
```

To make individual routes public without removing the middleware matcher, use `auth()` without `protect()` and handle the unauthenticated case yourself, or rely on client-side helpers like `SignInButton`.

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

## API auth (NestJS backend)

The template includes an Axios client (`src/lib/api.ts`) pre-configured for the NestJS backend.
An `AuthTokenSetter` component runs inside `<ClerkProvider>` and automatically injects the
Clerk session JWT as a `Bearer` token on every outgoing request:

```tsx
// src/lib/auth-token-setter.tsx
export function AuthTokenSetter({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setAuthToken(token ?? null));
  }, [getToken]);

  return <>{children}</>;
}
```

This satisfies the backend's `ClerkAuthGuard` and auto-provisions the user on first request.

### Environment variable

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```
