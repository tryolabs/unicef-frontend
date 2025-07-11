import { useState, useEffect, useCallback } from "react";
import type { Message } from "../types/Message";
import { API_URL } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";

export type ToolCall = {
  question: string;
  toolCalls: Array<string | object>;
};

const generateUUID = (): string => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
};

export const useChat = () => {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);
  const [mapHTML, setMapHTML] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    setSessionId(generateUUID());
  }, []);

  const processStreamChunk = useCallback((data: any, question: string) => {
    const traceId = data.trace_id;
    const isThinkingChunk = data.is_thinking;

    if (data.html_content && data.html_content !== "") {
      setMapHTML(data.html_content);
    }

    if (data.response !== undefined) {
      let formattedResponse = data.response;

      // Check if this is a "Thought" and if we need to add a line break
      if (formattedResponse.includes("Thought")) {
        formattedResponse = formattedResponse.replace("Thought", "**Thought**");
      }

      if (formattedResponse.includes("Answer")) {
        formattedResponse = formattedResponse.replace("Answer", "\n**Answer**");
      }

      setMessageHistory((prev) => {
        const newHistory = [...prev];
        const messageIndex = newHistory.findIndex(
          (msg) =>
            msg.trace_id === traceId &&
            msg.is_thinking === isThinkingChunk &&
            !msg.is_finished
        );

        if (messageIndex >= 0) {
          // Update existing message
          const existingContent = newHistory[messageIndex].content;

          if (
            formattedResponse.includes("**Thought**") &&
            existingContent.includes("**Thought**")
          ) {
            formattedResponse = "\n" + formattedResponse;
          }

          newHistory[messageIndex] = {
            ...newHistory[messageIndex],
            content: existingContent + formattedResponse,
            is_finished: data.is_finished || false,
          };
        } else if (formattedResponse) {
          // Create new message
          newHistory.push({
            content: formattedResponse,
            role: "assistant",
            trace_id: traceId,
            is_finished: data.is_finished || false,
            is_thinking: isThinkingChunk,
          });
        }
        return newHistory;
      });
    }

    if (data.tool_call) {
      const toolCallsArray = Array.isArray(data.tool_call)
        ? data.tool_call
        : [data.tool_call];
      setToolCalls((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.question === question
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            toolCalls: [...updated[existingIndex].toolCalls, ...toolCallsArray],
          };
          return updated;
        }
        return [...prev, { question, toolCalls: toolCallsArray }];
      });
    }
  }, []);

  const askQuestion = useCallback(
    async (question: string): Promise<void> => {
      if (!question.trim()) return;

      const userMessage: Message = {
        content: question,
        role: "user",
        trace_id: generateUUID(),
      };

      setMessageHistory((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/ask`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            chat_messages: [...messageHistory, userMessage],
            session_id: sessionId,
          }),
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        if (!response.body) throw new Error("Response body is null");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value);
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const data = JSON.parse(line);
              processStreamChunk(data, question);
            } catch (e) {
              console.error("Error parsing streaming response:", e, line);
            }
          }
        }
      } catch (error) {
        console.error(error);
        setMessageHistory((prev) => [
          ...prev,
          {
            content: "Sorry, there was an error processing your request.",
            role: "assistant",
            trace_id: generateUUID(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messageHistory, sessionId, processStreamChunk, token]
  );

  return {
    messageHistory,
    toolCalls,
    mapHTML,
    isLoading,
    askQuestion,
  };
};
