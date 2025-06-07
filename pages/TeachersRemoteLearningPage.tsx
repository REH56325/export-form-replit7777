import { Helmet } from 'react-helmet';

const TeachersRemoteLearningPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Remote Learning Resources | Educational Gaming</title>
        <meta name="description" content="Discover tools and strategies for effective remote learning using educational games for PreK-6 students." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Remote Learning Resources</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade2">Supporting Education from Anywhere</h2>
          
          <p className="mb-6">
            Our educational gaming platform is designed to support effective remote learning, 
            whether as a supplement to in-person instruction or as a core component of distance education.
            These resources will help you implement our platform in remote and hybrid learning environments.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Accessible Learning</h3>
              <p className="text-gray-700">
                Our platform works on any device with an internet connection, making it accessible for all students regardless of their technology situation.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Self-Directed Learning</h3>
              <p className="text-gray-700">
                Games that guide students through progressive learning paths, allowing them to work independently while you monitor their progress.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Remote Assessment</h3>
              <p className="text-gray-700">
                Built-in assessment tools that automatically track student progress and provide you with detailed performance data.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade4 text-white">
              <h3 className="text-xl font-bold mb-2">Synchronous Learning Strategies</h3>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Strategies for using our platform during live virtual classes:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Screen Sharing Demonstrations</h4>
                    <p className="text-gray-600 text-sm">Use screen sharing in your video conferencing software to demonstrate games before students play independently.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Virtual Competitions</h4>
                    <p className="text-gray-600 text-sm">Create friendly competitions where students can see each other's progress in real-time through our leaderboard feature.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Breakout Room Activities</h4>
                    <p className="text-gray-600 text-sm">Assign different games to small groups in breakout rooms, with students taking turns playing and observing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Guided Practice</h4>
                    <p className="text-gray-600 text-sm">Use the "teacher mode" to walk through games step-by-step with the whole class before independent play.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade5 text-white">
              <h3 className="text-xl font-bold mb-2">Asynchronous Learning Strategies</h3>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Strategies for using our platform for independent learning:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Custom Assignments</h4>
                    <p className="text-gray-600 text-sm">Create personalized game assignments for students to complete on their own schedule with clear completion criteria.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Learning Pathways</h4>
                    <p className="text-gray-600 text-sm">Set up sequential game paths that unlock as students master prerequisite skills, guiding their independent learning journey.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Video Tutorials</h4>
                    <p className="text-gray-600 text-sm">Provide students with access to our library of instructional videos that explain concepts and demonstrate gameplay.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade5 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Progress Checkpoints</h4>
                    <p className="text-gray-600 text-sm">Schedule automatic assessments at key points to verify understanding before students advance to new content.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade3">Parent Partnership Resources</h2>
          
          <p className="mb-6">
            Tools to help you build strong partnerships with parents during remote learning:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Communication Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-grade3 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Parent Dashboards</h4>
                    <p className="text-gray-600 text-sm">Share access to specialized parent dashboards that show their child's activity and progress.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade3 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-gray-600 text-sm">Schedule automated reports to keep parents informed about assignments and achievement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade3 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Parent Guides</h4>
                    <p className="text-gray-600 text-sm">Downloadable guides that explain how parents can support learning with our platform.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Support Materials</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-grade3 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Tech Setup Guides</h4>
                    <p className="text-gray-600 text-sm">Easy-to-follow instructions for getting students set up on various devices.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade3 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">At-Home Activities</h4>
                    <p className="text-gray-600 text-sm">Supplementary offline activities that complement the online games.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade3 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">FAQ Resources</h4>
                    <p className="text-gray-600 text-sm">Answers to common questions parents may have about remote learning with our platform.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Remote Learning Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                  M
                </div>
                <div>
                  <h3 className="font-medium">Ms. Martinez</h3>
                  <p className="text-sm text-gray-600">3rd Grade Teacher</p>
                </div>
              </div>
              <p className="text-gray-700">
                "When our school went remote, I was worried about keeping my students engaged. The interactive games kept them excited about learning math, and the automated progress tracking saved me hours of work."
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-grade3 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                  T
                </div>
                <div>
                  <h3 className="font-medium">Mr. Thompson</h3>
                  <p className="text-sm text-gray-600">5th Grade Teacher</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The assignment feature was a game-changer for my class. I could differentiate instruction by assigning different games to students based on their needs, and they could complete them at their own pace."
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-grade5 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                  J
                </div>
                <div>
                  <h3 className="font-medium">Ms. Johnson</h3>
                  <p className="text-sm text-gray-600">School Principal</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Implementing this platform school-wide gave us consistency in our remote learning program. Teachers, students, and parents all appreciated having one unified system that was engaging and easy to use."
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Ready to Enhance Your Remote Learning?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our team is here to help you implement effective remote learning strategies with our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/teachers/school-subscriptions" 
              className="py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition"
            >
              Get Started Today
            </a>
            <a 
              href="/contact" 
              className="py-3 px-6 bg-white text-primary font-medium rounded-md border border-primary hover:bg-gray-50 transition"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersRemoteLearningPage;