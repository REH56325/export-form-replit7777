import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Animal {
  name: string;
  emoji: string;
  habitat: string;
  habitatEmoji: string;
}

const AnimalHabitatMatch = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [habitatOptions, setHabitatOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [matches, setMatches] = useState(0);
  const { user } = useUser();

  const animals: Animal[] = [
    { name: 'Fish', emoji: '🐠', habitat: 'Ocean', habitatEmoji: '🌊' },
    { name: 'Bird', emoji: '🐦', habitat: 'Tree', habitatEmoji: '🌳' },
    { name: 'Lion', emoji: '🦁', habitat: 'Jungle', habitatEmoji: '🌴' },
    { name: 'Penguin', emoji: '🐧', habitat: 'Ice', habitatEmoji: '🧊' },
    { name: 'Monkey', emoji: '🐵', habitat: 'Jungle', habitatEmoji: '🌴' },
    { name: 'Whale', emoji: '🐋', habitat: 'Ocean', habitatEmoji: '🌊' },
    { name: 'Bear', emoji: '🐻', habitat: 'Forest', habitatEmoji: '🌲' },
    { name: 'Camel', emoji: '🐪', habitat: 'Desert', habitatEmoji: '🏜️' }
  ];

  const generateProblem = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(randomAnimal);
    
    // Get unique habitats for options
    const allHabitats = [...new Set(animals.map(a => a.habitat))];
    const correctHabitat = randomAnimal.habitat;
    
    // Create wrong options
    const wrongHabitats = allHabitats.filter(h => h !== correctHabitat);
    const selectedWrong = wrongHabitats.slice(0, 3);
    
    // Shuffle options
    const options = [correctHabitat, ...selectedWrong].sort(() => Math.random() - 0.5);
    setHabitatOptions(options);
    setShowFeedback(false);
  };

  const checkAnswer = (selectedHabitat: string) => {
    if (currentAnimal && selectedHabitat === currentAnimal.habitat) {
      setFeedback('🎉 Perfect match! You know where animals live!');
      setScore(score + 25);
      setMatches(matches + 1);
      
      if (matches + 1 >= 8) {
        setLevel(level + 1);
        setMatches(0);
      }
      
      setTimeout(() => {
        generateProblem();
      }, 2000);
    } else {
      setFeedback('🤔 Think about where this animal would be happy!');
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
    setMatches(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-blue-300 to-yellow-300 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2">🏠 Animal Habitat Match</h1>
          <div className="flex justify-center items-center space-x-6 bg-white rounded-full p-4 shadow-lg">
            <div className="text-lg font-bold text-green-600">Score: {score}</div>
            <div className="text-lg font-bold text-blue-600">Explorer Level: {level}</div>
            <div className="text-lg font-bold text-yellow-600">
              Matches: {'🏆'.repeat(matches)} ({matches}/8)
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🌍 Learn About Animal Homes</h2>
            <div className="text-lg text-gray-700 space-y-2">
              <p>🐠 Help animals find their correct homes!</p>
              <p>🏠 Match each animal to where it lives!</p>
              <p>🎯 Make 8 correct matches to become an expert!</p>
            </div>
            <button 
              onClick={startGame}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              🌍 Start Exploring!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && currentAnimal && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="mb-8">
              <div className="text-2xl text-green-700 mb-4">🏠 Where does this animal live?</div>
              <div className="text-8xl mb-4">{currentAnimal.emoji}</div>
              <div className="text-3xl font-bold text-blue-700">{currentAnimal.name}</div>
            </div>

            {/* Habitat options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {habitatOptions.map((habitat, index) => {
                const habitatData = animals.find(a => a.habitat === habitat);
                return (
                  <button
                    key={index}
                    onClick={() => checkAnswer(habitat)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105 flex flex-col items-center space-y-2"
                  >
                    <span className="text-3xl">{habitatData?.habitatEmoji}</span>
                    <span>{habitat}</span>
                  </button>
                );
              })}
            </div>

            {/* Progress display */}
            <div className="mb-6 p-4 bg-green-100 rounded-xl">
              <div className="text-lg text-green-700 mb-2">🌟 Your Explorer Progress:</div>
              <div className="flex justify-center flex-wrap">
                {Array(matches).fill('🏆').map((trophy, i) => (
                  <span key={i} className="text-2xl m-1 animate-bounce">{trophy}</span>
                ))}
                {Array(8 - matches).fill('⭕').map((spot, i) => (
                  <span key={i} className="text-2xl m-1 opacity-30">{spot}</span>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-xl font-bold ${
                feedback.includes('Perfect') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                🔄 New Adventure
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalHabitatMatch;