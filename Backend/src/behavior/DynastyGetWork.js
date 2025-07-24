const Building = require('../models/Building');

class DynastyGetWork {

  static getLand(gameState, dynasty, market) {
    // 임시로 석재 또는 식량 건물 건설
    new Building(gameState, dynasty, Math.floor(Math.random()*2) == 0 ? '석재' : '식량');

    dynasty.class = Math.max(dynasty.class, 2); //최소 중산층 보장
    dynasty.employed = true;
  }
  
  static getJob(dynasty) {
    // 구인 중인 건물 중 임금이 가장 높은 건물 찾아서 취업
    const recruitingBuildings = Array.from(dynasty.region.buildings).filter(building => building.recruit === true);
    
    if (recruitingBuildings.length === 0) {
      // console.log(`💤 ${dynasty.name} 가문이 구직할 일자리가 없습니다.`);
      return;
    }
    
    const maxWage = Math.max(...recruitingBuildings.map(building => building.wage));
    const maxWageBuilding = recruitingBuildings.find(building => building.wage === maxWage);
    maxWageBuilding.workers.add(dynasty);
    dynasty.employed = true;
    // 건물 인원 초과 시 고용 중단
    if(maxWageBuilding.workers.size >= maxWageBuilding.dynasty.skill){
      maxWageBuilding.recruit = false;
    }
    console.log(`🛠️  ${dynasty.name} 가문이 ${maxWageBuilding.dynasty.name} 가문의 ${maxWageBuilding.item} 건물에 취업(임금: ${maxWageBuilding.wage})`);
  }

}

module.exports = DynastyGetWork;
