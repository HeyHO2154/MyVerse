const MarketTrade = require('../action/MarketTrade');

class DynastyConsume {

  static consume(dynasty, market) {
    if(dynasty.money > market.prices['식량']*dynasty.persons.size) MarketTrade.BuyItem(dynasty, market, '식량', dynasty.persons.size);
    // if(dynasty.money > market.prices['옷']*dynasty.persons.size) MarketTrade.BuyItem(dynasty, market, '옷', dynasty.persons.size);
    // if(dynasty.money > market.prices['술']*dynasty.persons.size) MarketTrade.BuyItem(dynasty, market, '술', dynasty.persons.size);
  }
  
}

module.exports = DynastyConsume;
