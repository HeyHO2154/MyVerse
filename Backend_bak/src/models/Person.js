const { randomUUID } = require('crypto');

class Person {
  constructor(gameState, dynasty, generation, sibling) {
    this.id = randomUUID();
    this.createdAt = gameState.year;
    if(generation == 1){
      this.createdAt -= 20; //최초 가문원은 성인부터 시작
    }

  
    this.dynasty = dynasty;

    this.generation = generation;
    this.gender = Math.random() < 0.5 ? 'male' : 'female';
    this.married = false;
    this.child = 0; // 자녀에게 몇번째 자녀인지 부여
    this.sibling = sibling; // 부모의 this.child를 받음, (이름: dynasty.name가문 generation세 sibling째)
    this.name = dynasty.name+generation+"세"+sibling+(this.gender === 'male' ? "남" : "녀");

    if(this.generation == 1){
      console.log(`🧑‍ ${this.dynasty.name} 가문을 ${this.name}이(가) 창설했습니다.`);
    }else{
      console.log(`👶 ${this.dynasty.name} 가문에 ${this.name}이(가) 태어났습니다.`);
    }
  }

}

module.exports = Person; 