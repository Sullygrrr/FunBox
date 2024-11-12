import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Settings } from 'lucide-react';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import PlayerSetup from './components/PlayerSetup';
import GameScreen from './components/GameScreen';
import WheelGame from './components/WheelGame';
import MinouGame from './components/MinouGame';
import GameModeSelector from './components/GameModeSelector';
import QuestionManager from './components/QuestionManager';
import { useTheme } from './hooks/useTheme';
import { Player, GameMode } from './types';
import musique from './assets/musique.mp3'; // Musique de fond
import buttonSoundFile from './assets/button-sound.mp3'; // Son du bouton

export default function App() {
  const theme = useTheme();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Ajout d'état pour suivre si la musique est jouée

  const audioRef = useRef(new Audio(musique)); // Créer une référence à l'objet Audio
  const buttonSound = useRef(new Audio(buttonSoundFile)); // Son du bouton

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lock({ orientation: 'portrait' });
      } catch (error) {
        console.log('Screen orientation lock failed:', error);
      }
    };
    lockOrientation();
  }, []);

  const playMusic = () => {
    if (!isMusicPlaying) {
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => {
        console.log('Erreur lors de la lecture de la musique de fond :', error);
      });
      setIsMusicPlaying(true);
    }
  };

  const playButtonSound = () => {
    buttonSound.currentTime = 0; // Redémarre le son au début
    buttonSound.play();
  };

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
    setShowAddPlayer(false);
    playButtonSound(); // Joue le son lors de l'ajout d'un joueur
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    playButtonSound(); // Joue le son lors de la suppression d'un joueur
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameStarted(true);
    playButtonSound(); // Joue le son lors du début du jeu
  };

  const renderGame = () => {
    switch (gameMode) {
      case 'simple':
        return <GameScreen players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      case 'minou':
        return <MinouGame players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      case 'wheel':
        return <WheelGame players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      default:
        return null;
    }
  };

  const usedColors = players.map(p => p.color);
  const usedNames = players.map(p => p.name);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-scroll-diagonal">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-6xl font-bold opacity-0 mb-24 animate-fade-in-out"
              style={{ 
                transform: 'rotate(-65deg)',
                animationDelay: `${i * 0.2}s`
              }}
            >
              {Array.from({ length: 8 }).map((_, j) => (
                <span key={j} className="mr-12">FunBox -</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg relative">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 font-display tracking-wider animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-white bg-[length:200%_100%]">
            FunBox
          </h1>
        </header>

        {/* Bouton pour démarrer la musique */}
        {!isMusicPlaying && (
          <div className="text-center mb-4">
            <button onClick={playMusic} className="bg-blue-500 text-white px-4 py-2 rounded">
              Démarrer la musique
            </button>
          </div>
        )}

        {!gameStarted ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Joueurs</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowSettings(!showSettings); playButtonSound(); }}
                    className={`p-2 rounded-lg transition-colors ${showSettings ? theme.primary + ' text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setShowAddPlayer(true); playButtonSound(); }}
                    className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
                    disabled={players.length >= 8}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Ajouter
                  </button>
                </div>
              </div>

              {showAddPlayer && (
                <PlayerSetup 
                  onAdd={addPlayer} 
                  onCancel={() => setShowAddPlayer(false)}
                  usedColors={usedColors}
                  usedNames={usedNames}
                  theme={theme}
                />
              )}

              {players.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg animate-fade-in"
                      style={{ 
                        backgroundColor: `${player.color}15`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: player.color }}
                      />
                      <span className="flex-1 font-medium text-gray-700">{player.name}</span>
                      <span className="text-sm text-gray-500">{player.punishment}</span>
                      <button
                        onClick={() => { removePlayer(index); playButtonSound(); }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Ajoutez des joueurs pour commencer !
                </div>
              )}

              {showSettings && (
                <QuestionManager theme={theme} mode={gameMode || 'simple'} />
              )}

              {players.length >= 2 && !showSettings && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Mode de jeu</h3>
                  <GameModeSelector onSelect={startGame} theme={theme} />
                </div>
              )}
            </div>
          </div>
        ) : (
          renderGame()
        )}
      </div>
    </div>
  );
}
