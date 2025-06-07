import { lazy, Suspense, useState, useEffect } from 'react';

// Define interface for the game loader props
interface GameLoaderProps {
  gameSlug: string;
  isMuted: boolean;
  onScoreUpdate?: (score: number) => void;
}

const GameLoader = ({ gameSlug, isMuted, onScoreUpdate }: GameLoaderProps) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        let module;
        
        // Load specific game components
        switch (gameSlug) {
          case 'space-math-explorer':
            module = await import('../games/SpaceMathExplorer');
            break;
          case 'pirate-treasure-multiplication':
            module = await import('../games/PirateTreasureMultiplication');
            break;
          case 'grammar-castle-adventure':
            module = await import('../games/GrammarCastleAdventure');
            break;
          case 'dinosaur-fossil-fractions':
            module = await import('../games/DinosaurFossilFractions');
            break;
          case 'superhero-sight-words':
            module = await import('../games/SuperheroSightWords');
            break;
          default:
            // Try to load from games folder with PascalCase naming
            const pascalCaseSlug = gameSlug
              .split('-')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join('');
            try {
              module = await import(`../games/${pascalCaseSlug}/index.tsx`);
            } catch {
              // Fallback to a simple placeholder game
              setComponent(() => ({ onScoreUpdate }: { onScoreUpdate?: (score: number) => void }) => (
                <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white p-8 bg-black/30 rounded-lg backdrop-blur-sm">
                    <h1 className="text-4xl font-bold mb-4">🎮 {gameSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
                    <p className="text-xl mb-6">This exciting game is being prepared for you!</p>
                    <div className="text-6xl animate-bounce mb-4">🚀</div>
                    <button 
                      onClick={() => onScoreUpdate?.(100)}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
                    >
                      Play Demo! ⭐
                    </button>
                  </div>
                </div>
              ));
              return;
            }
        }
        
        setComponent(() => module.default);
      } catch (err) {
        console.error(`Failed to load game: ${gameSlug}`, err);
        setError(`Could not load game "${gameSlug}". Please try another game.`);
      }
    };

    loadComponent();
  }, [gameSlug]);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gray-900">
        <div className="text-red-500 font-bold text-xl mb-4">Game Error</div>
        <p className="text-white text-center">{error}</p>
        <button 
          className="mt-6 bg-primary text-white px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 rounded-full border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent animate-spin mb-4"></div>
            <p>Loading game...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Component />
    </div>
  );
};

export default GameLoader;