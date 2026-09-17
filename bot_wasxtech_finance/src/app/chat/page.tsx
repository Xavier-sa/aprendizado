import { ChatWindow } from "@/components/chat/ChatWindow";
import { categoryRepository } from "@/repositories/category.repository";

export const dynamic = "force-dynamic";

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await categoryRepository.findAll();
    return true;
  } catch {
    return false;
  }
}

export default async function ChatPage() {
  const connected = await checkDatabaseConnection();

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
