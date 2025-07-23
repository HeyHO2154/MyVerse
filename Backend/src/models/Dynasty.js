const { randomUUID } = require('crypto');
const Person = require('./Person');

class Dynasty {
  constructor(gameState, region) {
    this.id = randomUUID();
    this.name = gameState.dynastyNames[Math.floor(Math.random() * gameState.dynastyNames.length)];
    this.createdAt = gameState.year;

    this.region = region;
    this.persons = [];

    gameState.dynasties.push(this);
    console.log(`🙋 ${region.name}에 ${this.name} 가문이 생성되었습니다.`);
    this.persons.push(new Person(gameState, this, 0));
  }

}

module.exports = Dynasty; 