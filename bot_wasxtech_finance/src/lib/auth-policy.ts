import { APIError, createAuthMiddleware } from "better-auth/api";

/** Server-owned field: reject attempts explicitly, including null/empty values. */
export const rolePolicy = {
  user: {
    additionalFields: {
      role: { type: "string" as const, required: false, input: false, defaultValue: "USER" },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.body && Object.prototype.hasOwnProperty.call(ctx.body, "role")) {
        throw new APIError("BAD_REQUEST", {
          code: "ROLE_READ_ONLY",
          message: "Não é permitido definir ou alterar role pela API de autenticação.",
        });
      }
    }),
  },
};
