const { randomUUID } = require('crypto');

class Building {
  constructor(gameState, dynasty, item) {
    this.id = randomUUID();
    this.createdAt = gameState.year;
    this.dynasty = dynasty;
    this.item = item;
    
    dynasty.region.buildings.push(this);
    console.log(`🛠️  ${dynasty.name} 가문의 ${this.item} 건물이 생성되었습니다.`);
    
  }

}

module.exports = Building; 