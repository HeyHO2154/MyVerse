const Person = require('./Person');

class Dynasty {
  constructor(gameState, region) {
    this.name = gameState.dynastyNames[Math.floor(Math.random() * gameState.dynastyNames.length)];
    this.createdAt = gameState.year;

    this.region = region;
    this.persons = new Set();
    this.persons.add(new Person(gameState, this));

    this.money = 0;

    this.class = 1; // 가문 클래스 - 0: 노예/죄수, 1: 하류층, 2: 중산층, 3: 상류층
    this.skill = 1; // 가문 기술 레벨
    this.employed = false; // 취업 여부(건물 소유 포함)

    gameState.dynasties.add(this);
    console.log(`🙋 ${region.name}에 ${this.name} 가문이 생성되었습니다.`);
  }

}

module.exports = Dynasty; 