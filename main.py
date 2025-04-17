import time
import object.star as star
from GameState import state

def Main():
    while True:
        time.sleep(1)
        state.tick()

        star.generate_star()
        

if __name__ == "__main__":
    Main()