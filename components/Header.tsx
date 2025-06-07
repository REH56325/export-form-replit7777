import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useUser } from "@/contexts/UserContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGradeMenuOpen, setIsGradeMenuOpen] = useState(false);
  const [activeGrade, setActiveGrade] = useState<string | null>(null);
  const { user, login, logout } = useUser();
  const [location] = useLocation();

  // Grade categories with icons
  const grades = [
    { name: "PreK", slug: "prek", icon: "★" },
    { name: "Kindergarten", slug: "kindergarten", icon: "🍎" },
    { name: "1st Grade", slug: "grade-1", icon: "✏️" },
    { name: "2nd Grade", slug: "grade-2", icon: "📚" },
    { name: "3rd Grade", slug: "grade-3", icon: "📋" },
    { name: "4th Grade", slug: "grade-4", icon: "🌎" },
    { name: "5th Grade", slug: "grade-5", icon: "⚙️" },
    { name: "6th Grade", slug: "grade-6", icon: "🔍" }
  ];

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Set active grade based on URL
  useEffect(() => {
    const currentGrade = grades.find(grade => location.includes(`/grade/${grade.slug}`));
    setActiveGrade(currentGrade ? currentGrade.slug : null);
  }, [location]);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl font-game font-bold">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-game text-dark">EduFun <span className="text-primary">Games</span></h1>
                <p className="text-xs text-gray-500">Learning through play!</p>
              </div>
            </div>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <div className={`font-heading font-bold ${location === "/" ? "text-primary" : "text-dark"} hover:text-primary transition cursor-pointer relative group`}>
                Home
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${location === "/" ? "w-full" : "group-hover:w-full"}`}></span>
              </div>
            </Link>
            
            {/* Grade Dropdown */}
            <div className="relative group">
              <div 
                className="font-heading font-bold text-dark hover:text-primary transition cursor-pointer flex items-center"
                onClick={() => setIsGradeMenuOpen(!isGradeMenuOpen)}
              >
                Games by Grade
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Grade Dropdown Menu - Desktop */}
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-20 transform origin-top scale-0 group-hover:scale-100 transition duration-200 ease-in-out border border-gray-100">
                <div className="py-2 grid grid-cols-1 gap-1">
                  {grades.map((grade) => (
                    <Link key={grade.slug} href={`/grade/${grade.slug}`}>
                      <div className={`px-4 py-3 ${activeGrade === grade.slug ? 'bg-gray-50 border-l-4 border-primary' : ''} hover:bg-gray-50 transition cursor-pointer flex items-center`}>
                        <span className="w-8 h-8 flex items-center justify-center mr-3 rounded-full text-lg">
                          {grade.icon}
                        </span>
                        <span className="font-medium text-dark">{grade.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/about">
              <div className={`font-heading font-bold ${location === "/about" ? "text-primary" : "text-dark"} hover:text-primary transition cursor-pointer relative group`}>
                About
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${location === "/about" ? "w-full" : "group-hover:w-full"}`}></span>
              </div>
            </Link>
            
            <Link href="/parents">
              <div className={`font-heading font-bold ${location === "/parents" ? "text-primary" : "text-dark"} hover:text-primary transition cursor-pointer relative group`}>
                Parents
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${location === "/parents" ? "w-full" : "group-hover:w-full"}`}></span>
              </div>
            </Link>
            
            <Link href="/teachers">
              <div className={`font-heading font-bold ${location === "/teachers" ? "text-primary" : "text-dark"} hover:text-primary transition cursor-pointer relative group`}>
                Teachers
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${location === "/teachers" ? "w-full" : "group-hover:w-full"}`}></span>
              </div>
            </Link>
          </nav>
          
          {/* User Login */}
          <div className="flex items-center space-x-3">
            {!user ? (
              <>
                <button 
                  className="hidden md:block bg-secondary hover:bg-secondary-dark text-white font-heading font-bold py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
                  onClick={() => login({ id: 1, username: "demo_user", displayName: "Demo User" })}
                >
                  Sign Up Free
                </button>
                <button 
                  className="bg-primary hover:bg-primary-dark text-white font-heading font-bold py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
                  onClick={() => login({ id: 1, username: "demo_user", displayName: "Demo User" })}
                >
                  Log In
                </button>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {user.displayName?.charAt(0) || user.username.charAt(0)}
                  </div>
                  <span className="font-heading">Hi, {user.displayName || user.username}!</span>
                </div>
                <button 
                  className="bg-primary hover:bg-primary-dark text-white font-heading font-bold py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center text-xl text-dark bg-gray-100 rounded-full hover:bg-gray-200 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link href="/">
                <div className={`font-heading font-bold ${location === "/" ? "text-primary" : "text-dark"} hover:text-primary transition cursor-pointer px-2 py-2 rounded-md ${location === "/" ? "bg-blue-50" : ""}`}>
                  🏠 Home
                </div>
              </Link>
              
              {/* Grade dropdown - Mobile */}
              <div>
                <div 
                  className={`font-heading font-bold text-dark hover:text-primary transition cursor-pointer flex items-center justify-between px-2 py-2 rounded-md ${isGradeMenuOpen ? "bg-blue-50" : ""}`}
                  onClick={() => setIsGradeMenuOpen(!isGradeMenuOpen)}
                >
                  <span>🎮 Games by Grade</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform duration-200 ${isGradeMenuOpen ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isGradeMenuOpen && (
                  <div className="mt-2 space-y-1 bg-gray-50 rounded-md p-2">
                    {grades.map((grade) => (
                      <Link key={grade.slug} href={`/grade/${grade.slug}`}>
                        <div className={`font-heading text-dark hover:text-primary transition cursor-pointer px-3 py-2 rounded-md flex items-center ${activeGrade === grade.slug ? 'bg-white shadow-sm' : 'hover:bg-white'}`}>
                          <span className="mr-3">{grade.icon}</span>
                          {grade.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link href="/about">
                <div className={`font-heading font-bold ${location === "/about" ? "text-primary bg-blue-50" : "text-dark"} hover:text-primary transition cursor-pointer px-2 py-2 rounded-md`}>
                  ℹ️ About
                </div>
              </Link>
              
              <Link href="/parents">
                <div className={`font-heading font-bold ${location === "/parents" ? "text-primary bg-blue-50" : "text-dark"} hover:text-primary transition cursor-pointer px-2 py-2 rounded-md`}>
                  👪 Parents
                </div>
              </Link>
              
              <Link href="/teachers">
                <div className={`font-heading font-bold ${location === "/teachers" ? "text-primary bg-blue-50" : "text-dark"} hover:text-primary transition cursor-pointer px-2 py-2 rounded-md`}>
                  🧑‍🏫 Teachers
                </div>
              </Link>
              
              {!user && (
                <button 
                  className="bg-gradient-to-r from-secondary to-secondary-dark hover:bg-opacity-90 text-white font-heading font-bold py-3 px-4 rounded-md transition w-full mt-4 shadow-md"
                  onClick={() => login({ id: 1, username: "demo_user", displayName: "Demo User" })}
                >
                  ✨ Sign Up Free
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
      
      {/* Main Grade Navigation Bar (shown on all screens) */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto">
          <div className="flex justify-between items-center overflow-x-auto py-2 px-4">
            {grades.map((grade) => (
              <Link key={grade.slug} href={`/grade/${grade.slug}`}>
                <div className="flex flex-col items-center px-3 py-1 transition-all duration-200 cursor-pointer group">
                  <div className={`text-xl mb-1 ${activeGrade === grade.slug ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}`}>
                    {grade.icon}
                  </div>
                  <div className={`text-sm whitespace-nowrap ${activeGrade === grade.slug ? 'font-medium text-primary' : 'text-gray-600 group-hover:text-primary'}`}>
                    {grade.name}
                  </div>
                  {activeGrade === grade.slug && (
                    <div className="h-0.5 w-full bg-primary mt-1 rounded-full"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
