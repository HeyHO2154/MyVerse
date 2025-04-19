import os
from utils.data_util import load_json
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import uvicorn

from GameState import state
from object import galaxy, star, planet

app = FastAPI()

connected_users = {}  # {user_id: websocket}
action_queue = []     # [(user_id, action_data)]

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    connected_users[user_id] = websocket
    print(f"🛠️ {user_id} 연결됨")

    try:
        while True:
            data = await websocket.receive_json()
            print(f"🛠️ {user_id} 액션 받음: {data}")
            action_queue.append((user_id, data))
    except WebSocketDisconnect:
        connected_users.pop(user_id, None)
        print(f"🛠️ {user_id} 연결 끊김")

async def game_loop():
    while True:
        await asyncio.sleep(1)  # 현실 시간 1초 = 1틱
        state.tick()

        # 1. 게임 로직
        # galaxy.galaxy()
        # star.star()
        # planet.planet()

        # 2. 액션 큐 처리
        for user_id, action in action_queue:
            print(f"🛠️ {user_id}의 행동 처리: {action}")
        action_queue.clear()

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

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(game_loop())

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
