const Region = require('./src/models/Region');
const Dynasty = require('./src/models/Dynasty');
const GameState = require('./src/services/GameState');

// 게임 상태 초기화
const gameState = new GameState();

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  gameState.year++;
  
  console.log(`\n=== 🕐 ${gameState.year}년 ===`);

  // 지역 수에 반비례한 확률로 새 지역 생성
  if(Math.random()*gameState.regions.length == 0){
    gameState.regions.push(new Region(gameState.regionNames));
  }

  
}, 1000);