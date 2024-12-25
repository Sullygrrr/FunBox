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
    id: 'mime',
    title: 'Mime Time',
    emoji: '🤹',
    description: 'Fais deviner sans parler !'
  },
  {
    id: 'wheel',
    title: 'La rouuuue !',
    emoji: '💀',
    description: 'Que la roue décide de votre sort'
  },
  {
    id: 'bottle',
    title: 'La Bouteille',
    emoji: '🍾',
    description: 'Tu pousses le bouchon un peu trop loin Maurice !'
  }
];