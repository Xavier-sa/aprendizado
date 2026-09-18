import { adminController } from "@/controllers/admin.controller";
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  return adminController.user(request, (await context.params).id);
}
