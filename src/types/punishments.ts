export type PunishmentType = 'shot' | 'verre' | 'pompe';

export interface PunishmentLevel {
  level: number;
  shot: number;
  verre: string;
  pompe: number;
}

export const PUNISHMENT_LEVELS: PunishmentLevel[] = [
  { level: 1, shot: 0.5, verre: '1 gorgée', pompe: 5 },
  { level: 2, shot: 1, verre: '2 gorgées', pompe: 10 },
  { level: 3, shot: 1.5, verre: '3 gorgées', pompe: 15 },
  { level: 4, shot: 2, verre: '1/2 verre', pompe: 20 },
  { level: 5, shot: 2.5, verre: '1/4 verre', pompe: 25 },
  { level: 6, shot: 3, verre: 'cul sec', pompe: 100 }
];