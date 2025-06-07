import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Shape {
  name: string;
  sides: number;
  emoji: string;
  color: string;
}

const ShapesGeometry = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [shapeOptions, setShapeOptions] = useState<Shape[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [shapesLearned, setShapesLearned] = useState(0);
  const { user } = useUser();

  const shapes: Shape[] = [
    { name: 'Circle', sides: 0, emoji: '⭕', color: 'bg-red-400' },
    { name: 'Triangle', sides: 3, emoji: '🔺', color: 'bg-yellow-400' },
    { name: 'Square', sides: 4, emoji: '🟨', color: 'bg-blue-400' },
    { name: 'Rectangle', sides: 4, emoji: '🟦', color: 'bg-green-400' },
    { name: 'Pentagon', sides: 5, emoji: '⬟', color: 'bg-purple-400' },
    { name: 'Hexagon', sides: 6, emoji: '⬡', color: 'bg-pink-400' }
  ];

  const generateProblem = () => {
    // For 1st grade, focus on basic shapes
    const basicShapes = shapes.slice(0, 4); // Circle, Triangle, Square, Rectangle
    const targetShape = basicShapes[Math.floor(Math.random() * basicShapes.length)];
    
    // Create options including the correct shape
    const wrongShapes = basicShapes.filter(s => s.name !== targetShape.name);
    const selectedWrong = wrongShapes.slice(0, 3);
    const options = [targetShape, ...selectedWrong].sort(() => Math.random() - 0.5);
    
    setCurrentShape(targetShape);
    setShapeOptions(options);
    setShowFeedback(false);
  };

  const checkAnswer = (selectedShape: Shape) => {
    if (currentShape && selectedShape.name === currentShape.name) {
      setFeedback('🌟 Excellent! You know your shapes!');
      setScore(score + 30);
      setShapesLearned(shapesLearned + 1);
      
      if (shapesLearned + 1 >= 8) {
        setLevel(level + 1);
        setShapesLearned(0);
      }
      
      setTimeout(() => {
        generateProblem();
      }, 2000);
    } else {
      setFeedback('🔍 Look at the shape carefully and try again!');
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
    setShapesLearned(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  // Draw shape function
  const DrawShape = ({ shape }: { shape: Shape }) => {
    const svgProps = {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      className: "mx-auto"
    };

    switch (shape.name) {
      case 'Circle':
        return (
          <svg {...svgProps}>
            <circle cx="60" cy="60" r="45" fill="#EF4444" stroke="#DC2626" strokeWidth="3"/>
          </svg>
        );
      case 'Triangle':
        return (
          <svg {...svgProps}>
            <polygon points="60,15 105,90 15,90" fill="#FDE047" stroke="#EAB308" strokeWidth="3"/>
          </svg>
        );
      case 'Square':
        return (
          <svg {...svgProps}>
            <rect x="25" y="25" width="70" height="70" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3"/>
          </svg>
        );
      case 'Rectangle':
        return (
          <svg {...svgProps}>
            <rect x="15" y="35" width="90" height="50" fill="#10B981" stroke="#059669" strokeWidth="3"/>
          </svg>
        );
      default:
        return <div className="w-30 h-30 bg-gray-300 rounded"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 via-pink-300 to-yellow-300 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">🔷 Shapes & Geometry</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-purple-600">Score: {score}</div>
            <div className="text-lg font-bold text-pink-600">Geometry Level: {level}</div>
            <div className="text-lg font-bold text-yellow-600">
              Shapes: {'🔷'.repeat(shapesLearned)} ({shapesLearned}/8)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">📐 Learn About Shapes</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🔷 Look at the shape and pick the correct name!</p>
              <p>📐 Learn circles, triangles, squares, and rectangles!</p>
              <p>🎯 Identify 8 shapes correctly to advance!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              📐 Start Learning Shapes!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && currentShape && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="mb-8">
              <div className="text-2xl text-purple-700 mb-6">🔍 What shape is this?</div>
              <div className="mb-6">
                <DrawShape shape={currentShape} />
              </div>
            </div>

            {/* Shape options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {shapeOptions.map((shape, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(shape)}
                  className={`${shape.color} hover:opacity-80 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105 border-4 border-white shadow-lg`}
                >
                  <div className="text-3xl mb-2">{shape.emoji}</div>
                  <div>{shape.name}</div>
                </button>
              ))}
            </div>

            {/* Shape collection */}
            <div className="mb-6 p-4 bg-purple-100 rounded-xl">
              <div className="text-lg text-purple-700 mb-2">🏆 Shapes You've Learned:</div>
              <div className="flex justify-center flex-wrap">
                {Array(shapesLearned).fill('🔷').map((gem, i) => (
                  <span key={i} className="text-2xl m-1 animate-spin">{gem}</span>
                ))}
                {Array(8 - shapesLearned).fill('⚫').map((spot, i) => (
                  <span key={i} className="text-2xl m-1 opacity-30">{spot}</span>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Excellent') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Shape Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShapesGeometry;