import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

interface TeacherResource {
  id: number;
  title: string;
  type: string;
  subject: string;
  grade: string;
  description: string;
  fileFormat: string;
  downloadUrl: string;
  previewImage: string;
  tags: string[];
  dateAdded: string;
}

const ClassroomToolsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Comprehensive teacher resources data
  const teacherResources: TeacherResource[] = [
    {
      id: 1,
      title: "Math Addition Worksheets - Single Digits",
      type: "worksheet",
      subject: "math",
      grade: "grade-1",
      description: "Practice worksheets for single-digit addition with visual aids and step-by-step examples.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/math-addition-grade1.pdf",
      previewImage: "https://placehold.co/300x400/e3f2fd/1976d2?text=Math+Worksheet",
      tags: ["addition", "basic-math", "visual-learning"],
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      title: "Phonics Sound Charts",
      type: "poster",
      subject: "english",
      grade: "prek",
      description: "Colorful phonics charts showing letter sounds with pictures and examples for classroom display.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/phonics-charts-prek.pdf",
      previewImage: "https://placehold.co/300x400/f3e5f5/7b1fa2?text=Phonics+Chart",
      tags: ["phonics", "alphabet", "reading-readiness"],
      dateAdded: "2024-01-12"
    },
    {
      id: 3,
      title: "Science Lab Safety Rules Poster",
      type: "poster",
      subject: "science",
      grade: "grade-3",
      description: "Essential laboratory safety rules and procedures for elementary science experiments.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/science-safety-grade3.pdf",
      previewImage: "https://placehold.co/300x400/e8f5e8/388e3c?text=Safety+Rules",
      tags: ["safety", "laboratory", "experiments"],
      dateAdded: "2024-01-10"
    },
    {
      id: 4,
      title: "Multiplication Tables Practice Cards",
      type: "flashcards",
      subject: "math",
      grade: "grade-3",
      description: "Printable multiplication flashcards for tables 1-12 with answers on the back.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/multiplication-cards-grade3.pdf",
      previewImage: "https://placehold.co/300x400/fff3e0/ff8f00?text=Flash+Cards",
      tags: ["multiplication", "memorization", "practice"],
      dateAdded: "2024-01-08"
    },
    {
      id: 5,
      title: "Reading Comprehension Questions Template",
      type: "template",
      subject: "english",
      grade: "grade-2",
      description: "Structured template for creating reading comprehension questions for any story or text.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/reading-template-grade2.pdf",
      previewImage: "https://placehold.co/300x400/f1f8e9/689f38?text=Reading+Template",
      tags: ["comprehension", "questions", "template"],
      dateAdded: "2024-01-05"
    },
    {
      id: 6,
      title: "Computer Basics Activity Sheet",
      type: "worksheet",
      subject: "computer",
      grade: "grade-4",
      description: "Introduction to computer parts, keyboard skills, and basic digital literacy concepts.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/computer-basics-grade4.pdf",
      previewImage: "https://placehold.co/300x400/e3f2fd/1565c0?text=Computer+Skills",
      tags: ["digital-literacy", "keyboard", "technology"],
      dateAdded: "2024-01-03"
    },
    {
      id: 7,
      title: "Art Color Wheel and Mixing Guide",
      type: "guide",
      subject: "art",
      grade: "grade-2",
      description: "Visual guide to primary and secondary colors with mixing instructions and activities.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/color-wheel-grade2.pdf",
      previewImage: "https://placehold.co/300x400/fce4ec/c2185b?text=Color+Wheel",
      tags: ["colors", "mixing", "creativity"],
      dateAdded: "2024-01-01"
    },
    {
      id: 8,
      title: "Critical Thinking Logic Puzzles",
      type: "worksheet",
      subject: "critical-thinking",
      grade: "grade-5",
      description: "Challenging logic puzzles and brain teasers to develop analytical thinking skills.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/logic-puzzles-grade5.pdf",
      previewImage: "https://placehold.co/300x400/f3e5f5/8e24aa?text=Logic+Puzzles",
      tags: ["logic", "problem-solving", "analysis"],
      dateAdded: "2023-12-28"
    },
    {
      id: 9,
      title: "Music Note Recognition Cards",
      type: "flashcards",
      subject: "music",
      grade: "grade-3",
      description: "Musical note flashcards for learning note names, values, and basic music theory.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/music-notes-grade3.pdf",
      previewImage: "https://placehold.co/300x400/fff3e0/f57c00?text=Music+Notes",
      tags: ["music-theory", "notes", "rhythm"],
      dateAdded: "2023-12-25"
    },
    {
      id: 10,
      title: "Geography World Map Activities",
      type: "worksheet",
      subject: "general-knowledge",
      grade: "grade-4",
      description: "Interactive world map activities covering continents, countries, and geographical features.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/geography-map-grade4.pdf",
      previewImage: "https://placehold.co/300x400/e0f2f1/00695c?text=World+Map",
      tags: ["geography", "continents", "countries"],
      dateAdded: "2023-12-22"
    },
    {
      id: 11,
      title: "Fraction Visual Learning Aids",
      type: "poster",
      subject: "math",
      grade: "grade-4",
      description: "Visual fraction representations using pie charts, bars, and real-world examples.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/fractions-visual-grade4.pdf",
      previewImage: "https://placehold.co/300x400/e3f2fd/1976d2?text=Fractions",
      tags: ["fractions", "visual-learning", "math-concepts"],
      dateAdded: "2023-12-20"
    },
    {
      id: 12,
      title: "Creative Writing Story Starters",
      type: "template",
      subject: "english",
      grade: "grade-5",
      description: "Engaging story prompts and writing templates to inspire creative writing assignments.",
      fileFormat: "PDF",
      downloadUrl: "/downloads/story-starters-grade5.pdf",
      previewImage: "https://placehold.co/300x400/f3e5f5/7b1fa2?text=Story+Writing",
      tags: ["creative-writing", "prompts", "storytelling"],
      dateAdded: "2023-12-18"
    }
  ];

  // Filter options
  const subjects = [
    { id: 'all', name: 'All Subjects', icon: '📚' },
    { id: 'math', name: 'Math', icon: '🔢' },
    { id: 'english', name: 'English', icon: '📝' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'computer', name: 'Computer', icon: '💻' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'critical-thinking', name: 'Critical Thinking', icon: '🧠' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'general-knowledge', name: 'General Knowledge', icon: '🌍' }
  ];

  const grades = [
    { id: 'all', name: 'All Grades' },
    { id: 'prek', name: 'PreK' },
    { id: 'kindergarten', name: 'Kindergarten' },
    { id: 'grade-1', name: 'Grade 1' },
    { id: 'grade-2', name: 'Grade 2' },
    { id: 'grade-3', name: 'Grade 3' },
    { id: 'grade-4', name: 'Grade 4' },
    { id: 'grade-5', name: 'Grade 5' },
    { id: 'grade-6', name: 'Grade 6' }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'worksheet', name: 'Worksheets' },
    { id: 'poster', name: 'Posters' },
    { id: 'flashcards', name: 'Flashcards' },
    { id: 'template', name: 'Templates' },
    { id: 'guide', name: 'Guides' }
  ];

  // Filter resources based on selected criteria
  const filteredResources = teacherResources.filter(resource => {
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'all' || resource.grade === selectedGrade;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSubject && matchesGrade && matchesType;
  });

  const handleDownload = (resource: TeacherResource) => {
    // In a real application, this would initiate the actual PDF download
    // For now, we'll show an alert indicating the download would start
    alert(`Downloading: ${resource.title}\nFile: ${resource.fileFormat}\nThis would start the PDF download in a real application.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Classroom Tools & Resources | Educational Gaming</title>
        <meta name="description" content="Download worksheets, posters, flashcards and teaching materials organized by subject and grade level." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Classroom Tools & Resources</h1>
          <p className="text-lg text-gray-600">Download printable teaching materials organized by subject and grade level</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                      selectedSubject === subject.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{subject.icon}</span>
                    <span className="truncate">{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Grade Level</label>
              <select 
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </select>
            </div>

            {/* Resource Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Resource Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {resourceTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedSubject !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary bg-opacity-10 text-primary">
                Subject: {subjects.find(s => s.id === selectedSubject)?.name}
                <button 
                  onClick={() => setSelectedSubject('all')}
                  className="ml-2 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
            {selectedGrade !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary bg-opacity-10 text-primary">
                Grade: {grades.find(g => g.id === selectedGrade)?.name}
                <button 
                  onClick={() => setSelectedGrade('all')}
                  className="ml-2 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary bg-opacity-10 text-primary">
                Type: {resourceTypes.find(t => t.id === selectedType)?.name}
                <button 
                  onClick={() => setSelectedType('all')}
                  className="ml-2 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters to find more resources.</p>
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedGrade('all');
                setSelectedType('all');
              }}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Resource Preview */}
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={resource.previewImage} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Resource Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${resource.subject === 'math' ? 'bg-blue-100 text-blue-800' :
                        resource.subject === 'english' ? 'bg-green-100 text-green-800' :
                        resource.subject === 'science' ? 'bg-purple-100 text-purple-800' :
                        resource.subject === 'computer' ? 'bg-gray-100 text-gray-800' :
                        resource.subject === 'art' ? 'bg-pink-100 text-pink-800' :
                        resource.subject === 'critical-thinking' ? 'bg-yellow-100 text-yellow-800' :
                        resource.subject === 'music' ? 'bg-red-100 text-red-800' :
                        'bg-teal-100 text-teal-800'}`}>
                      {resource.subject.replace('-', ' ')}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {resource.grade.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Resource Type and Format */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 capitalize">{resource.type}</span>
                    <span className="text-sm font-medium text-primary">{resource.fileFormat}</span>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(resource)}
                    className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Need Custom Resources?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Can't find exactly what you need? Our education specialists can create custom teaching materials tailored to your specific curriculum requirements.
          </p>
          <Link href="/contact">
            <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition">
              Request Custom Materials
            </button>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassroomToolsPage;