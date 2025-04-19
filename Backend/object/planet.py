from utils.data_util import save_json, load_json, load_txt
import os
import random
import uuid
from GameState import state

class Planet:
    def __init__(self, name, size, type, star, id=str(uuid.uuid4()), resources=None):
        self.id = id
        self.name = name
        self.size = size
        self.type = type
        self.resources = resources or []        
        self.create_time = state.time
        self.update_time = state.time
        self.star = star

PLANET_NAMES = load_txt(os.path.join(os.path.dirname(__file__), "..", "data/names", "planet_names.txt"))
PLANET_TYPES = load_json(os.path.join(os.path.dirname(__file__), "..", "data", "planet_types.json"))

def planet():
    planets = load_json(os.path.join(os.path.dirname(__file__), "..", "InGame", "planets.json"))
    for p in planets:
        print(f"🪐 {p['name']} 행성 순회")

def generate_planet(star):
    planets = load_json(os.path.join(os.path.dirname(__file__), "..", "InGame", "planets.json"))
    #for 또는 while문 써서, 행성 여러개 만들어야함 - 지금은 1항성 = 1행성
    #여기서부터 작업하기

    id = str(uuid.uuid4())
    name = random.choice(PLANET_NAMES)
    size = random.uniform(50, 100)
    type = random.choice(PLANET_TYPES)

    planet = Planet(id=id, name=name, size=size, type=type, star=star)
    planets.append(planet)
    save_json(planets, os.path.join(os.path.dirname(__file__), "..", "InGame", "planets.json"))
    print(f"🪐 {planet.name} ({planet.type['name']}, size={round(planet.size, 2)}) {len(planets)}번째 행성 탄생")