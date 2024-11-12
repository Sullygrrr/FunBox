import React from 'react';
import { Beer, Dumbbell, Wine } from 'lucide-react';
import { PunishmentLevel } from '../../types/punishments';

interface QuestionDisplayProps {
  question: string;
  punishment: PunishmentLevel;
}

export function QuestionDisplay({ question, punishment }: QuestionDisplayProps) {
  return (
    <>
      <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 mb-4 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <Wine className="w-6 h-6 mb-1" />
          <span className="text-sm font-medium">{punishment.shot} shots</span>
        </div>
        <div className="flex flex-col items-center">
          <Beer className="w-6 h-6 mb-1" />
          <span className="text-sm font-medium">{punishment.verre}</span>
        </div>
        <div className="flex flex-col items-center">
          <Dumbbell className="w-6 h-6 mb-1" />
          <span className="text-sm font-medium">{punishment.pompe} pompes</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8">
        <p 
          className="text-2xl text-center font-medium text-gray-800"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
    </>
  );
}