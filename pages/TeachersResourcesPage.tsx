import { useState } from 'react';
import { Helmet } from 'react-helmet';

interface Resource {
  id: number;
  title: string;
  type: string;
  description: string;
  fileType: string;
  gradeLevel: string[];
  subject: string[];
}

const TeachersResourcesPage = () => {
  const [activeType, setActiveType] = useState('all');
  const [activeGrade, setActiveGrade] = useState('all');
  const [activeSubject, setActiveSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const resources: Resource[] = [
    {
      id: 1,
      title: "Math Games Implementation Guide",
      type: "guide",
      description: "A comprehensive guide on how to effectively implement math games in your classroom curriculum.",
      fileType: "PDF",
      gradeLevel: ["All Grades"],
      subject: ["Math"]
    },
    {
      id: 2,
      title: "Reading Comprehension Activity Sheets",
      type: "worksheet",
      description: "Printable worksheets that complement our reading games with offline activities.",
      fileType: "PDF",
      gradeLevel: ["Grade 1", "Grade 2", "Grade 3"],
      subject: ["Reading"]
    },
    {
      id: 3,
      title: "Science Experiment Companion Guide",
      type: "guide",
      description: "Hands-on experiments that extend the learning from our science games into physical activities.",
      fileType: "PDF",
      gradeLevel: ["Grade 3", "Grade 4", "Grade 5"],
      subject: ["Science"]
    },
    {
      id: 4,
      title: "Game-Based Learning Research Summary",
      type: "research",
      description: "A summary of research on the effectiveness of game-based learning in elementary education.",
      fileType: "PDF",
      gradeLevel: ["All Grades"],
      subject: ["All Subjects"]
    },
    {
      id: 5,
      title: "Parent-Teacher Conference Templates",
      type: "template",
      description: "Templates for sharing student game progress and achievements during parent-teacher conferences.",
      fileType: "DOCX",
      gradeLevel: ["All Grades"],
      subject: ["All Subjects"]
    },
    {
      id: 6,
      title: "Math Skills Assessment Rubrics",
      type: "assessment",
      description: "Rubrics for assessing student math skills based on game performance data.",
      fileType: "PDF",
      gradeLevel: ["Grade K", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subject: ["Math"]
    },
    {
      id: 7,
      title: "Digital Citizenship Lesson Plan",
      type: "lesson-plan",
      description: "A lesson plan for teaching digital citizenship alongside educational gaming.",
      fileType: "PDF",
      gradeLevel: ["Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subject: ["Digital Literacy"]
    },
    {
      id: 8,
      title: "Game Integration Calendar",
      type: "template",
      description: "A planning calendar template for scheduling game activities throughout the school year.",
      fileType: "XLSX",
      gradeLevel: ["All Grades"],
      subject: ["All Subjects"]
    },
    {
      id: 9,
      title: "Vocabulary Building Cards",
      type: "printable",
      description: "Printable cards that reinforce vocabulary words featured in our language games.",
      fileType: "PDF",
      gradeLevel: ["Grade K", "Grade 1", "Grade 2"],
      subject: ["Reading", "Language Arts"]
    },
    {
      id: 10,
      title: "Student Progress Tracking Sheet",
      type: "template",
      description: "A template for manually tracking student progress when digital tracking is unavailable.",
      fileType: "PDF",
      gradeLevel: ["All Grades"],
      subject: ["All Subjects"]
    },
    {
      id: 11,
      title: "Math Games Correlation to Standards",
      type: "reference",
      description: "A comprehensive document showing how our math games align with common core standards.",
      fileType: "PDF",
      gradeLevel: ["Grade K", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subject: ["Math"]
    },
    {
      id: 12,
      title: "Interactive Whiteboard Activities",
      type: "lesson-plan",
      description: "Whole-class activities designed for use with interactive whiteboards that complement our games.",
      fileType: "PDF",
      gradeLevel: ["All Grades"],
      subject: ["All Subjects"]
    }
  ];
  
  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'guide', name: 'Implementation Guides' },
    { id: 'worksheet', name: 'Worksheets' },
    { id: 'assessment', name: 'Assessments' },
    { id: 'lesson-plan', name: 'Lesson Plans' },
    { id: 'template', name: 'Templates' },
    { id: 'research', name: 'Research' },
    { id: 'printable', name: 'Printables' },
    { id: 'reference', name: 'Reference Materials' }
  ];
  
  const grades = [
    { id: 'all', name: 'All Grades' },
    { id: 'Grade K', name: 'Kindergarten' },
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
    { id: 'Language Arts', name: 'Language Arts' },
    { id: 'Digital Literacy', name: 'Digital Literacy' }
  ];
  
  const filteredResources = resources.filter(resource => {
    const matchesType = activeType === 'all' || resource.type === activeType;
    const matchesGrade = activeGrade === 'all' || resource.gradeLevel.includes(activeGrade) || resource.gradeLevel.includes('All Grades');
    const matchesSubject = activeSubject === 'all' || resource.subject.includes(activeSubject) || resource.subject.includes('All Subjects');
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesGrade && matchesSubject && matchesSearch;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Teacher Resources | Educational Gaming</title>
        <meta name="description" content="Access worksheets, lesson plans, and implementation guides to enhance your classroom with educational games." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Teacher Resources</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-grade2">Supplementary Materials for Educators</h2>
          
          <p className="mb-8">
            Our collection of downloadable resources is designed to help you maximize the educational 
            impact of our games in your classroom. Use these materials to extend learning, assess progress, 
            and integrate game-based learning into your curriculum.
          </p>
          
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Resource Type:</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Grade Level:</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={activeGrade}
                onChange={(e) => setActiveGrade(e.target.value)}
              >
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subject:</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className={`p-4 ${
                    resource.type === 'guide' ? 'bg-primary' : 
                    resource.type === 'worksheet' ? 'bg-grade2' : 
                    resource.type === 'assessment' ? 'bg-grade3' : 
                    resource.type === 'lesson-plan' ? 'bg-grade4' : 
                    resource.type === 'template' ? 'bg-grade5' : 
                    resource.type === 'research' ? 'bg-purple-600' : 
                    resource.type === 'printable' ? 'bg-green-600' : 
                    'bg-accent'
                  } text-white`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold truncate">{resource.title}</h3>
                      <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{resource.fileType}</span>
                    </div>
                    <div className="mt-2 text-sm capitalize">
                      {resource.type.replace('-', ' ')}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 mb-4 h-16 overflow-hidden">{resource.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm">Grade Levels:</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.gradeLevel.map((grade, index) => (
                          <span key={index} className="bg-blue-50 text-primary text-xs px-2 py-1 rounded">
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm">Subjects:</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.subject.map((subj, index) => (
                          <span key={index} className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded">
                            {subj}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-right">
                      <button className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Resource
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Request Custom Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Can't find what you're looking for? Our team of curriculum specialists can create custom
                resources tailored to your specific classroom needs and curriculum requirements.
              </p>
              <p className="mb-4">
                Whether you need specialized worksheets, assessment tools, or implementation guides,
                we're here to support your unique educational goals.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Grade-specific materials</li>
                <li>Subject-focused resources</li>
                <li>Special education adaptations</li>
                <li>Standards-aligned assessments</li>
                <li>Specialized implementation guides</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Resource Request Form</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resource Type Needed</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Please select...</option>
                    <option>Worksheet</option>
                    <option>Lesson Plan</option>
                    <option>Assessment</option>
                    <option>Implementation Guide</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Grade Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Please select...</option>
                    <option>Kindergarten</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                    <option>Multiple grades</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Please select...</option>
                    <option>Math</option>
                    <option>Reading</option>
                    <option>Science</option>
                    <option>Social Studies</option>
                    <option>Language Arts</option>
                    <option>Multiple subjects</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description of Need</label>
                  <textarea 
                    rows={4} 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Please describe what you're looking for..."
                  ></textarea>
                </div>
                <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Professional Development Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="w-16 h-16 bg-grade3 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Step-by-step video guides on implementing our games in your classroom.
              </p>
              <a href="#" className="text-primary hover:underline text-sm font-medium">
                View Tutorials
              </a>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="w-16 h-16 bg-grade4 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Webinars</h3>
              <p className="text-gray-600 mb-4">
                Live and recorded webinars on educational gaming best practices.
              </p>
              <a href="#" className="text-primary hover:underline text-sm font-medium">
                Register for Webinars
              </a>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="w-16 h-16 bg-grade5 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Teacher Community</h3>
              <p className="text-gray-600 mb-4">
                Join our educator community to share ideas and best practices.
              </p>
              <a href="#" className="text-primary hover:underline text-sm font-medium">
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersResourcesPage;