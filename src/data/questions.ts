// Load custom questions from localStorage
const loadCustomQuestions = () => {
  const saved = localStorage.getItem('customQuestions');
  return saved ? JSON.parse(saved) : [];
};

// Save custom questions to localStorage
const saveCustomQuestions = (questions: string[]) => {
  localStorage.setItem('customQuestions', JSON.stringify(questions));
};

// Fonction pour sauvegarder les questions par défaut désactivées
export const saveDisabledDefaultQuestions = (disabledQuestions: number[]) => {
  localStorage.setItem('disabledDefaultQuestions', JSON.stringify(disabledQuestions));
};

// Fonction pour charger les questions par défaut désactivées
export const getDisabledDefaultQuestions = (): number[] => {
  const saved = localStorage.getItem('disabledDefaultQuestions');
  return saved ? JSON.parse(saved) : [];
};

// Fonction pour activer/désactiver une question par défaut
export const toggleDefaultQuestion = (index: number) => {
  const disabledQuestions = getDisabledDefaultQuestions();
  const isDisabled = disabledQuestions.includes(index);
  
  if (isDisabled) {
    saveDisabledDefaultQuestions(disabledQuestions.filter(i => i !== index));
  } else {
    saveDisabledDefaultQuestions([...disabledQuestions, index]);
  }
  
  return !isDisabled;
};

export const getCustomQuestions = () => loadCustomQuestions();

export const addCustomQuestion = (question: string) => {
  const customQuestions = loadCustomQuestions();
  customQuestions.push(question);
  saveCustomQuestions(customQuestions);
  return customQuestions;
};

export const removeCustomQuestion = (index: number) => {
  const customQuestions = loadCustomQuestions();
  customQuestions.splice(index, 1);
  saveCustomQuestions(customQuestions);
  return customQuestions;
};

// Fonction pour récupérer toutes les questions actives
export const getAllQuestions = () => {
  const disabledQuestions = getDisabledDefaultQuestions();
  const activeDefaultQuestions = defaultQuestions.filter((_, index) => !disabledQuestions.includes(index));
  return [...activeDefaultQuestions, ...loadCustomQuestions()];
};

