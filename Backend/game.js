const GameState = require('./src/services/GameState');
const Region = require('./src/models/Region');
const Dynasty = require('./src/models/Dynasty');
const DynastyBehavior = require('./src/behavior/DynastyBehavior');
const RegionBehavior = require('./src/behavior/RegionBehavior');
const NationBehavior = require('./src/behavior/NationBehavior');

// 게임 상태 초기화
const gameState = new GameState();

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  ++gameState.turn;
  console.log(`=== 🕐 ${gameState.turn}턴 (국가: ${gameState.nations.size}, 지역: ${gameState.regions.size}, 가문: ${gameState.dynasties.size}) ===`);

  // 지역 수에 반비례한 확률로 새 지역 생성
  if(Math.floor(Math.random()*(gameState.regions.size+1)) == 0){
    new Region(gameState);
  }

  // // 국가 순회하며 행동 시행
  // NationBehavior.processNationActions(gameState);

  // // 지역 순회하며 행동 시행
  // RegionBehavior.processRegionActions(gameState);

  // // 가문 순회하며 행동 시행
  // DynastyBehavior.processDynastyActions(gameState);
  
}, 1000);