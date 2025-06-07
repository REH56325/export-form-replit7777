import { Helmet } from "react-helmet";
import { Link } from "wouter";

const ClassroomToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>Classroom Tools | For Teachers | EduFun Games</title>
        <meta 
          name="description" 
          content="Discover powerful classroom tools to enhance learning with EduFun Games. Manage student accounts, track progress, and create custom assignments." 
        />
      </Helmet>

      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-xl p-8 mb-12">
            <h1 className="text-3xl font-bold mb-4">Classroom Tools</h1>
            <p className="text-lg mb-6">Powerful tools designed to help teachers integrate game-based learning into their classrooms efficiently</p>
            <Link href="/signup">
              <div className="inline-block bg-white text-secondary font-bold py-3 px-6 rounded-full cursor-pointer hover:bg-gray-100 transition">
                Try For Free
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-blue-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-500 text-xl">
                  <i className="fas fa-users"></i>
                </div>
                <h2 className="text-xl font-bold mb-3">Student Management</h2>
                <p className="text-gray-600 mb-4">
                  Create and manage student accounts with ease. Group students by class, assign custom learning paths, and monitor individual progress.
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Bulk import students</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Create custom groups</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Manage access permissions</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-purple-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-500 text-xl">
                  <i className="fas fa-tasks"></i>
                </div>
                <h2 className="text-xl font-bold mb-3">Assignment Creator</h2>
                <p className="text-gray-600 mb-4">
                  Create custom assignments with specific games, difficulty levels, and learning objectives. Schedule assignments in advance and set due dates.
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Custom game playlists</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Scheduled assignments</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Adjustable difficulty</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500 text-xl">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h2 className="text-xl font-bold mb-3">Progress Tracking</h2>
                <p className="text-gray-600 mb-4">
                  Monitor student progress with detailed analytics dashboards. Identify areas of strength and opportunities for additional support.
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Real-time progress updates</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Downloadable reports</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div>Individual and class analytics</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8">Classroom Mode Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-500">
                    <i className="fas fa-desktop"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Interactive Whiteboard Mode</h3>
                    <p className="text-gray-600">
                      Display games on your classroom interactive whiteboard for whole-class participation. 
                      Control the game from your teacher dashboard while students participate from their seats.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-500">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Classroom Competitions</h3>
                    <p className="text-gray-600">
                      Create friendly competitions between students or teams. 
                      Our leaderboard system encourages healthy competition while learning.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-500">
                    <i className="fas fa-random"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Random Student Selector</h3>
                    <p className="text-gray-600">
                      Randomly select students to participate in classroom activities.
                      A fair way to ensure all students get a chance to engage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-500">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Timer and Classroom Management</h3>
                    <p className="text-gray-600">
                      Built-in timers help you manage classroom activities efficiently.
                      Set time limits for games, transitions, and other activities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-500">
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quick Assessments</h3>
                    <p className="text-gray-600">
                      Create quick formative assessments based on our game content.
                      Get immediate feedback on student understanding of concepts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 text-blue-500">
                    <i className="fas fa-volume-mute"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Volume Control</h3>
                    <p className="text-gray-600">
                      Centralized control of game volume across all student devices.
                      Mute all, reduce volume, or adjust settings for individual students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Integration with Learning Management Systems</h2>
            <p className="text-gray-700 mb-6">
              EduFun Games integrates seamlessly with popular learning management systems to make your classroom workflow even smoother.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="border rounded-lg p-4 text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src="https://via.placeholder.com/80x40" alt="Google Classroom" className="max-h-full" />
                </div>
                <p className="font-medium">Google Classroom</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src="https://via.placeholder.com/80x40" alt="Canvas" className="max-h-full" />
                </div>
                <p className="font-medium">Canvas</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src="https://via.placeholder.com/80x40" alt="Schoology" className="max-h-full" />
                </div>
                <p className="font-medium">Schoology</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src="https://via.placeholder.com/80x40" alt="ClassDojo" className="max-h-full" />
                </div>
                <p className="font-medium">ClassDojo</p>
              </div>
            </div>
            
            <p className="text-gray-700">
              Our team is constantly working to add more integrations. If you don't see your LMS listed, please contact us.
            </p>
          </div>

          <div className="bg-secondary bg-opacity-10 rounded-xl p-8 border-2 border-secondary border-opacity-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to transform your classroom?</h2>
              <p className="text-gray-700 mb-6">Join thousands of teachers who are using EduFun Games to create engaging, effective learning experiences.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <div className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-full cursor-pointer transition">
                    Try Classroom Tools Free
                  </div>
                </Link>
                <Link href="/teachers/demo">
                  <div className="bg-white border-2 border-secondary text-secondary font-bold py-3 px-6 rounded-full cursor-pointer hover:bg-secondary hover:text-white transition">
                    Request a Demo
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassroomToolsPage;