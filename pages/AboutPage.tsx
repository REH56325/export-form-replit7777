import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About EduFun Games | Educational Games for PreK-6</title>
        <meta 
          name="description" 
          content="Learn about EduFun Games - creating engaging educational games to make learning fun for PreK through 6th grade students."
        />
      </Helmet>
      
      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-game text-center mb-12">About <span className="text-primary">EduFun Games</span></h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At EduFun Games, our mission is to make learning fun and engaging for children of all ages. 
              We believe that educational games can make a significant impact on a child's learning journey 
              by transforming traditional learning methods into interactive, enjoyable experiences.
            </p>
            <p className="text-gray-700 mb-6">
              Founded by a team of educators and game developers, EduFun Games creates curriculum-aligned 
              games that help children develop essential skills while having fun. Our games are designed to 
              support classroom learning and provide valuable educational content for home use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
              <p className="text-gray-700 mb-4">
                We combine educational expertise with engaging game design to create experiences that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Align with curriculum standards for PreK through 6th grade</li>
                <li>Adapt to different learning styles and abilities</li>
                <li>Provide immediate feedback to encourage progress</li>
                <li>Track learning achievements to celebrate success</li>
                <li>Make learning concepts memorable through play</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-primary">Accessibility</h3>
                  <p className="text-gray-700">Creating games that are accessible to all learners, including those with different abilities and needs.</p>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Quality</h3>
                  <p className="text-gray-700">Developing high-quality educational content that is both engaging and effective.</p>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Innovation</h3>
                  <p className="text-gray-700">Continuously improving our games with the latest educational research and technology.</p>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Community</h3>
                  <p className="text-gray-700">Building a supportive community of educators, parents, and students who share our passion for learning.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              EduFun Games was founded by a passionate team of educators, game developers, and learning specialists who 
              believe in the power of play-based learning. Our diverse team brings together expertise in:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="rounded-full bg-primary-light w-20 h-20 flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-chalkboard-teacher text-primary text-2xl"></i>
                </div>
                <h3 className="font-bold">Education</h3>
                <p className="text-sm text-gray-600">Certified teachers and curriculum specialists</p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-primary-light w-20 h-20 flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-gamepad text-primary text-2xl"></i>
                </div>
                <h3 className="font-bold">Game Design</h3>
                <p className="text-sm text-gray-600">Creative game developers and designers</p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-primary-light w-20 h-20 flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-brain text-primary text-2xl"></i>
                </div>
                <h3 className="font-bold">Learning Science</h3>
                <p className="text-sm text-gray-600">Child development and cognitive specialists</p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-primary-light w-20 h-20 flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-universal-access text-primary text-2xl"></i>
                </div>
                <h3 className="font-bold">Accessibility</h3>
                <p className="text-sm text-gray-600">Accessibility experts and inclusion specialists</p>
              </div>
            </div>
            <p className="text-gray-700">
              Together, we create games that make learning an adventure for every child.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;