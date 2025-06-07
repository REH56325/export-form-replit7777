import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { API, GRADES } from "@/lib/constants";
import { Game } from "@/types";

interface SimilarGamesProps {
  currentGameId: number;
  gradeId: number;
}

const SimilarGames = ({ currentGameId, gradeId }: SimilarGamesProps) => {
  // Get games by the same grade
  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: [API.GAMES_BY_GRADE(gradeId)],
  });
  
  // Filter out the current game and limit to 3 similar games
  const similarGames = games
    ?.filter(game => game.id !== currentGameId)
    .slice(0, 3);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!similarGames || similarGames.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
      <h3 className="font-heading font-bold text-dark text-xl mb-4">You May Also Like</h3>
      
      <div className="space-y-4">
        {similarGames.map(game => {
          const grade = GRADES.find(g => g.id === game.gradeId);
          const gradeClass = `bg-${grade?.slug || 'gray-500'}`;
          
          return (
            <div key={game.id} className="flex gap-3">
              <div className="w-20 h-16 bg-gray-200 overflow-hidden rounded-lg">
                {game.thumbnail ? (
                  <img 
                    src={`/api/games/thumbnails/${game.thumbnail}`} 
                    alt={`${game.title} Game`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=${encodeURIComponent(game.title.charAt(0))}`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary bg-opacity-30">
                    <i className="fas fa-gamepad text-secondary"></i>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-game text-dark text-sm">{game.title}</h4>
                <span className={`inline-block ${gradeClass} text-xxs text-white font-bold px-2 py-0.5 rounded-full`}>
                  {grade?.name || 'All Grades'}
                </span>
                <Link href={`/game/${game.slug}`}>
                  <a className="mt-1 block text-xs font-heading font-bold text-secondary hover:underline">
                    Play Now
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
      <Link href="/games">
        <a className="w-full mt-4 bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-heading font-bold py-2 px-4 rounded-lg transition flex justify-center items-center">
          Browse All Games
        </a>
      </Link>
    </div>
  );
};

export default SimilarGames;
