const { randomUUID } = require('crypto');

class Person {
  constructor(gameState, dynasty, generation) {
    this.id = randomUUID();
    this.name = null;
    this.createdAt = gameState.year;
    if(generation == 0){
      this.createdAt -= 20; //최초 가문원은 성인부터 시작
    }

    this.generation = generation + 1;
    this.dynasty = dynasty;
    this.gender = Math.random() < 0.5 ? true : false;
    if(this.gender){
      this.name = gameState.dynastyNames2[Math.floor(Math.random() * gameState.dynastyNames2.length)];
    }else{
      this.name = gameState.dynastyNames3[Math.floor(Math.random() * gameState.dynastyNames3.length)];
    }
    this.married = false;

    console.log(`👶 ${this.dynasty.name} 가문에 ${this.name}이(가) 탄생했습니다!`);
  }

}

module.exports = Person; 