import React, { useState, useEffect } from 'react';
import { ArrowRight, Home, RotateCw } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import buttonSoundFile from '../assets/spin-wheel.mp3';
import GameOverScreen from './GameOverScreen'; // Import du composant GameOverScreen

interface WheelGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function WheelGame({ players, onEndGame, theme }: WheelGameProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [gameOver, setGameOver] = useState(false); // État pour gérer l'écran de fin de jeu
  const buttonSound = new Audio(buttonSoundFile);

  const playButtonSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  const spinWheel = () => {
    setShouldAnimate(false);
    setRotationDegrees(0);

    setTimeout(() => {
      setShouldAnimate(true);
      setIsSpinning(true);

      const spins = 5;
      const extraDegrees = Math.random() * 3600;
      const totalDegrees = spins * 360 + extraDegrees;

      setRotationDegrees(totalDegrees);

      const sliceDegrees = 360 / players.length;
      const finalPosition = extraDegrees;
      const selectedIndex = Math.floor((360 - (finalPosition % 360)) / sliceDegrees);

      setTimeout(() => {
        setSelectedPlayer(players[selectedIndex]);
        setIsSpinning(false);
        setGameOver(true); // Affichage de l'écran de fin de jeu
      }, 3000);
    }, 50);
  };

  const createSlicePath = (startAngle: number, endAngle: number): string => {
    const radius = 50;
    const start = polarToCartesian(radius, startAngle);
    const end = polarToCartesian(radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      'M', 50, 50,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (radius: number, angle: number) => {
    const angleInRadians = (angle - 90) * Math.PI / 180;
    return {
      x: 50 + (radius * Math.cos(angleInRadians)),
      y: 50 + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <div className="aspect-square max-w-[300px] mx-auto mb-8 relative">
            {/* Marqueur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-0 h-0 border-l-[20px] border-l-transparent border-t-[40px] border-t-black border-r-[20px] border-r-transparent z-10" />
            
            {/* Roue */}
            <div className="w-full h-full relative">
              {/* Roue cliquable */}
              <button
                onClick={() => {
                  if (!isSpinning) { // Empêcher de cliquer pendant la rotation
                    spinWheel();
                    playButtonSound();
                  }
                }}
                className="w-full h-full p-0 absolute top-0 left-0"
              >
                <svg
                  viewBox="0 0 100 100"
                  className={`w-full h-full ${shouldAnimate ? 'transition-transform duration-[3000ms] ease-out' : ''}`}
                  style={{ transform: `rotate(${rotationDegrees}deg)` }}
                >
                  {players.map((player, index) => {
                    const sliceAngle = 360 / players.length;
                    const startAngle = index * sliceAngle;
                    const endAngle = (index + 1) * sliceAngle;

                    return (
                      <path
                        key={index}
                        d={createSlicePath(startAngle, endAngle)}
                        fill={player.color}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="2" fill="#1f2937" />
                </svg>
              </button>
            </div>
          </div>

          {selectedPlayer && !isSpinning && (
            <div className="text-center animate-fade-in">
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onEndGame}
            className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour au menu
          </button>
        </div>
      </div>

      {/* Affichage de l'écran de fin de jeu lorsque la roue s'arrête */}
      {gameOver && (
        <GameOverScreen
          message={
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-50">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <span className="text-xl font-bold text-gray-800">
                  Le loser est:{' '}
                  <span style={{ color: selectedPlayer?.color }}>
                    {selectedPlayer?.name}
                  </span>
                </span>
              </div>
            </div>
          }
          onEndGame={onEndGame}
        />
      )}
    </div>
  );
}
