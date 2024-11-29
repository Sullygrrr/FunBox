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
  "Balance ton spot le plus fou pour un câlin coquin ! Le plus sage boit 🔥",
  "Sécher les cours, ça vous parle ? Les bons élèves, à vous de boire ! 📚",
  "Mentir à ses parents ? Ceux qui osent trinque ! 🤥",
  "Petits voleurs, manifestez-vous ! Un shot pour les moins sages 🕵️",
  "Câlin time ! Le dernier à en avoir reçu un se rince le gosier 🤗",
  "Ton CV est-il vraiment honnête ? Les menteurs se dénoncent et boivent ! 📄",
  "Pipi dans la piscine, avouez tout ! Double dose pour les coupables 🏊",
  "Ton premier baisé c'était en soirée ? Allez bois grands timide ! 💋",
  "Battle de selfies ! Vote général, le perdant trinque 🤳",
  "Raconte ta dernière interaction avec la police ! Pas d'histoire = tu bois 👮",
  "Faux bourrés, on vous a grillés ! À boire pour les comédiens 🥴",
  "@joueur désigne le plus gros mytho d'après toi (avec ou sans arguments) ! Sanction immédiate pour pinocchio🤥",
  "Petits chapardeurs, c'est l'heure des aveux ! Prix du plus gros butin : double dose pour le gros poisson 🕵️",
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
  "À vos DMs ! Les plus hot : ça trinque 📱",
  "@joueur, ton plan cul le plus catastrophique ? Si c'est épique, tournée générale ! 😅",
  "Experts du ghost, manifestez-vous ! Les gentils trinquent 👻",
  "Ta pire soirée alcoolisée ? La meilleure histoire fait boire les autres ! 🍺",
  "Faux orgasmes ? On boit pour oublier ! 😮",
  "@joueur balance un secret ou double dose ! 🤫",
  "Jamais de coup d'un soir ? Buvez, les romantiques ! 🌙",
  "Balance ton achat le plus stupide ! Le groupe vote le pire, le gagnant trinque ! 💸",
  "@joueur, ton râteau le plus mémorable ? Si on rigole, tout le monde boit ! 😭",
  "Qui ici a déjà fantasmé sur un prof ? Les coupables trinquent ! 📚",
  "Dormir chez l'ex après une rupture ? Les malhonnêtes boivent ! 💔",
  "Qui a déjà espionné le téléphone de quelqu'un ? À boire, les détectives privés ! 🕵️",
  "Échouer un date Tinder catastrophique ? Partage ou trinque ! 😅",
  "Aimer deux personnes en même temps, ça arrive ? Les cœurs en conflit boivent ! ❤️",
  "Régler une dispute par SMS en soirée ? GG, les autres boivent ! 📲",
  "Déjà embrassé quelqu’un sans même connaître son prénom ? Les courageux trinquent ! 😘",
  "Déjà volé de la nourriture à un coloc ? Les coupables trinquent ou partagent leurs anecdotes ! 🍕",
  "Fait semblant d’aimer une série pour quelqu’un ? Un shot pour les faux fans ! 📺",
  "Déjà changé de prénom pour draguer ? Les créatifs trinquent ! ✨",
  "Qui ici a déjà fouillé dans les affaires d’un ex ? Les curieux trinquent ! 🔍",
  "Déjà envoyé un DM à une célébrité ? Les rêveurs boivent ! 🌟",
  "Qui a déjà fait semblant d’être au téléphone pour éviter quelqu’un ? Les antisociaux trinquent ! 📞",
  "Jamais pris un Uber parceque c'est \"trop cher\" ? Les économes distribuent ! 🚖",
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
"Déjà simulé un faux rendez-vous juste pour ne pas sortir ? Les fuyards boivent ! 🏃‍♂️‍➡️",
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
"Qui, entre @joueur et @joueur, a déjà flirté avec quelqu’un juste pour s’amuser ? À celui qui n'avoue pas de boire ! 😏",
"@joueur, tu as déjà envoyé un message gênant à @joueur par erreur ? À toi de trinquer si c’est vrai ! 📲",
"@joueur, avoue : as-tu déjà révé de @joueur en secret ? À toi de boire si c’est le cas ! 💔",
"@joueur, as-tu déjà menti à @joueur pour éviter un rendez-vous ? À toi de trinquer si c’est le cas ! 🙅‍♂️",
"@joueur, raconte un faux rencard catastrophique que @joueur pourrait avoir vécu, si tout le monde est d'accord : il boit, sinon c'est toi ! 💔",
"@joueur et @joueur, qui est le plus romantique entre vous deux ? Si ce n'est pas toi, bois ! ❤️",
"@joueur, dis-nous ton pire mensonge que tu as dit à @joueur, ou bois ! 🤥",
"@joueur et @joueur, vous êtes-vous déjà retrouvés dans une situation gênante à cause d’un message ? Si c’est vrai, vous buvez ensemble ! 😅",
"@joueur, qui de vous deux a déjà été attiré(e) par @joueur ? À toi de trinquer si c’est le cas ! 😳",
"@joueur, as-tu déjà envoyé un message sexy à @joueur ? Si oui, vous buvez ensemble ! 🔥",
"@joueur, as-tu déjà fait semblant d'avoir vu un film juste pour impressionner @joueur ? À toi de boire si c’est le cas ! 🎬",
"@joueur et @joueur, avez-vous déjà échangé des messages super embarrassants sur quelqu'un ? À vous de boire si c’est le cas ! 📱",
"@joueur, raconte ton pire plan cul à @joueur, ou tout le monde trinque ! 😈",
"@joueur et @joueur, avez-vous déjà eu un échange embarrassant sur vos ex ? Si oui, à vous de boire ! 🔥",
"@joueur et @joueur, avez vous déjà eu un crush sur la même personne ? Si c’est le cas, vous buvez ensemble ! 💔",
"@joueur et @joueur, qui de vous deux a déjà flirté avec un inconnu en soirée pour tester ses compétences ? À toi de boire si c’est vrai ! 😏",
"@joueur tu connais tes goûts, un(e) 10/10 pour toi, c'est un(e) combien pour @joueur ! 💋",
"@joueur, as-tu déjà ignoré un message de @joueur parce que tu ne savais pas quoi répondre ? À toi de trinquer si c’est vrai ! 📲",
"@joueur et @joueur, avez-vous déjà eu un plan pour faire croire à tout le monde que vous étiez ensemble ? Si oui, vous buvez ensemble ! 😈",
"@joueur, avoue que tu as déjà dit un gros mensonge à @joueur pour te sortir d’une situation gênante ! À toi de boire ! 🤥",



  // Défis
  "@joueur, lèche le coude de @joueur ou trinque ! 👅",
  "@joueur, massage express pour @joueur ou ça picole ! 💆",
  "@joueur, imite @joueur pendant 30 secondes ou bois ! 🎭",
  "@joueur et @joueur, slow sensuel ou shot sensuel ! 💃",
  "@joueur, déclare ta flamme en vers à @joueur ou bois ! 📝",
  "@joueur enfile les chaussettes de @joueur pour 10 min sinon cul-sec ! 👠",
  "@joueur, improvise un discours sur le sujet choisi par @joueur ! 🎤",
  "@joueur, fais deviner un mot à @joueur sans parler ! 🤐",
  "@joueur, mime un animal jusqu’à ce qu’on devine ou bois ! 🐒",
  "@joueur, fais une déclaration dramatique à ton verre avant de le boire ! 🎭",
  "@joueur, recrée la scène d’amour la plus clichée avec @joueur ou bois ! ❤️",
  "@joueur, envoie un selfie ridicule au dernier contact de ton téléphone ou bois ! 🤳",
  "@joueur, crie « Le daron à @joueur je le tape normal ! » et fais une pose ou trinque ! 🌟",

  // Questions classiques
  "Le benjamin du groupe distribue 3 shots ! 👶",
  "Le vétéran de la bande fait sa loi et distribue 6 gorgées ! 👴",
  "Team piercing, on s'hydrate ! 💎",
  "Les tatoués, c'est votre tour ! 🎨",
  "En couple ? Le plus récent fait boire 5 gorgées ! ❤️",
  "Célibataires de longue date, c'est votre heure de gloire, montrez-nous votre descente ! 💔",
  "Dernier voyage ? Le plus casanier boit ! ✈️",
  "Battle d'followers ! Le plus populaire décide 📱",
  "Les grands gabarits font la loi et distribue une punition à qui ils veulent ! 📏",
  "Les plus petits trinquent ! 📏",

  // Dilemmes avec vote
  "VOTEZ : Plus jamais d'alcool ou plus jamais de chocolat ? Minorité boit ! 🍫",
  "VOTEZ : Voir vos parents en pleine action ou être surpris ? Minorité trinque ! 😱",
  "VOTEZ : Mains en biscottes ou bras frontal ? Les perdants boivent ! 🥖",
  "VOTEZ : Paradis à la mer ou à la montagne ? Minorité boit ! 🏠",
  "VOTEZ : Invisibilité ou vol ? 🦸",
  "VOTEZ : Sans musique ou sans films à vie ? Les perdants trinquent ! 🎵",
  "VOTEZ : Lire les pensées ou voir le futur ? Minorité boit ! 🔮",
  "VOTEZ : Riche et seul ou pauvre et entouré ? 💰",
  "VOTEZ : Perdre ton tel ou ton portefeuille ? 📱",
  "VOTEZ : Plus jamais de sucre ou plus jamais de sel ? La minorité trinque ! 🍭",
  "VOTEZ : Gagner 1M€ mais vivre seul ou être pauvre mais entouré ? Minorité boit ! 💰",
  "VOTEZ : Toujours mal habillé ou jamais coiffé ? 👗",
  "VOTEZ : Vivre 100 ans riche mais ennuyeux ou 30 ans excitant mais fauché ? Minorité trinque ! 🕰️",
  "VOTEZ : Être célèbre mais détesté ou inconnu et adoré ? Les perdants boivent ! 🌟",
  "VOTEZ : Téléportation ou voyage dans le temps ? La minorité trinque ! 🚀",
  "VOTEZ : Toujours boire tiède ou manger froid ? Les perdants trinquent ! 🥤",
  "VOTEZ : Ne plus jamais faire de câlins ou ne plus jamais rire ? La minorité boit ! 🤗",
  "VOTEZ : Être surpris dans un moment gênant ou voir un ami dans une situation pire ? Minorité trinque ! 😱",
  "VOTEZ : Manger un plat d'excréments ou boire un litre d'urine ? 💩",
