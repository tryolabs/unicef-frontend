import { useFeedback } from "../hooks/useFeedback";
import type { Message } from "../types/Message";

interface FeedbackButtonsProps {
  message: Message;
}

export const FeedbackButtons = ({ message }: FeedbackButtonsProps) => {
  const { submitFeedback, getFeedbackState } = useFeedback();
  const { hasGivenFeedback, feedbackValue } = getFeedbackState(
    message.trace_id
  );

  const handleFeedback = (value: number) => {
    if (!hasGivenFeedback) {
      submitFeedback(message, value);
    }
  };

  return (
    <div className="feedback-buttons">
      <button
        onClick={() => handleFeedback(1)}
        disabled={hasGivenFeedback}
        className={`feedback-button ${
          hasGivenFeedback && feedbackValue === 1 ? "feedback-selected" : ""
        }`}
        title={hasGivenFeedback ? "Feedback already given" : "Helpful"}
      >
        👍
      </button>
      <button
        onClick={() => handleFeedback(0)}
        disabled={hasGivenFeedback}
        className={`feedback-button ${
          hasGivenFeedback && feedbackValue === 0 ? "feedback-selected" : ""
        }`}
        title={hasGivenFeedback ? "Feedback already given" : "Not helpful"}
      >
        👎
      </button>
    </div>
  );
};
