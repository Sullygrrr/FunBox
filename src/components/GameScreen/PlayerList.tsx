import React from 'react';
import { Player } from '../../types';
import { formatPunishment } from '../../utils/punishments';

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="flex gap-2">
      {players.map((player, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
        >
          <div
            className="w-8 h-8 rounded-full mb-1"
            style={{ backgroundColor: player.color }}
          />
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">{player.name}</div>
            <div className="text-xs text-gray-500">
              {formatPunishment(player.punishment, player.amount)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}