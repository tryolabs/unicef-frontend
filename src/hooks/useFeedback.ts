import { useState, useCallback } from "react";
import { LangfuseWeb } from "langfuse";
import type { Message } from "../types/Message";

export const useFeedback = () => {
  const [feedbackState, setFeedbackState] = useState<Record<string, number>>(
    {}
  );

  const submitFeedback = useCallback(
    async (message: Message, value: number) => {
      try {
        const langfuseWeb = new LangfuseWeb({
          publicKey: import.meta.env.VITE_LANGFUSE_PUBLIC_KEY,
        });

        await langfuseWeb.score({
          traceId: message.trace_id,
          name: "user_feedback",
          value,
        });

        setFeedbackState((prev) => ({
          ...prev,
          [message.trace_id]: value,
        }));
      } catch (error) {
        console.error("Failed to submit feedback:", error);
      }
    },
    []
  );

  const getFeedbackState = useCallback(
    (traceId: string) => {
      return {
        hasGivenFeedback: feedbackState[traceId] !== undefined,
        feedbackValue: feedbackState[traceId],
      };
    },
    [feedbackState]
  );

  return { submitFeedback, getFeedbackState };
};
