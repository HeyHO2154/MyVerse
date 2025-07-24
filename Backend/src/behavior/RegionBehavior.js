const RegionProduce = require('./RegionProduce');

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
  }

  static executeBuildingAction(gameState, building, region) {
    // 작업장 생산
    RegionProduce.BuildingProduce(gameState, building, region);
  }
}

module.exports = RegionBehavior;
