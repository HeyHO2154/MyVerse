import os
import json

def load_json(filepath):
    abs_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), filepath.lstrip('/'))
    if os.path.exists(abs_path):
        with open(abs_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []




# def save_json(obj_list, filepath):
#     data = [o.__dict__ if hasattr(o, "__dict__") else o for o in obj_list]
#     with open(filepath, "w", encoding="utf-8") as f:
#         json.dump(data, f, ensure_ascii=False, indent=2)


# def load_txt(filepath):
#     if os.path.exists(filepath):
#         with open(filepath, "r", encoding="utf-8") as f:
#             return [line.strip() for line in f if line.strip()]
#     return []