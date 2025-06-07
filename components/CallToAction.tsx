import { Link } from "wouter";
import { useUser } from "@/contexts/UserContext";

const CallToAction = () => {
  const { user, login } = useUser();

  const handleSignup = () => {
    if (!user) {
      login({ id: 1, username: "demo_user", displayName: "Demo User" });
    }
  };

  return (
    <div className="py-16 bg-gradient-to-r from-secondary to-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-game text-white mb-6">Ready to Make Learning Fun?</h2>
        <p className="text-lg md:text-xl font-heading text-white opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of parents and teachers who trust our educational games to help children learn while having fun!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={handleSignup}
            className="bg-accent hover:bg-opacity-80 text-dark font-heading font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105"
          >
            Sign Up Free
          </button>
          <Link href="/teachers">
            <div className="bg-white hover:bg-opacity-80 text-primary font-heading font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 cursor-pointer">
              For Teachers
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
