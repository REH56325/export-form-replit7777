import { useQuery } from "@tanstack/react-query";
import { API, GRADES } from "@/lib/constants";
import { UserProgress, Badge } from "@/types";
import BadgeDisplay from "./BadgeDisplay";

interface ProgressTrackerProps {
  userId: number;
  gameId: number;
  gradeSlug: string;
}

const ProgressTracker = ({ userId, gameId, gradeSlug }: ProgressTrackerProps) => {
  // Get user progress for this game
  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: [API.USER_PROGRESS(userId, gameId)],
  });
  
  // Get user badges
  const { data: badges, isLoading: badgesLoading } = useQuery<Badge[]>({
    queryKey: [API.USER_BADGES(userId)],
  });
  
  // Calculate progress percentage
  const progressPercentage = progress ? Math.round((progress.level / 10) * 100) : 0;
  const bgClass = `bg-${gradeSlug}`;
  
  if (progressLoading || badgesLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md mb-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="flex space-x-2 mb-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md mb-6">
      <h3 className="font-heading font-bold text-dark text-xl mb-4">Your Progress</h3>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-heading font-bold text-dark">
            Level {progress?.level || 0} of 10
          </span>
          <span className="font-heading font-bold text-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`${bgClass} h-4 rounded-full`} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Achievements */}
      <h4 className="font-heading font-bold text-dark text-lg mb-2">Badges Earned</h4>
      
      {badges && badges.length > 0 ? (
        <BadgeDisplay badges={badges} unlockedBadgeIds={badges.map(b => b.id)} />
      ) : (
        <div className="text-gray-500 mb-4 text-sm">
          Play more games to earn badges and track your progress!
        </div>
      )}
      
      <button className={`w-full ${bgClass} hover:bg-opacity-80 text-white font-heading font-bold py-2 px-4 rounded-lg transition`}>
        View All Progress
      </button>
    </div>
  );
};

export default ProgressTracker;
