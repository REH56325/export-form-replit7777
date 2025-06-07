import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface WeatherData {
  day: number;
  temperature: number;
  humidity: number;
  cloudCover: number;
  windSpeed: number;
  pressure: number;
  actualWeather: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
}

interface Prediction {
  day: number;
  predictedWeather: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  confidence: number;
  accuracy?: boolean;
}

const PredictiveWeatherAI = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [aiModel, setAiModel] = useState({
    accuracy: 50,
    dataPoints: 0,
    patterns: [] as string[]
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [forecastsCompleted, setForecastsCompleted] = useState(0);
  const [selectedPrediction, setSelectedPrediction] = useState<'sunny' | 'cloudy' | 'rainy' | 'stormy' | null>(null);
  const { user } = useUser();

  const weatherTypes = [
    { type: 'sunny' as const, icon: '☀️', color: 'bg-yellow-200', name: 'Sunny' },
    { type: 'cloudy' as const, icon: '☁️', color: 'bg-gray-200', name: 'Cloudy' },
    { type: 'rainy' as const, icon: '🌧️', color: 'bg-blue-200', name: 'Rainy' },
    { type: 'stormy' as const, icon: '⛈️', color: 'bg-purple-200', name: 'Stormy' }
  ];

  const generateWeatherData = (day: number): WeatherData => {
    const season = Math.floor(day / 30) % 4; // 0=spring, 1=summer, 2=fall, 3=winter
    
    let baseTemp, tempVariance, rainChance;
    switch (season) {
      case 0: // Spring
        baseTemp = 65; tempVariance = 15; rainChance = 0.3;
        break;
      case 1: // Summer
        baseTemp = 80; tempVariance = 10; rainChance = 0.2;
        break;
      case 2: // Fall
        baseTemp = 55; tempVariance = 20; rainChance = 0.3;
        break;
      default: // Winter
        baseTemp = 35; tempVariance = 15; rainChance = 0.4;
    }

    const temperature = baseTemp + (Math.random() - 0.5) * tempVariance;
    const humidity = Math.random() * 40 + 40; // 40-80%
    const cloudCover = Math.random() * 100;
    const windSpeed = Math.random() * 20;
    const pressure = 29.5 + Math.random() * 1.5; // 29.5-31.0 inches

    // Determine actual weather based on conditions
    let actualWeather: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
    
    if (humidity > 70 && cloudCover > 80 && windSpeed > 15) {
      actualWeather = 'stormy';
    } else if (humidity > 60 && cloudCover > 70) {
      actualWeather = 'rainy';
    } else if (cloudCover > 50) {
      actualWeather = 'cloudy';
    } else {
      actualWeather = 'sunny';
    }

    return {
      day,
      temperature: Math.round(temperature),
      humidity: Math.round(humidity),
      cloudCover: Math.round(cloudCover),
      windSpeed: Math.round(windSpeed),
      pressure: Math.round(pressure * 100) / 100,
      actualWeather
    };
  };

  useEffect(() => {
    if (gameStarted) {
      // Generate initial weather history
      const initialHistory = [];
      for (let i = 1; i <= 7; i++) {
        initialHistory.push(generateWeatherData(i));
      }
      setWeatherHistory(initialHistory);
      setCurrentDay(8);
    }
  }, [gameStarted]);

  const playSound = (type: 'prediction' | 'correct' | 'wrong' | 'analyze' | 'success') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        prediction: 'Making weather prediction',
        correct: 'Prediction correct!',
        wrong: 'Prediction missed',
        analyze: 'Analyzing weather patterns',
        success: 'Weather forecasting mastered!'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.1;
      utterance.pitch = type === 'success' ? 1.4 : type === 'correct' ? 1.2 : 1.0;
      utterance.volume = 0.4;
      speechSynthesis.speak(utterance);
    }
  };

  const analyzePatterns = () => {
    if (weatherHistory.length < 3) return;

    playSound('analyze');
    const patterns = [];
    
    // Analyze temperature trends
    const lastThreeTemps = weatherHistory.slice(-3).map(d => d.temperature);
    if (lastThreeTemps[2] > lastThreeTemps[1] && lastThreeTemps[1] > lastThreeTemps[0]) {
      patterns.push('Temperature rising trend');
    } else if (lastThreeTemps[2] < lastThreeTemps[1] && lastThreeTemps[1] < lastThreeTemps[0]) {
      patterns.push('Temperature falling trend');
    }

    // Analyze humidity patterns
    const avgHumidity = weatherHistory.reduce((sum, d) => sum + d.humidity, 0) / weatherHistory.length;
    if (avgHumidity > 65) {
      patterns.push('High humidity pattern');
    }

    // Analyze pressure patterns
    const lastPressure = weatherHistory[weatherHistory.length - 1].pressure;
    const prevPressure = weatherHistory[weatherHistory.length - 2]?.pressure;
    if (prevPressure && lastPressure < prevPressure - 0.1) {
      patterns.push('Pressure dropping (storms likely)');
    } else if (prevPressure && lastPressure > prevPressure + 0.1) {
      patterns.push('Pressure rising (clear weather likely)');
    }

    setAiModel(prev => ({
      ...prev,
      patterns,
      dataPoints: weatherHistory.length,
      accuracy: Math.min(95, prev.accuracy + patterns.length * 5)
    }));

    setFeedback(`AI analyzed ${patterns.length} weather patterns!`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const makePrediction = (weatherType: 'sunny' | 'cloudy' | 'rainy' | 'stormy') => {
    if (!weatherHistory.length) return;

    setSelectedPrediction(weatherType);
    
    // Calculate confidence based on AI model accuracy and patterns
    let confidence = aiModel.accuracy;
    
    // Adjust confidence based on recent weather patterns
    const recentWeather = weatherHistory.slice(-3);
    const lastWeather = weatherHistory[weatherHistory.length - 1];
    
    if (weatherType === 'rainy' && lastWeather.humidity > 70) confidence += 10;
    if (weatherType === 'sunny' && lastWeather.cloudCover < 30) confidence += 10;
    if (weatherType === 'stormy' && lastWeather.pressure < 29.8) confidence += 15;
    if (weatherType === 'cloudy' && lastWeather.cloudCover > 50 && lastWeather.cloudCover < 80) confidence += 10;

    confidence = Math.min(95, Math.max(30, confidence));

    const newPrediction: Prediction = {
      day: currentDay,
      predictedWeather: weatherType,
      confidence: Math.round(confidence)
    };

    setPredictions([...predictions, newPrediction]);
    playSound('prediction');

    // Generate actual weather for the predicted day
    setTimeout(() => {
      const actualWeather = generateWeatherData(currentDay);
      setWeatherHistory([...weatherHistory, actualWeather]);
      
      // Check prediction accuracy
      const isCorrect = actualWeather.actualWeather === weatherType;
      const updatedPrediction = { ...newPrediction, accuracy: isCorrect };
      setPredictions(prev => prev.map(p => p.day === currentDay ? updatedPrediction : p));

      if (isCorrect) {
        setScore(score + Math.round(confidence / 5));
        setForecastsCompleted(forecastsCompleted + 1);
        playSound('correct');
        setFeedback(`Correct prediction! ${confidence}% confidence was right!`);
      } else {
        playSound('wrong');
        setFeedback(`Prediction missed. Actual weather was ${actualWeather.actualWeather}.`);
      }

      setShowFeedback(true);
      setCurrentDay(currentDay + 1);
      setSelectedPrediction(null);

      // Update AI model accuracy
      const correctPredictions = [...predictions, updatedPrediction].filter(p => p.accuracy === true).length;
      const totalPredictions = [...predictions, updatedPrediction].length;
      const newAccuracy = Math.round((correctPredictions / totalPredictions) * 100);
      
      setAiModel(prev => ({ ...prev, accuracy: newAccuracy }));

      // Check level completion
      if (forecastsCompleted + 1 >= level * 5) {
        setTimeout(() => {
          if (level < 4) {
            setLevel(level + 1);
            setFeedback(`Level ${level} Complete! Your AI is getting better at weather prediction!`);
          } else {
            setFeedback('Congratulations! You\'ve mastered AI weather forecasting!');
            playSound('success');
          }
        }, 2000);
      }
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setWeatherHistory([]);
    setPredictions([]);
    setCurrentDay(1);
    setForecastsCompleted(0);
    setAiModel({ accuracy: 50, dataPoints: 0, patterns: [] });
    setGameStarted(false);
    setShowInstructions(true);
  };

  const getWeatherIcon = (weather: string) => {
    const weatherType = weatherTypes.find(w => w.type === weather);
    return weatherType ? weatherType.icon : '❓';
  };

  const getWeatherColor = (weather: string) => {
    const weatherType = weatherTypes.find(w => w.type === weather);
    return weatherType ? weatherType.color : 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-blue-800 mb-2 animate-pulse">🌤️ Predictive Weather AI</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-sky-600">Level: {level}</div>
            <div className="text-lg font-bold text-green-600">Forecasts: {forecastsCompleted} 🎯</div>
            <div className="text-lg font-bold text-purple-600">AI Accuracy: {aiModel.accuracy}%</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">🤖 Train Your Weather AI!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>📊 Analyze historical weather data and patterns</p>
              <p>🧠 Train AI algorithms to recognize weather trends</p>
              <p>🎯 Make accurate predictions based on data analysis</p>
              <p>🌟 Improve AI accuracy through machine learning</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Forecasting!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* AI Control Panel */}
            <div className="xl:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🤖 Weather AI</h3>
              
              {/* AI Status */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-blue-800 mb-2">AI Model Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy:</span>
                    <span className="font-bold text-blue-600">{aiModel.accuracy}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${aiModel.accuracy}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Points:</span>
                    <span className="font-bold text-blue-600">{aiModel.dataPoints}</span>
                  </div>
                </div>
              </div>

              {/* Detected Patterns */}
              {aiModel.patterns.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h5 className="font-bold text-green-800 mb-2">🧠 AI Patterns</h5>
                  {aiModel.patterns.map((pattern, index) => (
                    <p key={index} className="text-xs text-green-600 mb-1">• {pattern}</p>
                  ))}
                </div>
              )}

              {/* Weather Prediction Options */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-700 mb-3">🎯 Make Prediction for Day {currentDay}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {weatherTypes.map((weather) => (
                    <button
                      key={weather.type}
                      onClick={() => makePrediction(weather.type)}
                      disabled={selectedPrediction !== null}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedPrediction === weather.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      } disabled:opacity-50`}
                    >
                      <div className="text-2xl mb-1">{weather.icon}</div>
                      <div className="text-xs font-bold">{weather.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={analyzePatterns}
                  disabled={weatherHistory.length < 3}
                  className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🔍 Analyze Patterns
                </button>
                
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all"
                >
                  💡 {showHints ? 'Hide' : 'Show'} Tips
                </button>

                {showHints && (
                  <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-800 text-sm">
                      <strong>💡 Forecast Tips:</strong> High humidity + clouds = rain. Low pressure = storms. Analyze patterns first to improve AI accuracy!
                    </p>
                  </div>
                )}

                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🔄 Reset AI
                </button>
              </div>
            </div>

            {/* Weather Data Display */}
            <div className="xl:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">📊 Weather Data Analysis</h3>
                <div className="text-sm text-gray-600">
                  Current Day: {currentDay} | Historical Data: {weatherHistory.length} days
                </div>
              </div>

              {/* Weather History Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left">Day</th>
                      <th className="p-2 text-left">Weather</th>
                      <th className="p-2 text-left">Temp (°F)</th>
                      <th className="p-2 text-left">Humidity (%)</th>
                      <th className="p-2 text-left">Clouds (%)</th>
                      <th className="p-2 text-left">Wind (mph)</th>
                      <th className="p-2 text-left">Pressure</th>
                      <th className="p-2 text-left">Prediction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherHistory.slice(-10).map((data) => {
                      const prediction = predictions.find(p => p.day === data.day);
                      return (
                        <tr key={data.day} className="border-b">
                          <td className="p-2 font-bold">{data.day}</td>
                          <td className="p-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getWeatherColor(data.actualWeather)}`}>
                              {getWeatherIcon(data.actualWeather)} {data.actualWeather}
                            </span>
                          </td>
                          <td className="p-2">{data.temperature}</td>
                          <td className="p-2">{data.humidity}</td>
                          <td className="p-2">{data.cloudCover}</td>
                          <td className="p-2">{data.windSpeed}</td>
                          <td className="p-2">{data.pressure}</td>
                          <td className="p-2">
                            {prediction ? (
                              <span className={`text-xs px-2 py-1 rounded ${
                                prediction.accuracy === true ? 'bg-green-100 text-green-700' :
                                prediction.accuracy === false ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {getWeatherIcon(prediction.predictedWeather)} {prediction.confidence}%
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Prediction Accuracy Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">📈</div>
                  <div className="font-bold text-sm">Predictions</div>
                  <div className="text-blue-600">{predictions.length}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">✅</div>
                  <div className="font-bold text-sm">Correct</div>
                  <div className="text-green-600">{predictions.filter(p => p.accuracy === true).length}</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">❌</div>
                  <div className="font-bold text-sm">Missed</div>
                  <div className="text-red-600">{predictions.filter(p => p.accuracy === false).length}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">🧠</div>
                  <div className="font-bold text-sm">AI Score</div>
                  <div className="text-purple-600">{score}</div>
                </div>
              </div>

              {/* Current Status */}
              {selectedPrediction && (
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <h4 className="font-bold text-blue-800 mb-2">🔮 Prediction in Progress</h4>
                  <p className="text-blue-600">
                    Predicting {getWeatherIcon(selectedPrediction)} {selectedPrediction} weather for Day {currentDay}...
                  </p>
                  <div className="mt-2">
                    <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('Correct') || feedback.includes('Complete') || feedback.includes('analyzed')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('missed')
                    ? 'bg-red-100 text-red-700'
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

export default PredictiveWeatherAI;