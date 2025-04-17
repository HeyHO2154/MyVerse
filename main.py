import time
import object.star as star
from GameState import state

def run_every_second():
    while True:
        time.sleep(1)
        state.tick()

        star.generate_star()
        

if __name__ == "__main__":
    run_every_second()