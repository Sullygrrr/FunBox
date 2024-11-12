import React, { useState, useCallback, useEffect } from 'react';
import { Home, Eye, Settings, Plus, Trash2 } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import { defaultMinouQuestions } from '../data/minouQuestions';
import { 
  getAllMinouQuestions, 
  addCustomMinouQuestion, 
  removeCustomMinouQuestion,
  getCustomMinouQuestions,
} from '../data/questionManager';
import { PUNISHMENT_LEVELS } from '../types/punishments';
import buttonSoundFile from '../assets/button-sound.mp3'; // Son du bouton


interface MinouGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

interface Vote {
  voter: Player;
  votedFor: Player;
}

export default function MinouGame({ players, onEndGame, theme }: MinouGameProps) {
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<{ text: string; original: string } | null>(null);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [customQuestions, setCustomQuestions] = useState(getCustomMinouQuestions());

  const getRandomPlayer = useCallback((excludePlayer?: Player) => {
    const availablePlayers = excludePlayer 
      ? players.filter(p => p !== excludePlayer)
      : players;
    return availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
  }, [players]);

  const buttonSound = new Audio(buttonSoundFile);

  // Fonction pour jouer le son du bouton
  const playButtonSound = () => {
    buttonSound.currentTime = 0; // Redémarre le son au début
    buttonSound.play();
  };

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

  const getNextQuestion = useCallback(() => {
    const allQuestions = getAllMinouQuestions();
    const availableQuestions = allQuestions.filter(q => !usedQuestions.includes(q));
    
    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      return { 
        text: processQuestion(randomQuestion),
        original: randomQuestion
      };
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    setUsedQuestions(prev => [...prev, question]);
    
    return { 
      text: processQuestion(question),
      original: question
    };
  }, [processQuestion, usedQuestions]);

  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(getNextQuestion());
    }
  }, [currentQuestion, getNextQuestion]);

  const handleVote = (votedFor: Player) => {
    const newVote: Vote = {
      voter: players[currentVoterIndex],
      votedFor
    };
    setVotes([...votes, newVote]);
    setCurrentVoterIndex(currentVoterIndex + 1);
  };

  const getMostVotedPlayer = () => {
    const voteCounts = new Map<Player, number>();
    votes.forEach(vote => {
      const count = voteCounts.get(vote.votedFor) || 0;
      voteCounts.set(vote.votedFor, count + 1);
    });
    return Array.from(voteCounts.entries())
      .sort((a, b) => b[1] - a[1])[0];
  };

  const startNewQuestion = () => {
    setCurrentQuestion(getNextQuestion());
    setVotes([]);
    setCurrentVoterIndex(0);
    setShowResults(false);
    setShowSettings(false);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const updatedQuestions = addCustomMinouQuestion(newQuestion.trim());
      setCustomQuestions(updatedQuestions);
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = removeCustomMinouQuestion(index);
    setCustomQuestions(updatedQuestions);
  };

  const getPunishmentLevel = () => {
    return PUNISHMENT_LEVELS[Math.floor(Math.random() * 3) + 3];
  };

  if (!currentQuestion) return null;

  if (showResults) {
    const [winner, voteCount] = getMostVotedPlayer();
    const percentage = Math.round((voteCount / votes.length) * 100);
    const punishment = getPunishmentLevel();

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6" dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
          
          <div className="mb-8">
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full mb-2"
                style={{ backgroundColor: winner.color }}
              />
              <p className="text-xl font-semibold text-gray-800">{winner.name}</p>
              <p className="text-gray-600">{voteCount} votes ({percentage}%)</p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-lg font-medium text-gray-800">Punition :</p>
                <p className="text-gray-700">
                  {winner.punishment === 'verre' 
                    ? punishment.verre 
                    : winner.punishment === 'shots'
                    ? `${punishment.shot} shot${punishment.shot > 1 ? 's' : ''}`
                    : `${punishment.pompe} pompe${punishment.pompe > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {players.map(player => {
                const playerVotes = votes.filter(v => v.votedFor === player).length;
                const playerPercentage = Math.round((playerVotes / votes.length) * 100);
                
                return (
                  <div key={player.name} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full shrink-0"
                      style={{ backgroundColor: player.color }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {player.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {playerVotes} vote{playerVotes > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${playerPercentage}%`,
                            backgroundColor: player.color
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
                startNewQuestion();
              playButtonSound()}}
              className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
            >
              Question suivante
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Gestion des questions</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleAddQuestion} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ajouter une nouvelle question... (@joueur pour un joueur aléatoire)"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className={`p-2 rounded-lg text-white ${theme.primary} ${theme.hover}`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Questions par défaut</h3>
              <div className="space-y-2">
                {defaultMinouQuestions.map((question, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{question}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Questions personnalisées</h3>
              <div className="space-y-2">
                {customQuestions.map((question, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{question}</span>
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 
              className="text-2xl font-bold text-center"
              dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
            />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          {currentVoterIndex < players.length ? (
            <>
              <p className="text-center text-gray-600 mb-6">
                C'est au tour de <span className="font-semibold">{players[currentVoterIndex].name}</span> de voter
              </p>
              <div className="grid grid-cols-2 gap-4">
                {players.map((player) => (
                  <button
                    key={player.name}
                    onClick={() => {handleVote(player);
                    playButtonSound()}}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{ backgroundColor: player.color }}
                    />
                    <span className="font-medium text-gray-800">{player.name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <button
                onClick={() => {setShowResults(true);
                playButtonSound()}}
                className={`flex items-center justify-center gap-2 mx-auto px-8 py-3 text-white rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
              >
                <Eye className="w-5 h-5" />
                Voir les résultats
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}