interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const EXAMPLE_QUESTIONS = [
  "How many children are exposed to wildfires in Uruguay?",
  "How many children were born in Ethiopia in 2020?",
  "How many children are exposed to coastal floods in Colombia?",
];

export const ExampleQuestions = ({
  onQuestionClick,
}: ExampleQuestionsProps) => (
  <div className="example-questions-chat">
    <div className="example-label">Try asking:</div>
    <div className="example-questions-list">
      {EXAMPLE_QUESTIONS.map((question, index) => (
        <div
          key={index}
          className="example-question"
          onClick={() => onQuestionClick(question)}
        >
          {question}
        </div>
      ))}
    </div>
  </div>
);
