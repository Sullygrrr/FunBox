export const defaultMimeWords = [

  "Un spaghetti qui se bat contre une fourchette.",
  "Une personne coincée dans un sac de couchage",
  "Un pingouin qui tente de faire des pompes",
  "Une poule qui découvre qu'elle a pondu un œuf en or",
  "Une personne qui marche sur la Lune",
  "Un serpent qui apprend à faire du hula-hoop",
  "Un frigo, mais italien",
  "Un frigo, mais américain",
  "Une douche italienne",
  "Un aspirateur robot",
  "Stephen Hawking",
  "Usain Bolt",
  "Inoxtag",
  "Une pierre qui roule, qui n'amasse pas mousse",
  "Une Femme",
  "Un champion d'origami",
  "une truite",
  "Un combat de boxe",
  "Un aveugle sur son téléphone",
  "@joueur mais bourré",
  "Un sourd dans un concert",
  "Un muet qui fait de l'opera",
  "La daronne à @joueur",
  "Un barbecue qui prends feu",
  "Un grille-pain",
  "Une table basse",
  "Une chaise",
  "Un lampadaire",
  "Un volet roulant",
  "Une tortue asmatique",
  "Un clown",
  "Le mot Oui",
  "Charlie Chaplin",
  "Le H",
  "Le Z",
  "Ribérie",
  "Zlatan",
  "Une poire à lavement",
  "L'architecte de la Tour de Pise",
  "La marseillaise",
  "La patience",
  "ChatGPT",
  "Mime rien, prends juste un shot et passe au suivant",
  "Toi même",
  "Jul",
  "Monsieur -30%",
  "Squeezie",
  "Hoodi",
  "Une Golden Shower",
  "Une cannette de RedBull",
  "Un Quoicoubeh (bienvenue en 2013)",
  "Xavier Dupont de Ligonnès",
  "Le rappeur Danyl",
  "SCH",
  "Les Daft Punk",
  "Un juif",
  "Le braquage d'une banque de sperm",
  "Une bite",
  "Une prostituée",
  "Une éjac' précoce",
  "Voldemort",
  "Le Jo, Le David",
  "Ronaldo SIUUUUUU!",
  "Gollum",
  "Un poisson hors de l'eau",
  "Un mime",

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