import ReactMarkdown from "react-markdown";
import { FeedbackButtons } from "./FeedbackButtons";
import type { Message } from "../types/Message";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { role, is_thinking, is_finished, content } = message;
  const isUser = role === "user";
  const isThinking = is_thinking && !isUser;

  const getMessageClassName = () => {
    if (isUser) return "user-message-container";
    if (isThinking) return "thinking-message-container";
    return "assistant-message-container";
  };

  const getBubbleClassName = () => {
    if (isUser) return "user-message";
    if (isThinking) return "thinking-message";
    return "assistant-message";
  };

  return (
    <div className={`message-container ${getMessageClassName()}`}>
      {isThinking && <div className="thinking-label">Thinking...</div>}

      <div className={`message ${getBubbleClassName()}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {!isUser && !isThinking && is_finished && (
        <FeedbackButtons message={message} />
      )}
    </div>
  );
};
