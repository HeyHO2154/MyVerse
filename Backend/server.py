import asyncio  #비동기
import uvicorn  #웹 서버(FastAPI 실행용)
from fastapi import FastAPI, WebSocket, WebSocketDisconnect #웹 프레임워크

import os   #운영체제 관련 기능(파일 경로 처리)
from utils.data_util import load_json

from GameState import state
from object import galaxy, star, planet


app = FastAPI() #웹 서버 생성

connected_users = {}  # {user_id: websocket}
action_queue = []     # [(user_id, action_data)]

#웹 소켓 연결 처리
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    connected_users[user_id] = websocket
    print(f"🛠️ {user_id} 연결됨")
    try:
        while True:
            data = await websocket.receive_json()
            action_queue.append((user_id, data))
            print(f"🛠️ {user_id} 액션 받음: {data}")
    except WebSocketDisconnect:
        connected_users.pop(user_id, None)
        print(f"🛠️ {user_id} 연결 끊김")

#메인 게임
async def game_loop():
    while True:
        # 1. 액션 큐 처리
        for user_id, action in action_queue:
            print(f"🛠️ {user_id}의 행동 처리: {action}")
        action_queue.clear()

        # 2. 게임 로직
        state.tick()
        galaxy.galaxy()
        star.star()
        planet.planet()

        # 3. 유저들에게 결과 푸시
        galaxies = load_json(os.path.join(os.path.dirname(__file__), "InGame", "galaxies.json"))
        stars = load_json(os.path.join(os.path.dirname(__file__), "InGame", "stars.json"))
        planets = load_json(os.path.join(os.path.dirname(__file__), "InGame", "planets.json"))
        
        for user_id, ws in connected_users.items():
            try:
                await ws.send_json({
                    "type": "tick_result",
                    "time": state.time,
                    "galaxies": galaxies,
                    "stars": stars,
                    "planets": planets
                })
            except Exception as e:
                print(f"🛠️ {user_id}에게 전송 실패: {e}")

        # 4. 현실 시간 1초 = 1틱
        await asyncio.sleep(1) 


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(game_loop())

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
