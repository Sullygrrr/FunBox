export interface Player {
  name: string;
  color: string;
  punishment: 'shots' | 'verre' | 'pompes';
  amount: number;
}

export type GameMode = 'simple' | 'minou' | 'wheel';

export interface GameModeOption {
  id: GameMode;
  title: string;
  emoji: string;
  description: string;
}