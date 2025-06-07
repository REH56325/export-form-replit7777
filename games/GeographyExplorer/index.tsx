import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useUser } from '@/contexts/UserContext';

// Country data for the game
interface Country {
  name: string;
  capital: string;
  continent: string;
  fact: string;
  flag: string; // SVG string representation
}

// Question for the game
interface Question {
  type: 'capital' | 'continent' | 'country';
  text: string;
  options: string[];
  answer: string;
  country: Country;
}

// Game component for Geography Explorer
const GeographyExplorer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [stamps, setStamps] = useState<number>(0);
  const { user } = useUser();

  // Sample countries data
  const countryData: Country[] = [
    {
      name: 'United States',
      capital: 'Washington D.C.',
      continent: 'North America',
      fact: 'Has 50 states and is the third largest country by land area.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="60" fill="#bf0a30"/>
        <rect y="4.6" width="100" height="4.6" fill="#ffffff"/>
        <rect y="13.8" width="100" height="4.6" fill="#ffffff"/>
        <rect y="23" width="100" height="4.6" fill="#ffffff"/>
        <rect y="32.2" width="100" height="4.6" fill="#ffffff"/>
        <rect y="41.4" width="100" height="4.6" fill="#ffffff"/>
        <rect y="50.6" width="100" height="4.6" fill="#ffffff"/>
        <rect width="50" height="32.2" fill="#002868"/>
      </svg>`
    },
    {
      name: 'Brazil',
      capital: 'Brasília',
      continent: 'South America',
      fact: 'Home to the Amazon Rainforest, the largest tropical rainforest in the world.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="60" fill="#009b3a"/>
        <path d="M50,5 95,30 50,55 5,30 z" fill="#ffdf00"/>
        <circle cx="50" cy="30" r="12" fill="#002776"/>
      </svg>`
    },
    {
      name: 'France',
      capital: 'Paris',
      continent: 'Europe',
      fact: 'The Eiffel Tower in Paris was originally built as a temporary structure for the 1889 World Fair.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="33.3" height="60" fill="#002395"/>
        <rect x="33.3" width="33.3" height="60" fill="#ffffff"/>
        <rect x="66.6" width="33.3" height="60" fill="#ed2939"/>
      </svg>`
    },
    {
      name: 'Japan',
      capital: 'Tokyo',
      continent: 'Asia',
      fact: 'Japan consists of 6,852 islands and has the world\'s oldest continuous monarchy.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="60" fill="#ffffff"/>
        <circle cx="50" cy="30" r="12" fill="#bc002d"/>
      </svg>`
    },
    {
      name: 'Australia',
      capital: 'Canberra',
      continent: 'Oceania',
      fact: 'The Great Barrier Reef is the world\'s largest coral reef system and is located off the coast of Australia.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="60" fill="#00008b"/>
        <g fill="#ffffff">
          <path d="M0,0 50,30 0,60 z"/>
        </g>
      </svg>`
    },
    {
      name: 'South Africa',
      capital: 'Pretoria',
      continent: 'Africa',
      fact: 'South Africa has 11 official languages and three capital cities.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="20" fill="#e03c31"/>
        <rect y="20" width="100" height="20" fill="#ffffff"/>
        <rect y="40" width="100" height="20" fill="#007749"/>
        <path d="M0,0 50,30 0,60 z" fill="#001489"/>
      </svg>`
    },
    {
      name: 'Egypt',
      capital: 'Cairo',
      continent: 'Africa',
      fact: 'The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="20" fill="#ce1126"/>
        <rect y="20" width="100" height="20" fill="#ffffff"/>
        <rect y="40" width="100" height="20" fill="#000000"/>
      </svg>`
    },
    {
      name: 'India',
      capital: 'New Delhi',
      continent: 'Asia',
      fact: 'India is the world\'s largest democracy and has the second-largest population.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="100" height="20" fill="#ff9933"/>
        <rect y="20" width="100" height="20" fill="#ffffff"/>
        <rect y="40" width="100" height="20" fill="#138808"/>
        <circle cx="50" cy="30" r="5" fill="#000080"/>
      </svg>`
    },
    {
      name: 'Canada',
      capital: 'Ottawa',
      continent: 'North America',
      fact: 'Canada has the longest coastline of any country in the world.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="25" height="60" fill="#ff0000"/>
        <rect x="25" width="50" height="60" fill="#ffffff"/>
        <rect x="75" width="25" height="60" fill="#ff0000"/>
        <path d="M50,15 53,25 63,25 55,31 58,41 50,35 42,41 45,31 37,25 47,25 z" fill="#ff0000"/>
      </svg>`
    },
    {
      name: 'Mexico',
      capital: 'Mexico City',
      continent: 'North America',
      fact: 'Mexico is home to the world\'s smallest volcano, Cuexcomate, which is only 43 feet tall.',
      flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
        <rect width="33.3" height="60" fill="#006847"/>
        <rect x="33.3" width="33.3" height="60" fill="#ffffff"/>
        <rect x="66.6" width="33.3" height="60" fill="#ce1126"/>
      </svg>`
    }
  ];

  // Generate a question based on current level
  const generateQuestion = () => {
    if (countries.length === 0) return;
    
    // Get random country
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    // Determine question type based on level
    const questionTypes: ('capital' | 'continent' | 'country')[] = [];
    
    if (level >= 1) questionTypes.push('country');
    if (level >= 2) questionTypes.push('capital');
    if (level >= 3) questionTypes.push('continent');
    
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    // Generate options (1 correct, 3 incorrect)
    let options: string[] = [];
    let answer = '';
    let text = '';
    
    switch (questionType) {
      case 'capital':
        answer = country.capital;
        text = `What is the capital of ${country.name}?`;
        
        // Add correct answer
        options.push(country.capital);
        
        // Add incorrect options
        while (options.length < 4) {
          const randomCountry = countries[Math.floor(Math.random() * countries.length)];
          if (randomCountry.capital !== country.capital && !options.includes(randomCountry.capital)) {
            options.push(randomCountry.capital);
          }
        }
        break;
        
      case 'continent':
        answer = country.continent;
        text = `On which continent is ${country.name} located?`;
        
        // Get all unique continents
        const continents = Array.from(new Set(countries.map(c => c.continent)));
        
        // Add correct answer
        options.push(country.continent);
        
        // Add incorrect options
        while (options.length < Math.min(4, continents.length)) {
          const randomContinent = continents[Math.floor(Math.random() * continents.length)];
          if (randomContinent !== country.continent && !options.includes(randomContinent)) {
            options.push(randomContinent);
          }
        }
        break;
        
      case 'country':
        answer = country.name;
        text = 'Which country does this flag belong to?';
        
        // Add correct answer
        options.push(country.name);
        
        // Add incorrect options
        while (options.length < 4) {
          const randomCountry = countries[Math.floor(Math.random() * countries.length)];
          if (randomCountry.name !== country.name && !options.includes(randomCountry.name)) {
            options.push(randomCountry.name);
          }
        }
        break;
    }
    
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      type: questionType,
      text,
      options,
      answer,
      country
    });
    
    setSelectedAnswer(null);
    setFeedback('');
    setShowFeedback(false);
  };

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion || selectedAnswer) return;
    
    setSelectedAnswer(answer);
    
    if (answer === currentQuestion.answer) {
      // Correct answer
      setFeedback(`Correct! ${getFactForCorrectAnswer(currentQuestion)}`);
      setScore(score + (level * 10));
      setStamps(stamps + 1);
      
      // Check for level completion
      if (stamps + 1 >= level * 3) {
        if (level >= 5) {
          // Game completed
          setGameover(true);
          setFeedback('Congratulations! You\'ve become a Geography Explorer!');
          
          // Save progress if logged in
          if (user) {
            saveProgress(5, score + (level * 10));
          }
        } else {
          // Level up
          setTimeout(() => {
            setLevel(level + 1);
            setStamps(0);
            setFeedback(`Level ${level} completed! You're now exploring level ${level + 1}!`);
          }, 2000);
        }
      }
    } else {
      // Incorrect answer
      setFeedback(`Incorrect! The correct answer is ${currentQuestion.answer}.`);
      setLives(lives - 1);
      
      // Check if game over
      if (lives <= 1) {
        setGameover(true);
        setFeedback('Game Over! Try again to explore more countries!');
        
        // Save progress if logged in
        if (user) {
          saveProgress(level, score);
        }
      }
    }
    
    setShowFeedback(true);
    
    // Move to next question after delay
    if (lives > 1 && !(stamps + 1 >= level * 3 && level >= 5)) {
      setTimeout(() => {
        generateQuestion();
      }, 3000);
    }
  };

  // Get a fun fact for a correct answer
  const getFactForCorrectAnswer = (question: Question): string => {
    return `Fun fact: ${question.country.fact}`;
  };

  // Save player progress to the server
  const saveProgress = async (finalLevel: number, finalScore: number) => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/user-progress', {
        userId: user.id,
        gameId: 5, // Assuming Geography Explorer is game ID 5
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
    setStamps(0);
    setFeedback('');
    setShowFeedback(false);
    generateQuestion();
  };

  // Initialize game with country data
  useEffect(() => {
    setCountries(countryData);
  }, []);

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
        
        // Draw world map background
        ctx.fillStyle = '#e6f7ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw simplified world map
        ctx.fillStyle = '#90cdf4';
        
        // Simplified continents (just rectangles for illustration)
        // North America
        ctx.fillRect(canvas.width * 0.1, canvas.height * 0.2, canvas.width * 0.2, canvas.height * 0.2);
        
        // South America
        ctx.fillRect(canvas.width * 0.2, canvas.height * 0.5, canvas.width * 0.15, canvas.height * 0.3);
        
        // Europe
        ctx.fillRect(canvas.width * 0.45, canvas.height * 0.2, canvas.width * 0.1, canvas.height * 0.15);
        
        // Africa
        ctx.fillRect(canvas.width * 0.45, canvas.height * 0.4, canvas.width * 0.15, canvas.height * 0.3);
        
        // Asia
        ctx.fillRect(canvas.width * 0.6, canvas.height * 0.2, canvas.width * 0.25, canvas.height * 0.3);
        
        // Australia
        ctx.fillRect(canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.15, canvas.height * 0.15);
        
        // Draw game title
        ctx.font = '24px "Fredoka One", cursive';
        ctx.fillStyle = '#1982C4';
        ctx.textAlign = 'center';
        ctx.fillText('Geography Explorer', canvas.width / 2, 30);
        
        // Draw start instruction
        if (!gameStarted) {
          ctx.font = '18px "Nunito", sans-serif';
          ctx.fillStyle = '#333';
          ctx.textAlign = 'center';
          ctx.fillText('Click "Start Game" to begin your geography journey!', canvas.width / 2, canvas.height / 2);
        }
        
        setGameLoaded(true);
      }
    }
  }, []);

  // Generate first question when game starts
  useEffect(() => {
    if (gameStarted && countries.length > 0) {
      generateQuestion();
    }
  }, [gameStarted, countries]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {!gameLoaded && (
        <div className="w-full h-64 flex items-center justify-center">
          <p>Loading Geography Explorer...</p>
        </div>
      )}
      
      <div className={`w-full flex flex-col items-center ${gameLoaded ? '' : 'hidden'}`}>
        {/* Game header with score and lives */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-lg font-bold bg-grade4 text-white px-3 py-1 rounded-full">
            Level: {level}
          </div>
          <div className="text-lg font-bold bg-primary text-white px-3 py-1 rounded-full">
            Score: {score}
          </div>
          <div className="text-lg font-bold px-3 py-1">
            Lives: {Array(lives).fill('❤️').join('')}
          </div>
        </div>
        
        {/* Passport stamps */}
        <div className="w-full bg-amber-50 rounded-lg p-2 mb-4 flex items-center">
          <span className="text-amber-800 font-bold mr-2">Passport:</span>
          <div className="flex space-x-1">
            {Array(level * 3).fill(null).map((_, index) => (
              <div 
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${index < stamps ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-400'}`}
              >
                <i className="fas fa-stamp"></i>
              </div>
            ))}
          </div>
        </div>
        
        {/* Game canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full bg-blue-50 rounded-lg shadow-md mb-4"
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
            {/* Question and answers */}
            {!gameover && currentQuestion && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-game text-center mb-4">{currentQuestion.text}</h3>
                
                {/* Show flag for country identification questions */}
                {currentQuestion.type === 'country' && (
                  <div 
                    className="w-40 h-24 mx-auto mb-4 border border-gray-300"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.country.flag }}
                  />
                )}
                
                {/* Answer options */}
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`py-3 px-4 rounded-lg text-white font-bold transition ${
                        selectedAnswer === option 
                          ? option === currentQuestion.answer 
                            ? 'bg-green-500' 
                            : 'bg-red-500' 
                          : selectedAnswer !== null && option === currentQuestion.answer
                            ? 'bg-green-500'
                            : 'bg-grade4 hover:bg-opacity-80'
                      } ${selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'}`}
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

export default GeographyExplorer;
