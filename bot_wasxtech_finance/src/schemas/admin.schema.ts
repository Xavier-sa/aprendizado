import { z } from "zod";

const optionalText = (max: number) => z.preprocess(
  (value) => value === "" ? undefined : value,
  z.string().trim().min(1).max(max).optional(),
);
const date = z.preprocess((value) => value === "" ? undefined : value,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "Data inválida").optional());
const pagination = {
  page: z.coerce.number().int().min(1).max(10000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
};
export const adminUsersSchema = z.object({ ...pagination, search: optionalText(200) }).strict();
export const adminTransactionsSchema = z.object({
  ...pagination,
  search: optionalText(200),
  userId: optionalText(128),
  categoryId: optionalText(128),
  type: z.preprocess((value) => value === "" ? undefined : value,
    z.enum(["INCOME", "EXPENSE"]).optional()),
  from: date,
  to: date,
}).strict().refine((value) => !value.from || !value.to || value.from <= value.to, {
  message: "Data inicial deve preceder a data final", path: ["to"],
});
export type AdminUsersFilters = z.infer<typeof adminUsersSchema>;
export type AdminTransactionFilters = z.infer<typeof adminTransactionsSchema>;
export type AdminSearchParams = Record<string, string | string[] | undefined>;

// Duplicate query values are rejected by Zod instead of silently picking one.
export function queryInput(params: URLSearchParams): AdminSearchParams {
  const result: AdminSearchParams = {};
  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    result[key] = values.length === 1 ? values[0] : values;
  }
  return result;
}
