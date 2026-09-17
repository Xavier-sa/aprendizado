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
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
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
