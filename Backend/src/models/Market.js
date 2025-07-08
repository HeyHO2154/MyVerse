const Items = require('./Items');

class Market {
  constructor() {
    // Items 클래스에서 빈 인벤토리 생성
    this.quantities = Items.createEmptyInventory();
  }

  // 특정 아이템의 현재 가격 계산 (가격 = 100 + 수량)
  getPrice(itemName) {
    return 100 + this.quantities[itemName];
  }

  // 특정 아이템의 수량 조회
  getQuantity(itemName) {
    return this.quantities[itemName];
  }

  // 특정 아이템의 수량 변경
  setQuantity(itemName, quantity) {
    this.quantities[itemName] = quantity;
  }

  // 시장 정보 출력
  toString(regionName) {
    let result = `\n=== 📊 ${regionName} 시장 현황 ===\n`;
    Items.itemList.forEach(item => {
      const quantity = this.quantities[item];
      const price = this.getPrice(item);
      result += `${item}: 가격 ${price}G (${quantity}개)\n`;
    });
    return result;
  }
}

module.exports = Market; 