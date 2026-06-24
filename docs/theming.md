# Theming

The template supports light, dark, and system-preference themes via [next-themes](https://github.com/pacocoursey/next-themes).

## How it works

- **`ThemeProvider`** (`src/components/theme-provider.tsx`) wraps the app with `next-themes`
- **`ThemeToggle`** (`src/components/theme-toggle.tsx`) is a button that cycles between light and dark
- The `dark` class is applied to `<html>` — the existing `globals.css` has `.dark` variant rules for all shadcn tokens

### Configuration

In `src/app/layout.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
```

| Prop | Value | Effect |
|---|---|---|
| `attribute` | `"class"` | Toggles `dark` class on `<html>` |
| `defaultTheme` | `"system"` | Follows OS preference on first visit |
| `enableSystem` | `true` | Respects `prefers-color-scheme` |
| `disableTransitionOnChange` | `true` | Prevents flash on theme switch |

### Theme toggle

```tsx
// src/components/theme-toggle.tsx
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
}
```

The Sun icon shows in light mode, the Moon in dark mode, using Tailwind's `dark:` variant.

## CSS variables

The template uses shadcn/ui's CSS variable system defined in `src/app/globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... */
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(1 0 0);
  /* ... */
}
```

Use these variables in your components with Tailwind classes: `bg-background`, `text-foreground`, `bg-primary`, etc.

## Adding custom theme tokens

1. Add the variable in `globals.css` — both in `:root` (light) and `.dark` (dark)
2. Add it to the `@theme inline` block to expose it as a Tailwind utility
3. Use it: `text-my-token` / `bg-my-token`

## System preference

When `defaultTheme="system"` and `enableSystem` is set, the app reads `prefers-color-scheme` on first load. The toggle switches to an explicit theme after the user interacts.
