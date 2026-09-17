import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { categoryRepository } from "@/repositories/category.repository";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function checkDatabaseConnection(userId: string): Promise<boolean> {
  try {
    await categoryRepository.findAll(userId);
    return true;
  } catch {
    return false;
  }
}

export default async function ChatPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const connected = await checkDatabaseConnection(session.user.id);

  return (
    // Mesma largura do Dashboard/Movimentações: sem max-w/mx-auto próprio,
    // só o padding padrão do <main> do Shell (ver comentário abaixo sobre
    // a altura). O painel do chat ocupa 100% dessa largura — só as bolhas
    // de mensagem (MessageBubble) têm um limite de largura próprio, para
    // não ficarem esticadas de ponta a ponta em telas largas.
    //
    // Altura = viewport menos o padding vertical real do <main> do Shell
    // (pt-6+pb-20 no mobile, para não ficar atrás do MobileNav fixo;
    // pt-6+md:pb-6 no desktop). `dvh` em vez de `vh` evita o salto da
    // barra de endereço do navegador mobile. O cabeçalho abaixo tem altura
    // natural (shrink-0); o ChatWindow ocupa o restante via flex-1.
    <div className="flex h-[calc(100dvh-6.5rem)] flex-col gap-4 md:h-[calc(100dvh-3rem)]">
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">FinanceBot</h1>
          <p className="text-sm text-text-muted">Registre seus gastos conversando.</p>
        </div>
        <span
          className={`mt-1 flex items-center gap-1.5 whitespace-nowrap text-xs ${
            connected ? "text-income" : "text-expense"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-income" : "bg-expense"}`}
          />
          {connected ? "Banco conectado" : "Banco indisponível"}
        </span>
      </div>
      <ChatWindow />
    </div>
  );
}
