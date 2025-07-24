const { randomUUID } = require('crypto');
const Nation = require('./Nation');

class Region {
  constructor(gameState) {
    this.id = randomUUID();
    this.name = gameState.regionNames[Math.floor(Math.random() * gameState.regionNames.length)];
    this.createdAt = gameState.year;

    this.nation = new Nation(gameState, this);
    this.size = 4;
    this.buildings = new Set(); // 각 지역마다 고유한 건물들
    this.dynasties = new Set(); // 각 지역마다 고유한 가문들
    
    gameState.regions.add(this);
    console.log(`🌍 ${this.name}이(가) 생성되었습니다.`);
    
  }

}

module.exports = Region; 