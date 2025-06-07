import React, { useState, useEffect } from 'react';

interface SuperheroSightWordsProps {
  onScoreUpdate?: (score: number) => void;
}

const SuperheroSightWords: React.FC<SuperheroSightWordsProps> = ({ onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [power, setPower] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const sightWords = [
    'the', 'and', 'to', 'a', 'said', 'you', 'he', 'it', 'in', 'was',
    'his', 'that', 'she', 'for', 'on', 'they', 'with', 'be', 'at', 'have',
    'this', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what',
    'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'each', 'which'
  ];

  const generateWord = () => {
    const targetWord = sightWords[Math.floor(Math.random() * sightWords.length)];
    setCurrentWord(targetWord);
    
    // Generate wrong options
    const wrongWords = sightWords
      .filter(word => word !== targetWord)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [targetWord, ...wrongWords].sort(() => Math.random() - 0.5);
    setWordOptions(allOptions);
    setFeedback('');
  };

  const checkAnswer = (selectedWord: string) => {
    if (selectedWord === currentWord) {
      setScore(score + 10);
      setPower(power + 25);
      setFeedback('💪 Super! You powered up your reading abilities!');
      onScoreUpdate?.(score + 10);
      setTimeout(() => generateWord(), 1200);
    } else {
      setFeedback(`🦸‍♂️ Try again hero! The word is "${currentWord}"`);
      setTimeout(() => generateWord(), 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateWord();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-purple-600 to-red-600 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-black/30 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4">🦸‍♂️ Superhero Sight Words</h1>
          <p className="text-xl mb-6">Join the Sight Word Squad and save the city with your reading powers!</p>
          <button 
            onClick={startGame}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
          >
            Activate Powers! ⚡
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-purple-600 to-red-600 relative overflow-hidden">
      {/* City skyline */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-800 to-transparent">
        <div className="absolute bottom-0 flex justify-around w-full">
          <div className="w-16 h-32 bg-gray-700"></div>
          <div className="w-12 h-24 bg-gray-600"></div>
          <div className="w-20 h-36 bg-gray-700"></div>
          <div className="w-14 h-28 bg-gray-600"></div>
        </div>
      </div>

      {/* Score and power */}
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        Score: {score} | Power: {power}% ⚡
      </div>

      {/* Flying superhero */}
      <div className="absolute top-10 right-10 text-6xl animate-bounce">🦸‍♂️</div>

      {/* Main game area */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Current word display */}
          <div className="bg-yellow-400/90 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-2xl border-4 border-yellow-600">
            <div className="text-2xl font-bold text-blue-900 mb-4">
              Superhero Mission: Read this word!
            </div>
            <div className="text-8xl font-bold text-red-700 animate-pulse">
              {currentWord}
            </div>
          </div>

          {/* Word options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {wordOptions.map((word, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(word)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-3xl font-bold transition-all transform hover:scale-105 shadow-lg border-4 border-blue-700"
              >
                <div className="text-4xl mb-2">⚡</div>
                <div>{word}</div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-green-500/90 backdrop-blur-sm text-white text-2xl font-bold p-4 rounded-lg animate-bounce">
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Power effects */}
      <div className="absolute top-1/4 left-10 text-3xl animate-pulse">⚡</div>
      <div className="absolute top-1/3 right-20 text-2xl animate-bounce">💥</div>
      <div className="absolute bottom-1/4 left-1/4 text-4xl animate-pulse">⭐</div>
    </div>
  );
};

export default SuperheroSightWords;