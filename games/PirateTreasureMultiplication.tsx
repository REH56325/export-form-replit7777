import React, { useState, useEffect } from 'react';

interface PirateTreasureMultiplicationProps {
  onScoreUpdate?: (score: number) => void;
}

const PirateTreasureMultiplication: React.FC<PirateTreasureMultiplicationProps> = ({ onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 });
  const [treasureChests, setTreasureChests] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [coins, setCoins] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
    const num2 = Math.floor(Math.random() * 5) + 1; // 1-5
    const correctAnswer = num1 * num2;
    
    // Generate 4 treasure chests with different answers
    const wrongAnswers: number[] = [];
    while (wrongAnswers.length < 3) {
      const wrong = Math.floor(Math.random() * 25) + 1;
      if (wrong !== correctAnswer && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }
    
    const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    setCurrentProblem({ num1, num2 });
    setTreasureChests(allAnswers);
    setFeedback('');
  };

  const checkAnswer = (selectedAnswer: number) => {
    const correctAnswer = currentProblem.num1 * currentProblem.num2;
    
    if (selectedAnswer === correctAnswer) {
      setScore(score + 15);
      setCoins(coins + 3);
      setFeedback('🏴‍☠️ Arrr! Ye found the treasure, matey!');
      onScoreUpdate?.(score + 15);
      setTimeout(() => generateProblem(), 1500);
    } else {
      setFeedback(`⚓ Not quite, matey! The treasure has ${correctAnswer} coins!`);
      setTimeout(() => generateProblem(), 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateProblem();
  };

  useEffect(() => {
    if (!gameStarted) return;
    generateProblem();
  }, [gameStarted]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-black/30 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4">🏴‍☠️ Pirate Treasure Multiplication</h1>
          <p className="text-xl mb-6">Help Captain Multiply find the buried treasure!</p>
          <button 
            onClick={startGame}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
          >
            Set Sail! ⚓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 relative overflow-hidden">
      {/* Ocean waves animation */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900 to-transparent">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-700 rounded-full animate-pulse"></div>
      </div>

      {/* Score and coins */}
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        Score: {score} | Coins: {coins} 🪙
      </div>

      {/* Pirate ship */}
      <div className="absolute top-10 right-10 text-6xl animate-bounce">🚢</div>

      {/* Main game area */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Pirate captain */}
          <div className="mb-6">
            <div className="text-6xl mb-2">🏴‍☠️</div>
            <div className="text-white text-xl font-bold">Captain Multiply</div>
          </div>

          {/* Math problem */}
          <div className="bg-yellow-400/90 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-2xl border-4 border-yellow-600">
            <div className="text-4xl font-bold text-red-800 mb-4">
              Find the treasure chest with:
            </div>
            <div className="text-6xl font-bold text-red-900">
              {currentProblem.num1} × {currentProblem.num2} = ?
            </div>
          </div>

          {/* Treasure chests */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {treasureChests.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(answer)}
                className="bg-amber-600 hover:bg-amber-700 text-yellow-100 p-6 rounded-lg text-3xl font-bold transition-all transform hover:scale-105 shadow-lg border-4 border-amber-800"
              >
                <div className="text-4xl mb-2">📦</div>
                <div>{answer}</div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-red-600/90 backdrop-blur-sm text-white text-2xl font-bold p-4 rounded-lg animate-bounce">
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 text-4xl animate-spin-slow">⚓</div>
      <div className="absolute bottom-20 right-20 text-3xl animate-pulse">🗺️</div>
      <div className="absolute top-1/3 right-1/4 text-2xl animate-bounce">💎</div>
    </div>
  );
};

export default PirateTreasureMultiplication;