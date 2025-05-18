import uuid
from utils.data import read_json, create_json, update_json

import Object.Galaxy as Galaxy

class Universe:
    def __init__(self):
        data = read_json("/DB/InGame/Universes.json")
    
        if data:
            self.uuid = data[0].get("uuid")
            self.time = data[0].get("time", 0)
        else:
            print("💥 빅뱅! 성운이 전 우주에 퍼집니다")
            self.uuid = str(uuid.uuid4())
            self.time = 0
            create_json("/DB/InGame/Universes.json", self)
            
    def tick(self):
        self.time += 1
        update_json("/DB/InGame/Universes.json", self)
        print(f"🕒 게임 시간: {self.time}")

        # 은하 생성
        Galaxy.generate_galaxy()

        # 은하 순회
        Galaxy.galaxies()
