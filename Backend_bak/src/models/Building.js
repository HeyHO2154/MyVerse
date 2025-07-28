const { randomUUID } = require('crypto');

class Building {
  constructor(gameState, dynasty, item) {
    this.id = randomUUID();
    this.createdAt = gameState.year;
    this.dynasty = dynasty;
    this.item = item;

    this.recruit = true;
    this.workers = new Set();
    this.wage = 1;
    
    dynasty.region.buildings.add(this);
    console.log(`🛠️  ${dynasty.name} 가문의 ${this.item} 건물이 생성되었습니다.`);
    
  }

}

module.exports = Building; 