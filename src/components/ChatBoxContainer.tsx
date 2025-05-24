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

const getSystemTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const ChatBoxContainer: React.FC<ChatBoxContainerProps> = ({ user, wsUrl, onEvent, theme: themeProp }) => {
  const [activePanel, setActivePanel] = useState<PanelType>("chat");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'auto'>(themeProp === 'dark' || themeProp === 'light' ? themeProp : 'auto');
  const [theme, setTheme] = React.useState<'light' | 'dark'>(themeMode === 'auto' ? getSystemTheme() : themeMode);

  React.useEffect(() => {
    if (themeMode === 'auto') {
      const updateTheme = () => setTheme(getSystemTheme());
      updateTheme();
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
      return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme);
    } else {
      setTheme(themeMode);
    }
  }, [themeMode]);

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
      className={`chatbox-container${isFullScreen ? " fullscreen" : ""} chatbox-theme-${theme}`}
      style={themeStyle}
    >
      <SideBar
        activePanel={activePanel}
        onChange={setActivePanel}
        onThemeChange={setThemeMode}
        theme={themeMode}
      />
      <MainPanel
        activePanel={activePanel}
        user={user}
        wsUrl={wsUrl}
        onEvent={onEvent}
        onFullScreen={() => setIsFullScreen((v) => !v)}
        isFullScreen={isFullScreen}
      />
    </div>
  );
};

export default ChatBoxContainer;
