// Skip Husky install in production and CI.
if (process.env.NODE_ENV === "production" || process.env.CI != null) {
  process.exit(0);
}

const husky = (await import("husky")).default;
console.log(husky());
