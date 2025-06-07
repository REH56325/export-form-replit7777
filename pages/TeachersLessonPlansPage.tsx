import { useState } from 'react';
import { Helmet } from 'react-helmet';

interface LessonPlan {
  id: number;
  title: string;
  gradeLevel: string;
  subject: string;
  duration: string;
  description: string;
  objectives: string[];
  materials: string[];
  relatedGames: string[];
}

const TeachersLessonPlansPage = () => {
  const [activeGrade, setActiveGrade] = useState('all');
  const [activeSubject, setActiveSubject] = useState('all');
  
  const lessonPlans: LessonPlan[] = [
    {
      id: 1,
      title: "Number Recognition and Counting",
      gradeLevel: "PreK",
      subject: "Math",
      duration: "30 minutes",
      description: "Help students recognize numbers 1-10 and practice counting objects.",
      objectives: [
        "Identify numbers 1-10",
        "Count objects up to 10",
        "Match quantities to numerals"
      ],
      materials: [
        "Number Wizards game",
        "Printable number cards",
        "Counting manipulatives"
      ],
      relatedGames: ["Number Wizards", "Counting Farm", "Number Hop"]
    },
    {
      id: 2,
      title: "Letter Recognition: A-Z Adventure",
      gradeLevel: "PreK",
      subject: "Reading",
      duration: "25 minutes",
      description: "Students will learn to recognize uppercase and lowercase letters through interactive games.",
      objectives: [
        "Identify uppercase and lowercase letters",
        "Associate letters with their sounds",
        "Recognize letters in different contexts"
      ],
      materials: [
        "Alphabet Heroes game",
        "Letter flashcards",
        "Alphabet song recording"
      ],
      relatedGames: ["Alphabet Heroes", "Letter Land", "Sound Safari"]
    },
    {
      id: 3,
      title: "Addition Strategies with Numbers to 20",
      gradeLevel: "Grade 1",
      subject: "Math",
      duration: "45 minutes",
      description: "Students will learn and practice different strategies for adding numbers up to 20.",
      objectives: [
        "Use counting on strategy for addition",
        "Apply making tens strategy",
        "Solve addition problems within 20"
      ],
      materials: [
        "Math Wizards game",
        "Number line",
        "Ten-frame worksheets"
      ],
      relatedGames: ["Math Wizards", "Addition Action", "Number Ninjas"]
    },
    {
      id: 4,
      title: "CVC Words and Phonics Patterns",
      gradeLevel: "Grade 1",
      subject: "Reading",
      duration: "40 minutes",
      description: "Help students decode and spell consonant-vowel-consonant (CVC) words.",
      objectives: [
        "Identify and blend CVC word patterns",
        "Decode simple CVC words",
        "Spell CVC words correctly"
      ],
      materials: [
        "Word Wizards game",
        "CVC word cards",
        "Letter tiles"
      ],
      relatedGames: ["Word Wizards", "Phonics Fun", "Reading Rapids"]
    },
    {
      id: 5,
      title: "Place Value: Tens and Ones",
      gradeLevel: "Grade 2",
      subject: "Math",
      duration: "50 minutes",
      description: "Students will understand place value concepts for numbers up to 100.",
      objectives: [
        "Identify tens and ones in two-digit numbers",
        "Represent numbers using base-ten blocks",
        "Compare two-digit numbers using place value"
      ],
      materials: [
        "Place Value Explorers game",
        "Base-ten blocks",
        "Place value charts"
      ],
      relatedGames: ["Place Value Explorers", "Number Lab", "Digit Detectives"]
    },
    {
      id: 6,
      title: "Life Cycles of Plants and Animals",
      gradeLevel: "Grade 2",
      subject: "Science",
      duration: "60 minutes",
      description: "Explore the different stages in plant and animal life cycles.",
      objectives: [
        "Identify stages in plant life cycles",
        "Describe animal life cycles",
        "Compare different life cycles"
      ],
      materials: [
        "Life Cycle Explorer game",
        "Life cycle diagram cards",
        "Plant growing materials"
      ],
      relatedGames: ["Life Cycle Explorer", "Science Quest", "Nature Detective"]
    },
    {
      id: 7,
      title: "Multiplication Strategies with Arrays",
      gradeLevel: "Grade 3",
      subject: "Math",
      duration: "55 minutes",
      description: "Students will use arrays to understand and solve multiplication problems.",
      objectives: [
        "Represent multiplication using arrays",
        "Solve multiplication problems using arrays",
        "Connect arrays to the commutative property"
      ],
      materials: [
        "Multiplication Mastery game",
        "Grid paper",
        "Counters for building arrays"
      ],
      relatedGames: ["Multiplication Mastery", "Array Builder", "Times Tables Challenge"]
    },
    {
      id: 8,
      title: "Reading Comprehension: Main Idea and Details",
      gradeLevel: "Grade 3",
      subject: "Reading",
      duration: "45 minutes",
      description: "Help students identify the main idea and supporting details in texts.",
      objectives: [
        "Identify the main idea in a paragraph",
        "Distinguish between main ideas and details",
        "Support main ideas with text evidence"
      ],
      materials: [
        "Reading Detective game",
        "Short passages",
        "Graphic organizers"
      ],
      relatedGames: ["Reading Detective", "Story Explorer", "Comprehension Quest"]
    },
    {
      id: 9,
      title: "Fractions on a Number Line",
      gradeLevel: "Grade 4",
      subject: "Math",
      duration: "50 minutes",
      description: "Students will represent and compare fractions using number lines.",
      objectives: [
        "Locate fractions on a number line",
        "Compare fractions using a number line",
        "Identify equivalent fractions"
      ],
      materials: [
        "Fraction Explorer game",
        "Number line templates",
        "Fraction strips"
      ],
      relatedGames: ["Fraction Explorer", "Number Line Jumper", "Fraction Wars"]
    },
    {
      id: 10,
      title: "Earth's Systems and Interactions",
      gradeLevel: "Grade 4",
      subject: "Science",
      duration: "60 minutes",
      description: "Explore the interconnected systems of Earth: geosphere, hydrosphere, atmosphere, and biosphere.",
      objectives: [
        "Identify Earth's major systems",
        "Describe interactions between systems",
        "Explain how changes in one system affect others"
      ],
      materials: [
        "Earth Systems Explorer game",
        "System interaction cards",
        "Earth model diagram"
      ],
      relatedGames: ["Earth Systems Explorer", "Planet Protector", "Science World"]
    },
    {
      id: 11,
      title: "Decimal Operations and Place Value",
      gradeLevel: "Grade 5",
      subject: "Math",
      duration: "55 minutes",
      description: "Students will add, subtract, and multiply decimals using place value strategies.",
      objectives: [
        "Add and subtract decimals to hundredths",
        "Multiply decimals by whole numbers",
        "Explain decimal operations using place value"
      ],
      materials: [
        "Decimal Detective game",
        "Place value charts",
        "Base-ten decimal models"
      ],
      relatedGames: ["Decimal Detective", "Math Masters", "Number Crunchers"]
    },
    {
      id: 12,
      title: "Types of Energy and Energy Transformations",
      gradeLevel: "Grade 5",
      subject: "Science",
      duration: "65 minutes",
      description: "Investigate different forms of energy and how energy transforms from one form to another.",
      objectives: [
        "Identify different forms of energy",
        "Describe energy transformations",
        "Design a simple energy transformation model"
      ],
      materials: [
        "Energy Explorer game",
        "Energy transformation cards",
        "Simple materials for demonstrations"
      ],
      relatedGames: ["Energy Explorer", "Science Lab", "Physics Fun"]
    }
  ];
  
  const grades = [
    { id: 'all', name: 'All Grades' },
    { id: 'PreK', name: 'PreK' },
    { id: 'Grade 1', name: 'Grade 1' },
    { id: 'Grade 2', name: 'Grade 2' },
    { id: 'Grade 3', name: 'Grade 3' },
    { id: 'Grade 4', name: 'Grade 4' },
    { id: 'Grade 5', name: 'Grade 5' },
    { id: 'Grade 6', name: 'Grade 6' }
  ];
  
  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'Math', name: 'Math' },
    { id: 'Reading', name: 'Reading' },
    { id: 'Science', name: 'Science' },
    { id: 'Social Studies', name: 'Social Studies' },
    { id: 'Art', name: 'Art' }
  ];
  
  const filteredLessonPlans = lessonPlans.filter(plan => {
    const matchesGrade = activeGrade === 'all' || plan.gradeLevel === activeGrade;
    const matchesSubject = activeSubject === 'all' || plan.subject === activeSubject;
    
    return matchesGrade && matchesSubject;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Lesson Plans for Teachers | Educational Gaming</title>
        <meta name="description" content="Access curriculum-aligned lesson plans that integrate educational games for PreK-6 classrooms." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Lesson Plans</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade2">Curriculum-Aligned Lesson Plans</h2>
          
          <p className="mb-8">
            Our lesson plans are designed by experienced educators to integrate seamlessly with our educational games 
            and align with grade-level standards. Each plan includes clear objectives, detailed instructions, 
            and suggestions for differentiation and assessment.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-2">Filter by Grade:</label>
              <div className="flex flex-wrap gap-2">
                {grades.map(grade => (
                  <button
                    key={grade.id}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      activeGrade === grade.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveGrade(grade.id)}
                  >
                    {grade.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-2">Filter by Subject:</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      activeSubject === subject.id 
                        ? 'bg-grade3 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveSubject(subject.id)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredLessonPlans.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No lesson plans found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredLessonPlans.map(plan => (
                <div key={plan.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className={`p-4 ${
                    plan.subject === 'Math' ? 'bg-grade2' : 
                    plan.subject === 'Reading' ? 'bg-grade3' : 
                    plan.subject === 'Science' ? 'bg-grade4' : 
                    plan.subject === 'Social Studies' ? 'bg-grade5' : 
                    'bg-accent'
                  } text-white`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{plan.title}</h3>
                      <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{plan.gradeLevel}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span>{plan.subject}</span>
                      <span>{plan.duration}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Learning Objectives:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        {plan.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Materials Needed:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        {plan.materials.map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Related Games:</h4>
                      <div className="flex flex-wrap gap-2">
                        {plan.relatedGames.map((game, index) => (
                          <span key={index} className="bg-blue-50 text-primary text-xs px-2 py-1 rounded">
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-right">
                      <button className="text-primary hover:underline text-sm font-medium">
                        View Full Lesson Plan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 text-center mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Need Custom Lesson Plans?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our team of curriculum specialists can create custom lesson plans tailored to your specific classroom needs.
          </p>
          <a 
            href="/contact" 
            className="inline-block py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition"
          >
            Request Custom Plans
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">How to Use Our Lesson Plans</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-grade2 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Select a Plan</h3>
              <p className="text-gray-600">
                Browse our collection of lesson plans filtered by grade level and subject to find what fits your curriculum.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-grade3 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Prepare Materials</h3>
              <p className="text-gray-600">
                Gather the necessary materials, including setting up the games on student devices or your interactive whiteboard.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-grade4 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Implement & Assess</h3>
              <p className="text-gray-600">
                Follow the step-by-step instructions and use the built-in assessment tools to measure student learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersLessonPlansPage;