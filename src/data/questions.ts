const loadCustomQuestions = () => {
  const saved = localStorage.getItem('customQuestions');
  if (saved) {
    return JSON.parse(saved);
  }
  // Add default custom question if no saved questions exist
  const defaultCustomQuestions = [
    "@joueur as-tu assez confiance en @joueur pour lui donner le 06 de ta mère ? :)"
  ];
  localStorage.setItem('customQuestions', JSON.stringify(defaultCustomQuestions));
  return defaultCustomQuestions;
};

const saveCustomQuestions = (questions: string[]) => {
  localStorage.setItem('customQuestions', JSON.stringify(questions));
};

export const saveDisabledDefaultQuestions = (disabledQuestions: number[]) => {
  localStorage.setItem('disabledDefaultQuestions', JSON.stringify(disabledQuestions));
};

export const getDisabledDefaultQuestions = (): number[] => {
  const saved = localStorage.getItem('disabledDefaultQuestions');
  return saved ? JSON.parse(saved) : [];
};

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
  "Qui ici a déjà fantasmé sur un prof ? Les coupables trinquent ! 📚",
  "Dormir chez l'ex après une rupture ? Les honnêtes partagent ou boivent ! 💔",
  "Qui a déjà espionné le téléphone de quelqu'un ? À boire, les détectives privés ! 🕵️",
  "Échouer un date Tinder catastrophique ? Partage ou trinque ! 😅",
  "Aimer deux personnes en même temps, ça arrive ? Les cœurs en conflit boivent ! ❤️",
  "Régler une dispute par SMS en soirée ? Les plus sages trinquent ! 📲",
  "Déjà embrassé quelqu’un sans même connaître son prénom ? Les courageux trinquent ! 😘",
  "Déjà volé de la nourriture à un coloc ? Les coupables trinquent ou partagent leurs anecdotes ! 🍕",
  "Fait semblant d’aimer une série pour quelqu’un ? Un shot pour les faux fans ! 📺",
  "Déjà changé de prénom pour draguer ? Les créatifs trinquent ! ✨",
  "Qui ici a déjà fouillé dans les affaires d’un ex ? Les curieux trinquent ! 🔍",
  "Déjà envoyé un DM à une célébrité ? Les rêveurs boivent ! 🌟",
  "Qui a déjà fait semblant d’être au téléphone pour éviter quelqu’un ? Les antisociaux trinquent ! 📞",
  "Jamais pris un Uber trop cher juste par flemme ? Les économes distribuent ! 🚖",
  "Déjà oublié un anniversaire important ? Les distraits boivent ! 🎂",
  "Premier crush en primaire ? Les plus précoces trinquent ! ❤️",
  "Qui ici a déjà participé à un concours ridicule ? Les compétitifs boivent ! 🏆",
  "Déjà menti pour éviter un rendez-vous ? Les pros de l’excuse trinquent ! 🙅",
  "Qui a déjà pleuré en public ? Les émotifs distribuent ! 😭",
  "Déjà menti sur son âge ? Les imposteurs trinquent ! 🎭",
  "Qui a déjà improvisé une excuse pour partir d’un date ? Les fuyards boivent ! 💔",
  "Déjà fait semblant de connaître une personne rencontrée en soirée ? Les diplomates trinquent ! 🥂",
  "Qui a déjà chanté sous la douche en pensant être une star ? Les divas boivent ! 🎤",
  "Déjà oublié où tu avais garé ta voiture ? Les étourdis trinquent ! 🚗",
  "Qui a déjà posté une photo qu’il/elle a supprimée aussitôt ? Les perfectionnistes boivent ! 📷",
  "Déjà quitté un film au cinéma parce qu’il était trop nul ? Les impatients trinquent ! 🎥",
  "Qui a déjà essayé d’impressionner quelqu’un avec une histoire exagérée ? Les mythos boivent ! 🤥",
  "Déjà eu une discussion gênante avec un serveur/serveuse ? Les maladroits trinquent ! 🍴",
  "Qui a déjà gardé un secret trop longtemps et craqué ? Les coupables boivent ! 🤐",
  "Déjà passé une journée entière en pyjama ? Les casaniers distribuent ! 🛌",
  "Qui ici a déjà envoyé un message à la mauvaise personne ? Les maladroits trinquent ! 📲",
  "Déjà perdu son téléphone en soirée ? Les imprudents boivent ! 📱",
  "Qui a déjà oublié un mot de passe important ? Les étourdis trinquent ! 🔑",
  "Déjà abandonné une série ou un livre en plein milieu ? Les impatients boivent ! 📚",
  "Qui a déjà prétendu aimer quelque chose juste pour faire plaisir ? Les menteurs gentils trinquent ! 😇",
  "Qui a déjà ghosté quelqu'un après un date ? Les lâches trinquent ! 👻",
"Déjà fait une folie pour impressionner quelqu’un ? Les fous boivent ! 💥",
"Qui ici a déjà flirté avec quelqu'un juste pour s'amuser ? Les manipulateurs trinquent ! 😏",
"Qui a déjà envoyé un message sexy à la mauvaise personne ? Les frileux trinquent ! 😳",
"Déjà fait un plan cul sans lendemain ? Les honnêtes boivent ! 🔥",
"Qui a déjà fait une promesse qu’il/elle n’avait pas l’intention de tenir ? Les menteurs trinquent ! 🤥",
"Qui ici a déjà eu un crush sur l’ex de son ami(e) ? Les coupables trinquent ! 💔",
"Déjà payé un faux rendez-vous juste pour ne pas avoir à y aller ? Les fuyards boivent ! 💸",
"Qui a déjà regardé un porno en cachette ? Les curieux trinquent ! 📹",
"Déjà flirté pour obtenir quelque chose ? Les stratèges trinquent ! 💋",
"Qui ici a déjà regretté un baiser ? Les timides trinquent ! 😬",
"Déjà demandé à quelqu’un de te mentir pour te protéger ? Les manipulateurs boivent ! 🤫",
"Qui a déjà couché avec quelqu’un pour se venger ? Les vengeurs trinquent ! 😈",
"Qui ici a déjà fait semblant d’aimer un film pour impressionner quelqu’un ? Les comédiens trinquent ! 🎬",
"Déjà envoyé un texto ambigu pour savoir si quelqu’un est intéressé ? Les audacieux boivent ! 📲",
"Qui a déjà flirter avec un ami(e) et regretté ? Les incertains trinquent ! 😕",
"Qui a déjà vu un ex et agit comme si de rien n’était ? Les faux amis boivent ! 💔",
"Qui ici a déjà quitté quelqu’un sans explication ? Les lâches trinquent ! 🚶‍♂️",
"Déjà fait une blague limite sur un sujet sensible ? Les imprudents trinquent ! 🤐",
"Qui a déjà eu une aventure d’un soir sans prévenir ? Les francs boivent ! 💋",
"Déjà provoqué une dispute pour éviter une conversation gênante ? Les stratèges trinquent ! 🗣️",
"Qui a déjà flirté avec un(e) inconnu(e) juste pour passer le temps ? Les opportunistes trinquent ! ⏳",
"Déjà dit à quelqu’un « je t’aime » sans le penser ? Les menteurs trinquent ! ❤️",
"Qui a déjà caché un secret embarrassant ? Les coupables boivent ! 🤐",
"Déjà envoyé une photo de soi-même dans une situation ridicule ? Les osés trinquent ! 📸",
"Qui ici a déjà eu une conversation sexy avec quelqu’un sans le connaître ? Les audacieux boivent ! 😏",
"Qui, entre @joueur et @joueur, a déjà flirté avec quelqu’un juste pour s’amuser ? À celui qui avoue de boire ! 😏",
"@joueur, tu as déjà envoyé un message gênant à @joueur par erreur ? À toi de trinquer si c’est vrai ! 📲",
"@joueur, avoue : as-tu déjà eu un crush sur @joueur en secret ? À toi de boire si c’est le cas ! 💔",
"@joueur, as-tu déjà menti à @joueur pour éviter un rendez-vous ? À toi de trinquer si c’est le cas ! 🙅‍♂️",
"@joueur, as-tu déjà flirté avec @joueur pour voir si l'autre allait réagir ? À toi de boire si c’est vrai ! 💋",
"@joueur, raconte la fois où tu as eu un rencard catastrophique avec @joueur, ou bois ! 💔",
"@joueur, qui est le plus romantique entre vous deux ? Si ce n'est pas toi, bois ! ❤️",
"@joueur, dis-nous ton pire mensonge que tu as dit à @joueur, ou bois ! 🤥",
"@joueur et @joueur, vous êtes-vous déjà retrouvés dans une situation gênante à cause d’un message ? Si c’est vrai, vous buvez ensemble ! 😅",
"@joueur, qui de vous deux a déjà été attiré(e) par @joueur ? À toi de trinquer si c’est le cas ! 😳",
"@joueur, as-tu déjà envoyé un message sexy à @joueur ? Si oui, vous buvez ensemble ! 🔥",
"@joueur, avoue que tu as déjà flirté avec @joueur juste pour faire réagir l'autre ! À toi de boire si c’est vrai ! 😏",
"@joueur, as-tu déjà fait semblant d’aimer un film juste pour impressionner @joueur ? À toi de boire si c’est le cas ! 🎬",
"@joueur, as-tu déjà eu un crush sur @joueur mais tu ne l’as jamais avoué ? À toi de trinquer si c’est vrai ! 💘",
"@joueur et @joueur, avez-vous déjà échangé des messages super embarrassants ? À vous de boire si c’est le cas ! 📱",
"@joueur, raconte ton pire plan cul avec @joueur, ou tout le monde trinque ! 😈",
"@joueur, as-tu déjà eu une attirance secrète pour @joueur et l’as-tu cachée ? À toi de boire si c’est vrai ! 😏",
"@joueur, avez-vous déjà eu un échange embarrassant sur vos ex ? Si oui, à vous de boire ! 🔥",
"@joueur, as-tu déjà eu un rencard avec @joueur et voulu fuir en plein milieu ? À toi de trinquer si c’est vrai ! 💔",
"@joueur et @joueur, qui a déjà eu un crush sur la même personne ? Si c’est le cas, vous buvez ensemble ! 💔",
"@joueur, qui de vous deux a déjà flirté avec un inconnu en soirée pour tester ses compétences ? À toi de boire si c’est vrai ! 😏",
"@joueur et @joueur, avez-vous déjà partagé un baiser gênant ? Si c’est vrai, vous buvez à deux ! 💋",
"@joueur, as-tu déjà ignoré un message de @joueur parce que tu ne savais pas quoi répondre ? À toi de trinquer si c’est vrai ! 📲",
"@joueur, as-tu déjà menti à @joueur pour éviter un dîner ennuyeux ? À toi de boire si c’est le cas ! 🍽️",
"@joueur, as-tu déjà flirté avec @joueur pour voir jusqu’où cela irait ? À toi de trinquer si c’est vrai ! 😏",
"@joueur et @joueur, avez-vous déjà eu un plan pour faire croire à tout le monde que vous étiez ensemble ? Si oui, vous buvez ensemble ! 😈",
"@joueur, avoue que tu as déjà dit un gros mensonge à @joueur pour te sortir d’une situation gênante ! À toi de boire ! 🤥",
"@joueur et @joueur, qui a déjà eu une attirance secrète l’un pour l’autre ? Si c’est le cas, vous buvez à deux ! 💘",




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
  "@joueur, mime un animal jusqu’à ce qu’on devine ou bois ! 🐒",
  "@joueur, fais une déclaration dramatique à ton verre avant de boire ! 🎭",
  "@joueur, recrée la scène d’amour la plus clichée avec @joueur ou bois ! ❤️",
  "@joueur, envoie un selfie ridicule au dernier contact de ton téléphone ou bois ! 🤳",
  "@joueur, crie « Le daron à @joueur je le tape normal ! » et fais une pose ou trinque ! 🌟",

  // Questions classiques
  "Le benjamin du groupe distribue les shots ! 👶",
  "Le vétéran de la bande fait sa loi et distribue 6 gorgées ! 👴",
  "Team piercing, on s'hydrate ! 💎",
  "Les tatoués, c'est votre tour ! 🎨",
  "En couple ? Le plus récent fait boire ! ❤️",
  "Célibataires de longue date, votre heure de gloire, montrez-nous votre descente ! 💔",
  "Dernier voyage ? Le plus casanier boit ! ✈️",
  "Battle d'followers ! Le plus populaire décide 📱",
  "Les grands gabarits font la loi et distribue une punition à qui ils veulent ! 📏",
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
  "VOTEZ : Plus jamais de sucre ou plus jamais de sel ? La minorité trinque ! 🍭",
  "VOTEZ : Gagner 1M€ mais vivre seul ou être pauvre mais entouré ? Minorité boit ! 💰",
  "VOTEZ : Toujours mal habillé ou jamais coiffé ? Les fashionistas boivent ! 👗",
  "VOTEZ : Vivre 100 ans riche mais ennuyeux ou 30 ans excitant et fauché ? Minorité trinque ! 🕰️",
  "VOTEZ : Être célèbre mais détesté ou inconnu et adoré ? Les perdants boivent ! 🌟",
  "VOTEZ : Téléportation ou voyage dans le temps ? La minorité trinque ! 🚀",
  "VOTEZ : Toujours boire tiède ou manger froid ? Les perdants trinquent ! 🥤",
  "VOTEZ : Ne plus jamais faire de câlins ou ne plus jamais rire ? La minorité boit ! 🤗",
  "VOTEZ : Être surpris dans un moment gênant ou voir un ami dans une situation pire ? Minorité trinque ! 😱",
  "VOTEZ : Manger un plat d'excréments ou boire un litre d'urine ? Les estomacs fragiles trinquent ! 💩",
"VOTEZ : Passer 24h avec ta mère en soirée déguisée ou avec ton boss en pyjama ? Les timides boivent ! 🛏️",
"VOTEZ : Être enfermé pendant un mois dans une pièce sombre ou dans une pièce pleine de serpents ? La minorité trinque ! 🐍",
"VOTEZ : Ne jamais pouvoir parler ou jamais pouvoir marcher ? Les plus mobiles boivent ! 🚶‍♂️",
"VOTEZ : Perdre toutes tes affaires à chaque déménagement ou avoir une colocataire extrêmement bruyante ? Les moins gênés trinquent ! 📦",
"VOTEZ : Manger un plat de vers vivants ou faire un saut en parachute sans savoir s’il y a un parachute ? Les plus prudents boivent ! 🪂",
"VOTEZ : Vivre dans un monde sans électricité ou dans un monde sans Internet ? Les geeks trinquent ! 🌐",
"VOTEZ : Avoir un mot embarrassant tatoué sur le front ou avoir une chanson ridicule jouée à chaque réveil ? Les moins dignes boivent ! 🎶",
"VOTEZ : Voir une vidéo gênante de toi sur Internet pendant 10 ans ou être photographié dans une situation humiliante ? Les innocents trinquent ! 📸",
"VOTEZ : Te faire filmer pendant une soirée gênante avec un inconnu ou vivre une situation embarrassante avec tes parents ? Les plus sensibles boivent ! 🎥",
"VOTEZ : Vivre 5 ans sans sortir de chez toi ou 5 ans sans téléphone ? Les sociables trinquent ! 📱",
"VOTEZ : Perdre tout ton argent ou perdre ton smartphone à jamais ? Les matérialistes boivent ! 💸",
"VOTEZ : Être victime d'une arnaque ou avoir un rencard catastrophique tous les mois ? Les romantiques trinquent ! 💔",
"VOTEZ : Ne plus jamais rire ou ne plus jamais avoir d’intimité ? Les plus détendus boivent ! 😂",
"VOTEZ : Toujours avoir un mot de travers en public ou toujours avoir une rumeur embarrassante qui te colle à la peau ? Les plus discrets trinquent ! 🗣️",
"VOTEZ : Passer 10h dans une pièce pleine de moustiques ou 10h à discuter avec un inconnu qui te parle sans cesse ? Les plus patients boivent ! 🦟",
"VOTEZ : Ne jamais pouvoir t’arrêter de chanter ou ne jamais pouvoir arrêter de danser en public ? Les timides trinquent ! 🎤",
"VOTEZ : Se faire tatouer un logo d’entreprise sur la cuisse ou te faire percer le nez en public ? Les moins gênés boivent ! 💉",
"VOTEZ : Manger un insecte géant en public ou avoir une dispute de 30 minutes avec ton ex devant tous tes amis ? Les plus audacieux trinquent ! 🦗",
"VOTEZ : Être obligé de te filmer en train de faire un faux rire pendant 1h ou raconter tes secrets les plus embarrassants à tout le monde ? Les moins timides boivent ! 😂",
"VOTEZ : Passer une nuit à l’hôtel avec une personne qui te déteste ou avec quelqu’un que tu détestes ? Les plus courageux trinquent ! 🏨",
"VOTEZ : Vivre dans un appartement avec une seule chaise ou dans un appartement avec 10 chaises mais toutes cassées ? Les confortables trinquent ! 🪑",
"VOTEZ : Ne plus jamais dormir ou dormir dans une pièce sans lumière pendant une semaine ? Les dormeurs boivent ! 🛏️",
"VOTEZ : Vivre un moment gênant tous les jours ou avoir une peur constante de te ridiculiser ? Les plus braves trinquent ! 🤦",
"VOTEZ : Ne plus jamais manger de chocolat ou ne plus jamais regarder de films ? Les cinéphiles trinquent ! 🍫",
"VOTEZ : Ne jamais pouvoir quitter ton pays ou ne jamais pouvoir revenir chez toi après être parti ? Les plus aventureux trinquent ! 🌍",


  // Jamais je n'ai jamais
  "Camping sauvage ? Les citadins boivent ! 🏕️",
  "Saut en parachute ? Les froussards trinquent ! 🪂",
  "Karaoké ? Les timides passent à la caisse ! 🎤",
  "Surf ? Les terriens boivent ! 🏄",
  "Plongée sous-marine ? Les poissons rouges trinquent ! 🤿",
  "Escalade ? Les pantouflards boivent ! 🧗",
  "Ski ? Les frileux passent à la caisse ! ⛷️",
  "Randonnée ? Les sédentaires trinquent ! 🥾",
  "Jamais je n’ai sauté d’une falaise dans l’eau ? Les frileux trinquent ! 🌊",
  "Jamais je n’ai mangé un insecte ? Les aventuriers font boire ! 🐛",
  "Jamais je n’ai fait du camping sauvage ? Les citadins boivent ! 🏕️",
  "Jamais je n’ai chanté en karaoké ? Les timides trinquent ! 🎤",
  "Jamais je n’ai skié ou surfé ? Les adeptes trinquent ! 🏂",
  "Jamais je n’ai dansé sous la pluie ? Les rêveurs trinquent ! 🌧️",
  "Jamais je n’ai dormi sur la plage ? Les aventuriers distribuent ! 🏖️",
  "Jamais je n’ai été arrêté par la police ? Les innocents trinquent ! 🚓",
  "Jamais je n’ai volé quelque chose dans un magasin ? Les honnêtes trinquent ! 🛍️",
  "Jamais je n’ai fait semblant d’être malade pour éviter quelque chose ? Les faux malades trinquent ! 🤒",
  "Jamais je n’ai laissé quelqu’un en « vu » intentionnellement ? Les ignorants trinquent ! 📱",
  "Jamais je n’ai regretté un achat immédiatement après ? Les shopaholics trinquent ! 💳",
  "Jamais je n’ai changé de trottoir pour éviter quelqu’un ? Les timides boivent ! 🚶",
  "Jamais je n’ai pleuré devant un film triste ? Les sensibles trinquent ! 🎬",
  "Jamais je n’ai refusé un shot parce que j’avais peur de vomir ? Les prudents trinquent ! 🍹",
  "Jamais je n’ai envoyé un message en étant ivre que je regrettais le lendemain ? Les coupables trinquent ! 📲",

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
"Première bêtise ? Le plus jeune trinque ! 👶",
"Premier amour à l'école ? Le plus timide boit ! 💘",
"Premier câlin avec un(e) ami(e) ? Le dernier à en avoir eu boit ! 🤗",
"Premier film au cinéma ? Les cinéphiles boivent ! 🎬",
"Premier bisou ? Les plus novices trinquent ! 💋",
"Premier téléphone portable ? Le plus vieux modèle fait boire ! 📱",
"Premier anniversaire mémorable ? Les plus jeunes trinquent ! 🎂",
"Premier vrai chagrin ? Le plus récent pleure à nouveau ! 😢",
"Première peur nocturne ? Le dernier à en avoir eu boit ! 😱",
"Premier projet scolaire ? Le moins organisé distribue ! 📚",
"Premier défi osé ? Les plus sages trinquent ! 🔥",
"Premier mauvais bulletin ? Le plus récent doit payer ! 📉",
"Premier déguisement pour Halloween ? Le plus créatif fait boire ! 🎃",
"Premier sport pratiqué ? Les plus fragiles trinquent ! ⚽",
"Premier baiser volé ? Le plus gêné boit ! 💋",
"Première journée d’école ? Les plus récents à y retourner trinquent ! 🏫",
"Premier jeu vidéo ? Les plus jeunes joueurs boivent ! 🎮",
"Premier animal de compagnie ? Le plus jeune propriétaire décide ! 🐱",
"Premier secret gardé ? Les bavards trinquent ! 🤫",
"Premier bêtisier avec des amis ? Les plus timides trinquent ! 😜",
"Premier faux-semblant ? Ceux qui ne l’ont pas fait trinquent ! 🤥",
"Premier cadeau mémorable ? Les plus récents à en recevoir trinquent ! 🎁",
"Premier film d’horreur ? Les moins courageux trinquent ! 👻",
"Première fête d’anniversaire d’un ami ? Les moins sociaux trinquent ! 🎉",
"Première claque reçue ? Les derniers à avoir été punis boivent ! 👋",
"Premier gros mensonge ? Les plus honnêtes trinquent ! 🤭",


  // Questions vie quotidienne
  "Courses à faire ? Les frigos vides boivent ! 🛒",
  "Uber Eats cette semaine ? Les cuisiniers trinquent ! 🍔",
  "Sport récent ? Les plus actifs distribuent ! 🏃",
  "Régime en cours ? Hydratez-vous à l'alcool ! 🥗",
  "Netflix aujourd'hui ? Les productifs boivent ! 📺",
  "Achat compulsif ? Les économes trinquent ! 💳",
  "Ménage fait ? Les bordéliques passent à la caisse ! 🧹",
  "Tel cassé ? Un shot par écran fissuré ! 📱",

  // Pour Combien 

  "Pour combien d'euros minimum tu vendrais ton portable ? 📱",
