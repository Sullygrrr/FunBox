import React, { useState, useCallback } from 'react';
import { ArrowRight, Home, Settings } from 'lucide-react';
import { Player } from '../types';
import { getAllQuestions } from '../data/questions';
import { getRandomPunishmentLevel } from '../utils/punishments';
import { Theme } from '../types/theme';
import { QuestionDisplay } from './GameScreen/QuestionDisplay';
import QuestionManager from './QuestionManager';
import buttonSoundFile from '../assets/button-sound.mp3';
import { useQuestions } from '../hooks/useQuestions';

interface GameScreenProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function GameScreen({ players, onEndGame, theme }: GameScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    text: string;
    punishment: ReturnType<typeof getRandomPunishmentLevel>;
  } | null>(null);
  const buttonSound = new Audio(buttonSoundFile);
  const { getNextQuestion } = useQuestions();

  const playButtonSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  const getRandomPlayer = useCallback((excludePlayer?: Player) => {
    const availablePlayers = excludePlayer 
      ? players.filter(p => p !== excludePlayer)
      : players;
    return availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
  }, [players]);

  const processQuestion = useCallback((question: string) => {
    let processedQuestion = question;
    const mentions = question.match(/@joueur/g) || [];
    const usedPlayers: Player[] = [];

    mentions.forEach(() => {
      const player = getRandomPlayer(usedPlayers[usedPlayers.length - 1]);
      if (player) {
        usedPlayers.push(player);
        processedQuestion = processedQuestion.replace(
          /@joueur/, 
          `<span style="color: ${player.color}">${player.name}</span>`
        );
      }
    });

    return processedQuestion;
  }, [getRandomPlayer]);

  const handleNextQuestion = useCallback(() => {
    const question = getNextQuestion();
    if (question) {
      setCurrentQuestion({
        text: processQuestion(question),
        punishment: getRandomPunishmentLevel()
      });
    }
  }, [getNextQuestion, processQuestion]);

  React.useEffect(() => {
    if (!currentQuestion) {
      handleNextQuestion();
    }
  }, [currentQuestion, handleNextQuestion]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <div
                    className="w-8 h-8 rounded-full mb-1"
                    style={{ backgroundColor: player.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{player.name}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {showSettings && (
            <QuestionManager theme={theme} mode="simple" />
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
            Fin du jeu
          </button>
          <button
            onClick={() => {
              handleNextQuestion();
              playButtonSound();
            }}
            className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
          >
            Question suivante
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}