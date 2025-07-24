class DynastyConsume {

  static consume(dynasty, market) {
    this.consumeItem(dynasty, market, '식량');
    if(dynasty.money > 0) this.consumeItem(dynasty, market, '옷'); else ;// 준비중
    if(dynasty.money > 0) this.consumeItem(dynasty, market, '술'); else ;// 준비중
  }
  
  static consumeItem(dynasty, market, item) {
    dynasty.money -= dynasty.persons.length * (2 * market.prices[item] + dynasty.persons.length - 1) / 2;
    market.prices[item] += dynasty.persons.length;
    console.log(`💰 ${dynasty.name} 가문(${dynasty.persons.length}명) ${item} 구매(${item}: ${market.prices[item] - dynasty.persons.length} -> ${market.prices[item]})[재산: ${dynasty.money}]`);
  }
  
  static consumeService(dynasty, gameState) {
    // 서비스 소비
  }
  
  static consumeWork(dynasty, gameState) {
    // 작업장 원료 소비 
  }
}

module.exports = DynastyConsume;
