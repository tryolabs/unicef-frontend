import { useState } from "react";
import type { KeyboardEvent } from "react";

interface InputContainerProps {
  askQuestion: (question: string) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

export const InputContainer = ({
  askQuestion,
  isLoading,
  error,
}: InputContainerProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (isLoading) return; // Prevent multiple sends while processing
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    // Clear immediately for responsive UX
    setInputValue("");
    await askQuestion(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      id="input-container"
      style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}
      aria-busy={isLoading}
    >
      <textarea
        id="question-input"
        aria-label="Message input"
        placeholder="Ask about global indicators, climate data, or request spatial analysis..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        style={{
          flexGrow: 1,
          padding: "12px",
          fontSize: "14px",
          resize: "vertical",
          lineHeight: "22px",
        }}
      />
      <button
        className="send-button"
        onClick={handleSend}
        aria-label="Send message"
        disabled={isLoading || !inputValue.trim()}
        style={{
          minHeight: 46,
          padding: "10px 18px",
          borderRadius: 15,
        }}
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send"
        )}
      </button>
      {error && (
        <div role="status" aria-live="polite" className="sr-only">
          {error}
        </div>
      )}
    </div>
  );
};
