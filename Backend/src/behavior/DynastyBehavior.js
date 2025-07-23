class DynastyBehavior {
  static processDynastyActions(gameState) {
    gameState.dynasties.forEach(dynasty => {
      // 가문의 전체적인 행동 결정
      this.determineDynastyStrategy(dynasty, gameState);
      
      // 가문원들의 개별 행동 실행
      dynasty.persons.forEach(person => {
        this.executePersonAction(person, dynasty, gameState);
      });
    });
  }
  
  static determineDynastyStrategy(dynasty, gameState) {
    // 가문원들 수 만큼 시장에서 식량 구매 (등차수열 합 공식 사용)
    const market = dynasty.region.nation.market;
    dynasty.money -= dynasty.persons.length * (2 * market.prices['식량'] + dynasty.persons.length - 1) / 2;
    market.prices['식량'] += dynasty.persons.length;
    console.log(`${dynasty.name} 가문이 식량 구매(식량: ${market.prices['식량'] - dynasty.persons.length} -> ${market.prices['식량']})[재산: ${dynasty.money}]`);
  }
  
  static executePersonAction(person, dynasty, gameState) {
    // 구혼하기
    if(person.married == false){
      //코드 작성 예정
    }
  }
}

module.exports = DynastyBehavior;
