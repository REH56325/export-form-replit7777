import { Link } from "wouter";
import { Game, Grade, Subject } from "@/types";
import { GRADES, SUBJECTS } from "@/lib/constants";
import GameThumbnail from "@/components/GameThumbnail";

interface GameCardProps {
  game: Game;
  grades?: Grade[];
  showGrade?: boolean;
}

const GameCard = ({ game, grades = GRADES, showGrade = true }: GameCardProps) => {
  // Find grade info
  const grade = grades.find(g => g.id === game.gradeId) || 
    GRADES.find(g => g.id === game.gradeId) || 
    { name: "All Grades", slug: "all", color: "#6c757d", id: 0, displayOrder: 0, icon: "graduation-cap" };
  
  // Get subject tags
  const subjects = game.subjects || [];
  
  return (
    <Link href={`/game/${game.slug}`}>
      <div className="game-card cursor-pointer flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-lg transition duration-300">
        {/* Game thumbnail */}
        <div className="w-full h-36 bg-gray-200 overflow-hidden">
          <GameThumbnail 
            gameSlug={game.slug} 
            title={game.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              {showGrade && (
                <span className={`inline-block bg-${grade.slug} text-xs text-white font-bold px-2 py-1 rounded-full mb-2`}>
                  {grade.name}
                </span>
              )}
              <h3 className="font-game text-lg text-dark">{game.title}</h3>
            </div>
            <span className={`${game.isPremium ? 'bg-gray-200 text-gray-500' : 'badge-glow bg-accent text-dark'} text-xs rounded-full h-8 w-8 flex items-center justify-center border-2 border-white`}>
              <i className={`fas ${game.isPremium ? 'fa-lock' : 'fa-lock-open'}`}></i>
            </span>
          </div>
          
          {/* Subject tags */}
          {subjects.length > 0 && (
            <div className="flex flex-wrap items-center mt-2 gap-2">
              {subjects.map((subject) => (
                <span 
                  key={subject.id}
                  className={`inline-block text-xs font-bold px-2 py-1 rounded-full`}
                  style={{ 
                    backgroundColor: `${subject.color || '#e9ecef'}20`,
                    color: subject.color || '#495057' 
                  }}
                >
                  {subject.name}
                </span>
              ))}
            </div>
          )}
          
          <button className={`mt-4 w-full ${game.isPremium ? 'bg-gray-300 text-gray-700' : `bg-${grade.slug} hover:bg-opacity-80 text-white`} font-bold py-2 px-4 rounded-lg transition`}>
            {game.isPremium ? 'Premium' : 'Play Now'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
