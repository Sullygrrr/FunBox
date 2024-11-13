import emailjs from 'emailjs-com';

export const sendQuestionSuggestionEmail = async (question: string, gameMode: string) => {
    try {
        const templateParams = {
          subject: `Suggestion de joueur - ${gameMode}`,
          message: `Un utilisateur a soumis cette question, on valide chef ?\n\n${question}`,
          to_email: 'sully@lafunbox.fun'
        };

    await emailjs.send(
      'FunBox1',
      'template_zxtdf1h',
      templateParams,
      'cdkst67e4e_Zli_BL'
    );
  } catch (error) {
    console.error('Error sending email:', error);
  }
};