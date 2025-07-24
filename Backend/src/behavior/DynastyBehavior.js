const DynastyConsume = require('./DynastyConsume');
const DynastyGetWork = require('./DynastyGetWork');

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
    const market = dynasty.region.nation.market;
    
    // 가문원들 수 만큼 시장에서 식량 구매 (등차수열 합 공식 사용)
    DynastyConsume.consume(dynasty, market);

    // 토지가 남는 다면 건물 건설, 이외 구직 활동
    if(dynasty.region.buildings.size < dynasty.region.size){
      DynastyGetWork.getLand(gameState, dynasty, market);
    } else if(dynasty.class < 2 && !dynasty.employed) {
      DynastyGetWork.getJob(dynasty);
    }
    
  }
  
  static executePersonAction(person, dynasty, gameState) {
    // 구혼하기
    if(person.married == false && dynasty.money > 10){
      //코드 작성 예정
      //같은 지역 내 미혼, 전재산의 10%를 주어야하므로 적자인 경우 구혼 안함
    }
  }
}

module.exports = DynastyBehavior;
