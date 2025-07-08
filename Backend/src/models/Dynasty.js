const { randomUUID } = require('crypto');

const Items = require('./Items');

class Dynasty {
  constructor(name) {
    this.id = randomUUID();
    this.name = name;
    this.createdAt = Date.now();
    this.inventory = Items.createEmptyInventory();  // Items 클래스에서 빈 인벤토리 생성
    
    console.log(`\n👪 ${this.name} 가문이 탄생하였습니다!`);
  }

  // 특정 아이템의 보유 수량 조회
  getItemQuantity(itemName) {
    return this.inventory[itemName];
  }

  // 특정 아이템의 수량 변경
  setItemQuantity(itemName, quantity) {
    this.inventory[itemName] = quantity;
  }

  // 아이템 추가 (구매, 생산 등)
  addItem(itemName, amount) {
    this.inventory[itemName] += amount;
    console.log(`📦 ${this.name} 가문이 ${itemName} ${amount}개를 획득했습니다. (보유: ${this.inventory[itemName]}개)`);
  }

  // 아이템 제거 (판매, 사용 등)
  removeItem(itemName, amount) {
    if (this.inventory[itemName] < amount) {
      throw new Error(`❌ ${itemName}이(가) 부족합니다. (보유: ${this.inventory[itemName]}개, 필요: ${amount}개)`);
    }
    this.inventory[itemName] -= amount;
    console.log(`📤 ${this.name} 가문이 ${itemName} ${amount}개를 사용했습니다. (보유: ${this.inventory[itemName]}개)`);
  }

  // 가문 인벤토리 정보 출력
  getInventoryInfo() {
    let result = `\n=== 📋 ${this.name} 가문 창고 ===\n`;
    Items.itemList.forEach(item => {
      const quantity = this.inventory[item];
      result += `${item}: ${quantity}개\n`;
    });
    return result;
  }
}

module.exports = Dynasty; 