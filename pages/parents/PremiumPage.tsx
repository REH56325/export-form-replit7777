import { Helmet } from "react-helmet";
import { Link } from "wouter";

const PremiumPage = () => {
  return (
    <>
      <Helmet>
        <title>Premium Subscription | For Parents | EduFun Games</title>
        <meta 
          name="description" 
          content="Unlock the full potential of EduFun Games with a premium subscription. Access exclusive games, remove ads, and enhance your child's learning experience." 
        />
      </Helmet>

      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 mb-12">
            <h1 className="text-3xl font-bold mb-4">Premium Subscription</h1>
            <p className="text-lg mb-6">Enhance your child's learning experience with premium features and exclusive content</p>
            <Link href="/signup">
              <div className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-full cursor-pointer hover:bg-gray-100 transition">
                Try Premium Free for 7 Days
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Choose the Perfect Plan for Your Family</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6 relative">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <p className="text-3xl font-bold mb-1">Free</p>
                <p className="text-gray-500 text-sm mb-4">Always free</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Access to free games</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Basic progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Create up to 2 child profiles</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <i className="fas fa-times mr-2"></i>
                    <span>Ad-supported experience</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <div className="block text-center w-full py-2 border border-primary text-primary font-bold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition">
                    Sign Up Free
                  </div>
                </Link>
              </div>
              
              <div className="border-2 border-primary rounded-lg p-6 relative bg-white shadow-lg z-10 transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Family</h3>
                <p className="text-3xl font-bold mb-1">$9.99<span className="text-lg font-normal">/month</span></p>
                <p className="text-gray-500 text-sm mb-4">or $99/year (save 17%)</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Access to all games (240+)</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Detailed progress reports</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Create up to 5 child profiles</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Ad-free experience</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Offline play</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <div className="block text-center w-full py-2 bg-primary text-white font-bold rounded-lg cursor-pointer hover:bg-opacity-90 transition">
                    Start 7-Day Free Trial
                  </div>
                </Link>
              </div>
              
              <div className="border rounded-lg p-6 relative">
                <h3 className="text-xl font-bold mb-2">Classroom</h3>
                <p className="text-3xl font-bold mb-1">$19.99<span className="text-lg font-normal">/month</span></p>
                <p className="text-gray-500 text-sm mb-4">or $199/year (save 17%)</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Everything in Family plan</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Up to 30 student accounts</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Classroom management tools</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Lesson plans and resources</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/teachers/subscribe">
                  <div className="block text-center w-full py-2 border border-primary text-primary font-bold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition">
                    Learn More
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Premium Features</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Ad-Free Experience</h3>
                    <p className="text-gray-600">Enjoy uninterrupted learning with no advertisements.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Exclusive Premium Games</h3>
                    <p className="text-gray-600">Access our full library of 240+ educational games, including premium-only content.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Multiple Child Profiles</h3>
                    <p className="text-gray-600">Create and manage up to 5 child profiles with individual progress tracking.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Advanced Progress Reports</h3>
                    <p className="text-gray-600">Detailed insights into your child's learning journey with actionable recommendations.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold">Offline Play</h3>
                    <p className="text-gray-600">Download games to play without internet connection—perfect for travel!</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">Can I cancel my subscription at any time?</h3>
                  <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your premium access will continue until the end of your billing cycle.</p>
                </div>
                <div>
                  <h3 className="font-bold">How does the free trial work?</h3>
                  <p className="text-gray-600">Your 7-day free trial gives you full access to all premium features. We'll send you a reminder before it ends, and you won't be charged if you cancel before the trial period is over.</p>
                </div>
                <div>
                  <h3 className="font-bold">Can I switch between monthly and annual billing?</h3>
                  <p className="text-gray-600">Yes, you can switch between billing options when your current billing cycle ends.</p>
                </div>
                <div>
                  <h3 className="font-bold">Do you offer family sharing?</h3>
                  <p className="text-gray-600">Yes, our Family plan allows you to create up to 5 child profiles under a single subscription.</p>
                </div>
                <div>
                  <h3 className="font-bold">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
                </div>
                <Link href="/parents/faq">
                  <div className="text-primary font-medium hover:underline cursor-pointer mt-2">
                    View all FAQs →
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-primary bg-opacity-10 rounded-xl p-8 border-2 border-primary border-opacity-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to transform your child's learning experience?</h2>
              <p className="text-gray-700 mb-6">Join thousands of parents who have seen significant educational improvements through EduFun Games Premium.</p>
              <Link href="/signup">
                <div className="inline-block bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full cursor-pointer transition mx-2">
                  Start Your Free Trial
                </div>
              </Link>
              <p className="text-sm text-gray-600 mt-4">No credit card required for trial. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumPage;