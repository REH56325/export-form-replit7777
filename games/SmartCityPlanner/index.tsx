import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Building {
  id: string;
  type: 'house' | 'school' | 'hospital' | 'park' | 'shop' | 'factory';
  name: string;
  icon: string;
  cost: number;
  happiness: number;
  efficiency: number;
  color: string;
}

interface CityCell {
  x: number;
  y: number;
  building: Building | null;
  hasRoad: boolean;
  connected: boolean;
}

const SmartCityPlanner = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [money, setMoney] = useState(1000);
  const [population, setPopulation] = useState(0);
  const [happiness, setHappiness] = useState(50);
  const [cityGrid, setCityGrid] = useState<CityCell[][]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [citiesBuilt, setCitiesBuilt] = useState(0);
  const { user } = useUser();

  const buildings: Building[] = [
    { id: 'house', type: 'house', name: 'House', icon: '🏠', cost: 100, happiness: 10, efficiency: 5, color: 'bg-blue-200' },
    { id: 'school', type: 'school', name: 'School', icon: '🏫', cost: 300, happiness: 25, efficiency: 15, color: 'bg-yellow-200' },
    { id: 'hospital', type: 'hospital', name: 'Hospital', icon: '🏥', cost: 500, happiness: 30, efficiency: 20, color: 'bg-red-200' },
    { id: 'park', type: 'park', name: 'Park', icon: '🌳', cost: 150, happiness: 20, efficiency: 0, color: 'bg-green-200' },
    { id: 'shop', type: 'shop', name: 'Shop', icon: '🏪', cost: 200, happiness: 15, efficiency: 25, color: 'bg-purple-200' },
    { id: 'factory', type: 'factory', name: 'Factory', icon: '🏭', cost: 400, happiness: -10, efficiency: 40, color: 'bg-gray-200' }
  ];

  const gridSize = 6;

  // Initialize city grid
  useEffect(() => {
    const newGrid: CityCell[][] = [];
    for (let y = 0; y < gridSize; y++) {
      const row: CityCell[] = [];
      for (let x = 0; x < gridSize; x++) {
        row.push({
          x,
          y,
          building: null,
          hasRoad: false,
          connected: false
        });
      }
      newGrid.push(row);
    }
    setCityGrid(newGrid);
  }, []);

  // Update city statistics
  useEffect(() => {
    updateCityStats();
    generateAIRecommendations();
  }, [cityGrid]);

  const playSound = (type: 'build' | 'success' | 'error' | 'money') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        build: 'Building placed successfully!',
        success: 'City goal achieved!',
        error: 'Cannot place building here',
        money: 'Earning city revenue!'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.1;
      utterance.pitch = type === 'success' ? 1.3 : 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const updateCityStats = () => {
    let totalHappiness = 50;
    let totalPopulation = 0;
    let totalEfficiency = 0;

    cityGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.building) {
          totalHappiness += cell.building.happiness;
          if (cell.building.type === 'house') {
            totalPopulation += 4; // Each house adds 4 people
          }
          totalEfficiency += cell.building.efficiency;
        }
      });
    });

    setHappiness(Math.max(0, Math.min(100, totalHappiness)));
    setPopulation(totalPopulation);
    
    // Generate money based on efficiency and population
    const revenue = Math.floor((totalEfficiency * totalPopulation) / 10);
    if (revenue > 0) {
      setMoney(prev => prev + revenue);
    }
  };

  const generateAIRecommendations = () => {
    const recommendations: string[] = [];
    
    // Count building types
    const buildingCounts = {
      house: 0,
      school: 0,
      hospital: 0,
      park: 0,
      shop: 0,
      factory: 0
    };

    cityGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.building) {
          buildingCounts[cell.building.type]++;
        }
      });
    });

    // AI recommendations based on city state
    if (buildingCounts.house > 5 && buildingCounts.school === 0) {
      recommendations.push("🏫 Build a school for your growing population!");
    }
    if (buildingCounts.house > 3 && buildingCounts.hospital === 0) {
      recommendations.push("🏥 Add a hospital to keep citizens healthy!");
    }
    if (happiness < 40) {
      recommendations.push("🌳 Build more parks to increase happiness!");
    }
    if (money < 200 && buildingCounts.factory < 2) {
      recommendations.push("🏭 Consider adding factories to boost economy!");
    }
    if (buildingCounts.house > 2 && buildingCounts.shop === 0) {
      recommendations.push("🏪 Add shops for citizens to buy necessities!");
    }

    setAiRecommendations(recommendations);
  };

  const placeBuilding = (x: number, y: number) => {
    if (!selectedBuilding) return;
    
    const cell = cityGrid[y][x];
    if (cell.building || money < selectedBuilding.cost) {
      setFeedback(money < selectedBuilding.cost ? 'Not enough money!' : 'Cell already occupied!');
      setShowFeedback(true);
      playSound('error');
      return;
    }

    const newGrid = [...cityGrid];
    newGrid[y][x] = {
      ...cell,
      building: selectedBuilding
    };

    setCityGrid(newGrid);
    setMoney(money - selectedBuilding.cost);
    setScore(score + selectedBuilding.cost);
    playSound('build');
    
    // Check level completion
    checkLevelCompletion();
  };

  const placeRoad = (x: number, y: number) => {
    const cell = cityGrid[y][x];
    if (cell.building) return;

    const newGrid = [...cityGrid];
    newGrid[y][x] = {
      ...cell,
      hasRoad: !cell.hasRoad
    };
    setCityGrid(newGrid);
  };

  const checkLevelCompletion = () => {
    const goals = [
      { level: 1, population: 12, happiness: 60, message: "Great start! Your first neighborhood is thriving!" },
      { level: 2, population: 24, happiness: 70, message: "Excellent! Your town is growing well!" },
      { level: 3, population: 36, happiness: 80, message: "Amazing! You've built a smart, happy city!" }
    ];

    const currentGoal = goals.find(g => g.level === level);
    if (currentGoal && population >= currentGoal.population && happiness >= currentGoal.happiness) {
      setFeedback(`🎉 Level ${level} Complete! ${currentGoal.message}`);
      setShowFeedback(true);
      playSound('success');
      setCitiesBuilt(citiesBuilt + 1);
      
      setTimeout(() => {
        if (level < goals.length) {
          setLevel(level + 1);
          setMoney(money + 500); // Bonus money for next level
        } else {
          setFeedback('🏆 Congratulations! You\'ve mastered smart city planning!');
        }
      }, 3000);
    }
  };

  const clearCity = () => {
    const newGrid = cityGrid.map(row =>
      row.map(cell => ({
        ...cell,
        building: null,
        hasRoad: false,
        connected: false
      }))
    );
    setCityGrid(newGrid);
    setMoney(1000);
    setPopulation(0);
    setHappiness(50);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setMoney(1000);
    setPopulation(0);
    setHappiness(50);
    setCitiesBuilt(0);
    setGameStarted(false);
    setShowInstructions(true);
    clearCity();
  };

  const getCurrentGoal = () => {
    const goals = [
      { level: 1, population: 12, happiness: 60 },
      { level: 2, population: 24, happiness: 70 },
      { level: 3, population: 36, happiness: 80 }
    ];
    return goals.find(g => g.level === level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-cyan-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-blue-800 mb-2 animate-pulse">🏙️ Smart City Planner</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-green-600">Level: {level}</div>
            <div className="text-lg font-bold text-purple-600">💰 ${money}</div>
            <div className="text-lg font-bold text-orange-600">👥 {population}</div>
            <div className="text-lg font-bold text-pink-600">😊 {happiness}%</div>
            <div className="text-lg font-bold text-cyan-600">Cities: {citiesBuilt}</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">🏗️ Build Your Smart City!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🏠 Place buildings to create a thriving city</p>
              <p>🤖 Use AI recommendations for optimal planning</p>
              <p>📊 Balance population, happiness, and economy</p>
              <p>🛣️ Connect buildings with smart infrastructure</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Planning!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Building Palette */}
            <div className="xl:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🏗️ Buildings</h3>
              
              {/* Current Goal */}
              {getCurrentGoal() && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <h4 className="font-bold text-blue-800 mb-1">🎯 Level {level} Goal</h4>
                  <p className="text-sm text-blue-600">Population: {getCurrentGoal()?.population}</p>
                  <p className="text-sm text-blue-600">Happiness: {getCurrentGoal()?.happiness}%</p>
                </div>
              )}

              {/* AI Recommendations */}
              {aiRecommendations.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <h4 className="font-bold text-purple-800 mb-2">🤖 AI Suggestions</h4>
                  {aiRecommendations.slice(0, 2).map((rec, index) => (
                    <p key={index} className="text-xs text-purple-600 mb-1">{rec}</p>
                  ))}
                </div>
              )}

              {/* Building Options */}
              <div className="space-y-2 mb-4">
                {buildings.map((building) => (
                  <button
                    key={building.id}
                    onClick={() => setSelectedBuilding(building)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedBuilding?.id === building.id
                        ? 'border-blue-500 bg-blue-50'
                        : money >= building.cost
                        ? 'border-gray-300 hover:border-blue-300'
                        : 'border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                    disabled={money < building.cost}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl mr-2">{building.icon}</span>
                        <span className="font-bold">{building.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">${building.cost}</div>
                        <div className="text-xs text-gray-500">😊 {building.happiness > 0 ? '+' : ''}{building.happiness}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all mb-2"
              >
                💡 {showHints ? 'Hide' : 'Show'} Tips
              </button>

              <button
                onClick={clearCity}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                🗑️ Clear City
              </button>
            </div>

            {/* City Grid */}
            <div className="xl:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">🏙️ Your Smart City</h3>
                <div className="text-sm text-gray-600">
                  {selectedBuilding ? `Selected: ${selectedBuilding.icon} ${selectedBuilding.name}` : 'Select a building to place'}
                </div>
              </div>

              {/* Hint Section */}
              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                  <p className="text-yellow-800">
                    <strong>💡 Planning Tips:</strong> Houses increase population, parks boost happiness, factories generate money but reduce happiness. Balance is key!
                  </p>
                </div>
              )}

              {/* City Grid */}
              <div className="grid grid-cols-6 gap-2 max-w-2xl mx-auto mb-6">
                {cityGrid.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      onClick={() => placeBuilding(x, y)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        placeRoad(x, y);
                      }}
                      className={`
                        aspect-square rounded-lg border-2 border-gray-300 flex items-center justify-center text-4xl cursor-pointer transition-all
                        ${cell.building ? cell.building.color : 'bg-gray-50 hover:bg-gray-100'}
                        ${cell.hasRoad && !cell.building ? 'bg-yellow-200 border-yellow-400' : ''}
                        ${selectedBuilding && !cell.building ? 'hover:bg-blue-100' : ''}
                      `}
                    >
                      {cell.building ? cell.building.icon : cell.hasRoad ? '🛣️' : ''}
                    </div>
                  ))
                )}
              </div>

              {/* City Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">👥</div>
                  <div className="font-bold">Population</div>
                  <div className="text-blue-600">{population}</div>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">😊</div>
                  <div className="font-bold">Happiness</div>
                  <div className="text-pink-600">{happiness}%</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">💰</div>
                  <div className="font-bold">Money</div>
                  <div className="text-green-600">${money}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">🏆</div>
                  <div className="font-bold">Score</div>
                  <div className="text-purple-600">{score}</div>
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-4 rounded-xl text-center text-lg font-bold mb-4 ${
                  feedback.includes('Complete') || feedback.includes('Congratulations')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('money')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {feedback}
                </div>
              )}

              {/* Reset Button */}
              <div className="text-center">
                <button
                  onClick={resetGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
                >
                  🔄 New City
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartCityPlanner;