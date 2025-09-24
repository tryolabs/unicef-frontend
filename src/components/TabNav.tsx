import { useState, useEffect } from "react";

interface TabNavProps {
  activeTab: "chat" | "tools";
  switchTab: (tab: "chat" | "tools") => void;
  leftWidth?: number;
  onWidthChange?: (width: number) => void;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export const TabNav = ({
  activeTab,
  switchTab,
  leftWidth = 50,
  onWidthChange,
  minLeftWidth = 35,
  minRightWidth = 35,
}: TabNavProps) => {
  const [isEditingLeft, setIsEditingLeft] = useState(false);
  const [isEditingRight, setIsEditingRight] = useState(false);
  const [leftValue, setLeftValue] = useState(leftWidth.toString());
  const [rightValue, setRightValue] = useState((100 - leftWidth).toString());

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onWidthChange?.(value);
    setLeftValue(value.toString());
    setRightValue((100 - value).toString());
  };

  const handleLeftPercentageEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeftValue(e.target.value);
  };

  const handleRightPercentageEdit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRightValue(e.target.value);
  };

  const handleLeftPercentageSubmit = () => {
    const value = parseInt(leftValue);
    if (!isNaN(value)) {
      // Clamp the value to the valid range
      const clampedValue = Math.max(
        minLeftWidth,
        Math.min(100 - minRightWidth, value)
      );
      onWidthChange?.(clampedValue);
      setLeftValue(clampedValue.toString());
      setRightValue((100 - clampedValue).toString());
    } else {
      // If not a valid number, revert to current value
      setLeftValue(leftWidth.toString());
    }
    setIsEditingLeft(false);
  };

  const handleRightPercentageSubmit = () => {
    const value = parseInt(rightValue);
    if (!isNaN(value)) {
      // Clamp the value to the valid range
      const clampedValue = Math.max(
        minRightWidth,
        Math.min(100 - minLeftWidth, value)
      );
      const newLeftWidth = 100 - clampedValue;
      onWidthChange?.(newLeftWidth);
      setLeftValue(newLeftWidth.toString());
      setRightValue(clampedValue.toString());
    } else {
      // If not a valid number, revert to current value
      setRightValue((100 - leftWidth).toString());
    }
    setIsEditingRight(false);
  };

  const handleLeftKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLeftPercentageSubmit();
    } else if (e.key === "Escape") {
      setLeftValue(leftWidth.toString());
      setIsEditingLeft(false);
    }
  };

  const handleRightKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRightPercentageSubmit();
    } else if (e.key === "Escape") {
      setRightValue((100 - leftWidth).toString());
      setIsEditingRight(false);
    }
  };

  // Update local values when leftWidth prop changes
  useEffect(() => {
    if (!isEditingLeft && !isEditingRight) {
      setLeftValue(Math.round(leftWidth).toString());
      setRightValue(Math.round(100 - leftWidth).toString());
    }
  }, [leftWidth, isEditingLeft, isEditingRight]);

  return (
    <div className="tab-container" role="tablist" aria-label="Sections">
      <div className="tab-section">
        <button
          className={`tab ${activeTab === "chat" ? "active" : ""}`}
          role="tab"
          aria-selected={activeTab === "chat"}
          aria-controls="chat-panel"
          onClick={() => switchTab("chat")}
        >
          Chat
        </button>
        <button
          className={`tab ${activeTab === "tools" ? "active" : ""}`}
          role="tab"
          aria-selected={activeTab === "tools"}
          aria-controls="tools-panel"
          onClick={() => switchTab("tools")}
        >
          Tools
        </button>
      </div>

      {onWidthChange && (
        <div className="panel-size-control">
          <span className="control-label-compact">Layout:</span>
          <div className="compact-slider-container">
            <input
              type="range"
              min={minLeftWidth}
              max={100 - minRightWidth}
              value={leftWidth}
              onChange={handleSliderChange}
              className="compact-slider"
            />
            <div className="size-display">
              <div className="percentage-input">
                {isEditingLeft ? (
                  <input
                    type="number"
                    value={leftValue}
                    onChange={handleLeftPercentageEdit}
                    onBlur={handleLeftPercentageSubmit}
                    onKeyDown={handleLeftKeyPress}
                    className="percentage-edit"
                    min={minLeftWidth}
                    max={100 - minRightWidth}
                    autoFocus
                  />
                ) : (
                  <span
                    className="percentage-value clickable"
                    onClick={() => setIsEditingLeft(true)}
                    title="Click to edit"
                  >
                    {Math.round(leftWidth)}%
                  </span>
                )}
              </div>
              <span className="size-divider">|</span>
              <div className="percentage-input">
                {isEditingRight ? (
                  <input
                    type="number"
                    value={rightValue}
                    onChange={handleRightPercentageEdit}
                    onBlur={handleRightPercentageSubmit}
                    onKeyDown={handleRightKeyPress}
                    className="percentage-edit"
                    min={minRightWidth}
                    max={100 - minLeftWidth}
                    autoFocus
                  />
                ) : (
                  <span
                    className="percentage-value clickable"
                    onClick={() => setIsEditingRight(true)}
                    title="Click to edit"
                  >
                    {Math.round(100 - leftWidth)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
