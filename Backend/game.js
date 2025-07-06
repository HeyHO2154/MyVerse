const GameState = require('./src/services/GameState');
const { GAME_CONFIG } = require('./src/config/constants');

// 게임 상태 초기화
const gameState = new GameState();

let turn = 0;
let isFirstLoop = true;

// 메인 게임 루프 (1초마다 실행)
console.log('🎮 MyVerse 게임 시작!');
console.log('=================================');
const gameLoop = setInterval(() => {
  turn++;
  
  console.log(`\n=== 🕐 ${turn}번째 턴 ===`);
  
  // 10% 확률로 새 지역 생성
  if (Math.random() < GAME_CONFIG.REGION_CREATION_PROBABILITY) {
      
    const newRegion = gameState.createRegion();
    
    // 기존 지역들과 연결
    if (gameState.regions.length > 1) {
      gameState.connectNewRegion(newRegion);
    }
    
    // 새 지역 정보 출력
    console.log(`📊 새 지역 정보: ${newRegion.toString()}`);
    
    // 전체 지역 목록 출력 (지역이 적을 때만)
    if (gameState.regions.length <= 10) {
      gameState.printAllRegions();
    }
  }
  
}, GAME_CONFIG.LOOP_INTERVAL);