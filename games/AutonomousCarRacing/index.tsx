import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Sensor {
  id: string;
  name: string;
  type: 'distance' | 'speed' | 'camera' | 'lidar';
  active: boolean;
  range: number;
  icon: string;
}

interface Car {
  x: number;
  y: number;
  speed: number;
  direction: number;
  sensors: Sensor[];
  color: string;
}

interface Track {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  obstacles: { x: number; y: number; width: number; height: number }[];
  checkpoints: { x: number; y: number }[];
  startPosition: { x: number; y: number };
}

const AutonomousCarRacing = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [car, setCar] = useState<Car>({
    x: 50,
    y: 200,
    speed: 0,
    direction: 0,
    sensors: [],
    color: '#3B82F6'
  });
  const [isRacing, setIsRacing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [racesWon, setRacesWon] = useState(0);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [raceTime, setRaceTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { user } = useUser();

  const availableSensors: Sensor[] = [
    { id: 'front-distance', name: 'Front Distance', type: 'distance', active: false, range: 100, icon: '📡' },
    { id: 'speed-sensor', name: 'Speed Monitor', type: 'speed', active: false, range: 0, icon: '⚡' },
    { id: 'camera', name: 'AI Camera', type: 'camera', active: false, range: 150, icon: '📷' },
    { id: 'side-distance', name: 'Side Distance', type: 'distance', active: false, range: 80, icon: '📊' },
    { id: 'lidar', name: 'LIDAR Scanner', type: 'lidar', active: false, range: 200, icon: '🌐' }
  ];

  const tracks: Track[] = [
    {
      id: 1,
      name: "Beginner Circuit",
      difficulty: 'easy',
      startPosition: { x: 50, y: 200 },
      obstacles: [
        { x: 200, y: 150, width: 20, height: 100 },
        { x: 400, y: 100, width: 20, height: 150 }
      ],
      checkpoints: [
        { x: 150, y: 200 },
        { x: 350, y: 200 },
        { x: 500, y: 200 }
      ]
    },
    {
      id: 2,
      name: "Urban Challenge",
      difficulty: 'medium',
      startPosition: { x: 50, y: 200 },
      obstacles: [
        { x: 150, y: 120, width: 20, height: 80 },
        { x: 250, y: 200, width: 20, height: 100 },
        { x: 350, y: 140, width: 20, height: 120 },
        { x: 450, y: 180, width: 20, height: 80 }
      ],
      checkpoints: [
        { x: 120, y: 200 },
        { x: 220, y: 150 },
        { x: 320, y: 200 },
        { x: 420, y: 150 },
        { x: 520, y: 200 }
      ]
    },
    {
      id: 3,
      name: "AI Highway",
      difficulty: 'hard',
      startPosition: { x: 50, y: 200 },
      obstacles: [
        { x: 120, y: 100, width: 15, height: 60 },
        { x: 180, y: 220, width: 15, height: 80 },
        { x: 240, y: 130, width: 15, height: 70 },
        { x: 300, y: 200, width: 15, height: 90 },
        { x: 360, y: 110, width: 15, height: 80 },
        { x: 420, y: 190, width: 15, height: 100 },
        { x: 480, y: 140, width: 15, height: 60 }
      ],
      checkpoints: [
        { x: 100, y: 200 },
        { x: 160, y: 180 },
        { x: 220, y: 200 },
        { x: 280, y: 160 },
        { x: 340, y: 200 },
        { x: 400, y: 180 },
        { x: 460, y: 200 },
        { x: 520, y: 180 }
      ]
    }
  ];

  const currentTrack = tracks[Math.min(level - 1, tracks.length - 1)];

  useEffect(() => {
    if (gameStarted) {
      drawTrack();
    }
  }, [gameStarted, car, currentTrack]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRacing) {
      interval = setInterval(() => {
        setRaceTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRacing]);

  const playSound = (type: 'engine' | 'checkpoint' | 'crash' | 'finish' | 'sensor') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        engine: 'Vroom!',
        checkpoint: 'Checkpoint reached!',
        crash: 'Collision detected!',
        finish: 'Race completed successfully!',
        sensor: 'Sensor activated'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = type === 'engine' ? 2.0 : 1.1;
      utterance.pitch = type === 'crash' ? 0.5 : type === 'finish' ? 1.5 : 1.0;
      utterance.volume = 0.3;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleSensor = (sensorId: string) => {
    const updatedSensors = car.sensors.map(sensor =>
      sensor.id === sensorId ? { ...sensor, active: !sensor.active } : sensor
    );
    setCar({ ...car, sensors: updatedSensors });
    playSound('sensor');
  };

  const initializeCar = () => {
    setCar({
      ...car,
      x: currentTrack.startPosition.x,
      y: currentTrack.startPosition.y,
      speed: 0,
      direction: 0,
      sensors: [...availableSensors]
    });
    setCurrentCheckpoint(0);
    setRaceTime(0);
  };

  const drawTrack = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw track borders
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 50, canvas.width - 20, canvas.height - 100);

    // Draw obstacles
    ctx.fillStyle = '#EF4444';
    currentTrack.obstacles.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw checkpoints
    currentTrack.checkpoints.forEach((checkpoint, index) => {
      if (index === currentCheckpoint) {
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(checkpoint.x, checkpoint.y, 15, 0, 2 * Math.PI);
        ctx.fill();
      } else if (index < currentCheckpoint) {
        ctx.fillStyle = '#6B7280';
        ctx.beginPath();
        ctx.arc(checkpoint.x, checkpoint.y, 10, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(checkpoint.x, checkpoint.y, 12, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });

    // Draw car
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate((car.direction * Math.PI) / 180);
    
    // Car body
    ctx.fillStyle = car.color;
    ctx.fillRect(-15, -8, 30, 16);
    
    // Car windows
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(-10, -6, 20, 12);
    
    // Active sensors visualization
    car.sensors.filter(s => s.active).forEach(sensor => {
      ctx.strokeStyle = sensor.type === 'camera' ? '#F59E0B' : '#8B5CF6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      if (sensor.type === 'distance' || sensor.type === 'lidar') {
        ctx.beginPath();
        ctx.arc(0, 0, sensor.range, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (sensor.type === 'camera') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sensor.range, -30);
        ctx.lineTo(sensor.range, 30);
        ctx.closePath();
        ctx.stroke();
      }
    });
    
    ctx.restore();
    ctx.setLineDash([]);
  };

  const checkCollision = (x: number, y: number): boolean => {
    // Check track boundaries
    if (x < 25 || x > canvasRef.current!.width - 25 || y < 65 || y > canvasRef.current!.height - 65) {
      return true;
    }

    // Check obstacles
    return currentTrack.obstacles.some(obstacle => 
      x >= obstacle.x - 15 && x <= obstacle.x + obstacle.width + 15 &&
      y >= obstacle.y - 15 && y <= obstacle.y + obstacle.height + 15
    );
  };

  const updateCarPosition = (direction: 'forward' | 'backward' | 'left' | 'right') => {
    if (!isRacing) return;

    let newX = car.x;
    let newY = car.y;
    let newDirection = car.direction;
    let newSpeed = car.speed;

    const moveSpeed = 3;
    const turnSpeed = 5;

    switch (direction) {
      case 'forward':
        newSpeed = Math.min(10, car.speed + 1);
        newX += Math.cos((car.direction * Math.PI) / 180) * moveSpeed;
        newY += Math.sin((car.direction * Math.PI) / 180) * moveSpeed;
        break;
      case 'backward':
        newSpeed = Math.max(0, car.speed - 1);
        newX -= Math.cos((car.direction * Math.PI) / 180) * moveSpeed * 0.5;
        newY -= Math.sin((car.direction * Math.PI) / 180) * moveSpeed * 0.5;
        break;
      case 'left':
        newDirection = car.direction - turnSpeed;
        break;
      case 'right':
        newDirection = car.direction + turnSpeed;
        break;
    }

    // Check collision before moving
    if (!checkCollision(newX, newY)) {
      setCar({
        ...car,
        x: newX,
        y: newY,
        direction: newDirection,
        speed: newSpeed
      });

      // Check checkpoint collision
      const checkpoint = currentTrack.checkpoints[currentCheckpoint];
      if (checkpoint) {
        const distance = Math.sqrt(
          Math.pow(newX - checkpoint.x, 2) + Math.pow(newY - checkpoint.y, 2)
        );
        
        if (distance < 20) {
          setCurrentCheckpoint(currentCheckpoint + 1);
          playSound('checkpoint');
          setScore(score + 25);

          // Check if race finished
          if (currentCheckpoint + 1 >= currentTrack.checkpoints.length) {
            finishRace();
          }
        }
      }

      playSound('engine');
    } else {
      // Collision detected
      playSound('crash');
      setFeedback('Collision detected! AI systems preventing crash...');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const startRace = () => {
    initializeCar();
    setIsRacing(true);
    setRaceTime(0);
    setCurrentCheckpoint(0);
    setFeedback(`🏁 Race started on ${currentTrack.name}!`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const finishRace = () => {
    setIsRacing(false);
    const finalTime = raceTime;
    
    if (!bestTime || finalTime < bestTime) {
      setBestTime(finalTime);
      setFeedback(`🏆 New record! Completed in ${finalTime.toFixed(1)}s!`);
    } else {
      setFeedback(`🏁 Race finished in ${finalTime.toFixed(1)}s!`);
    }
    
    setScore(score + Math.round(100 - finalTime));
    setRacesWon(racesWon + 1);
    playSound('finish');
    
    setTimeout(() => {
      if (level < tracks.length) {
        setLevel(level + 1);
        setFeedback(`🎉 Level ${level} Complete! Moving to ${tracks[level].name}!`);
      } else {
        setFeedback('🏆 Congratulations! You\'ve mastered autonomous vehicle technology!');
      }
    }, 3000);
    
    setShowFeedback(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    initializeCar();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setRacesWon(0);
    setBestTime(null);
    setIsRacing(false);
    setGameStarted(false);
    setShowInstructions(true);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isRacing) return;
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          updateCarPosition('forward');
          break;
        case 's':
        case 'arrowdown':
          updateCarPosition('backward');
          break;
        case 'a':
        case 'arrowleft':
          updateCarPosition('left');
          break;
        case 'd':
        case 'arrowright':
          updateCarPosition('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRacing, car]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-2 animate-pulse">🏎️ Autonomous Car Racing</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-blue-600">Score: {score}</div>
            <div className="text-lg font-bold text-purple-600">Level: {level}</div>
            <div className="text-lg font-bold text-green-600">Races Won: {racesWon} 🏁</div>
            <div className="text-lg font-bold text-orange-600">Time: {raceTime.toFixed(1)}s</div>
            {bestTime && <div className="text-lg font-bold text-red-600">Best: {bestTime.toFixed(1)}s</div>}
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">🤖 Program Your Self-Driving Car!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🚗 Configure AI sensors to help your car navigate safely</p>
              <p>🛣️ Navigate through obstacles and reach checkpoints</p>
              <p>⚡ Learn how autonomous vehicles use AI technology</p>
              <p>🎮 Use WASD or arrow keys to control your car</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-gray-500 to-blue-500 hover:from-gray-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Racing!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* AI Control Panel */}
            <div className="xl:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🤖 AI Systems</h3>
              
              {/* Track Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-blue-800 mb-2">{currentTrack.name}</h4>
                <p className="text-sm text-blue-600 capitalize">Difficulty: {currentTrack.difficulty}</p>
                <p className="text-sm text-blue-600">
                  Checkpoint: {currentCheckpoint}/{currentTrack.checkpoints.length}
                </p>
              </div>

              {/* Sensor Configuration */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">📡 AI Sensors</h4>
                <div className="space-y-2">
                  {car.sensors.map((sensor) => (
                    <div 
                      key={sensor.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        sensor.active ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-300'
                      }`}
                      onClick={() => toggleSensor(sensor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg mr-2">{sensor.icon}</span>
                          <span className="font-bold text-sm">{sensor.name}</span>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${sensor.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </div>
                      {sensor.range > 0 && (
                        <p className="text-xs text-gray-500 mt-1">Range: {sensor.range}m</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Car Status */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-2">🚗 Vehicle Status</h5>
                <div className="space-y-1 text-sm">
                  <p>Speed: {car.speed} km/h</p>
                  <p>Direction: {car.direction}°</p>
                  <p>Position: ({Math.round(car.x)}, {Math.round(car.y)})</p>
                  <p>Active Sensors: {car.sensors.filter(s => s.active).length}</p>
                </div>
              </div>

              {/* Hint Section */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all mb-4"
              >
                💡 {showHints ? 'Hide' : 'Show'} AI Tips
              </button>

              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Driving Tips:</strong> Activate distance sensors to avoid collisions. Camera sensors help with navigation. LIDAR provides 360° awareness!
                  </p>
                </div>
              )}

              {/* Race Controls */}
              <div className="space-y-2">
                <button
                  onClick={startRace}
                  disabled={isRacing}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  {isRacing ? '🏁 Racing...' : '🚀 Start Race'}
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🔄 Reset Game
                </button>
              </div>
            </div>

            {/* Race Track */}
            <div className="xl:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">🏁 Race Track</h3>
                <div className="text-sm text-gray-600">
                  Use WASD or Arrow Keys to drive
                </div>
              </div>

              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="border-2 border-gray-300 rounded-lg w-full max-w-4xl mx-auto"
                style={{ maxHeight: '400px' }}
              />

              {/* Race Info */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">⏱️</div>
                  <div className="font-bold">Race Time</div>
                  <div className="text-blue-600">{raceTime.toFixed(1)}s</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">🎯</div>
                  <div className="font-bold">Checkpoint</div>
                  <div className="text-green-600">{currentCheckpoint}/{currentTrack.checkpoints.length}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">⚡</div>
                  <div className="font-bold">Speed</div>
                  <div className="text-purple-600">{car.speed} km/h</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-2xl">🤖</div>
                  <div className="font-bold">AI Status</div>
                  <div className="text-orange-600">{car.sensors.filter(s => s.active).length} Active</div>
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('record') || feedback.includes('Congratulations') || feedback.includes('Complete')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('Collision')
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

export default AutonomousCarRacing;