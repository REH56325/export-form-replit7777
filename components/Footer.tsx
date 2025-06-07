import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-game font-bold">E</span>
              </div>
              <div>
                <h2 className="text-xl font-game text-white">EduFun <span className="text-primary">Games</span></h2>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Educational games that make learning fun for PreK through 6th grade students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/grade/prek">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Games by Grade</div>
                </Link>
              </li>
              <li>
                <Link href="/games-by-subject">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Games by Subject</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">About Us</div>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Blog</div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Contact</div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For parents */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">For Parents</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/parents/getting-started">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Getting Started</div>
                </Link>
              </li>
              <li>
                <Link href="/parents/premium">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Premium Subscription</div>
                </Link>
              </li>
              <li>
                <Link href="/parents/progress">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Progress Tracking</div>
                </Link>
              </li>
              <li>
                <Link href="/parents/safety">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Safety & Privacy</div>
                </Link>
              </li>
              <li>
                <Link href="/parents/faq">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">FAQs</div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For teachers */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">For Teachers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/classroom-tools">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Classroom Tools</div>
                </Link>
              </li>
              <li>
                <Link href="/teachers/lesson-plans">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Lesson Plans</div>
                </Link>
              </li>
              <li>
                <Link href="/teachers/school-subscriptions">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">School Subscriptions</div>
                </Link>
              </li>
              <li>
                <Link href="/teachers/remote-learning">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Remote Learning</div>
                </Link>
              </li>
              <li>
                <Link href="/teachers/resources">
                  <div className="text-gray-400 hover:text-primary transition cursor-pointer">Teacher Resources</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} EduFun Games. All rights reserved.</p>
          <div className="flex space-x-4 text-sm">
            <Link href="/terms">
              <div className="text-gray-500 hover:text-primary transition cursor-pointer">Terms of Service</div>
            </Link>
            <Link href="/privacy">
              <div className="text-gray-500 hover:text-primary transition cursor-pointer">Privacy Policy</div>
            </Link>
            <Link href="/cookies">
              <div className="text-gray-500 hover:text-primary transition cursor-pointer">Cookie Policy</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
