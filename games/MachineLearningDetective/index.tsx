import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Clue {
  id: string;
  type: 'color' | 'shape' | 'size' | 'pattern';
  value: string;
  isRelevant: boolean;
}

interface Case {
  id: number;
  title: string;
  description: string;
  clues: Clue[];
  solution: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MachineLearningDetective = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [selectedClues, setSelectedClues] = useState<string[]>([]);
  const [aiTraining, setAiTraining] = useState<Clue[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [casesCompleted, setCasesCompleted] = useState(0);
  const [aiAccuracy, setAiAccuracy] = useState(0);
  const { user } = useUser();

  const cases: Case[] = [
    {
      id: 1,
      title: "The Missing Pet Mystery",
      description: "Help find the missing pet by analyzing the clues!",
      clues: [
        { id: 'clue1', type: 'color', value: 'Brown fur', isRelevant: true },
        { id: 'clue2', type: 'size', value: 'Small size', isRelevant: true },
        { id: 'clue3', type: 'pattern', value: 'Striped tail', isRelevant: false },
        { id: 'clue4', type: 'shape', value: 'Long ears', isRelevant: true },
        { id: 'clue5', type: 'color', value: 'Blue collar', isRelevant: false },
        { id: 'clue6', type: 'pattern', value: 'Spotted pattern', isRelevant: false }
      ],
      solution: "The missing pet is a small brown rabbit with long ears!",
      hint: "Look for clues about the pet's physical features that would help identify it.",
      difficulty: 'easy'
    },
    {
      id: 2,
      title: "The Cookie Thief Case",
      description: "Someone took cookies from the jar. Find the pattern!",
      clues: [
        { id: 'clue1', type: 'pattern', value: 'Crumbs on floor', isRelevant: true },
        { id: 'clue2', type: 'size', value: 'Small handprints', isRelevant: true },
        { id: 'clue3', type: 'color', value: 'Chocolate chips', isRelevant: false },
        { id: 'clue4', type: 'pattern', value: 'Chair moved', isRelevant: true },
        { id: 'clue5', type: 'shape', value: 'Round cookies', isRelevant: false },
        { id: 'clue6', type: 'size', value: 'Low cabinet', isRelevant: true }
      ],
      solution: "A small child took the cookies - they needed to move a chair and left small handprints!",
      hint: "Think about what size person would need help reaching the cookie jar.",
      difficulty: 'medium'
    },
    {
      id: 3,
      title: "The Garden Flower Mystery",
      description: "Which flowers will bloom next? Train your AI to predict!",
      clues: [
        { id: 'clue1', type: 'color', value: 'Sunny location', isRelevant: true },
        { id: 'clue2', type: 'pattern', value: 'Watered daily', isRelevant: true },
        { id: 'clue3', type: 'size', value: 'Large pot', isRelevant: false },
        { id: 'clue4', type: 'shape', value: 'Round petals', isRelevant: false },
        { id: 'clue5', type: 'pattern', value: 'Good soil', isRelevant: true },
        { id: 'clue6', type: 'color', value: 'Green leaves', isRelevant: true }
      ],
      solution: "Flowers in sunny spots with daily water and good soil will bloom first!",
      hint: "Consider what conditions flowers need to grow well.",
      difficulty: 'hard'
    }
  ];

  useEffect(() => {
    if (gameStarted) {
      setCurrentCase(cases[Math.min(level - 1, cases.length - 1)]);
    }
  }, [level, gameStarted]);

  const playSound = (type: 'success' | 'error' | 'training' | 'discovery') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        success: 'Case solved! Excellent detective work!',
        error: 'Not quite right. Keep investigating!',
        training: 'AI is learning from this clue',
        discovery: 'Important clue discovered!'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.1;
      utterance.pitch = type === 'success' ? 1.4 : 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const selectClue = (clueId: string) => {
    if (selectedClues.includes(clueId)) {
      setSelectedClues(selectedClues.filter(id => id !== clueId));
    } else {
      setSelectedClues([...selectedClues, clueId]);
      const clue = currentCase?.clues.find(c => c.id === clueId);
      if (clue?.isRelevant) {
        playSound('discovery');
      }
    }
  };

  const trainAI = () => {
    if (!currentCase) return;

    const relevantClues = currentCase.clues.filter(clue => 
      selectedClues.includes(clue.id) && clue.isRelevant
    );
    const irrelevantClues = currentCase.clues.filter(clue => 
      selectedClues.includes(clue.id) && !clue.isRelevant
    );

    setAiTraining([...relevantClues]);
    
    // Calculate AI accuracy based on selected clues
    const totalRelevant = currentCase.clues.filter(c => c.isRelevant).length;
    const correctlySelected = relevantClues.length;
    const incorrectlySelected = irrelevantClues.length;
    
    const accuracy = Math.max(0, Math.min(100, 
      ((correctlySelected - incorrectlySelected) / totalRelevant) * 100
    ));
    
    setAiAccuracy(Math.round(accuracy));
    playSound('training');
    
    setFeedback(`AI Training Complete! Accuracy: ${Math.round(accuracy)}%`);
    setShowFeedback(true);
  };

  const solveCase = () => {
    if (!currentCase) return;

    const relevantClues = currentCase.clues.filter(clue => 
      selectedClues.includes(clue.id) && clue.isRelevant
    );
    
    const requiredClues = currentCase.clues.filter(c => c.isRelevant).length;
    const foundClues = relevantClues.length;
    
    if (foundClues >= Math.ceil(requiredClues * 0.75)) {
      setFeedback(`🎉 Case Solved! ${currentCase.solution}`);
      setScore(score + (100 * level));
      setCasesCompleted(casesCompleted + 1);
      playSound('success');
      
      setTimeout(() => {
        if (level < cases.length) {
          setLevel(level + 1);
          setSelectedClues([]);
          setAiTraining([]);
          setAiAccuracy(0);
        } else {
          setFeedback('🏆 Congratulations! You\'ve become a master AI detective!');
        }
      }, 3000);
    } else {
      setFeedback('Need more evidence! Train your AI with more relevant clues.');
      playSound('error');
    }
    
    setShowFeedback(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setCasesCompleted(0);
    setSelectedClues([]);
    setAiTraining([]);
    setAiAccuracy(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  if (!currentCase && gameStarted) {
    return <div>Loading case...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-purple-800 mb-2 animate-pulse">🕵️ Machine Learning Detective</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-purple-600">Level: {level}</div>
            <div className="text-lg font-bold text-green-600">Cases: {casesCompleted} 🔍</div>
            <div className="text-lg font-bold text-orange-600">AI Accuracy: {aiAccuracy}%</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">🧠 AI Detective Training</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🕵️ Analyze clues and patterns to solve mysteries</p>
              <p>🤖 Train your AI assistant to recognize important evidence</p>
              <p>🧩 Use pattern recognition to crack difficult cases</p>
              <p>💡 Get hints when you need help with investigations</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🔍 Start Investigation!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && currentCase && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Case Information */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Case #{currentCase.id}: {currentCase.title}
                </h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all"
                >
                  💡 {showHints ? 'Hide' : 'Show'} Hint
                </button>
              </div>

              <p className="text-gray-600 mb-6 text-lg">{currentCase.description}</p>

              {/* Hint Section */}
              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                  <p className="text-yellow-800">
                    <strong>💡 Detective Hint:</strong> {currentCase.hint}
                  </p>
                </div>
              )}

              {/* Evidence Board */}
              <h4 className="text-xl font-bold text-gray-800 mb-4">🔍 Evidence Board</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {currentCase.clues.map((clue) => (
                  <div
                    key={clue.id}
                    onClick={() => selectClue(clue.id)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105
                      ${selectedClues.includes(clue.id)
                        ? clue.isRelevant
                          ? 'bg-green-100 border-green-400 shadow-lg'
                          : 'bg-red-100 border-red-400 shadow-lg'
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }
                    `}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {clue.type === 'color' && '🎨'}
                        {clue.type === 'shape' && '🔷'}
                        {clue.type === 'size' && '📏'}
                        {clue.type === 'pattern' && '🧩'}
                      </div>
                      <p className="font-bold text-sm">{clue.value}</p>
                      <p className="text-xs text-gray-500 capitalize">{clue.type}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Training Visualization */}
              {aiTraining.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h5 className="font-bold text-blue-800 mb-2">🤖 AI Learning Progress</h5>
                  <div className="flex flex-wrap gap-2">
                    {aiTraining.map((clue, index) => (
                      <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {clue.value}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${aiAccuracy}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">AI Confidence: {aiAccuracy}%</p>
                  </div>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-4 rounded-xl text-center text-lg font-bold mb-4 ${
                  feedback.includes('Solved') || feedback.includes('Congratulations')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('Training')
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* AI Control Panel */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🤖 AI Assistant</h3>
              
              {/* AI Status */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-2 animate-pulse">🤖</div>
                  <p className="font-bold">Detective AI</p>
                  <p className="text-sm text-gray-600">Status: {aiTraining.length > 0 ? 'Trained' : 'Ready to Learn'}</p>
                </div>
              </div>

              {/* Selected Evidence */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-2">📋 Selected Evidence</h4>
                <div className="max-h-32 overflow-y-auto">
                  {selectedClues.length === 0 ? (
                    <p className="text-gray-500 text-sm">Select clues from the evidence board</p>
                  ) : (
                    <div className="space-y-1">
                      {selectedClues.map(clueId => {
                        const clue = currentCase.clues.find(c => c.id === clueId);
                        return clue ? (
                          <div key={clueId} className="text-sm bg-blue-50 p-2 rounded">
                            {clue.value}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={trainAI}
                  disabled={selectedClues.length === 0}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  🧠 Train AI
                </button>
                <button
                  onClick={solveCase}
                  disabled={aiTraining.length === 0}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  🔍 Solve Case
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🔄 New Investigation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineLearningDetective;