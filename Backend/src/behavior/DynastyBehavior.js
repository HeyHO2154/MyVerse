const DynastyConsume = require('./DynastyConsume');
const DynastyGetWork = require('./DynastyGetWork');
const DynastyWedding = require('./DynastyWedding');
const Person = require('../models/Person');

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

    // 나이에 따른 행동
    const age = gameState.year - person.createdAt;
    if(age >= 60){
      if(Math.floor(Math.random()*(Math.max(2, 80-age))) == 0){ 
        person.died = true;
        console.log(`💀 ${person.name}이(가) 죽었습니다.`);
      }
    } else if (age >= 40){
      // 중년기
    } else if (age >= 20){
      // 구혼하기 - 미혼 남성이면서 가문에 돈이 있을 때
      if(person.married === false && dynasty.money > 10 && person.gender === 'male'){
        DynastyWedding.proposeMarriage(person, gameState);
      }
    } else {
      // 유년기 
    }

    // 출산
    if(person.married === true && person.gender === 'female' && age >= 20 && age < 40){
      // 출산 확률: 나이, 자녀 수에 반비례
      if(Math.floor(Math.random()*age*(person.child+1)) == 0){
        person.dynasty.persons.add(new Person(gameState, person.dynasty, person.generation+1, ++person.child));
      }
    }
    
    
  }


}

module.exports = DynastyBehavior;
