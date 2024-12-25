import React, { useState } from 'react';
import { gameModes } from '../data/gameModes';
import { GameMode } from '../types';
import { Theme } from '../types/theme';
import GameModeDescription from './GameModeDescription';

interface GameModeSelectorProps {
  onSelect: (mode: GameMode) => void;
  theme: Theme;
}

let longPressTimer: NodeJS.Timeout;

export default function GameModeSelector({ onSelect, theme }: GameModeSelectorProps) {
  const [showDescription, setShowDescription] = useState<GameMode | null>(null);

  const handleMouseDown = (mode: GameMode) => {
    longPressTimer = setTimeout(() => {
      setShowDescription(mode);
    }, 500); // Affiche après 500ms d'appui
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimer);
  };

  const handleTouchStart = (mode: GameMode) => {
    longPressTimer = setTimeout(() => {
      setShowDescription(mode);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  return (
    <div className="grid gap-4">
      {gameModes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelect(mode.id)}
          onMouseDown={() => handleMouseDown(mode.id)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleTouchStart(mode.id)}
          onTouchEnd={handleTouchEnd}
          className={`bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:bg-white/95 transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:ring-2 ${theme.ring} ring-offset-2`}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{mode.emoji}</span>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">{mode.title}</h3>
              <p className="text-sm text-gray-600">{mode.description}</p>
            </div>
          </div>
        </button>
      ))}

      {showDescription && (
        <GameModeDescription
          mode={showDescription}
          onClose={() => setShowDescription(null)}
          theme={theme}
        />
      )}
    </div>
  );
}