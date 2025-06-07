import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';

interface CodeBlock {
  id: string;
  type: 'move' | 'turn' | 'action' | 'loop';
  label: string;
  color: string;
  icon: string;
  value?: number;
}

interface Robot {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  energy: number;
}

const AIRobotBuilder = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [robot, setRobot] = useState<Robot>({ x: 1, y: 1, direction: 'right', energy: 100 });
  const [program, setProgram] = useState<CodeBlock[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [gameGrid, setGameGrid] = useState<string[][]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user } = useUser();

  // Available code blocks for programming
  const codeBlocks: CodeBlock[] = [
    { id: 'move-forward', type: 'move', label: 'Move Forward', color: 'bg-blue-500', icon: '⬆️', value: 1 },
    { id: 'turn-left', type: 'turn', label: 'Turn Left', color: 'bg-green-500', icon: '⬅️' },
    { id: 'turn-right', type: 'turn', label: 'Turn Right', color: 'bg-green-500', icon: '➡️' },
    { id: 'collect', type: 'action', label: 'Collect Item', color: 'bg-yellow-500', icon: '🎯' },
    { id: 'repeat-2', type: 'loop', label: 'Repeat 2x', color: 'bg-purple-500', icon: '🔄', value: 2 },
    { id: 'repeat-3', type: 'loop', label: 'Repeat 3x', color: 'bg-purple-500', icon: '🔄', value: 3 }
  ];

  // Level challenges
  const challenges = [
    {
      level: 1,
      title: "First Steps",
      description: "Help your robot move forward and collect the star!",
      grid: [
        ['🤖', '⬜', '⭐', '⬜'],
        ['⬜', '⬜', '⬜', '⬜'],
        ['⬜', '⬜', '⬜', '⬜']
      ],
      target: { x: 2, y: 0 },
      hint: "Use 'Move Forward' blocks to reach the star, then use 'Collect Item' to pick it up!"
    },
    {
      level: 2,
      title: "Turn and Collect",
      description: "Navigate around the obstacle to reach the treasure!",
      grid: [
        ['🤖', '🧱', '⬜', '💎'],
        ['⬜', '🧱', '⬜', '⬜'],
        ['⬜', '⬜', '⬜', '⬜']
      ],
      target: { x: 3, y: 0 },
      hint: "Try going down, then right, then up to avoid the wall!"
    },
    {
      level: 3,
      title: "Loop Master",
      description: "Use loops to efficiently collect multiple items!",
      grid: [
        ['🤖', '⭐', '⭐', '⭐'],
        ['⬜', '⬜', '⬜', '⬜'],
        ['⬜', '⬜', '⬜', '💎']
      ],
      target: { x: 3, y: 2 },
      hint: "Use a repeat block to collect all the stars, then navigate to the diamond!"
    }
  ];

  const currentChallenge = challenges[Math.min(level - 1, challenges.length - 1)];

  // Initialize game grid
  useEffect(() => {
    if (currentChallenge) {
      setGameGrid([...currentChallenge.grid]);
      setRobot({ x: 0, y: 0, direction: 'right', energy: 100 });
    }
  }, [level]);

  // Play sound effect
  const playSound = (type: 'success' | 'error' | 'move' | 'collect') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        success: 'Excellent work!',
        error: 'Oops, try again!',
        move: 'Beep',
        collect: 'Item collected!'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.2;
      utterance.pitch = type === 'success' ? 1.5 : 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  // Add code block to program
  const addCodeBlock = (block: CodeBlock) => {
    if (program.length < 10) { // Limit program length
      setProgram([...program, { ...block, id: `${block.id}-${Date.now()}` }]);
    }
  };

  // Remove code block from program
  const removeCodeBlock = (index: number) => {
    const newProgram = [...program];
    newProgram.splice(index, 1);
    setProgram(newProgram);
  };

  // Clear entire program
  const clearProgram = () => {
    setProgram([]);
  };

  // Execute the robot program
  const runProgram = async () => {
    if (program.length === 0) {
      setFeedback('Add some code blocks to program your robot!');
      setShowFeedback(true);
      return;
    }

    setIsRunning(true);
    setShowFeedback(false);
    let currentRobot = { ...robot };
    let currentGrid = [...gameGrid.map(row => [...row])];
    let itemsCollected = 0;

    // Replace robot position with empty space
    currentGrid[currentRobot.y][currentRobot.x] = '⬜';

    for (let i = 0; i < program.length; i++) {
      const block = program[i];
      
      // Add delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 800));

      if (block.type === 'move') {
        // Move robot forward
        const newPos = moveForward(currentRobot);
        if (isValidPosition(newPos.x, newPos.y, currentGrid)) {
          currentRobot = newPos;
          playSound('move');
          updateRobotDisplay(currentRobot, currentGrid);
        } else {
          setFeedback('Robot hit a wall! Check your program.');
          setShowFeedback(true);
          playSound('error');
          setIsRunning(false);
          return;
        }
      } else if (block.type === 'turn') {
        // Turn robot
        currentRobot.direction = block.id.includes('left') ? turnLeft(currentRobot.direction) : turnRight(currentRobot.direction);
        updateRobotDisplay(currentRobot, currentGrid);
      } else if (block.type === 'action') {
        // Collect item
        const gridItem = currentGrid[currentRobot.y][currentRobot.x];
        if (gridItem === '⭐' || gridItem === '💎') {
          currentGrid[currentRobot.y][currentRobot.x] = '⬜';
          itemsCollected++;
          playSound('collect');
          setScore(score + 50);
        }
        updateRobotDisplay(currentRobot, currentGrid);
      } else if (block.type === 'loop') {
        // Handle loop - for simplicity, just repeat next block
        if (i + 1 < program.length) {
          const nextBlock = program[i + 1];
          const repeatCount = block.value || 2;
          
          for (let j = 0; j < repeatCount; j++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            
            if (nextBlock.type === 'move') {
              const newPos = moveForward(currentRobot);
              if (isValidPosition(newPos.x, newPos.y, currentGrid)) {
                currentRobot = newPos;
                playSound('move');
                updateRobotDisplay(currentRobot, currentGrid);
              }
            } else if (nextBlock.type === 'action') {
              const gridItem = currentGrid[currentRobot.y][currentRobot.x];
              if (gridItem === '⭐' || gridItem === '💎') {
                currentGrid[currentRobot.y][currentRobot.x] = '⬜';
                itemsCollected++;
                playSound('collect');
                setScore(score + 50);
              }
              updateRobotDisplay(currentRobot, currentGrid);
            }
          }
          i++; // Skip the next block since it was executed in the loop
        }
      }
    }

    // Check if challenge completed
    if (currentRobot.x === currentChallenge.target.x && currentRobot.y === currentChallenge.target.y && itemsCollected > 0) {
      setFeedback('🎉 Challenge completed! Your robot is getting smarter!');
      setCompletedChallenges(completedChallenges + 1);
      playSound('success');
      
      setTimeout(() => {
        if (level < challenges.length) {
          setLevel(level + 1);
          setProgram([]);
        } else {
          setFeedback('🏆 Congratulations! You\'ve mastered AI robot programming!');
        }
      }, 2000);
    } else {
      setFeedback('Almost there! Try adjusting your program to reach the target.');
      playSound('error');
    }

    setShowFeedback(true);
    setIsRunning(false);
  };

  // Helper functions
  const moveForward = (robot: Robot) => {
    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
    const delta = directions[robot.direction];
    return { ...robot, x: robot.x + delta.x, y: robot.y + delta.y };
  };

  const turnLeft = (direction: string) => {
    const turns = { up: 'left', left: 'down', down: 'right', right: 'up' };
    return turns[direction as keyof typeof turns] as any;
  };

  const turnRight = (direction: string) => {
    const turns = { up: 'right', right: 'down', down: 'left', left: 'up' };
    return turns[direction as keyof typeof turns] as any;
  };

  const isValidPosition = (x: number, y: number, grid: string[][]) => {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) return false;
    return grid[y][x] !== '🧱';
  };

  const updateRobotDisplay = (robot: Robot, grid: string[][]) => {
    setRobot(robot);
    setGameGrid([...grid]);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setCompletedChallenges(0);
    setGameStarted(false);
    setShowInstructions(true);
    setProgram([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-200 to-purple-300 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-purple-800 mb-2 animate-pulse">🤖 AI Robot Builder</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-purple-600">Level: {level}</div>
            <div className="text-lg font-bold text-green-600">
              Challenges: {completedChallenges} ✅
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">🎮 Build Your AI Robot!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🤖 Drag code blocks to program your robot's behavior</p>
              <p>🎯 Help your robot navigate and collect items</p>
              <p>🧠 Learn basic AI and programming concepts</p>
              <p>💡 Use hints if you get stuck!</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Building!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Programming Area */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🛠️ Code Blocks</h3>
              
              {/* Available Blocks */}
              <div className="space-y-2 mb-6">
                {codeBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => addCodeBlock(block)}
                    className={`w-full ${block.color} hover:opacity-80 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 text-left`}
                  >
                    {block.icon} {block.label}
                  </button>
                ))}
              </div>

              {/* Program Area */}
              <h4 className="text-xl font-bold text-gray-800 mb-2">📝 Your Program</h4>
              <div className="min-h-32 bg-gray-100 rounded-lg p-4 mb-4">
                {program.length === 0 ? (
                  <p className="text-gray-500 text-center">Drag blocks here to build your program!</p>
                ) : (
                  <div className="space-y-2">
                    {program.map((block, index) => (
                      <div 
                        key={`${block.id}-${index}`}
                        className={`${block.color} text-white px-3 py-2 rounded flex justify-between items-center`}
                      >
                        <span>{block.icon} {block.label}</span>
                        <button
                          onClick={() => removeCodeBlock(index)}
                          className="text-white hover:text-red-200 ml-2"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="space-y-2">
                <button
                  onClick={runProgram}
                  disabled={isRunning || program.length === 0}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  {isRunning ? '🔄 Running...' : '▶️ Run Program'}
                </button>
                <button
                  onClick={clearProgram}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🗑️ Clear Program
                </button>
              </div>
            </div>

            {/* Game Grid */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {currentChallenge.title}
                </h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all"
                >
                  💡 {showHints ? 'Hide' : 'Show'} Hint
                </button>
              </div>

              <p className="text-gray-600 mb-4">{currentChallenge.description}</p>

              {/* Hint Section */}
              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                  <p className="text-yellow-800">
                    <strong>💡 Hint:</strong> {currentChallenge.hint}
                  </p>
                </div>
              )}

              {/* Robot Grid */}
              <div className="grid grid-cols-4 gap-2 mb-6 max-w-md mx-auto">
                {gameGrid.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`
                        aspect-square rounded-lg border-2 border-gray-300 flex items-center justify-center text-4xl
                        ${robot.x === x && robot.y === y ? 'bg-blue-200 border-blue-500 animate-bounce' : 'bg-gray-50'}
                      `}
                    >
                      {robot.x === x && robot.y === y ? (
                        <div className="relative">
                          🤖
                          <div className="absolute -top-1 -right-1 text-lg">
                            {robot.direction === 'up' && '⬆️'}
                            {robot.direction === 'down' && '⬇️'}
                            {robot.direction === 'left' && '⬅️'}
                            {robot.direction === 'right' && '➡️'}
                          </div>
                        </div>
                      ) : (
                        cell
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('completed') || feedback.includes('Congratulations') 
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('Almost') 
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {feedback}
                </div>
              )}

              {/* Reset Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={resetGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
                >
                  🔄 Reset Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRobotBuilder;