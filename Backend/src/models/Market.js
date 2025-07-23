const { randomUUID } = require('crypto');

class Market {
  constructor(gameState, nation) {
    this.id = randomUUID();
    this.createdAt = gameState.year;

    console.log(`💰 ${nation.name} 시장이 개설되었습니다!`);
  }

}

module.exports = Market; 