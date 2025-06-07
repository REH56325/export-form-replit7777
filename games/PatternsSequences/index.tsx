import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const PatternsSequences = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [puzzles, setPuzzles] = useState(0);
  const { user } = useUser();

  const shapes = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];
  const animals = ['🐱', '🐶', '🐸', '🐰', '🐻', '🦊'];
  const objects = ['⭐', '❤️', '🌙', '🌟', '💫', '✨'];

  const generatePattern = () => {
    const patternTypes = [shapes, animals, objects];
    const selectedType = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    
    // Create simple patterns for 1st grade
    const patternLength = 3 + Math.floor(level / 2); // Start with 3, increase with level
    const newPattern: string[] = [];
    
    // Simple AB or ABC patterns
    const patternBase = selectedType.slice(0, 2 + Math.floor(level / 3)); // Start with 2 elements
    
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(patternBase[i % patternBase.length]);
    }
    
    setPattern(newPattern);
    
    // Create options for the next item in pattern
    const nextItem = patternBase[newPattern.length % patternBase.length];
    const wrongItems = selectedType.filter(item => item !== nextItem).slice(0, 3);
    const allOptions = [nextItem, ...wrongItems].sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setShowFeedback(false);
  };

  const checkAnswer = (selectedItem: string) => {
    const correctNext = pattern.length > 0 ? 
      pattern[0] === '🔴' || pattern[0] === '🔵' || pattern[0] === '🟡' || pattern[0] === '🟢' || pattern[0] === '🟣' || pattern[0] === '🟠' ? 
        shapes[pattern.length % (2 + Math.floor(level / 3))] :
      pattern[0] === '🐱' || pattern[0] === '🐶' || pattern[0] === '🐸' || pattern[0] === '🐰' || pattern[0] === '🐻' || pattern[0] === '🦊' ?
        animals[pattern.length % (2 + Math.floor(level / 3))] :
        objects[pattern.length % (2 + Math.floor(level / 3))]
      : '';

    if (selectedItem === correctNext) {
      setFeedback('🧩 Fantastic! You found the pattern!');
      setScore(score + 35);
      setPuzzles(puzzles + 1);
      
      if (puzzles + 1 >= 6) {
        setLevel(level + 1);
        setPuzzles(0);
      }
      
      setTimeout(() => {
        generatePattern();
      }, 2000);
    } else {
      setFeedback('🔍 Look at the pattern again - what comes next?');
    }
    setShowFeedback(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    generatePattern();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setPuzzles(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">🧩 Patterns & Sequences</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-indigo-600">Score: {score}</div>
            <div className="text-lg font-bold text-purple-600">Pattern Level: {level}</div>
            <div className="text-lg font-bold text-pink-600">
              Puzzles: {'🧩'.repeat(puzzles)} ({puzzles}/6)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">🔍 Learn About Patterns</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🧩 Look at the pattern and find what comes next!</p>
              <p>🔍 Patterns repeat in order: A-B-A-B or A-B-C-A-B-C</p>
              <p>🎯 Solve 6 patterns to advance to the next level!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🔍 Start Pattern Hunt!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="mb-8">
              <div className="text-2xl text-indigo-700 mb-6">🧩 What comes next in this pattern?</div>
              
              {/* Pattern display */}
              <div className="flex justify-center items-center space-x-4 mb-6 p-6 bg-gray-100 rounded-xl">
                {pattern.map((item, index) => (
                  <span key={index} className="text-5xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {item}
                  </span>
                ))}
                <span className="text-5xl text-gray-400">❓</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-4 gap-4 mb-6 max-w-md mx-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-4 rounded-xl text-4xl transition-all transform hover:scale-105 border-4 border-white shadow-lg"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Pattern hint */}
            <div className="mb-6 p-4 bg-indigo-100 rounded-xl">
              <div className="text-lg text-indigo-700 mb-2">💡 Pattern Hint:</div>
              <div className="text-sm text-gray-600">
                Look for what repeats! The pattern goes: {pattern.slice(0, 2).join(' - ')} - ? 
              </div>
            </div>

            {/* Puzzle collection */}
            <div className="mb-6 p-4 bg-pink-100 rounded-xl">
              <div className="text-lg text-purple-700 mb-2">🏆 Pattern Puzzles Solved:</div>
              <div className="flex justify-center flex-wrap">
                {Array(puzzles).fill('🧩').map((puzzle, i) => (
                  <span key={i} className="text-2xl m-1 animate-pulse">{puzzle}</span>
                ))}
                {Array(6 - puzzles).fill('⚫').map((spot, i) => (
                  <span key={i} className="text-2xl m-1 opacity-30">{spot}</span>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Fantastic') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Pattern Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternsSequences;