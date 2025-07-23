class GameState {
  constructor() {
    this.year = 0;

    this.regions = [];      // 모든 지역들
    this.dynasties = [];    // 모든 가문들

    this.regionNames = require('fs').readFileSync(require('path').join(__dirname, '../data/region_names.txt'), 'utf-8').split('\n').filter(Boolean);
  }
}

module.exports = GameState; 