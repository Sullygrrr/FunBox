import { useState, useEffect } from 'react';
import { Player } from '../types';

const STORAGE_KEY = 'activePlayers';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };

  const removePlayer = (index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index));
  };

  const clearPlayers = () => {
    setPlayers([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    players,
    addPlayer,
    removePlayer,
    clearPlayers
  };
}