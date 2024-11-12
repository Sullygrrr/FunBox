import { GameModeOption } from '../types';

export const gameModes: GameModeOption[] = [
  {
    id: 'simple',
    title: 'Simple, Basique',
    emoji: '👌',
    description: 'Questions simples pour briser la glace'
  },
  {
    id: 'minou',
    title: 'Par Minou',
    emoji: '😈',
    description: 'Votez secrètement pour vos amis'
  },
  {
    id: 'wheel',
    title: 'La rouuuue !',
    emoji: '💀',
    description: 'Que la roue décide de votre sort'
  }
];