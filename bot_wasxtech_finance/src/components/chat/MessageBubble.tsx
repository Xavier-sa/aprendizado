interface MessageBubbleProps {
  role: "user" | "bot";
  text: string;
}

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-sm sm:max-w-[70%] ${
          isUser
            ? "bg-accent text-surface"
            : "bg-surface-secondary text-text-primary"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
