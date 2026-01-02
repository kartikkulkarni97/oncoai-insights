import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 animate-fade-in ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          isUser
            ? "bg-user-message"
            : "bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30"
        }`}
      >
        {isUser ? (
          <User size={20} className="text-foreground" />
        ) : (
          <Bot size={20} className="text-primary" />
        )}
      </div>
      <div
        className={`flex-1 max-w-[80%] ${
          isUser ? "flex flex-col items-end" : ""
        }`}
      >
        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? "bg-user-message rounded-tr-md"
              : "bg-agent-message rounded-tl-md border border-border"
          }`}
        >
          {isUser ? (
            <p className="text-foreground leading-relaxed">{content}</p>
          ) : (
            <div className="markdown-content text-foreground/90">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-2 px-2">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
