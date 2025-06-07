import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { API, GRADES } from '@/lib/constants';
import { Game, Grade, Subject, SubjectFilter as SubjectFilterType } from '@/types';
import GameCard from './GameCard';
import SubjectFilterComponent from './SubjectFilter';

interface GamesByGradeProps {
  gradeId: number;
  gradeSlug: string;
}

const GamesByGrade = ({ gradeId, gradeSlug }: GamesByGradeProps) => {
  const [activeFilters, setActiveFilters] = useState<SubjectFilterType[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch grade info
  const { data: grades } = useQuery<Grade[]>({
    queryKey: [API.GRADES],
  });

  // Fetch games by grade
  const { data: games, isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: [API.GAMES_BY_GRADE(gradeId)],
  });

  // Fetch subjects
  const { data: subjects } = useQuery<Subject[]>({
    queryKey: [API.SUBJECTS],
  });

  // Get current grade info
  const grade = grades?.find(g => g.id === gradeId) || 
    GRADES.find(g => g.id === gradeId) || 
    { name: 'Unknown Grade', slug: gradeSlug, color: '#6c757d' };

  // Initialize subject filters
  useEffect(() => {
    if (subjects) {
      const allSubjectsFilter: SubjectFilterType = { id: null, name: 'All Subjects', active: true };
      const subjectFilters: SubjectFilterType[] = subjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        slug: subject.slug,
        active: false
      }));
      
      setActiveFilters([allSubjectsFilter, ...subjectFilters]);
    }
  }, [subjects]);

  // Filter games by selected subjects
  useEffect(() => {
    if (games) {
      const activeSubjectIds = activeFilters
        .filter(filter => filter.active && filter.id !== null)
        .map(filter => filter.id);
      
      // If "All Subjects" is active or no filters are active, show all games
      const isAllActive = activeFilters.find(f => f.id === null)?.active || activeSubjectIds.length === 0;
      
      if (isAllActive) {
        setFilteredGames(games);
      } else {
        // Filter games by selected subjects
        setFilteredGames(games.filter(game => 
          game.subjects?.some(subject => activeSubjectIds.includes(subject.id))
        ));
      }
    }
  }, [games, activeFilters]);

  // Handle filter change
  const handleFilterChange = (filterId: number | null) => {
    setActiveFilters(prevFilters => {
      // If clicking "All Subjects"
      if (filterId === null) {
        return prevFilters.map(filter => ({
          ...filter,
          active: filter.id === null
        }));
      }
      
      // If clicking a subject filter
      return prevFilters.map(filter => {
        if (filter.id === null) {
          // Deactivate "All Subjects"
          return { ...filter, active: false };
        }
        if (filter.id === filterId) {
          // Toggle the clicked filter
          return { ...filter, active: !filter.active };
        }
        return filter;
      });
    });
  };

  // Load more games
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const bgClass = `bg-${grade.slug}`;
  const textClass = `text-${grade.slug}`;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-game text-dark mb-8`}>
          {grade.name} <span className={textClass}>{textClass === 'text-kindergarten' ? 'Games' : 'Games'}</span>
        </h2>
        
        {/* Subject filters */}
        <SubjectFilterComponent 
          filters={activeFilters}
          onFilterChange={handleFilterChange}
          gradeSlug={grade.slug}
        />
        
        {/* Games Grid */}
        {gamesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-full h-72 bg-gray-100 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center">
            <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-heading font-bold text-gray-700 mb-2">No Games Found</h3>
            <p className="text-gray-500">Try selecting different subjects or check back later for new games.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.slice(0, visibleCount).map(game => (
              <GameCard key={game.id} game={game} grades={grades} showGrade={false} />
            ))}
          </div>
        )}
        
        {/* Load more button */}
        {filteredGames.length > visibleCount && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleLoadMore}
              className={`bg-white border-2 border-${grade.slug} ${textClass} hover:${bgClass} hover:text-white font-heading font-bold py-2 px-6 rounded-full text-lg transition`}
            >
              Load More Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesByGrade;
