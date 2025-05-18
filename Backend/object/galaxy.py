import random
import uuid
import math
from utils.data import load_txt, create_json, read_json


GALAXY_NAMES = load_txt("/DB/names/galaxy_names.txt")

class Galaxy:
    def __init__(self):
        universe = read_json("/DB/InGame/Universes.json")[0]  # 현재 우주 상태
        galaxy_types = read_json("/DB/models/galaxy_types.json")
        
        self.id = str(uuid.uuid4())
        self.name = random.choice(GALAXY_NAMES)     
        self.type = random.choice(galaxy_types)["id"] 
        self.create_time = universe['time']  # 현재 우주 시간
        self.update_time = universe['time']


def galaxies():
    galaxies = read_json("/DB/InGame/Galaxies.json")
    for g in galaxies:
        print(f"🌌 {g['name']} 은하 순회")
        # star.generate_star(g)

def generate_galaxy():
    if random.random() < math.e/10: #자연상수 e = 2.718281828459045
        galaxy = Galaxy()
        create_json("/DB/InGame/Galaxies.json", galaxy)
        type_name = next(t["name"] for t in read_json("/DB/models/galaxy_types.json") if t["id"] == galaxy.type)    #디버깅용
        print(f"🌌 {galaxy.name} {type_name} 은하 탄생")