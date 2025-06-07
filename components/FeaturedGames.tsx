import { useState, useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/constants";
import { Game, Grade } from "@/types";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";

const FeaturedGames = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Fetch featured games from API
  const { data: featuredGames, isLoading, error } = useQuery<Game[]>({
    queryKey: [API.FEATURED_GAMES],
  });
  
  // Fetch grades for grade info
  const { data: grades } = useQuery<Grade[]>({
    queryKey: [API.GRADES],
  });
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-game text-dark">Featured <span className="text-primary">Games</span></h2>
          </div>
          <div className="flex space-x-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-64 h-72 bg-gray-100 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !featuredGames) {
    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-game text-dark">Featured <span className="text-primary">Games</span></h2>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
            Unable to load featured games. Please try again later.
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-game text-dark">Featured <span className="text-primary">Games</span></h2>
          <Link href="/games">
            <div className="text-secondary font-heading font-bold hover:underline flex items-center cursor-pointer">
              View All Games <i className="fas fa-arrow-right ml-2"></i>
            </div>
          </Link>
        </div>
        
        {/* Featured Games Carousel */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 py-4 no-scrollbar"
          >
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} grades={grades} />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full w-10 h-10 shadow-lg flex items-center justify-center text-dark hover:text-primary transition z-10"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full w-10 h-10 shadow-lg flex items-center justify-center text-dark hover:text-primary transition z-10"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGames;
