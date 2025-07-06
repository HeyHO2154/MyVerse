const fs = require('fs');
const path = require('path');
const Region = require('../models/Region');
const { GAME_CONFIG, REGION_PREFIXES } = require('../config/constants');

class GameState {
  constructor() {
    this.regions = [];
    this.regionIdCounter = 1;
    this.usedNames = new Set();
    this.availableNames = [];
    this.startTime = Date.now();
    
    // 지역명 파일 읽기
    this.loadRegionNames();
  }

  // 지역명 파일에서 이름들을 로드
  loadRegionNames() {
    try {
      // 절대 경로로 파일 읽기
      const filePath = path.join(__dirname, GAME_CONFIG.REGION_NAMES_FILE);
      const data = fs.readFileSync(filePath, 'utf8');
      this.availableNames = data.split('\n').filter(name => name.trim() !== '');
      console.log(`📚 ${this.availableNames.length}개의 지역명을 로드했습니다.`);
    } catch (error) {
      console.error('❌ 지역명 파일을 읽을 수 없습니다:', error.message);
      // 기본 이름들로 대체
      this.availableNames = ['중심지', '신도시', '구도시', '항구', '산업지구'];
    }
  }

  // 중복되지 않는 지역명 생성
  generateUniqueName() {
    // 사용 가능한 원본 이름들 중에서 선택
    const availableOriginalNames = this.availableNames.filter(name => !this.usedNames.has(name));
    
    if (availableOriginalNames.length > 0) {
      // 원본 이름 중에서 랜덤 선택
      const randomName = availableOriginalNames[Math.floor(Math.random() * availableOriginalNames.length)];
      this.usedNames.add(randomName);
      return randomName;
    }
    
    // 원본 이름이 모두 사용되었다면 접두사 추가
    for (let i = 0; i < 100; i++) { // 무한 루프 방지
      const originalName = this.availableNames[Math.floor(Math.random() * this.availableNames.length)];
      const prefix = REGION_PREFIXES[Math.floor(Math.random() * REGION_PREFIXES.length)];
      const newName = `${prefix} ${originalName}`;
      
      if (!this.usedNames.has(newName)) {
        this.usedNames.add(newName);
        return newName;
      }
    }
    
    // 그래도 찾지 못했다면 ID 기반 이름 생성
    const fallbackName = `지역 ${this.regionIdCounter}`;
    this.usedNames.add(fallbackName);
    return fallbackName;
  }

  // 새로운 지역 생성
  createRegion() {
    const name = this.generateUniqueName();
    const region = new Region(this.regionIdCounter++, name);
    this.regions.push(region);
    
    console.log(`🏙️ 새로운 지역 생성: ${region.toString()}`);
    return region;
  }

  // ID로 지역 찾기
  getRegionById(id) {
    return this.regions.find(region => region.id === id);
  }

  // 연결 가능한 지역들 찾기
  getConnectableRegions(targetRegion) {
    return this.regions.filter(region => 
      region.id !== targetRegion.id && 
      region.canAddConnection() && 
      !region.isConnectedTo(targetRegion.id)
    );
  }

  // 두 지역을 양방향으로 연결
  connectRegions(regionA, regionB) {
    const successA = regionA.addConnection(regionB.id);
    const successB = regionB.addConnection(regionA.id);
    
    if (successA && successB) {
      console.log(`🔗 ${regionA.name} ↔ ${regionB.name} 양방향 연결 완료`);
      return true;
    } else {
      // 실패한 경우 롤백
      if (successA) regionA.removeConnection(regionB.id);
      if (successB) regionB.removeConnection(regionA.id);
      return false;
    }
  }

  // 새 지역을 기존 지역들과 연결
  connectNewRegion(newRegion) {
    const connectableRegions = this.getConnectableRegions(newRegion);
    
    if (connectableRegions.length === 0) {
      console.log(`⚠️ ${newRegion.name}을 연결할 수 있는 지역이 없습니다.`);
      return;
    }

    // 연결할 지역 수 결정 (1~4개, 단 사용 가능한 지역 수를 초과하지 않음)
    const maxConnections = Math.min(
      GAME_CONFIG.MAX_NEW_CONNECTIONS,
      connectableRegions.length,
      GAME_CONFIG.MAX_CONNECTIONS_PER_REGION - newRegion.connections.length
    );
    
    const numConnections = Math.floor(Math.random() * maxConnections) + GAME_CONFIG.MIN_NEW_CONNECTIONS;
    
    console.log(`🔗 ${newRegion.name}을 ${numConnections}개 지역과 연결 시도...`);
    
    // 랜덤하게 지역들 선택하여 연결
    const shuffledRegions = connectableRegions.sort(() => 0.5 - Math.random());
    let connected = 0;
    
    for (let i = 0; i < shuffledRegions.length && connected < numConnections; i++) {
      const targetRegion = shuffledRegions[i];
      
      if (this.connectRegions(newRegion, targetRegion)) {
        connected++;
      }
    }
    
    console.log(`✅ ${newRegion.name}이 ${connected}개 지역과 연결되었습니다.`);
  }

  // 게임 상태 통계
  getStats() {
    const totalConnections = this.regions.reduce((sum, region) => sum + region.connections.length, 0) / 2; // 양방향이므로 2로 나눔
    
    return {
      totalRegions: this.regions.length,
      totalConnections: totalConnections,
      averageConnections: this.regions.length > 0 ? (totalConnections * 2 / this.regions.length).toFixed(1) : 0,
      uptime: Math.floor((Date.now() - this.startTime) / 1000)
    };
  }

  // 모든 지역 정보 출력
  printAllRegions() {
    console.log('\n📋 현재 모든 지역:');
    this.regions.forEach(region => {
      const connectedNames = region.connections.map(id => {
        const connectedRegion = this.getRegionById(id);
        return connectedRegion ? connectedRegion.name : `Unknown(${id})`;
      });
      
      console.log(`   ${region.toString()}`);
      if (connectedNames.length > 0) {
        console.log(`      연결된 지역: ${connectedNames.join(', ')}`);
      }
    });
  }
}

module.exports = GameState; 