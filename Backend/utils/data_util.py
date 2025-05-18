import os
import json

def create_json(filepath, obj):
    data = read_json(filepath)
    data.append(obj.__dict__)
    with open(path(filepath), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def read_json(filepath):
    if os.path.exists(path(filepath)):
        with open(path(filepath), "r", encoding="utf-8") as f:
            return json.load(f)
    else:
        os.makedirs(os.path.dirname(path(filepath)), exist_ok=True)
        with open(path(filepath), "w", encoding="utf-8") as f:
            json.dump([], f, ensure_ascii=False, indent=2)
        return []

def update_json(filepath, obj):
    data = read_json(filepath)
    for i, item in enumerate(data):
        if item.get('uuid') == obj.uuid:
            data[i] = obj.__dict__
            break
    with open(path(filepath), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# def delete_json(filepath):
    # pass

def path(filepath):
    return os.path.join(os.path.dirname(os.path.dirname(__file__)), filepath.lstrip('/'))