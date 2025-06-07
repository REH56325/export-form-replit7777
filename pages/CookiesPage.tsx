import { Helmet } from 'react-helmet';

const CookiesPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Cookie Policy | Educational Gaming</title>
        <meta name="description" content="Learn about how we use cookies on our educational gaming platform to enhance your experience." />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Cookie Policy</h1>
        <p className="mb-6 text-gray-600">Last Updated: May 1, 2023</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <p>
              Cookies help us understand how you use our site, remember your preferences, and improve your overall experience.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">How We Use Cookies</h2>
            <p className="mb-4">Our educational gaming platform uses cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Essential Cookies:</span> These cookies are necessary for the website to function properly. They enable core features such as security, account management, and remembering your progress in games.
              </li>
              <li>
                <span className="font-medium">Preference Cookies:</span> These cookies remember choices you make and provide enhanced, personalized features. For example, they may remember your preferred grade level or subject preferences.
              </li>
              <li>
                <span className="font-medium">Analytics Cookies:</span> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform based on user behavior.
              </li>
              <li>
                <span className="font-medium">Educational Progress Cookies:</span> These cookies track and save your child's progress in educational games, allowing them to continue where they left off and helping us provide appropriate difficulty levels.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Cookie Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Session Cookie</td>
                    <td className="border border-gray-300 px-4 py-2">Maintains your session while you're using the platform</td>
                    <td className="border border-gray-300 px-4 py-2">Expires when you close your browser</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Login Cookie</td>
                    <td className="border border-gray-300 px-4 py-2">Remembers that you're logged in</td>
                    <td className="border border-gray-300 px-4 py-2">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Preference Cookie</td>
                    <td className="border border-gray-300 px-4 py-2">Remembers your settings and preferences</td>
                    <td className="border border-gray-300 px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Analytics Cookie</td>
                    <td className="border border-gray-300 px-4 py-2">Collects anonymous data about site usage</td>
                    <td className="border border-gray-300 px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Progress Cookie</td>
                    <td className="border border-gray-300 px-4 py-2">Saves game progress and achievements</td>
                    <td className="border border-gray-300 px-4 py-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">Managing Cookies</h2>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delete all cookies from your browser</li>
              <li>Set your browser to block cookies from being set</li>
              <li>Configure your browser to alert you when websites attempt to set cookies</li>
              <li>Use private/incognito browsing mode to prevent cookies from being saved</li>
            </ul>
            <p className="mt-4">
              Please note that restricting cookies may impact the functionality of our website. For example, if you block essential cookies, you won't be able to log in or save your progress in games.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">Third-Party Cookies</h2>
            <p className="mb-4">
              We use a limited number of third-party services that may also set cookies on your device. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics – To help us understand how users interact with our platform</li>
              <li>Zendesk – For customer support functionality</li>
            </ul>
            <p className="mt-4">
              These third-party services have their own privacy and cookie policies. We encourage you to review these policies on their respective websites.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">Children's Privacy and COPPA Compliance</h2>
            <p className="mb-4">
              Our platform is designed for children's education, and we are committed to complying with the Children's Online Privacy Protection Act (COPPA). We only collect the minimal amount of information necessary to provide our educational services.
            </p>
            <p>
              For children under 13, we require parental consent before collecting any personal information, and we use cookies only for essential functions and educational progress tracking.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-grade2">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p>Email: privacy@educationalgaming.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Learning Lane, Education City, EC 12345</p>
            </div>
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;