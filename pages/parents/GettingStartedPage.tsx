import { Helmet } from "react-helmet";
import { Link } from "wouter";

const GettingStartedPage = () => {
  return (
    <>
      <Helmet>
        <title>Getting Started | For Parents | EduFun Games</title>
        <meta 
          name="description" 
          content="Learn how to get started with EduFun Games for your child's educational journey." 
        />
      </Helmet>

      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary bg-opacity-10 rounded-xl p-8 mb-8">
            <h1 className="text-3xl font-bold mb-4">Getting Started with EduFun Games</h1>
            <p className="text-lg">A step-by-step guide to help your child begin their learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h2 className="text-xl font-bold mb-3">Create an Account</h2>
                <p className="text-gray-600 mb-4">
                  Sign up for a free account to access our educational games and track your child's progress.
                </p>
                <Link href="/signup">
                  <div className="inline-block text-primary font-medium hover:underline cursor-pointer">
                    Create an account →
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h2 className="text-xl font-bold mb-3">Set Up Child Profile</h2>
                <p className="text-gray-600 mb-4">
                  Add your child's details and select their grade level to personalize their learning experience.
                </p>
                <Link href="/signup">
                  <div className="inline-block text-primary font-medium hover:underline cursor-pointer">
                    Learn how to add profiles →
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h2 className="text-xl font-bold mb-3">Start Playing and Learning</h2>
                <p className="text-gray-600 mb-4">
                  Browse games by grade or subject and start your child on their educational journey!
                </p>
                <Link href="/grade/prek">
                  <div className="inline-block text-primary font-medium hover:underline cursor-pointer">
                    Browse games →
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Finding the Right Games</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-primary text-2xl mr-4">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">By Grade Level</h3>
                  <p className="text-gray-700 mb-2">
                    Find age-appropriate games designed specifically for your child's grade level, from PreK to 6th grade.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/grade/prek">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        PreK
                      </div>
                    </Link>
                    <Link href="/grade/kindergarten">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        Kindergarten
                      </div>
                    </Link>
                    <Link href="/grade/grade-1">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        1st Grade
                      </div>
                    </Link>
                    <Link href="/grade/grade-2">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        2nd Grade
                      </div>
                    </Link>
                    <Link href="/grade/grade-3">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        3rd Grade
                      </div>
                    </Link>
                    <Link href="/grade/grade-4">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        4th Grade
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 text-primary text-2xl mr-4">
                  <i className="fas fa-book"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">By Subject</h3>
                  <p className="text-gray-700 mb-2">
                    Focus on specific subjects like math, reading, science, and more to target areas for improvement or special interests.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/subjects/math">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        Math
                      </div>
                    </Link>
                    <Link href="/subjects/reading">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        Reading
                      </div>
                    </Link>
                    <Link href="/subjects/science">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        Science
                      </div>
                    </Link>
                    <Link href="/subjects/social-studies">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        Social Studies
                      </div>
                    </Link>
                    <Link href="/subjects/art">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition">
                        Art
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Setting Up for Success</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Creating a Learning Schedule</h3>
                <p className="text-gray-700 mb-4">
                  Establish a regular time for learning with EduFun Games. Consistency helps children develop good learning habits and look forward to their game time.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Set aside 15-30 minutes daily for younger children</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Create a distraction-free environment</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Mix different subjects to keep learning fresh</div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Parents' Role in Game-Based Learning</h3>
                <p className="text-gray-700 mb-4">
                  Your involvement can greatly enhance your child's learning experience with educational games.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Ask questions about what they're learning</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Celebrate achievements and progress</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Connect game concepts to real-world situations</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Review progress reports to identify strengths and areas for improvement</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GettingStartedPage;