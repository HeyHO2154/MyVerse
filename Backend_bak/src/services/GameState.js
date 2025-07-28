class GameState {
  constructor() {
    this.year = 0;

    this.nations = new Set();      // 모든 국가들
    this.regions = new Set();      // 모든 지역들
    this.dynasties = new Set();    // 모든 가문들


    this.nationNames = require('fs').readFileSync(require('path').join(__dirname, '../data/nation_names.txt'), 'utf-8').split('\n').map(name => name.trim()).filter(Boolean);
    this.regionNames = require('fs').readFileSync(require('path').join(__dirname, '../data/region_names.txt'), 'utf-8').split('\n').map(name => name.trim()).filter(Boolean);  
    this.dynastyNames = require('fs').readFileSync(require('path').join(__dirname, '../data/dynasty_names.txt'), 'utf-8').split('\n').map(name => name.trim()).filter(Boolean);
    this.raceNames = require('fs').readFileSync(require('path').join(__dirname, '../data/race_names.txt'), 'utf-8').split('\n').map(name => name.trim()).filter(Boolean);
  }
}

module.exports = GameState; 