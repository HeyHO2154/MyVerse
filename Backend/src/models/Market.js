const { randomUUID } = require('crypto');

class Market {
  constructor(gameState, nation) {
    this.id = randomUUID();
    this.createdAt = gameState.year;
    
    // 아이템별 가격을 객체로 관리 (시작가, 하한가, 상한가)
    this.prices = {
      '교육': { current: 250, min: 201, max: 299 },
      '기도': { current: 250, min: 201, max: 299 },
      '치료': { current: 250, min: 201, max: 299 },
      '도박': { current: 250, min: 201, max: 299 },

      '군수품': { current: 150, min: 101, max: 199 },
      '술': { current: 150, min: 101, max: 199 },
      '옷': { current: 150, min: 101, max: 199 },
      '종이': { current: 150, min: 101, max: 199 },

      '석재': { current: 50, min: 1, max: 99 },
      '철': { current: 50, min: 1, max: 99 },
      '석탄': { current: 50, min: 1, max: 99 },
      '금': { current: 1, min: 1, max: 1 }, //거래 불가

      '식량': { current: 50, min: 1, max: 99 },
      '과일': { current: 50, min: 1, max: 99 },
      '양모': { current: 50, min: 1, max: 99 },
      '목재': { current: 50, min: 1, max: 99 }
    };

    console.log(`💰 ${nation.name} 시장이 개설되었습니다.`);
  }

}

module.exports = Market; 