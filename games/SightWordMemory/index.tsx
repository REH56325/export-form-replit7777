import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Card {
  id: number;
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SightWordMemory = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [stars, setStars] = useState(0);
  const { user } = useUser();

  // Common sight words for 1st grade
  const sightWords = [
    'the', 'and', 'a', 'to', 'said', 'you', 'it', 'he', 'was', 'for',
    'on', 'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this',
    'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what'
  ];

  const createCards = () => {
    const wordsForLevel = sightWords.slice(0, Math.min(6, 4 + level));
    const cardPairs: string[] = [];
    
    wordsForLevel.forEach(word => {
      cardPairs.push(word, word);
    });

    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((word, index) => ({
        id: index,
        word,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      if (cards[firstId].word === cards[secondId].word) {
        // Match found!
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
          setScore(score + 50);
          setStars(stars + 1);

          // Check if all matches found
          if (matches + 1 === Math.floor(newCards.length / 2)) {
            setTimeout(() => {
              setLevel(level + 1);
              createCards();
            }, 1000);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    createCards();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setStars(0);
    setMatches(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-teal-200 to-green-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">🧠 Sight Word Memory</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-teal-600">Level: {level}</div>
            <div className="text-lg font-bold text-yellow-600">
              Stars: {'⭐'.repeat(Math.min(stars, 10))} ({stars})
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">🎯 How to Play Memory</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🃏 Click cards to flip them and find matching pairs!</p>
              <p>👀 Remember where each sight word is located!</p>
              <p>⭐ Match all pairs to move to the next level!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🎮 Start Memory Game!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            {/* Animated memory game header */}
            <div className="mb-6">
              <svg width="300" height="100" className="mx-auto" viewBox="0 0 300 100">
                <rect width="300" height="100" fill="#E0F2FE" rx="15"/>
                <rect x="20" y="20" width="40" height="60" fill="#3B82F6" rx="8" className="animate-pulse"/>
                <rect x="80" y="20" width="40" height="60" fill="#10B981" rx="8" className="animate-bounce"/>
                <rect x="140" y="20" width="40" height="60" fill="#F59E0B" rx="8" className="animate-pulse"/>
                <rect x="200" y="20" width="40" height="60" fill="#EF4444" rx="8" className="animate-bounce"/>
                <text x="150" y="95" textAnchor="middle" fill="#1E40AF" className="text-sm font-bold">🧠 Memory Challenge!</text>
              </svg>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-xl font-bold text-gray-700 animate-bounce">
                Matches Found: {matches} / {Math.floor(cards.length / 2)}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className={`
                    aspect-square rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105
                    ${card.isMatched 
                      ? 'bg-green-200 border-4 border-green-400' 
                      : card.isFlipped 
                        ? 'bg-yellow-200 border-4 border-yellow-400' 
                        : 'bg-blue-200 border-4 border-blue-400 hover:bg-blue-300'
                    }
                  `}
                >
                  <div className="h-full flex items-center justify-center">
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-2xl font-bold text-gray-800">
                        {card.word}
                      </span>
                    ) : (
                      <span className="text-4xl">
                        {card.isMatched ? '✅' : '❓'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 text-center">
              <div className="text-lg font-bold text-gray-600 mb-2">
                Level {level} Progress:
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
                <div 
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(matches / Math.floor(cards.length / 2)) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SightWordMemory;