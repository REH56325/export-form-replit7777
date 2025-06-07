import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GRADES, API } from "@/lib/constants";
import { Grade } from "@/types";

const GradeNavigation = () => {
  const [location] = useLocation();
  const [activeGrade, setActiveGrade] = useState<string | null>(null);
  
  // Fetch grades from API
  const { data: grades, isLoading } = useQuery<Grade[]>({
    queryKey: [API.GRADES],
  });
  
  useEffect(() => {
    // Set active grade based on URL
    const gradePath = location.match(/\/grade\/([^/]+)/);
    if (gradePath) {
      setActiveGrade(gradePath[1]);
    } else {
      setActiveGrade(null);
    }
  }, [location]);
  
  // Use fallback data if API is loading
  const gradeData = grades || GRADES;
  
  return (
    <div className="bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex overflow-x-auto space-x-2 py-2 no-scrollbar">
          {gradeData.map((grade) => {
            const isActive = activeGrade === grade.slug;
            const bgClass = `bg-${grade.slug}`;
            return (
              <div key={grade.id} className="flex-shrink-0">
                <Link href={`/grade/${grade.slug}`}>
                  <div className={`grade-tab ${isActive ? 'active' : ''} cursor-pointer flex flex-col items-center ${isActive ? bgClass : 'bg-white text-dark hover:' + bgClass + ' hover:text-white'} ${isActive ? 'text-white' : ''} rounded-lg py-2 px-4 transition duration-300`}>
                    <span className="text-xl">
                      <i className={`fas fa-${grade.icon}`}></i>
                    </span>
                    <span className="font-heading font-bold">{grade.name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GradeNavigation;
