import { useState, useCallback } from 'react';
import { getAllMimeWords } from '../data/mimeWords';

export function useMimeWords(getRandomPlayer: () => string) {
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const getNextWord = useCallback(() => {
    const allWords = getAllMimeWords(getRandomPlayer);
    const availableWords = allWords.filter(word => !usedWords.includes(word));
    
    if (availableWords.length === 0) {
      setUsedWords([]); // Reset used words when all have been used
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
      return randomWord;
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const word = availableWords[randomIndex];
    setUsedWords(prev => [...prev, word]);
    
    return word;
  }, [usedWords, getRandomPlayer]);

  return { getNextWord };
}