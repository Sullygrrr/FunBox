export interface Player {
  name: string;
  color: string;
  punishment: 'shots' | 'verre' | 'pompes';
  amount: number;
  points?: number;
}

export type GameMode = 'simple' | 'minou' | 'mime' | 'wheel';

export interface GameModeOption {
  id: GameMode;
  title: string;
  emoji: string;
  description: string;
}

export interface Team {
  id: number;
  name: string;
  players: Player[];
  points: number;
}

export type TimeLimit = 30 | 45 | 60 | 90 | 120 | 180;