"À quel prix minimum tu accepterais de changer ta place dans le canapé avec @joueur ? 🛋️",
"Combien de pizzas tu accepterais de manger avant de te dire « stop » ? 🍕",
"Pour combien d'euros tu irais faire un saut en parachute ? 🪂",
"Tu préfères avoir une journée entière sans internet ou pour 100€ de plus ? 💻",
"Quel est le prix minimum pour que tu dises à tout le monde que tu as menti sur ta bio Tinder ? 😏",
"Pour combien d'euros tu irais à un rendez-vous galant avec @joueur, même si tu n'en avais pas envie ? 💸",
"Combien d’argent il te faudrait pour t’empêcher de parler pendant une heure complète ? 🤐",
"Pour combien d’euros tu accepterais de porter une perruque ridicule toute une journée ? 💇‍♂️",
"Combien d'euros minimum tu accepterais de vivre un mois sans télé ? 📺",
"Pour combien de cash tu irais faire du bénévolat dans une école pendant 2 heures ? 📚",
"Combien de bouteilles d’eau tu boirais pour 10€ de plus ? 💧",
"Tu accepterais de te couper les cheveux toi-même pour 50€ ? ✂️",
"Quel est le prix minimum pour que tu fasses un karaoké en public devant tout le monde ? 🎤",
"Combien de fois tu pourrais répéter un mensonge gênant pour 100€ ? 🤥",
"Pour combien d’euros tu irais faire du shopping en portant des habits démodés toute la journée ? 🛍️",
"À quel prix minimum tu serais prêt à crier devant tout le monde que tu as raté un examen ? 📚",
"Tu préfères te lever à 5h du matin pour une course ou recevoir 200€ en compensation ? 🏃",
"Combien de shots tu prendrais pour 50€ là maintenant ? 🍹",
"Combien de fois tu pourrais regarder une série que tu détestes pour 200€ ? 📺",
"Pour combien d’euros tu accepterais de marcher en pyjama en public pendant une heure ? 🛌",
"Combien de minutes tu pourrais rester dans une pièce avec un clown pour 100€ ? 🤡",
"Combien de fois tu pourrais répéter une blague nulle avant de craquer, pour 50€ ? 😂",
"Combien de fois tu pourrais écouter une chanson que tu détestes avant de craquer, pour 30€ ? 🎶",
"Tu accepterais de marcher pieds nus dans la rue pendant une heure pour 20€ ? 👣",
"Pour combien de illets-bi tu irais dire à @joueur qu’il/elle a le plus mauvais goût de mode ? 👗",
"Pour combien d’euros tu mangerais un plat préparé à base de ton propre vomi ? 🤢",
"Pour combien d’euros tu coucherais avec quelqu’un que tu trouves absolument dégoûtant ? 🤮",
"Pour combien d’euros tu te raserais la tête complètement, sans retour possible ? 💇‍♂️",
"Pour combien d’euros tu quitterais ton boulot ici et tout recommencer dans un pays où tu ne parles pas la langue ? 🌍",
"Pour combien d’euros tu accepterais de changer ton look radicalement pour toujours ? 💇‍♀️",
"Pour combien de billets tu t’installerais à l'autre bout du monde et n’entrerais plus en contact avec ta famille pendant un an ? 🌏",
"Pour combien tu irais faire un tatouage que tu regretterais instantanément ? 💉",
"Pour quel montant tu quitterais ton/ta partenaire immédiatement et ne lui parlerais plus jamais ? 💔",
"Pour combien d’euros tu te ferais tatouer le nom de ton ex en grand sur le bras ? 🖋️",
"Pour quel montant tu arrêterais de parler à tes amis pendant un mois ? 🙊",
"Pour combien tu accepterais de manger un insecte vivant devant tout le monde ? 🦗",
"Combien d’argent il te faudrait pour faire un saut à l’élastique avec une peur intense des hauteurs ? 🪂",
"Pour combien tu irais te promener dans la rue en sous-vêtements pendant 30 minutes ? 👙",
"Pour combien tu arrêterais d’utiliser ton téléphone pendant une semaine entière ? 📱",
"Pour combien tu t’installerais dans un endroit où tu n’as absolument rien et recommencerais ta vie à zéro ? 🏝️",
"Pour combien d’euros tu irais dîner avec quelqu’un que tu détestes sincèrement ? 🍽️",
"Pour combien tu irais participer à une soirée déguisée ultra gênante ? 🤡",
"Pour combien tu accepterais de publier un message embarrassant sur ton profil pendant une journée entière ? 📲",
"Pour combien tu quitterais ton groupe d’amis et t’installerais dans une ville où tu ne connais personne ? 🚶",
"Pour combien d’euros tu accepterais d’aller à un rendez-vous avec quelqu’un que tu n’as jamais vu et qui te déplaît totalement ? 🤢",
"Pour combien d’euros tu accepterais de donner ta voiture à une personne inconnue pour une semaine ? 🚗",
"Pour quel montant tu irais dans un spa de luxe pendant une journée entière sans pouvoir t’arrêter de parler de tes pires défauts ? 🧖‍♀️",
"Combien de billets tu prendrais pour sortir en pyjama en public pendant 3 heures ? 🛋️",
"Pour combien d’euros tu quitterais immédiatement ton appartement et vivrais à la rue pendant une nuit ? 🏚️",
"Pour quel prix tu dirais à tes parents qu’ils ne t’ont jamais appris quoi que ce soit d’utile ? 🙉",
"Pour combien tu accepterais de dire à ton boss qu’il/elle te déplaît complètement, et que tu veux démissionner ? 💼",
"Pour combien d’euros tu mangerais un plat préparé à base de tes excréments ? 💩",
"Pour combien d’euros tu coucherais avec un membre de ta famille proche (cousin, cousine) sous couvert d’anonymat ? 🤢",
"Pour combien d’euros tu irais t’installer dans un bidonville pendant un mois sans aide ? 🏚️",
"Pour quel prix tu couperais toute communication avec ta famille pendant un an ? 📞",
"Pour combien tu ferais un saut à l’élastique au-dessus d’un volcan en activité ? 🪂🔥",
"Pour combien tu accepterais de dire à tout le groupe que tu as volé quelque chose récemment ? 🤑",
"Pour combien tu irais te faire tatouer un portrait géant de ton ex sur le ventre ? 🖋️",
"Pour combien tu abandonnerais ta vie actuelle, ton boulot et tes amis pour partir vivre dans une forêt pendant six mois ? 🌳",
"Pour quel montant tu quitterais ton partenaire actuel sur-le-champ, sans explication, pour ne jamais revenir ? 💔",
"Pour combien d'euros tu t’engagerais à ne plus jamais utiliser Internet pendant 3 mois ? 🌐",
"Pour combien tu irais passer une nuit dans un hôtel où une personne malade a dormi juste avant toi ? 🏨🤧",
"Pour combien d’euros tu accepterais de t'installer dans une maison hantée pendant une semaine sans protection ? 👻",
"Pour combien tu irais faire un live sur tes réseaux sociaux où tu fais des choses embarrassantes comme chanter des chansons ridicules ou danser sur une chanson nulle ? 🎤",
"Pour quel prix tu couperais tous les liens avec tes amis et ta famille pendant 6 mois ? 🚶‍♀️",
"Pour combien tu accepterais de dire à un inconnu dans la rue tous tes pires secrets ? 🕵️",
"Pour combien tu irais dans un club nudiste pendant une soirée entière sans vêtements ? 🏖️",
"Pour combien tu irais te filmer en train de manger un insecte géant vivant en public ? 🦗",
"Pour combien tu renoncerais à ta réputation et tu publierais une vidéo où tu te ridiculises à 100% ? 🎥",
"Pour combien d’euros tu irais dans un pays où tu ne parles pas la langue et tu y passes un mois sans aucune aide ? 🌍",
"Pour combien tu te ferais filmer pendant une séance de cryothérapie pendant une heure, même si tu détestes ça ? ❄️",
"Pour combien tu accepterais de passer 24h enfermé dans une pièce remplie de serpents ? 🐍",
"Pour quel prix tu participerais à un concours de honte et devrais faire une action ultra embarrassante devant un groupe ? 🎤",
"Pour combien tu accepterais de te filmer pendant une scène de drague ultra gênante avec une personne totalement inconnue ? 📱",
"Pour combien tu accepterais de faire une séance de méditation en plein milieu d'une rue passante, torse nu ? 🧘",
"Pour combien tu irais faire une blague particulièrement humiliante à @joueur en public, sachant qu’il/elle pourrait se fâcher ? 🤭",
"Pour combien tu accepterais de perdre 5 ans de ta vie dans une maison totalement isolée, sans technologie et sans communication ? 🏡",



