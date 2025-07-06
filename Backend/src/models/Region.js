const { GAME_CONFIG } = require('../config/constants');

class Region {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.connections = []; // 연결된 지역들의 ID 배열
    this.createdAt = Date.now();
  }

  // 연결 가능한지 확인
  canAddConnection() {
    return this.connections.length < GAME_CONFIG.MAX_CONNECTIONS_PER_REGION;
  }

  // 특정 지역과 이미 연결되어 있는지 확인
  isConnectedTo(regionId) {
    return this.connections.includes(regionId);
  }

  // 연결 추가 (단방향)
  addConnection(regionId) {
    if (!this.canAddConnection()) {
      console.log(`❌ ${this.name}은 이미 최대 연결 수에 도달했습니다.`);
      return false;
    }

    if (this.isConnectedTo(regionId)) {
      console.log(`❌ ${this.name}은 이미 지역 ${regionId}와 연결되어 있습니다.`);
      return false;
    }

    if (regionId === this.id) {
      console.log(`❌ ${this.name}은 자기 자신과 연결할 수 없습니다.`);
      return false;
    }

    this.connections.push(regionId);
    console.log(`✅ ${this.name}이 지역 ${regionId}와 연결되었습니다.`);
    return true;
  }

  // 연결 제거 (단방향)
  removeConnection(regionId) {
    const index = this.connections.indexOf(regionId);
    if (index > -1) {
      this.connections.splice(index, 1);
      console.log(`🔌 ${this.name}에서 지역 ${regionId}와의 연결이 제거되었습니다.`);
      return true;
    }
    return false;
  }

  // 지역 정보를 보기 좋게 출력
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      connections: this.connections.length,
      connectedTo: this.connections,
      createdAt: new Date(this.createdAt).toLocaleTimeString()
    };
  }

  // 지역 정보를 문자열로 반환
  toString() {
    return `🏙️ ${this.name} (ID: ${this.id}, 연결: ${this.connections.length}/4)`;
  }
}

module.exports = Region; 