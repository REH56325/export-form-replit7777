import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface LifeStage {
  stage: string;
  emoji: string;
  order: number;
}

const LifeCycleSort = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentCycle, setCurrentCycle] = useState<string>('');
  const [stages, setStages] = useState<LifeStage[]>([]);
  const [sortedStages, setSortedStages] = useState<LifeStage[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cycles, setCycles] = useState(0);
  const { user } = useUser();

  const lifeCycles = {
    'Butterfly': [
      { stage: 'Egg', emoji: '🥚', order: 1 },
      { stage: 'Caterpillar', emoji: '🐛', order: 2 },
      { stage: 'Chrysalis', emoji: '🛡️', order: 3 },
      { stage: 'Butterfly', emoji: '🦋', order: 4 }
    ],
    'Frog': [
      { stage: 'Eggs', emoji: '🥚', order: 1 },
      { stage: 'Tadpole', emoji: '🐟', order: 2 },
      { stage: 'Froglet', emoji: '🐸', order: 3 },
      { stage: 'Adult Frog', emoji: '🐸', order: 4 }
    ],
    'Chicken': [
      { stage: 'Egg', emoji: '🥚', order: 1 },
      { stage: 'Chick', emoji: '🐣', order: 2 },
      { stage: 'Young Chicken', emoji: '🐤', order: 3 },
      { stage: 'Adult Chicken', emoji: '🐓', order: 4 }
    ]
  };

  const generateProblem = () => {
    const cycles = Object.keys(lifeCycles);
    const randomCycle = cycles[Math.floor(Math.random() * cycles.length)];
    const cycleStages = lifeCycles[randomCycle as keyof typeof lifeCycles];
    
    // Shuffle the stages
    const shuffledStages = [...cycleStages].sort(() => Math.random() - 0.5);
    
    setCurrentCycle(randomCycle);
    setStages(shuffledStages);
    setSortedStages([]);
    setShowFeedback(false);
  };

  const addToSorted = (stage: LifeStage) => {
    if (sortedStages.includes(stage)) return;
    setSortedStages([...sortedStages, stage]);
  };

  const removeFromSorted = (index: number) => {
    const newSorted = sortedStages.filter((_, i) => i !== index);
    setSortedStages(newSorted);
  };

  const checkOrder = () => {
    if (sortedStages.length !== stages.length) {
      setFeedback('🔄 Please put all stages in order!');
      setShowFeedback(true);
      return;
    }

    const correctOrder = sortedStages.every((stage, index) => stage.order === index + 1);
    
    if (correctOrder) {
      setFeedback('🌟 Perfect! You understand the life cycle!');
      setScore(score + 40);
      setCycles(cycles + 1);
      
      if (cycles + 1 >= 5) {
        setLevel(level + 1);
        setCycles(0);
      }
      
      setTimeout(() => {
        generateProblem();
      }, 2500);
    } else {
      setFeedback('🤔 Think about what happens first, then next...');
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
    setCycles(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-blue-200 to-purple-200 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2">🔄 Life Cycle Sort</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-green-600">Score: {score}</div>
            <div className="text-lg font-bold text-blue-600">Science Level: {level}</div>
            <div className="text-lg font-bold text-purple-600">
              Cycles: {'🧬'.repeat(cycles)} ({cycles}/5)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🔬 Learn About Life Cycles</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🔄 Put the life cycle stages in the correct order!</p>
              <p>🐛 Learn how animals grow and change!</p>
              <p>🎯 Complete 5 life cycles to become a scientist!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🔬 Start Learning!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-2xl text-green-700 mb-4">🔄 Put the {currentCycle} life cycle in order:</div>
            </div>

            {/* Available stages */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-700 mb-3">📦 Available Stages:</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {stages.filter(stage => !sortedStages.includes(stage)).map((stage, index) => (
                  <button
                    key={index}
                    onClick={() => addToSorted(stage)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center space-y-1"
                  >
                    <span className="text-3xl">{stage.emoji}</span>
                    <span className="text-sm">{stage.stage}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sorted stages */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-700 mb-3">📋 Your Order:</h3>
              <div className="flex justify-center items-center gap-2 min-h-[100px] bg-gray-100 rounded-xl p-4">
                {sortedStages.map((stage, index) => (
                  <div key={index} className="flex items-center">
                    <button
                      onClick={() => removeFromSorted(index)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center space-y-1"
                    >
                      <span className="text-3xl">{stage.emoji}</span>
                      <span className="text-sm">{stage.stage}</span>
                    </button>
                    {index < sortedStages.length - 1 && (
                      <span className="text-2xl mx-2">➡️</span>
                    )}
                  </div>
                ))}
                {sortedStages.length === 0 && (
                  <div className="text-gray-500 text-lg">Click stages above to add them here!</div>
                )}
              </div>
            </div>

            {/* Check button */}
            <div className="text-center mb-6">
              <button
                onClick={checkOrder}
                disabled={sortedStages.length === 0}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
              >
                ✅ Check My Order!
              </button>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold text-center ${
                feedback.includes('Perfect') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Life Cycle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeCycleSort;