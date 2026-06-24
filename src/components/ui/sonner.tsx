"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      position="top-right"
      theme={resolvedTheme as "light" | "dark" | "system"}
      toastOptions={{
        className: "group/sonner",
      }}
    />
  );
}

export { Toaster };
