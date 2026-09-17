import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Chat</h1>
        <p className="text-sm text-text-muted">
          Registre movimentações e faça perguntas sobre suas finanças.
        </p>
      </div>
      <ChatWindow />
    </div>
  );
}
