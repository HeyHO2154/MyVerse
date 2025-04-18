from utils.data_util import save_json, load_json, load_txt
import os
import random
import uuid
from GameState import state

class Star:
    def __init__(self, name, size, type, galaxy, id=str(uuid.uuid4()), resources=None, color=None, linked_stars=None):
        self.id = id
        self.name = name
        self.size = size or []
        self.type = type or []    
        self.resources = resources or []
        self.color = color or []             
        self.create_time = state.time
        self.update_time = state.time
        self.linked_stars = linked_stars or []
        self.galaxy = galaxy

GALXAY_NAMES = load_txt(os.path.join(os.path.dirname(__file__), "..", "data", "galaxy_names.txt"))
STAR_NAMES = load_txt(os.path.join(os.path.dirname(__file__), "..", "data", "star_names.txt"))
STAR_TYPES = load_json(os.path.join(os.path.dirname(__file__), "..", "data", "star_types.json"))

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
    stars = load_json(os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json"))
    if random.random() < 1 / (len(stars)+1): #기존 수량에 반비례한 생성 확률
        id = str(uuid.uuid4())
        name = random.choice(STAR_NAMES)
        galaxy = random.choice(GALXAY_NAMES)

        #N중성계(약 1~3개, 낮은 확률로 4+)
        types = []
        sizes = []
        colors = []
        while True:
            size = random.uniform(50, 100)
            type_id = determine_main_sequence_type(size)
            type_info = next(t for t in STAR_TYPES if t["id"] == type_id)
            color = type_info["color_hex"]

            sizes.append(size)
            types.append(type_id)
            colors.append(color)

            # 첫 항성 이후에는 확률로만 반복
            if random.random() > 0.3:
                break

        #항성계 연결(약 1~3개, 낮은 확률로 4+)
        linked_stars = []
        if stars:
            target = random.choice(stars)        
            candidate = target["linked_stars"].copy()
            candidate.append(target["id"])
            while candidate:
                galaxy = target["galaxy"]
                target2_id = random.choice(candidate)
                target2 = next((s for s in stars if s["id"] == target2_id), None)
                linked_stars.append(target2["id"])
                target2["linked_stars"].append(id)
                candidate.remove(target2_id)

                # 첫 항성 이후에는 확률로만 반복
                if random.random() > 0.1:
                    break
        
        star = Star(id=id, name=name, size=sizes, type=types, color=colors, linked_stars=linked_stars, galaxy=galaxy)
        stars.append(star)
        save_json(stars, os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json"))
        print(f"🌟 {star.name} ({type_info['name']}, size={round(size, 2)}) {len(stars)}번째 항성 탄생")