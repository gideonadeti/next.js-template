"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { setupAuthInterceptor, teardownAuthInterceptor } from "@/lib/api";

export function AuthTokenSetter({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    setupAuthInterceptor(getToken);

    return () => {
      teardownAuthInterceptor();
    };
  }, [getToken]);

  return <>{children}</>;
}
