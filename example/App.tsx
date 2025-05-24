import { ChatBox } from "../src";

function App() {
  return (
    <div style={{ height: "100vh", background: "#f0f2f5" }}>
      <h1 style={{ margin: 0, padding: 16 }}>ChatBox 组件测试</h1>
      <ChatBox
        user={{ userId: "test", token: "test-token" }}
        wsUrl="wss://test"
        theme="dark"
      />
    </div>
  );
}

export default App;
