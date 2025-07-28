class MarketTrade {

  static BuyItem(dynasty, market, item, count) {
    if(count <= 0) return 0;
    
    const price = count * (2 * market.prices[item] + count - 1) / 2;
    market.prices[item] += count;

    dynasty.money -= price;
    console.log(`💰 ${dynasty.name} 가문(${dynasty.persons.size}명) ${item} 구매(${item}: ${market.prices[item] - count} -> ${market.prices[item]})[재산: ${dynasty.money}]`);
    return price;
  }
  
  static SellItem(dynasty, market, item, count) {
    if(count <= 0) return 0;

    const firstPrice = market.prices[item];
    const price = firstPrice > count ? count*(firstPrice+(firstPrice-count+1))/2 : firstPrice*(firstPrice+1)/2+(count-firstPrice);
    market.prices[item] = Math.max(1, market.prices[item] - count);
    
    dynasty.money += price;
    console.log(`💰 ${dynasty.name} 가문(${dynasty.persons.size}명) ${item} 판매(${item}: ${firstPrice} -> ${market.prices[item]})[재산: ${dynasty.money}]`);
    return price;
  }
  
}

module.exports = MarketTrade;
