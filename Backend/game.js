const GameState = require('./src/services/GameState');
const Region = require('./src/models/Region');
const Dynasty = require('./src/models/Dynasty');

// 게임 상태 초기화
const gameState = new GameState();

// 메인 게임 루프 (1초마다 실행)
setInterval(() => {
  ++gameState.year;
  console.log(`=== 🕐 ${gameState.year}년 (국가: ${gameState.nations.length}, 지역: ${gameState.regions.length}, 가문: ${gameState.dynasties.length}) ===`);

  // // 지역 수에 반비례한 확률로 새 지역 생성
  // if(Math.random()*gameState.regions.length < 1){
  //   new Region(gameState);
  // }
  if(gameState.year == 1){
    new Region(gameState);  // 최초 지역 생성 <- 임시 코드
  }

  // 지역 순회하며 가문 생성
  gameState.regions.forEach(region => {
    region.dynasties.push(new Dynasty(gameState, region));
  });

  // 가문 순회하며 행동 시행
  gameState.dynasties.forEach(dynasty => {
    // 가문원 순회하며 행동 시행
    dynasty.persons.forEach(person => {
      // 행동 시행
    });
  });
  
}, 1000);