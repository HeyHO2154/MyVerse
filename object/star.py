import json
import os
import random
import uuid
from GameState import state

class Star:
    def __init__(self, name, type_category, subtype=None, color=None, connected_star_ids=None):
        self.id = str(uuid.uuid4())
        self.name = name
        self.type_category = type_category  # "주계열성"
        self.subtype = subtype              # "G"
        self.color = color                  # "#fff4e8"
        self.create_time = state.time
        self.update_time = state.time
        self.connected_star_ids = connected_star_ids or []

    def update(self, name=None, type_category=None, subtype=None, connected_star_ids=None):
        if name:
            self.name = name
        if type_category:
            self.type_category = type_category
        if subtype:
            self.subtype = subtype
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
        main_sequence = next(t for t in STAR_TYPES if t["id"] == "STAR_MAIN_SEQUENCE")
        subtype = random.choice(main_sequence["subtypes"])  # O ~ M
        color = main_sequence["color_map"][subtype]
        name = random.choice(STAR_NAMES)

        star = Star(
            name=name,
            type_category=main_sequence["category"],  # "주계열성"
            subtype=subtype,                          # "G"
            color=color                                # "#fff4e8"
        )

        print(f"🌟 항성 생성됨: {star.name} ({star.type_category} {star.subtype})")

        filepath = os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json")
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = []
        data.append(star.__dict__)  # to_dict 없이 바로 저장 가능

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
