from utils.data_util import save_json, load_json, load_txt
import os
import random
import uuid
import math
from GameState import state

class Star:
    def __init__(self, name, size, type, galaxy, id=str(uuid.uuid4()), resources=None, color=None, linked_stars=None):
        self.id = id
        self.name = name
        self.size = size
        self.type = type        
        self.resources = resources or []
        self.color = color                 
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
    if random.random() < math.exp(-len(stars) / 20):
        id = str(uuid.uuid4())
        name = random.choice(STAR_NAMES)
        size = random.uniform(50, 100)
        type_id = determine_main_sequence_type(size)
        type_info = next(t for t in STAR_TYPES if t["id"] == type_id)
        color = type_info["color_hex"]
        galaxy = random.choice(GALXAY_NAMES)

        linked_stars = []

        if stars:
            target = random.choice(stars)
            if len(target.get("linked_stars", [])) < 4:
                galaxy = target["galaxy"]
                if len(target.get("linked_stars", [])) > 0:
                    target2_id = random.choice(target["linked_stars"])
                    target2 = next((s for s in stars if s["id"] == target2_id), None)
                    if len(target2.get("linked_stars", [])) < 4:
                        linked_stars.append(target2["id"])
                        target2["linked_stars"].append(id)
                linked_stars.append(target["id"])
                target["linked_stars"].append(id)

        star = Star(id=id, name=name, size=size, type=type_id, color=color, linked_stars=linked_stars, galaxy=galaxy)
        stars.append(star)
        save_json(stars, os.path.join(os.path.dirname(__file__), "..", "InGame", "stars.json"))
        print(f"🌟 항성 생성됨: {star.name} ({type_info['name']}, size={round(size, 2)})")