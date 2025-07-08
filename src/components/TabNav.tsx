interface TabNavProps {
  activeTab: "chat" | "tools";
  switchTab: (tab: "chat" | "tools") => void;
}

const TABS = [
  { id: "chat", label: "Chat" },
  { id: "tools", label: "Tool Calls" },
] as const;

export const TabNav = ({ activeTab, switchTab }: TabNavProps) => (
  <div className="tab-container">
    {TABS.map(({ id, label }) => (
      <div
        key={id}
        className={`tab ${activeTab === id ? "active" : ""}`}
        onClick={() => switchTab(id)}
      >
        {label}
      </div>
    ))}
  </div>
);
