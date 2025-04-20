import { loadStarsView } from "./map/stars.js";
import { connectWebSocket } from "./websocket.js";

window.addEventListener("DOMContentLoaded", () => {
  connectWebSocket();
  loadStarsView();
});
