import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useUser } from '@/contexts/UserContext';

// Game component for Word Wizards
const WordWizards = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const { user } = useUser();

  // Word lists by level
  const wordLists = {
    1: ['CAT', 'DOG', 'HAT', 'SUN', 'BIG', 'MAP', 'PEN'],
    2: ['FISH', 'DUCK', 'JUMP', 'PLAY', 'SING', 'BOOK', 'TREE'],
    3: ['APPLE', 'HAPPY', 'WATER', 'MOUSE', 'HOUSE', 'GREEN', 'CLOUD'],
    4: ['SCHOOL', 'GARDEN', 'PLAYER', 'YELLOW', 'RABBIT', 'PENCIL', 'FAMILY'],
    5: ['DOLPHIN', 'RAINBOW', 'TEACHER', 'ELEPHANT', 'CHICKEN', 'SANDWICH', 'MOUNTAIN']
  };

  // Get a random word based on the current level
  const getRandomWord = () => {
    // Determine which word list to use based on level
    const listLevel = Math.min(level, 5);
    const wordList = wordLists[listLevel as keyof typeof wordLists];
    
    // Select a random word from the list
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  // Generate letter options (including the correct letters)
  const generateLetterOptions = (word: string) => {
    // Create array with the letters of the word
    const letters = word.split('');
    
    // Add some random letters to make it more challenging
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = [];
    
    // Add random letters until we have enough options
    const totalLetters = Math.min(15, 26); // Limit to 15 options or full alphabet
    while (randomLetters.length < (totalLetters - letters.length)) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!letters.includes(randomLetter) && !randomLetters.includes(randomLetter)) {
        randomLetters.push(randomLetter);
      }
    }
    
    // Combine and shuffle all letters
    const allLetters = [...letters, ...randomLetters];
    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }
    
    return allLetters;
  };

  // Start a new round with a new word
  const startNewRound = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setDisplayWord('_'.repeat(newWord.length));
    setSelectedLetters([]);
    setAvailableLetters(generateLetterOptions(newWord));
    setFeedback('');
    setShowFeedback(false);
  };

  // Handle letter selection
  const handleSelectLetter = (letter: string) => {
    if (selectedLetters.length >= word.length) {
      return; // Already selected enough letters
    }
    
    // Add letter to selected letters
    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);
    
    // Update display word
    const newDisplayWord = newSelectedLetters.join('') + '_'.repeat(word.length - newSelectedLetters.length);
    setDisplayWord(newDisplayWord);
    
    // If word is complete, check if it's correct
    if (newSelectedLetters.length === word.length) {
      const spelledWord = newSelectedLetters.join('');
      
      if (spelledWord === word) {
        setFeedback(`Correct! "${word}" is right!`);
        setScore(score + (level * 10));
        
        // Level completion logic
        if (level >= 10) {
          setGameover(true);
          setFeedback('Congratulations! You beat Word Wizards!');
          
          // Save progress if logged in
          if (user) {
            saveProgress(10, score + (level * 10));
          }
        } else {
          // Move to next level
          setTimeout(() => {
            setLevel(level + 1);
            startNewRound();
          }, 1500);
        }
      } else {
        setFeedback(`Oops! "${spelledWord}" is not correct. The word was "${word}".`);
        setLives(lives - 1);
        
        // Check if game over due to no lives left
        if (lives <= 1) {
          setGameover(true);
          setFeedback(`Game Over! Try again to beat your score!`);
          
          // Save progress if logged in
          if (user) {
            saveProgress(level, score);
          }
        } else {
          // Reset for next word
          setTimeout(() => {
            startNewRound();
          }, 1500);
        }
      }
      
      setShowFeedback(true);
    }
  };

  // Remove last selected letter
  const handleBackspace = () => {
    if (selectedLetters.length > 0) {
      const newSelectedLetters = selectedLetters.slice(0, -1);
      setSelectedLetters(newSelectedLetters);
      
      // Update display word
      const newDisplayWord = newSelectedLetters.join('') + '_'.repeat(word.length - newSelectedLetters.length);
      setDisplayWord(newDisplayWord);
    }
  };

  // Reset game state
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setGameover(false);
    setGameStarted(true);
    startNewRound();
  };

  // Save player progress to the server
  const saveProgress = async (finalLevel: number, finalScore: number) => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/user-progress', {
        userId: user.id,
        gameId: 2, // Assuming Word Wizards is game ID 2
        level: finalLevel,
        score: finalScore
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
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
        ctx.fillStyle = '#fdf2f8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw game title
        ctx.font = '24px "Fredoka One", cursive';
        ctx.fillStyle = '#7209B7';
        ctx.textAlign = 'center';
        ctx.fillText('Word Wizards', canvas.width / 2, 50);
        
        // Draw wizard hat
        const hatX = canvas.width / 2;
        const hatY = 120;
        // Draw hat cone
        ctx.fillStyle = '#7209B7';
        ctx.beginPath();
        ctx.moveTo(hatX, hatY - 60);
        ctx.lineTo(hatX - 40, hatY);
        ctx.lineTo(hatX + 40, hatY);
        ctx.closePath();
        ctx.fill();
        // Draw hat brim
        ctx.fillStyle = '#5303a5';
        ctx.beginPath();
        ctx.ellipse(hatX, hatY, 50, 15, 0, 0, 2 * Math.PI);
        ctx.fill();
        // Draw stars on hat
        ctx.fillStyle = '#FFD166';
        for (let i = 0; i < 5; i++) {
          const starX = hatX - 25 + Math.random() * 50;
          const starY = hatY - 50 + Math.random() * 30;
          ctx.beginPath();
          ctx.arc(starX, starY, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        // Draw start instruction
        if (!gameStarted) {
          ctx.font = '18px "Nunito", sans-serif';
          ctx.fillStyle = '#333';
          ctx.fillText('Click "Start Game" to begin your spelling adventure!', canvas.width / 2, canvas.height - 50);
        }
        
        setGameLoaded(true);
      }
    }
  }, []);

  // Effect for when game starts
  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [gameStarted]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {!gameLoaded && (
        <div className="w-full h-64 flex items-center justify-center">
          <p>Loading Word Wizards...</p>
        </div>
      )}
      
      <div className={`w-full flex flex-col items-center ${gameLoaded ? '' : 'hidden'}`}>
        {/* Game header with score and lives */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-lg font-bold bg-grade1 text-white px-3 py-1 rounded-full">
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
          className="w-full bg-pink-50 rounded-lg shadow-md mb-4"
          style={{ height: '200px' }}
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
            {/* Word display */}
            {!gameover && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-game text-center mb-4">Spell the Word:</h3>
                
                {/* Word display container */}
                <div className="flex justify-center mb-6">
                  {displayWord.split('').map((letter, index) => (
                    <div 
                      key={index}
                      className="w-10 h-10 mx-1 border-b-4 border-grade1 flex items-center justify-center text-2xl font-bold"
                    >
                      {letter !== '_' ? letter : ''}
                    </div>
                  ))}
                </div>
                
                {/* Letter options */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {availableLetters.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectLetter(letter)}
                      disabled={selectedLetters.length >= word.length}
                      className="bg-grade1 hover:bg-opacity-80 text-white font-bold py-2 px-3 rounded-lg text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                
                {/* Backspace button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleBackspace}
                    disabled={selectedLetters.length === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Backspace
                  </button>
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

export default WordWizards;
