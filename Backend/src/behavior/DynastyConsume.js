const MarketTrade = require('../action/MarketTrade');

class DynastyConsume {

  static consume(dynasty, market) {
    MarketTrade.BuyItem(dynasty, market, '식량', dynasty.persons.size);
    // if(dynasty.money > 0) MarketTrade.BuyItem(market, '옷', dynasty.persons.size); else ;// 준비중
    // if(dynasty.money > 0) MarketTrade.BuyItem(market, '술', dynasty.persons.size); else ;// 준비중
  }
  
}

module.exports = DynastyConsume;
