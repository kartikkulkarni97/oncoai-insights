import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./Logo";

export interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  isCollapsed,
  onToggle,
}: SidebarProps) => {
  return (
    <div
      className={`h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && <Logo size="sm" />}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground hover:bg-sidebar-accent ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNew}
          className={`w-full bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 border border-primary/30 text-foreground ${
            isCollapsed ? "px-0 justify-center" : ""
          }`}
        >
          <Plus size={18} className={isCollapsed ? "" : "mr-2"} />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Recent Chats
          </div>
        )}
        <div className="space-y-1">
          {conversations.map((conv, index) => (
            <div
              key={conv.id}
              className={`group relative animate-slide-in-left`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left rounded-lg transition-all ${
                  activeId === conv.id
                    ? "bg-sidebar-accent border-l-2 border-primary"
                    : "hover:bg-sidebar-accent/50"
                } ${isCollapsed ? "p-2 justify-center flex" : "p-3"}`}
              >
                {isCollapsed ? (
                  <MessageSquare size={18} className="text-muted-foreground" />
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={16}
                        className="text-muted-foreground mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">
                          {conv.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {conv.preview}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1.5">
                      {conv.timestamp.toLocaleDateString()}
                    </div>
                  </>
                )}
              </button>
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            Cancer Genomics Assistant
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