"VOTEZ : Passer 24h avec ta mère en soirée déguisée ou avec ton boss en pyjama ? 🛏️",
"VOTEZ : Être enfermé pendant un mois dans une pièce sombre ou dans une pièce pleine de serpents ? La minorité trinque ! 🐍",
"VOTEZ : Ne jamais pouvoir parler ou jamais pouvoir marcher ? 🚶‍♂️",
"VOTEZ : Perdre toutes tes affaires à chaque déménagement ou avoir une colocataire extrêmement bruyante ? 📦",
"VOTEZ : Manger un plat de vers vivants ou faire un saut en parachute (mais genre vrmt extrême) ? 🪂",
"VOTEZ : Vivre dans un monde sans électricité ou dans un monde sans Internet ? 🌐",
"VOTEZ : Avoir un mot embarrassant tatoué sur le front ou avoir une chanson ridicule jouée à chaque réveil ? 🎶",
"VOTEZ : Voir une vidéo gênante de toi sur Internet pendant 10 ans ou être photographié dans toute les situations humiliantes avec les clichés sur un vieu site chelou ? 📸",
"VOTEZ : Te faire filmer pendant une soirée gênante avec un inconnu ou vivre une situation embarrassante avec tes parents ? 🎥",
"VOTEZ : Vivre 5 ans sans sortir de chez toi ou 5 ans sans téléphone ? Les sociables trinquent ! 📱",
"VOTEZ : Perdre tout ton argent actuellement sur ton compte ou plus jamais pouvoir avoir de téléphone ? 💸",
"VOTEZ : Être victime d'une arnaque ou avoir un rencard catastrophique tous les mois ? 💔",
"VOTEZ : Ne plus jamais rire ou ne plus jamais avoir d’intimité ? 😂",
"VOTEZ : Toujours avoir un mot de travers en public ou toujours avoir une rumeur embarrassante qui te colle à la peau ? 🗣️",
"VOTEZ : Passer 10h dans une pièce pleine de moustiques ou 10h à discuter avec un inconnu qui te parle sans cesse ? 🦟",
"VOTEZ : Ne jamais pouvoir t’arrêter de chanter ou ne jamais pouvoir arrêter de danser en public ? 🎤",
"VOTEZ : Se faire tatouer un logo d’entreprise sur la cuisse ou te faire percer le nez en public ? 💉",
"VOTEZ : Manger un insecte géant en public ou avoir une dispute de 30 minutes avec ton ex devant tous tes amis ? 🦗",
"VOTEZ : Être obligé de te filmer en train de faire un faux rire pendant 1h ou raconter tes secrets les plus embarrassants à tout ceux présents ici ? 😂",
"VOTEZ : Passer une nuit à l’hôtel avec une personne qui te déteste ou avec quelqu’un que tu détestes ? 🏨",
"VOTEZ : Vivre dans un appartement avec une seule chaise ou dans un appartement avec 15 chaises (tu peux pas les cacher, t'es juste le boug chelou du coin...) ? 🪑",
"VOTEZ : Ne plus jamais dormir ou dormir dans une pièce sans lumière pendant une semaine ? 🛏️",
"VOTEZ : Vivre un moment gênant tous les jours ou avoir une peur démesurée des nuanges ? 🤦",
"VOTEZ : Ne plus jamais manger de chocolat ou ne plus jamais regarder de films ? 🍫",
"VOTEZ : Ne jamais pouvoir quitter ton pays ou ne jamais pouvoir y revenir après en être parti ? 🌍",


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
  "@joueur, Raconte ta dernière cuite mémorable ou bois ! 🍺",
  "@joueur, Vomi en soirée ? Fais boire les estomacs solides ! 🤮",
  "@joueur, Danse sur table ? Les plus sages trinquent ! 💃",
  "@joueur, déjà perdu tes clés en soirée ? Un shot par trousseau égaré ! 🔑",
  "@joueur, Blackout total ? Fais trinquer les mémoires d'éléphant ! 😵",
  "Nuit à la belle étoile post-soirée (genre complètement khapta, pas par choix quoi) ? Tu bois si oui ! 🛏️",
  "Soirée déguisée ? Les plus créatifs font boire ! 🎭",
  "Soirée qui a mal tourné ? Partagez ou buvez ! 😅",

  // Questions d'enfance
  "Première dent perdue ? Le plus tardif boit ! 🦷",
  "Petite fugue ? Les rebelles distribuent ! 🏃",
  "Cru au Père Noël le plus tard ? Les plus naïfs trinquent ! 🎅",
  "Os cassés ? Un shot par fracture ! 🦴",
  "Premier animal ? Le plus ancien propriétaire décide ! 🐶",
  "Délégué de classe ? Les leaders font boire ! 📚",
  "Bac en poche ? Le plus récent distribue ! 🎓",
  "Redoublants, c'est votre tour ! 📝",