"Les surnoms que tu peux donner à ta b***, celui qui répète ou ne trouve pas boit 🍆",
"Un mot en 'ouille', celui qui ne trouve pas ou répète boit (je commence : Couille !) 🥚",
"Les insultes inventées qui font rire, celui qui ne trouve pas ou répète boit 🤪",
"Les trucs qu'on ne voudrait pas que nos parents trouvent sous notre lit, celui qui répète ou ne trouve pas boit 🙈",
"Les sons qu'on peut faire avec la bouche, celui qui ne trouve pas ou répète boit (paf, prout...) 🥴",
"Les excuses bidons pour ne pas aller au sport, celui qui ne trouve pas ou répète boit 🏋️‍♂️",
"Les pires phrases de drague entendues, celui qui ne trouve pas ou répète boit 💘",
"Les objets improbables qu’on pourrait utiliser pour ouvrir une bière, celui qui répète ou ne trouve pas boit 🍺",
"Les trucs qu'on pourrait crier en pleine rue pour gêner les gens autour, celui qui répète ou ne trouve pas boit 🤷‍♂️",
"Les noms d’animaux qu’on donnerait à un ex toxique, celui qui répète ou ne trouve pas boit 🐍",
"Les pires costumes de soirée qu’on peut imaginer, celui qui répète ou ne trouve pas boit 🎭",
"Les noms de cocktails inventés complètement WTF, celui qui répète ou ne trouve pas boit 🍹",
"Les choses qu'on pourrait dire à son boss pour se faire virer direct, celui qui répète ou ne trouve pas boit 💼",
"Les pires trucs qu’un invité pourrait ramener à une soirée, celui qui répète ou ne trouve pas boit 🎁",
"Les pires secrets qu’on pourrait avouer après trois verres, celui qui répète ou ne trouve pas boit 🤐",
"Les choses qu'on pourrait écrire sur Tinder pour être sûr de ne jamais matcher, celui qui répète ou ne trouve pas boit 📱",
"Les lieux où tu ne voudrais jamais être surpris tout nu, celui qui répète ou ne trouve pas boit 😳",
"Les pires surnoms qu'on pourrait donner à ses amis, celui qui répète ou ne trouve pas boit 🐒",
"Les pires idées pour un tatouage qu’on regretterait le lendemain, celui qui répète ou ne trouve pas boit 🎨",
"Les excuses pour ne pas payer un verre à quelqu’un, celui qui répète ou ne trouve pas boit 💸",
"Les sons d’animaux qu’on pourrait imiter en soirée, celui qui répète ou ne trouve pas boit 🐄",
"Les phrases qu’on pourrait sortir en plein rêve bizarre, celui qui répète ou ne trouve pas boit 🛌",
"Les prénoms qu’on donnerait à un poisson rouge en pleine crise existentielle, celui qui répète ou ne trouve pas boit 🐟",



