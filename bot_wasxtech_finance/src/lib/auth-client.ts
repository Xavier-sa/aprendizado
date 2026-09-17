import { createAuthClient } from "better-auth/react";

/** Sem `baseURL`: o cliente chama `/api/auth/*` na própria origem. */
export const authClient = createAuthClient();
