import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { API, GRADES } from "@/lib/constants";
import { Game, Grade } from "@/types";
import ProgressTracker from "./ProgressTracker";
import SimilarGames from "./SimilarGames";
import GameLoader from "./GameLoader";
import { useUser } from "@/contexts/UserContext";

interface GameDetailProps {
  game: Game;
  grades?: Grade[];
}

const GameDetail = ({ game, grades = GRADES }: GameDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user } = useUser();

  // Find the grade info
  const grade = grades?.find(g => g.id === game.gradeId) || 
    GRADES.find(g => g.id === game.gradeId) || 
    { name: "All Grades", slug: "all", color: "#6c757d", id: 0, displayOrder: 0, icon: "graduation-cap" };

  // Start playing the game
  const startGame = () => {
    setIsPlaying(true);
  };

  // Reset game
  const resetGame = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  // Toggle audio
  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const gameElement = document.getElementById("game-container");
    
    if (!document.fullscreenElement && gameElement) {
      gameElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Game Canvas Area */}
          <div className="lg:w-3/4">
            <div id="game-container" className="bg-dark rounded-xl p-4 shadow-xl">
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                {isPlaying ? (
                  // Load the game component directly
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    {/* Game component will be imported and rendered here */}
                    <GameLoader 
                      gameSlug={game.slug} 
                      isMuted={isMuted}
                      onScoreUpdate={(score: number) => console.log('Score update:', score)}
                    />
                  </div>
                ) : (
                  <>
                    {/* Game thumbnail */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      {game.thumbnail ? (
                        <img 
                          src={`/api/games/thumbnails/${game.thumbnail}`} 
                          alt={`${game.title} Game Screenshot`} 
                          className="w-full h-auto"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/1280x720/4ECDC4/FFFFFF?text=${encodeURIComponent(game.title)}`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fas fa-gamepad text-6xl text-gray-600"></i>
                        </div>
                      )}
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <button 
                        onClick={startGame}
                        className="bg-primary hover:bg-opacity-80 text-white font-bold w-20 h-20 rounded-full flex items-center justify-center transition transform hover:scale-110"
                      >
                        <i className="fas fa-play text-3xl"></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* Game controls */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <button 
                    onClick={toggleAudio}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-lg transition"
                  >
                    <i className={`fas fa-${isMuted ? 'volume-mute' : 'volume-up'}`}></i>
                  </button>
                  <button 
                    onClick={toggleFullscreen}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-lg transition"
                  >
                    <i className={`fas fa-${isFullscreen ? 'compress' : 'expand'}`}></i>
                  </button>
                  <button 
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-lg transition"
                  >
                    <i className="fas fa-cog"></i>
                  </button>
                </div>
                <div>
                  <button 
                    onClick={resetGame}
                    className="bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    Restart Game
                  </button>
                </div>
              </div>
            </div>
            
            {/* Game information */}
            <div className="mt-8">
              <h1 className="text-4xl font-game text-dark mb-2">{game.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-block bg-${grade.slug} text-xs text-white font-bold px-2 py-1 rounded-full`}>
                  {grade.name}
                </span>
                
                {game.subjects?.map(subject => (
                  <span 
                    key={subject.id}
                    className="inline-block text-xs font-bold px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${subject.color || '#e9ecef'}20`,
                      color: subject.color || '#495057' 
                    }}
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700">{game.description}</p>
                
                {game.educationalBenefits && (
                  <>
                    <h3 className="font-heading font-bold text-dark mt-6 mb-2">Educational Benefits:</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {game.educationalBenefits.split(',').map((benefit, index) => (
                        <li key={index}>{benefit.trim()}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {game.instructions && (
                  <>
                    <h3 className="font-heading font-bold text-dark mt-6 mb-2">How to Play:</h3>
                    <p className="text-gray-700">{game.instructions}</p>
                  </>
                )}
                
                <h3 className="font-heading font-bold text-dark mt-6 mb-2">Controls:</h3>
                <p className="text-gray-700">Use your mouse or touchscreen to select answers. Arrow keys can be used for movement on desktop.</p>
              </div>
              
              {/* Teacher resources */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-heading font-bold text-dark text-xl mb-4 flex items-center">
                  <i className="fas fa-chalkboard-teacher text-blue-500 mr-2"></i> Teacher Resources
                </h3>
                <p className="text-gray-700 mb-4">Access printable worksheets, lesson plans, and assessment tools that align with this game.</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-heading font-bold py-2 px-4 rounded-lg transition">
                  Download Resources
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* User progress */}
            {user ? (
              <ProgressTracker userId={user.id} gameId={game.id} gradeSlug={grade.slug} />
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md mb-6">
                <h3 className="font-heading font-bold text-dark text-xl mb-4">Track Your Progress</h3>
                <p className="text-gray-600 mb-4">Sign in to track your progress, earn badges, and save your game achievements.</p>
                <button 
                  className="w-full bg-primary hover:bg-opacity-80 text-white font-heading font-bold py-2 px-4 rounded-lg transition"
                >
                  Sign In to Track Progress
                </button>
              </div>
            )}
            
            {/* Similar games */}
            <SimilarGames currentGameId={game.id} gradeId={game.gradeId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
