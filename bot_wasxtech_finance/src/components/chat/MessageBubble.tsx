interface MessageBubbleProps {
  role: "user" | "bot";
  text: string;
}

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] whitespace-pre-line break-words rounded-lg px-4 py-2.5 text-base leading-relaxed sm:max-w-[75%] lg:max-w-lg ${
          isUser
            ? "bg-accent text-accent-foreground"
            : "bg-surface-secondary text-text-primary"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
