import React, { useState, useEffect } from 'react';

interface SpaceMathExplorerProps {
  onScoreUpdate?: (score: number) => void;
}

const SpaceMathExplorer: React.FC<SpaceMathExplorerProps> = ({ onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0, operation: '+' });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateProblem = () => {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    if (operation === '+') {
      const num1 = Math.floor(Math.random() * 50) + 10; // 10-59
      const num2 = Math.floor(Math.random() * 40) + 10; // 10-49
      setCurrentProblem({ num1, num2, operation });
    } else {
      const num1 = Math.floor(Math.random() * 50) + 30; // 30-79
      const num2 = Math.floor(Math.random() * 20) + 5;  // 5-24
      setCurrentProblem({ num1, num2, operation });
    }
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const correctAnswer = currentProblem.operation === '+' 
      ? currentProblem.num1 + currentProblem.num2
      : currentProblem.num1 - currentProblem.num2;
    
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 10);
      setStars(stars + 1);
      setFeedback('🚀 Excellent! You powered up the rocket!');
      onScoreUpdate?.(score + 10);
      setTimeout(() => generateProblem(), 1500);
    } else {
      setFeedback(`🌟 Try again! The answer is ${correctAnswer}`);
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
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-black/30 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4">🚀 Space Math Explorer</h1>
          <p className="text-xl mb-6">Help the astronaut solve math problems to explore space!</p>
          <button 
            onClick={startGame}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
          >
            Start Mission 🌟
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Score and stars */}
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        Score: {score} | Stars: {stars} ⭐
      </div>

      {/* Main game area */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Rocket */}
          <div className="mb-8">
            <div className="text-8xl animate-bounce">🚀</div>
            <div className="text-yellow-400 text-2xl animate-pulse">🔥🔥🔥</div>
          </div>

          {/* Math problem */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 mb-6 shadow-2xl">
            <div className="text-5xl font-bold text-gray-800 mb-4">
              {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
            </div>
            
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="text-4xl text-center border-4 border-blue-300 rounded-lg p-4 w-48 font-bold"
              placeholder="Answer"
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            />
            
            <div className="mt-4">
              <button
                onClick={checkAnswer}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
                disabled={!userAnswer}
              >
                Launch! 🚀
              </button>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-yellow-400/90 backdrop-blur-sm text-gray-800 text-2xl font-bold p-4 rounded-lg animate-bounce">
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Planets */}
      <div className="absolute top-20 right-10 text-6xl animate-spin-slow">🪐</div>
      <div className="absolute bottom-20 left-10 text-4xl animate-bounce">🌍</div>
      <div className="absolute top-1/2 left-20 text-5xl animate-pulse">🌙</div>
    </div>
  );
};

export default SpaceMathExplorer;