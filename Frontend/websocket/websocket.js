// websocket.js
let socket;
const subscribers = [];

export function connectWebSocket() {
  console.log("WebSocket 연결 시도...");
  socket = new WebSocket("ws://localhost:8000/ws/user1");

  socket.onopen = () => {
    console.log("WebSocket 연결 성공!");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket 메시지 수신:", data);
    subscribers.forEach((cb) => cb(data));
  };

  socket.onerror = (error) => {
    console.error("WebSocket 연결 에러:", error);
  };

  socket.onclose = (event) => {
    console.log("WebSocket 연결 종료:", event.code, event.reason);
  };
}

export function subscribe(cb) {
  subscribers.push(cb);
  return () => {
    const index = subscribers.indexOf(cb);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
}

export function sendAction(data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn("WebSocket이 연결되지 않았습니다");
  }
}
