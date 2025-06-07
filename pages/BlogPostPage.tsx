import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet';

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

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Blog posts data (same as in BlogPage)
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
    }
    // Add more blog posts as needed...
  ];

  useEffect(() => {
    if (id) {
      const foundPost = blogPosts.find(post => post.id === parseInt(id));
      setPost(foundPost || null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.title} | Educational Gaming Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/blog">
              <button className="inline-flex items-center text-primary hover:underline mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </button>
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} read</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary bg-opacity-10 text-primary capitalize">
                {post.category.replace('-', ' ')}
              </span>
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Bio */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3">About the Author</h3>
            <div className="flex items-start">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{post.author}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Educational gaming expert and researcher focused on improving learning outcomes through innovative technology.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">{relatedPost.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{relatedPost.excerpt.substring(0, 100)}...</p>
                      <span className="text-primary text-sm font-medium">Read more →</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;