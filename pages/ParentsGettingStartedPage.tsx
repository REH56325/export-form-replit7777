import { Helmet } from 'react-helmet';

const ParentsGettingStartedPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Getting Started for Parents | Educational Gaming</title>
        <meta name="description" content="A guide for parents on how to get started with our educational gaming platform for PreK-6 students." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Getting Started Guide for Parents</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-grade2">Welcome to Our Educational Gaming Platform</h2>
        
        <p className="mb-6">
          We're excited to have you and your child join our educational gaming community! 
          This guide will help you understand how our platform works and how to make the most of it.
        </p>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">1. Creating an Account</h3>
            <p className="mb-3">
              Creating an account allows you to track your child's progress across all games and devices.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Click on the "Sign Up" button in the top-right corner</li>
              <li>Fill in your email address and create a password</li>
              <li>Add your child's information (name and grade level)</li>
              <li>Verify your email address to activate your account</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">2. Finding Age-Appropriate Games</h3>
            <p className="mb-3">
              All our games are organized by grade level and subject to make it easy to find appropriate content.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browse games by your child's grade level</li>
              <li>Filter games by subject (Math, Language Arts, Science, etc.)</li>
              <li>Look for the difficulty rating to find games that match your child's skill level</li>
              <li>Check the "Featured Games" section for our most popular and effective games</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">3. Tracking Progress</h3>
            <p className="mb-3">
              Our platform automatically tracks your child's progress and achievements.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visit the "Progress" section in your parent dashboard</li>
              <li>View detailed statistics on which games your child has played</li>
              <li>See improvement over time in different subject areas</li>
              <li>Check which skills your child has mastered and which need more practice</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">4. Safety Features</h3>
            <p className="mb-3">
              Your child's safety is our top priority. Here's how we keep our platform safe:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No external links within games</li>
              <li>No in-game chat features or communication with strangers</li>
              <li>Parental controls for limiting screen time</li>
              <li>Regular content reviews to ensure age-appropriate material</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-grade3">5. Premium Features</h3>
            <p className="mb-3">
              While many games are available for free, our premium subscription offers additional benefits:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to our complete library of educational games</li>
              <li>Detailed progress reports and skill assessment</li>
              <li>Downloadable worksheets that complement online learning</li>
              <li>Ad-free experience</li>
            </ul>
            <p className="mt-3">
              <a href="/parents/premium" className="text-accent underline">Learn more about our premium options</a>
            </p>
          </section>
        </div>
        
        <div className="mt-10 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-primary">Still Have Questions?</h3>
          <p className="mb-3">
            We're here to help! Check out our <a href="/parents/faq" className="text-accent underline">FAQ section</a> for answers to common questions, or <a href="/contact" className="text-accent underline">contact our support team</a> for personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentsGettingStartedPage;