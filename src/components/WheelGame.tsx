import React, { useState } from 'react';
import { ArrowRight, Home, RotateCw } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import buttonSoundFile from '../assets/spin-wheel.mp3'; // Son du bouton


interface WheelGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function WheelGame({ players, onEndGame, theme }: WheelGameProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const buttonSound = new Audio(buttonSoundFile);

  // Fonction pour jouer le son du bouton
  const playButtonSound = () => {
    buttonSound.currentTime = 0; // Redémarre le son au début
    buttonSound.play();
  };

  const spinWheel = () => {
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * players.length);
    setTimeout(() => {
      setSelectedPlayer(players[randomIndex]);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <div className="aspect-square max-w-[300px] mx-auto mb-8 relative">
            <div className={`grid place-items-center h-full ${isSpinning ? 'animate-spin' : ''}`}>
              {players.map((player, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${(360 / players.length) * index}deg) translateY(-120px)`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: player.color }}
                  />
                </div>
              ))}
            </div>
            {selectedPlayer && !isSpinning && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: selectedPlayer.color }}
                  />
                  <p className="text-xl font-bold text-gray-800">{selectedPlayer.name}</p>
                </div>
              </div>
            )}
          </div>
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
            onClick={() => {spinWheel();
              playButtonSound()}}
            disabled={isSpinning}
            className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${theme.primary} ${theme.hover} disabled:opacity-50`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            Tourner la roue
          </button>
        </div>
      </div>
    </div>
  );
}