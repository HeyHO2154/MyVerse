class Person {
  constructor(gameState, dynasty) {
    this.dynasty = dynasty;
    this.createdAt = gameState.turn;

    this.gender = Math.random() < 0.5 ? '남' : '여';
    this.married = false;

    console.log(`👶 ${this.dynasty.name} 가문이 출산했습니다. (${this.gender})`);
  }

}

module.exports = Person; 