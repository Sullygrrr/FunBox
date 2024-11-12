import React, { useState, useCallback } from 'react';
import { Home, RefreshCw, ArrowRight, GripHorizontal } from 'lucide-react';
import { Player } from '../types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getRandomPunishmentLevel } from '../utils/punishments';
import { defaultQuestions } from '../data/questions';

interface WhoAmongUsProps {
  players: Player[];
  onEndGame: () => void;
}

interface Vote {
  voter: Player;
  votedFor: Player;
}

export default function WhoAmongUs({ players, onEndGame }: WhoAmongUsProps) {
  const [gamePhase, setGamePhase] = useState<'setup' | 'voting' | 'reveal'>('setup');
  const [host, setHost] = useState<Player | null>(null);
  const [orderedPlayers, setOrderedPlayers] = useState<Player[]>(players);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [revealedVotes, setRevealedVotes] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentPunishment, setCurrentPunishment] = useState(getRandomPunishmentLevel());
  const [isSaved, setIsSaved] = useState<boolean | null>(null);

  const startGame = () => {
    if (!host) return;
    const randomIndex = Math.floor(Math.random() * defaultQuestions.length);
    setCurrentQuestion(defaultQuestions[randomIndex]);
    setGamePhase('voting');
    setCurrentVoterIndex(orderedPlayers.findIndex(p => p === host));
  };

  const handleVote = (votedFor: Player) => {
    const voter = orderedPlayers[currentVoterIndex];
    setVotes([...votes, { voter, votedFor }]);

    if (currentVoterIndex === orderedPlayers.length - 1) {
      setGamePhase('reveal');
    } else {
      setCurrentVoterIndex((currentVoterIndex + 1) % orderedPlayers.length);
    }
  };

  const revealNextVote = () => {
    if (revealedVotes < votes.length) {
      setRevealedVotes(revealedVotes + 1);
    }
  };

  const getMostVotedPlayer = () => {
    const voteCounts = new Map<Player, number>();
    votes.forEach(vote => {
      const count = voteCounts.get(vote.votedFor) || 0;
      voteCounts.set(vote.votedFor, count + 1);
    });
    return Array.from(voteCounts.entries()).reduce((a, b) => 
      (a[1] > b[1] ? a : b))[0];
  };

  const startNewRound = () => {
    setVotes([]);
    setRevealedVotes(0);
    setIsSaved(null);
    setCurrentPunishment(getRandomPunishmentLevel());
    const randomIndex = Math.floor(Math.random() * defaultQuestions.length);
    setCurrentQuestion(defaultQuestions[randomIndex]);
    setGamePhase('voting');
    setCurrentVoterIndex(orderedPlayers.findIndex(p => p === host));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(orderedPlayers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setOrderedPlayers(items);
  };

  // ... (rest of the setup phase JSX remains the same)

  if (gamePhase === 'reveal') {
    const stackHeight = 400;
    const mostVotedPlayer = getMostVotedPlayer();
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="relative mb-8" style={{ height: stackHeight }}>
            <div className="perspective-1000">
              {votes.slice(0, revealedVotes).map((vote, index) => {
                const isTop = index === revealedVotes - 1;
                const zIndex = votes.length - index;
                const translateY = isTop ? 0 : stackHeight + (index * 20);
                
                return (
                  <div
                    key={index}
                    className={`absolute inset-x-0 top-0 bg-white rounded-lg shadow-lg preserve-3d cursor-pointer
                      ${isTop ? 'hover:rotate-x-2' : ''}`}
                    style={{
                      height: '150px',
                      transform: `translateY(${translateY}px) rotate(${index % 2 ? 1 : -1}deg)`,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex,
                    }}
                    onClick={revealNextVote}
                  >
                    <div className="h-full flex flex-col items-center justify-center p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: vote.votedFor.color }}
                        />
                        <span className="text-xl text-gray-800">
                          {vote.votedFor.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Vote de {vote.voter.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {revealedVotes === votes.length && (
            <div className="text-center mb-8 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {mostVotedPlayer.name} a reçu le plus de votes !
              </h3>
              {isSaved === null && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsSaved(true)}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Sauver
                  </button>
                  <button
                    onClick={() => setIsSaved(false)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Punir
                  </button>
                </div>
              )}
              {isSaved !== null && (
                <p className="text-gray-600 mt-4">
                  {isSaved
                    ? `Tout le monde sauf ${mostVotedPlayer.name} boit ${currentPunishment.verre}`
                    : `${mostVotedPlayer.name} doit ${
                        mostVotedPlayer.punishment === 'verre'
                          ? currentPunishment.verre
                          : `${currentPunishment[mostVotedPlayer.punishment]} ${mostVotedPlayer.punishment}${
                              currentPunishment[mostVotedPlayer.punishment] > 1 ? 's' : ''
                            }`
                      }`}
                </p>
              )}
            </div>
          )}

          {revealedVotes === votes.length && isSaved !== null && (
            <div className="flex gap-4">
              <button
                onClick={onEndGame}
                className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Fin
              </button>
              <button
                onClick={startNewRound}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Nouvelle question
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}