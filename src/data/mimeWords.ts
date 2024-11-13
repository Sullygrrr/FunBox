export const defaultMimeWords = [
  // Actions quotidiennes
  "Se brosser les dents",
  "Faire la vaisselle",
  "Prendre une douche",
  "Faire son lit",
  "Conduire une voiture",
  "Faire du vélo",
  "Nager",
  "Danser",
  
  // Métiers
  "Pompier",
  "Chef cuisinier",
  "Professeur",
  "Médecin",
  "Policier",
  "Facteur",
  "Peintre",
  "Photographe",
  
  // Animaux
  "Singe",
  "Éléphant",
  "Lion",
  "Pingouin",
  "Kangourou",
  "Serpent",
  "Girafe",
  "Crocodile",
  
  // Sports
  "Football",
  "Tennis",
  "Basketball",
  "Boxe",
  "Ski",
  "Golf",
  "Bowling",
  "Escalade",
  
  // Objets
  "Téléphone",
  "Ordinateur",
  "Télévision",
  "Parapluie",
  "Brosse à cheveux",
  "Appareil photo",
  "Guitare",
  "Ballon",
  
  // Situations drôles
  "Glisser sur une peau de banane",
  "Marcher sur un Lego",
  "Se cogner le petit orteil",
  "Avoir un fou rire en classe",
  "Rater une marche",
  "Faire semblant d'être cool",
  "Danser comme personne ne regarde",
  "Faire un selfie",
  
  // Films/Séries
  "Star Wars",
  "Harry Potter",
  "Spider-Man",
  "Batman",
  "Game of Thrones",
  "Breaking Bad",
  "La Casa de Papel",
  "Stranger Things",
  
  // Situations de soirée
  "Chercher ses clés",
  "Commander un Uber",
  "Faire un discours bourré",
  "Danser sur du Michael Jackson",
  "Faire un karaoké",
  "Jouer au beer pong",
  "Faire un selfie de groupe",
  "Rentrer à quatre pattes"
];

const processWord = (word: string, getRandomPlayer: () => string): string => {
  let processedWord = word;
  const mentions = word.match(/@joueur/g) || [];
  mentions.forEach(() => {
    const playerName = getRandomPlayer();
    processedWord = processedWord.replace(/@joueur/, playerName);
  });
  return processedWord;
};

// Load custom mime words from localStorage
const loadCustomMimeWords = () => {
  const saved = localStorage.getItem('customMimeWords');
  return saved ? JSON.parse(saved) : [];
};

// Save custom mime words to localStorage
const saveCustomMimeWords = (words: string[]) => {
  localStorage.setItem('customMimeWords', JSON.stringify(words));
};

// Load disabled default mime words from localStorage
const loadDisabledDefaultMimeWords = () => {
  const saved = localStorage.getItem('disabledDefaultMimeWords');
  return saved ? JSON.parse(saved) : [];
};

// Save disabled default mime words to localStorage
const saveDisabledDefaultMimeWords = (indices: number[]) => {
  localStorage.setItem('disabledDefaultMimeWords', JSON.stringify(indices));
};

// Get all custom mime words
export const getCustomMimeWords = () => loadCustomMimeWords();

// Add a custom mime word
export const addCustomMimeWord = (word: string) => {
  const customWords = loadCustomMimeWords();
  customWords.push(word);
  saveCustomMimeWords(customWords);
  return customWords;
};

// Remove a custom mime word
export const removeCustomMimeWord = (index: number) => {
  const customWords = loadCustomMimeWords();
  customWords.splice(index, 1);
  saveCustomMimeWords(customWords);
  return customWords;
};

// Get disabled default mime words
export const getDisabledDefaultMimeWords = () => loadDisabledDefaultMimeWords();

// Toggle a default mime word
export const toggleDefaultMimeWord = (index: number) => {
  const disabledWords = loadDisabledDefaultMimeWords();
  const isDisabled = disabledWords.includes(index);
  
  if (isDisabled) {
    saveDisabledDefaultMimeWords(disabledWords.filter(i => i !== index));
  } else {
    saveDisabledDefaultMimeWords([...disabledWords, index]);
  }
  
  return !isDisabled;
};

// Get all active mime words
export const getAllMimeWords = (getRandomPlayer?: () => string) => {
  const disabledWords = loadDisabledDefaultMimeWords();
  const activeDefaultWords = defaultMimeWords.filter((_, index) => !disabledWords.includes(index));
  const customWords = loadCustomMimeWords();
  const allWords = [...activeDefaultWords, ...customWords];
  
  return getRandomPlayer 
    ? allWords.map(word => processWord(word, getRandomPlayer))
    : allWords;
};