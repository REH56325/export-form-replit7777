import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const VowelSorting = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [vowelType, setVowelType] = useState<'short' | 'long'>('short');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [vowelGems, setVowelGems] = useState(0);
  const { user } = useUser();

  const shortVowelWords = ['cat', 'bed', 'sit', 'top', 'cup', 'bat', 'red', 'big', 'dog', 'run'];
  const longVowelWords = ['cake', 'tree', 'bike', 'rope', 'cute', 'game', 'feet', 'time', 'bone', 'tube'];

  const generateProblem = () => {
    const useShort = Math.random() > 0.5;
    const wordList = useShort ? shortVowelWords : longVowelWords;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    
    setCurrentWord(randomWord);
    setVowelType(useShort ? 'short' : 'long');
    setShowFeedback(false);
  };

  const checkAnswer = (selectedType: 'short' | 'long') => {
    if (selectedType === vowelType) {
      setFeedback('💎 Amazing! You know your vowel sounds!');
      setScore(score + 25);
      setVowelGems(vowelGems + 1);
      
      if (vowelGems + 1 >= 10) {
        setLevel(level + 1);
        setVowelGems(0);
      }
      
      setTimeout(() => {
        generateProblem();
      }, 2000);
    } else {
      setFeedback('🎵 Listen to the vowel sound again!');
    }
    setShowFeedback(true);
  };

  const speakWord = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = 0.6;
      utterance.pitch = 1.3;
      speechSynthesis.speak(utterance);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    generateProblem();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setVowelGems(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  useEffect(() => {
    if (gameStarted && currentWord) {
      setTimeout(() => speakWord(), 500);
    }
  }, [currentWord, gameStarted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 via-orange-200 to-yellow-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-red-800 mb-2">🎵 Vowel Sorting</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-red-600">Score: {score}</div>
            <div className="text-lg font-bold text-orange-600">Sound Level: {level}</div>
            <div className="text-lg font-bold text-yellow-600">
              Gems: {'💎'.repeat(vowelGems)} ({vowelGems}/10)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-red-700 mb-4">🎶 Learn Vowel Sounds</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🎵 Listen to words and identify vowel sounds!</p>
              <p>📏 Short vowels: a (cat), e (bed), i (sit), o (top), u (cup)</p>
              <p>📏 Long vowels: a (cake), e (tree), i (bike), o (rope), u (cute)</p>
              <p>💎 Collect 10 gems to advance!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🎵 Start Listening!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="mb-8">
              <div className="text-2xl text-red-700 mb-4">🎧 Listen to this word:</div>
              <div className="text-6xl font-bold text-orange-700 mb-6">{currentWord}</div>
              
              <button
                onClick={speakWord}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-2xl transition-all transform hover:scale-105 mb-6"
              >
                🔊 Hear Word Again
              </button>
            </div>

            <div className="mb-6">
              <div className="text-xl text-gray-700 mb-4">Does this word have a SHORT or LONG vowel sound?</div>
              
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => checkAnswer('short')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded-xl text-2xl transition-all transform hover:scale-105"
                >
                  <div className="text-4xl mb-2">📏</div>
                  <div>SHORT</div>
                  <div className="text-sm mt-2">Like: cat, bed, sit</div>
                </button>
                
                <button
                  onClick={() => checkAnswer('long')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl text-2xl transition-all transform hover:scale-105"
                >
                  <div className="text-4xl mb-2">📏</div>
                  <div>LONG</div>
                  <div className="text-sm mt-2">Like: cake, tree, bike</div>
                </button>
              </div>
            </div>

            {/* Gem collection */}
            <div className="mb-6 p-4 bg-yellow-100 rounded-xl">
              <div className="text-lg text-orange-700 mb-2">💎 Your Vowel Gem Collection:</div>
              <div className="flex justify-center flex-wrap">
                {Array(vowelGems).fill('💎').map((gem, i) => (
                  <span key={i} className="text-2xl m-1 animate-pulse">{gem}</span>
                ))}
                {Array(10 - vowelGems).fill('⚫').map((spot, i) => (
                  <span key={i} className="text-2xl m-1 opacity-30">{spot}</span>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Amazing') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Vowel Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VowelSorting;