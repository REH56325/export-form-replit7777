import { Helmet } from "react-helmet";

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | EduFun Games</title>
        <meta 
          name="description" 
          content="Terms of Service for EduFun Games - Read our terms and conditions for using our educational gaming platform."
        />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 prose max-w-none">
            <p>Last Updated: May 9, 2023</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to EduFun Games. These Terms of Service ("Terms") govern your access to and use of the EduFun Games website, 
              services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound 
              by these Terms. If you do not agree to these Terms, do not access or use the Service.
            </p>
            
            <h2>2. Eligibility</h2>
            <p>
              The Service is intended for users who are at least 13 years of age. If you are under the age of 13, you may only use 
              the Service with the consent and supervision of a parent or legal guardian who agrees to be bound by these Terms.
            </p>
            
            <h2>3. Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. You are responsible 
              for safeguarding your account, and you agree not to disclose your password to any third party. You are solely responsible 
              for any activity that occurs under your account. You must notify us immediately upon becoming aware of any breach of 
              security or unauthorized use of your account.
            </p>
            
            <h2>4. User Content</h2>
            <p>
              Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, 
              videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the 
              Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting User Content on or through the Service, you represent and warrant that: (i) the User Content is yours or 
              you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of 
              your User Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract 
              rights or any other rights of any person.
            </p>
            
            <h2>5. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding User Content), features, and functionality are and will remain the 
              exclusive property of EduFun Games and its licensors. The Service is protected by copyright, trademark, and other laws 
              of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with 
              any product or service without the prior written consent of EduFun Games.
            </p>
            
            <h2>6. Prohibited Uses</h2>
            <p>
              You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
            </p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate EduFun Games, a company employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm EduFun Games or users of the Service or expose them to liability.</li>
            </ul>
            
            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
              under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of 
              the Terms.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
            </p>
            
            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall EduFun Games, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
              any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, 
              use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the 
              Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and 
              (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort 
              (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
            
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material 
              we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will 
              be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. 
              If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <span className="text-primary">support@edufungames.com</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;