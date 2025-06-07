import React from 'react';

interface GameThumbnailProps {
  gameSlug: string;
  title: string;
  className?: string;
}

const GameThumbnail: React.FC<GameThumbnailProps> = ({ gameSlug, title, className = "" }) => {
  const renderThumbnail = () => {
    switch (gameSlug) {
      case 'addition-arcade':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#4338CA" rx="10"/>
            <rect x="20" y="20" width="260" height="140" fill="#1E1B4B" rx="8"/>
            <circle cx="80" cy="90" r="20" fill="#F59E0B" className="animate-pulse"/>
            <circle cx="150" cy="90" r="20" fill="#EF4444" className="animate-bounce"/>
            <circle cx="220" cy="90" r="20" fill="#10B981" className="animate-pulse"/>
            <text x="150" y="50" textAnchor="middle" fill="white" className="text-lg font-bold">+</text>
            <text x="150" y="130" textAnchor="middle" fill="white" className="text-sm font-bold">Math Fun!</text>
          </svg>
        );

      case 'subtraction-safari':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#90EE90" rx="10"/>
            <circle cx="250" cy="40" r="25" fill="#FFD700" className="animate-pulse"/>
            <rect x="0" y="130" width="300" height="50" fill="#8B4513"/>
            <ellipse cx="80" cy="110" rx="20" ry="30" fill="#228B22" className="animate-bounce"/>
            <ellipse cx="150" cy="115" rx="18" ry="25" fill="#228B22"/>
            <ellipse cx="220" cy="112" rx="22" ry="32" fill="#228B22" className="animate-pulse"/>
            <text x="150" y="30" textAnchor="middle" fill="#654321" className="text-xl">🦁</text>
            <text x="150" y="50" textAnchor="middle" fill="#654321" className="text-lg font-bold">-</text>
          </svg>
        );

      case 'spelling-bee-garden':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#87CEEB" rx="10"/>
            <circle cx="250" cy="30" r="20" fill="#FFD700" className="animate-spin"/>
            <rect x="0" y="120" width="300" height="60" fill="#228B22"/>
            <circle cx="60" cy="100" r="15" fill="#FF69B4" className="animate-bounce"/>
            <rect x="58" y="100" width="4" height="20" fill="#32CD32"/>
            <circle cx="120" cy="95" r="12" fill="#FF1493" className="animate-pulse"/>
            <rect x="119" y="95" width="3" height="25" fill="#32CD32"/>
            <circle cx="180" cy="98" r="14" fill="#FFB6C1" className="animate-bounce"/>
            <rect x="179" y="98" width="3" height="22" fill="#32CD32"/>
            <circle cx="240" cy="96" r="13" fill="#FF69B4" className="animate-pulse"/>
            <rect x="239" y="96" width="3" height="24" fill="#32CD32"/>
            <text x="150" y="40" textAnchor="middle" fill="#4B0082" className="text-xl">🐝</text>
            <text x="150" y="60" textAnchor="middle" fill="#4B0082" className="text-sm font-bold">Spell!</text>
          </svg>
        );

      case 'sight-word-memory':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#E0F2FE" rx="10"/>
            <rect x="30" y="30" width="50" height="70" fill="#3B82F6" rx="8" className="animate-pulse"/>
            <rect x="100" y="30" width="50" height="70" fill="#10B981" rx="8" className="animate-bounce"/>
            <rect x="170" y="30" width="50" height="70" fill="#F59E0B" rx="8" className="animate-pulse"/>
            <rect x="240" y="30" width="50" height="70" fill="#EF4444" rx="8" className="animate-bounce"/>
            <text x="55" y="70" textAnchor="middle" fill="white" className="text-sm font-bold">THE</text>
            <text x="125" y="70" textAnchor="middle" fill="white" className="text-sm font-bold">AND</text>
            <text x="195" y="70" textAnchor="middle" fill="white" className="text-sm font-bold">A</text>
            <text x="265" y="70" textAnchor="middle" fill="white" className="text-sm font-bold">TO</text>
            <text x="150" y="130" textAnchor="middle" fill="#1E40AF" className="text-lg">🧠</text>
            <text x="150" y="150" textAnchor="middle" fill="#1E40AF" className="text-sm font-bold">Memory!</text>
          </svg>
        );

      case 'rhyming-rockets':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#1F2937" rx="10"/>
            <circle cx="50" cy="30" r="3" fill="#FFD700" className="animate-ping"/>
            <circle cx="80" cy="50" r="2" fill="#FFD700" className="animate-pulse"/>
            <circle cx="220" cy="40" r="3" fill="#FFD700" className="animate-ping"/>
            <circle cx="260" cy="60" r="2" fill="#FFD700" className="animate-pulse"/>
            <polygon points="150,30 160,50 140,50" fill="#EF4444" className="animate-bounce"/>
            <rect x="145" y="50" width="10" height="40" fill="#DC2626"/>
            <polygon points="140,90 160,90 150,110" fill="#F97316"/>
            <circle cx="150" cy="120" r="8" fill="#FFD700" className="animate-pulse"/>
            <circle cx="150" cy="140" r="6" fill="#F59E0B" className="animate-bounce"/>
            <circle cx="150" cy="155" r="4" fill="#EAB308" className="animate-pulse"/>
            <text x="150" y="25" textAnchor="middle" fill="#FFD700" className="text-xl">🚀</text>
          </svg>
        );

      case 'telling-time-puzzle':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#FEF3C7" rx="10"/>
            <circle cx="150" cy="90" r="60" fill="white" stroke="#F59E0B" strokeWidth="4"/>
            {/* Clock numbers */}
            <text x="150" y="45" textAnchor="middle" className="text-sm font-bold">12</text>
            <text x="185" y="95" textAnchor="middle" className="text-sm font-bold">3</text>
            <text x="150" y="140" textAnchor="middle" className="text-sm font-bold">6</text>
            <text x="115" y="95" textAnchor="middle" className="text-sm font-bold">9</text>
            {/* Clock hands */}
            <line x1="150" y1="90" x2="150" y2="60" stroke="#DC2626" strokeWidth="4" className="animate-pulse"/>
            <line x1="150" y1="90" x2="175" y2="90" stroke="#059669" strokeWidth="3" className="animate-bounce"/>
            <circle cx="150" cy="90" r="5" fill="#1F2937"/>
            <text x="150" y="20" textAnchor="middle" fill="#F59E0B" className="text-xl">⏰</text>
          </svg>
        );

      case 'animal-habitat-match':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#DBEAFE" rx="10"/>
            <circle cx="50" cy="50" r="25" fill="#3B82F6" className="animate-bounce"/>
            <text x="50" y="55" textAnchor="middle" className="text-xl">🐠</text>
            <circle cx="250" cy="50" r="25" fill="#10B981" className="animate-pulse"/>
            <text x="250" y="55" textAnchor="middle" className="text-xl">🌊</text>
            <circle cx="50" cy="130" r="25" fill="#F59E0B" className="animate-pulse"/>
            <text x="50" y="135" textAnchor="middle" className="text-xl">🦁</text>
            <circle cx="250" cy="130" r="25" fill="#84CC16" className="animate-bounce"/>
            <text x="250" y="135" textAnchor="middle" className="text-xl">🌴</text>
            <line x1="75" y1="50" x2="225" y2="50" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
            <line x1="75" y1="130" x2="225" y2="130" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
            <text x="150" y="20" textAnchor="middle" fill="#1F2937" className="text-sm font-bold">Match Homes!</text>
          </svg>
        );

      case 'life-cycle-sort':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#F0FDF4" rx="10"/>
            <circle cx="60" cy="60" r="20" fill="#FDE047" className="animate-pulse"/>
            <text x="60" y="65" textAnchor="middle" className="text-sm">🥚</text>
            <circle cx="120" cy="60" r="20" fill="#84CC16" className="animate-bounce"/>
            <text x="120" y="65" textAnchor="middle" className="text-sm">🐛</text>
            <circle cx="180" cy="60" r="20" fill="#8B5CF6" className="animate-pulse"/>
            <text x="180" y="65" textAnchor="middle" className="text-sm">🛡️</text>
            <circle cx="240" cy="60" r="20" fill="#F472B6" className="animate-bounce"/>
            <text x="240" y="65" textAnchor="middle" className="text-sm">🦋</text>
            <path d="M 80 60 Q 100 40 100 60" stroke="#6B7280" strokeWidth="2" fill="none" className="animate-pulse"/>
            <path d="M 140 60 Q 160 40 160 60" stroke="#6B7280" strokeWidth="2" fill="none" className="animate-pulse"/>
            <path d="M 200 60 Q 220 40 220 60" stroke="#6B7280" strokeWidth="2" fill="none" className="animate-pulse"/>
            <text x="150" y="120" textAnchor="middle" fill="#166534" className="text-sm font-bold">Life Cycle!</text>
          </svg>
        );

      case 'shapes-geometry':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#FDF4FF" rx="10"/>
            <circle cx="75" cy="60" r="25" fill="#EF4444" className="animate-pulse"/>
            <polygon points="150,35 175,85 125,85" fill="#FDE047" className="animate-bounce"/>
            <rect x="200" y="35" width="50" height="50" fill="#3B82F6" className="animate-pulse"/>
            <rect x="50" y="110" width="70" height="40" fill="#10B981" className="animate-bounce"/>
            <rect x="180" y="110" width="70" height="40" fill="#8B5CF6" className="animate-pulse"/>
            <text x="150" y="20" textAnchor="middle" fill="#7C3AED" className="text-sm font-bold">Shapes!</text>
          </svg>
        );

      case 'vowel-sorting':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#FEF2F2" rx="10"/>
            <circle cx="60" cy="60" r="25" fill="#EF4444" className="animate-bounce"/>
            <text x="60" y="68" textAnchor="middle" fill="white" className="text-lg font-bold">A</text>
            <circle cx="120" cy="60" r="25" fill="#F59E0B" className="animate-pulse"/>
            <text x="120" y="68" textAnchor="middle" fill="white" className="text-lg font-bold">E</text>
            <circle cx="180" cy="60" r="25" fill="#10B981" className="animate-bounce"/>
            <text x="180" y="68" textAnchor="middle" fill="white" className="text-lg font-bold">I</text>
            <circle cx="240" cy="60" r="25" fill="#3B82F6" className="animate-pulse"/>
            <text x="240" y="68" textAnchor="middle" fill="white" className="text-lg font-bold">O</text>
            <circle cx="150" cy="120" r="25" fill="#8B5CF6" className="animate-bounce"/>
            <text x="150" y="128" textAnchor="middle" fill="white" className="text-lg font-bold">U</text>
            <text x="150" y="20" textAnchor="middle" fill="#DC2626" className="text-sm font-bold">🎵 Vowels!</text>
          </svg>
        );

      case 'patterns-sequences':
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#F3E8FF" rx="10"/>
            <circle cx="50" cy="60" r="20" fill="#EF4444" className="animate-pulse"/>
            <rect x="85" y="40" width="40" height="40" fill="#3B82F6" className="animate-bounce"/>
            <circle cx="170" cy="60" r="20" fill="#EF4444" className="animate-pulse"/>
            <rect x="205" y="40" width="40" height="40" fill="#3B82F6" className="animate-bounce"/>
            <text x="275" y="65" textAnchor="middle" fill="#6B7280" className="text-2xl">?</text>
            <circle cx="60" cy="130" r="15" fill="#10B981" className="animate-pulse"/>
            <polygon points="105,115 125,145 85,145" fill="#F59E0B" className="animate-bounce"/>
            <circle cx="150" cy="130" r="15" fill="#10B981" className="animate-pulse"/>
            <polygon points="185,115 205,145 165,145" fill="#F59E0B" className="animate-bounce"/>
            <text x="240" y="135" textAnchor="middle" fill="#6B7280" className="text-xl">?</text>
            <text x="150" y="20" textAnchor="middle" fill="#7C3AED" className="text-sm font-bold">🧩 Patterns!</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 300 180" className={`w-full h-full ${className}`}>
            <rect width="300" height="180" fill="#F3F4F6" rx="10"/>
            <circle cx="150" cy="90" r="40" fill="#6B7280" className="animate-pulse"/>
            <text x="150" y="95" textAnchor="middle" fill="white" className="text-2xl">🎮</text>
            <text x="150" y="140" textAnchor="middle" fill="#374151" className="text-sm font-bold">{title}</text>
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderThumbnail()}
    </div>
  );
};

export default GameThumbnail;