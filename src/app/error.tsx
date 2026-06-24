"use client";

import { Button } from "@/components/ui/button";

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js error boundary convention
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">An unexpected error occurred.</p>
      <Button variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
