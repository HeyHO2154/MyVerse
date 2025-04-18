import os
from utils.data_util import save_json, load_json

class GameState:
    def __init__(self):
        self.path = os.path.join(os.path.dirname(__file__), "InGame", "GameState.json")
        data = load_json(self.path)

        if data:
            self.time = data[0].get("time", 0)      
        else:
            print("💥 빅뱅! 성운이 전 우주에 퍼집니다")
            self.time = 0
            save_json([{"time": self.time}], self.path)
            

    def tick(self):
        self.time += 1
        print(f"📅 현재 게임 시간: {self.time}")
        save_json([{"time": self.time}], self.path)

state = GameState()
