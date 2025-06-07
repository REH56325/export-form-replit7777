import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const RhymingRockets = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [rockets, setRockets] = useState(0);
  const { user } = useUser();

  // Rhyming word pairs for 1st grade
  const rhymingPairs = [
    { word: 'cat', rhymes: ['bat', 'hat', 'mat', 'rat'] },
    { word: 'dog', rhymes: ['log', 'frog', 'hog', 'jog'] },
    { word: 'sun', rhymes: ['run', 'fun', 'bun', 'gun'] },
    { word: 'red', rhymes: ['bed', 'led', 'fed', 'wed'] },
    { word: 'big', rhymes: ['pig', 'fig', 'wig', 'dig'] },
    { word: 'top', rhymes: ['hop', 'mop', 'pop', 'stop'] },
    { word: 'hen', rhymes: ['pen', 'ten', 'men', 'den'] },
    { word: 'box', rhymes: ['fox', 'sox', 'rocks', 'locks'] },
    { word: 'cup', rhymes: ['pup', 'up', 'sup', 'tup'] },
    { word: 'bee', rhymes: ['see', 'tree', 'free', 'key'] }
  ];

  const generateProblem = () => {
    const randomPair = rhymingPairs[Math.floor(Math.random() * rhymingPairs.length)];
    const correctRhyme = randomPair.rhymes[Math.floor(Math.random() * randomPair.rhymes.length)];
    
    // Create wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomWord = rhymingPairs[Math.floor(Math.random() * rhymingPairs.length)];
      const wrongOption = randomWord.rhymes[Math.floor(Math.random() * randomWord.rhymes.length)];
      
      if (!randomPair.rhymes.includes(wrongOption) && !wrongOptions.includes(wrongOption)) {
        wrongOptions.push(wrongOption);
      }
    }

    // Shuffle options
    const allOptions = [correctRhyme, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setTargetWord(randomPair.word);
    setOptions(allOptions);
    setShowFeedback(false);
  };

  const checkAnswer = (selectedWord: string) => {
    const correctPair = rhymingPairs.find(pair => pair.word === targetWord);
    
    if (correctPair && correctPair.rhymes.includes(selectedWord)) {
      setFeedback('🚀 Blast off! Perfect rhyme!');
      setScore(score + 25);
      setRockets(rockets + 1);
      
      if (rockets + 1 >= 8) {
        setLevel(level + 1);
        setRockets(0);
      }
      
      setTimeout(() => {
        generateProblem();
      }, 2000);
    } else {
      setFeedback('🌟 Try again, space explorer!');
    }
    setShowFeedback(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    generateProblem();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setRockets(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-800 to-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-yellow-300 mb-2">🚀 Rhyming Rockets</h1>
          <div className="flex justify-center items-center space-x-6 bg-gray-900 rounded-full p-4 shadow-lg border-2 border-yellow-400">
            <div className="text-lg font-bold text-yellow-300">Score: {score}</div>
            <div className="text-lg font-bold text-blue-300">Mission: {level}</div>
            <div className="text-lg font-bold text-pink-300">
              Rockets: {'🚀'.repeat(rockets)} ({rockets}/8)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-gray-900 border-2 border-blue-400 rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">🌌 Space Mission Instructions</h2>
            <div className="text-lg text-gray-300 space-y-2">
              <p>🚀 Find words that rhyme to launch rockets!</p>
              <p>⭐ Launch 8 rockets to complete your mission!</p>
              <p>🎯 Listen carefully for words that sound alike!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🚀 Launch Mission!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-gray-900 border-2 border-purple-400 rounded-xl p-8 shadow-lg text-center">
            <div className="mb-8">
              <div className="text-2xl text-yellow-300 mb-4">🌟 Find a word that rhymes with:</div>
              <div className="text-6xl font-bold text-pink-400 mb-6 animate-pulse">
                {targetWord}
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-2xl transition-all transform hover:scale-105 border-2 border-blue-400 hover:border-yellow-400"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Space scene */}
            <div className="mb-6 p-4 bg-black rounded-xl border-2 border-gray-600">
              <div className="text-lg text-yellow-300 mb-2">🌌 Your Space Fleet:</div>
              <div className="flex justify-center flex-wrap">
                {Array(rockets).fill('🚀').map((rocket, i) => (
                  <span key={i} className="text-2xl m-1 animate-bounce">{rocket}</span>
                ))}
                {Array(8 - rockets).fill('⚫').map((spot, i) => (
                  <span key={i} className="text-2xl m-1 opacity-50">{spot}</span>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Mission Progress: {rockets}/8 rockets launched
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Blast off') ? 'bg-green-900 text-green-300 border-2 border-green-400' : 'bg-yellow-900 text-yellow-300 border-2 border-yellow-400'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-all border-2 border-gray-400"
              >
                🔄 New Mission
              </button>
            </div>
          </div>
        )}

        {/* Floating stars decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array(20).fill('⭐').map((star, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 opacity-30 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {star}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RhymingRockets;