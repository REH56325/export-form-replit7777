import { Helmet } from 'react-helmet';

const TeachersClassroomToolsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Classroom Tools for Teachers | Educational Gaming</title>
        <meta name="description" content="Discover digital tools and resources to enhance your classroom teaching with our educational gaming platform." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Classroom Tools</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade2">Digital Tools for Modern Classrooms</h2>
          
          <p className="mb-6">
            Our educational platform offers a comprehensive set of digital tools designed specifically for classroom use. 
            These tools help you engage students, track progress, differentiate instruction, and simplify classroom management.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Classroom Dashboard</h3>
              <p className="text-gray-700">
                Manage your virtual classroom with an intuitive dashboard. Add students, create groups, and monitor real-time activity.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Progress Tracking</h3>
              <p className="text-gray-700">
                Access detailed analytics on student performance across all games and subjects with visual reports.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Assignment Creator</h3>
              <p className="text-gray-700">
                Create custom game assignments for individual students or groups based on learning needs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade4 text-white">
              <h3 className="text-xl font-bold mb-2">Whole Class Activities</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Interactive Whiteboard Games</h4>
                    <p className="text-gray-600 text-sm">Engage your entire class with games designed for interactive whiteboards and front-of-class displays.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Class Tournaments</h4>
                    <p className="text-gray-600 text-sm">Create friendly competition with class-wide game tournaments that track team scores.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Teacher-Led Demonstrations</h4>
                    <p className="text-gray-600 text-sm">Use our teacher mode to walk through concepts with the whole class before individual practice.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Class Polling</h4>
                    <p className="text-gray-600 text-sm">Gather feedback and check understanding with interactive polls and quizzes.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade5 text-white">
              <h3 className="text-xl font-bold mb-2">Individual Learning</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Personalized Learning Paths</h4>
                    <p className="text-gray-600 text-sm">Automatically assign appropriate content based on individual student performance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Adaptive Difficulty</h4>
                    <p className="text-gray-600 text-sm">Games that adjust difficulty based on student performance to provide the right level of challenge.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Skill Gap Identification</h4>
                    <p className="text-gray-600 text-sm">Identify specific skills that need additional support with detailed analytics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Learning Accommodations</h4>
                    <p className="text-gray-600 text-sm">Customize game settings for students with different learning needs and preferences.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade3">Assessment Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Formative Assessment</h3>
              <p className="mb-4">Our platform seamlessly integrates assessment into gameplay, allowing you to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Track real-time progress during learning activities</li>
                <li>Identify misconceptions as they happen</li>
                <li>Provide immediate feedback to students</li>
                <li>Adjust instruction based on live data</li>
                <li>Monitor engagement and time-on-task</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Summative Assessment</h3>
              <p className="mb-4">Create comprehensive assessments to measure learning outcomes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate custom assessment games for any subject</li>
                <li>Set time limits and specific parameters</li>
                <li>Track mastery of standards and skills</li>
                <li>View detailed reports by student, class, or standard</li>
                <li>Export data for report cards or parent conferences</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Ready to Transform Your Classroom?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of teachers who use our platform to create engaging, effective learning experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/teachers/school-subscriptions" 
              className="py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition"
            >
              View School Plans
            </a>
            <a 
              href="/signup" 
              className="py-3 px-6 bg-white text-primary font-medium rounded-md border border-primary hover:bg-gray-50 transition"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersClassroomToolsPage;