import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence: number;
}

interface ChatBot {
  id: string;
  name: string;
  personality: string;
  knowledgeBase: string[];
  responses: { [key: string]: string[] };
  avatar: string;
}

const ChatbotConversationClub = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedBot, setSelectedBot] = useState<ChatBot | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [conversationsStarted, setConversationsStarted] = useState(0);
  const [botPersonality, setBotPersonality] = useState(50);
  const { user } = useUser();

  const chatBots: ChatBot[] = [
    {
      id: 'buddy',
      name: 'Buddy Bot',
      personality: 'friendly and cheerful',
      knowledgeBase: ['greetings', 'games', 'school', 'animals'],
      responses: {
        'hello': ['Hi there! How are you today?', 'Hello! Nice to meet you!', 'Hey! What would you like to talk about?'],
        'how are you': ['I\'m doing great! Thanks for asking!', 'I\'m fantastic! How about you?', 'Wonderful! Ready to chat!'],
        'animals': ['I love animals! Do you have a pet?', 'Animals are amazing! What\'s your favorite?', 'Tell me about your favorite animal!'],
        'school': ['School is fun! What\'s your favorite subject?', 'Learning is exciting! What did you learn today?', 'I love helping with homework!'],
        'games': ['Games are awesome! Do you like video games?', 'I enjoy word games! Want to play?', 'What\'s your favorite game to play?']
      },
      avatar: '🤖'
    },
    {
      id: 'scholar',
      name: 'Scholar Bot',
      personality: 'intelligent and helpful',
      knowledgeBase: ['science', 'math', 'history', 'books'],
      responses: {
        'hello': ['Greetings! Ready to learn something new?', 'Hello! What would you like to explore?', 'Hi! I\'m here to help you learn!'],
        'science': ['Science is fascinating! What interests you most?', 'Did you know plants make their own food?', 'Space has billions of stars!'],
        'math': ['Math is everywhere! Want to solve a puzzle?', 'Numbers can be really fun! Need help with anything?', 'Math helps us understand patterns!'],
        'history': ['History tells amazing stories! Any period interest you?', 'Long ago, people lived very differently!', 'Every place has interesting history!'],
        'books': ['Books are windows to new worlds! What do you like to read?', 'Reading is my favorite activity!', 'Have you discovered any good books lately?']
      },
      avatar: '📚'
    },
    {
      id: 'artist',
      name: 'Creative Bot',
      personality: 'artistic and imaginative',
      knowledgeBase: ['art', 'music', 'stories', 'creativity'],
      responses: {
        'hello': ['Hello, creative soul! Ready to make something beautiful?', 'Hi! Let\'s create something amazing together!', 'Greetings! Art is everywhere around us!'],
        'art': ['Art expresses feelings! What would you like to create?', 'Colors and shapes tell stories! What\'s your favorite color?', 'Every person is an artist in their own way!'],
        'music': ['Music makes life magical! Do you play any instruments?', 'Songs can change our mood! What\'s your favorite?', 'Rhythm is everywhere in nature!'],
        'stories': ['Stories transport us to new worlds! Want to create one?', 'Every person has amazing stories to tell!', 'Imagination has no limits!'],
        'creativity': ['Creativity is your superpower! How do you like to be creative?', 'There are no wrong ways to be creative!', 'What inspires your imagination?']
      },
      avatar: '🎨'
    }
  ];

  const trainingPhrases = [
    { category: 'greetings', phrases: ['hello', 'hi', 'hey', 'good morning', 'how are you'] },
    { category: 'animals', phrases: ['dog', 'cat', 'pet', 'animals', 'zoo'] },
    { category: 'school', phrases: ['school', 'homework', 'teacher', 'class', 'learning'] },
    { category: 'science', phrases: ['science', 'experiment', 'space', 'plants', 'nature'] },
    { category: 'art', phrases: ['art', 'drawing', 'painting', 'colors', 'creative'] },
    { category: 'music', phrases: ['music', 'song', 'instrument', 'singing', 'dance'] }
  ];

  useEffect(() => {
    if (selectedBot) {
      addBotMessage(`Hello! I'm ${selectedBot.name}. I'm ${selectedBot.personality}. What would you like to talk about?`);
    }
  }, [selectedBot]);

  const playSound = (type: 'message' | 'typing' | 'select' | 'train' | 'success') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        message: 'New message',
        typing: 'Bot is thinking',
        select: 'Bot selected',
        train: 'Training conversation skills',
        success: 'Great conversation!'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.1;
      utterance.pitch = type === 'success' ? 1.3 : 1.0;
      utterance.volume = 0.3;
      speechSynthesis.speak(utterance);
    }
  };

  const selectBot = (bot: ChatBot) => {
    setSelectedBot(bot);
    setMessages([]);
    setConversationsStarted(conversationsStarted + 1);
    playSound('select');
    setFeedback(`Selected ${bot.name}! They are ${bot.personality}.`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const addBotMessage = (text: string, confidence: number = 85) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      confidence
    };
    
    setMessages(prev => [...prev, newMessage]);
    playSound('message');
  };

  const findBestResponse = (input: string): { response: string; confidence: number } => {
    if (!selectedBot) return { response: "I'm not sure about that.", confidence: 30 };

    const lowerInput = input.toLowerCase();
    
    // Check for direct keyword matches
    for (const [keyword, responses] of Object.entries(selectedBot.responses)) {
      if (lowerInput.includes(keyword)) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return { response: randomResponse, confidence: 90 };
      }
    }

    // Check knowledge base for related topics
    for (const topic of selectedBot.knowledgeBase) {
      if (lowerInput.includes(topic)) {
        const topicResponses = selectedBot.responses[topic];
        if (topicResponses) {
          const randomResponse = topicResponses[Math.floor(Math.random() * topicResponses.length)];
          return { response: randomResponse, confidence: 75 };
        }
      }
    }

    // Check training phrases for similarity
    for (const category of trainingPhrases) {
      for (const phrase of category.phrases) {
        if (lowerInput.includes(phrase)) {
          const responses = selectedBot.responses[category.category] || selectedBot.responses[phrase];
          if (responses) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return { response: randomResponse, confidence: 60 };
          }
        }
      }
    }

    // Fallback responses based on bot personality
    const fallbackResponses = {
      'friendly and cheerful': [
        "That's interesting! Tell me more!",
        "I'd love to learn about that!",
        "That sounds really cool!"
      ],
      'intelligent and helpful': [
        "That's a fascinating topic to explore.",
        "I'd be happy to help you learn more about that.",
        "Let's investigate that together!"
      ],
      'artistic and imaginative': [
        "That sparks my creativity!",
        "What an imaginative idea!",
        "That could inspire amazing art!"
      ]
    };

    const personalityResponses = fallbackResponses[selectedBot.personality as keyof typeof fallbackResponses] || [
      "That's interesting!",
      "Tell me more about that!",
      "I'm learning from our conversation!"
    ];

    const randomFallback = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    return { response: randomFallback, confidence: 40 };
  };

  const sendMessage = () => {
    if (!userInput.trim() || !selectedBot) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
      confidence: 100
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    playSound('typing');

    // Simulate bot thinking time
    setTimeout(() => {
      const { response, confidence } = findBestResponse(userInput);
      
      setIsTyping(false);
      addBotMessage(response, confidence);
      
      // Update score based on conversation quality
      setScore(score + Math.round(confidence / 10));
      
      // Check if conversation is going well
      if (confidence > 70) {
        setTimeout(() => {
          setFeedback(`Great conversation! ${selectedBot.name} understood you well!`);
          setShowFeedback(true);
          setTimeout(() => setShowFeedback(false), 2000);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);

    setUserInput('');
  };

  const trainBot = (keyword: string, response: string) => {
    if (!selectedBot || !keyword.trim() || !response.trim()) return;

    // Add new training to bot's responses
    const updatedBot = { ...selectedBot };
    if (updatedBot.responses[keyword.toLowerCase()]) {
      updatedBot.responses[keyword.toLowerCase()].push(response);
    } else {
      updatedBot.responses[keyword.toLowerCase()] = [response];
    }

    setSelectedBot(updatedBot);
    setScore(score + 30);
    playSound('train');
    setFeedback(`${selectedBot.name} learned a new response!`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setConversationsStarted(0);
    setSelectedBot(null);
    setMessages([]);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-blue-800 mb-2 animate-pulse">💬 Chatbot Conversation Club</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-cyan-600">Level: {level}</div>
            <div className="text-lg font-bold text-teal-600">Conversations: {conversationsStarted} 💬</div>
            <div className="text-lg font-bold text-purple-600">Messages: {messages.length}</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">🤖 Chat with AI Friends!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>💬 Have conversations with different AI personalities</p>
              <p>🧠 Train chatbots to understand you better</p>
              <p>🎯 Learn how AI processes natural language</p>
              <p>🌟 Build friendships with intelligent bots</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Chatting!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Bot Selection */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🤖 Choose Your Bot</h3>
              
              <div className="space-y-4 mb-6">
                {chatBots.map((bot) => (
                  <button
                    key={bot.id}
                    onClick={() => selectBot(bot)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedBot?.id === bot.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{bot.avatar}</span>
                      <div>
                        <h4 className="font-bold">{bot.name}</h4>
                        <p className="text-sm text-gray-600">{bot.personality}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Knows about: {bot.knowledgeBase.join(', ')}
                    </div>
                  </button>
                ))}
              </div>

              {/* Bot Training */}
              {selectedBot && (
                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-700 mb-3">🎓 Train {selectedBot.name}</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Keyword to teach..."
                      className="w-full p-2 border rounded text-sm"
                      id="keyword-input"
                    />
                    <input
                      type="text"
                      placeholder="Response to teach..."
                      className="w-full p-2 border rounded text-sm"
                      id="response-input"
                    />
                    <button
                      onClick={() => {
                        const keyword = (document.getElementById('keyword-input') as HTMLInputElement)?.value;
                        const response = (document.getElementById('response-input') as HTMLInputElement)?.value;
                        if (keyword && response) {
                          trainBot(keyword, response);
                          (document.getElementById('keyword-input') as HTMLInputElement).value = '';
                          (document.getElementById('response-input') as HTMLInputElement).value = '';
                        }
                      }}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-sm transition-all"
                    >
                      🧠 Teach Bot
                    </button>
                  </div>
                </div>
              )}

              {/* Hints */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all"
              >
                💡 {showHints ? 'Hide' : 'Show'} Tips
              </button>

              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mt-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Chat Tips:</strong> Ask about their interests! Train them with new words and responses to make conversations better.
                  </p>
                </div>
              )}
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedBot ? `💬 Chat with ${selectedBot.name}` : '💬 Select a Bot to Start'}
                </h3>
                <button
                  onClick={resetGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🔄 Reset
                </button>
              </div>

              {!selectedBot ? (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-xl mb-4">👈 Choose a chatbot to start your conversation!</p>
                  <p>Each bot has different personalities and interests.</p>
                </div>
              ) : (
                <>
                  {/* Chat Messages */}
                  <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white border'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm">
                              {message.sender === 'user' ? '👤' : selectedBot.avatar}
                            </span>
                            <span className="text-xs opacity-70">
                              {message.sender === 'user' ? 'You' : selectedBot.name}
                            </span>
                            {message.sender === 'bot' && (
                              <span className="text-xs opacity-50">
                                {message.confidence}% confident
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-white border px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span>{selectedBot.avatar}</span>
                            <span className="text-sm text-gray-500">typing</span>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={`Type a message to ${selectedBot.name}...`}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={isTyping}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!userInput.trim() || isTyping}
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                      📤 Send
                    </button>
                  </div>

                  {/* Conversation Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-2xl">💬</div>
                      <div className="font-bold text-sm">Messages</div>
                      <div className="text-blue-600">{messages.length}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-2xl">🧠</div>
                      <div className="font-bold text-sm">Understanding</div>
                      <div className="text-green-600">
                        {messages.filter(m => m.sender === 'bot').length > 0
                          ? Math.round(
                              messages
                                .filter(m => m.sender === 'bot')
                                .reduce((sum, m) => sum + m.confidence, 0) /
                              messages.filter(m => m.sender === 'bot').length
                            )
                          : 0}%
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-2xl">🏆</div>
                      <div className="font-bold text-sm">Score</div>
                      <div className="text-purple-600">{score}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('Great') || feedback.includes('learned')
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
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

export default ChatbotConversationClub;