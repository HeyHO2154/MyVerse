const { randomUUID } = require('crypto');
const Market = require('./Market');

class Nation {
  constructor(gameState, region) {
    this.id = randomUUID();
    this.name = gameState.nationNames[Math.floor(Math.random() * gameState.nationNames.length)];
    this.createdAt = gameState.year;

    this.regions = [];
    this.market = null;
    this.race = gameState.raceNames[Math.floor(Math.random() * gameState.raceNames.length)];
    this.religion = null;

    gameState.nations.push(this);
    this.regions.push(region);
    console.log(`🏛️  ${this.race}의 ${this.name}이(가) ${region.name}에 건국되었습니다.`);
    this.market = new Market(gameState, this);

  }

}

module.exports = Nation; 