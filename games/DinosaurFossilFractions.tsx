import React, { useState, useEffect } from 'react';

interface DinosaurFossilFractionsProps {
  onScoreUpdate?: (score: number) => void;
}

const DinosaurFossilFractions: React.FC<DinosaurFossilFractionsProps> = ({ onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [currentFraction, setCurrentFraction] = useState({ numerator: 1, denominator: 2 });
  const [fossilOptions, setFossilOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [fossils, setFossils] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const fractions = [
    { numerator: 1, denominator: 2, display: '1/2', name: 'one half' },
    { numerator: 1, denominator: 3, display: '1/3', name: 'one third' },
    { numerator: 1, denominator: 4, display: '1/4', name: 'one fourth' },
    { numerator: 2, denominator: 3, display: '2/3', name: 'two thirds' },
    { numerator: 2, denominator: 4, display: '2/4', name: 'two fourths' },
    { numerator: 3, denominator: 4, display: '3/4', name: 'three fourths' }
  ];

  const generateProblem = () => {
    const fraction = fractions[Math.floor(Math.random() * fractions.length)];
    setCurrentFraction(fraction);
    
    // Generate options including correct answer
    const correctAnswer = fraction.display;
    const wrongAnswers = fractions
      .filter(f => f.display !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(f => f.display);
    
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setFossilOptions(allOptions);
    setFeedback('');
  };

  const checkAnswer = (selectedFraction: string) => {
    const correctAnswer = `${currentFraction.numerator}/${currentFraction.denominator}`;
    
    if (selectedFraction === correctAnswer) {
      setScore(score + 15);
      setFossils(fossils + 1);
      setFeedback('🦕 Amazing! You found the correct fossil piece!');
      onScoreUpdate?.(score + 15);
      setTimeout(() => generateProblem(), 1500);
    } else {
      setFeedback(`🔍 Keep digging! This fossil shows ${correctAnswer} of the dinosaur.`);
      setTimeout(() => generateProblem(), 2500);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateProblem();
  };

  const renderFractionVisual = (frac: any) => {
    const parts = [];
    for (let i = 0; i < frac.denominator; i++) {
      parts.push(
        <div
          key={i}
          className={`w-8 h-8 border-2 border-amber-600 ${
            i < frac.numerator ? 'bg-amber-400' : 'bg-gray-200'
          }`}
        />
      );
    }
    return <div className="flex gap-1 justify-center mb-2">{parts}</div>;
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-black/30 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4">🦕 Dinosaur Fossil Fractions</h1>
          <p className="text-xl mb-6">Become a paleontologist and learn fractions by digging up dinosaur fossils!</p>
          <button 
            onClick={startGame}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
          >
            Start Digging! ⛏️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 relative overflow-hidden">
      {/* Desert background elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-800 to-transparent"></div>
      
      {/* Score and fossils */}
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        Score: {score} | Fossils: {fossils} 🦴
      </div>

      {/* Dig site */}
      <div className="absolute top-10 right-10 text-5xl animate-bounce">⛏️</div>

      {/* Main game area */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Excavation site */}
          <div className="bg-amber-100/90 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-2xl border-4 border-amber-800">
            <div className="text-2xl font-bold text-amber-900 mb-4">
              You found a fossil! What fraction of the dinosaur is this?
            </div>
            
            {/* Visual fraction representation */}
            <div className="mb-6">
              {renderFractionVisual(currentFraction)}
              <div className="text-4xl text-amber-800 animate-pulse">🦴</div>
            </div>
          </div>

          {/* Fraction options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {fossilOptions.map((fraction, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(fraction)}
                className="bg-stone-600 hover:bg-stone-700 text-white p-6 rounded-lg text-3xl font-bold transition-all transform hover:scale-105 shadow-lg border-4 border-stone-800"
              >
                <div className="text-4xl mb-2">📦</div>
                <div>{fraction}</div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-green-500/90 backdrop-blur-sm text-white text-2xl font-bold p-4 rounded-lg animate-bounce">
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Dinosaur silhouettes */}
      <div className="absolute top-1/4 left-10 text-6xl opacity-30 animate-pulse">🦕</div>
      <div className="absolute bottom-20 right-20 text-4xl opacity-40 animate-bounce">🦴</div>
      <div className="absolute top-1/3 right-1/4 text-3xl opacity-30">🔍</div>
    </div>
  );
};

export default DinosaurFossilFractions;