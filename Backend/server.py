import asyncio  #비동기
import uvicorn  #웹 서버(FastAPI 실행용)
from fastapi import FastAPI, WebSocket, WebSocketDisconnect #웹 프레임워크
from contextlib import asynccontextmanager  #비동기 컨텍스트 관리(시작/종료 시점 관리)

from object import Universe, galaxy, star, planet


@asynccontextmanager
async def lifespan(app: FastAPI):
    game_task = asyncio.create_task(game_loop())
    yield   #서버 종료 시 작동
    game_task.cancel()

app = FastAPI(lifespan=lifespan)  # lifespan 핸들러 등록

#딕셔너리{}: 키-값 쌍 저장, 리스트[] : 순서가 있는 데이터 집합
#authorized_users = {}  # {user_id: websocket}
connected_users = {}  # {user_id: websocket}
action_queue = []     # [(user_id, action_data)]

#웹 소켓 연결 처리
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    # 사용자 인증
    # if user_id not in authorized_users:
    #     await websocket.close(code=4001)
    #     return
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

    universe = Universe()
    
    while True:
        # 1. 액션 큐 처리
        for user_id, action in action_queue:
            print(f"🛠️ {user_id}의 행동 처리: {action}")
        action_queue.clear()

        # 2. 게임 로직
        universe.tick()
        # galaxy.galaxy()
        # star.star()
        # planet.planet()

        # 3. 유저들에게 결과 푸시 - 추후 "변경된, 필요한" 데이터만 선택적으로 전송하게 수정
        # galaxies = load_json(os.path.join(os.path.dirname(__file__), "InGame", "galaxies.json"))
        # stars = load_json(os.path.join(os.path.dirname(__file__), "InGame", "stars.json"))
        # planets = load_json(os.path.join(os.path.dirname(__file__), "InGame", "planets.json"))
        
        # for user_id, ws in connected_users.items():
        #     try:
        #         await ws.send_json({
        #             "type": "tick_result",
        #             "time": state.time,
        #             "galaxies": galaxies,
        #             "stars": stars,
        #             "planets": planets
        #         })
        #     except Exception as e:
        #         print(f"🛠️ {user_id}에게 전송 실패: {e}")

        # 4. 현실 시간 1초 = 1틱
        await asyncio.sleep(1) 


#직접 실행 시 작동(import는 무시)
if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)   #server.py의 app(FastAPI 인스턴스) 실행, reload=True 코드 변경 시 자동 리로드
