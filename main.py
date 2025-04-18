import time
import object.galaxy as galaxy
from GameState import state

def Main():

    #현실시간 1일 기준
    while state.time < 86400:
        #time.sleep(1)
        state.tick()

        galaxy.galaxy()
        #star.generate_star()
        #planet.generate_planet()
        

if __name__ == "__main__":
    Main()