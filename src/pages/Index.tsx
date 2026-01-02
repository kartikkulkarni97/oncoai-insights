import { useRef, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import WelcomeScreen from "@/components/WelcomeScreen";
import Logo from "@/components/Logo";
import { useChat } from "@/hooks/useChat";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
    messages,
    isLoading,
    sendMessage,
    conversations,
    activeConversationId,
    startNewChat,
    selectConversation,
    deleteConversation,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleExampleClick = (query: string) => {
    sendMessage(query);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 h-full transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={(id) => {
            selectConversation(id);
            setMobileMenuOpen(false);
          }}
          onNew={() => {
            startNewChat();
            setMobileMenuOpen(false);
          }}
          onDelete={deleteConversation}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-4 p-4 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <Logo size="sm" />
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {messages.length === 0 ? (
            <WelcomeScreen onExampleClick={handleExampleClick} />
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 max-w-4xl mx-auto w-full">
            <ChatInput onSend={sendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
