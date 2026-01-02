import { useState, useCallback } from "react";
import { Conversation } from "@/components/Sidebar";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/f2b650c6-a633-484d-8c58-687c4bd2d629/chat";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create or update conversation
    if (!activeConversationId) {
      const newConvId = generateId();
      const newConversation: Conversation = {
        id: newConvId,
        title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
        timestamp: new Date(),
        preview: content.slice(0, 60),
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(newConvId);
    }

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle the response - n8n typically returns an output field
      let assistantContent = "";
      if (typeof data === "string") {
        assistantContent = data;
      } else if (data.output) {
        assistantContent = data.output;
      } else if (data.text) {
        assistantContent = data.text;
      } else if (data.response) {
        assistantContent = data.response;
      } else if (data.message) {
        assistantContent = data.message;
      } else {
        // If we get a complex object, format it nicely
        assistantContent = JSON.stringify(data, null, 2);
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: `**Connection Error**\n\nUnable to connect to the AI agent. Please ensure:\n\n1. Your n8n instance is running at \`localhost:5678\`\n2. The webhook is active and accessible\n3. CORS is properly configured\n\nError details: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    // In a real app, you'd load messages for this conversation
    // For now, we'll just switch the active ID
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setMessages([]);
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  return {
    messages,
    isLoading,
    sendMessage,
    conversations,
    activeConversationId,
    startNewChat,
    selectConversation,
    deleteConversation,
  };
};
