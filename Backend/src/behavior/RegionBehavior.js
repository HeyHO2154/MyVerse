class RegionBehavior {
  static processRegionActions(gameState) {
    gameState.regions.forEach(region => {
      // 지역의 전체적인 행동 결정
      this.determineRegionStrategy(region, gameState);
      
      // 지역 내 건물들의 행동 실행
      region.buildings.forEach(building => {
        this.executeBuildingAction(building, region);
      });
    });
  }
  
  static determineRegionStrategy(region, gameState) {
    //코드 작성 예정..(재판, 선거 등)
  }

  static executeBuildingAction(building, region) {
    // 건물 작업 임시코드
    const dynasty = building.dynasty;
    const market = region.nation.market;
    const n = 4; //임시 생산량
    const k = market.prices[building.item];
    const S = k > n ? n*(k+(k-n+1))/2 : k*(k+1)/2+(n-k); // 등차수열(최소값이 1일 때와 아닐 때를 구분)
    
    dynasty.money += S;
    market.prices[building.item] = Math.max(1, k - n);
    
    console.log(`🛠️ ${dynasty.name} 가문 ${building.item} 생산(${n}개, 수익: ${S})`);
  }
}

module.exports = RegionBehavior;
