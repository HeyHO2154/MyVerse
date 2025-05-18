import os
from utils.data_util import save_json, load_json

class Universe:
    def __init__(self):
        data = load_json("/DB/InGame/Universe.json")

        if data:
            self.time = data[0].get("time", 0)      
        else:
            print("💥 빅뱅! 성운이 전 우주에 퍼집니다")
            self.time = 0
            save_json("/DB/InGame/", self)
            

    def tick(self):
        self.time += 1
        save_json("/DB/InGame/", self)
        print(f"📅 현재 게임 시간: {self.time}")