"Première GROSSE bêtise ? Le plus tôt trinque ! 👶",
"Premier amour à l'école ? Le plus tardif boit ! 💘",
"Premier câlin avec un(e) ami(e) ? Le dernier à en avoir eu boit ! 🤗",
"Premier film au cinéma ? Le cinéphile boit ! 🎬",
"Premier bisou ? Les plus tardifs trinquent ! 💋",
"Premier téléphone portable ? Le plus vieux modèle fait boire ! 📱",
"Premier vrai chagrin ? Le plus récent pleure à nouveau et noit son chagrin ! 😢",
"Première peur nocturne ? Le dernier à en avoir eu boit ! 😱",
"Premier projet scolaire ? Le plus nul boit ! 📚",
"Premier défi osé ? Les plus sages trinquent ! 🔥",
"Premier mauvais bulletin ? Le plus récent doit payer ! 📉",
"Premier baiser volé ? Le dernier boit ! 💋",
"Première journée d’école ? Les plus récents à y retourner trinquent ! 🏫",
"Premier jeu vidéo ? Les plus jeunes joueurs boivent ! 🎮",
"Premier animal de compagnie ? Le plus jeune propriétaire décide ! 🐱",
"Premier film d’horreur ? Les moins courageux trinquent ! 👻",
"Première fête d’anniversaire d’un ami ? Les moins sociaux trinquent ! 🎉",
"Première claque reçue ? Les derniers à avoir été punis boivent ! 👋",
"Premier gros mensonge ? Les plus honnêtes trinquent ! 🤭",


  // Questions vie quotidienne
  "Courses à faire ? Les frigos vides boivent ! 🛒",
  "Uber Eats cette semaine ? Les faux-cuisiniers trinquent ! 🍔",
  "Sport récent ? Les plus actifs distribuent ! 🏃",
  "Régime en cours ? Hydratez-vous à l'alcool ! 🥗",
  "Netflix aujourd'hui ? Les non productifs boivent ! 📺",
  "Achat compulsif ? Les économes font boire ! 💳",
  "Ménage fait ? Les bordéliques passent à la caisse ! 🧹",
  "Tel cassé ? Un shot par écran fissuré ! 📱",

  // Pour Combien 

  "Pour combien d'euros minimum tu vendrais ton portable ? 📱",
