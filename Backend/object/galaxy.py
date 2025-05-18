from Backend.utils.data import save_json, load_json, load_txt
import os
import random
import uuid
from Backend.Object.Universe import state

from Backend.Object import star

class Galaxy:
    def __init__(self, name):
        self.id = str(uuid.uuid4())
        self.name = name         
        self.create_time = state.time
        self.update_time = state.time

GALAXY_NAMES = load_txt(os.path.join(os.path.dirname(__file__), "..", "data/names", "galaxy_names.txt"))

def galaxy():
    galaxies = load_json(os.path.join(os.path.dirname(__file__), "..", "InGame", "galaxies.json"))
    for g in galaxies:
        print(f"🌌 {g['name']} 은하 순회")
        star.generate_star(g)
    generate_galaxy(galaxies)

def generate_galaxy(galaxies):
    if random.random() < 1 / (len(galaxies)+1): #기존 수량에 반비례한 생성 확률
        galaxy = Galaxy(name=random.choice(GALAXY_NAMES))
        galaxies.append(galaxy)
        save_json(galaxies, os.path.join(os.path.dirname(__file__), "..", "InGame", "galaxies.json"))
        print(f"🌌 {galaxy.name} {len(galaxies)}번째 은하 탄생")