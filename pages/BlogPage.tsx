import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How Game-Based Learning Improves Math Skills",
      date: "May 15, 2023",
      author: "Dr. Emily Johnson",
      excerpt: "Research shows that game-based learning can significantly improve mathematical understanding and retention. This article explores the cognitive benefits of educational games in math education.",
      content: `
        <p>Mathematics has always been a challenging subject for many students, but recent research shows that game-based learning can revolutionize how children approach and master mathematical concepts. When we integrate games into math education, we're not just making learning fun – we're fundamentally changing how the brain processes and retains mathematical information.</p>

        <h3>The Science Behind Game-Based Math Learning</h3>
        <p>Studies conducted by leading educational researchers have demonstrated that students who learn math through games show:</p>
        <ul>
          <li>35% better retention of mathematical concepts</li>
          <li>Increased problem-solving confidence</li>
          <li>Enhanced spatial reasoning abilities</li>
          <li>Improved number sense development</li>
        </ul>

        <p>The key lies in how games activate multiple areas of the brain simultaneously. When children play math games, they engage their visual cortex, working memory, and reward systems all at once, creating stronger neural pathways for mathematical thinking.</p>

        <h3>Key Benefits of Mathematical Gaming</h3>
        <p><strong>Immediate Feedback:</strong> Unlike traditional worksheets, math games provide instant feedback, allowing students to correct mistakes and reinforce correct thinking patterns immediately.</p>

        <p><strong>Reduced Math Anxiety:</strong> The playful nature of games helps reduce the stress and anxiety often associated with mathematics, creating a positive emotional connection to the subject.</p>

        <p><strong>Adaptive Learning:</strong> Modern educational games can adjust difficulty levels in real-time, ensuring each student is appropriately challenged without becoming overwhelmed.</p>

        <h3>Implementing Game-Based Math Learning</h3>
        <p>For parents and teachers looking to incorporate game-based learning:</p>
        <ul>
          <li>Start with 15-20 minute gaming sessions</li>
          <li>Choose games that align with current curriculum standards</li>
          <li>Discuss strategies and thinking processes after gameplay</li>
          <li>Combine gaming with traditional practice for balanced learning</li>
        </ul>

        <p>The future of mathematics education is bright, and games are playing an increasingly important role in helping students develop strong mathematical foundations that will serve them throughout their academic journey.</p>
      `,
      category: "research",
      readTime: "6 min",
      image: "https://placehold.co/600x400/e2f0fb/1a365d?text=Math+Games",
      tags: ["mathematics", "research", "cognitive-science", "education-technology"]
    },
    {
      id: 2,
      title: "5 Educational Games That Make Reading Fun",
      date: "May 8, 2023",
      author: "Michael Williams",
      excerpt: "Discover five engaging games that transform reading from a chore into an adventure. These games help children develop phonics, comprehension, and vocabulary skills while having fun.",
      content: `
        <p>Reading is the foundation of all learning, yet many children struggle to develop a love for books and written words. Educational games offer a solution by transforming reading practice into an engaging, interactive experience that builds essential literacy skills naturally.</p>

        <h3>1. Word Wizards - Spelling Adventure</h3>
        <p>This magical spelling game takes children through enchanted kingdoms where they must cast spells using correctly spelled words. As players progress, they encounter increasingly challenging vocabulary while developing:</p>
        <ul>
          <li>Phonemic awareness</li>
          <li>Spelling patterns recognition</li>
          <li>Vocabulary expansion</li>
          <li>Visual word memory</li>
        </ul>

        <h3>2. Story Builder Interactive</h3>
        <p>Children become authors in this creative game, building stories by selecting words, characters, and plot elements. This game strengthens:</p>
        <ul>
          <li>Reading comprehension</li>
          <li>Narrative structure understanding</li>
          <li>Creative writing skills</li>
          <li>Vocabulary in context</li>
        </ul>

        <h3>3. Phonics Detective</h3>
        <p>Young readers solve mysteries by identifying sounds and letter patterns. Each case builds fundamental phonics skills through:</p>
        <ul>
          <li>Sound-symbol relationships</li>
          <li>Blending and segmenting</li>
          <li>Rhyme recognition</li>
          <li>Letter pattern identification</li>
        </ul>

        <h3>4. Reading Comprehension Quest</h3>
        <p>Adventure-based reading where children must understand passages to progress through levels. Features include:</p>
        <ul>
          <li>Main idea identification</li>
          <li>Detail recognition</li>
          <li>Inference making</li>
          <li>Critical thinking development</li>
        </ul>

        <h3>5. Vocabulary Village</h3>
        <p>A virtual world where children learn new words through contextual gameplay, building:</p>
        <ul>
          <li>Word meaning understanding</li>
          <li>Context clue usage</li>
          <li>Synonym and antonym recognition</li>
          <li>Academic vocabulary</li>
        </ul>

        <h3>Why These Games Work</h3>
        <p>Research shows that children who engage with reading games for just 20 minutes daily show significant improvements in reading fluency and comprehension. The key is the combination of repetition, immediate feedback, and intrinsic motivation that games provide.</p>

        <p>When implementing these games, encourage children to read aloud, discuss what they've learned, and connect game experiences to traditional reading activities for maximum benefit.</p>
      `,
      category: "teaching-tips",
      readTime: "4 min",
      image: "https://placehold.co/600x400/f0e6fa/4a1d96?text=Reading+Games",
      tags: ["reading", "literacy", "phonics", "vocabulary", "comprehension"]
    },
    {
      id: 3,
      title: "Supporting Remote Learning Through Educational Games",
      date: "April 30, 2023",
      author: "Sarah Parker, M.Ed.",
      excerpt: "As remote and hybrid learning models continue to evolve, educational games offer a powerful tool for engagement and assessment. Learn how to implement effective game-based strategies in virtual classrooms.",
      content: `
        <p>The shift to remote and hybrid learning has transformed education, presenting both challenges and opportunities. Educational games have emerged as a powerful solution for maintaining student engagement, providing meaningful assessment, and ensuring learning continuity across different environments.</p>

        <h3>The Remote Learning Challenge</h3>
        <p>Remote learning presents unique obstacles:</p>
        <ul>
          <li>Reduced face-to-face interaction</li>
          <li>Increased screen fatigue</li>
          <li>Difficulty maintaining attention</li>
          <li>Limited hands-on activities</li>
          <li>Assessment challenges</li>
        </ul>

        <h3>How Educational Games Address These Challenges</h3>
        <p><strong>Enhanced Engagement:</strong> Games naturally capture and maintain student attention through interactive storytelling, rewards systems, and immediate feedback mechanisms.</p>

        <p><strong>Self-Paced Learning:</strong> Students can progress through educational games at their own pace, allowing for personalized learning experiences that accommodate different learning styles and speeds.</p>

        <p><strong>Built-in Assessment:</strong> Games provide real-time data on student performance, allowing teachers to identify learning gaps and adjust instruction accordingly.</p>

        <h3>Implementation Strategies</h3>
        <p><strong>Synchronous Gaming Sessions:</strong></p>
        <ul>
          <li>Host virtual game tournaments</li>
          <li>Use games for warm-up activities</li>
          <li>Facilitate collaborative problem-solving</li>
          <li>Conduct live game-based reviews</li>
        </ul>

        <p><strong>Asynchronous Game Assignments:</strong></p>
        <ul>
          <li>Assign specific games for homework</li>
          <li>Create learning pathways through game sequences</li>
          <li>Use games for remediation and enrichment</li>
          <li>Implement skill-building challenges</li>
        </ul>

        <h3>Parent Engagement Strategies</h3>
        <p>Successful remote learning requires strong parent partnerships:</p>
        <ul>
          <li>Provide parents with game guides and learning objectives</li>
          <li>Share progress reports and achievements</li>
          <li>Offer family game nights with educational focus</li>
          <li>Create communication channels for questions and support</li>
        </ul>

        <h3>Technology Considerations</h3>
        <p>Ensure all students can access games by:</p>
        <ul>
          <li>Choosing browser-based games that work on various devices</li>
          <li>Providing offline alternatives when possible</li>
          <li>Offering technical support for families</li>
          <li>Creating backup plans for technology failures</li>
        </ul>

        <p>Educational games are not just a temporary solution for remote learning – they represent a fundamental shift toward more engaging, personalized, and effective education that will continue to benefit students long after traditional classrooms fully reopen.</p>
      `,
      category: "remote-learning",
      readTime: "7 min",
      image: "https://placehold.co/600x400/e6f7ef/047857?text=Remote+Learning",
      tags: ["remote-learning", "educational-technology", "engagement", "assessment", "virtual-classroom"]
    },
    {
      id: 4,
      title: "The Role of Feedback in Educational Gaming",
      date: "April 22, 2023",
      author: "Dr. Robert Chen",
      excerpt: "Immediate feedback is one of the most powerful aspects of educational games. This article examines how different types of feedback mechanisms support learning and motivation.",
      content: `
        <p>Feedback is the cornerstone of effective learning, and educational games excel at providing immediate, meaningful responses to student actions. Understanding different types of feedback and their impact can help educators and parents maximize the learning potential of educational games.</p>

        <h3>Types of Feedback in Educational Games</h3>
        <p><strong>Immediate Corrective Feedback:</strong> Games provide instant responses to student answers, allowing for immediate error correction and reinforcement of correct responses.</p>

        <p><strong>Motivational Feedback:</strong> Points, badges, and celebrations maintain student engagement and build confidence through positive reinforcement.</p>

        <p><strong>Adaptive Feedback:</strong> Smart games adjust difficulty and provide personalized hints based on individual student performance patterns.</p>

        <h3>The Science of Feedback</h3>
        <p>Research demonstrates that effective feedback must be:</p>
        <ul>
          <li>Timely - provided immediately after the learning action</li>
          <li>Specific - clearly indicating what was correct or incorrect</li>
          <li>Actionable - providing guidance for improvement</li>
          <li>Encouraging - maintaining motivation and engagement</li>
        </ul>

        <h3>Implementing Effective Feedback</h3>
        <p>Educators should look for games that provide varied feedback types and use this data to inform instruction and support individual student needs.</p>
      `,
      category: "research",
      readTime: "8 min",
      image: "https://placehold.co/600x400/fef3c7/92400e?text=Learning+Feedback",
      tags: ["feedback", "learning-theory", "motivation", "assessment", "cognitive-science"]
    },
    {
      id: 5,
      title: "Creating an Inclusive Game-Based Classroom",
      date: "April 15, 2023",
      author: "Jessica Martinez",
      excerpt: "Educational games should be accessible to all learners. Discover strategies for creating an inclusive environment where every student can benefit from game-based learning.",
      content: `
        <p>Inclusive education ensures that all students, regardless of their abilities, backgrounds, or learning differences, can participate meaningfully in learning experiences. Educational games offer unique opportunities to create inclusive classrooms when implemented thoughtfully.</p>

        <h3>Universal Design Principles</h3>
        <p>When selecting educational games, consider:</p>
        <ul>
          <li>Multiple input methods (keyboard, mouse, touch)</li>
          <li>Adjustable audio and visual settings</li>
          <li>Closed captioning and text-to-speech options</li>
          <li>Customizable difficulty levels</li>
          <li>Cultural relevance and representation</li>
        </ul>

        <h3>Supporting Diverse Learning Needs</h3>
        <p>Games can accommodate various learning styles and challenges by providing multiple pathways to success and allowing students to progress at their own pace.</p>
      `,
      category: "teaching-tips",
      readTime: "5 min",
      image: "https://placehold.co/600x400/fee2e2/991b1b?text=Inclusive+Education",
      tags: ["inclusion", "accessibility", "universal-design", "differentiation", "equity"]
    },
    {
      id: 6,
      title: "Balancing Screen Time: A Parent's Guide",
      date: "April 8, 2023",
      author: "David Wilson",
      excerpt: "As digital learning becomes more prevalent, parents often wonder about appropriate screen time. This guide offers practical advice for balancing educational technology with other activities.",
      content: `
        <p>Finding the right balance between educational screen time and other activities is crucial for healthy child development. This guide helps parents make informed decisions about digital learning tools.</p>

        <h3>Age-Appropriate Guidelines</h3>
        <p>Consider these recommendations:</p>
        <ul>
          <li>Ages 2-5: 1 hour of high-quality educational content</li>
          <li>Ages 6+: Consistent limits based on individual needs</li>
          <li>Regular breaks every 20-30 minutes</li>
          <li>Balance with physical activity and social interaction</li>
        </ul>

        <h3>Quality Over Quantity</h3>
        <p>Focus on educational value, interactive engagement, and alignment with learning goals rather than just time limits.</p>
      `,
      category: "parents",
      readTime: "6 min",
      image: "https://placehold.co/600x400/e0f2fe/0369a1?text=Screen+Time",
      tags: ["screen-time", "digital-wellness", "parenting", "health", "balance"]
    },
    {
      id: 7,
      title: "The Future of Educational Gaming: AI and Adaptive Learning",
      date: "March 30, 2023",
      author: "Dr. Priya Sharma",
      excerpt: "Artificial intelligence is revolutionizing educational games by creating truly personalized learning experiences. Explore the cutting-edge developments in adaptive educational technology.",
      content: `
        <p>Artificial intelligence is transforming educational gaming, creating unprecedented opportunities for personalized learning that adapts to each student's unique needs, learning style, and pace.</p>

        <h3>How AI Enhances Educational Games</h3>
        <p>AI-powered games can analyze student performance in real-time, identifying knowledge gaps and adjusting content delivery accordingly. This creates truly individualized learning experiences.</p>

        <h3>Adaptive Learning Technologies</h3>
        <ul>
          <li>Dynamic difficulty adjustment based on performance</li>
          <li>Personalized content recommendations</li>
          <li>Predictive analytics for learning outcomes</li>
          <li>Natural language processing for better interaction</li>
        </ul>

        <p>The future of educational gaming lies in creating intelligent tutoring systems that can provide the same level of personalized attention as a human tutor, available 24/7 to support student learning.</p>
      `,
      category: "technology",
      readTime: "9 min",
      image: "https://placehold.co/600x400/f3e8ff/6b21a8?text=AI+Learning",
      tags: ["artificial-intelligence", "adaptive-learning", "personalization", "future-education", "technology"]
    },
    {
      id: 8,
      title: "Assessing Learning Through Game Performance",
      date: "March 23, 2023",
      author: "Thomas Brooks, Ed.D.",
      excerpt: "Game-based assessment offers new ways to measure student understanding. Learn how to interpret game performance data and use it to inform instructional decisions.",
      content: `
        <p>Educational games provide rich data about student learning that goes far beyond traditional assessments, offering insights into problem-solving processes, persistence, and conceptual understanding.</p>

        <h3>Types of Game-Based Assessment Data</h3>
        <ul>
          <li>Response accuracy and speed</li>
          <li>Strategy selection and adaptation</li>
          <li>Persistence and effort indicators</li>
          <li>Collaboration and communication skills</li>
        </ul>

        <h3>Using Data to Inform Instruction</h3>
        <p>Game data can help teachers identify students who need additional support, recognize advanced learners ready for challenges, and adjust teaching strategies based on learning patterns.</p>
      `,
      category: "teaching-tips",
      readTime: "7 min",
      image: "https://placehold.co/600x400/fef9c3/a16207?text=Game+Assessment",
      tags: ["assessment", "data-analysis", "formative-assessment", "learning-analytics", "instruction"]
    },
    {
      id: 9,
      title: "Collaborative vs. Competitive Games in the Classroom",
      date: "March 15, 2023",
      author: "Olivia Garcia",
      excerpt: "Both collaborative and competitive games have a place in education. This article examines when to use each approach and how to maximize their educational benefits.",
      content: `
        <p>Understanding when to use collaborative versus competitive gaming approaches can significantly impact student engagement, learning outcomes, and classroom dynamics.</p>

        <h3>Benefits of Collaborative Gaming</h3>
        <ul>
          <li>Builds teamwork and communication skills</li>
          <li>Encourages peer learning and support</li>
          <li>Reduces anxiety for struggling students</li>
          <li>Develops problem-solving strategies</li>
        </ul>

        <h3>When to Use Competitive Games</h3>
        <ul>
          <li>To motivate high-achieving students</li>
          <li>For skill practice and fluency building</li>
          <li>To add excitement to review sessions</li>
          <li>When students enjoy friendly competition</li>
        </ul>

        <p>The key is matching the game type to your learning objectives and student needs.</p>
      `,
      category: "teaching-tips",
      readTime: "5 min",
      image: "https://placehold.co/600x400/dcfce7/166534?text=Game+Dynamics",
      tags: ["collaboration", "competition", "classroom-management", "engagement", "social-learning"]
    },
    {
      id: 10,
      title: "How Parents Can Support Learning Through Games at Home",
      date: "March 8, 2023",
      author: "Amanda Johnson",
      excerpt: "Educational games aren't just for the classroom. Discover how parents can extend learning at home through thoughtful game selection and participation.",
      content: `
        <p>Parents play a crucial role in supporting their child's educational gaming experience at home. With the right approach, educational games can become powerful tools for family learning and bonding.</p>

        <h3>Selecting Quality Educational Games</h3>
        <ul>
          <li>Look for age-appropriate content and difficulty levels</li>
          <li>Choose games aligned with school curriculum</li>
          <li>Read reviews and educational evaluations</li>
          <li>Consider your child's interests and learning style</li>
        </ul>

        <h3>Active Participation Strategies</h3>
        <ul>
          <li>Play games together as a family activity</li>
          <li>Ask questions about strategies and thinking</li>
          <li>Celebrate achievements and progress</li>
          <li>Connect game learning to real-world situations</li>
        </ul>

        <p>Remember, the goal is to make learning enjoyable while building strong academic foundations.</p>
      `,
      category: "parents",
      readTime: "4 min",
      image: "https://placehold.co/600x400/ffedd5/9a3412?text=Home+Learning",
      tags: ["parent-involvement", "home-learning", "family-engagement", "game-selection", "support"]
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'research', name: 'Research & Studies' },
    { id: 'teaching-tips', name: 'Teaching Tips' },
    { id: 'remote-learning', name: 'Remote Learning' },
    { id: 'technology', name: 'Technology Trends' },
    { id: 'parents', name: 'For Parents' }
  ];
  
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Educational Gaming Blog | Tips, Research & Trends</title>
        <meta name="description" content="Explore articles about educational gaming, learning strategies, and the latest research on game-based education for PreK-6 students." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3 text-primary">Educational Gaming Blog</h1>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Insights, research, and practical tips on using educational games to enhance learning for PreK-6 students.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-primary rounded-full capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime} read</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-grade3 hover:text-primary transition">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-sm font-medium text-gray-700">{post.author}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${post.id}`}>
                    <div className="text-primary font-medium hover:underline inline-flex items-center cursor-pointer">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Subscribe to Our Newsletter</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Stay updated with the latest research, teaching strategies, and educational game recommendations.
          </p>
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;