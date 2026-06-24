import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Next.js Template</h1>
      {user ? (
        <p className="text-lg text-muted-foreground">
          Welcome back,{" "}
          <span className="font-medium text-foreground">
            {user.firstName || user.emailAddresses[0]?.emailAddress}
          </span>
          .
        </p>
      ) : (
        <p className="text-lg text-muted-foreground">Sign in to get started.</p>
      )}
    </div>
  );
}
