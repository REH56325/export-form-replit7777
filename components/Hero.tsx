import { Link } from "wouter";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left text-white mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-game mb-4">Learning is Fun with EduFun Games!</h2>
            <p className="text-lg md:text-xl font-heading mb-6">Over 40 interactive educational games for PreK through 6th grade.</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/grade/prek">
                <div className="bg-accent hover:bg-opacity-80 text-dark font-heading font-bold py-3 px-6 rounded-full text-lg transition transform hover:scale-105 text-center cursor-pointer">
                  Start Playing Now!
                </div>
              </Link>
              <Link href="/teachers">
                <div className="bg-white hover:bg-opacity-80 text-primary font-heading font-bold py-3 px-6 rounded-full text-lg transition transform hover:scale-105 text-center cursor-pointer">
                  For Teachers
                </div>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative float-animation">
            {/* Hero image - kids playing educational games */}
            <div className="rounded-xl shadow-2xl bg-white p-1">
              <svg className="w-full h-auto" viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="700" height="500" fill="#FFE0E5" rx="20" />
                <circle cx="200" cy="150" r="80" fill="#FFD166" />
                <circle cx="500" cy="350" r="100" fill="#4ECDC4" opacity="0.7" />
                <rect x="150" y="200" width="400" height="200" rx="20" fill="#FFFFFF" />
                <rect x="180" y="230" width="150" height="100" rx="10" fill="#FF6B6B" />
                <rect x="370" y="230" width="150" height="100" rx="10" fill="#8A9AF8" />
                <circle cx="255" cy="370" r="20" fill="#FFD166" />
                <circle cx="330" cy="370" r="20" fill="#4ECDC4" />
                <circle cx="405" cy="370" r="20" fill="#FF6B6B" />
                <circle cx="480" cy="370" r="20" fill="#8A9AF8" />
                {/* Stylized children silhouettes */}
                <path d="M180,180 Q200,130 230,180 Z" fill="#333333" />
                <path d="M230,180 Q250,140 270,180 Z" fill="#333333" />
                <path d="M440,130 Q460,80 490,130 Z" fill="#333333" />
                <path d="M490,130 Q510,90 530,130 Z" fill="#333333" />
              </svg>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl text-dark float-animation" style={{ animationDelay: "0.5s" }}>
              <i className="fas fa-puzzle-piece"></i>
            </div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl text-white float-animation" style={{ animationDelay: "1s" }}>
              <i className="fas fa-brain"></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="hidden md:block absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
      <div className="hidden md:block absolute bottom-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
      <div className="hidden md:block absolute top-40 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
    </div>
  );
};

export default Hero;
