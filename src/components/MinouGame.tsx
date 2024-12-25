import React, { useState, useCallback, useEffect } from 'react';
import { Settings, Home, Eye } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import { getAllMinouQuestions } from '../data/questionManager';
import { PUNISHMENT_LEVELS } from '../types/punishments';
import buttonSoundFile from '../assets/button-sound.mp3';
import VoteConfirmation from './MinouGame/VoteConfirmation';
import PlayerVoteList from './MinouGame/PlayerVoteList';
import QuestionManager from './QuestionManager';

interface MinouGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function MinouGame({ players, onEndGame, theme }: MinouGameProps) {
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<{ text: string; original: string } | null>(null);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<{ voter: Player; votedFor: Player }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVoteConfirmation, setShowVoteConfirmation] = useState(false);

  const buttonSound = new Audio(buttonSoundFile);

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
    setShowVoteConfirmation(true);
    playButtonSound();
    
    setTimeout(() => {
      const newVote = {
        voter: players[currentVoterIndex],
        votedFor
      };
      setVotes([...votes, newVote]);
      setCurrentVoterIndex(currentVoterIndex + 1);
      setShowVoteConfirmation(false);
    }, 1000);
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

  if (showSettings) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <QuestionManager theme={theme} mode="minou" />
        </div>
      </div>
    );
  }

  if (showResults) {
    const [winner, voteCount] = getMostVotedPlayer();
    const percentage = Math.round((voteCount / votes.length) * 100);
    const punishment = PUNISHMENT_LEVELS[Math.floor(Math.random() * 3) + 3];

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6" dangerouslySetInnerHTML={{ __html: currentQuestion?.text || '' }} />
          
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
                setCurrentQuestion(getNextQuestion());
                setVotes([]);
                setCurrentVoterIndex(0);
                setShowResults(false);
                playButtonSound();
              }}
              className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
            >
              Question suivante
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentVoterIndex < players.length) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-2xl font-bold text-center flex-1"
                dangerouslySetInnerHTML={{ __html: currentQuestion?.text || '' }}
              />
            </div>
            
            <p className="text-center text-gray-600 mb-6">
            C'est au tour de{' '}
  <span
    className="font-semibold"
    style={{ color: players[currentVoterIndex].color }}
  >
    {players[currentVoterIndex].name}
  </span>{' '}
  de voter
            </p>

            <PlayerVoteList 
              players={players}
              currentVoter={players[currentVoterIndex]}
              onVote={handleVote}
            />
          </div>
        </div>

        <VoteConfirmation 
          show={showVoteConfirmation}
          onAnimationEnd={() => setShowVoteConfirmation(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center">
        <button
          onClick={() => setShowResults(true)}
          className={`flex items-center justify-center gap-2 mx-auto px-8 py-3 text-white rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
        >
          <Eye className="w-5 h-5" />
          Voir les résultats
        </button>
      </div>
    </div>
  );
}