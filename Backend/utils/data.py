import os
import json

#json CRUD
def create_json(filepath, obj):
    data = read_json(filepath)
    data.append(obj.__dict__)
    save_json(filepath, data)

def read_json(filepath):
    if os.path.exists(path(filepath)):
        with open(path(filepath), "r", encoding="utf-8") as f:
            return json.load(f)
    else:
        os.makedirs(os.path.dirname(path(filepath)), exist_ok=True)
        save_json(filepath, [])
        return []

def update_json(filepath, obj):
    data = read_json(filepath)
    for i, item in enumerate(data):
        if item.get('uuid') == obj.uuid:
            data[i] = obj.__dict__
            break
    save_json(filepath, data)

def delete_json(filepath, obj):
    data = read_json(filepath)
    for i, item in enumerate(data):
        if item.get('uuid') == obj.uuid:
            data.pop(i)
            break
    save_json(filepath, data)

#기타 유틸
def path(filepath):
    return os.path.join(os.path.dirname(os.path.dirname(__file__)), filepath.lstrip('/'))

def save_json(filepath, data):
    with open(path(filepath), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_txt(filepath):
    with open(path(filepath), "r", encoding="utf-8") as f:
        return f.read().splitlines()
