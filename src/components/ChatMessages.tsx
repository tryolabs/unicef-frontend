import { MessageBubble } from "./MessageBubble";
import { ExampleQuestions } from "./ExampleQuestions";
import type { Message } from "../types/Message";

interface ChatMessagesProps {
  messageHistory: Message[];
  askQuestion: (question: string) => Promise<void>;
}

export const ChatMessages = ({
  messageHistory,
  askQuestion,
}: ChatMessagesProps) => {
  if (messageHistory.length === 0) {
    return (
      <div id="chat-container" style={{ flex: 1, overflowY: "auto" }}>
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
    <div id="chat-container" style={{ flex: 1, overflowY: "auto" }}>
      {messageHistory.map((message) => (
        <MessageBubble key={message.trace_id} message={message} />
      ))}
    </div>
  );
};
