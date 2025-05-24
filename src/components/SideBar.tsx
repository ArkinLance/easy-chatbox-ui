import React from "react";
import { PanelType } from "./ChatBoxContainer";
import { FaComments, FaIdBadge, FaCogs, FaServer, FaBook, FaRobot, FaCog, FaSun, FaInfoCircle } from "react-icons/fa";

interface SideBarProps {
  activePanel: PanelType;
  onChange: (panel: PanelType) => void;
  onThemeChange?: (theme: 'light' | 'dark' | 'auto') => void;
  theme?: 'light' | 'dark' | 'auto';
}

const panels: { key: PanelType; label: React.ReactNode }[] = [
  { key: "chat", label: <FaComments /> },
  { key: "session", label: <FaIdBadge /> },
  { key: "model", label: <FaCogs /> },
  { key: "mcp", label: <FaServer /> },
  { key: "knowledge", label: <FaBook /> },
  { key: "modelManage", label: <FaRobot /> },
];

const SideBar: React.FC<SideBarProps> = ({ activePanel, onChange, onThemeChange, theme }) => {
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);
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
      <span className="chatbox-sidebar-bottom-btn" title="关于">
          <FaInfoCircle />
        </span>
        <span className="chatbox-sidebar-bottom-btn" title="主题" onClick={() => setShowThemeMenu(v => !v)}>
          <FaSun />
        </span>
        <span className="chatbox-sidebar-bottom-btn" title="设置">
          <FaCog />
        </span>
        {showThemeMenu && (
          <div className="chatbox-theme-menu">
            <div className={`chatbox-theme-menu-item${theme === 'light' ? ' active' : ''}`} onClick={() => { onThemeChange && onThemeChange('light'); setShowThemeMenu(false); }}>浅色</div>
            <div className={`chatbox-theme-menu-item${theme === 'dark' ? ' active' : ''}`} onClick={() => { onThemeChange && onThemeChange('dark'); setShowThemeMenu(false); }}>深色</div>
            <div className={`chatbox-theme-menu-item${theme === 'auto' ? ' active' : ''}`} onClick={() => { onThemeChange && onThemeChange('auto'); setShowThemeMenu(false); }}>跟随系统</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
