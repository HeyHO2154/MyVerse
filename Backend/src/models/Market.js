class Market {
  constructor(nation) {
    // 아이템별 가격
    this.prices = {
      '교육': 1,
      '기도': 1,
      '치료': 1,
      '도박': 1,

      '군수품': 1,
      '술': 1,
      '옷': 1,
      '종이': 1,

      '석재': 1,
      '철': 1,
      '석탄': 1,
      '금': 1, //거래 불가

      '식량': 1,
      '과일': 1,
      '양모': 1,
      '목재': 1
    };

    console.log(`💰 ${nation.name} 시장이 개설되었습니다.`);
  }

}

module.exports = Market; 