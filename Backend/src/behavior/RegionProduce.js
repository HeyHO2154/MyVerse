const MarketTrade = require('../action/MarketTrade');

class RegionProduce {

  static BuildingProduce(GameState, building, region) {
    const dynasty = building.dynasty;
    const market = region.nation.market;
    
    // 생산
    for (const worker of building.workers) {
      GameState.dynasties.has(worker) ? worker.money += building.wage : building.workers.delete(worker); //생명주기 확인용
    }
    const totalWage = building.workers.size * building.wage;
    dynasty.money -= totalWage;
    const buildingUpkeep = MarketTrade.BuyItem(dynasty, market, '석재', dynasty.skill); 
    console.log(`🛠️  ${dynasty.name} 가문 ${building.item} 생산 ${(building.workers.size + 1) * dynasty.skill}개(지출: 임금 ${building.wage}*${building.workers.size}, 건물 ${buildingUpkeep})[재산: ${dynasty.money}]`);
    // 판매
    const income = MarketTrade.SellItem(dynasty, market, building.item, (building.workers.size + 1) * dynasty.skill);
    const profit = income - totalWage - buildingUpkeep;
    
    // 손익에 따른 임금 조정 
    if(profit < 0){
      building.recruit = false;
      building.wage = Math.max(1, building.wage - 1);
    }else if(building.workers.size < dynasty.skill){
      if(dynasty.money > 0){
        building.recruit = true;
        building.wage++;
      }else{
        building.wage = Math.max(1, building.wage - 1);
      }
    }else{
      building.recruit = false;
    }

  }

}

module.exports = RegionProduce;
