import { Helmet } from 'react-helmet';

const ParentsSafetyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Online Safety for Children | Educational Gaming</title>
        <meta name="description" content="Learn about our safety measures to protect children while they learn and play on our educational gaming platform." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Child Safety Online</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-grade2">Our Commitment to Your Child's Safety</h2>
        
        <p className="mb-6">
          At our educational gaming platform, the safety and well-being of children is our highest priority. 
          We've designed our platform with comprehensive safety measures to ensure children can learn and play 
          in a secure, age-appropriate environment.
        </p>
        
        <div className="space-y-8 mt-8">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">Kid-Safe Content</h3>
            <p className="mb-3">
              All of our games and educational content undergo a rigorous review process:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Educational experts review content for age-appropriateness</li>
              <li>No violent, scary, or inappropriate themes</li>
              <li>Regular content audits to maintain high standards</li>
              <li>Curriculum-aligned material reviewed by certified teachers</li>
              <li>No advertisements for third-party products or services</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">Privacy Protection</h3>
            <p className="mb-3">
              We take data privacy seriously, especially when it comes to children:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>COPPA compliant platform (Children's Online Privacy Protection Act)</li>
              <li>Minimal personal information collected during account creation</li>
              <li>No location tracking or unnecessary data collection</li>
              <li>Parental consent required for all accounts for children under 13</li>
              <li>Clear, easy-to-understand privacy policy</li>
              <li>No data sharing with third parties for marketing purposes</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">No External Communication</h3>
            <p className="mb-3">
              Our platform is designed to eliminate risks associated with online communication:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No chat features or direct messaging capabilities</li>
              <li>No social media integration or friend requests</li>
              <li>No user-generated content that could contain inappropriate material</li>
              <li>No external links that could lead children away from our secure environment</li>
              <li>No ability for strangers to contact your child</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">Parental Controls</h3>
            <p className="mb-3">
              We empower parents with tools to customize their child's experience:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Screen time limits and scheduling options</li>
              <li>Detailed activity reports to monitor usage</li>
              <li>Ability to restrict access to specific games or content</li>
              <li>Option to review and approve games before your child plays</li>
              <li>Easy account management and settings adjustment</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">Secure Technical Infrastructure</h3>
            <p className="mb-3">
              Behind the scenes, we maintain robust security measures:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for all data transmission</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Secure authentication processes</li>
              <li>Compliance with industry security standards</li>
              <li>Immediate response protocol for any potential security issues</li>
            </ul>
          </section>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-grade4">Internet Safety Tips for Parents</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Open Communication</h3>
            <p>Maintain ongoing conversations with your child about their online activities. Create an environment where they feel comfortable sharing their experiences and concerns.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">2. Set Clear Boundaries</h3>
            <p>Establish rules about screen time, appropriate websites, and apps. Consider creating a family media agreement that everyone signs.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">3. Educate About Personal Information</h3>
            <p>Teach children never to share personal details online, including their full name, address, school, or photos without your permission.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">4. Use Parental Controls</h3>
            <p>Take advantage of built-in parental controls on devices, browsers, and our platform to create appropriate boundaries.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">5. Monitor Activity</h3>
            <p>Keep devices in common areas of your home and periodically check on your child's online activities.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">6. Research Apps and Websites</h3>
            <p>Before allowing your child to use a new app or website, research it to ensure it's age-appropriate and secure.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">7. Teach Critical Thinking</h3>
            <p>Help your child develop skills to evaluate online content and recognize potential scams or inappropriate material.</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Have Safety Concerns?</h2>
        <p className="mb-6">
          If you ever have questions or concerns about safety on our platform, or if you notice anything that seems inappropriate, please contact us immediately.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <a 
            href="/contact" 
            className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-grade2">Contact Support</h3>
            <p className="text-gray-700">Our support team is available to address any concerns about platform safety.</p>
          </a>
          <a 
            href="/parents/faq" 
            className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-grade3">Safety FAQs</h3>
            <p className="text-gray-700">Find answers to common questions about our safety measures and policies.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParentsSafetyPage;