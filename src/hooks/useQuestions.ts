import { useState, useCallback } from 'react';
import { getAllQuestions } from '../data/questions';

export function useQuestions() {
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);

  const getNextQuestion = useCallback(() => {
    const allQuestions = getAllQuestions();
    const availableQuestions = allQuestions.filter(q => !usedQuestions.includes(q));
    
    if (availableQuestions.length === 0) {
      setUsedQuestions([]); // Reset used questions when all have been used
      const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      return randomQuestion;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    setUsedQuestions(prev => [...prev, question]);
    
    return question;
  }, [usedQuestions]);

  return { getNextQuestion };
}