import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Command {
  id: string;
  phrase: string;
  intent: string;
  response: string;
  category: 'greeting' | 'question' | 'action' | 'music' | 'weather';
  trained: boolean;
}

interface TrainingSession {
  command: Command;
  userInput: string;
  accuracy: number;
}

const AIVoiceAssistantLab = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [assistantName, setAssistantName] = useState('Alex');
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [trainedCommands, setTrainedCommands] = useState<Command[]>([]);
  const [currentTraining, setCurrentTraining] = useState<Command | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [assistantsCreated, setAssistantsCreated] = useState(0);
  const [aiAccuracy, setAiAccuracy] = useState(0);
  const { user } = useUser();

  const commandLibrary: Command[] = [
    {
      id: 'greet1',
      phrase: 'Hello assistant',
      intent: 'greeting',
      response: 'Hello! How can I help you today?',
      category: 'greeting',
      trained: false
    },
    {
      id: 'greet2',
      phrase: 'Good morning',
      intent: 'greeting',
      response: 'Good morning! Ready to start the day?',
      category: 'greeting',
      trained: false
    },
    {
      id: 'weather1',
      phrase: 'What is the weather like',
      intent: 'weather_query',
      response: 'Today is sunny with a temperature of 75°F!',
      category: 'weather',
      trained: false
    },
    {
      id: 'music1',
      phrase: 'Play some music',
      intent: 'play_music',
      response: 'Playing your favorite playlist now!',
      category: 'music',
      trained: false
    },
    {
      id: 'question1',
      phrase: 'What time is it',
      intent: 'time_query',
      response: 'The current time is 2:30 PM.',
      category: 'question',
      trained: false
    },
    {
      id: 'action1',
      phrase: 'Turn on the lights',
      intent: 'control_lights',
      response: 'Turning on the lights for you!',
      category: 'action',
      trained: false
    },
    {
      id: 'action2',
      phrase: 'Set a timer for 5 minutes',
      intent: 'set_timer',
      response: 'Timer set for 5 minutes. I\'ll let you know when it\'s done!',
      category: 'action',
      trained: false
    },
    {
      id: 'question2',
      phrase: 'Tell me a joke',
      intent: 'entertainment',
      response: 'Why did the robot go to school? To improve its algorithms!',
      category: 'question',
      trained: false
    }
  ];

  const levelRequirements = [
    { level: 1, commandsNeeded: 3, title: "Basic Assistant", description: "Train basic greetings and simple commands" },
    { level: 2, commandsNeeded: 5, title: "Smart Helper", description: "Add weather and music capabilities" },
    { level: 3, commandsNeeded: 7, title: "Advanced AI", description: "Create a fully functional voice assistant" }
  ];

  const currentRequirement = levelRequirements[Math.min(level - 1, levelRequirements.length - 1)];

  useEffect(() => {
    calculateAccuracy();
  }, [trainedCommands]);

  const playSound = (type: 'listen' | 'speak' | 'train' | 'success' | 'error') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        listen: 'Listening...',
        speak: assistantResponse || 'I understand',
        train: 'Learning new command',
        success: 'Voice assistant trained successfully!',
        error: 'Sorry, I didn\'t understand that'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = type === 'speak' ? 0.9 : 1.1;
      utterance.pitch = type === 'speak' ? 1.2 : 1.0;
      if (type === 'speak') {
        utterance.voice = speechSynthesis.getVoices().find(voice => 
          voice.name.includes('female') || voice.name.includes('Female')
        ) || speechSynthesis.getVoices()[0];
      }
      speechSynthesis.speak(utterance);
    }
  };

  const calculateAccuracy = () => {
    if (trainedCommands.length === 0) {
      setAiAccuracy(0);
      return;
    }
    
    const accuracy = (trainedCommands.length / commandLibrary.length) * 100;
    setAiAccuracy(Math.round(accuracy));
  };

  const startListening = () => {
    setIsListening(true);
    playSound('listen');
    
    // Simulate listening with visual feedback
    setTimeout(() => {
      setIsListening(false);
      if (userInput.trim()) {
        processUserInput(userInput);
      }
    }, 2000);
  };

  const processUserInput = (input: string) => {
    const normalizedInput = input.toLowerCase().trim();
    
    // Check if input matches any trained command
    const matchedCommand = trainedCommands.find(cmd => 
      normalizedInput.includes(cmd.phrase.toLowerCase()) ||
      calculateSimilarity(normalizedInput, cmd.phrase.toLowerCase()) > 0.7
    );

    if (matchedCommand) {
      setAssistantResponse(matchedCommand.response);
      setFeedback(`✅ ${assistantName} understood: "${matchedCommand.phrase}"`);
      setScore(score + 20);
      playSound('speak');
    } else {
      setAssistantResponse("I'm sorry, I don't understand that command yet. Would you like to train me?");
      setFeedback(`❓ ${assistantName} needs training for: "${input}"`);
      playSound('error');
    }
    
    setShowFeedback(true);
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const startTraining = (command: Command) => {
    setCurrentTraining(command);
    setFeedback(`Training ${assistantName} to understand: "${command.phrase}"`);
    setShowFeedback(true);
    playSound('train');
  };

  const confirmTraining = () => {
    if (!currentTraining) return;

    const updatedCommand = { ...currentTraining, trained: true };
    setTrainedCommands([...trainedCommands, updatedCommand]);
    setCurrentTraining(null);
    setScore(score + 50);
    
    setFeedback(`🎉 ${assistantName} learned: "${updatedCommand.phrase}"!`);
    setShowFeedback(true);
    playSound('success');

    // Check level completion
    if (trainedCommands.length + 1 >= currentRequirement.commandsNeeded) {
      setTimeout(() => {
        if (level < levelRequirements.length) {
          setLevel(level + 1);
          setAssistantsCreated(assistantsCreated + 1);
          setFeedback(`🎊 Level ${level} Complete! ${assistantName} is now a ${currentRequirement.title}!`);
        } else {
          setFeedback('🏆 Congratulations! You\'ve created a master AI voice assistant!');
        }
      }, 2000);
    }
  };

  const testAssistant = () => {
    if (trainedCommands.length === 0) {
      setFeedback('Train some commands first!');
      setShowFeedback(true);
      return;
    }

    const randomCommand = trainedCommands[Math.floor(Math.random() * trainedCommands.length)];
    setUserInput(randomCommand.phrase);
    processUserInput(randomCommand.phrase);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setTrainedCommands([]);
    setAssistantsCreated(0);
    setAiAccuracy(0);
    setAssistantName('Alex');
    setUserInput('');
    setAssistantResponse('');
    setCurrentTraining(null);
    setGameStarted(false);
    setShowInstructions(true);
  };

  const availableCommands = commandLibrary.filter(cmd => 
    !trainedCommands.some(trained => trained.id === cmd.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-blue-800 mb-2 animate-pulse">🎤 AI Voice Assistant Lab</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-teal-600">Level: {level}</div>
            <div className="text-lg font-bold text-purple-600">Assistants: {assistantsCreated} 🤖</div>
            <div className="text-lg font-bold text-green-600">AI Knowledge: {aiAccuracy}%</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">🗣️ Create Your Voice Assistant!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🎤 Train your AI to understand voice commands</p>
              <p>🧠 Teach it responses for different situations</p>
              <p>🎯 Test how well it understands natural language</p>
              <p>🏆 Build increasingly sophisticated assistants</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Lab!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assistant Interface */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">🤖 Meet {assistantName}</h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all"
                >
                  💡 {showHints ? 'Hide' : 'Show'} Tips
                </button>
              </div>

              {/* Level Progress */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-blue-800 mb-2">🎯 {currentRequirement.title} Progress</h4>
                <p className="text-sm text-blue-600 mb-2">{currentRequirement.description}</p>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(trainedCommands.length / currentRequirement.commandsNeeded) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {trainedCommands.length} / {currentRequirement.commandsNeeded} commands trained
                </p>
              </div>

              {/* Hint Section */}
              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                  <p className="text-yellow-800">
                    <strong>💡 Training Tips:</strong> Start with simple greetings, then add weather and music commands. Test your assistant regularly to see how well it understands!
                  </p>
                </div>
              )}

              {/* Voice Interface */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className={`text-8xl mb-4 ${isListening ? 'animate-pulse' : ''}`}>
                    {isListening ? '🎧' : '🤖'}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{assistantName}</h4>
                  <p className="text-gray-600 mb-4">
                    {isListening ? 'Listening...' : assistantResponse || 'Ready to help!'}
                  </p>
                  
                  {/* Voice Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your command or click the microphone..."
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && processUserInput(userInput)}
                    />
                  </div>

                  {/* Voice Controls */}
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={startListening}
                      disabled={isListening}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-full transition-all"
                    >
                      🎤 {isListening ? 'Listening...' : 'Talk to Assistant'}
                    </button>
                    <button
                      onClick={() => processUserInput(userInput)}
                      disabled={!userInput.trim()}
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-full transition-all"
                    >
                      💬 Send Command
                    </button>
                    <button
                      onClick={testAssistant}
                      disabled={trainedCommands.length === 0}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-full transition-all"
                    >
                      🧪 Test Assistant
                    </button>
                  </div>
                </div>
              </div>

              {/* Trained Commands Display */}
              {trainedCommands.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-bold text-green-800 mb-3">🧠 {assistantName}'s Knowledge</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {trainedCommands.map((cmd, index) => (
                      <div key={index} className="bg-green-100 p-2 rounded text-sm">
                        <strong>"{cmd.phrase}"</strong>
                        <br />
                        <span className="text-green-600">→ {cmd.response}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('understood') || feedback.includes('learned') || feedback.includes('Complete')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('needs training')
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* Training Panel */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📚 Training Center</h3>

              {/* Assistant Settings */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Assistant Name:</label>
                <input
                  type="text"
                  value={assistantName}
                  onChange={(e) => setAssistantName(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Available Commands */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">📝 Available Commands</h4>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {availableCommands.map((command) => (
                    <div key={command.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">
                          {command.category === 'greeting' && '👋'}
                          {command.category === 'weather' && '🌤️'}
                          {command.category === 'music' && '🎵'}
                          {command.category === 'question' && '❓'}
                          {command.category === 'action' && '⚡'}
                        </span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{command.category}</span>
                      </div>
                      <p className="text-sm font-bold mb-1">"{command.phrase}"</p>
                      <p className="text-xs text-gray-600 mb-2">→ {command.response}</p>
                      <button
                        onClick={() => startTraining(command)}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-3 rounded text-sm transition-all"
                      >
                        🎓 Train Command
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Session */}
              {currentTraining && (
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <h5 className="font-bold text-purple-800 mb-2">🎓 Training Session</h5>
                  <p className="text-sm text-purple-600 mb-3">
                    Teaching: "{currentTraining.phrase}"
                  </p>
                  <button
                    onClick={confirmTraining}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all"
                  >
                    ✅ Confirm Training
                  </button>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={resetGame}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                🔄 Reset Lab
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIVoiceAssistantLab;