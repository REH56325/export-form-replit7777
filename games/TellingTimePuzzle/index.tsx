import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const TellingTimePuzzle = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState({ hours: 12, minutes: 0 });
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [clocks, setClocks] = useState(0);
  const { user } = useUser();

  const generateTimeProblem = () => {
    // Simple times for 1st grade (hour and half-hour)
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.random() > 0.5 ? 0 : 30; // Only on the hour or half past
    
    setCurrentTime({ hours, minutes });
    
    // Create correct answer
    const correctTime = minutes === 0 
      ? `${hours}:00` 
      : `${hours}:30`;
    
    // Create wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const wrongHours = Math.floor(Math.random() * 12) + 1;
      const wrongMinutes = Math.random() > 0.5 ? 0 : 30;
      const wrongTime = wrongMinutes === 0 ? `${wrongHours}:00` : `${wrongHours}:30`;
      
      if (wrongTime !== correctTime && !wrongOptions.includes(wrongTime)) {
        wrongOptions.push(wrongTime);
      }
    }
    
    // Shuffle all options
    const allOptions = [correctTime, ...wrongOptions].sort(() => Math.random() - 0.5);
    setTimeOptions(allOptions);
    setShowFeedback(false);
  };

  const checkAnswer = (selectedTime: string) => {
    const correctTime = currentTime.minutes === 0 
      ? `${currentTime.hours}:00` 
      : `${currentTime.hours}:30`;
    
    if (selectedTime === correctTime) {
      setFeedback('⏰ Perfect! You can tell time!');
      setScore(score + 30);
      setClocks(clocks + 1);
      
      if (clocks + 1 >= 6) {
        setLevel(level + 1);
        setClocks(0);
      }
      
      setTimeout(() => {
        generateTimeProblem();
      }, 2000);
    } else {
      setFeedback('🕐 Look at the clock hands again!');
    }
    setShowFeedback(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    generateTimeProblem();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setClocks(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  // Draw clock face
  const ClockFace = ({ hours, minutes }: { hours: number, minutes: number }) => {
    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30; // 30 degrees per hour
    const minuteAngle = minutes * 6; // 6 degrees per minute

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg width="192" height="192" className="transform rotate-0">
          {/* Clock circle */}
          <circle cx="96" cy="96" r="90" fill="white" stroke="#4F46E5" strokeWidth="6"/>
          
          {/* Hour markers */}
          {Array(12).fill(0).map((_, i) => {
            const angle = i * 30;
            const x1 = 96 + 75 * Math.cos((angle - 90) * Math.PI / 180);
            const y1 = 96 + 75 * Math.sin((angle - 90) * Math.PI / 180);
            const x2 = 96 + 85 * Math.cos((angle - 90) * Math.PI / 180);
            const y2 = 96 + 85 * Math.sin((angle - 90) * Math.PI / 180);
            
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4F46E5" strokeWidth="3"/>
            );
          })}
          
          {/* Numbers */}
          {Array(12).fill(0).map((_, i) => {
            const number = i === 0 ? 12 : i;
            const angle = i * 30;
            const x = 96 + 65 * Math.cos((angle - 90) * Math.PI / 180);
            const y = 96 + 65 * Math.sin((angle - 90) * Math.PI / 180);
            
            return (
              <text key={i} x={x} y={y + 6} textAnchor="middle" className="text-lg font-bold fill-purple-700">
                {number}
              </text>
            );
          })}
          
          {/* Hour hand */}
          <line
            x1="96" y1="96"
            x2={96 + 40 * Math.cos((hourAngle - 90) * Math.PI / 180)}
            y2={96 + 40 * Math.sin((hourAngle - 90) * Math.PI / 180)}
            stroke="#DC2626" strokeWidth="6" strokeLinecap="round"
          />
          
          {/* Minute hand */}
          <line
            x1="96" y1="96"
            x2={96 + 65 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
            y2={96 + 65 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
            stroke="#059669" strokeWidth="4" strokeLinecap="round"
          />
          
          {/* Center dot */}
          <circle cx="96" cy="96" r="6" fill="#4F46E5"/>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-orange-200 to-red-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-800 mb-2">⏰ Telling Time Puzzle</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-orange-600">Score: {score}</div>
            <div className="text-lg font-bold text-red-600">Time Level: {level}</div>
            <div className="text-lg font-bold text-yellow-600">
              Clocks: {'🕐'.repeat(clocks)} ({clocks}/6)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">🕐 How to Read the Clock</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>⏰ Look at the clock and tell what time it shows!</p>
              <p>🔴 The short red hand shows the HOUR</p>
              <p>🟢 The long green hand shows the MINUTES</p>
              <p>🎯 Read 6 clocks correctly to level up!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              ⏰ Start Clock Reading!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="mb-6">
              <div className="text-2xl text-orange-700 mb-4">🕐 What time does this clock show?</div>
              <ClockFace hours={currentTime.hours} minutes={currentTime.minutes} />
            </div>

            {/* Time options */}
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
              {timeOptions.map((time, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(time)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-2xl transition-all transform hover:scale-105"
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Clock collection */}
            <div className="mb-6 p-4 bg-yellow-100 rounded-xl">
              <div className="text-lg text-orange-700 mb-2">🏆 Your Clock Collection:</div>
              <div className="flex justify-center flex-wrap">
                {Array(clocks).fill('⏰').map((clock, i) => (
                  <span key={i} className="text-2xl m-1 animate-bounce">{clock}</span>
                ))}
                {Array(6 - clocks).fill('⚫').map((spot, i) => (
                  <span key={i} className="text-2xl m-1 opacity-30">{spot}</span>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Perfect') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Clock Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TellingTimePuzzle;