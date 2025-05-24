import React, { useState } from "react";
import "../styles/chatbox.css";
import MainPanel from "./MainPanel";
import SideBar from "./SideBar";

export type PanelType =
  | "chat"
  | "session"
  | "model"
  | "mcp"
  | "knowledge"
  | "modelManage";

interface ChatBoxContainerProps {
  user: { userId: string; token: string };
  wsUrl: string;
  onEvent?: (event: any) => void;
  theme?: 'light' | 'dark' | { [key: string]: string };
}

const ChatBoxContainer: React.FC<ChatBoxContainerProps> = ({ user, wsUrl, onEvent, theme }) => {
  const [activePanel, setActivePanel] = useState<PanelType>("chat");
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 处理主题 className 或 style
  let themeClass = '';
  let themeStyle = undefined;
  if (typeof theme === 'string') {
    themeClass = `chatbox-theme-${theme}`;
  } else if (typeof theme === 'object' && theme !== null) {
    themeStyle = theme;
  }

  return (
    <div
      className={`chatbox-container${isFullScreen ? " fullscreen" : ""} ${themeClass}`}
      style={themeStyle}
    >
      <SideBar
        activePanel={activePanel}
        onChange={setActivePanel}
        onFullScreen={() => setIsFullScreen((v) => !v)}
        isFullScreen={isFullScreen}
      />
      <MainPanel
        activePanel={activePanel}
        user={user}
        wsUrl={wsUrl}
        onEvent={onEvent}
      />
    </div>
  );
};

export default ChatBoxContainer;
