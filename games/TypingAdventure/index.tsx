import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useUser } from '@/contexts/UserContext';

// Word difficulty levels
const wordLists = {
  1: ['cat', 'dog', 'run', 'jump', 'play', 'red', 'blue', 'ball'],
  2: ['apple', 'happy', 'water', 'tiger', 'zebra', 'green', 'cloud'],
  3: ['elephant', 'sunshine', 'mountain', 'rainbow', 'keyboard', 'airplane'],
  4: ['beautiful', 'adventure', 'friendship', 'fantastic', 'wonderful'],
  5: ['imagination', 'opportunity', 'celebration', 'understanding', 'technology']
};

// Character object for the game
interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

// Word object for the game
interface Word {
  text: string;
  x: number;
  y: number;
  speed: number;
  typed: string;
  completed: boolean;
}

// Game component for Typing Adventure
const TypingAdventure = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [gameLoaded, setGameLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [typedWord, setTypedWord] = useState('');
  const [character, setCharacter] = useState<Character>({
    x: 50,
    y: 0,
    width: 40,
    height: 60,
    speed: 5
  });
  const [lastWordTime, setLastWordTime] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useUser();

  // Handle keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    // Only process alphabetic keys, backspace, enter, and space
    const validKey = /^[a-zA-Z]$/.test(e.key) || e.key === 'Backspace' || e.key === 'Enter' || e.key === ' ';
    
    if (!gameStarted || gameover || !validKey) return;
    
    if (e.key === 'Backspace') {
      // Remove last character
      setTypedWord(prev => prev.slice(0, -1));
      
      if (currentWord) {
        const newWords = [...words];
        const wordIndex = newWords.findIndex(w => w === currentWord);
        if (wordIndex !== -1) {
          newWords[wordIndex].typed = newWords[wordIndex].typed.slice(0, -1);
          setWords(newWords);
        }
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Submit word
      checkWord();
    } else {
      // Add character to typed word
      const newChar = e.key.toLowerCase();
      setTypedWord(prev => prev + newChar);
      
      if (currentWord) {
        const newWords = [...words];
        const wordIndex = newWords.findIndex(w => w === currentWord);
        if (wordIndex !== -1) {
          newWords[wordIndex].typed += newChar;
          setWords(newWords);
          
          // Check if word is fully typed
          if (newWords[wordIndex].typed === newWords[wordIndex].text) {
            handleWordComplete(newWords[wordIndex]);
          }
        }
      } else {
        // Find a word that starts with the typed characters
        const matchingWord = words.find(
          word => !word.completed && word.text.startsWith(newChar)
        );
        
        if (matchingWord) {
          const newWords = [...words];
          const wordIndex = newWords.findIndex(w => w === matchingWord);
          newWords[wordIndex].typed = newChar;
          setWords(newWords);
          setCurrentWord(matchingWord);
        }
      }
    }
  };

  // Check if typed word matches any of the falling words
  const checkWord = () => {
    if (!typedWord) return;
    
    const matchingWord = words.find(
      word => !word.completed && word.text === typedWord
    );
    
    if (matchingWord) {
      handleWordComplete(matchingWord);
    } else {
      // Wrong word - penalty
      setFeedback('Incorrect word!');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1000);
    }
    
    setTypedWord('');
    setCurrentWord(null);
  };

  // Handle successful word completion
  const handleWordComplete = (word: Word) => {
    // Mark word as completed
    const newWords = [...words];
    const wordIndex = newWords.findIndex(w => w === word);
    if (wordIndex !== -1) {
      newWords[wordIndex].completed = true;
      setWords(newWords);
    }
    
    // Update score
    const wordScore = word.text.length * level;
    setScore(prev => prev + wordScore);
    
    // Move character forward
    setCharacter(prev => ({
      ...prev,
      x: Math.min(prev.x + word.text.length * 15, canvasRef.current?.width ?? 800)
    }));
    
    // Check for level completion
    if (character.x >= (canvasRef.current?.width ?? 800) - character.width - 50) {
      if (level >= 5) {
        // Game completed
        setGameover(true);
        setFeedback('Congratulations! You completed Typing Adventure!');
        setShowFeedback(true);
        
        // Save progress if logged in
        if (user) {
          saveProgress(5, score + wordScore);
        }
      } else {
        // Level up
        setLevel(prev => prev + 1);
        setFeedback(`Level ${level} completed! Moving to level ${level + 1}`);
        setShowFeedback(true);
        
        setTimeout(() => {
          setFeedback('');
          setShowFeedback(false);
          setCharacter(prev => ({
            ...prev,
            x: 50
          }));
          setWords([]);
        }, 2000);
      }
    }
    
    setTypedWord('');
    setCurrentWord(null);
  };

  // Generate a new word
  const generateWord = () => {
    if (canvasRef.current) {
      const wordList = wordLists[level as keyof typeof wordLists] || wordLists[1];
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      
      const canvas = canvasRef.current;
      const wordWidth = randomWord.length * 12; // Approximate width
      const x = Math.random() * (canvas.width - wordWidth - 20) + 10;
      
      const newWord: Word = {
        text: randomWord,
        x,
        y: 0,
        speed: 1 + Math.random() * level, // Speed increases with level
        typed: '',
        completed: false
      };
      
      setWords(prev => [...prev, newWord]);
    }
  };

  // Save player progress to the server
  const saveProgress = async (finalLevel: number, finalScore: number) => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/user-progress', {
        userId: user.id,
        gameId: 4, // Assuming Typing Adventure is game ID 4
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
    setWords([]);
    setTypedWord('');
    setCurrentWord(null);
    setCharacter({
      x: 50,
      y: 0,
      width: 40,
      height: 60,
      speed: 5
    });
    setFeedback('');
    setShowFeedback(false);
  };

  // Game animation loop
  const gameLoop = (timestamp: number) => {
    if (gameover || !gameStarted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#e6f7ff');
    gradient.addColorStop(1, '#ccf2ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw path
    ctx.fillStyle = '#d0d0d0';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 50);
    
    // Draw character
    ctx.fillStyle = '#4CC9F0';
    ctx.fillRect(character.x, canvas.height - 100 - character.height, character.width, character.height);
    
    // Draw character face
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(character.x + 10, canvas.height - 160, 5, 5); // Left eye
    ctx.fillRect(character.x + 25, canvas.height - 160, 5, 5); // Right eye
    ctx.fillStyle = '#000000';
    ctx.fillRect(character.x + 15, canvas.height - 145, 10, 3); // Mouth
    
    // Draw finish line
    ctx.fillStyle = '#FF4D6D';
    ctx.fillRect(canvas.width - 20, canvas.height - 100, 10, 50);
    
    // Generate new words
    if (timestamp - lastWordTime > 2000 / level) { // Adjust frequency based on level
      generateWord();
      setLastWordTime(timestamp);
    }
    
    // Update and draw words
    const updatedWords = [...words];
    for (let i = 0; i < updatedWords.length; i++) {
      const word = updatedWords[i];
      
      if (word.completed) continue;
      
      // Update word position
      word.y += word.speed;
      
      // Draw word
      ctx.font = '18px Nunito, sans-serif';
      
      // Draw typed part in a different color
      if (word.typed) {
        ctx.fillStyle = '#4CC9F0';
        ctx.fillText(word.typed, word.x, word.y);
        
        // Draw remaining part
        const typedWidth = ctx.measureText(word.typed).width;
        ctx.fillStyle = '#333333';
        ctx.fillText(
          word.text.slice(word.typed.length),
          word.x + typedWidth,
          word.y
        );
      } else {
        ctx.fillStyle = '#333333';
        ctx.fillText(word.text, word.x, word.y);
      }
      
      // Check if word has fallen off screen
      if (word.y > canvas.height && !word.completed) {
        // Player missed the word
        updatedWords.splice(i, 1);
        i--;
        
        if (currentWord === word) {
          setCurrentWord(null);
          setTypedWord('');
        }
        
        setLives(prev => prev - 1);
        
        if (lives <= 1) {
          setGameover(true);
          setFeedback('Game Over! Try again to improve your typing speed!');
          setShowFeedback(true);
          
          // Save progress if logged in
          if (user) {
            saveProgress(level, score);
          }
          
          break;
        }
      }
    }
    
    setWords(updatedWords);
    
    // Draw typing input
    ctx.fillStyle = '#000000';
    ctx.font = '20px Nunito, sans-serif';
    ctx.fillText(`Type: ${typedWord}`, 20, 30);
    
    // Continue animation loop
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // Initialize game and set up event listeners
  useEffect(() => {
    // Initialize canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw initial screen
        ctx.fillStyle = '#e6f7ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '24px "Fredoka One", cursive';
        ctx.fillStyle = '#4CC9F0';
        ctx.textAlign = 'center';
        ctx.fillText('Typing Adventure', canvas.width / 2, 50);
        
        ctx.font = '18px "Nunito", sans-serif';
        ctx.fillStyle = '#333';
        ctx.fillText('Type the falling words to advance!', canvas.width / 2, 100);
        ctx.fillText('Press Enter or Space to submit words.', canvas.width / 2, 130);
        
        // Position character at bottom of screen
        setCharacter(prev => ({
          ...prev,
          y: canvas.height - 100 - prev.height
        }));
        
        setGameLoaded(true);
      }
    }
    
    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Start/stop game loop based on game state
  useEffect(() => {
    if (gameStarted && !gameover) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameStarted, gameover, words, character, level, lives, lastWordTime]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {!gameLoaded && (
        <div className="w-full h-64 flex items-center justify-center">
          <p>Loading Typing Adventure...</p>
        </div>
      )}
      
      <div className={`w-full flex flex-col items-center ${gameLoaded ? '' : 'hidden'}`}>
        {/* Game header with score and lives */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-lg font-bold bg-grade2 text-white px-3 py-1 rounded-full">
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
          style={{ height: '400px' }}
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
            {/* Typing input on mobile devices */}
            <div className="md:hidden w-full mb-4">
              <input
                type="text"
                value={typedWord}
                onChange={(e) => {
                  setTypedWord(e.target.value);
                  
                  if (currentWord) {
                    const newWords = [...words];
                    const wordIndex = newWords.findIndex(w => w === currentWord);
                    if (wordIndex !== -1) {
                      newWords[wordIndex].typed = e.target.value;
                      setWords(newWords);
                      
                      // Check if word is fully typed
                      if (newWords[wordIndex].typed === newWords[wordIndex].text) {
                        handleWordComplete(newWords[wordIndex]);
                      }
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    checkWord();
                  }
                }}
                className="w-full p-3 bg-white border border-grade2 rounded-lg"
                placeholder="Type words here..."
                autoFocus
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={checkWord}
                  className="bg-grade2 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
            
            {/* Feedback message */}
            {showFeedback && (
              <div className={`p-4 rounded-lg mb-4 text-center text-lg font-bold ${feedback.includes('Congratulations') || feedback.includes('completed') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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

export default TypingAdventure;
