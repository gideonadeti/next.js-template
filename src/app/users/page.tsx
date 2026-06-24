"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsers } from "@/hooks/use-users";

export default function UsersPage() {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-destructive">Failed to load users</p>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold tracking-tight">Users</h1>

      {users?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">No users found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-1">
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  Role: {user.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
