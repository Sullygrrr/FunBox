import { PunishmentLevel } from '../types/punishments';

// Weighted random selection for punishment levels
export const getRandomPunishmentLevel = (): PunishmentLevel => {
  const weights = [0.35, 0.25, 0.20, 0.10, 0.07, 0.03]; // Total = 1
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random <= sum) {
      return {
        level: i + 1,
        shot: [0.5, 1, 1.5, 2, 2.5, 3][i],
        verre: ['1 gorgée', '2 gorgées', '3 gorgées', '1/2 verre', '1/4 de verre', 'LE CUL SEC'][i],
        pompe: [5, 10, 15, 20, 25, 100][i]
      };
    }
  }
  
  return {
    level: 1,
    shot: 0.5,
    verre: '1 gorgée',
    pompe: 5
  };
};