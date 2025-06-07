import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { API } from "@/lib/constants";
import { Game, Grade } from "@/types";
import GameDetail from "@/components/GameDetail";
import GradeNavigation from "@/components/GradeNavigation";
import CallToAction from "@/components/CallToAction";

const GameDetailPage = () => {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  
  // Fetch game data
  const { 
    data: game, 
    isLoading: gameLoading, 
    error: gameError 
  } = useQuery<Game>({
    queryKey: [API.GAME_DETAIL(slug || '')],
  });
  
  // Fetch grades for reference
  const { data: grades } = useQuery<Grade[]>({
    queryKey: [API.GRADES],
  });
  
  // Handle errors or missing data
  useEffect(() => {
    if (gameError || (!gameLoading && !game)) {
      // Redirect to 404 page if game not found
      setLocation("/not-found");
    }
  }, [gameError, gameLoading, game, setLocation]);
  
  if (gameLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-16 w-2/3 bg-gray-200 rounded mb-8"></div>
            <div className="bg-gray-200 w-full aspect-video rounded-lg mb-8"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!game) {
    return null; // Will redirect to 404 via useEffect
  }
  
  return (
    <>
      <Helmet>
        <title>{game.title} - EduFun Games | Educational Games for Kids</title>
        <meta name="description" content={game.description} />
        <meta property="og:title" content={`${game.title} - EduFun Games`} />
        <meta property="og:description" content={game.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://edufungames.com/game/${game.slug}`} />
      </Helmet>
      
      <GradeNavigation />
      <GameDetail game={game} grades={grades} />
      <CallToAction />
    </>
  );
};

export default GameDetailPage;
