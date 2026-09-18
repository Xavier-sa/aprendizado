import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/admin-access";

/** Also use inside future pages/actions before accessing administrative data. */
export async function requireAdminPage() {
  const access = await getAdminAccess(await headers());
  if (access.status !== 200) redirect(access.status === 401 ? "/sign-in" : "/dashboard");
  return access;
}
