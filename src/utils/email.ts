import emailjs from 'emailjs-com';

export const sendQuestionSuggestionEmail = async (questions: string, gameMode: string) => {
    try {
        const templateParams = {
          subject: `Suggestions de questions - ${gameMode}`,
          message: `Un utilisateur a soumis ces questions, on valide chef ?\n\n${questions}`,
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