import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';
import bottleImage from '../assets/bottle.png';
import capImage from '../assets/cap.png';
import screwImage from '../assets/vis.png';
import champagneBottleImage from '../assets/champagne.png';
import champagneCapImage from '../assets/bouchonchampagne.png';
import champagneCapPartImage from '../assets/bouchonchampagnepart.png';
import capLoseSoundFile from '../assets/caplose.wav';
import champagneLoseSoundFile from '../assets/champagnecapelose.wav';
import screwSoundFile1 from '../assets/screwcap-002.wav';
import screwSoundFile2 from '../assets/screwcap-003.wav';
import screwSoundFile3 from '../assets/screwcap-004.wav';
import screwSoundFile4 from '../assets/screwcap-005.wav';
import screwSoundFile5 from '../assets/screwcap-006.wav';
import champagneSoundFile1 from '../assets/champagnecap-002.wav';
import champagneSoundFile2 from '../assets/champagnecap-003.wav';
import champagneSoundFile3 from '../assets/champagnecap-004.wav';
import champagneSoundFile4 from '../assets/champagnecap-005.wav';
import champagneSoundFile5 from '../assets/champagnecap-006.wav';
import { preloadAssets } from '../utils/preloadAssets';
import LoadingScreen from './LoadingScreen';
import GameOverScreen from './GameOverScreen';

const capLoseSound = new Audio(capLoseSoundFile);
const champagneLoseSound = new Audio(champagneLoseSoundFile);

const screwSounds = [
  new Audio(screwSoundFile1),
  new Audio(screwSoundFile2),
  new Audio(screwSoundFile3),
  new Audio(screwSoundFile4),
  new Audio(screwSoundFile5),
];

const champagneSounds = [
  new Audio(champagneSoundFile1),
  new Audio(champagneSoundFile2),
  new Audio(champagneSoundFile3),
  new Audio(champagneSoundFile4),
  new Audio(champagneSoundFile5),
];

const playLoseSound = (useChampagneAssets: boolean) => {
  const sound = useChampagneAssets ? champagneLoseSound : capLoseSound;
  sound.currentTime = 0;
  sound.play();
};

const playScrewSound = (useChampagneAssets: boolean) => {
  const sounds = useChampagneAssets ? champagneSounds : screwSounds;
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const selectedSound = sounds[randomIndex];
  selectedSound.currentTime = 0;
  selectedSound.play();
};

interface BottleGameProps {
  players: Player[];
  onEndGame: () => void;
  theme: Theme;
}

export default function BottleGame({ players, onEndGame, theme }: BottleGameProps) {
  const [useChampagneAssets, setUseChampagneAssets] = useState(false);
  const [screws, setScrews] = useState<number[]>([]);
  const [capOffset, setCapOffset] = useState(-65);
  const [counter, setCounter] = useState(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const currentAssets = useChampagneAssets
    ? {
        bottle: champagneBottleImage,
        cap: champagneCapImage,
        screw: champagneCapPartImage,
      }
    : {
        bottle: bottleImage,
        cap: capImage,
        screw: screwImage,
      };

  useEffect(() => {
    // Définir le thème de manière aléatoire au chargement du composant
    setUseChampagneAssets(Math.random() < 0.5);

    const assets = {
      images: [bottleImage, capImage, screwImage, champagneBottleImage, champagneCapImage, champagneCapPartImage],
      sounds: [
        capLoseSoundFile,
        champagneLoseSoundFile,
        screwSoundFile1,
        screwSoundFile2,
        screwSoundFile3,
        screwSoundFile4,
        screwSoundFile5,
        champagneSoundFile1,
        champagneSoundFile2,
        champagneSoundFile3,
        champagneSoundFile4,
        champagneSoundFile5,
      ],
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
      playLoseSound(useChampagneAssets);
      setGameOver(true);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between items-center relative">
      <div className="absolute bottom-0 w-full flex justify-center items-center z-10">
        <img src={currentAssets.bottle} alt="Bottle" className="transform scale-[1.5] w-auto h-auto" />
        {screws.map((position, index) => (
          <img
            key={index}
            src={currentAssets.screw}
            alt={`Screw ${index + 1}`}
            className="absolute transform scale-[1.5]"
            style={{ bottom: `${0 + position}px` }}
          />
        ))}
        <img
          src={currentAssets.cap}
          alt="Cap"
          onClick={() => {
            handleCapClick();
            playScrewSound(useChampagneAssets);
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
        <p className="text-white text-[15rem] font-bold opacity-20">{counter}</p>
      </div>

      {gameOver && <GameOverScreen message="Perdu..." onEndGame={onEndGame} />}
    </div>
  );
}
