"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { setAuthToken } from "@/lib/api";

export function AuthTokenSetter({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setAuthToken(token ?? null));
  }, [getToken]);

  return <>{children}</>;
}
