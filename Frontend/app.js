import { loadStarsView } from "./map/stars.js";
import { connectWebSocket } from "./websocket/websocket.js";

window.addEventListener("DOMContentLoaded", () => {
  connectWebSocket();
  loadStarsView();
});
