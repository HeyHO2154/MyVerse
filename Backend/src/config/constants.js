// 게임 설정 상수
const GAME_CONFIG = {
  LOOP_INTERVAL: 1000,              // 1초
  REGION_CREATION_PROBABILITY: 0.1, // 10% 확률
  MAX_CONNECTIONS_PER_REGION: 4,    // 최대 연결 수
  MIN_NEW_CONNECTIONS: 1,           // 새 지역의 최소 연결 수
  MAX_NEW_CONNECTIONS: 4,           // 새 지역의 최대 연결 수
  REGION_NAMES_FILE: '../data/region_names.txt'
};

// 지역명 접두사 (중복 방지용)
const REGION_PREFIXES = [
  '뉴', '올드', '리틀', '그레이터', '사우스', '노스', '이스트', '웨스트',
  '어퍼', '로어', '센트럴', '메트로', '그랜드', '로열', '세인트',
  '포트', '마운트', '레이크', '밸리', '힐', '파크', '가든',
  '골든', '실버', '화이트', '블랙', '레드', '블루', '그린'
];

module.exports = {
  GAME_CONFIG,
  REGION_PREFIXES
}; 