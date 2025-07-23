const GameState = require('./src/services/GameState');
const Region = require('./src/models/Region');

// 게임 상태 초기화
const gameState = new GameState();

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  const year = ++gameState.year;
  
  console.log(`\n=== 🕐 ${year}년 (지역 수: ${gameState.regions.length}) ===`);

  // 지역 수에 반비례한 확률로 새 지역 생성
  if(Math.random()*gameState.regions.length < 1){
    new Region(gameState);
  }

  
}, 1000);