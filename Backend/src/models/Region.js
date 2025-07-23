const { randomUUID } = require('crypto');
const Market = require('./Market');

class Region {
  constructor(names, year) {
    this.id = randomUUID();
    this.name = names[Math.floor(Math.random() * names.length)];
    this.createdAt = year;
    this.nation = null;
    this.buildings = []; // 각 지역마다 고유한 건물들
    this.dynasties = []; // 각 지역마다 고유한 가문들
    
    console.log(`\n🌍 ${this.name}이(가) 생성되었습니다!`);
  }

}

module.exports = Region; 