import { defaultMinouQuestions } from './minouQuestions';

// Load custom Minou questions from localStorage
const loadCustomMinouQuestions = () => {
  const saved = localStorage.getItem('customMinouQuestions');
  return saved ? JSON.parse(saved) : [];
};

// Save custom Minou questions to localStorage
const saveCustomMinouQuestions = (questions: string[]) => {
  localStorage.setItem('customMinouQuestions', JSON.stringify(questions));
};

// Load disabled default Minou questions from localStorage
const loadDisabledDefaultMinouQuestions = () => {
  const saved = localStorage.getItem('disabledDefaultMinouQuestions');
  return saved ? JSON.parse(saved) : [];
};

// Save disabled default Minou questions to localStorage
const saveDisabledDefaultMinouQuestions = (indices: number[]) => {
  localStorage.setItem('disabledDefaultMinouQuestions', JSON.stringify(indices));
};

// Get all custom Minou questions
export const getCustomMinouQuestions = () => loadCustomMinouQuestions();

// Add a custom Minou question
export const addCustomMinouQuestion = (question: string) => {
  const customQuestions = loadCustomMinouQuestions();
  customQuestions.push(question);
  saveCustomMinouQuestions(customQuestions);
  return customQuestions;
};

// Remove a custom Minou question
export const removeCustomMinouQuestion = (index: number) => {
  const customQuestions = loadCustomMinouQuestions();
  customQuestions.splice(index, 1);
  saveCustomMinouQuestions(customQuestions);
  return customQuestions;
};

// Get disabled default Minou questions
export const getDisabledDefaultMinouQuestions = () => loadDisabledDefaultMinouQuestions();

// Toggle a default Minou question
export const toggleDefaultMinouQuestion = (index: number) => {
  const disabledQuestions = loadDisabledDefaultMinouQuestions();
  const isDisabled = disabledQuestions.includes(index);
  
  if (isDisabled) {
    saveDisabledDefaultMinouQuestions(disabledQuestions.filter(i => i !== index));
  } else {
    saveDisabledDefaultMinouQuestions([...disabledQuestions, index]);
  }
  
  return !isDisabled;
};

// Get all active Minou questions
export const getAllMinouQuestions = () => {
  const disabledQuestions = loadDisabledDefaultMinouQuestions();
  const activeDefaultQuestions = defaultMinouQuestions.filter((_, index) => !disabledQuestions.includes(index));
  return [...activeDefaultQuestions, ...loadCustomMinouQuestions()];
};