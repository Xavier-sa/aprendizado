import { getUserId } from "@/lib/session";
import { preferenceRepository } from "@/repositories/preference.repository";
import { appearanceSchema } from "@/schemas/appearance.schema";

const json = (body: unknown, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin && request.headers.get("sec-fetch-site") !== "cross-site";
}
export const appearanceController = {
  async get(request: Request) {
    try {
      const userId = await getUserId(request);
      if (!userId) return json({ error: "Não autenticado" }, 401);
      if (new URL(request.url).search) return json({ error: "Parâmetros não permitidos" }, 400);
      return json({ theme: await preferenceRepository.get(userId) });
    } catch {
      return json({ error: "Erro inesperado" }, 500);
    }
  },
  async patch(request: Request) {
    try {
      const userId = await getUserId(request);
      if (!userId) return json({ error: "Não autenticado" }, 401);
      if (!sameOrigin(request)) return json({ error: "Origem não permitida" }, 403);
      if (new URL(request.url).search) return json({ error: "Parâmetros não permitidos" }, 400);
      if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
        return json({ error: "Use application/json" }, 415);
      }
      let body: unknown;
      try { body = await request.json(); } catch { return json({ error: "JSON inválido" }, 400); }
      const parsed = appearanceSchema.safeParse(body);
      if (!parsed.success) return json({ error: "Preferência inválida" }, 400);
      return json({ theme: await preferenceRepository.set(userId, parsed.data.theme) });
    } catch {
      return json({ error: "Erro inesperado" }, 500);
    }
  },
};
