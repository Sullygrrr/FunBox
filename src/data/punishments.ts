export const PUNISHMENT_LEVELS: PunishmentLevel[] = [
  { shot: 0.5, verre: '1 gorgée', pompe: 5, level: 1 },
  { shot: 1, verre: '2 gorgées', pompe: 10, level: 2 },
  { shot: 1.5, verre: '3 gorgées', pompe: 15, level: 3 },
  { shot: 2, verre: '1/2 verre', pompe: 20, level: 4 },
  { shot: 2.5, verre: '1/4 verre', pompe: 25, level: 5 },
  { shot: 3, verre: 'cul sec', pompe: 100, level: 6 },
];

export const getRandomPunishmentLevel = (): PunishmentLevel => {
  return PUNISHMENT_LEVELS[Math.floor(Math.random() * PUNISHMENT_LEVELS.length)];
};

export const formatPunishment = (type: 'shot' | 'verre' | 'pompe', amount: number | string): string => {
  if (type === 'shot') {
    return `${amount} shot${amount > 1 ? 's' : ''}`;
  } else if (type === 'verre') {
    return typeof amount === 'string' ? amount : `${amount} verre${amount > 1 ? 's' : ''}`;
  } else {
    return `${amount} pompe${amount > 1 ? 's' : ''}`;
  }
};