import random
import uuid
import math
from utils.data import load_txt, create_json, read_json


GALAXY_NAMES = load_txt("/DB/names/galaxy_names.txt")

class Galaxy:
    def __init__(self):
        universe = read_json("/DB/InGame/Universes.json")[0]  # 현재 우주 상태
        
        self.id = str(uuid.uuid4())
        self.name = random.choice(GALAXY_NAMES)         
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
        print(f"🌌 {galaxy.name} 은하 탄생")