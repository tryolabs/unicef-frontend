import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ResizableLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  minLeftWidth?: number;
  minRightWidth?: number;
  defaultLeftWidth?: number;
}

export const ResizableLayout = ({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 60,
}: ResizableLayoutProps) => {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);

  useEffect(() => {
    setLeftWidth(defaultLeftWidth);
  }, [defaultLeftWidth]);

  return (
    <div className="resizable-container">
      <div className="panels-container">
        <motion.div
          className="resizable-panel left-panel"
          style={{ width: `${leftWidth}%` }}
          animate={{ width: `${leftWidth}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {leftPanel}
        </motion.div>

        <motion.div
          className="resizable-panel right-panel"
          style={{ width: `${100 - leftWidth}%` }}
          animate={{ width: `${100 - leftWidth}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {rightPanel}
        </motion.div>
      </div>
    </div>
  );
};
