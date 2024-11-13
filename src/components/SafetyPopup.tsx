import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Theme } from '../types/theme';

interface SafetyPopupProps {
  onClose: () => void;
  theme: Theme;
}

export default function SafetyPopup({ onClose, theme }: SafetyPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-bold">Message de prévention</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <p>
            L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </p>
          <p>
            Ce jeu est destiné à un public majeur et responsable. Il ne doit en aucun cas encourager une consommation excessive d'alcool.
          </p>
          <p>
            Rappels importants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ne conduisez pas après avoir bu</li>
            <li>Hydratez-vous régulièrement avec de l'eau</li>
            <li>Mangez avant et pendant la consommation d'alcool</li>
            <li>Respectez vos limites et celles des autres</li>
            <li>Gardez toujours un ami sobre dans le groupe</li>
          </ul>
          <p className="text-sm">
            Le créateur et l'application déclinent toute responsabilité quant aux conséquences directes ou indirectes liées à l'utilisation de ce jeu.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className={`w-full py-3 text-white rounded-lg transition-colors ${theme.primary} ${theme.hover}`}
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
}