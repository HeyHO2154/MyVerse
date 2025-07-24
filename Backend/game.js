const GameState = require('./src/services/GameState');
const Region = require('./src/models/Region');
const Dynasty = require('./src/models/Dynasty');
const DynastyBehavior = require('./src/behavior/DynastyBehavior');
const RegionBehavior = require('./src/behavior/RegionBehavior');

// 게임 상태 초기화
const gameState = new GameState();

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  ++gameState.year;
  console.log(`=== 🕐 ${gameState.year}년 (국가: ${gameState.nations.size}, 지역: ${gameState.regions.size}, 가문: ${gameState.dynasties.size}) ===`);

  // 지역 수에 반비례한 확률로 새 지역 생성
  if(Math.random()*gameState.regions.size < 0 || gameState.year == 1){
    new Region(gameState);
  }

  // 지역 순회하며 가문 생성
  gameState.regions.forEach(region => {
    if(gameState.dynasties.size < 3){
      region.dynasties.push(new Dynasty(gameState, region));
    }
  });

  // 가문 순회하며 행동 시행
  DynastyBehavior.processDynastyActions(gameState);

  // 지역 순회하며 행동 시행
  RegionBehavior.processRegionActions(gameState);
  
}, 1000);