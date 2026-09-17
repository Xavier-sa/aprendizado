import { Input, Select } from "@/components/ui/Input";
import type { CategoryDTO, TransactionType } from "@/types";

export interface FiltersValue {
  from: string;
  to: string;
  categoryId: string;
  type: TransactionType | "";
  search: string;
}

interface FiltersProps {
  value: FiltersValue;
  categories: CategoryDTO[];
  onChange: (value: FiltersValue) => void;
}

export function Filters({ value, categories, onChange }: FiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <Input
        placeholder="Buscar por descrição..."
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
        className="col-span-2 lg:col-span-1"
      />
      <Input
        type="date"
        value={value.from}
        onChange={(e) => onChange({ ...value, from: e.target.value })}
      />
      <Input
        type="date"
        value={value.to}
        onChange={(e) => onChange({ ...value, to: e.target.value })}
      />
      <Select
        value={value.type}
        onChange={(e) => onChange({ ...value, type: e.target.value as TransactionType | "" })}
      >
        <option value="">Todos os tipos</option>
        <option value="EXPENSE">Despesa</option>
        <option value="INCOME">Receita</option>
      </Select>
      <Select
        value={value.categoryId}
        onChange={(e) => onChange({ ...value, categoryId: e.target.value })}
      >
        <option value="">Todas as categorias</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
