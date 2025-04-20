// src/GlobalStyle.ts
export const injectGlobalStyle = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    html, body, #root {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      font-family: 'Pretendard', sans-serif;
      background-color: #000;
      color: white;
    }
  `;
  document.head.appendChild(style);
};
