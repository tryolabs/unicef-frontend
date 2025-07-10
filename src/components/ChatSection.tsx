import { TabNav } from "./TabNav";
import { ChatMessages } from "./ChatMessages";
import { ToolCallsSection } from "./ToolCallsSection";
import { InputContainer } from "./InputContainer";
import type { Message, ToolCall } from "../types/Message";

interface ChatSectionProps {
  activeTab: "chat" | "tools";
  messageHistory: Message[];
  toolCalls: ToolCall[];
  switchTab: (tab: "chat" | "tools") => void;
  askQuestion: (question: string) => Promise<void>;
  isLoading: boolean;
  leftWidth?: number;
  onWidthChange?: (width: number) => void;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export const ChatSection = ({
  activeTab,
  messageHistory,
  toolCalls,
  switchTab,
  askQuestion,
  isLoading,
  leftWidth,
  onWidthChange,
  minLeftWidth,
  minRightWidth,
}: ChatSectionProps) => (
  <div className="chat-section">
    <TabNav
      activeTab={activeTab}
      switchTab={switchTab}
      leftWidth={leftWidth}
      onWidthChange={onWidthChange}
      minLeftWidth={minLeftWidth}
      minRightWidth={minRightWidth}
    />

    {activeTab === "chat" && (
      <ChatMessages messageHistory={messageHistory} askQuestion={askQuestion} />
    )}

    {activeTab === "tools" && <ToolCallsSection toolCalls={toolCalls} />}

    {activeTab === "chat" && (
      <InputContainer askQuestion={askQuestion} isLoading={isLoading} />
    )}
  </div>
);
