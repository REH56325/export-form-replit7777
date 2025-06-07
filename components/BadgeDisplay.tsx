import { Badge } from "@/types";
import { BADGES } from "@/lib/constants";

interface BadgeDisplayProps {
  badges?: Badge[];
  unlockedBadgeIds: number[];
  size?: 'sm' | 'md' | 'lg';
}

const BadgeDisplay = ({ badges = BADGES, unlockedBadgeIds, size = 'md' }: BadgeDisplayProps) => {
  // Size variants
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl"
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {badges.map(badge => {
        const isUnlocked = unlockedBadgeIds.includes(badge.id);
        
        return (
          <div
            key={badge.id}
            className={`${isUnlocked ? 'badge-glow bg-accent' : 'bg-gray-200 opacity-50'} rounded-full ${sizeClasses[size]} flex items-center justify-center ${isUnlocked ? 'border-2 border-white' : ''}`}
            title={badge.name + (isUnlocked ? '' : ' - Locked')}
          >
            <i className={`fas fa-${badge.icon} ${isUnlocked ? 'text-dark' : 'text-gray-400'}`}></i>
          </div>
        );
      })}
    </div>
  );
};

export default BadgeDisplay;
