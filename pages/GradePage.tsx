import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { API, GRADES } from "@/lib/constants";
import { Grade } from "@/types";
import GradeNavigation from "@/components/GradeNavigation";
import GamesByGrade from "@/components/GamesByGrade";
import CallToAction from "@/components/CallToAction";

const GradePage = () => {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  
  // Fetch grades
  const { data: grades, isLoading } = useQuery<Grade[]>({
    queryKey: [API.GRADES],
  });
  
  // Find the current grade by slug
  const currentGrade = grades?.find(grade => grade.slug === slug) || 
    GRADES.find(grade => grade.slug === slug);
  
  // Redirect if invalid grade slug
  useEffect(() => {
    if (!isLoading && !currentGrade) {
      setLocation("/not-found");
    }
  }, [isLoading, currentGrade, setLocation]);
  
  if (isLoading || !currentGrade) {
    return (
      <>
        <GradeNavigation />
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 w-1/3 rounded mb-6"></div>
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-10 bg-gray-200 w-24 rounded-full"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{currentGrade.name} Games - EduFun Games | Educational Games for Kids</title>
        <meta name="description" content={`Fun and educational games for ${currentGrade.name} students. Practice math, reading, science and more!`} />
        <meta property="og:title" content={`${currentGrade.name} Games - EduFun Games`} />
        <meta property="og:description" content={`Fun and educational games for ${currentGrade.name} students. Practice math, reading, science and more!`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://edufungames.com/grade/${currentGrade.slug}`} />
      </Helmet>
      
      <GradeNavigation />
      <GamesByGrade gradeId={currentGrade.id} gradeSlug={currentGrade.slug} />
      <CallToAction />
    </>
  );
};

export default GradePage;
