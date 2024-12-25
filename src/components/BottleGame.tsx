import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import bottleImage from '../assets/bottle.png';
import capImage from '../assets/cap.png';
import screwImage from '../assets/vis.png';

interface BottleGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function BottleGame({ players, onEndGame, theme }: BottleGameProps) {
  const [screws, setScrews] = useState<number[]>([]);
  const [capOffset, setCapOffset] = useState(-65);
  const [counter, setCounter] = useState(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    // Générez le nombre aléatoire une seule fois au début
    const generateRandomNumber = () => {
      const randomValue = Math.random();
      if (randomValue < 0.8) return Math.floor(Math.random() * 6); // 80% chance for numbers 0-5
      if (randomValue < 0.95) return Math.floor(Math.random() * 6) + 6; // 15% chance for numbers 6-10
      return Math.floor(Math.random() * 6) + 11; // 5% chance for numbers 11-20
    };

    // Définit le nombre aléatoire au début du jeu
    setRandomNumber(generateRandomNumber());
  }, []); // Le tableau vide [] permet de l'exécuter seulement une fois lors du premier rendu

  const handleCapClick = () => {
    if (counter >= 20) return; // Limite de clics à 20

    setCapOffset((prev) => prev + 10);
    setScrews((prev) => [...prev, prev.length * 10]);
    setCounter((prev) => prev + 1);

    if (counter + 1 === 21 || counter + 1 === randomNumber) {
      alert("You lost!");
      onEndGame();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center relative">
      <div className="absolute bottom-0 w-full flex justify-center items-center z-10">
        <img 
          src={bottleImage} 
          alt="Bottle"
          className="transform scale-[1.5] w-auto h-auto"
        />
        {screws.map((position, index) => (
          <img
            key={index}
            src={screwImage}
            alt={`Screw ${index + 1}`}
            className="absolute transform scale-[1.5]"
            style={{ bottom: `${0 + position}px` }}
          />
        ))}
        <img 
          src={capImage} 
          alt="Cap"
          onClick={handleCapClick}
          className="absolute transform scale-[1.5] cursor-pointer transition-all duration-300"
          style={{ bottom: `${50 + capOffset}px` }}
        />
      </div>

      <button
        onClick={onEndGame}
        className={`absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors ${theme.primary} ${theme.hover} z-10`}
      >
        <Home className="w-5 h-5" />
        Retour au menu
      </button>

      <div className="absolute inset-0 flex justify-center items-center z-0">
        <p className="text-white text-[15rem] font-bold opacity-20">
          {counter}
        </p>
      </div>
    </div>
  );
}
