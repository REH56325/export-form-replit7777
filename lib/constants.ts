// Grade level definitions
export const GRADES = [
  { id: 1, name: "PreK", slug: "prek", displayOrder: 1, color: "#FF9F1C", icon: "star", bgClass: "bg-prek", textClass: "text-prek" },
  { id: 2, name: "Kindergarten", slug: "kindergarten", displayOrder: 2, color: "#FF4D6D", icon: "apple-alt", bgClass: "bg-kinder", textClass: "text-kinder" },
  { id: 3, name: "1st Grade", slug: "grade-1", displayOrder: 3, color: "#7209B7", icon: "pencil-alt", bgClass: "bg-grade1", textClass: "text-grade1" },
  { id: 4, name: "2nd Grade", slug: "grade-2", displayOrder: 4, color: "#4CC9F0", icon: "book", bgClass: "bg-grade2", textClass: "text-grade2" },
  { id: 5, name: "3rd Grade", slug: "grade-3", displayOrder: 5, color: "#8AC926", icon: "calculator", bgClass: "bg-grade3", textClass: "text-grade3" },
  { id: 6, name: "4th Grade", slug: "grade-4", displayOrder: 6, color: "#1982C4", icon: "globe-americas", bgClass: "bg-grade4", textClass: "text-grade4" },
  { id: 7, name: "5th Grade", slug: "grade-5", displayOrder: 7, color: "#6A4C93", icon: "atom", bgClass: "bg-grade5", textClass: "text-grade5" },
  { id: 8, name: "6th Grade", slug: "grade-6", displayOrder: 8, color: "#F15BB5", icon: "microscope", bgClass: "bg-grade6", textClass: "text-grade6" },
];

// Subject definitions
export const SUBJECTS = [
  { id: 1, name: "Math", slug: "math", icon: "calculator", color: "#4361ee" },
  { id: 2, name: "Reading", slug: "reading", icon: "book", color: "#7209b7" },
  { id: 3, name: "Science", slug: "science", icon: "flask", color: "#38b000" },
  { id: 4, name: "Social Studies", slug: "social-studies", icon: "globe", color: "#fb8500" },
  { id: 5, name: "Art", slug: "art", icon: "palette", color: "#f72585" },
  { id: 6, name: "Music", slug: "music", icon: "music", color: "#3a0ca3" },
  { id: 7, name: "Typing", slug: "typing", icon: "keyboard", color: "#4895ef" },
  { id: 8, name: "Creativity", slug: "creativity", icon: "paint-brush", color: "#ff9f1c" },
];

// Badge definitions
export const BADGES = [
  { id: 1, name: "Quick Solver", description: "Complete a game in record time", icon: "bolt", requirements: { timeUnder: 60 } },
  { id: 2, name: "Perfect Score", description: "Get 100% on any game", icon: "star", requirements: { score: 100 } },
  { id: 3, name: "Math Master", description: "Complete all math games", icon: "trophy", requirements: { completeAllInSubject: 1 } },
  { id: 4, name: "Problem Solver", description: "Solve 50 problems across all games", icon: "puzzle-piece", requirements: { totalProblems: 50 } },
];

// Game difficulty levels
export const DIFFICULTY_LEVELS = [
  { id: 1, name: "Easy", slug: "easy", color: "#8AC926" },
  { id: 2, name: "Medium", slug: "medium", color: "#FFCA3A" },
  { id: 3, name: "Hard", slug: "hard", color: "#FF595E" },
];

// Game type icons
export const GAME_TYPE_ICONS = {
  phaser: "gamepad",
  createjs: "puzzle-piece",
  unity: "cube",
  default: "play",
};

// Placeholder image URL (for development only)
export const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x180?text=Game+Thumbnail";

// API endpoints
export const API = {
  GAMES: "/api/games",
  FEATURED_GAMES: "/api/games/featured",
  GAMES_BY_GRADE: (gradeId: number) => `/api/games/by-grade/${gradeId}`,
  GAME_DETAIL: (slug: string) => `/api/games/${slug}`,
  GRADES: "/api/grades",
  SUBJECTS: "/api/subjects",
  USER_PROGRESS: (userId: number, gameId?: number) => 
    gameId ? `/api/user-progress/${userId}/${gameId}` : `/api/user-progress/${userId}`,
  USER_BADGES: (userId: number) => `/api/user-badges/${userId}`,
};
