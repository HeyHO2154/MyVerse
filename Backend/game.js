const Region = require('./src/models/Region');
const { GAME_CONFIG } = require('./src/config/constants');

let turn = 0;

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  turn++;
  
  console.log(`\n=== 🕐 ${turn}번째 턴 ===`);

    // 첫 번째 턴에서 새 지역 생성
    if(turn == 1){
      const newRegion = new Region(1, "함부르크");
      console.log(newRegion.market.toString(newRegion.name));
    }
  
  
}, GAME_CONFIG.LOOP_INTERVAL);