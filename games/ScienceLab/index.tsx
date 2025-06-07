import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useUser } from '@/contexts/UserContext';

// Chemical element interface
interface Element {
  id: number;
  symbol: string;
  name: string;
  color: string;
}

// Chemical reaction interface
interface Reaction {
  elements: number[];
  result: {
    name: string;
    description: string;
    color: string;
  };
}

// Game component for Science Lab
const ScienceLab = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [targetReaction, setTargetReaction] = useState<string>('');
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [reactionResult, setReactionResult] = useState<string>('');
  const { user } = useUser();

  // Chemical elements data
  const allElements: Element[] = [
    { id: 1, symbol: 'H', name: 'Hydrogen', color: '#3498DB' },
    { id: 2, symbol: 'O', name: 'Oxygen', color: '#E74C3C' },
    { id: 3, symbol: 'C', name: 'Carbon', color: '#2C3E50' },
    { id: 4, symbol: 'N', name: 'Nitrogen', color: '#9B59B6' },
    { id: 5, symbol: 'Na', name: 'Sodium', color: '#F39C12' },
    { id: 6, symbol: 'Cl', name: 'Chlorine', color: '#27AE60' },
    { id: 7, symbol: 'Fe', name: 'Iron', color: '#E67E22' },
    { id: 8, symbol: 'Cu', name: 'Copper', color: '#16A085' },
    { id: 9, symbol: 'Ag', name: 'Silver', color: '#BDC3C7' },
    { id: 10, symbol: 'Au', name: 'Gold', color: '#F1C40F' }
  ];

  // Chemical reactions data
  const allReactions: Reaction[] = [
    {
      elements: [1, 2], // Hydrogen + Oxygen
      result: {
        name: 'Water (H₂O)',
        description: 'A clear liquid essential for life',
        color: '#3498DB'
      }
    },
    {
      elements: [5, 6], // Sodium + Chlorine
      result: {
        name: 'Salt (NaCl)',
        description: 'Common table salt used for seasoning',
        color: '#ECF0F1'
      }
    },
    {
      elements: [1, 1, 2], // Hydrogen + Hydrogen + Oxygen
      result: {
        name: 'Water (H₂O)',
        description: 'A clear liquid essential for life',
        color: '#3498DB'
      }
    },
    {
      elements: [3, 2], // Carbon + Oxygen
      result: {
        name: 'Carbon Dioxide (CO₂)',
        description: 'A gas that plants use for photosynthesis',
        color: '#95A5A6'
      }
    },
    {
      elements: [3, 2, 2], // Carbon + Oxygen + Oxygen
      result: {
        name: 'Carbon Dioxide (CO₂)',
        description: 'A gas that plants use for photosynthesis',
        color: '#95A5A6'
      }
    },
    {
      elements: [3, 1, 1, 1, 1], // Carbon + 4 Hydrogen
      result: {
        name: 'Methane (CH₄)',
        description: 'A flammable gas used as fuel',
        color: '#7F8C8D'
      }
    },
    {
      elements: [1, 4], // Hydrogen + Nitrogen
      result: {
        name: 'Ammonia (NH₃)',
        description: 'Used in cleaning products and fertilizers',
        color: '#9B59B6'
      }
    },
    {
      elements: [1, 4, 1, 1], // Hydrogen + Nitrogen + Hydrogen + Hydrogen
      result: {
        name: 'Ammonia (NH₃)',
        description: 'Used in cleaning products and fertilizers',
        color: '#9B59B6'
      }
    },
    {
      elements: [7, 2, 2, 2], // Iron + 3 Oxygen
      result: {
        name: 'Rust (Fe₂O₃)',
        description: 'The reddish-brown compound formed when iron oxidizes',
        color: '#E67E22'
      }
    },
    {
      elements: [8, 6, 6], // Copper + 2 Chlorine
      result: {
        name: 'Copper Chloride (CuCl₂)',
        description: 'A blue-green crystalline compound',
        color: '#16A085'
      }
    }
  ];

  // Start a new experiment round
  const startNewRound = () => {
    // Get random elements based on level
    const numElements = Math.min(level + 2, allElements.length);
    const shuffledElements = [...allElements].sort(() => Math.random() - 0.5);
    setElements(shuffledElements.slice(0, numElements));
    
    // Get random reaction for the level
    const filteredReactions = allReactions.filter(reaction => 
      reaction.elements.length <= level + 1
    );
    const randomReaction = filteredReactions[Math.floor(Math.random() * filteredReactions.length)];
    setReactions([randomReaction]);
    
    const elementSymbols = randomReaction.elements.map(
      elemId => allElements.find(e => e.id === elemId)?.symbol
    ).filter(Boolean);
    
    // Create target reaction text
    const formula = elementSymbols.reduce((acc, curr) => {
      const existing = acc.find(i => i.symbol === curr);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ symbol: curr!, count: 1 });
      }
      return acc;
    }, [] as { symbol: string, count: number }[]).map(item => 
      item.count > 1 ? `${item.symbol}${item.count}` : item.symbol
    ).join('');
    
    setTargetReaction(formula);
    setSelectedElements([]);
    setReactionResult('');
    setFeedback('');
    setShowFeedback(false);
  };

  // Handle element selection
  const handleSelectElement = (element: Element) => {
    if (selectedElements.length >= 5) {
      return; // Limit to 5 elements
    }
    
    setSelectedElements([...selectedElements, element]);
  };

  // Remove last selected element
  const handleRemoveElement = () => {
    if (selectedElements.length > 0) {
      setSelectedElements(selectedElements.slice(0, -1));
    }
  };

  // Check reaction when the mix button is clicked
  const handleMixElements = () => {
    if (selectedElements.length === 0) {
      setFeedback('Select elements first!');
      setShowFeedback(true);
      return;
    }
    
    const selectedIds = selectedElements.map(e => e.id);
    
    // Check if selected elements match any reaction
    const matchedReaction = allReactions.find(reaction => {
      // Check if arrays have same elements regardless of order
      if (reaction.elements.length !== selectedIds.length) return false;
      
      // Create frequency counters for both arrays
      const counter1: Record<number, number> = {};
      const counter2: Record<number, number> = {};
      
      for (const id of reaction.elements) {
        counter1[id] = (counter1[id] || 0) + 1;
      }
      
      for (const id of selectedIds) {
        counter2[id] = (counter2[id] || 0) + 1;
      }
      
      // Check if counters match
      for (const id in counter1) {
        if (counter1[id] !== counter2[id]) return false;
      }
      
      return true;
    });
    
    if (matchedReaction) {
      setReactionResult(matchedReaction.result.name);
      
      // Check if this matches the target reaction
      const matchesTarget = reactions.some(r => 
        r.elements.length === matchedReaction.elements.length &&
        r.elements.every(id => matchedReaction.elements.includes(id))
      );
      
      if (matchesTarget) {
        setFeedback(`Correct! You created ${matchedReaction.result.name}!`);
        setScore(score + (level * 10));
        
        // Level completion logic
        if (level >= 10) {
          setGameover(true);
          setFeedback('Congratulations! You completed Science Lab!');
          
          // Save progress if logged in
          if (user) {
            saveProgress(10, score + (level * 10));
          }
        } else {
          // Move to next level
          setTimeout(() => {
            setLevel(level + 1);
            startNewRound();
          }, 2000);
        }
      } else {
        setFeedback(`You created ${matchedReaction.result.name}, but we needed ${targetReaction}!`);
        setLives(lives - 1);
        
        // Check if game over due to no lives left
        if (lives <= 1) {
          setGameover(true);
          setFeedback(`Game Over! Your final score: ${score}`);
          
          // Save progress if logged in
          if (user) {
            saveProgress(level, score);
          }
        }
      }
    } else {
      setReactionResult('No Reaction');
      setFeedback('These elements don\'t react together. Try again!');
      setLives(lives - 1);
      
      // Check if game over due to no lives left
      if (lives <= 1) {
        setGameover(true);
        setFeedback(`Game Over! Your final score: ${score}`);
        
        // Save progress if logged in
        if (user) {
          saveProgress(level, score);
        }
      }
    }
    
    setShowFeedback(true);
    
    // Clear selected elements after a delay
    setTimeout(() => {
      if (!gameover && (lives > 1 || (matchedReaction && reactions.some(r => 
        r.elements.length === matchedReaction.elements.length &&
        r.elements.every(id => matchedReaction.elements.includes(id))
      )))) {
        setSelectedElements([]);
        setReactionResult('');
      }
    }, 2000);
  };

  // Save player progress to the server
  const saveProgress = async (finalLevel: number, finalScore: number) => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/user-progress', {
        userId: user.id,
        gameId: 3, // Assuming Science Lab is game ID 3
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
    startNewRound();
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
        
        // Draw lab background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#f0fdfa');
        gradient.addColorStop(1, '#d0f5ec');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw lab equipment
        // Beaker
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 50, 100);
        ctx.lineTo(canvas.width / 2 - 60, 200);
        ctx.lineTo(canvas.width / 2 + 60, 200);
        ctx.lineTo(canvas.width / 2 + 50, 100);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#16A085';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Bubbles in beaker (if game started)
        if (gameStarted) {
          ctx.fillStyle = '#1abc9c';
          for (let i = 0; i < 8; i++) {
            const bubbleX = canvas.width / 2 - 40 + Math.random() * 80;
            const bubbleY = 120 + Math.random() * 60;
            const bubbleSize = 2 + Math.random() * 8;
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Test tubes
        for (let i = 0; i < 3; i++) {
          const tubeX = canvas.width / 4 + (canvas.width / 2) * (i / 2);
          const tubeColor = ['#3498DB', '#E74C3C', '#F1C40F'][i];
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.beginPath();
          ctx.moveTo(tubeX - 10, 220);
          ctx.lineTo(tubeX - 10, 300);
          ctx.arc(tubeX, 300, 10, Math.PI, 0);
          ctx.lineTo(tubeX + 10, 220);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#34495E';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Liquid in tube
          ctx.fillStyle = tubeColor;
          ctx.beginPath();
          ctx.moveTo(tubeX - 10, 270);
          ctx.lineTo(tubeX - 10, 300);
          ctx.arc(tubeX, 300, 10, Math.PI, 0);
          ctx.lineTo(tubeX + 10, 270);
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw title
        ctx.font = '24px "Fredoka One", cursive';
        ctx.fillStyle = '#16A085';
        ctx.textAlign = 'center';
        ctx.fillText('Science Lab', canvas.width / 2, 50);
        
        // Draw start instruction
        if (!gameStarted) {
          ctx.font = '18px "Nunito", sans-serif';
          ctx.fillStyle = '#333';
          ctx.fillText('Click "Start Game" to begin experimenting!', canvas.width / 2, canvas.height - 30);
        }
        
        setGameLoaded(true);
      }
    }
  }, [gameStarted]);

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
          <p>Loading Science Lab...</p>
        </div>
      )}
      
      <div className={`w-full flex flex-col items-center ${gameLoaded ? '' : 'hidden'}`}>
        {/* Game header with score and lives */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-lg font-bold bg-grade5 text-white px-3 py-1 rounded-full">
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
          className="w-full bg-teal-50 rounded-lg shadow-md mb-4"
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
            {/* Science lab interface */}
            {!gameover && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-game text-center mb-4">
                  Create: <span className="text-grade5">{targetReaction}</span>
                </h3>
                
                {/* Selected elements display */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4 min-h-16 flex items-center justify-center">
                  {selectedElements.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedElements.map((element, index) => (
                        <div 
                          key={index}
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: element.color }}
                        >
                          {element.symbol}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Select elements to mix</p>
                  )}
                </div>
                
                {/* Reaction result */}
                {reactionResult && (
                  <div className="bg-grade5 bg-opacity-10 p-3 rounded-lg mb-4 text-center">
                    <p className="font-bold text-grade5">{reactionResult}</p>
                  </div>
                )}
                
                {/* Available elements */}
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Available Elements:</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {elements.map((element) => (
                      <button
                        key={element.id}
                        onClick={() => handleSelectElement(element)}
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg transition transform hover:scale-110"
                        style={{ backgroundColor: element.color }}
                        title={element.name}
                      >
                        {element.symbol}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={handleRemoveElement}
                    disabled={selectedElements.length === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleMixElements}
                    className="bg-grade5 hover:bg-opacity-80 text-white font-bold py-2 px-8 rounded-lg transition"
                  >
                    Mix Elements
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

export default ScienceLab;
