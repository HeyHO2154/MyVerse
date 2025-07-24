const Building = require('../models/Building');

class DynastyGetWork {

  static getLand(gameState, dynasty, market) {
    // 시장에서 비싼 상품 찾아서 관련 건물 건설
    const maxPrice = Math.max(...Object.values(market.prices));
    const maxPriceItem = Object.keys(market.prices).find(key => market.prices[key] === maxPrice);
    if(maxPriceItem && dynasty.region.buildings.length < dynasty.region.size){
      new Building(gameState, dynasty, maxPriceItem);
    }
  }
  
  static getJob(dynasty, market) {
    // 구직 활동
  }

}

module.exports = DynastyGetWork;
