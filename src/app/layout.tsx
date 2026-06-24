import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";

import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { AuthTokenSetter } from "@/lib/auth-token-setter";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Template",
  description:
    "A Next.js template with Clerk auth, Tailwind v4, shadcn/ui, and dark mode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <QueryProvider>
              <AuthTokenSetter>
                <header className="flex items-center justify-end gap-4 p-4">
                  <nav className="flex items-center gap-4 mr-auto">
                    <Link
                      href="/"
                      className="text-sm font-medium hover:underline"
                    >
                      Home
                    </Link>
                    <Link
                      href="/users"
                      className="text-sm font-medium hover:underline"
                    >
                      Users
                    </Link>
                  </nav>
                  <ThemeToggle />
                  <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton />
                  </Show>
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </header>
                <main className="flex-1">{children}</main>
                <footer className="p-4 text-center text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} Next.js Template
                </footer>
                <Toaster />
              </AuthTokenSetter>
            </QueryProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
