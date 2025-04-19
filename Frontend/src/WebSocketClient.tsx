import { useEffect, useState } from "react";

const WebSocketClient = () => {
  const [log, setLog] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/testuser");
    setLog((prev) => [...prev, "🔌 서버에 연결 시도 중..."]);

    ws.onopen = () => {
      setLog((prev) => [...prev, "✅ 서버 연결됨"]);
      ws.send(JSON.stringify({ action: "hello", message: "나는 testuser야" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLog((prev) => [...prev, `📨 서버 응답: ${JSON.stringify(data)}`]);
    };

    ws.onclose = () => {
      setLog((prev) => [...prev, "❌ 서버 연결 끊김"]);
    };

    ws.onerror = (e) => {
      setLog((prev) => [...prev, "⚠️ 에러 발생"]);
      console.error(e);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendAction = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: "mine", target: "planet_xyz" }));
      setLog((prev) => [...prev, "📤 행동 전송됨: mine"]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>🛰️ WebSocket 테스트 클라이언트</h2>
      <button onClick={sendAction}>행동 보내기 (mine)</button>
      <pre>{log.join("\n")}</pre>
    </div>
  );
};

export default WebSocketClient;