"@joueur, à quel prix minimum tu accepterais de changer ta place dans le canapé avec @joueur ? 🛋️",
"Combien de pizzas tu accepterais de manger avant de te dire « stop » ? 🍕",
"Pour combien d'euros tu irais faire un saut en parachute ? 🪂",
"@joueur, tu pourrais passer une journée entière sans internet pour 100 balles ? 💻",
"Pour combien d'euros tu irais à un rendez-vous galant avec @joueur, même si tu n'en avais pas envie ? 💸",
"Combien d’argent il te faudrait pour t’empêcher de parler pendant une journée complète ? 🤐",
"Pour combien d’euros tu accepterais de porter une perruque ridicule toute une journée (même au taff) ? 💇‍♂️",
"Combien d'euros minimum tu accepterais de vivre un mois sans télé (pas de chromecast, netflix, youtube, ...) ? 📺",
"Pour combien de cash tu irais faire pion dans une école pendant 2 semaines ? 📚",
"Combien de bouteilles d’eau tu boirais pour 10€ la maintenant ? 💧",
"Tu accepterais de te couper les cheveux toi-même pour 50€ ? ✂️",
"Quel est le prix minimum pour que tu chantes ultra fort une musique dans un restau chic devant tout le monde (sans tes potes pour te soutenir évidemment) ? 🎤",
"Tu préfères te lever à 5h du matin pour un show de ton artiste préféré ou recevoir 200€ en compensation ? 🏃",
"Combien de shots tu prendrais pour 50€ là maintenant ? 🍹",
"Combien de fois tu pourrais regarder une série que tu détestes pour 200€ ? 📺",
"Pour combien d’euros tu accepterais de marcher en pyjama en public pendant une heure ? 🛌",
"Combien de minutes tu pourrais rester dans une pièce avec un clown pour 100€ ? 🤡",
"Combien de fois tu pourrais répéter une blague nulle avant de craquer, pour 50€ ? 😂",
"Combien de fois tu pourrais écouter une chanson que tu détestes avant de craquer, pour 30€ ? 🎶",
"Tu accepterais de marcher pieds nus dans la rue pendant une heure pour 20€ ? 👣",
"Pour combien de illets-bi tu irais dire à un joueur ici qu'il a des gouts vestimentaires de merde ? 👗",
"Pour combien d’euros tu mangerais un plat préparé à base de ton propre vomi ? 🤢",
"Pour combien d’euros tu coucherais avec quelqu’un que tu trouves absolument dégoûtant ? 🤮",
"Pour combien d’euros tu te raserais la tête complètement, sans retour possible ? 💇‍♂️",
"Pour combien d’euros tu quitterais ton boulot ici et tout recommencer dans un pays où tu ne parles pas la langue ? 🌍",
"Pour combien d’euros tu accepterais de changer ton look radicalement pour toujours ? 💇‍♀️",
"Pour combien de billets tu t’installerais à l'autre bout du monde et n’entrerais plus en contact avec ta famille pendant un an ? 🌏",
"Pour combien tu irais faire un tatouage de bite (même un petit) ? 💉",
"Pour quel montant tu quitterais ton/ta partenaire immédiatement et ne lui parlerais plus jamais ? 💔",
"Pour combien d’euros tu te ferais tatouer le nom de ton ex en grand sur le bras ? 🖋️",
"Pour quel montant tu arrêterais de parler à tes amis pendant un mois (genre vraiment pas parler) ? 🙊",
"Pour combien tu accepterais de manger un insecte vivant devant tout le monde ? 🦗",
"Combien d’argent il te faudrait pour faire un saut à l’élastique ? 🪂",
"Pour combien tu irais te promener dans la rue en sous-vêtements pendant 30 minutes ? 👙",
"Pour combien tu arrêterais d’utiliser ton téléphone pendant une semaine entière ? 📱",
"Pour combien tu t’installerais dans un endroit où tu n’as absolument rien et recommencerais ta vie à zéro ? 🏝️",
"Pour combien d’euros tu irais dîner avec quelqu’un que tu détestes sincèrement ? 🍽️",
"Pour combien tu irais participer à une soirée déguisée ultra gênante ? 🤡",
"Pour combien tu accepterais de publier un message embarrassant sur ton profil pendant une journée entière ? 📲",
"Pour combien tu quitterais ton groupe d’amis et t’installerais dans une ville où tu ne connais personne ? 🚶",
"Pour combien d’euros tu accepterais d’aller à un rendez-vous galant avec quelqu’un que tu n’as jamais vu ? 🤢",
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
"Pour combien tu irais te faire tatouer un portrait géant de ton ex sur le ventre ? 🖋️",
"Pour combien tu abandonnerais ta vie actuelle, ton boulot et tes amis pour partir vivre dans une forêt pendant six mois ? 🌳",
"Pour quel montant tu quitterais ton partenaire actuel sur-le-champ, sans explication, pour ne jamais revenir ? 💔",
"Pour combien d'euros tu t’engagerais à ne plus utiliser Internet pendant 3 mois ? 🌐",
"Pour combien tu irais passer une nuit dans un hôtel où une personne bien bien malade a dormi juste avant toi (la femme de ménage est en vacance) ? 🏨🤧",
"Pour combien d’euros tu accepterais de t'installer dans une maison hantée pendant une semaine sans protection ? 👻",
"Pour combien tu irais faire un live sur tes réseaux sociaux où tu fais des choses embarrassantes comme chanter des chansons ridicules ou danser sur une chanson nulle ? 🎤",
"Pour quel prix tu couperais tous les liens avec tes amis et ta famille pendant 6 mois ? 🚶‍♀️",
"Pour combien tu accepterais de dire à un inconnu dans la rue tous tes pires secrets ? 🕵️",
"Pour combien tu irais dans un club nudiste pendant une soirée entière sans vêtements ? 🏖️",
"Pour combien tu irais te filmer en train de manger un insecte géant vivant en public ? 🦗",
"Pour combien tu renoncerais à ta réputation et tu publierais une vidéo où tu te ridiculises à 100% ? 🎥",
"Pour combien d’euros tu irais dans un pays où tu ne parles pas la langue et tu y passes un mois sans aucune aide ? 🌍",
"Pour combien tu accepterais de passer 24h enfermé dans une pièce remplie de serpents ? 🐍",
"Pour combien tu accepterais de passer 24h enfermé dans une pièce avec @joueur",
"Pour quel prix tu participerais à un concours de honte et devrais faire une action ultra embarrassante devant un groupe ? 🎤",
"Pour combien tu accepterais de te filmer pendant une scène de drague ultra gênante avec une personne totalement inconnue ? 📱",
"Pour combien tu accepterais de faire une séance de méditation en plein milieu d'une rue passante, torse nu ? 🧘",
"Pour combien tu irais faire une blague particulièrement humiliante à @joueur en public, sachant qu’il/elle pourrait se fâcher ? 🤭",
"Pour combien tu accepterais de perdre 5 ans de ta vie dans une maison totalement isolée, sans technologie et sans communication ? 🏡",



