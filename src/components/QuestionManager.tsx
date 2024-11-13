import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { 
  defaultQuestions,
  getCustomQuestions, 
  removeCustomQuestion, 
  addCustomQuestion,
  getDisabledDefaultQuestions,
  toggleDefaultQuestion
} from '../data/questions';
import { Theme } from '../types/theme';
import { GameMode } from '../types';
import { sendQuestionSuggestionEmail } from '../utils/email';

interface QuestionManagerProps {
  theme: Theme;
  mode: GameMode;
}

export default function QuestionManager({ theme, mode }: QuestionManagerProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [customQuestions, setCustomQuestions] = useState(getCustomQuestions());
  const [disabledQuestions, setDisabledQuestions] = useState<number[]>(() => {
    const saved = localStorage.getItem('disabledDefaultQuestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'default' | 'custom'>('default');

  useEffect(() => {
    localStorage.setItem('disabledDefaultQuestions', JSON.stringify(disabledQuestions));
  }, [disabledQuestions]);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const updatedQuestions = addCustomQuestion(newQuestion.trim());
      setCustomQuestions(updatedQuestions);
      
      const gameModeText = mode === 'simple' ? 'Simple Basique' : 
                          mode === 'minou' ? 'Par Minou' : 
                          mode === 'wheel' ? 'La Roue' : 'Mode Inconnu';
      
      await sendQuestionSuggestionEmail(newQuestion.trim(), gameModeText);
      setNewQuestion('');
    }
  };

  const handleRemoveCustomQuestion = (index: number) => {
    const updatedQuestions = removeCustomQuestion(index);
    setCustomQuestions(updatedQuestions);
  };

  const handleToggleDefaultQuestion = (index: number) => {
    const isDisabled = disabledQuestions.includes(index);
    const updatedDisabled = isDisabled 
      ? disabledQuestions.filter(i => i !== index)
      : [...disabledQuestions, index];
    
    setDisabledQuestions(updatedDisabled);
    toggleDefaultQuestion(index);
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('default')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            activeTab === 'default' 
              ? `${theme.primary} text-white` 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          Questions par défaut
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            activeTab === 'custom' 
              ? `${theme.primary} text-white` 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          Questions personnalisées
        </button>
      </div>

      {activeTab === 'custom' && (
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
      )}

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {activeTab === 'default' ? (
          defaultQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
              <span className="text-sm text-gray-700 flex-1 mr-2">{question}</span>
              <button
                onClick={() => handleToggleDefaultQuestion(index)}
                className={`p-1 transition-colors ${
                  disabledQuestions.includes(index) 
                    ? 'text-gray-400 hover:text-gray-600' 
                    : `${theme.primary} text-white`
                }`}
              >
                {disabledQuestions.includes(index) ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          ))
        ) : (
          customQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
              <span className="text-sm text-gray-700 flex-1 mr-2">{question}</span>
              <button
                onClick={() => handleRemoveCustomQuestion(index)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}