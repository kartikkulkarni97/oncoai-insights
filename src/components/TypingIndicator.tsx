import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 animate-pulse-glow">
        <Bot size={20} className="text-primary" />
      </div>
      <div className="bg-agent-message rounded-2xl rounded-tl-md border border-border px-5 py-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-primary rounded-full typing-dot" />
          <div className="w-2 h-2 bg-primary rounded-full typing-dot" />
          <div className="w-2 h-2 bg-primary rounded-full typing-dot" />
          <span className="ml-2 text-sm text-muted-foreground">
            Analyzing data...
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
