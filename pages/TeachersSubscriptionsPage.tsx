import { Helmet } from 'react-helmet';

const TeachersSubscriptionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>School Subscriptions | Educational Gaming</title>
        <meta name="description" content="Discover subscription plans for schools and educational institutions with special pricing and features for classroom use." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">School Subscriptions</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade2">Educational Subscriptions for Schools</h2>
          
          <p className="mb-6">
            Our school subscription plans are designed to provide affordable, comprehensive access to our educational
            gaming platform for entire classrooms, schools, or districts. We offer special pricing and features
            specifically for educational institutions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Flexible Licensing</h3>
              <p className="text-gray-700">
                Purchase licenses for individual classrooms, grade levels, or your entire school with volume discounts.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Simplified Administration</h3>
              <p className="text-gray-700">
                Easily manage all student accounts, track usage, and access comprehensive analytics from a central dashboard.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Priority Support</h3>
              <p className="text-gray-700">
                Get dedicated technical support, teacher training, and curriculum integration assistance from our education specialists.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade3 text-white text-center">
              <h3 className="text-xl font-bold mb-1">Classroom Plan</h3>
              <p className="text-sm opacity-80">For single classrooms</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">$199</span>
                <span className="text-gray-600">/year</span>
                <p className="text-sm text-gray-600 mt-1">Up to 30 students</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Full access to all educational games</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic classroom management tools</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Student progress tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Curriculum-aligned lesson plans</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Email support</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-grade3 text-white rounded-md hover:bg-opacity-90 transition">
                Get Classroom Plan
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative transform md:scale-105 z-10">
            <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
            <div className="p-6 bg-primary text-white text-center">
              <h3 className="text-xl font-bold mb-1">School Plan</h3>
              <p className="text-sm opacity-80">For entire schools</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">$1,499</span>
                <span className="text-gray-600">/year</span>
                <p className="text-sm text-gray-600 mt-1">Up to 300 students</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Everything in Classroom Plan</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Advanced administrative dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>School-wide analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Teacher training session</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority email & phone support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom school branding</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition">
                Get School Plan
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade5 text-white text-center">
              <h3 className="text-xl font-bold mb-1">District Plan</h3>
              <p className="text-sm opacity-80">For school districts</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-xl font-bold">Custom Pricing</span>
                <p className="text-sm text-gray-600 mt-1">Unlimited students</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Everything in School Plan</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>District-wide implementation</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>SSO integration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom content development</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>On-site professional development</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-grade5 text-white rounded-md hover:bg-opacity-90 transition">
                Contact for Quote
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade4">Special Features for Schools</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Administrative Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Bulk Account Creation</h4>
                    <p className="text-gray-600 text-sm">Create student accounts in bulk by uploading a CSV file or integrating with your SIS.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">User Management</h4>
                    <p className="text-gray-600 text-sm">Easily add, remove, or transfer students between classes and manage teacher accounts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Role-Based Access</h4>
                    <p className="text-gray-600 text-sm">Set different permission levels for administrators, teachers, and students.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Data Security</h4>
                    <p className="text-gray-600 text-sm">COPPA and FERPA compliant with secure data storage and transmission.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Instructional Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Professional Development</h4>
                    <p className="text-gray-600 text-sm">Training sessions to help teachers effectively implement the platform in their classrooms.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Curriculum Integration</h4>
                    <p className="text-gray-600 text-sm">Support for aligning our content with your specific curriculum and standards.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Implementation Planning</h4>
                    <p className="text-gray-600 text-sm">Strategic guidance for rolling out the platform across classrooms or schools.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-grade4 mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-medium">Success Monitoring</h4>
                    <p className="text-gray-600 text-sm">Regular check-ins and usage reports to ensure successful implementation.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Schools We Work With</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-bold text-primary text-lg">Lincoln Elementary</div>
                <div className="text-sm text-gray-500">Chicago, IL</div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-bold text-primary text-lg">Washington Middle School</div>
                <div className="text-sm text-gray-500">Seattle, WA</div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-bold text-primary text-lg">Oakridge School District</div>
                <div className="text-sm text-gray-500">Austin, TX</div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-bold text-primary text-lg">Sunshine Academy</div>
                <div className="text-sm text-gray-500">Miami, FL</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="mb-4 text-gray-700">Join hundreds of schools nationwide that trust our platform for educational gaming.</p>
            <a href="#testimonials" className="text-primary hover:underline">Read Success Stories</a>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Ready to Transform Learning at Your School?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our education team to discuss your school's needs and find the perfect subscription plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition"
            >
              Request a Demo
            </a>
            <a 
              href="/teachers/resources" 
              className="py-3 px-6 bg-white text-primary font-medium rounded-md border border-primary hover:bg-gray-50 transition"
            >
              View Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersSubscriptionsPage;