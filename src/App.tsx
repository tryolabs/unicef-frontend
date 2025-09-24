import { useState } from "react";
import { MapContainer } from "./components/MapContainer";
import { ChatSection } from "./components/ChatSection";
import { UserGuide } from "./components/UserGuide";
import { ResizableLayout } from "./components/ResizableLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { useChat } from "./hooks/useChat";
import { useAuth } from "./contexts/AuthContext";

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "tools">("chat");
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const { user, logout } = useAuth();
  const { messageHistory, toolCalls, mapHTML, isLoading, askQuestion } =
    useChat();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="unicef-logo">
              <svg viewBox="0 0 100 100" className="logo-icon">
                <circle cx="50" cy="50" r="45" fill="var(--unicef-blue)" />
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  fill="white"
                  fontSize="20"
                  fontWeight="bold"
                >
                  UNICEF
                </text>
              </svg>
            </div>
            <div className="title-section">
              <h1>Geosphere</h1>
              <p className="subtitle">
                Interactive mapping and AI-powered insights for children's data
              </p>
            </div>
          </div>
          <div className="header-actions">
            <span className="user-info">{user?.username}</span>
            <button
              className="help-button"
              onClick={() => setShowUserGuide(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12" y2="17" />
              </svg>
              Help
            </button>
            <button className="logout-button" onClick={logout}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ResizableLayout
          leftPanel={<MapContainer mapHTML={mapHTML} />}
          rightPanel={
            <ChatSection
              activeTab={activeTab}
              messageHistory={messageHistory}
              toolCalls={toolCalls}
              switchTab={setActiveTab}
              askQuestion={askQuestion}
              isLoading={isLoading}
              leftWidth={leftWidth}
              onWidthChange={setLeftWidth}
              minLeftWidth={35}
              minRightWidth={35}
            />
          }
          minLeftWidth={35}
          minRightWidth={35}
          defaultLeftWidth={leftWidth}
        />
      </main>

      <UserGuide
        isVisible={showUserGuide}
        onClose={() => setShowUserGuide(false)}
      />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <MainApp />
      </ProtectedRoute>
    </AuthProvider>
  );
};
