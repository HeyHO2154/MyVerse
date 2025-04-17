import json
import os
import random
import uuid
from GameState import state

class Star:
    def __init__(self, name, type, resources=None, color=None, linked_stars=None):
        self.id = str(uuid.uuid4())
        self.name = name
        self.type = type        
        self.resources = resources or []
        self.color = color                 
        self.create_time = state.time
        self.update_time = state.time
        self.linked_stars = linked_stars or []

def load_star_names():
    filepath = os.path.join(os.path.dirname(__file__), "..", "data", "star_names.txt")
    with open(filepath, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]
def load_star_types():
    filepath = os.path.join(os.path.dirname(__file__), "..", "data", "star_types.json")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)
    
STAR_NAMES = load_star_names()
STAR_TYPES = load_star_types()

def determine_main_sequence_type(size):
    thresholds = [
        (95, "STAR_MAIN_SEQUENCE_O"),
        (85, "STAR_MAIN_SEQUENCE_B"),
        (70, "STAR_MAIN_SEQUENCE_A"),
        (60, "STAR_MAIN_SEQUENCE_F"),
        (55, "STAR_MAIN_SEQUENCE_G"),
        (52, "STAR_MAIN_SEQUENCE_K")
    ]
    for threshold, type_id in thresholds:
        if size >= threshold:
            return type_id
    return "STAR_MAIN_SEQUENCE_M"

def generate_star():
    if random.random() < 0.5:
        name = random.choice(STAR_NAMES)
        size = random.uniform(50, 100)

        type_id = determine_main_sequence_type(size)
        type_info = next(t for t in STAR_TYPES if t["id"] == type_id)
        color = type_info["color_hex"]

        star = Star(
            name=name,
            type=type_id,
            color=color
        )

        print(f"🌟 항성 생성됨: {star.name} ({type_info['category']}, size={round(size, 1)})")

        filepath = os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json")
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = []
        data.append(star.__dict__)  # to_dict 없이 바로 저장 가능

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
