import React, { useState, useEffect } from 'react';

interface GrammarCastleAdventureProps {
  onScoreUpdate?: (score: number) => void;
}

const GrammarCastleAdventure: React.FC<GrammarCastleAdventureProps> = ({ onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [correctCategory, setCorrectCategory] = useState('');
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const words = {
    noun: ['castle', 'wizard', 'dragon', 'princess', 'sword', 'treasure', 'tower', 'knight'],
    verb: ['run', 'jump', 'fly', 'sing', 'dance', 'write', 'read', 'play'],
    adjective: ['happy', 'big', 'colorful', 'magical', 'brave', 'strong', 'beautiful', 'scary']
  };

  const generateWord = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const wordList = words[category as keyof typeof words];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    
    setCurrentWord(word);
    setCorrectCategory(category);
    setFeedback('');
  };

  const checkAnswer = (selectedCategory: string) => {
    if (selectedCategory === correctCategory) {
      setScore(score + 10);
      setFeedback('🏰 Excellent! You unlocked the next room!');
      onScoreUpdate?.(score + 10);
      if (score + 10 >= level * 50) {
        setLevel(level + 1);
        setFeedback('🎉 Level Up! You conquered another floor!');
      }
      setTimeout(() => generateWord(), 1500);
    } else {
      setFeedback(`🧙‍♂️ Not quite! "${currentWord}" is a ${correctCategory}.`);
      setTimeout(() => generateWord(), 2500);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateWord();
  };

  useEffect(() => {
    if (!gameStarted) return;
    generateWord();
  }, [gameStarted]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-black/30 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4">🏰 Grammar Castle Adventure</h1>
          <p className="text-xl mb-6">Help the wizard sort words into the correct grammar rooms!</p>
          <button 
            onClick={startGame}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
          >
            Enter Castle! 🧙‍♂️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-indigo-800 relative overflow-hidden">
      {/* Castle background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="text-9xl">🏰</div>
        </div>
      </div>

      {/* Score and level */}
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        Score: {score} | Level: {level} 🏰
      </div>

      {/* Wizard */}
      <div className="absolute top-10 right-10 text-6xl animate-bounce">🧙‍♂️</div>

      {/* Main game area */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Current word */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-2xl">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Sort this word into the correct room:
            </div>
            <div className="text-6xl font-bold text-purple-800 mb-6">
              {currentWord}
            </div>
          </div>

          {/* Grammar category buttons */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <button
              onClick={() => checkAnswer('noun')}
              className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-4xl mb-2">🏠</div>
              <div>NOUN</div>
              <div className="text-sm">Person, Place, Thing</div>
            </button>
            
            <button
              onClick={() => checkAnswer('verb')}
              className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-4xl mb-2">🏃</div>
              <div>VERB</div>
              <div className="text-sm">Action Word</div>
            </button>
            
            <button
              onClick={() => checkAnswer('adjective')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-4xl mb-2">✨</div>
              <div>ADJECTIVE</div>
              <div className="text-sm">Describing Word</div>
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-yellow-400/90 backdrop-blur-sm text-gray-800 text-2xl font-bold p-4 rounded-lg animate-bounce">
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Magical sparkles */}
      <div className="absolute top-1/4 left-10 text-2xl animate-pulse">✨</div>
      <div className="absolute top-1/3 right-20 text-3xl animate-bounce">⭐</div>
      <div className="absolute bottom-1/4 left-1/4 text-2xl animate-pulse">🌟</div>
    </div>
  );
};

export default GrammarCastleAdventure;