import { requireAdminApi } from "@/lib/admin-access";

/** Protected namespace only; no administrative functionality in Phase 2. */
async function unavailable(request: Request) {
  const denied = await requireAdminApi(request);
  if (denied) return denied;
  return Response.json({ error: "Não encontrado" }, {
    status: 404,
    headers: { "Cache-Control": "no-store" },
  });
}

export { unavailable as GET, unavailable as POST, unavailable as PUT,
  unavailable as PATCH, unavailable as DELETE, unavailable as HEAD,
  unavailable as OPTIONS };
