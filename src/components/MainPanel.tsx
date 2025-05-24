import React from "react";
import ChatPanel from "../panels/ChatPanel";
import KnowledgeConfigPanel from "../panels/KnowledgeConfigPanel";
import MCPConfigPanel from "../panels/MCPConfigPanel";
import ModelConfigPanel from "../panels/ModelConfigPanel";
import ModelManagePanel from "../panels/ModelManagePanel";
import SessionPanel from "../panels/SessionPanel";
import { PanelType } from "./ChatBoxContainer";
import { FiMaximize, FiMinimize } from "react-icons/fi";

interface MainPanelProps {
  activePanel: PanelType;
  user: { userId: string; token: string };
  wsUrl: string;
  onEvent?: (event: any) => void;
  onFullScreen: () => void;
  isFullScreen: boolean;
}

const MainPanel: React.FC<MainPanelProps> = ({ activePanel, user, wsUrl, onEvent, onFullScreen, isFullScreen }) => {
  return (
    <div className="chatbox-main-panel-outer">
      {/* 标题栏 */}
      <div className="chatbox-title-bar">
        <span className="chatbox-title-model">ChatBox</span>
        <span className="chatbox-fullscreen-btn" onClick={onFullScreen} style={{marginLeft: 'auto'}}>
          {isFullScreen ? <FiMinimize /> : <FiMaximize />}
        </span>
      </div>
      {/* 内容区域 */}
      <div className="chatbox-main-content">
        {activePanel === "chat" && <ChatPanel user={user} wsUrl={wsUrl} onEvent={onEvent} />}
        {activePanel === "session" && <SessionPanel user={user} />}
        {activePanel === "model" && <ModelConfigPanel />}
        {activePanel === "mcp" && <MCPConfigPanel />}
        {activePanel === "knowledge" && <KnowledgeConfigPanel />}
        {activePanel === "modelManage" && <ModelManagePanel />}
      </div>
      {/* 聊天输入框只在聊天面板显示，假设 ChatPanel 内部已包含输入框，这里无需重复渲染 */}
    </div>
  );
};

export default MainPanel;
