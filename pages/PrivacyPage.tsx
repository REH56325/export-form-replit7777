import { Helmet } from "react-helmet";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | EduFun Games</title>
        <meta 
          name="description" 
          content="Privacy Policy for EduFun Games - Learn how we collect, use, and protect your personal information."
        />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 prose max-w-none">
            <p>Last Updated: May 9, 2023</p>
            
            <h2>1. Introduction</h2>
            <p>
              At EduFun Games, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website or use our educational gaming platform.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not 
              access the site or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Data</h3>
            <p>
              We may collect personal identification information from users in various ways, including, but not limited to:
            </p>
            <ul>
              <li>When registering for an account: username, email address, and password</li>
              <li>For child users (under 13): We collect only the information necessary to provide the educational experience and protect their safety online</li>
              <li>For teacher accounts: School/institution name, grade level taught</li>
              <li>For parent accounts: Information about your child(ren), such as age or grade level</li>
            </ul>
            
            <h3>2.2 Usage Data</h3>
            <p>
              We may also collect information about how the Service is accessed and used ("Usage Data"). This Usage Data may include:
            </p>
            <ul>
              <li>Gameplay information (e.g., progress, achievements, scores)</li>
              <li>Device information (e.g., device type, operating system, browser type)</li>
              <li>Log data (e.g., IP address, access times, pages viewed)</li>
              <li>Learning patterns and educational progress</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the collected data for various purposes:
            </p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To personalize the educational experience based on learning progress and preferences</li>
              <li>To provide teachers and parents with insights into student/child learning progress</li>
            </ul>
            
            <h2>4. Children's Privacy</h2>
            <p>
              We take children's privacy seriously and comply with the requirements of the Children's Online Privacy Protection Act (COPPA).
            </p>
            <p>
              For users under the age of 13, we require parental consent before collecting any personal information. We collect only 
              the information necessary to provide the service and create a safe, personalized educational experience.
            </p>
            <p>
              Parents and legal guardians can review, edit, or request deletion of their child's personal information by contacting us 
              at privacy@edufungames.com.
            </p>
            
            <h2>5. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. 
              We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, 
              and enforce our policies.
            </p>
            <p>
              Usage Data is generally retained for a shorter period, except when this data is used to strengthen security or to improve 
              the functionality of our Service, or we are legally obligated to retain this data for longer periods.
            </p>
            
            <h2>6. Data Security</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of 
              electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, 
              we cannot guarantee its absolute security.
            </p>
            
            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right of rectification—to have your information corrected if it is inaccurate or incomplete</li>
              <li>The right to object to our processing of your personal information</li>
              <li>The right of restriction—to request that we restrict the processing of your personal information</li>
              <li>The right to data portability—to receive a copy of your personal information in a structured, machine-readable format</li>
              <li>The right to withdraw consent at any time, where we relied on your consent to process your personal information</li>
            </ul>
            
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
              on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy 
              periodically for any changes.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <span className="text-primary">privacy@edufungames.com</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;