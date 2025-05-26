import React, { useRef, useState } from "react";
import { FiMaximize, FiMinimize } from "react-icons/fi";
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

// 获取系统主题
const getSystemTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const MIN_WIDTH = 320;
const MIN_HEIGHT = 400;
const INIT_WIDTH = 400;
const INIT_HEIGHT = 520;

// 聊天框容器组件
const ChatBoxContainer: React.FC<ChatBoxContainerProps> = ({ user, wsUrl, onEvent, theme: themeProp }) => {
  const [activePanel, setActivePanel] = useState<PanelType>("chat");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'auto'>(themeProp === 'dark' || themeProp === 'light' ? themeProp : 'auto');
  const [theme, setTheme] = React.useState<'light' | 'dark'>(themeMode === 'auto' ? getSystemTheme() : themeMode);

  // 新增：最小化与悬浮对话框位置
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [width, setWidth] = useState(INIT_WIDTH);
  const [height, setHeight] = useState(INIT_HEIGHT);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const resizing = useRef(false);
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, width: INIT_WIDTH, height: INIT_HEIGHT });
  const dragTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeTimer = useRef<number | null>(null);
  const mouseDownRef = useRef(false);

  // 监听系统主题变化
  React.useEffect(() => {
    if (themeMode === 'auto') {
      const updateTheme = () => setTheme(getSystemTheme());
      updateTheme(); // 立即执行一次
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', updateTheme);
  
      return () => {
        mql.removeEventListener('change', updateTheme); // 清除副作用
      };
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

  // 拖动相关事件（仅非全屏时生效，长按判定）
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFullScreen) return;
    dragTimer.current = setTimeout(() => {
      dragging.current = true;
      offset.current = {
        x: e.clientX - position.left,
        y: e.clientY - position.top,
      };
    }, 80);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current && !isFullScreen) {
      setPosition({
        left: e.clientX - offset.current.x,
        top: e.clientY - offset.current.y,
      });
    }
    if (resizing.current && !isFullScreen) {
      const dx = e.clientX - resizeStart.current.mouseX;
      const dy = e.clientY - resizeStart.current.mouseY;
      let newWidth = resizeStart.current.width + dx;
      let newHeight = resizeStart.current.height + dy;
      if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
      if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
      setWidth(newWidth);
      setHeight(newHeight);
    }
  };
  const handleMouseUp = () => {
    mouseDownRef.current = false;
    if (dragTimer.current) {
      clearTimeout(dragTimer.current);
      dragTimer.current = null;
    }
    if (resizeTimer.current) {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = null;
    }
    dragging.current = false;
    resizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);
  };

  // 缩放相关事件（长按判定，修正竞态）
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFullScreen) return;
    e.stopPropagation();
    mouseDownRef.current = true;
    resizeTimer.current = window.setTimeout(() => {
      if (mouseDownRef.current) {
        resizing.current = true;
        resizeStart.current = {
          mouseX: e.clientX,
          mouseY: e.clientY,
          width,
          height,
        };
      }
    }, 80);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
  };

  // 悬浮气泡按钮
  if (minimized) {
    return (
      <div className="chatbox-float-btn" onClick={() => setMinimized(false)} title="展开对话框">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      </div>
    );
  }

  // 悬浮对话框
  return (
    <div
      className={`chatbox-float-panel chatbox-theme-${theme} ${isFullScreen ? 'fullscreen' : ''}`}
      style={
        isFullScreen
          ? {
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: 0,
              maxWidth: '100vw',
              maxHeight: '100vh',
              ...((typeof themeStyle === 'object' && themeStyle !== null) ? themeStyle : {})
            }
          : {
              top: position.top,
              left: position.left,
              width,
              height,
              minWidth: MIN_WIDTH,
              minHeight: MIN_HEIGHT,
              ...((typeof themeStyle === 'object' && themeStyle !== null) ? themeStyle : {})
            }
      }
    >
      <div
        className="chatbox-title-bar"
        style={{ cursor: isFullScreen ? 'default' : 'move', userSelect: 'none' }}
        onMouseDown={isFullScreen ? undefined : handleMouseDown}
      >
        <span className="chatbox-title-model">ChatBox</span>
        <span className="chatbox-title-bar-btns">
          <button className="chatbox-title-bar-btn" title="最小化" onClick={e => { e.stopPropagation(); setMinimized(true); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="19" x2="20" y2="19"/></svg>
          </button>
          <button className="chatbox-title-bar-btn" title={isFullScreen ? '退出全屏' : '全屏'} onClick={e => { e.stopPropagation(); setIsFullScreen(v => !v); }}>
            {isFullScreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
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
      {/* 缩放手柄，仅非全屏时显示 */}
      {!isFullScreen && (
        <div className="chatbox-resize-handle" onMouseDown={handleResizeMouseDown} />
      )}
    </div>
  );
};

export default ChatBoxContainer;
