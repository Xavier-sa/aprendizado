import { adminRepository } from "@/repositories/admin.repository";
import type { AdminTransactionFilters, AdminUsersFilters } from "@/schemas/admin.schema";

export const adminService = {
  users: (filters: AdminUsersFilters) => adminRepository.users(filters),
  transactions: (filters: AdminTransactionFilters) => adminRepository.transactions(filters),
  async dashboard() {
    const [summary, monthly] = await Promise.all([adminRepository.summary(), adminRepository.monthlySeries()]);
    return { summary, monthly };
  },
  async user(id: string, filters: AdminTransactionFilters) {
    const user = await adminRepository.user(id);
    if (!user) return null;
    const [summary, transactions] = await Promise.all([
      adminRepository.summary(id),
      adminRepository.transactions({ ...filters, userId: id }),
    ]);
    return { user, summary, transactions };
  },
};
