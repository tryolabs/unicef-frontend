import { useState } from "react";
import { MapContainer } from "./components/MapContainer";
import { ChatSection } from "./components/ChatSection";
import { UserGuide } from "./components/UserGuide";
import { useChat } from "./hooks/useChat";

export const App = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "tools">("chat");
  const { messageHistory, toolCalls, mapHTML, isLoading, askQuestion } =
    useChat();

  return (
    <div className="app-container">
      <div className="container">
        <MapContainer mapHTML={mapHTML} />
        <ChatSection
          activeTab={activeTab}
          messageHistory={messageHistory}
          toolCalls={toolCalls}
          switchTab={setActiveTab}
          askQuestion={askQuestion}
          isLoading={isLoading}
        />
      </div>
      <UserGuide />
    </div>
  );
};
