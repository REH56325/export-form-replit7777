import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { API } from "@/lib/constants";
import { Game, Subject, Grade } from "@/types";

const GamesBySubjectPage = () => {
  const [activeSubject, setActiveSubject] = useState<string>('all');
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  // Fetch all games
  const { data: games = [], isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: [API.GAMES],
  });

  // Fetch subjects
  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: [API.SUBJECTS],
  });

  // Fetch grades for display
  const { data: grades = [] } = useQuery<Grade[]>({
    queryKey: [API.GRADES],
  });

  // Predefined subjects for filtering
  const subjectFilters = [
    { id: 'all', name: 'All Subjects', icon: '🎯' },
    { id: 'math', name: 'Math', icon: '🔢' },
    { id: 'english', name: 'English', icon: '📝' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'computer', name: 'Computer', icon: '💻' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'critical-thinking', name: 'Critical Thinking', icon: '🧠' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'general-knowledge', name: 'General Knowledge', icon: '🌍' }
  ];

  // Filter games based on selected subject
  useEffect(() => {
    if (activeSubject === 'all') {
      setFilteredGames(games);
    } else {
      // Filter games based on subject name matching
      const filtered = games.filter(game => 
        game.title.toLowerCase().includes(activeSubject) ||
        game.description?.toLowerCase().includes(activeSubject)
      );
      setFilteredGames(filtered);
    }
  }, [games, activeSubject]);

  const getGradeName = (gradeId: number) => {
    const grade = grades.find(g => g.id === gradeId);
    return grade?.name || `Grade ${gradeId}`;
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'math': 'bg-blue-100 text-blue-800',
      'english': 'bg-green-100 text-green-800',
      'science': 'bg-purple-100 text-purple-800',
      'computer': 'bg-gray-100 text-gray-800',
      'art': 'bg-pink-100 text-pink-800',
      'critical-thinking': 'bg-yellow-100 text-yellow-800',
      'reading': 'bg-indigo-100 text-indigo-800',
      'music': 'bg-red-100 text-red-800',
      'general-knowledge': 'bg-teal-100 text-teal-800'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Games by Subject | Educational Gaming Platform</title>
        <meta name="description" content="Explore educational games organized by subject including Math, English, Science, and more." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Games by Subject</h1>
          <p className="text-lg text-gray-600">Discover educational games organized by subject area</p>
        </div>

        {/* Subject Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {subjectFilters.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setActiveSubject(subject.id)}
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  activeSubject === subject.id
                    ? 'bg-primary text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary hover:shadow-sm'
                }`}
              >
                <span className="mr-2">{subject.icon}</span>
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        {gamesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No games found</h3>
            <p className="text-gray-500">
              {activeSubject === 'all' 
                ? 'No games are currently available.'
                : `No games found for ${subjectFilters.find(s => s.id === activeSubject)?.name}.`}
            </p>
            {activeSubject !== 'all' && (
              <button
                onClick={() => setActiveSubject('all')}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                View All Games
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} 
                {activeSubject !== 'all' && ` for ${subjectFilters.find(s => s.id === activeSubject)?.name}`}
              </p>
            </div>

            {/* Game Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                  {/* Game Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                      🎮
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                      <div className="transform scale-0 group-hover:scale-100 transition-transform duration-200">
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Game Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                      {game.title}
                    </h3>
                    
                    {/* Subject and Grade Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(activeSubject)}`}>
                        {subjectFilters.find(s => s.id === activeSubject)?.name || 'Educational'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getGradeName(game.gradeId)}
                      </span>
                    </div>

                    {/* Game Description */}
                    {game.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {game.description}
                      </p>
                    )}

                    {/* Play Button */}
                    <Link href={`/game/${game.slug}`}>
                      <button className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Play Game
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link href="/">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GamesBySubjectPage;