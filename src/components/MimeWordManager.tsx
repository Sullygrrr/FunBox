import React, { useState } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';
import { Theme } from '../types/theme';
import { 
  getCustomMimeWords,
  removeCustomMimeWord,
  addCustomMimeWord,
} from '../data/mimeWords';
import { createMailtoLink } from '../utils/email';

interface MimeWordManagerProps {
  theme: Theme;
}

export default function MimeWordManager({ theme }: MimeWordManagerProps) {
  const [newWord, setNewWord] = useState('');
  const [customWords, setCustomWords] = useState(getCustomMimeWords());

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

  const handleSubmitWords = () => {
    if (customWords.length === 0) return;
    const mailtoLink = createMailtoLink(customWords.join('\n\n'), 'Mode Mime');
    window.location.href = mailtoLink;
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
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
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSubmitWords}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors ${theme.primary} ${theme.hover}`}
            >
              <Send className="w-4 h-4" />
              Envoyer les mots
            </button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {customWords.map((word, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <span className="text-sm text-gray-700 flex-1 mr-2">{word}</span>
                <button
                  onClick={() => handleRemoveCustomWord(index)}
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