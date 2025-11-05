import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as authSchema from "../db/schema/auth-schema";
import { openAPI } from "better-auth/plugins";
import { signInEmail } from "better-auth/api";

const authConfig = {
  emailAndPassword: {
    enabled: true,
    redirect: true,
    callbackURL: "http://localhost:8787/dashboard"
  },

  plugins: [
    openAPI(),
  ],
  
};

export const createAuth = (env: CloudflareBindings) => {
  const db = drizzle(env.db);
  return betterAuth({
    ...authConfig,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: authSchema
    }),
  });
};

// Mock for CLI
export const auth = betterAuth({
  ...authConfig,
  database: drizzleAdapter({} as D1Database, {
    provider: "sqlite",
  })
});
