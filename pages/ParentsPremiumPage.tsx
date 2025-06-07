import { Helmet } from 'react-helmet';

const ParentsPremiumPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Premium Membership for Parents | Educational Gaming</title>
        <meta name="description" content="Unlock premium educational content with our subscription plans designed for parents of PreK-6 students." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Premium Membership</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade2">Enhance Your Child's Learning Journey</h2>
          
          <p className="mb-6">
            Our premium membership unlocks the full potential of our educational platform, 
            providing your child with unlimited access to our complete library of curriculum-aligned games 
            and exclusive features designed to accelerate learning.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Why Choose Premium?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited access to 500+ educational games</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ad-free experience for distraction-free learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Detailed progress reports and learning analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Printable worksheets and offline activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority access to new games and features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Personalized learning paths based on performance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-grade1 bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-grade1">Educational Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-grade1 mr-2">•</span>
                  <span>Curriculum-aligned content that supports classroom learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-grade1 mr-2">•</span>
                  <span>Adaptive difficulty that grows with your child's abilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-grade1 mr-2">•</span>
                  <span>Coverage across all core subjects: Math, Reading, Science, and more</span>
                </li>
                <li className="flex items-start">
                  <span className="text-grade1 mr-2">•</span>
                  <span>Development of critical thinking and problem-solving skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-grade1 mr-2">•</span>
                  <span>Built-in rewards system to maintain motivation and engagement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-grade1 mr-2">•</span>
                  <span>Regular content updates aligned with educational standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade3 text-white text-center">
              <h3 className="text-xl font-bold mb-1">Monthly</h3>
              <p className="text-sm opacity-80">Perfect for trying it out</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Full access to all premium games</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic progress tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ad-free experience</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-grade3 text-white rounded-md hover:bg-opacity-90 transition">
                Subscribe Monthly
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative transform md:scale-105 z-10">
            <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
            <div className="p-6 bg-primary text-white text-center">
              <h3 className="text-xl font-bold mb-1">Annual</h3>
              <p className="text-sm opacity-80">Best value</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">$89.99</span>
                <span className="text-gray-600">/year</span>
                <p className="text-green-600 text-sm font-semibold mt-1">Save 25%</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Full access to all premium games</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Advanced progress analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Printable worksheets</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ad-free experience</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition">
                Subscribe Annually
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-grade5 text-white text-center">
              <h3 className="text-xl font-bold mb-1">Family</h3>
              <p className="text-sm opacity-80">For multiple children</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">$149.99</span>
                <span className="text-gray-600">/year</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Up to 4 child profiles</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All features of Annual plan</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Individual progress tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Comparative analytics</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-grade5 text-white rounded-md hover:bg-opacity-90 transition">
                Subscribe Family
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-700">Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to premium features until the end of your billing period.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Is there a free trial available?</h3>
              <p className="text-gray-700">Yes, we offer a 7-day free trial for all new premium subscriptions so you can experience the benefits before committing.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-700">We accept all major credit cards, PayPal, and Apple Pay for subscription payments.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How does the family plan work?</h3>
              <p className="text-gray-700">The family plan allows you to create up to 4 child profiles under a single subscription. Each child gets their own personalized learning experience and progress tracking.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Are there any long-term commitments?</h3>
              <p className="text-gray-700">No, there are no long-term commitments. Monthly plans are billed monthly, and annual plans are billed yearly, but you can cancel anytime.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="mb-4">Still have questions about our premium plans?</p>
            <a href="/contact" className="inline-block py-2 px-6 bg-accent text-dark font-medium rounded-md hover:bg-opacity-90 transition">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsPremiumPage;