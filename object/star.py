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

STAR_NAMES = load_txt(os.path.join(os.path.dirname(__file__), "..", "data/names", "star_names.txt"))
STAR_TYPES = load_json(os.path.join(os.path.dirname(__file__), "..", "data", "star_types.json"))

def star(galaxy):
    stars = load_json(os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json"))
    for s in stars:
        print("행성")
    generate_star(galaxy, stars)

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

def generate_star(galaxy, stars):
    if random.random() < 1 / (len(stars)+1): #기존 수량에 반비례한 생성 확률
        id = str(uuid.uuid4())
        name = random.choice(STAR_NAMES)

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

        #항성간 연결(약 1~3개, 낮은 확률로 4+)
        linked_stars = []
        same_galaxy_stars = [s for s in stars if s["galaxy"] == galaxy]
        if stars and same_galaxy_stars:
            target = random.choice(same_galaxy_stars)
            candidate = target["linked_stars"].copy()
            candidate.append(target["id"])
            while candidate:
                target2_id = random.choice(candidate)
                target2 = next((s for s in stars if s["id"] == target2_id), None)
                if random.random() < 1/((len(target2["linked_stars"]))+1):
                    linked_stars.append(target2["id"])
                    target2["linked_stars"].append(id)
                candidate.remove(target2_id)
            if not linked_stars:
                linked_stars.append(target["id"])
                target["linked_stars"].append(id)
        
        star = Star(id=id, name=name, size=sizes, type=types, color=colors, linked_stars=linked_stars, galaxy=galaxy)
        stars.append(star)
        save_json(stars, os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json"))
        print(f"🌟 {star.name} ({type_info['name']}, size={round(size, 2)}) {len(stars)}번째 항성 탄생")