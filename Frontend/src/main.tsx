// main.tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import { injectGlobalStyle } from "./GlobalStyle";

injectGlobalStyle(); // 전역 스타일 한방 적용

// HTML의 #root 요소에 React 앱을 연결
ReactDOM.createRoot(document.getElementById("root")!).render(
    <App />
);
