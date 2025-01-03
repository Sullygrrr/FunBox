export const createMailtoLink = (content: string, gameMode: string) => {
  const subject = encodeURIComponent(`Suggestions pour la FunBox - ${gameMode}`);
  const body = encodeURIComponent(`Voici mes suggestions pour le mode ${gameMode} :\n\n${content}`);
  return `mailto:sully@lafunbox.fun?subject=${subject}&body=${body}`;
};