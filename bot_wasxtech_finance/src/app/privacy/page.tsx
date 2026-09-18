import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function PrivacyPage() {
  return <main className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-8 text-text-primary">
    <h1 className="text-2xl font-semibold">Dados e acesso administrativo</h1>
    <Card><p>O FinanceBot armazena os dados da sua conta e os registros financeiros que você informa para oferecer histórico, consultas e visualizações.</p>
      <p className="mt-4">Usuários comuns têm acesso apenas aos próprios registros. Administradores autorizados da plataforma podem consultar dados de contas e movimentações armazenadas para operação e suporte, incluindo nome, e-mail e valores registrados.</p>
      <p className="mt-4">Esse acesso é protegido no servidor e reservado a contas com permissão administrativa atual. As consultas administrativas não exibem senhas, hashes, tokens de sessão ou segredos de autenticação.</p>
      <p className="mt-4">Os valores registrados são informações fornecidas pelos usuários; não representam recursos financeiros pertencentes à plataforma.</p>
    </Card>
    <Link href="/" className="text-sm underline">Voltar ao FinanceBot</Link>
  </main>;
}
