const { randomUUID } = require('crypto');

class Market {
  constructor(gameState, nation) {
    this.id = randomUUID();
    this.createdAt = gameState.year;
    
    // 아이템별 가격을 객체로 관리
    this.prices = {
      '군수품': 1,
      '술': 1,
      '옷': 1,
      '종이': 1,
      '석재': 1,
      '철': 1,
      '석탄': 1,
      '식량': 1,
      '과일': 1,
      '양모': 1,
      '목재': 1
    };

    console.log(`💰 ${nation.name} 시장이 개설되었습니다.`);
  }

}

module.exports = Market; 