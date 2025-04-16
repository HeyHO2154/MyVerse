import json
import os
import random
import uuid
from GameState import state

class Star:
    def __init__(self, name, star_type, connected_star_ids=None):
        self.id = str(uuid.uuid4())  # 고유 ID
        self.name = name             # 이름
        self.type = star_type        # 타입 (예: 'G', 'M', 'Neutron', 등)
        self.create_time = state.time  # 생성 시간
        self.update_time = state.time   # 수정 시간 (초기엔 생성시간과 동일)
        self.connected_star_ids = connected_star_ids or []  # 연결된 다른 star들의 ID

    def update(self, name=None, star_type=None, connected_star_ids=None):
        if name:
            self.name = name
        if star_type:
            self.type = star_type
        if connected_star_ids is not None:
            self.connected_star_ids = connected_star_ids
        self.update_time = state.time

def generate_star():
    if random.random() < 0.1:
        star = Star(name="항성A", star_type="주계열성A")
        print("🌟 항성 생성됨:", star.id)

        filepath = os.path.join(os.path.dirname(__file__), "InGame", "stars.json")
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = []
        data.append(star.__dict__)  # to_dict 없이 바로 저장 가능

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
