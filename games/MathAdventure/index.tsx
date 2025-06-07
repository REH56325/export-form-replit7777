import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useUser } from '@/contexts/UserContext';

// Game component for Math Adventure
const MathAdventure = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState<string>('');
  const [options, setOptions] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const { user } = useUser();

  // Generate a math problem based on the current level
  const generateProblem = () => {
    let num1, num2, operation, result;
    
    // Adjust difficulty based on level
    switch(level) {
      case 1: // Simple addition (1-10)
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = '+';
        result = num1 + num2;
        break;
      case 2: // Simple subtraction (result always positive)
        num1 = Math.floor(Math.random() * 10) + 10;
        num2 = Math.floor(Math.random() * num1);
        operation = '-';
        result = num1 - num2;
        break;
      case 3: // Mixed addition and subtraction
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        operation = Math.random() > 0.5 ? '+' : '-';
        result = operation === '+' ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2);
        if (operation === '-') {
          [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
        }
        break;
      case 4: // Multiplication (1-5)
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        operation = '×';
        result = num1 * num2;
        break;
      case 5: // Mixed operation (add, subtract, multiply)
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        const opIndex = Math.floor(Math.random() * 3);
        operation = ['+', '-', '×'][opIndex];
        if (operation === '+') {
          result = num1 + num2;
        } else if (operation === '-') {
          [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
          result = num1 - num2;
        } else {
          result = num1 * num2;
        }
        break;
      default: // Division with no remainder
        do {
          num2 = Math.floor(Math.random() * 5) + 1;
          result = Math.floor(Math.random() * 5) + 1;
          num1 = num2 * result;
        } while (num1 > 25);
        operation = '÷';
        break;
    }

    setProblem(`${num1} ${operation} ${num2} = ?`);
    
    // Generate answer options (1 correct, 3 close but incorrect)
    const correctAnswer = result;
    const wrongAnswers = [];
    
    while (wrongAnswers.length < 3) {
      // Generate a close but incorrect answer
      const offset = Math.floor(Math.random() * 5) + 1;
      const wrongAnswer = Math.random() > 0.5 
        ? correctAnswer + offset 
        : Math.max(0, correctAnswer - offset);
      
      if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
        wrongAnswers.push(wrongAnswer);
      }
    }
    
    // Shuffle all answers
    const allOptions = [correctAnswer, ...wrongAnswers];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    
    setOptions(allOptions);
    setAnswer(correctAnswer);
    setFeedback('');
    setShowFeedback(false);
  };

  // Handle answer selection
  const handleSelectAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === answer) {
      setFeedback('Correct! Great job!');
      setScore(score + (level * 10));
      
      // Check if player has completed all levels
      if (level >= 10) {
        setGameover(true);
        setFeedback('Congratulations! You beat Math Adventure!');
        
        // Save progress if logged in
        if (user) {
          saveProgress(10, score + (level * 10));
        }
      } else {
        // Move to next level
        setTimeout(() => {
          setLevel(level + 1);
          generateProblem();
        }, 1500);
      }
    } else {
      setFeedback('Oops! That\'s not correct. Try again!');
      setLives(lives - 1);
      
      // Check if game over due to no lives left
      if (lives <= 1) {
        setGameover(true);
        setFeedback('Game Over! Try again to beat your score!');
        
        // Save progress if logged in
        if (user) {
          saveProgress(level, score);
        }
      }
    }
    
    setShowFeedback(true);
  };

  // Save player progress to the server
  const saveProgress = async (finalLevel: number, finalScore: number) => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/user-progress', {
        userId: user.id,
        gameId: 1, // Assuming Math Adventure is game ID 1
        level: finalLevel,
        score: finalScore
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // Reset game state
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setGameover(false);
    setGameStarted(true);
    generateProblem();
  };

  // Initialize game
  useEffect(() => {
    // Initialize canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        // Draw game background
        ctx.fillStyle = '#f0f9ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw game title
        ctx.font = '24px "Fredoka One", cursive';
        ctx.fillStyle = '#8AC926';
        ctx.textAlign = 'center';
        ctx.fillText('Math Adventure', canvas.width / 2, 50);
        
        // Draw start instruction
        if (!gameStarted) {
          ctx.font = '18px "Nunito", sans-serif';
          ctx.fillStyle = '#333';
          ctx.fillText('Click "Start Game" to begin your math adventure!', canvas.width / 2, canvas.height / 2);
        }
        
        setGameLoaded(true);
      }
    }
  }, []);

  // Effect for when game starts
  useEffect(() => {
    if (gameStarted) {
      generateProblem();
    }
  }, [gameStarted]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {!gameLoaded && (
        <div className="w-full h-64 flex items-center justify-center">
          <p>Loading Math Adventure...</p>
        </div>
      )}
      
      <div className={`w-full flex flex-col items-center ${gameLoaded ? '' : 'hidden'}`}>
        {/* Game header with score and lives */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-lg font-bold bg-grade3 text-white px-3 py-1 rounded-full">
            Level: {level}
          </div>
          <div className="text-lg font-bold bg-primary text-white px-3 py-1 rounded-full">
            Score: {score}
          </div>
          <div className="text-lg font-bold px-3 py-1">
            Lives: {Array(lives).fill('❤️').join('')}
          </div>
        </div>
        
        {/* Game canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full bg-blue-50 rounded-lg shadow-md mb-4"
          style={{ height: '250px' }}
        />
        
        {!gameStarted && !gameover ? (
          <button 
            onClick={resetGame}
            className="bg-accent text-dark font-bold py-3 px-8 rounded-full text-lg transition hover:bg-opacity-80"
          >
            Start Game
          </button>
        ) : (
          <>
            {/* Math problem display */}
            {!gameover && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-game text-center mb-4">{problem}</h3>
                
                {/* Answer options */}
                <div className="grid grid-cols-2 gap-4">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      className="bg-grade3 hover:bg-opacity-80 text-white font-bold py-3 px-4 rounded-lg text-xl transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Feedback message */}
            {showFeedback && (
              <div className={`p-4 rounded-lg mb-4 text-center text-lg font-bold ${feedback.includes('Correct') || feedback.includes('Congratulations') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {feedback}
              </div>
            )}
            
            {/* Game over screen */}
            {gameover && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-game text-dark mb-2">Game Over!</h3>
                <p className="mb-4">Your final score: {score}</p>
                <button 
                  onClick={resetGame}
                  className="bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Play Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MathAdventure;
