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
}

export const ChatSection = ({
  activeTab,
  messageHistory,
  toolCalls,
  switchTab,
  askQuestion,
  isLoading,
}: ChatSectionProps) => (
  <div
    className="chat-section"
    style={{ flex: 0.4, display: "flex", flexDirection: "column" }}
  >
    <TabNav activeTab={activeTab} switchTab={switchTab} />

    {activeTab === "chat" && (
      <ChatMessages messageHistory={messageHistory} askQuestion={askQuestion} />
    )}

    {activeTab === "tools" && <ToolCallsSection toolCalls={toolCalls} />}

    {activeTab === "chat" && (
      <InputContainer askQuestion={askQuestion} isLoading={isLoading} />
    )}
  </div>
);
