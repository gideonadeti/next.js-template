"use client";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { User } from "@/lib/users";
import { getUser, getUsers } from "@/lib/users";

const USERS_KEY = ["users"] as const;

export function useUsers() {
  return useQuery<User[], AxiosError<{ message: string }>>({
    queryKey: USERS_KEY,
    queryFn: getUsers,
  });
}

export function useUser(id: string) {
  return useQuery<User, AxiosError<{ message: string }>>({
    queryKey: [...USERS_KEY, id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
