import { requireAdminApi } from "@/lib/admin-access";
import { adminService } from "@/services/admin.service";
import { adminTransactionsSchema, adminUsersSchema, queryInput } from "@/schemas/admin.schema";

const json = (body: unknown, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

async function read(request: Request, work: () => Promise<Response>) {
  try {
    const denied = await requireAdminApi(request);
    if (denied) return denied;
    return await work();
  } catch {
    // Never log or expose raw authentication/Prisma errors with connection details.
    return json({ error: "Erro inesperado" }, 500);
  }
}
const invalid = () => json({ error: "Filtros inválidos" }, 400);
export const adminController = {
  dashboard: (request: Request) => read(request, async () => json(await adminService.dashboard())),
  users: (request: Request) => read(request, async () => {
    const parsed = adminUsersSchema.safeParse(queryInput(new URL(request.url).searchParams));
    if (!parsed.success) return invalid();
    return json(await adminService.users(parsed.data));
  }),
  transactions: (request: Request) => read(request, async () => {
    const parsed = adminTransactionsSchema.safeParse(queryInput(new URL(request.url).searchParams));
    if (!parsed.success) return invalid();
    return json(await adminService.transactions(parsed.data));
  }),
  user: (request: Request, id: string) => read(request, async () => {
    if (!id || id.length > 128) return invalid();
    const parsed = adminTransactionsSchema.safeParse(queryInput(new URL(request.url).searchParams));
    if (!parsed.success) return invalid();
    const data = await adminService.user(id, parsed.data);
    return data ? json(data) : json({ error: "Usuário não encontrado" }, 404);
  }),
};
