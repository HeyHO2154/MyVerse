# 프로젝트 이름

간단한 프로젝트 설명 한 줄.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)

---

## 📂 프로젝트 구조

```
📦my-project
 ┣ 📂src
 ┃ ┣ 📜index.js
 ┣ 📜package.json
 ┗ 📜README.md
```

---

## 🚀 시작하기

### 1. 설치

```bash
git clone https://github.com/yourname/your-project.git
cd your-project
npm install
```

### 2. 실행

```bash
npm start
```

---

## ⚙️ 사용 기술 스택

- Node.js
- Express
- WebSocket (`ws` 패키지)
- 기타...

---

## 📄 주요 기능

- ✅ 실시간 채팅 기능
- ✅ 사용자 인증 (JWT)
- ✅ 간단한 프론트엔드 (HTML + JS)

---

## 📌 사용 예시

```js
const socket = new WebSocket("ws://localhost:5000");

socket.onmessage = (event) => {
  console.log("메시지 수신:", event.data);
};
```

---

## 🛠 개발자 가이드

- 브랜치 규칙: `feature/`, `fix/`, `hotfix/`
- 커밋 컨벤션: [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🙋 기여 방법

1. 이슈 확인
2. 포크 및 PR 요청
3. 리뷰 및 머지

---

## 📝 라이선스

MIT License
