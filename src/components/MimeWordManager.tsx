import React, { useState } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';
import { Theme } from '../types/theme';
import { 
  defaultMimeWords,
  getCustomMimeWords, 
  removeCustomMimeWord, 
  addCustomMimeWord,
  getDisabledDefaultMimeWords,
  toggleDefaultMimeWord
} from '../data/mimeWords';
import { sendQuestionSuggestionEmail } from '../utils/email';

interface MimeWordManagerProps {
  theme: Theme;
}

export default function MimeWordManager({ theme }: MimeWordManagerProps) {
  const [newWord, setNewWord] = useState('');
  const [customWords, setCustomWords] = useState(getCustomMimeWords());
  const [disabledWords, setDisabledWords] = useState(getDisabledDefaultMimeWords());
  const [activeTab, setActiveTab] = useState<'default' | 'custom'>('default');
  const [submitting, setSubmitting] = useState(false);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim()) {
      const updatedWords = addCustomMimeWord(newWord.trim());
      setCustomWords(updatedWords);
      setNewWord('');
    }
  };

  const handleRemoveCustomWord = (index: number) => {
    const updatedWords = removeCustomMimeWord(index);
    setCustomWords(updatedWords);
  };

  const handleToggleDefaultWord = (index: number) => {
    const isDisabled = disabledWords.includes(index);
    const updatedDisabled = isDisabled 
      ? disabledWords.filter(i => i !== index)
      : [...disabledWords, index];
    
    setDisabledWords(updatedDisabled);
    toggleDefaultMimeWord(index);
  };

  const handleSubmitWords = async () => {
    if (customWords.length === 0) return;
    
    setSubmitting(true);
    try {
      await sendQuestionSuggestionEmail(customWords.join('\n\n'), 'Mode Mime');
      alert('Mots soumis avec succès !');
    } catch (error) {
      console.error('Error submitting words:', error);
      alert('Erreur lors de la soumission des mots');
    } finally {
      setSubmitting(false);
    }
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
          Mots par défaut
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            activeTab === 'custom' 
              ? `${theme.primary} text-white` 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          Mots personnalisés
        </button>
      </div>

      {activeTab === 'custom' && (
        <>
          <form onSubmit={handleAddWord} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="Ajouter un mot ou une phrase à mimer"
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme.ring}`}
            />
            <button
              type="submit"
              className={`p-2 text-white rounded-md transition-colors ${theme.primary} ${theme.hover}`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          {customWords.length > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleSubmitWords}
                disabled={submitting}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors ${theme.primary} ${theme.hover} disabled:opacity-50`}
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Envoi...' : 'Soumettre les mots au créateur'}
              </button>
            </div>
          )}
        </>
      )}

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {activeTab === 'default' ? (
          defaultMimeWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleToggleDefaultWord(index)}
              className={`w-full text-left p-4 rounded-lg transition-all hover:scale-[1.02] ${
                disabledWords.includes(index)
                  ? 'bg-gray-100 text-gray-400'
                  : `${theme.primary} text-white hover:bg-opacity-90`
              }`}
            >
              <span className="text-sm">{word}</span>
            </button>
          ))
        ) : (
          customWords.map((word, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
              <span className="text-sm text-gray-700 flex-1 mr-2">{word}</span>
              <button
                onClick={() => handleRemoveCustomWord(index)}
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