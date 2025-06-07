import { Helmet } from "react-helmet";
import { Link } from "wouter";

const LessonPlansPage = () => {
  return (
    <>
      <Helmet>
        <title>Lesson Plans | For Teachers | EduFun Games</title>
        <meta 
          name="description" 
          content="Access curriculum-aligned lesson plans that incorporate EduFun Games to enhance student learning and engagement." 
        />
      </Helmet>

      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 mb-12">
            <h1 className="text-3xl font-bold mb-4">Curriculum-Aligned Lesson Plans</h1>
            <p className="text-lg mb-6">Ready-to-use lesson plans designed to integrate educational games into your teaching</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <div className="inline-block bg-white text-blue-600 font-bold py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition">
                  Browse All Lesson Plans
                </div>
              </Link>
              <Link href="/signup">
                <div className="inline-block bg-transparent border-2 border-white text-white font-bold py-2 px-4 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition">
                  Try Premium Free
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                <h2 className="text-2xl font-bold mb-4">Find the Perfect Lesson Plan</h2>
                <p className="text-gray-700 mb-4">
                  Our lesson plans are created by experienced educators and aligned with common standards
                  to help you integrate educational games effectively in your classroom.
                </p>
                <p className="text-gray-700">
                  Use the filters to find lesson plans for your grade level and subject.
                </p>
              </div>
              
              <div className="md:w-2/3 bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                      <option>All Grades</option>
                      <option>PreK</option>
                      <option>Kindergarten</option>
                      <option>1st Grade</option>
                      <option>2nd Grade</option>
                      <option>3rd Grade</option>
                      <option>4th Grade</option>
                      <option>5th Grade</option>
                      <option>6th Grade</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                      <option>All Subjects</option>
                      <option>Math</option>
                      <option>Reading</option>
                      <option>Science</option>
                      <option>Social Studies</option>
                      <option>Art</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Learning Standard</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                      <option>All Standards</option>
                      <option>Common Core</option>
                      <option>NGSS</option>
                      <option>State Standards</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search lesson plans..." 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-6">Featured Lesson Plans</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-3 bg-blue-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Math</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">3rd Grade</span>
                      </div>
                      <span className="text-xs text-gray-500">20 min</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Multiplication with Arrays</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Students use the Array Adventure game to visualize multiplication as repeated addition using arrays.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-align-left mr-1"></i> CCSS.MATH.CONTENT.3.OA.A.1
                      </span>
                      <Link href="/signup">
                        <div className="text-primary text-sm font-medium hover:underline cursor-pointer">
                          View Plan →
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-3 bg-purple-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Reading</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">1st Grade</span>
                      </div>
                      <span className="text-xs text-gray-500">30 min</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Phonics Fun with Word Builders</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Students practice phonemic awareness by building words in the Word Wizards game, then creating their own word lists.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-align-left mr-1"></i> CCSS.ELA-LITERACY.RF.1.2
                      </span>
                      <Link href="/signup">
                        <div className="text-primary text-sm font-medium hover:underline cursor-pointer">
                          View Plan →
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-3 bg-green-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Science</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">4th Grade</span>
                      </div>
                      <span className="text-xs text-gray-500">45 min</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Simple Machines Investigation</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Students explore simple machines in Science Lab game, then identify and categorize machines in their environment.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-align-left mr-1"></i> NGSS 4-PS3-4
                      </span>
                      <Link href="/signup">
                        <div className="text-primary text-sm font-medium hover:underline cursor-pointer">
                          View Plan →
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link href="/signup">
                  <div className="inline-block bg-primary text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-opacity-90 transition">
                    View All Lesson Plans
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Each Lesson Plan Includes:</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Learning Objectives</h3>
                    <p className="text-gray-600">Clear outcomes aligned with educational standards</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Detailed Instructions</h3>
                    <p className="text-gray-600">Step-by-step teaching guide with timing suggestions</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Recommended Games</h3>
                    <p className="text-gray-600">Specific games tied to lesson content with setup instructions</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Extension Activities</h3>
                    <p className="text-gray-600">Additional ideas to deepen learning beyond the game</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Assessment Tools</h3>
                    <p className="text-gray-600">Formative and summative assessment suggestions</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Printable Materials</h3>
                    <p className="text-gray-600">Worksheets, activity sheets, and other teaching resources</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">Can I customize the lesson plans?</h3>
                  <p className="text-gray-600">Yes! All lesson plans are available as editable documents that you can modify to fit your classroom needs.</p>
                </div>
                <div>
                  <h3 className="font-bold">How many lesson plans are available?</h3>
                  <p className="text-gray-600">Our library includes over 500 lesson plans covering all grades (PreK-6) and core subjects, with new plans added weekly.</p>
                </div>
                <div>
                  <h3 className="font-bold">Do I need a premium account to access lesson plans?</h3>
                  <p className="text-gray-600">Basic users can access a limited selection of lesson plans, while premium subscribers have full access to our complete library.</p>
                </div>
                <div>
                  <h3 className="font-bold">Are the lesson plans aligned with standards?</h3>
                  <p className="text-gray-600">Yes, all lesson plans are aligned with Common Core, Next Generation Science Standards, or other state standards as applicable.</p>
                </div>
                <div>
                  <h3 className="font-bold">Can I contribute my own lesson plans?</h3>
                  <p className="text-gray-600">Yes! We welcome teacher contributions. Premium members can submit lesson plans for review and possible inclusion in our library.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 bg-opacity-10 rounded-xl p-8 border-2 border-blue-600 border-opacity-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to enhance your teaching with game-based learning?</h2>
              <p className="text-gray-700 mb-6">Access our complete library of lesson plans and teaching resources with a premium subscription.</p>
              <Link href="/teachers/subscribe">
                <div className="inline-block bg-blue-600 hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full cursor-pointer transition">
                  Get Premium Access
                </div>
              </Link>
              <p className="text-sm text-gray-600 mt-4">Discounts available for schools and districts.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonPlansPage;