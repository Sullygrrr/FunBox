import React from 'react';
import { Theme } from '../types/theme';
import { GameMode } from '../types';

interface GameModeDescriptionProps {
  mode: GameMode;
  onClose: () => void;
  theme: Theme;
}

export default function GameModeDescription({ mode, onClose, theme }: GameModeDescriptionProps) {
  const descriptions: Record<GameMode, { title: string; content: string }> = {
    simple: {
      title: "Simple, Basique",
      content: "Réponds aux questions, bois si tu refuses ! Les questions peuvent impliquer un ou plusieurs joueurs choisis aléatoirement. Parfait pour briser la glace et lancer la soirée !"
    },
    minou: {
      title: "Par Minou",
      content: "Vote secrètement pour désigner le joueur qui correspond le plus à la situation donnée. Le joueur avec le plus de votes devra assumer les conséquences !"
    },
    mime: {
      title: "Mime Time",
      content: "Fais deviner des mots ou des situations à tes amis sans parler ! Solo ou par équipes, j'ai déjà hâte de vous voir mimer le pingouin !"
    },
    wheel: {
      title: "La Roue",
      content: "Fais tourner la roue et laisse le hasard décider qui devra boire ! Simple mais efficace, parfait quand vous ne savez plus qui doit boire."
    },
    bottle: {
      title: "La Bouteille",
      content: "Choisis un nombre entre 1 et 20, puis clique sur le bouchon autant de fois. Si le bouchon ne saute pas, distribue autant de gorgées que ton nombre ! Mais si le bouchon saute... C'est toi qui bois tout !"
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none" 
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <h2 className={`text-2xl font-bold mb-4 ${theme.primary} bg-clip-text text-transparent`}>
          {descriptions[mode].title}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {descriptions[mode].content}
        </p>
      </div>
    </div>
  );
}