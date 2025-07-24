const DynastyConsume = require('./DynastyConsume');
const DynastyGetWork = require('./DynastyGetWork');
const DynastyWedding = require('./DynastyWedding');

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
    
    // 가문원들 식량 구매
    DynastyConsume.consume(dynasty, market);

    // 토지가 남는 다면 건물 건설, 이외 구직 활동
    if(dynasty.region.buildings.size < dynasty.region.size){
      DynastyGetWork.getLand(gameState, dynasty, market);
    } else if(dynasty.class < 2 && !dynasty.employed) {
      DynastyGetWork.getJob(dynasty);
    }
    
  }
  
  static executePersonAction(person, dynasty, gameState) {
    // 구혼하기 - 미혼 남성이면서 가문에 돈이 있을 때
    if(person.married === false && dynasty.money > 10 && person.gender === 'male'){
      DynastyWedding.proposeMarriage(person, gameState);
    }
  }


}

module.exports = DynastyBehavior;
