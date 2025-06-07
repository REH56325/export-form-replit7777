import { useState } from 'react';
import { Helmet } from 'react-helmet';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const ParentsFAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How do I create an account for my child?",
      answer: "To create an account, click the 'Sign Up' button in the top-right corner of the homepage. You'll need to provide your email address and create a password. Then, you can add your child's information, including their name and grade level. One parent account can manage multiple child profiles.",
      category: "accounts"
    },
    {
      id: 2,
      question: "Is my child's information secure?",
      answer: "Yes, we take data privacy very seriously, especially for children. We are fully COPPA compliant and collect minimal personal information. We never share children's data with third parties for marketing purposes, and all data transmission is encrypted. You can review our detailed privacy policy for more information.",
      category: "safety"
    },
    {
      id: 3,
      question: "How much does a subscription cost?",
      answer: "We offer several subscription options: a monthly plan at $9.99/month, an annual plan at $89.99/year (saving you 25%), and a family plan at $149.99/year for up to 4 child profiles. We also offer a free trial so you can experience the premium features before committing.",
      category: "billing"
    },
    {
      id: 4,
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account settings. If you cancel, you'll still have access to premium features until the end of your current billing period. No refunds are provided for partial periods.",
      category: "billing"
    },
    {
      id: 5,
      question: "How do I track my child's progress?",
      answer: "Once logged in, you can access the 'Progress' section in your parent dashboard. This will show you detailed statistics about which games your child has played, their scores, time spent, and skills they've mastered. You can also see their achievements and badges earned.",
      category: "usage"
    },
    {
      id: 6,
      question: "Are the games aligned with school curriculum?",
      answer: "Yes, all of our games are designed by educational experts and aligned with standard curricula for each grade level. We cover core subjects like Math, Reading, Science, and Social Studies, following educational standards to ensure the content supports classroom learning.",
      category: "content"
    },
    {
      id: 7,
      question: "How much screen time is recommended?",
      answer: "We recommend following the American Academy of Pediatrics guidelines for screen time. For children ages 2-5, limit screen time to 1 hour per day. For children 6 and older, place consistent limits on time and types of media. Our platform allows you to set time limits for your child's account.",
      category: "usage"
    },
    {
      id: 8,
      question: "Can multiple children use the same account?",
      answer: "With our standard subscription, you can create one child profile. With our family plan, you can create up to 4 child profiles under a single parent account. Each child gets their own personalized experience, game progress, and achievement tracking.",
      category: "accounts"
    },
    {
      id: 9,
      question: "What devices are compatible with your platform?",
      answer: "Our platform works on most modern devices with an internet connection, including desktop computers, laptops, tablets, and smartphones. We support recent versions of Chrome, Firefox, Safari, and Edge browsers. No downloads or installations are required.",
      category: "technical"
    },
    {
      id: 10,
      question: "Do you offer content for children with special needs?",
      answer: "Yes, we offer adaptive learning features that can accommodate various learning styles and needs. Many of our games have adjustable difficulty levels and options for audio instructions, visual supports, and extended time. We're continually expanding our accessibility features.",
      category: "content"
    },
    {
      id: 11,
      question: "What if my child finds a game too difficult?",
      answer: "Most of our games have multiple difficulty levels that adapt to your child's performance. If a game seems too challenging, you can help your child select an easier level or a different game that targets similar skills at a more appropriate level.",
      category: "usage"
    },
    {
      id: 12,
      question: "Is there a mobile app available?",
      answer: "Currently, our platform is web-based and optimized for mobile browsers, so no download is necessary. Simply visit our website on any device. We are developing native mobile apps for iOS and Android, which will be available in the near future.",
      category: "technical"
    },
    {
      id: 13,
      question: "How do I report a technical issue?",
      answer: "If you encounter any technical issues, please contact our support team through the 'Contact Support' link in the footer of our website. Provide as much detail as possible, including the device and browser you're using, and any error messages you see.",
      category: "technical"
    },
    {
      id: 14,
      question: "Can teachers use this platform in the classroom?",
      answer: "Absolutely! We offer special school subscriptions for classroom use. Teachers can manage student accounts, assign specific games, track class progress, and access supplementary teaching materials. Visit our 'Teachers' section for more information.",
      category: "content"
    },
    {
      id: 15,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely through our payment providers with industry-standard encryption.",
      category: "billing"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'accounts', name: 'Accounts & Registration' },
    { id: 'billing', name: 'Billing & Subscriptions' },
    { id: 'content', name: 'Content & Curriculum' },
    { id: 'safety', name: 'Safety & Privacy' },
    { id: 'technical', name: 'Technical Support' },
    { id: 'usage', name: 'Usage & Features' }
  ];
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Frequently Asked Questions for Parents | Educational Gaming</title>
        <meta name="description" content="Find answers to common questions about our educational gaming platform, subscriptions, child safety, and more." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Frequently Asked Questions</h1>
      
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for a question..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3 text-grade2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Still Have Questions?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer you were looking for, our support team is ready to help.
        </p>
        <a 
          href="/contact" 
          className="inline-block py-3 px-8 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default ParentsFAQPage;