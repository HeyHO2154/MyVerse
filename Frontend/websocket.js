// websocket.js
let socket;
const subscribers = [];

export function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8000/ws/user1");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    subscribers.forEach((cb) => cb(data));
  };
}

export function subscribe(cb) {
  subscribers.push(cb);
}

export function sendAction(data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
}
