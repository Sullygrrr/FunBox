import React, { useState } from 'react';
import { Beer, Dumbbell, Wine } from 'lucide-react';
import { Player } from '../types';
import { Theme } from '../types/theme';

const COLORS = [
  '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
  '#EC4899', '#EF4444', '#06B6D4', '#14B8A6'
];

const PUNISHMENTS = [
  { label: 'Shots', value: 'shots', icon: Wine },
  { label: 'Verres', value: 'verre', icon: Beer },
  { label: 'Pompes', value: 'pompes', icon: Dumbbell }
];

interface PlayerSetupProps {
  onAdd: (player: Player) => void;
  onCancel: () => void;
  usedColors: string[];
  usedNames: string[];
  theme: Theme;
}

export default function PlayerSetup({ onAdd, onCancel, usedColors, usedNames, theme }: PlayerSetupProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS.find(c => !usedColors.includes(c)) || COLORS[0]);
  const [punishment, setPunishment] = useState<'shots' | 'verre' | 'pompes'>('shots');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      if (usedNames.includes(trimmedName)) {
        setError('Ce nom est déjà pris !');
        return;
      }
      onAdd({ 
        name: trimmedName, 
        color, 
        punishment,
        amount: 0
      });
      setName('');
      setColor(COLORS.find(c => !usedColors.includes(c)) || COLORS[0]);
      setError('');
    }
  };

  const availableColors = COLORS.filter(c => !usedColors.includes(c));

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-white/50 animate-fade-in">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Blaz
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.ring} ${
            error ? 'border-red-500' : `border-${theme.borderColor}`
          } bg-white/90 transition-colors`}
          placeholder="Entre ton blaz"
          required
        />
        {error && <p className="mt-1 text-sm text-red-500 animate-fade-in">{error}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choisis ta couleur
        </label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                color === c ? `scale-110 ring-2 ring-offset-2 ${theme.ring}` : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de punition
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PUNISHMENTS.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setPunishment(value as 'shots' | 'verre' | 'pompes')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all hover:scale-105 ${
                punishment === value 
                  ? `${theme.primary} text-white ring-2 ${theme.ring} ring-offset-2`
                  : `bg-white hover:bg-opacity-75 ${theme.hover}`
              }`}
            >
              <Icon className={`w-6 h-6 ${punishment === value ? 'text-white' : ''}`} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className={`flex-1 text-white px-4 py-2 rounded-md transition-all hover:scale-105 ${theme.primary} ${theme.hover}`}
        >
          Ajouter
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 border rounded-md transition-all hover:scale-105 hover:bg-gray-100 border-${theme.borderColor}`}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}