const { randomUUID } = require('crypto');

class Building {
  constructor(gameState, region) {
    this.id = randomUUID();
    this.createdAt = gameState.year;
    
    region.buildings.push(this);
    console.log(`🛠️ 작업장이 생성되었습니다.`);
    
  }

}

module.exports = Building; 