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


def load_star_names():
    filepath = os.path.join(os.path.dirname(__file__), "..", "data", "star_names.txt")
    with open(filepath, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]
    
STAR_NAMES = load_star_names()  # 이건 파일 처음에 한 번만 실행하면 됨

def load_star_types():
    filepath = os.path.join(os.path.dirname(__file__), "..", "data", "star_types.json")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

STAR_TYPES = load_star_types()  # 초기에 한 번만 불러옴


def generate_star():
    if random.random() < 0.5:
        # 주계열성 타입 선택
        main_sequence = next(t for t in STAR_TYPES if t["id"] == "STAR_MAIN_SEQUENCE")
        subtype = random.choice(main_sequence["subtypes"])  # O, B, A, F, G, K, M 중 하나
        full_type = f'{main_sequence["category"]} {subtype}'  # 예: "주계열성 G"

        star = Star(name=random.choice(STAR_NAMES), star_type=full_type)
        print("🌟 항성 생성됨:", star.name, f"({full_type})")

        filepath = os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json")
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = []
        data.append(star.__dict__)  # to_dict 없이 바로 저장 가능

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
