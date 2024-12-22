import React from 'react';
import { Check } from 'lucide-react';

interface VoteConfirmationProps {
  show: boolean;
  onAnimationEnd: () => void;
}

export default function VoteConfirmation({ show, onAnimationEnd }: VoteConfirmationProps) {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      onAnimationEnd={onAnimationEnd}
    >
      <div className="bg-green-500 text-white rounded-full p-8 animate-vote-confirmation">
        <Check className="w-16 h-16" />
      </div>
    </div>
  );
}