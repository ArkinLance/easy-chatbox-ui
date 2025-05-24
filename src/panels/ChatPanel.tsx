import React, { useState } from "react";

interface ChatPanelProps {
  user: { userId: string; token: string };
  wsUrl: string;
  onEvent?: (event: any) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ user, wsUrl, onEvent }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // TODO: WebSocket 逻辑后续补充
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
      onEvent?.({ type: "send", content: input });
    }
  };

  return (
    <div className="chatbox-main-panel chatbox-chat-panel">
      <div className="chatbox-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chatbox-message">{msg}</div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>发送</button>
      </div>
    </div>
  );
};

export default ChatPanel;
