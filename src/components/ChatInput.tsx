import { Send, Sparkles } from "lucide-react";
import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "./ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  const placeholders = [
    "Ask about gene mutations in lung cancer...",
    "Query survival data for BRCA1 patients...",
    "Find clinical trials with TP53 alterations...",
    "Analyze expression profiles for melanoma...",
  ];

  const [placeholder] = useState(
    placeholders[Math.floor(Math.random() * placeholders.length)]
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent h-8 -top-8 pointer-events-none" />
      <div className="bg-card border border-border rounded-2xl p-2 shadow-card">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder={placeholder}
              disabled={isLoading}
              rows={1}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none px-4 py-3 max-h-[200px] leading-relaxed"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            {isLoading ? (
              <Sparkles size={20} className="animate-pulse" />
            ) : (
              <Send size={20} />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between px-4 pt-2 pb-1 border-t border-border/50 mt-2">
          <span className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles size={12} className="text-primary" />
            Powered by Genesilico AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
