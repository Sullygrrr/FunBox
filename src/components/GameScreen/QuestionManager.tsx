import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface QuestionManagerProps {
  customQuestions: string[];
  newQuestion: string;
  onNewQuestionChange: (value: string) => void;
  onAddQuestion: (e: React.FormEvent) => void;
  onRemoveQuestion: (index: number) => void;
}

export function QuestionManager({
  customQuestions,
  newQuestion,
  onNewQuestionChange,
  onAddQuestion,
  onRemoveQuestion
}: QuestionManagerProps) {
  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-3">Questions personnalisées</h3>
      <form onSubmit={onAddQuestion} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => onNewQuestionChange(e.target.value)}
          placeholder="Ajouter une question (utilise @joueur pour un joueur aléatoire)"
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="p-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
      {customQuestions.length > 0 && (
        <div className="space-y-2">
          {customQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
              <span className="text-sm text-gray-700">{question}</span>
              <button
                onClick={() => onRemoveQuestion(index)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}