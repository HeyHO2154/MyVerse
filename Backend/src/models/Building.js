const { randomUUID } = require('crypto');

class Building {
  constructor(name, buildingType, inputItems, outputItems, productionRate) {
    this.id = randomUUID();
    this.name = name;
    this.buildingType = buildingType; // "production", "processing", "service"
    this.createdAt = Date.now();
    
    // 소유권 & 인력
    this.owner = null;        // 경영하는 가문 (Dynasty 객체)
    this.workers = [];        // 근로하는 타 가문원들 배열 [dynastyId, dynastyId, ...]
    
    // 생산 관련
    this.inputItems = inputItems;     // 필요한 재료들 [{item: "목재", amount: 2}]
    this.outputItems = outputItems;    // 생산되는 상품들 [{item: "가구", amount: 1}]
    this.productionRate = productionRate;  // 노동자 1명당 생산 배율
    
    console.log(`\n🏗️ ${this.name} 건물이 건설되었습니다! (유형: ${this.buildingType})`);
  }

  // 가문을 건물 소유자로 설정
  setOwner(dynasty) {
    this.owner = dynasty;
    console.log(`🏠 ${dynasty.name} 가문이 ${this.name}을(를) 소유하게 되었습니다.`);
  }

  // 노동자 추가
  addWorker(dynastyId) {
    this.workers.push(dynastyId);
    console.log(`👷 가문 ${dynastyId}의 일원이 ${this.name}에서 근무를 시작했습니다.`);
  }

  // 노동자 제거
  removeWorker(dynastyId) {
    const index = this.workers.indexOf(dynastyId);
    if (index > -1) {
      this.workers.splice(index, 1);
      console.log(`👋 가문 ${dynastyId}의 일원이 ${this.name}에서 퇴사했습니다.`);
      return true;
    }
    return false;
  }

  // 현재 총 생산 가능량 계산
  calculateProduction() {
    const workerCount = this.workers.length;
    const totalProduction = {};
    
    this.outputItems.forEach(output => {
      totalProduction[output.item] = output.amount * workerCount * this.productionRate;
    });
    
    return totalProduction;
  }

  // 건물 정보 출력
  toString() {
    return `🏗️ ${this.name} (${this.buildingType}) - 소유자: ${this.owner ? this.owner.name : '없음'}, 노동자: ${this.workers.length}명`;
  }
}

module.exports = Building; 