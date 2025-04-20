// WebSocket.ts
let socket: WebSocket;
const subscribers: ((data: any) => void)[] = [];

export const initSocket = () => {
  socket = new WebSocket("ws://localhost:8000/ws/user1");
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    subscribers.forEach((cb) => cb(data));
  };
};

export const subscribe = (cb: (data: any) => void) => {
  subscribers.push(cb);
};

export const send = (msg: any) => {
  socket?.send(JSON.stringify(msg));
};
