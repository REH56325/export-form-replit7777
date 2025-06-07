import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const AdditionArcade = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [stars, setStars] = useState(0);
  const { user } = useUser();

  const generateProblem = () => {
    // Simple addition for 1st grade (1-10)
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const answer = num1 + num2;
    
    setProblem({ num1, num2, answer });
    setUserAnswer('');
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    const answer = parseInt(userAnswer);
    if (answer === problem.answer) {
      setFeedback('🌟 Awesome! That\'s correct!');
      setScore(score + 10);
      setStars(stars + 1);
      
      if (stars + 1 >= 10) {
        setLevel(level + 1);
        setStars(0);
      }
      
      setTimeout(() => {
        generateProblem();
      }, 1500);
    } else {
      setFeedback('🤔 Try again! You can do it!');
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
    setStars(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-300 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">🎯 Addition Arcade</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-green-600">Level: {level}</div>
            <div className="text-lg font-bold text-yellow-600">
              Stars: {'⭐'.repeat(stars)} ({stars}/10)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">🎮 How to Play</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🔢 Solve addition problems to earn stars!</p>
              <p>⭐ Get 10 stars to level up!</p>
              <p>🎯 Type your answer and click Check!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🚀 Start Playing!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            {/* Animated arcade graphics */}
            <div className="mb-6">
              <svg width="300" height="150" className="mx-auto mb-4" viewBox="0 0 300 150">
                <rect width="300" height="150" fill="#4338CA" rx="20"/>
                <rect x="20" y="20" width="260" height="110" fill="#1E1B4B" rx="10"/>
                <circle cx="80" cy="75" r="25" fill="#F59E0B" className="animate-pulse"/>
                <circle cx="150" cy="75" r="25" fill="#EF4444" className="animate-bounce"/>
                <circle cx="220" cy="75" r="25" fill="#10B981" className="animate-pulse"/>
                <text x="150" y="140" textAnchor="middle" fill="white" className="text-lg font-bold">Addition Arcade!</text>
              </svg>
            </div>
            
            <div className="text-6xl font-bold text-purple-700 mb-6 animate-bounce">
              {problem.num1} + {problem.num2} = ?
            </div>
            
            <div className="mb-6">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-4xl text-center border-4 border-purple-300 rounded-xl p-4 w-32 focus:border-purple-500 focus:outline-none"
                placeholder="?"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
            </div>

            <button
              onClick={checkAnswer}
              disabled={!userAnswer}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105 mb-4"
            >
              ✅ Check Answer
            </button>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Awesome') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
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

export default AdditionArcade;