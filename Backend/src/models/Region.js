class Region {
  constructor(gameState) {
    this.name = gameState.regionNames[Math.floor(Math.random() * gameState.regionNames.length)];
    this.size = (2 + Math.floor(Math.random() * 5)) * 2;  // 4~12개(4:소형, 6:중소형, 8:중형, 10:중대형, 12:대형)
  
    // 자원을 무작위 순서로 배치 후 지역 크기(2~6)만큼 순차적으로 선택
    const allResources = ['석재', '철', '금', '석탄', '식량', '과일', '양모', '목재'];
    this.resources = allResources
      .map(item => ({ item, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(obj => obj.item)
      .slice(0, this.size/2);

    this.nation = null;
    this.government = null;

    this.buildings = new Set(); // 각 지역마다 고유한 건물들
    this.dynasties = new Set(); // 각 지역마다 고유한 가문들
    
    gameState.regions.add(this);
    console.log(`🌍 지역 ${this.name}이(가) 생성되었습니다. (크기: ${this.size})[${this.resources.join(', ')}]`);
    
  }

}

module.exports = Region;