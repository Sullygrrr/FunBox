import React, { useState } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';
import { Theme } from '../types/theme';
import { GameMode } from '../types';
import { 
  getCustomQuestions, 
  removeCustomQuestion, 
  addCustomQuestion,
} from '../data/questions';
import { createMailtoLink } from '../utils/email';

interface QuestionManagerProps {
  theme: Theme;
  mode: GameMode;
}

export default function QuestionManager({ theme, mode }: QuestionManagerProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [customQuestions, setCustomQuestions] = useState(getCustomQuestions());

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const updatedQuestions = addCustomQuestion(newQuestion.trim());
      setCustomQuestions(updatedQuestions);
      setNewQuestion('');
    }
  };

  const handleRemoveCustomQuestion = (index: number) => {
    const updatedQuestions = removeCustomQuestion(index);
    setCustomQuestions(updatedQuestions);
  };

  const handleSubmitQuestions = () => {
    if (customQuestions.length === 0) return;
    
    const gameModeText = mode === 'simple' ? 'Simple Basique' : 
                        mode === 'minou' ? 'Par Minou' : 
                        mode === 'wheel' ? 'La Roue' : 'Mode Inconnu';
    
    const mailtoLink = createMailtoLink(customQuestions.join('\n\n'), gameModeText);
    window.location.href = mailtoLink;
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <form onSubmit={handleAddQuestion} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ajouter une question (utilise @joueur pour un joueur aléatoire)"
          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme.ring}`}
        />
        <button
          type="submit"
          className={`p-2 text-white rounded-md transition-colors ${theme.primary} ${theme.hover}`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {customQuestions.length > 0 && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSubmitQuestions}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors ${theme.primary} ${theme.hover}`}
            >
              <Send className="w-4 h-4" />
              Envoyer les questions
            </button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {customQuestions.map((question, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <span className="text-sm text-gray-700 flex-1 mr-2">{question}</span>
                <button
                  onClick={() => handleRemoveCustomQuestion(index)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}