import { Helmet } from "react-helmet";
import { Link } from "wouter";

const ParentsPage = () => {
  return (
    <>
      <Helmet>
        <title>For Parents | EduFun Games | Educational Games for PreK-6</title>
        <meta 
          name="description" 
          content="Discover how EduFun Games helps parents support their children's learning with fun, educational games aligned with school curriculum."
        />
      </Helmet>
      
      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-game text-center mb-12">For <span className="text-primary">Parents</span></h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Supporting Your Child's Learning Journey</h2>
            <p className="text-gray-700 mb-6">
              As a parent, you play a crucial role in your child's education. EduFun Games provides engaging, 
              curriculum-aligned games that make learning fun while reinforcing the skills your child is 
              developing at school.
            </p>
            <p className="text-gray-700 mb-6">
              Our games are designed to support learning at home in a way that feels like play rather than work. 
              With EduFun Games, you can help your child practice essential skills, explore new concepts, and 
              build confidence in their abilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-medal text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your child's learning journey with detailed progress tracking and achievement reports.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-book-reader text-green-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Curriculum Aligned</h3>
              <p className="text-gray-600">
                Our games follow educational standards to complement what your child is learning in school.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-purple-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Safe Environment</h3>
              <p className="text-gray-600">
                A secure, ad-free platform with parental controls to create a safe learning environment.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">How to Get Started</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg">Create a Family Account</h3>
                  <p className="text-gray-700">Sign up for a free account to access our educational games and track your child's progress.</p>
                  <Link href="/signup">
                    <div className="inline-block mt-2 text-primary font-bold hover:underline cursor-pointer">Create an Account →</div>
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg">Set Up Child Profiles</h3>
                  <p className="text-gray-700">Create individual profiles for each child to personalize their learning experience and track their progress separately.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg">Explore Games by Grade and Subject</h3>
                  <p className="text-gray-700">Find games that match your child's grade level and the subjects they're learning in school.</p>
                  <Link href="/grade/prek">
                    <div className="inline-block mt-2 text-primary font-bold hover:underline cursor-pointer">Browse Games →</div>
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-lg">Monitor Learning Progress</h3>
                  <p className="text-gray-700">Review your child's achievements, time spent on different subjects, and areas where they might need additional support.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary bg-opacity-10 rounded-xl p-8 border-2 border-primary">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-bold mb-2">Ready to make learning fun?</h2>
                <p className="text-gray-700">Join thousands of parents supporting their children's education with EduFun Games.</p>
              </div>
              <Link href="/signup">
                <div className="bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-full cursor-pointer transition">
                  Sign Up for Free
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentsPage;