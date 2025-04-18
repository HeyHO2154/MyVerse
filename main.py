import time
import object.star as star
import object.galaxy as galaxy
from GameState import state

def Main():

    #빅뱅 느낌으로 처음에 GameState 객체 생성 후
    #nebula = 100 이런식으로 성운 값 설정해주는건 어떨까, 이 성운을 줄여가며 은하(초대질량 블랙홀), 항성, 행성이 만들어지는거지
    #아니면 아예 GameState 이름을 BigBang으로 바꾸던지, 어차피 시간도 빅뱅에서 나온거니까

    #현실시간 1일 기준
    while state.time < 86400:
        #time.sleep(1)
        state.tick()

        galaxy.generate_galaxy()
        #star.generate_star()
        #planet.generate_planet()
        

if __name__ == "__main__":
    Main()