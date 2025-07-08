import { useState } from "react";
import type { KeyboardEvent } from "react";

interface InputContainerProps {
  askQuestion: (question: string) => Promise<void>;
  isLoading: boolean;
}

export const InputContainer = ({
  askQuestion,
  isLoading,
}: InputContainerProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (inputValue.trim()) {
      await askQuestion(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleSend();
    }
  };

  return (
    <div id="input-container" style={{ display: "flex" }}>
      <input
        type="text"
        id="question-input"
        style={{ flexGrow: 1, padding: "12px", fontSize: "14px" }}
        placeholder="Ask about global indicators, climate data, or request spatial analysis..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};