"Cul sec pour tout le monde ! 🍻",
"Cul sec pour tout le monde sauf @joueur. 😏",
"Moi je dis : Petit shot ? 😊",
"Le dernier qui se lève boit autant de gorgées qu’il y a de joueurs autour de la table. 🍹",
"@joueur, t’as pas un peu soif ? Tu finirais pas ton verre ? 🍺",
"Si ton verre est à plus de la moitié, bois assez pour qu’il ne le soit plus. On compte sur toi ! ⬇️",
"Si ton verre est à moins de la moitié, vide-le, on va pas t’attendre ! 😏",
"@joueur et @joueur : Celui ou celle d’entre vous qui a le verre le plus rempli le termine. Que le/la meilleur(e) gagne ! ⚔️",
"Allez hop, tout le monde boit ! 🎉",
"Le premier qui fini son verre à partir de maintenant distribue un cul sec à qui il veut ! 🥂",
"Bon, @joueur, distribue 5 gorgées juste parce que t’es trop swag. 😎",
"Les couples autour de la table, trinquez et buvez un coup, vous êtes trop chiants avec vos étoiles dans les yeux ! 😍",
"Les couples distribuent autant de gorgées qu’ils ont d’années passées ensemble !💑",
"STOP ! PLUS PERSONNE BOUGE ! On éli un joueur parmis nous qui doit boire son verre. (désolé si t'as pas eu le temps de le diluer 💀)",
"MORT SUBITE : @joueur tu tape une gorgé dans le verre de chaque participant (déso)",
"@joueur et @joueur on échange les verres.",
"Tout le monde passe son verre à la personne à sa gauche. C'est kdo !",

"Demain tu touches 1Mrd d'€, qui est le seul joueur à qui tu donnes des talles ? 💶",
"Demain tu touches 1Mrd d'€, qui est le seul joueur à qui tu ne donnes pas de talles ? 💶",
"Les chauves, désolé pour vous, fallait avoir des ch'veux, bois autant de gorgées que de nombre de poil sur ton caillou (sois 10 quoi) 💀",




];