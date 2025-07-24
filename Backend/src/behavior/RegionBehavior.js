const RegionProduce = require('./RegionProduce');
const Dynasty = require('../models/Dynasty');

class RegionBehavior {
  static processRegionActions(gameState) {
    gameState.regions.forEach(region => {
      // 지역의 전체적인 행동 결정
      this.determineRegionStrategy(region, gameState);
      
      // 지역 내 건물들의 행동 실행
      region.buildings.forEach(building => {
        this.executeBuildingAction(gameState, building, region);
      });
    });
  }
  
  static determineRegionStrategy(region, gameState) {
    //코드 작성 예정..(재판, 선거 등)

    // 지역 내 가문 생성
    region.dynasties.add(new Dynasty(gameState, region));

  }

  static executeBuildingAction(gameState, building, region) {
    // 작업장 생산
    if(gameState.dynasties.has(building.dynasty)){
      RegionProduce.BuildingProduce(gameState, building, region);
    } else {
      // 건물 노동자 순회하면서 해고처리
      for (const worker of building.workers) {
        if(gameState.dynasties.has(worker)){
          worker.employed = false;
          console.log(`💤 ${building.dynasty.name} 가문의 ${building.item} 건물 소유권이 제거되어 노동자 ${worker.name}이(가) 해고되었습니다.`);
        }
      }
      region.buildings.delete(building);
    }
    
  }
}

module.exports = RegionBehavior;
