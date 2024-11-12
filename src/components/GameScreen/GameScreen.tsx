import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRight, Home, Settings, AlertCircle } from 'lucide-react';
import { Player } from '../../types';
import { defaultQuestions } from '../../data/questions';
import { getRandomPunishmentLevel } from '../../utils/punishments';
import { PlayerList } from './PlayerList';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionManager } from './QuestionManager';

interface GameScreenProps {
  players: Player[];
  onEndGame: () => void;
}

export default function GameScreen({ players, onEndGame }: GameScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem('customQuestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [newQuestion, setNewQuestion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<{
    text: string;
    punishment: ReturnType<typeof getRandomPunishmentLevel>;
  } | null>(null);

  const allQuestions = [...defaultQuestions, ...customQuestions];

  const getRandomPlayers = useCallback((count: number) => {
    if (count > players.length) return null;
    
    const availablePlayers = [...players];
    const selectedPlayers: Player[] = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availablePlayers.length);
      selectedPlayers.push(availablePlayers[randomIndex]);
      availablePlayers.splice(randomIndex, 1);
    }

    return selectedPlayers;
  }, [players]);

  const processQuestion = useCallback((question: string) => {
    const occurrences = (question.match(/@joueur/g) || []).length;
    const randomPlayers = getRandomPlayers(occurrences);
    
    if (!randomPlayers) return null;
    
    let processed = question;
    randomPlayers.forEach(player => {
      processed = processed.replace('@joueur', player.name);
    });
    
    return processed;
  }, [getRandomPlayers]);

  const getNextQuestion = useCallback(() => {
    const validQuestions = allQuestions.filter(question => {
      const playerMentions = (question.match(/@joueur/g) || []).length;
      return playerMentions <= players.length;
    });

    if (validQuestions.length === 0) {
      setError(`Pas assez de joueurs pour les questions disponibles (${players.length} joueurs)`);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * validQuestions.length);
    const question = validQuestions[randomIndex];
    const processedText = processQuestion(question);

    if (!processedText) {
      setError('Impossible de générer une question valide');
      return null;
    }

    setError(null);
    return {
      text: processedText,
      punishment: getRandomPunishmentLevel()
    };
  }, [allQuestions, players.length, processQuestion]);

  const nextQuestion = useCallback(() => {
    const question = getNextQuestion();
    if (question) {
      setCurrentQuestion(question);
    }
  }, [getNextQuestion]);

  useEffect(() => {
    if (!currentQuestion) {
      nextQuestion();
    }
  }, [currentQuestion, nextQuestion]);

  const addQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const updatedQuestions = [...customQuestions, newQuestion.trim()];
      setCustomQuestions(updatedQuestions);
      localStorage.setItem('customQuestions', JSON.stringify(updatedQuestions));
      setNewQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = customQuestions.filter((_, i) => i !== index);
    setCustomQuestions(updatedQuestions);
    localStorage.setItem('customQuestions', JSON.stringify(updatedQuestions));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <PlayerList players={players} />
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {showSettings && (
            <QuestionManager
              customQuestions={customQuestions}
              newQuestion={newQuestion}
              onNewQuestionChange={setNewQuestion}
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}
            />
          )}

          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion.text}
              punishment={currentQuestion.punishment}
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onEndGame}
            className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            End Game
          </button>
          <button
            onClick={nextQuestion}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Next Question
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}