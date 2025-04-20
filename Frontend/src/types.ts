// types.ts
export interface Galaxy {
    id: string;
    name: string;
    create_time: number;
    update_time: number;
    x?: number; // 랜덤 생성 좌표 (프론트용)
    y?: number;
  }
  