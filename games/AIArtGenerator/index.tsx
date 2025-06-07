import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';

interface ArtStyle {
  id: string;
  name: string;
  description: string;
  colors: string[];
  pattern: 'abstract' | 'geometric' | 'organic' | 'symmetrical';
  icon: string;
}

interface Artwork {
  id: string;
  title: string;
  style: string;
  canvas: ImageData | null;
  rating: number;
}

const AIArtGenerator = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [artworksCreated, setArtworksCreated] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { user } = useUser();

  const artStyles: ArtStyle[] = [
    {
      id: 'rainbow',
      name: 'Rainbow Dreams',
      description: 'Bright, colorful patterns that flow like rainbows',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'],
      pattern: 'organic',
      icon: '🌈'
    },
    {
      id: 'geometric',
      name: 'Geometric Shapes',
      description: 'Clean lines and mathematical patterns',
      colors: ['#2C3E50', '#E74C3C', '#F39C12', '#27AE60', '#8E44AD', '#3498DB'],
      pattern: 'geometric',
      icon: '🔷'
    },
    {
      id: 'nature',
      name: 'Nature Inspired',
      description: 'Earth tones and organic flowing shapes',
      colors: ['#228B22', '#8B4513', '#DEB887', '#87CEEB', '#F4A460', '#98FB98'],
      pattern: 'organic',
      icon: '🌿'
    },
    {
      id: 'cosmic',
      name: 'Cosmic Space',
      description: 'Deep space colors with stellar patterns',
      colors: ['#191970', '#4B0082', '#8A2BE2', '#9370DB', '#BA55D3', '#DA70D6'],
      pattern: 'abstract',
      icon: '🌌'
    },
    {
      id: 'symmetry',
      name: 'Mirror Magic',
      description: 'Perfectly balanced symmetrical designs',
      colors: ['#FF1493', '#00CED1', '#FFD700', '#FF4500', '#32CD32', '#FF69B4'],
      pattern: 'symmetrical',
      icon: '🪞'
    }
  ];

  const artPrompts = [
    "A happy robot playing in a garden",
    "Colorful butterflies dancing in the sky",
    "A magical castle made of rainbows",
    "Friendly aliens having a tea party",
    "Ocean waves with swimming dolphins",
    "A forest where trees sing songs",
    "Flying cars in a future city",
    "A dragon made of flowers",
    "Stars that spell out your name",
    "Animals having a picnic together"
  ];

  useEffect(() => {
    if (gameStarted) {
      clearCanvas();
      generateNewPrompt();
    }
  }, [gameStarted, level]);

  const playSound = (type: 'paint' | 'generate' | 'complete' | 'style' | 'success') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        paint: 'Brush stroke',
        generate: 'AI generating art suggestions',
        complete: 'Artwork completed!',
        style: 'Art style selected',
        success: 'Masterpiece created!'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = type === 'paint' ? 2.0 : 1.1;
      utterance.pitch = type === 'success' ? 1.4 : 1.0;
      utterance.volume = 0.4;
      speechSynthesis.speak(utterance);
    }
  };

  const generateNewPrompt = () => {
    const randomPrompt = artPrompts[Math.floor(Math.random() * artPrompts.length)];
    setCurrentPrompt(randomPrompt);
    generateAISuggestions(randomPrompt);
  };

  const generateAISuggestions = (prompt: string) => {
    const suggestions = [
      `Try using ${selectedStyle?.name || 'bright colors'} for this artwork`,
      "Start with big shapes, then add small details",
      "Use contrasting colors to make your art pop",
      "Create patterns that repeat across the canvas",
      "Add some curved lines to make it more dynamic"
    ];
    
    setAiSuggestions(suggestions.slice(0, 3));
    playSound('generate');
  };

  const selectStyle = (style: ArtStyle) => {
    setSelectedStyle(style);
    setSelectedColor(style.colors[0]);
    playSound('style');
    setFeedback(`🎨 Selected ${style.name} style! ${style.description}`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = selectedColor;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Apply AI style effects
    if (selectedStyle) {
      applyStyleEffect(ctx, x, y);
    }
    
    playSound('paint');
  };

  const applyStyleEffect = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    if (!selectedStyle) return;
    
    ctx.save();
    
    switch (selectedStyle.pattern) {
      case 'symmetrical':
        // Mirror the drawing
        ctx.scale(-1, 1);
        ctx.translate(-ctx.canvas.width, 0);
        ctx.lineTo(ctx.canvas.width - x, y);
        ctx.stroke();
        break;
        
      case 'geometric':
        // Add geometric helper lines
        ctx.strokeStyle = selectedColor + '30';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
        break;
        
      case 'organic':
        // Add flowing curves
        ctx.strokeStyle = selectedColor + '50';
        ctx.lineWidth = brushSize / 2;
        ctx.beginPath();
        ctx.arc(x, y, brushSize * 2, 0, 2 * Math.PI);
        ctx.stroke();
        break;
    }
    
    ctx.restore();
  };

  const generateAIArt = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedStyle) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Generate AI-inspired patterns
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 20 + 5;
      const color = selectedStyle.colors[Math.floor(Math.random() * selectedStyle.colors.length)];
      
      ctx.fillStyle = color + '80';
      
      switch (selectedStyle.pattern) {
        case 'geometric':
          ctx.fillRect(x - size/2, y - size/2, size, size);
          break;
        case 'organic':
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'abstract':
          ctx.fillStyle = color;
          ctx.fillRect(x, y, size * 2, size / 2);
          break;
        case 'symmetrical':
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(canvas.width - x, y, size, 0, 2 * Math.PI);
          ctx.fill();
          break;
      }
    }
    
    playSound('generate');
    setFeedback('🤖 AI has added creative elements to your artwork!');
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const saveArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const rating = Math.floor(Math.random() * 3) + 3; // Random rating 3-5
    
    const newArtwork: Artwork = {
      id: Date.now().toString(),
      title: currentPrompt,
      style: selectedStyle?.name || 'Free Style',
      canvas: imageData,
      rating
    };
    
    setArtworks([...artworks, newArtwork]);
    setScore(score + (rating * 20));
    setArtworksCreated(artworksCreated + 1);
    
    playSound('complete');
    setFeedback(`🎨 Artwork saved! Rating: ${'⭐'.repeat(rating)}`);
    setShowFeedback(true);
    
    // Check level completion
    if (artworksCreated + 1 >= level * 3) {
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
          setFeedback(`🎊 Level ${level} Complete! You're becoming a true AI artist!`);
        } else {
          setFeedback('🏆 Congratulations! You\'ve mastered AI-assisted art creation!');
        }
      }, 2000);
    }
    
    // Generate new prompt
    setTimeout(() => {
      generateNewPrompt();
      clearCanvas();
    }, 3000);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setArtworksCreated(0);
    setArtworks([]);
    setSelectedStyle(null);
    setGameStarted(false);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-purple-800 mb-2 animate-pulse">🎨 AI Art Generator</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-purple-600">Score: {score}</div>
            <div className="text-lg font-bold text-pink-600">Level: {level}</div>
            <div className="text-lg font-bold text-indigo-600">Artworks: {artworksCreated} 🖼️</div>
            <div className="text-lg font-bold text-cyan-600">Gallery: {artworks.length}</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">🖌️ Create Amazing AI Art!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🎨 Choose AI art styles to guide your creativity</p>
              <p>🖼️ Paint with intelligent brush effects and patterns</p>
              <p>🤖 Let AI add magical elements to your artwork</p>
              <p>🌟 Build a gallery of unique AI-generated masterpieces</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Creating!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Art Tools */}
            <div className="xl:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🎨 Art Studio</h3>
              
              {/* Current Prompt */}
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-purple-800 mb-2">🎯 Art Challenge</h4>
                <p className="text-sm text-purple-600">{currentPrompt}</p>
                <button
                  onClick={generateNewPrompt}
                  className="mt-2 bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded text-sm transition-all"
                >
                  🎲 New Prompt
                </button>
              </div>

              {/* AI Suggestions */}
              {aiSuggestions.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h5 className="font-bold text-blue-800 mb-2">🤖 AI Suggestions</h5>
                  {aiSuggestions.map((suggestion, index) => (
                    <p key={index} className="text-xs text-blue-600 mb-1">• {suggestion}</p>
                  ))}
                </div>
              )}

              {/* Art Styles */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-700 mb-3">🎭 AI Art Styles</h4>
                <div className="space-y-2">
                  {artStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => selectStyle(style)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        selectedStyle?.id === style.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg">{style.icon}</span>
                        <span className="font-bold text-sm">{style.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{style.description}</p>
                      <div className="flex space-x-1 mt-2">
                        {style.colors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              {selectedStyle && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2">🎨 Colors</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedStyle.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                          selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brush Size */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-700 mb-2">🖌️ Brush Size</h4>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">{brushSize}px</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={generateAIArt}
                  disabled={!selectedStyle}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🤖 Add AI Magic
                </button>
                <button
                  onClick={clearCanvas}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🗑️ Clear Canvas
                </button>
                <button
                  onClick={saveArtwork}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  💾 Save Artwork
                </button>
              </div>

              {/* Hint Button */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all"
              >
                💡 {showHints ? 'Hide' : 'Show'} Tips
              </button>

              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mt-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Art Tips:</strong> Choose a style first, then start with big shapes and add details. Use AI magic to enhance your artwork!
                  </p>
                </div>
              )}
            </div>

            {/* Canvas Area */}
            <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">🖼️ Canvas</h3>
                <div className="text-sm text-gray-600">
                  Selected: {selectedStyle?.name || 'Choose a style'} | Color: 
                  <span 
                    className="inline-block w-4 h-4 rounded ml-1 border"
                    style={{ backgroundColor: selectedColor }}
                  ></span>
                </div>
              </div>

              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="border-2 border-gray-300 rounded-lg cursor-crosshair w-full max-w-2xl mx-auto"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
              />

              {/* Canvas Controls */}
              <div className="mt-4 text-center space-x-4">
                <span className="text-sm text-gray-600">Click and drag to paint</span>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('saved') || feedback.includes('Complete') || feedback.includes('Congratulations')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('Selected')
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* Gallery */}
            <div className="xl:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🖼️ Art Gallery</h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {artworks.length === 0 ? (
                  <p className="text-gray-500 text-center">Create your first artwork!</p>
                ) : (
                  artworks.map((artwork) => (
                    <div key={artwork.id} className="border rounded-lg p-3">
                      <h5 className="font-bold text-sm mb-1">{artwork.title}</h5>
                      <p className="text-xs text-gray-600 mb-1">Style: {artwork.style}</p>
                      <div className="text-xs text-yellow-600">
                        {'⭐'.repeat(artwork.rating)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Gallery Stats */}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <h5 className="font-bold text-gray-800 mb-2">📊 Gallery Stats</h5>
                <div className="text-sm space-y-1">
                  <p>Total Artworks: {artworks.length}</p>
                  <p>Average Rating: {artworks.length > 0 ? (artworks.reduce((sum, art) => sum + art.rating, 0) / artworks.length).toFixed(1) : '0'} ⭐</p>
                  <p>Level Progress: {artworksCreated}/{level * 3}</p>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetGame}
                className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                🔄 New Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIArtGenerator;