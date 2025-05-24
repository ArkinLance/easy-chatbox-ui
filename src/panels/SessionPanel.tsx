import React from "react";

interface SessionPanelProps {
  user: { userId: string; token: string };
}

const SessionPanel: React.FC<SessionPanelProps> = ({ user }) => {
  return (
    <div className="chatbox-main-panel chatbox-session-panel">
      <h3>会话信息</h3>
      <div>用户ID: {user.userId}</div>
      <div>Token: {user.token}</div>
    </div>
  );
};

export default SessionPanel;
