import { useState } from 'react';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'parent'
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Contact Us | Educational Gaming</title>
        <meta name="description" content="Get in touch with our team for support, feedback, or inquiries about our educational gaming platform." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Contact Us</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-grade2">Email Us</h2>
            <p className="text-gray-600 mb-2">For general inquiries:</p>
            <a href="mailto:info@educationalgaming.com" className="text-primary hover:underline">
              info@educationalgaming.com
            </a>
            <p className="text-gray-600 mt-4 mb-2">For technical support:</p>
            <a href="mailto:support@educationalgaming.com" className="text-primary hover:underline">
              support@educationalgaming.com
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-grade3">Call Us</h2>
            <p className="text-gray-600 mb-2">Customer Service:</p>
            <a href="tel:+15551234567" className="text-primary hover:underline">
              (555) 123-4567
            </a>
            <p className="text-gray-600 mt-4 mb-2">School Subscriptions:</p>
            <a href="tel:+15559876543" className="text-primary hover:underline">
              (555) 987-6543
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Monday - Friday: 9am - 5pm EST
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-grade4">Visit Us</h2>
            <p className="text-gray-600 mb-4">Our Headquarters:</p>
            <address className="not-italic text-gray-700">
              123 Learning Lane<br />
              Education City, EC 12345<br />
              United States
            </address>
            <p className="text-gray-500 text-sm mt-4">
              By appointment only
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-grade2">Send Us a Message</h2>
          
          {formSubmitted ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-green-700">Thank You!</h3>
              <p className="text-gray-700">
                Your message has been sent successfully. We'll get back to you as soon as possible.
              </p>
              <button 
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    userType: 'parent'
                  });
                }}
                className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">I am a:</label>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="parent" 
                      checked={formData.userType === 'parent'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span className="ml-2">Parent</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="teacher" 
                      checked={formData.userType === 'teacher'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span className="ml-2">Teacher</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="school_admin" 
                      checked={formData.userType === 'school_admin'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span className="ml-2">School Administrator</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="other" 
                      checked={formData.userType === 'other'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              
              <div className="flex items-center mb-6">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  required
                  className="text-primary"
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                </label>
              </div>
              
              <div className="text-center">
                <button type="submit" className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition">
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Frequently Asked Questions</h2>
          <p className="mb-6">
            Looking for quick answers? Check out our FAQ sections:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <a 
              href="/parents/faq" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-medium text-grade2">Parent FAQs</h3>
            </a>
            <a 
              href="/teachers/faq" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-medium text-grade3">Teacher FAQs</h3>
            </a>
            <a 
              href="/technical-support" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-medium text-grade4">Technical Support</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;