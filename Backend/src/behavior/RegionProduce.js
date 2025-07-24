class RegionProduce {

  static BuildingProduce(GameState, building, region) {
    const dynasty = building.dynasty;
    const market = region.nation.market;
    
    // 수익 계산
    const n = building.workers.size*2 //생산량
    const k = market.prices[building.item];
    const S = k > n ? n*(k+(k-n+1))/2 : k*(k+1)/2+(n-k); // 등차수열(최소값이 1일 때와 아닐 때를 구분)
    const profit = S - n * building.wage;
    
    // 수익 분배
    for (const worker of building.workers) {
      GameState.dynasties.has(worker) ? worker.money += building.wage : building.workers.delete(worker); //생명주기 확인용
    }
    market.prices[building.item] = Math.max(1, k - n);
    dynasty.money += profit;
    
    // 손익에 따른 임금 조정
    if(profit < 0 && dynasty.money < 0){
      building.recruit = false;
      building.wage = Math.max(1, building.wage - 1);
      console.log(`🛠️  ${dynasty.name} 가문 ${building.item} 생산 ${n}개(순이익 ${profit} = 수익 ${S} - 임금 ${n * building.wage})[임금 하락]`);
    } else {
      building.recruit = true;
      building.wage++;
      console.log(`🛠️  ${dynasty.name} 가문 ${building.item} 생산 ${n}개(순이익 ${profit} = 수익 ${S} - 임금 ${n * building.wage})[임금 상승]`);
    }
    
  }

}

module.exports = RegionProduce;
