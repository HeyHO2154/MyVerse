import threading
import time
from function.generate_star import generate_star
from datetime import datetime

class MainSimulator:
    def __init__(self):
        self.running = False
        self.thread = None

    def start_all(self):
        self.running = True
        self.thread = threading.Thread(target=self._run_simulation)
        self.thread.start()

    def stop_all(self):
        self.running = False
        if self.thread:
            self.thread.join()

    def _run_simulation(self):
        while self.running:
            print(f"[시뮬레이션] 새로운 주기 시작 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            generate_star()
            time.sleep(1)
