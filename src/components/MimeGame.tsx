import React, { useState, useEffect } from 'react';
import { Home, RefreshCw, Timer, Trophy, Users, ArrowRight, Check, X } from 'lucide-react';
import { Player, Team, TimeLimit } from '../types';
import { Theme } from '../types/theme';
import { mimeWords } from '../data/mimeWords';
import { generateTeamName } from '../data/teamNames';
import buttonSoundFile from '../assets/button-sound.mp3';

interface MimeGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function MimeGame({ players, onEndGame, theme }: MimeGameProps) {
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'between-teams' | 'between-rounds' | 'results'>('setup');
  const [isTeamMode, setIsTeamMode] = useState<boolean | null>(null);
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teams, setTeams] = useState<Team[]>([]);
  const [timeLimit, setTimeLimit] = useState<TimeLimit>(60);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentMimer, setCurrentMimer] = useState<Player | null>(null);
  const [roundNumber, setRoundNumber] = useState(1);
  const [currentWords, setCurrentWords] = useState<{ word: string; guessed: boolean; skipped: boolean }[]>([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const buttonSound = new Audio(buttonSoundFile);

  const playButtonSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  const shuffleTeams = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const newTeams: Team[] = Array.from({ length: numberOfTeams }, () => ({
      id: Math.random(),
      name: generateTeamName(),
      players: [],
      points: 0
    }));

    shuffledPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfTeams;
      newTeams[teamIndex].players.push({ ...player, points: 0 });
    });

    setTeams(newTeams);
  };

  const getRandomWords = (count: number) => {
    const availableWords = mimeWords.filter(word => !usedWords.includes(word));
    if (availableWords.length < count) {
      setUsedWords([]);
      return mimeWords
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .map(word => ({ word, guessed: false, skipped: false }));
    }
    return availableWords
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(word => ({ word, guessed: false, skipped: false }));
  };

  const startTeamTurn = () => {
    const currentTeam = teams[currentTeamIndex];
    const usedMimers = currentTeam.players.filter(p => p.points && p.points > 0);
    const availableMimers = currentTeam.players.filter(p => !usedMimers.includes(p));
    
    const nextMimer = availableMimers.length > 0
      ? availableMimers[Math.floor(Math.random() * availableMimers.length)]
      : currentTeam.players[Math.floor(Math.random() * currentTeam.players.length)];
    
    setCurrentMimer(nextMimer);
    setTimeLeft(timeLimit);
    setCurrentWords(getRandomWords(10));
    
    const newTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(newTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(newTimer);
    setGamePhase('playing');
  };

  const getCurrentWord = () => {
    const unguessedWords = currentWords.filter(w => !w.guessed);
    const activeWords = unguessedWords.filter(w => !w.skipped);
    
    if (activeWords.length === 0) {
      setCurrentWords(prev => prev.map(w => 
        w.guessed ? w : { ...w, skipped: false }
      ));
      return unguessedWords[0];
    }
    
    return activeWords[0];
  };

  const handleWordGuessed = (guessed: boolean) => {
    const currentWord = getCurrentWord();
    if (!currentWord) return;

    const wordIndex = currentWords.findIndex(w => w.word === currentWord.word);
    
    setCurrentWords(prev => {
      const newWords = [...prev];
      newWords[wordIndex] = { ...newWords[wordIndex], guessed, skipped: !guessed };
      return newWords;
    });

    if (guessed) {
      setTeams(prev => prev.map((team, idx) => 
        idx === currentTeamIndex
          ? { ...team, points: team.points + 1 }
          : team
      ));

      const allWordsGuessed = currentWords.every((w, i) => 
        i === wordIndex ? guessed : w.guessed
      );

      if (allWordsGuessed) {
        setTeams(prev => prev.map((team, idx) => 
          idx === currentTeamIndex
            ? { ...team, points: team.points + 3 }
            : team
        ));
        endTeamTurn();
      }
    }
  };

  const endTeamTurn = () => {
    if (timer) clearInterval(timer);
    
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
    setCurrentTeamIndex(nextTeamIndex);
    
    if (nextTeamIndex === 0) {
      setGamePhase('between-rounds');
    } else {
      setGamePhase('between-teams');
    }
  };

  const startNextRound = () => {
    setRoundNumber(roundNumber + 1);
    setCurrentTeamIndex(0);
    setGamePhase('between-teams');
  };

  useEffect(() => {
    if (timeLeft === 0) {
      endTeamTurn();
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  if (gamePhase === 'setup') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          {isTeamMode === null ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Mode de jeu</h2>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => {
                    setIsTeamMode(true);
                    playButtonSound();
                  }}
                  className={`p-6 rounded-lg ${theme.primary} text-white hover:opacity-90 transition-all ${
                    players.length < 4 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={players.length < 4}
                >
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <span className="text-lg font-medium">Par équipes</span>
                  {players.length < 4 && (
                    <p className="text-sm mt-2">Minimum 4 joueurs requis</p>
                  )}
                </button>
              </div>
              <button
                onClick={onEndGame}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Retour au menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Configuration</h2>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre d'équipes
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map(num => {
                    const minPlayersRequired = num * 2;
                    const isDisabled = players.length < minPlayersRequired;
                    
                    return (
                      <button
                        key={num}
                        onClick={() => {
                          setNumberOfTeams(num);
                          playButtonSound();
                        }}
                        disabled={isDisabled}
                        className={`p-4 rounded-lg ${
                          numberOfTeams === num
                            ? `${theme.primary} text-white`
                            : 'bg-gray-100 text-gray-800'
                        } ${
                          isDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:opacity-90'
                        } transition-all`}
                      >
                        {num}
                        {isDisabled && (
                          <p className="text-xs mt-1">
                            Min {minPlayersRequired} joueurs
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Temps par manche
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[60, 90, 120, 180].map(time => (
                    <button
                      key={time}
                      onClick={() => {
                        setTimeLimit(time as TimeLimit);
                        playButtonSound();
                      }}
                      className={`p-4 rounded-lg ${
                        timeLimit === time
                          ? `${theme.primary} text-white`
                          : 'bg-gray-100 text-gray-800'
                      } hover:opacity-90 transition-all`}
                    >
                      {time/60}min
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    shuffleTeams();
                    playButtonSound();
                  }}
                  className="w-full p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Mélanger les équipes
                </button>

                {teams.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {teams.map(team => (
                      <div key={team.id} className="p-4 rounded-lg bg-gray-50">
                        <h3 className="font-medium mb-2">{team.name}</h3>
                        <ul className="space-y-1">
                          {team.players.map(player => (
                            <li
                              key={player.name}
                              className="text-sm"
                              style={{ color: player.color }}
                            >
                              {player.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setIsTeamMode(null);
                    setTeams([]);
                  }}
                  className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  Retour
                </button>
                <button
                  onClick={() => {
                    if (teams.length === 0) {
                      shuffleTeams();
                    }
                    setGamePhase('between-teams');
                    playButtonSound();
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
                >
                  Commencer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gamePhase === 'playing' && currentMimer) {
    const currentTeam = teams[currentTeamIndex];
    const currentWord = getCurrentWord();

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-medium">Tour {roundNumber} - {currentTeam.name}</div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="text-xl font-bold">{timeLeft}s</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="mb-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: currentMimer.color }}
                />
                <p className="font-medium">{currentMimer.name} fait deviner !</p>
              </div>
              
              {currentWord && (
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                  <h2 className="text-3xl font-bold">{currentWord.word}</h2>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    handleWordGuessed(true);
                    playButtonSound();
                  }}
                  className={`flex items-center gap-2 px-6 py-3 text-white rounded-lg ${theme.primary} ${theme.hover}`}
                >
                  <Check className="w-5 h-5" />
                  Deviné !
                </button>
                <button
                  onClick={() => {
                    handleWordGuessed(false);
                    playButtonSound();
                  }}
                  className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50"
                >
                  <X className="w-5 h-5" />
                  Passer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'between-teams') {
    const nextTeam = teams[currentTeamIndex];
    const nextMimer = nextTeam.players[Math.floor(Math.random() * nextTeam.players.length)];
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Au tour de {nextTeam.name} !</h2>
          
          <div className="space-y-4 mb-8">
            <div className={`p-6 rounded-lg ${theme.primary} text-white`}>
              <h3 className="font-medium text-xl mb-4">{nextTeam.name}</h3>
              <div className="flex flex-wrap gap-3">
                {nextTeam.players.map(player => (
                  <div key={player.name} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: player.color }}
                    />
                    <span>{player.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg mb-2">C'est au tour de</p>
              <div
                className="w-16 h-16 rounded-full mx-auto mb-2"
                style={{ backgroundColor: nextMimer.color }}
              />
              <p className="font-bold text-xl">{nextMimer.name}</p>
              <p className="text-gray-600">de faire deviner !</p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentMimer(nextMimer);
              startTeamTurn();
              playButtonSound();
            }}
            className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
          >
            <ArrowRight className="w-5 h-5" />
            Lezgo !
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'between-rounds') {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Fin du tour {roundNumber}</h2>
          
          <div className="space-y-4 mb-8">
            {sortedTeams.map((team, index) => (
              <div
                key={team.id}
                className={`p-4 rounded-lg ${
                  index === 0 ? `${theme.primary} text-white` : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <div className="text-sm opacity-75">
                      {team.players.map(p => p.name).join(', ')}
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{team.points} pts</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setGamePhase('results');
                playButtonSound();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              Voir les résultats
            </button>
            <button
              onClick={() => {
                startNextRound();
                playButtonSound();
              }}
              className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
            >
              <RefreshCw className="w-5 h-5" />
              Nouveau tour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'results') {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    const winner = sortedTeams[0];
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Résultats finaux</h2>
          
          <div className="space-y-4 mb-8">
            {sortedTeams.map((team, index) => (
              <div
                key={team.id}
                className={`p-4 rounded-lg ${
                  index === 0 ? `${theme.primary} text-white` : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <div className="text-sm opacity-75">
                      {team.players.map(p => p.name).join(', ')}
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{team.points} pts</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold">
              {winner.name} remporte la partie !
            </h3>
            <p className="text-gray-600 mt-2">
              avec {winner.points} points
            </p>
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
                setGamePhase('setup');
                setIsTeamMode(null);
                setRoundNumber(1);
                setUsedWords([]);
                setCurrentMimer(null);
                setTeams([]);
                playButtonSound();
              }}
              className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
            >
              Nouvelle partie
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}