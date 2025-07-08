class Items {
  // 게임 내 모든 아이템 목록
  static itemList = [
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

  // 빈 인벤토리 객체 생성
  static createEmptyInventory() {
    const inventory = {};
    this.itemList.forEach(item => {
      inventory[item] = 0;
    });
    return inventory;
  }
  
}

module.exports = Items; 