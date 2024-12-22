import React from 'react';
import { Player } from '../../types';

interface PlayerVoteListProps {
  players: Player[];
  currentVoter: Player;
  onVote: (player: Player) => void;
}

export default function PlayerVoteList({ players, currentVoter, onVote }: PlayerVoteListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player) => (
        <button
          key={player.name}
          onClick={() => onVote(player)}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
          disabled={player === currentVoter}
        >
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: player.color }}
          />
          <span className="font-medium text-gray-800">{player.name}</span>
        </button>
      ))}
    </div>
  );
}