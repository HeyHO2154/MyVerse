class GameState:
    def __init__(self):
        self.time = 0  # 0부터 시작. 1초마다 1씩 증가

    def tick(self):
        self.time += 1
        print(f"📅 현재 게임 시간: {self.time}")

state = GameState()