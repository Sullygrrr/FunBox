import React, { useState, useEffect } from 'react';
import { PlusCircle, Settings, Volume2, VolumeX } from 'lucide-react';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import PlayerSetup from './components/PlayerSetup';
import GameScreen from './components/GameScreen';
import WheelGame from './components/WheelGame';
import MinouGame from './components/MinouGame';
import MimeGame from './components/MimeGame';
import BottleGame from './components/BottleGame';
import GameModeSelector from './components/GameModeSelector';
import QuestionManager from './components/QuestionManager';
import SafetyPopup from './components/SafetyPopup';
import { useTheme } from './hooks/useTheme';
import { useSafetyPopup } from './hooks/useSafetyPopup';
import { usePlayers } from './hooks/usePlayers';
import { Player, GameMode } from './types';
import musique from './assets/musique.mp3';
import buttonSoundFile from './assets/button-sound.mp3';
import assets from './assets'; // Import dynamique des assets
import { preloadAssets } from './utils/preloadAssets'; // Import de la fonction de préchargement
import LoadingScreen from './components/LoadingScreen'; // Import de l'écran de chargement

export default function App() {
  const theme = useTheme();
  const { showPopup, closePopup } = useSafetyPopup();
  const { players, addPlayer, removePlayer, clearPlayers } = usePlayers();
  const [gameStarted, setGameStarted] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [loadingAssets, setLoadingAssets] = useState(true); // Nouvel état pour le chargement des assets

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

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await preloadAssets(assets);
        console.log('Assets loaded successfully');
        setLoadingAssets(false); // Changer l'état de chargement lorsque les assets sont prêts
      } catch (error) {
        console.error('Error loading assets', error);
        setLoadingAssets(false); // Changer l'état même en cas d'erreur
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (audioPlayed) {
      const audio = new Audio(musique);
      audio.loop = true;
      audio.volume = isMuted ? 0 : 1;
      setAudioElement(audio);

      audio.play().catch((error) => {
        console.log('Erreur lors de la lecture de la musique de fond :', error);
      });

      const handleVisibilityChange = () => {
        if (document.hidden) {
          audio.pause();
        } else if (!isMuted) {
          audio.play().catch(console.error);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        audio.pause();
        audio.currentTime = 0;
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [audioPlayed, isMuted]);

  const handleHeaderClick = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    if (timeDiff < 500) {
      setClickCount(prev => prev + 1);
      if (clickCount === 2) {
        const mailtoLink = "mailto:sully@lafunbox.fun?subject=Message depuis la FunBox&body=On joue à la FunBox et on t'envoie ce message en direct de notre soirée (hesitez pas à mettre des photos :) Merci à vous !!!)";
        window.location.href = mailtoLink;
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(currentTime);
  };

  const buttonSound = new Audio(buttonSoundFile);

  const playButtonSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioElement) {
      if (isMuted) {
        audioElement.play().catch(console.error);
      } else {
        audioElement.pause();
      }
    }
  };

  const handleAddPlayer = (player: Player) => {
    addPlayer(player);
    setShowAddPlayer(false);
    playButtonSound();
  };

  const handleRemovePlayer = (index: number) => {
    removePlayer(index);
    playButtonSound();
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameStarted(true);
    playButtonSound();
  };

  const renderGame = () => {
    switch (gameMode) {
      case 'simple':
        return <GameScreen players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      case 'minou':
        return <MinouGame players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      case 'mime':
        return <MimeGame players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      case 'wheel':
        return <WheelGame players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      case 'bottle':
        return <BottleGame players={players} onEndGame={() => setGameStarted(false)} theme={theme} />;
      default:
        return null;
    }
  };

  const usedColors = players.map(p => p.color);
  const usedNames = players.map(p => p.name);

  const handleUserInteraction = () => {
    setAudioPlayed(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} relative overflow-hidden`} onClick={handleUserInteraction}>
      {loadingAssets ? (
        <LoadingScreen /> // Afficher l'écran de chargement pendant que les assets sont en train de se charger
      ) : (
        <>
          {showPopup && <SafetyPopup onClose={closePopup} theme={theme} />}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 animate-scroll-diagonal">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap text-6xl font-bold opacity-0 mb-24 animate-fade-in-out"
                  style={{ 
                    transform: 'rotate(-65deg)',
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  {Array.from({ length: 30 }).map((_, j) => (
                    <span key={j} className="mr-12">FunBox ---</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 py-8 max-w-lg relative">
            <header className="text-center mb-8">
              <h1 
                className="text-5xl font-bold text-white mb-2 font-display tracking-wider animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-white bg-[length:200%_100%] cursor-pointer"
                onClick={handleHeaderClick}
              >
                FunBox
                <button
                    onClick={() => {toggleMute(); playButtonSound()}}
                    className={`fixed bottom-2 right-2 text-white p-2 rounded-full ${theme.primary} ${theme.hover} z-20`}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
              </h1>

              <span className="absolute bottom-1 right-5 text-xs text-white/50">v1.20b</span>
              <div className="container mx-auto flex justify-center items-center gap-4 text-xs text-white/70">
                <a href="https://www.instagram.com/sully.grrr/" className="hover:text-white transition-colors">@Sully.grrr</a>
                <span>•</span>
                <a href="https://www.paypal.me/lafunbox" className="hover:text-white transition-colors">Soutenir le dev</a>
                <span>•</span>
                <a
                  href="mailto:sully@lafunbox.fun?subject=Suggestion pour la FunBox&body= "
                  className="hover:text-white transition-colors"
                >
                  M'envoyer un Mail
                </a>
              </div>
            </header>
            {!gameStarted ? (
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Joueurs</h2>
                    <div className="flex gap-2">
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
                      onAdd={handleAddPlayer} 
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
                            onClick={() => { handleRemovePlayer(index); }}
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
        </>
      )}
    </div>
  );
}