"Les surnoms que tu peux donner à ta b***, celui qui répète ou ne trouve pas boit, @joueur commence 🍆",
"Un mot en 'ouille', celui qui ne trouve pas ou répète boit (je commence : Couille !) @joueur est le suivant ! 🥚",
"Les insultes inventées qui font rire, celui qui ne trouve pas ou répète boit, @joueur commence 🤪",
"Les trucs qu'on ne voudrait pas que nos parents trouvent sous notre lit, celui qui répète ou ne trouve pas boit, @joueur commence  🙈",
"Les sons qu'on peut faire avec la bouche, celui qui ne trouve pas ou répète boit (paf, prout...), @joueur commence 🥴",
"Les excuses bidons pour ne pas aller au sport, celui qui ne trouve pas ou répète boit, @joueur commence 🏋️‍♂️",
"Les pires phrases de drague entendues, celui qui ne trouve pas ou répète boit, @joueur commence 💘",
"Les objets improbables qu’on pourrait utiliser pour ouvrir une bière, celui qui répète ou ne trouve pas boit, @joueur commence 🍺",
"Les trucs qu'on pourrait crier en pleine rue pour gêner les gens autour, celui qui répète ou ne trouve pas boit, @joueur commence 🤷‍♂️",
"Les noms d’animaux qu’on donnerait à un ex toxique, celui qui répète ou ne trouve pas boit, @joueur commence 🐍",
"Les pires costumes de soirée qu’on peut imaginer, celui qui répète ou ne trouve pas boit, @joueur commence 🎭",
"Les noms de cocktails inventés complètement WTF, celui qui répète ou ne trouve pas boit, @joueur commence 🍹",
"Les choses qu'on pourrait dire à son boss pour se faire virer direct, celui qui répète ou ne trouve pas boit, @joueur commence 💼",
"Les pires trucs qu’un invité pourrait ramener à une soirée, celui qui répète ou ne trouve pas boit, @joueur commence 🎁",
"Les pires secrets qu’on pourrait avouer après trois verres, celui qui répète ou ne trouve pas boit, @joueur commence 🤐",
"Les choses qu'on pourrait écrire sur Tinder pour être sûr de ne jamais matcher, celui qui répète ou ne trouve pas boit,@joueur commence 📱",
"Les lieux où tu ne voudrais jamais être surpris tout nu, celui qui répète ou ne trouve pas boit, @joueur commence 😳",
"Les pires surnoms qu'on pourrait donner à ses amis, celui qui répète ou ne trouve pas boit, @joueur commence 🐒",
"Les pires idées pour un tatouage qu’on regretterait le lendemain, celui qui répète ou ne trouve pas boit, @joueur commence 🎨",
"Les excuses pour ne pas payer un verre à quelqu’un, celui qui répète ou ne trouve pas boit, @joueur commence 💸",
"Les sons d’animaux qu’on pourrait imiter en soirée, celui qui répète ou ne trouve pas boit, @joueur commence 🐄",
"Les phrases qu’on pourrait sortir en plein rêve bizarre, celui qui répète ou ne trouve pas boit, @joueur commence 🛌",
"Les prénoms qu’on donnerait à un poisson rouge en pleine crise existentielle, celui qui répète ou ne trouve pas boit, @joueur commence 🐟",



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