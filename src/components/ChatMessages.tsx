import { useMemo } from "react";
import { MessageBubble } from "./MessageBubble";
import { ExampleQuestions } from "./ExampleQuestions";
import type { Message } from "../types/Message";
import { useAutoScroll } from "../hooks/useAutoScroll";

interface ChatMessagesProps {
  messageHistory: Message[];
  askQuestion: (question: string) => Promise<void>;
}

export const ChatMessages = ({
  messageHistory,
  askQuestion,
}: ChatMessagesProps) => {
  // Create a lightweight signature so we auto-scroll when the latest message content changes
  const latestSignature = useMemo(() => {
    if (messageHistory.length === 0) return "";
    const last = messageHistory[messageHistory.length - 1];
    return `${last.trace_id}:${last.content?.length || 0}:${
      last.is_finished ? 1 : 0
    }:${last.is_thinking ? 1 : 0}`;
  }, [messageHistory]);

  const containerRef = useAutoScroll([latestSignature]);

  if (messageHistory.length === 0) {
    return (
      <div
        id="chat-container"
        ref={containerRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
      >
        <div className="welcome-container">
          <h3>Welcome to UNICEF Geospatial Analysis Assistant</h3>
          <p>
            Start by asking a question about UNICEF data or geospatial analysis.
          </p>
          <ExampleQuestions onQuestionClick={askQuestion} />
        </div>
      </div>
    );
  }

  return (
    <div
      id="chat-container"
      ref={containerRef}
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {messageHistory.map((message) => (
        <MessageBubble key={message.trace_id} message={message} />
      ))}
    </div>
  );
};
