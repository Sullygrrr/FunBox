import React, { useState, useRef } from 'react';
import { gameModes } from '../data/gameModes';
import { GameMode } from '../types';
import { Theme } from '../types/theme';
import GameModeDescription from './GameModeDescription';

interface GameModeSelectorProps {
  onSelect: (mode: GameMode) => void;
  theme: Theme;
}

export default function GameModeSelector({ onSelect, theme }: GameModeSelectorProps) {
  const [showDescription, setShowDescription] = useState<GameMode | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout>();
  const isDraggingRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = (mode: GameMode, e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    isDraggingRef.current = false;

    longPressTimeoutRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        setShowDescription(mode);
      }
    }, 500);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - startPosRef.current.x);
    const deltaY = Math.abs(touch.clientY - startPosRef.current.y);

    if (deltaX > 10 || deltaY > 10) {
      isDraggingRef.current = true;
      clearTimeout(longPressTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeoutRef.current);
  };

  const handleMouseDown = (mode: GameMode) => {
    longPressTimeoutRef.current = setTimeout(() => {
      setShowDescription(mode);
    }, 500);
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimeoutRef.current);
  };

  return (
    <div className="grid gap-4">
      {gameModes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelect(mode.id)}
          onTouchStart={(e) => handleTouchStart(mode.id, e)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleMouseDown(mode.id)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
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