export const defaultQuestions = [
  // Questions osées et fun
  "Amateur d'huîtres ou pas ? Les non-initiés trinquent ! 🦪",
  "Balance ton spot le plus fou pour un câlin coquin ! Le plus sage passe son tour et boit 🔥",
  "Sécher les cours, ça vous parle ? Les bons élèves, à vous de boire ! 📚",
  "Mentir à ses parents, qui ose ? Le plus récent trinque ! 🤥",
  "Petits voleurs, manifestez-vous ! Un shot pour les plus sages 🕵️",
  "Câlin time ! Le dernier à en avoir reçu un se rince le gosier 🤗",
  "Ton CV est-il vraiment honnête ? Les menteurs se dénoncent ou boivent ! 📄",
  "Pipi dans la piscine, avouez tout ! Double dose pour les coupables 🏊",
  "Premier baiser en soirée ? Les timides n'ont plus qu'à boire ! 💋",
  "Battle de selfies ! Vote général, le perdant trinque 🤳",
  "Raconte ta dernière interaction avec la police ! Pas d'histoire = tu bois 👮",
  "Faux bourrés, on vous a grillés ! À boire pour les comédiens 🥴",
  "@joueur désigne le plus gros mytho ! Sanction immédiate 🤥",
  "Petits chapardeurs, c'est l'heure des aveux ! Prix du plus gros butin : double dose 🕵️",
  "Jamais de nude ? Trinquez, les pudiques ! 📱",
  "Compare ton tableau de chasse ! Le moins expérimenté boit 💔",
  "Plan à trois ? Les plus sages passent à la caisse ! 😇",
  "Raconte ta rupture la plus mémorable ou bois ! 💔",
  "@joueur balance ta pire honte en soirée ! Pas d'histoire = double dose 😱",
  "Sex tape ou pas ? Buvez en silence si c'est oui ! 📹",
  "@joueur, balance ! Qui ici pourrait finir dans ton lit ? Vous buvez à deux 😏",
  "Crush sur le/la partenaire d'un pote ? Les innocents boivent ! 👀",
  "Balance ta plus grosse bourde au taf ! Sinon triple dose 💼",
  "@joueur raconte ton pire rencard ! Si c'est bien nul, tout le monde boit sauf toi 🤦",
  "Stalkers d'ex, on vous voit ! Assumez ou buvez 🕵️",
  "À vos DMs ! Les plus hot ou ça trinque 📱",
  "@joueur, ton plan cul le plus catastrophique ? Si c'est épique, tournée générale ! 😅",
  "Experts du ghost, manifestez-vous ! Les gentils trinquent 👻",
  "Ta pire soirée alcoolisée ? La meilleure histoire fait boire les autres ! 🍺",
  "Faux orgasmes ? On boit pour oublier ! 😮",
  "@joueur balance un secret ou double dose ! 🤫",
  "Jamais de coup d'un soir ? Buvez, les romantiques ! 🌙",
  "Balance ton achat le plus stupide ! Le groupe vote le pire, le gagnant trinque ! 💸",
  "@joueur, ton râteau le plus mémorable ? Si on rigole, tout le monde boit ! 😭",

  // Défis
  "@joueur, lèche le coude de @joueur ou trinque ! 👅",
  "@joueur, massage express pour @joueur ou ça picole ! 💆",
  "@joueur, imite @joueur pendant 30 secondes ou bois ! 🎭",
  "@joueur et @joueur, slow sensuel ou shot sensuel ! 💃",
  "@joueur, déclare ta flamme en vers à @joueur ou bois ! 📝",
  "@joueur, TikTok challenge choisi par @joueur ! 🕺",
  "@joueur enfile les shoes de @joueur pour 10 min ! 👠",
  "@joueur, improvise un discours sur le sujet choisi par @joueur ! 🎤",
  "@joueur, fais deviner un mot à @joueur sans parler ! 🤐",
  "@joueur, dessine @joueur en 60 secondes ! 🎨",

  // Questions classiques
  "Le benjamin du groupe distribue les shots ! 👶",
  "Le vétéran de la bande fait sa loi ! 👴",
  "Team piercing, on s'hydrate ! 💎",
  "Les tatoués, c'est votre tour ! 🎨",
  "En couple ? Le plus récent fait boire ! ❤️",
  "Célibataires de longue date, votre heure de gloire ! 💔",
  "Dernier voyage ? Le plus casanier boit ! ✈️",
  "Battle d'followers ! Le plus populaire décide 📱",
  "Les grands gabarits font la loi ! 📏",
  "Les plus petits trinquent ! 📏",

  // Dilemmes avec vote
  "VOTEZ : Plus jamais d'alcool ou plus jamais de chocolat ? Minorité boit ! 🍫",
  "VOTEZ : Voir vos parents en pleine action ou être surpris ? Minorité trinque ! 😱",
  "VOTEZ : Mains en biscottes ou bras frontal ? Les perdants boivent ! 🥖",
  "VOTEZ : Paradis à la mer ou à la montagne ? Minorité boit ! 🏠",
  "VOTEZ : Invisibilité ou vol ? Les terriens boivent ! 🦸",
  "VOTEZ : Sans musique ou sans films ? Les perdants trinquent ! 🎵",
  "VOTEZ : Lire les pensées ou voir le futur ? Minorité boit ! 🔮",
  "VOTEZ : Riche et seul ou pauvre et entouré ? Les matérialistes boivent ! 💰",
  "VOTEZ : Honnêteté totale ou franchise brutale ? Minorité trinque ! 🤥",
  "VOTEZ : Perdre ton tel ou ton portefeuille ? Les perdants paient en shots ! 📱",

  // Jamais je n'ai jamais
  "Camping sauvage ? Les citadins boivent ! 🏕️",
  "Saut en parachute ? Les froussards trinquent ! 🪂",
  "Karaoké ? Les timides passent à la caisse ! 🎤",
  "Surf ? Les terriens boivent ! 🏄",
  "Plongée sous-marine ? Les poissons rouges trinquent ! 🤿",
  "Escalade ? Les pantouflards boivent ! 🧗",
  "Ski ? Les frileux passent à la caisse ! ⛷️",
  "Randonnée ? Les sédentaires trinquent ! 🥾",

  // Questions soirée
  "Raconte ta dernière cuite mémorable ou bois ! 🍺",
  "Vomi en soirée ? Fais boire les estomacs solides ! 🤮",
  "Danse sur table ? Les plus sages trinquent ! 💃",
  "Perdu tes clés en soirée ? Un shot par trousseau égaré ! 🔑",
  "Blackout total ? Fais trinquer les mémoires d'éléphant ! 😵",
  "Nuit à la belle étoile post-soirée ? Les douillets boivent ! 🛏️",
  "Soirée déguisée ? Les plus créatifs font boire ! 🎭",
  "Soirée qui a mal tourné ? Partagez ou buvez ! 😅",

  // Questions d'enfance
  "Première dent perdue ? Le plus tardif boit ! 🦷",
  "Petite fugue ? Les rebelles distribuent ! 🏃",
  "Père Noël ? Les plus naïfs trinquent ! 🎅",
  "Os cassés ? Un shot par fracture ! 🦴",
  "Premier animal ? Le plus ancien propriétaire décide ! 🐶",
  "Délégué de classe ? Les leaders font boire ! 📚",
  "Bac en poche ? Le plus récent distribue ! 🎓",
  "Redoublants, c'est votre tour ! 📝",

  // Questions vie quotidienne
  "Courses à faire ? Les frigos vides boivent ! 🛒",
  "Uber Eats cette semaine ? Les cuisiniers trinquent ! 🍔",
  "Sport récent ? Les plus actifs distribuent ! 🏃",
  "Régime en cours ? Hydratez-vous à l'alcool ! 🥗",
  "Netflix aujourd'hui ? Les productifs boivent ! 📺",
  "Achat compulsif ? Les économes trinquent ! 💳",
  "Ménage fait ? Les bordéliques passent à la caisse ! 🧹",
  "Tel cassé ? Un shot par écran fissuré ! 📱"
];