import React from 'react';

const GameOverScreen = ({ message, onEndGame }: { message: string; onEndGame: () => void }) => (
  <div
    className="absolute inset-0 bg-black/0 flex items-center justify-center z-50 cursor-pointer"
    onClick={onEndGame}
  >
    <div className="text-center">
      <p className="text-white text-4xl font-display animate-fade-in">{message}</p>
    </div>
  </div>
);

export default GameOverScreen;
