const Region = require('./src/models/Region');
const Dynasty = require('./src/models/Dynasty');
const GameState = require('./src/services/GameState');
const { GAME_CONFIG } = require('./src/config/constants');

// 게임 상태 초기화
const gameState = new GameState();

let turn = 0;

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  turn++;
  
  console.log(`\n=== 🕐 ${turn}번째 턴 ===`);

    // 첫 번째 턴에서 새 지역 생성
    if(turn == 1){
      const newRegion = new Region("함부르크");
      gameState.regions.push(newRegion); // GameState의 지역 목록에 추가
    }

    // 4번째 턴마다 새 가문 생성
    if(turn % 4 == 0){
      const newDynasty = new Dynasty("NPC"+turn);
      gameState.dynasties.push(newDynasty); // GameState의 가문 목록에 추가
      
      // 첫 번째 지역에 가문 추가
      if(gameState.regions.length > 0){
        gameState.regions[0].dynasties.push(newDynasty);
      }
    }
  
    console.log(gameState.regions);
  
}, GAME_CONFIG.LOOP_INTERVAL);