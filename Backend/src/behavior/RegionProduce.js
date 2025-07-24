class RegionProduce {

  static BuildingProduce(GameState, building, region) {
    const dynasty = building.dynasty;
    const market = region.nation.market;
    const n = building.workers.size

    // 고용 불가라면 임금 상승
    if (n == 0) {
      building.wage++;
      console.log(`🛠️  ${dynasty.name} 가문 ${building.item} 고용 불가, 임금 상승(${building.wage})`);
      return;
    }

    // 고용 가능하면 생산    
    const k = market.prices[building.item];
    const S = k > n ? n*(k+(k-n+1))/2 : k*(k+1)/2+(n-k); // 등차수열(최소값이 1일 때와 아닐 때를 구분)
    const profit = S - n * building.wage;
    if(profit < 0){
      building.wage = Math.max(1, building.wage - 1);
      console.log(`🛠️  ${dynasty.name} 가문 ${building.item} 적자 운영, 임금 하락(${building.wage})`);
      return;
    }
    
    // 수익 분배
    for (const worker of building.workers) {
      GameState.dynasties.has(worker) ? worker.money += building.wage : building.workers.delete(worker); //생명주기 확인용
    }
    market.prices[building.item] = Math.max(1, k - n);
    dynasty.money += profit;
    
    console.log(`🛠️  ${dynasty.name} 가문 ${building.item} 생산(${n}개, 순이익: ${profit}(총 판매: ${S}, 총 임금: ${n * building.wage}))`);
  }

}

module.exports = RegionProduce;
