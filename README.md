# easy-chatbox-ui

一个基于 React 的轻量级 AI 聊天框架，支持 React 组件方式和 iframe 嵌入两种集成方式，便于快速接入各种已有 Web 系统，实现与后端大模型服务的实时通信。

---

## 主要特性

- 支持 React 组件方式集成，灵活嵌入任意 React 应用
- 支持 iframe 嵌入，兼容多种异构前端框架（Vue、jQuery、原生 JS 等）
- 基于 WebSocket 实时双向通信，支持流式大模型输出
- 支持与宿主系统的事件通信（React props / window.postMessage）
- 样式高度兼容宿主系统，支持主题定制和样式覆盖
- 易用且可扩展，便于二次开发和功能拓展

---

## 适用场景

- 快速为已有 Web 平台添加 AI Chat 聊天功能
- 需要支持多种集成方式，满足不同前端框架需求
- 希望聊天框与宿主页面双向通信，实现联动交互
- 需要兼容多租户用户身份传递和权限验证

---

## 安装

通过 npm 安装：

```bash
npm install @zkdtech/easy-chatbox-ui
```

## 使用示例

### 1. React 组件集成方式

```jsx
import React from "react";
import ChatBox from "@zkdtech/easy-chatbox-ui";

function App() {
  const userInfo = { userId: "9527", token: "xxxx" };

  return (
    <div>
      <h1>我的应用</h1>
      <ChatBox
        user={userInfo}
        wsUrl="wss://llm.zkdtech.com/ws/chat"
        onEvent={(event) => console.log("来自ChatBox事件:", event)}
      />
    </div>
  );
}

export default App;
```
