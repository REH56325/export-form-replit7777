import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TeachersPage = () => {
  return (
    <>
      <Helmet>
        <title>For Teachers | EduFun Games | Educational Games for PreK-6</title>
        <meta 
          name="description" 
          content="Discover how EduFun Games helps teachers enhance classroom learning with curriculum-aligned games, lesson plans, and classroom management tools."
        />
      </Helmet>
      
      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-game text-center mb-12">For <span className="text-primary">Teachers</span></h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Enhance Classroom Learning</h2>
            <p className="text-gray-700 mb-6">
              EduFun Games offers teachers a powerful set of tools to integrate game-based learning into the classroom. 
              Our curriculum-aligned games are designed to complement your teaching, reinforce key concepts, and engage 
              students in active learning.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're teaching in-person, remotely, or in a hybrid environment, our platform provides the resources 
              you need to make learning fun and effective for your students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Classroom Tools</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-users text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Class Management</h3>
                    <p className="text-gray-600">Create class rosters, assign games to specific students or groups, and monitor progress in real-time.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-chart-bar text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Performance Tracking</h3>
                    <p className="text-gray-600">Access detailed analytics on student performance to identify areas of strength and opportunities for growth.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-calendar-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Assignment Scheduler</h3>
                    <p className="text-gray-600">Schedule game assignments in advance to align with your lesson plans and curriculum pacing.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-bullhorn text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Classroom Mode</h3>
                    <p className="text-gray-600">Use our classroom mode for group activities, competitions, and collaborative learning experiences.</p>
                  </div>
                </li>
              </ul>
              <Link href="/teachers/classroom-tools">
                <div className="mt-6 inline-block text-primary font-bold cursor-pointer hover:underline">
                  Explore Classroom Tools →
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Curriculum Resources</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-book text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Lesson Plans</h3>
                    <p className="text-gray-600">Access ready-to-use lesson plans that integrate our games into your curriculum.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-file-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Worksheets & Activities</h3>
                    <p className="text-gray-600">Download supplementary materials to extend learning beyond the games.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-graduation-cap text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Standards Alignment</h3>
                    <p className="text-gray-600">See how our games align with common core and state standards for easy curriculum mapping.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-film text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Instructional Videos</h3>
                    <p className="text-gray-600">Watch tutorials on how to effectively integrate games into your teaching strategies.</p>
                  </div>
                </li>
              </ul>
              <Link href="/teachers/lesson-plans">
                <div className="mt-6 inline-block text-primary font-bold cursor-pointer hover:underline">
                  Browse Curriculum Resources →
                </div>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">School & District Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Teacher</h3>
                <p className="text-3xl font-bold mb-4">Free</p>
                <p className="text-gray-600 mb-4">Basic access for individual teachers</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Up to 30 student accounts</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Basic progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Access to core games</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <div className="w-full py-2 bg-primary text-white text-center rounded font-bold cursor-pointer hover:bg-opacity-90 transition">
                    Sign Up
                  </div>
                </Link>
              </div>
              
              <div className="border border-primary rounded-lg p-6 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Classroom</h3>
                <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal">/month</span></p>
                <p className="text-gray-600 mb-4">Enhanced features for classroom use</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Unlimited student accounts</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Detailed analytics</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>All games & premium content</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Lesson plan library</span>
                  </li>
                </ul>
                <Link href="/teachers/subscribe">
                  <div className="w-full py-2 bg-primary text-white text-center rounded font-bold cursor-pointer hover:bg-opacity-90 transition">
                    Subscribe
                  </div>
                </Link>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">School/District</h3>
                <p className="text-3xl font-bold mb-4">Custom</p>
                <p className="text-gray-600 mb-4">Tailored solutions for schools and districts</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Volume discounts</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Admin dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>PD and training</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>SSO integration</span>
                  </li>
                </ul>
                <Link href="/teachers/contact-sales">
                  <div className="w-full py-2 border border-primary text-primary text-center rounded font-bold cursor-pointer hover:bg-primary hover:text-white transition">
                    Contact Sales
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary bg-opacity-10 rounded-xl p-8 border-2 border-secondary">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Ready to transform your classroom with game-based learning?</h2>
              <Link href="/signup">
                <div className="inline-block bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-full cursor-pointer transition mx-2">
                  Sign Up for Free
                </div>
              </Link>
              <Link href="/teachers/demo">
                <div className="inline-block bg-white border-2 border-secondary text-secondary font-bold py-3 px-6 rounded-full cursor-pointer hover:bg-secondary hover:text-white transition mx-2">
                  Request a Demo
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeachersPage;