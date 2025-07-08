class Market {
  constructor() {
    // 12가지 아이템 목록
    this.items = [
      '금',
      '식량', 
      '옷',
      '술',
      '석재',
      '군수품',
      '석탄',
      '종이',
      '철',
      '과일',
      '양모',
      '목재'
    ];

    // 각 아이템의 수량 (최초 0으로 시작)
    this.quantities = {};
    
    // 수량 초기화
    this.items.forEach(item => {
      this.quantities[item] = 0;
    });
  }

  // 특정 아이템의 현재 가격 계산 (가격 = 100 + 수량)
  getPrice(itemName) {
    if (!this.quantities.hasOwnProperty(itemName)) {
      throw new Error(`❌ "${itemName}"은(는) 존재하지 않는 아이템입니다.`);
    }
    return 100 + this.quantities[itemName];
  }

  // 특정 아이템의 수량 조회
  getQuantity(itemName) {
    if (!this.quantities.hasOwnProperty(itemName)) {
      throw new Error(`❌ "${itemName}"은(는) 존재하지 않는 아이템입니다.`);
    }
    return this.quantities[itemName];
  }

  // 특정 아이템의 수량 변경
  setQuantity(itemName, quantity) {
    if (!this.quantities.hasOwnProperty(itemName)) {
      throw new Error(`❌ "${itemName}"은(는) 존재하지 않는 아이템입니다.`);
    }
    if (quantity < 0) {
      throw new Error(`❌ 수량은 0보다 작을 수 없습니다.`);
    }
    this.quantities[itemName] = quantity;
  }

  // 시장 정보 출력
  toString(regionName) {
    let result = `\n=== 📊 ${regionName} 시장 현황 ===\n`;
    this.items.forEach(item => {
      const quantity = this.quantities[item];
      const price = this.getPrice(item);
      result += `${item}: 가격 ${price}G (${quantity}개)\n`;
    });
    return result;
  }
}

module.exports = Market; 