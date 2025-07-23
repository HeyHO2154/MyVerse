class RegionBehavior {
  static processRegionActions(gameState) {
    gameState.regions.forEach(region => {
      // 지역의 전체적인 행동 결정
      this.determineRegionStrategy(region, gameState);
      
      // 지역 내 건물들의 행동 실행
      region.buildings.forEach(building => {
        this.executeBuildingAction(building, region, gameState);
      });
    });
  }
  
  static determineRegionStrategy(region, gameState) {
    //코드 작성 예정..(재판, 선거 등)
  }

  static executeBuildingAction(building, region, gameState) {
    // 건물 작업 임시코드
    const dynasty = building.dynasty;
    const market = region.nation.market;
    const produce = 4 //임시 생산량
    dynasty.money += produce * (2 * market.prices[building.item] + produce - 1) / 2;
    market.prices[building.item] = Math.max(1, market.prices[building.item] - produce);
    console.log(`🛠️ `);

  }
}

module.exports = RegionBehavior;
