import React from "react";
import { PanelType } from "./ChatBoxContainer";

interface SideBarProps {
  activePanel: PanelType;
  onChange: (panel: PanelType) => void;
  onFullScreen: () => void;
  isFullScreen: boolean;
}

const panels: { key: PanelType; label: string }[] = [
  { key: "chat", label: "聊天" },
  { key: "session", label: "会话ID" },
  { key: "model", label: "大模型配置" },
  { key: "mcp", label: "MCP配置" },
  { key: "knowledge", label: "知识库配置" },
  { key: "modelManage", label: "模型管理" },
];

const SideBar: React.FC<SideBarProps> = ({ activePanel, onChange, onFullScreen, isFullScreen }) => {
  return (
    <div className="chatbox-sidebar">
      <div className="chatbox-sidebar-panels">
        {panels.map((p) => (
          <div
            key={p.key}
            className={`chatbox-sidebar-item${activePanel === p.key ? " active" : ""}`}
            onClick={() => onChange(p.key)}
          >
            {p.label}
          </div>
        ))}
      </div>
      <div className="chatbox-sidebar-bottom">
        <button className="chatbox-fullscreen-btn" onClick={onFullScreen}>
          {isFullScreen ? "退出全屏" : "全屏"}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
