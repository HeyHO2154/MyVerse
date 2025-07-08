const fs = require('fs');
const path = require('path');
const Market = require('./Market');

class Region {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.createdAt = Date.now();
    this.market = new Market(); // 각 지역마다 고유한 시장
    console.log(`\n🌍 ${this.name}이(가) 생성되었습니다!`);
  }

}

module.exports = Region; 