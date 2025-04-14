import json
import random
from datetime import datetime

def generate_star():
    # 10% 확률로만 실행
    if random.random() > 0.1:
        return

    # 별 이름과 타입 데이터 로드
    with open('Backend/data/name/star_names.json', 'r', encoding='utf-8') as f:
        star_names = json.load(f)['star_names']
    
    with open('Backend/data/name/star_types.json', 'r', encoding='utf-8') as f:
        star_types = json.load(f)['star_types']

    # 무작위 선택
    name = random.choice(star_names)
    star_type = random.choice(star_types)['name']
    size = random.randint(50, 100)

    # 새로운 별 데이터 생성
    new_star = {
        "name": name,
        "type": star_type,
        "size": size,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }

    print(f"[별 생성] 이름: {name}, 타입: {star_type}, 크기: {size}")

    # stars.json 파일 읽기 및 업데이트
    try:
        with open('Backend/data/InGame/stars.json', 'r', encoding='utf-8') as f:
            stars = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        stars = {"stars": []}

    stars["stars"].append(new_star)

    # 파일 저장
    with open('Backend/data/InGame/stars.json', 'w', encoding='utf-8') as f:
        json.dump(stars, f, ensure_ascii=False, indent=2)
