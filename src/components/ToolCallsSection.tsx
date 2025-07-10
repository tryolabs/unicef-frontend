import type { ToolCall } from "../types/Message";

interface ToolCallsSectionProps {
  toolCalls: ToolCall[];
}

export const ToolCallsSection = ({ toolCalls }: ToolCallsSectionProps) => (
  <div id="chain-of-thought-container">
    {toolCalls.map((item, idx) => (
      <div key={idx} style={{ marginBottom: "20px" }}>
        <div className="thought-question">
          <strong>Question:</strong> {item.question}
        </div>
        <hr
          style={{
            margin: "15px 0",
            border: "none",
            borderTop: "1px solid var(--border-color)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {item.toolCalls.map((toolCall, tIndex) => (
            <div className="thought-step" key={tIndex}>
              <strong>Step {tIndex + 1}</strong>
              <pre>
                {typeof toolCall === "object"
                  ? JSON.stringify(toolCall, null, 2)
                  : toolCall}
              </pre>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
