import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";

const EXAMPLES = [
  "Gastei 80 reais no mercado",
  "Recebi 200 de dividendos",
  "Qual meu saldo?",
];

const FEATURES = [
  {
    title: "Registro por linguagem natural",
    description:
      "Escreva o que aconteceu, como você contaria para alguém — sem formulários.",
  },
  {
    title: "Dashboard",
    description:
      "Saldo, receitas, despesas do mês e gráficos, atualizados a cada lançamento.",
  },
  {
    title: "Histórico completo",
    description: "Consulte, filtre, edite e apague movimentações quando quiser.",
  },
  {
    title: "Categorias",
    description:
      "Categorias padrão para começar, e você pode criar as suas pelo próprio chat.",
  },
  {
    title: "Receitas x despesas",
    description: "Acompanhe a evolução mensal e compare um mês com o outro.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-6 sm:px-8">
        <span className="text-lg font-semibold tracking-tight text-text-primary">
          FinanceBot
        </span>
        <nav className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Criar conta</Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-10 px-4 py-10 text-center sm:px-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Organização financeira por conversa
          </h1>
          <p className="max-w-xl text-text-muted">
            Em vez de preencher formulários, você escreve o que aconteceu — o
            FinanceBot interpreta, pede confirmação e mantém seu histórico,
            dashboard e categorias sempre atualizados.
          </p>
          <div className="flex gap-3">
            <Link href="/sign-up">
              <Button>Criar conta</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="secondary">Entrar</Button>
            </Link>
          </div>
        </div>

        <Card className="w-full text-left">
          <CardTitle>No chat, você diz</CardTitle>
          <div className="mt-3 flex flex-col gap-2">
            {EXAMPLES.map((example) => (
              <p
                key={example}
                className="rounded-md bg-surface-secondary px-3 py-2 text-sm text-text-primary"
              >
                &ldquo;{example}&rdquo;
              </p>
            ))}
          </div>
        </Card>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="text-left">
              <CardTitle className="text-text-primary">{feature.title}</CardTitle>
              <p className="mt-1 text-sm text-text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-4 py-6 text-center text-xs text-text-muted sm:px-8">
        Projeto educacional de organização financeira. Não constitui
        recomendação financeira.
        <Link href="/privacy" className="mt-2 block underline">Dados e acesso administrativo</Link>
      </footer>
    </div>
  );
}
