// Noms pluriels
const nouns = [
  // Animaux
  "Écureuils", "Licornes", "Pandas", "Loups", "Chatons",
  
  // Personnes
  "Baiseurs", "Dragueurs", "Bourrés", "Danseurs", "Fêtards",
  "Chauds", "Coquins", "Pervers", "Célibataires", "Lovers",
  
  // Objets/Concepts
  "Shots", "Verres", "Bières", "Cocktails", "Tequilas",
  "Capotes", "Strings", "Slips", "Bites", "Nichons",
  
  // Métiers décalés
  "Stripeurs", "Gigolos", "Escorts", "Masseurs", "Danseurs",
  
  // Groupes
  "Beaux-gosses", "Bogoss", "BG", "Kékés", "Boloss",
  "Bro", "Mecs", "Meufs", "Copains", "Potes"
];

// Adjectifs pluriels
const adjectives = [
  // Caractéristiques physiques
  "Sexy", "Musclés", "Chauds", "Bouillants", "Excités",
  
  // États
  "Bourrés", "Défoncés", "Pétés", "Allumés", "Déchaînés",
  
  // Qualités
  "Coquins", "Pervers", "Cochons", "Vicieux", "Olé-Olé",
  
  // Intensité
  "Sauvages", "Intenses", "Hardcore", "Extrêmes", "Dingues",
  
  // Style
  "Stylés", "Swag", "Cool", "Badass", "Légendaires",
  
  // Comportement
  "Dragueurs", "Baiseurs", "Charmeurs", "Séducteurs", "Aguicheurs"
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateTeamName(): string {
  const noun = getRandomElement(nouns);
  const adjective = getRandomElement(adjectives);
  
  // 50% de chance d'avoir un adjectif
  const useAdjective = Math.random() > 0.5;
  
  if (useAdjective) {
    return `L'équipe des ${noun} ${adjective}`;
  } else {
    return `L'équipe des ${noun}`;
  }
}