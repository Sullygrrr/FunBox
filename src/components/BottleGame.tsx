import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import bottleImage from '../assets/bottle.png';
import capImage from '../assets/cap.png';
import screwImage from '../assets/vis.png';
import capLoseSoundFile from '../assets/caplose.wav';
import screwSoundFile1 from '../assets/screwcap-002.wav';
import screwSoundFile2 from '../assets/screwcap-003.wav';
import screwSoundFile3 from '../assets/screwcap-004.wav';
import screwSoundFile4 from '../assets/screwcap-005.wav';
import screwSoundFile5 from '../assets/screwcap-006.wav';
import { preloadAssets } from '../utils/preloadAssets';
import LoadingScreen from './LoadingScreen';
import GameOverScreen from './GameOverScreen'; // Importation du composant GameOverScreen

const capLoseSound = new Audio(capLoseSoundFile);
const screwSound1 = new Audio(screwSoundFile1);
const screwSound2 = new Audio(screwSoundFile2);
const screwSound3 = new Audio(screwSoundFile3);
const screwSound4 = new Audio(screwSoundFile4);
const screwSound5 = new Audio(screwSoundFile5);

const playLoseSound = () => {
  capLoseSound.currentTime = 0;
  capLoseSound.play();
};

const playScrewSound = () => {
  const screwSounds = [screwSound1, screwSound2, screwSound3, screwSound4, screwSound5];
  const randomIndex = Math.floor(Math.random() * screwSounds.length);
  const selectedSound = screwSounds[randomIndex];

  selectedSound.currentTime = 0;
  selectedSound.play();
};

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
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false); // Nouvel état pour l'écran de perte

  useEffect(() => {
    const assets = {
      images: [bottleImage, capImage, screwImage],
      sounds: [
        capLoseSoundFile,
        screwSoundFile1,
        screwSoundFile2,
        screwSoundFile3,
        screwSoundFile4,
        screwSoundFile5
      ]
    };

    preloadAssets(assets)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Erreur lors du préchargement des assets', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const generateRandomNumber = () => {
      const randomValue = Math.random();
      if (randomValue < 0.8) return Math.floor(Math.random() * 6); // 80% chance for numbers 0-5
      if (randomValue < 0.95) return Math.floor(Math.random() * 6) + 6; // 15% chance for numbers 6-10
      return Math.floor(Math.random() * 6) + 11; // 5% chance for numbers 11-20
    };

    setRandomNumber(generateRandomNumber());
  }, []);

  const handleCapClick = () => {
    if (counter >= 20 || gameOver) return;

    setCapOffset((prev) => prev + 10);
    setScrews((prev) => [...prev, prev.length * 10]);
    setCounter((prev) => prev + 1);

    if (counter + 1 === 21 || counter + 1 === randomNumber) {
      playLoseSound();
      setGameOver(true); // Déclenche l'écran de perte
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

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
          onClick={() => {
            handleCapClick();
            playScrewSound();
          }}         
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

      {gameOver && (
        <GameOverScreen 
          message="Perdu..." 
          onEndGame={onEndGame} 
        />
      )}
    </div>
  );
}
