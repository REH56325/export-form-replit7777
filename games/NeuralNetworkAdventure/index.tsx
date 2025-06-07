import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Neuron {
  id: string;
  x: number;
  y: number;
  layer: number;
  active: boolean;
  connections: string[];
  value: number;
}

interface Signal {
  id: string;
  fromNeuron: string;
  toNeuron: string;
  progress: number;
  strength: number;
}

const NeuralNetworkAdventure = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [networksCompleted, setNetworksCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNeuron, setSelectedNeuron] = useState<string | null>(null);
  const { user } = useUser();

  const networkLevels = [
    {
      level: 1,
      title: "Simple Path",
      description: "Connect neurons to create a basic signal path",
      neurons: [
        { id: 'input1', x: 50, y: 150, layer: 0, active: false, connections: [], value: 1 },
        { id: 'hidden1', x: 250, y: 100, layer: 1, active: false, connections: [], value: 0 },
        { id: 'hidden2', x: 250, y: 200, layer: 1, active: false, connections: [], value: 0 },
        { id: 'output1', x: 450, y: 150, layer: 2, active: false, connections: [], value: 0 }
      ],
      targetConnections: [
        ['input1', 'hidden1'],
        ['hidden1', 'output1']
      ],
      hint: "Connect the input neuron to a hidden neuron, then to the output neuron!"
    },
    {
      level: 2,
      title: "Parallel Processing",
      description: "Create multiple pathways for complex thinking",
      neurons: [
        { id: 'input1', x: 50, y: 100, layer: 0, active: false, connections: [], value: 1 },
        { id: 'input2', x: 50, y: 200, layer: 0, active: false, connections: [], value: 1 },
        { id: 'hidden1', x: 200, y: 80, layer: 1, active: false, connections: [], value: 0 },
        { id: 'hidden2', x: 200, y: 150, layer: 1, active: false, connections: [], value: 0 },
        { id: 'hidden3', x: 200, y: 220, layer: 1, active: false, connections: [], value: 0 },
        { id: 'output1', x: 350, y: 150, layer: 2, active: false, connections: [], value: 0 }
      ],
      targetConnections: [
        ['input1', 'hidden1'],
        ['input1', 'hidden2'],
        ['input2', 'hidden2'],
        ['input2', 'hidden3'],
        ['hidden1', 'output1'],
        ['hidden2', 'output1'],
        ['hidden3', 'output1']
      ],
      hint: "Connect both inputs to multiple hidden neurons, then all hidden neurons to the output!"
    },
    {
      level: 3,
      title: "Deep Network",
      description: "Build a deep neural network with multiple layers",
      neurons: [
        { id: 'input1', x: 50, y: 120, layer: 0, active: false, connections: [], value: 1 },
        { id: 'input2', x: 50, y: 180, layer: 0, active: false, connections: [], value: 1 },
        { id: 'hidden1_1', x: 150, y: 100, layer: 1, active: false, connections: [], value: 0 },
        { id: 'hidden1_2', x: 150, y: 150, layer: 1, active: false, connections: [], value: 0 },
        { id: 'hidden1_3', x: 150, y: 200, layer: 1, active: false, connections: [], value: 0 },
        { id: 'hidden2_1', x: 250, y: 120, layer: 2, active: false, connections: [], value: 0 },
        { id: 'hidden2_2', x: 250, y: 180, layer: 2, active: false, connections: [], value: 0 },
        { id: 'output1', x: 350, y: 150, layer: 3, active: false, connections: [], value: 0 }
      ],
      targetConnections: [
        ['input1', 'hidden1_1'],
        ['input1', 'hidden1_2'],
        ['input2', 'hidden1_2'],
        ['input2', 'hidden1_3'],
        ['hidden1_1', 'hidden2_1'],
        ['hidden1_2', 'hidden2_1'],
        ['hidden1_2', 'hidden2_2'],
        ['hidden1_3', 'hidden2_2'],
        ['hidden2_1', 'output1'],
        ['hidden2_2', 'output1']
      ],
      hint: "Create a deep network by connecting inputs to first hidden layer, then to second hidden layer, and finally to output!"
    }
  ];

  const currentNetwork = networkLevels[Math.min(level - 1, networkLevels.length - 1)];

  useEffect(() => {
    if (gameStarted) {
      setNeurons([...currentNetwork.neurons]);
      setSignals([]);
      setSelectedNeuron(null);
    }
  }, [level, gameStarted]);

  const playSound = (type: 'connect' | 'signal' | 'success' | 'error') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        connect: 'Neural connection established',
        signal: 'Signal processing',
        success: 'Neural network activated successfully!',
        error: 'Connection failed'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.2;
      utterance.pitch = type === 'success' ? 1.4 : type === 'signal' ? 0.8 : 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const connectNeurons = (fromId: string, toId: string) => {
    const fromNeuron = neurons.find(n => n.id === fromId);
    const toNeuron = neurons.find(n => n.id === toId);
    
    if (!fromNeuron || !toNeuron) return;
    
    // Check if connection already exists
    if (fromNeuron.connections.includes(toId)) return;
    
    // Only allow forward connections (to higher layers)
    if (fromNeuron.layer >= toNeuron.layer) {
      setFeedback('Can only connect to neurons in the next layer!');
      setShowFeedback(true);
      playSound('error');
      return;
    }

    const newNeurons = neurons.map(neuron => {
      if (neuron.id === fromId) {
        return { ...neuron, connections: [...neuron.connections, toId] };
      }
      return neuron;
    });

    setNeurons(newNeurons);
    playSound('connect');
  };

  const handleNeuronClick = (neuronId: string) => {
    if (selectedNeuron === null) {
      setSelectedNeuron(neuronId);
    } else if (selectedNeuron === neuronId) {
      setSelectedNeuron(null);
    } else {
      connectNeurons(selectedNeuron, neuronId);
      setSelectedNeuron(null);
    }
  };

  const activateNetwork = async () => {
    setIsProcessing(true);
    setSignals([]);
    
    // Reset neuron values
    const resetNeurons = neurons.map(n => ({ ...n, active: false, value: n.layer === 0 ? 1 : 0 }));
    setNeurons(resetNeurons);

    // Activate input neurons
    const inputNeurons = resetNeurons.filter(n => n.layer === 0);
    inputNeurons.forEach(neuron => {
      neuron.active = true;
    });

    // Process signals layer by layer
    for (let layer = 0; layer < 4; layer++) {
      const layerNeurons = resetNeurons.filter(n => n.layer === layer && n.active);
      
      for (const neuron of layerNeurons) {
        for (const connectionId of neuron.connections) {
          // Create signal
          const signalId = `${neuron.id}-${connectionId}-${Date.now()}`;
          const newSignal: Signal = {
            id: signalId,
            fromNeuron: neuron.id,
            toNeuron: connectionId,
            progress: 0,
            strength: neuron.value
          };

          setSignals(prev => [...prev, newSignal]);
          playSound('signal');

          // Animate signal
          for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise(resolve => setTimeout(resolve, 50));
            setSignals(prev =>
              prev.map(s => s.id === signalId ? { ...s, progress } : s)
            );
          }

          // Activate target neuron
          const targetNeuron = resetNeurons.find(n => n.id === connectionId);
          if (targetNeuron) {
            targetNeuron.active = true;
            targetNeuron.value += neuron.value * 0.5; // Weighted connection
          }

          // Remove completed signal
          setSignals(prev => prev.filter(s => s.id !== signalId));
        }
      }

      setNeurons([...resetNeurons]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Check if network completed successfully
    const outputNeurons = resetNeurons.filter(n => n.layer === Math.max(...resetNeurons.map(n => n.layer)));
    const networkSuccess = outputNeurons.every(n => n.active && n.value > 0);

    if (networkSuccess) {
      setFeedback('🎉 Neural network successfully processed the signal!');
      setScore(score + (100 * level));
      setNetworksCompleted(networksCompleted + 1);
      playSound('success');
      
      setTimeout(() => {
        if (level < networkLevels.length) {
          setLevel(level + 1);
        } else {
          setFeedback('🏆 Congratulations! You\'ve mastered neural networks!');
        }
      }, 2000);
    } else {
      setFeedback('Signal didn\'t reach the output. Check your connections!');
      playSound('error');
    }

    setShowFeedback(true);
    setIsProcessing(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setNetworksCompleted(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  const getNeuronPosition = (neuron: Neuron) => {
    return { x: neuron.x, y: neuron.y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-purple-800 mb-2 animate-pulse">🧠 Neural Network Adventure</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-purple-600">Level: {level}</div>
            <div className="text-lg font-bold text-green-600">Networks: {networksCompleted} 🧠</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">🔗 Connect the Neural Network!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🧠 Click neurons to connect them and create pathways</p>
              <p>⚡ Watch signals flow through your network</p>
              <p>🎯 Make sure signals reach the output neurons</p>
              <p>🔬 Learn how AI thinks and processes information</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Adventure!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🎮 Control Panel</h3>
              
              {/* Level Info */}
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-purple-800 mb-2">{currentNetwork.title}</h4>
                <p className="text-sm text-purple-600">{currentNetwork.description}</p>
              </div>

              {/* Hint Section */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all mb-4"
              >
                💡 {showHints ? 'Hide' : 'Show'} Hint
              </button>

              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Hint:</strong> {currentNetwork.hint}
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-blue-800 mb-2">How to Connect:</h5>
                <ol className="text-sm text-blue-600 space-y-1">
                  <li>1. Click a neuron to select it</li>
                  <li>2. Click another neuron to connect</li>
                  <li>3. Only forward connections allowed</li>
                  <li>4. Click "Activate" to test network</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={activateNetwork}
                  disabled={isProcessing}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  {isProcessing ? '⚡ Processing...' : '⚡ Activate Network'}
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🔄 Reset Game
                </button>
              </div>
            </div>

            {/* Neural Network Visualization */}
            <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Neural Network</h3>
              
              <div className="relative bg-gray-50 rounded-lg p-4 min-h-96">
                <svg width="100%" height="350" viewBox="0 0 500 300">
                  {/* Draw connections */}
                  {neurons.map(neuron =>
                    neuron.connections.map(connectionId => {
                      const targetNeuron = neurons.find(n => n.id === connectionId);
                      if (!targetNeuron) return null;
                      
                      return (
                        <line
                          key={`${neuron.id}-${connectionId}`}
                          x1={neuron.x}
                          y1={neuron.y}
                          x2={targetNeuron.x}
                          y2={targetNeuron.y}
                          stroke="#3B82F6"
                          strokeWidth="3"
                          className="opacity-60"
                        />
                      );
                    })
                  )}

                  {/* Draw signals */}
                  {signals.map(signal => {
                    const fromNeuron = neurons.find(n => n.id === signal.fromNeuron);
                    const toNeuron = neurons.find(n => n.id === signal.toNeuron);
                    if (!fromNeuron || !toNeuron) return null;

                    const x = fromNeuron.x + (toNeuron.x - fromNeuron.x) * (signal.progress / 100);
                    const y = fromNeuron.y + (toNeuron.y - fromNeuron.y) * (signal.progress / 100);

                    return (
                      <circle
                        key={signal.id}
                        cx={x}
                        cy={y}
                        r="6"
                        fill="#10B981"
                        className="animate-pulse"
                      />
                    );
                  })}

                  {/* Draw neurons */}
                  {neurons.map(neuron => (
                    <g key={neuron.id}>
                      <circle
                        cx={neuron.x}
                        cy={neuron.y}
                        r="25"
                        fill={
                          selectedNeuron === neuron.id 
                            ? "#F59E0B" 
                            : neuron.active 
                            ? "#10B981" 
                            : neuron.layer === 0 
                            ? "#3B82F6" 
                            : neuron.layer === Math.max(...neurons.map(n => n.layer))
                            ? "#8B5CF6"
                            : "#6B7280"
                        }
                        stroke="#1F2937"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:r-30"
                        onClick={() => handleNeuronClick(neuron.id)}
                      />
                      <text
                        x={neuron.x}
                        y={neuron.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {neuron.layer === 0 ? 'IN' : neuron.layer === Math.max(...neurons.map(n => n.layer)) ? 'OUT' : 'H'}
                      </text>
                      {neuron.active && (
                        <text
                          x={neuron.x}
                          y={neuron.y - 35}
                          textAnchor="middle"
                          fill="#10B981"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {neuron.value.toFixed(1)}
                        </text>
                      )}
                    </g>
                  ))}

                  {/* Layer labels */}
                  <text x="50" y="30" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">Input Layer</text>
                  <text x="200" y="30" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">Hidden Layers</text>
                  <text x="400" y="30" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">Output Layer</text>
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span>Input</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                  <span>Hidden</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span>Output</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span>Selected</span>
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('successfully') || feedback.includes('Congratulations')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('reach')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuralNetworkAdventure;