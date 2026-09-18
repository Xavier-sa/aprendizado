import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { rolePolicy } from "@/lib/auth-policy";

/**
 * Configuração central do Better Auth. E-mail/senha por enquanto — login
 * social (Google) pode ser adicionado depois só com `socialProviders`,
 * sem mudar o schema (ver docs/authentication.md).
 */
export const auth = betterAuth({
  ...rolePolicy,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
});
