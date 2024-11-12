import React from 'react';
import { gameModes } from '../data/gameModes';
import { GameMode } from '../types';
import { Theme } from '../types/theme';

interface GameModeSelectorProps {
  onSelect: (mode: GameMode) => void;
  theme: Theme;
}

export default function GameModeSelector({ onSelect, theme }: GameModeSelectorProps) {
  return (
    <div className="grid gap-4">
      {gameModes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelect(mode.id)}
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
    </div>
  );
}