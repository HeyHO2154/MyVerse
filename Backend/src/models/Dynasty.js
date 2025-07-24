const { randomUUID } = require('crypto');
const Person = require('./Person');

class Dynasty {
  constructor(gameState, region) {
    this.id = randomUUID();
    this.name = gameState.dynastyNames[Math.floor(Math.random() * gameState.dynastyNames.length)];
    this.createdAt = gameState.year;

    this.region = region;
    this.persons = [new Person(gameState, this, 1, 1)];

    this.money = 0;

    gameState.dynasties.add(this);
    console.log(`🙋 ${region.name}에 ${this.name} 가문이 생성되었습니다.`);
  }

}

module.exports = Dynasty; 