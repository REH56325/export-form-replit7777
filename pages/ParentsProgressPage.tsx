import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useUser } from '@/contexts/UserContext';

const ParentsProgressPage = () => {
  const { user } = useUser();
  const [selectedChild, setSelectedChild] = useState(0);
  
  // Mock data for demo purposes - in production this would come from API
  const children = [
    { id: 1, name: 'Alex', grade: 'Grade 2', avatar: '👧' },
    { id: 2, name: 'Jamie', grade: 'Grade 4', avatar: '👦' }
  ];
  
  const subjectProgress = [
    { subject: 'Math', completed: 68, total: 100, color: 'bg-grade2' },
    { subject: 'Reading', completed: 82, total: 100, color: 'bg-grade3' },
    { subject: 'Science', completed: 45, total: 100, color: 'bg-grade4' },
    { subject: 'Social Studies', completed: 30, total: 100, color: 'bg-grade5' },
    { subject: 'Art', completed: 90, total: 100, color: 'bg-accent' }
  ];
  
  const recentActivity = [
    { id: 1, game: 'Math Wizards', date: '2023-05-24', score: 850, time: '15 min' },
    { id: 2, game: 'Word Builder', date: '2023-05-23', score: 720, time: '12 min' },
    { id: 3, game: 'Science Explorer', date: '2023-05-22', score: 650, time: '20 min' },
    { id: 4, game: 'Typing Adventure', date: '2023-05-21', score: 920, time: '18 min' },
    { id: 5, game: 'Geography Challenge', date: '2023-05-20', score: 780, time: '25 min' }
  ];
  
  const achievements = [
    { id: 1, name: 'Math Master', description: 'Completed 50 math games', date: '2023-05-15', icon: '🏆' },
    { id: 2, name: 'Reading Pro', description: 'Read 100 words per minute', date: '2023-05-10', icon: '📚' },
    { id: 3, name: 'Science Whiz', description: 'Completed all Grade 2 science games', date: '2023-05-05', icon: '🔬' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Track Your Child's Progress | Educational Gaming</title>
        <meta name="description" content="Monitor your child's learning journey with detailed progress reports, achievements, and activity tracking." />
      </Helmet>

      {!user ? (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-primary">Track Your Child's Progress</h1>
          <p className="mb-6">Please log in to view your child's progress and achievements.</p>
          <a href="/login" className="inline-block py-2 px-6 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition">
            Log In
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account yet? <a href="/signup" className="text-accent underline">Sign up</a> to start tracking your child's educational journey.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Learning Progress Dashboard</h1>
          
          <div className="flex flex-wrap -mx-4">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-grade2">Your Children</h2>
                
                <div className="space-y-3">
                  {children.map((child, index) => (
                    <button
                      key={child.id}
                      className={`w-full flex items-center p-3 rounded-md transition ${
                        selectedChild === index ? 'bg-blue-50 border-l-4 border-primary' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedChild(index)}
                    >
                      <span className="text-2xl mr-3">{child.avatar}</span>
                      <div className="text-left">
                        <div className="font-medium">{child.name}</div>
                        <div className="text-sm text-gray-600">{child.grade}</div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-3">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-accent hover:underline">Download Progress Report</a>
                    </li>
                    <li>
                      <a href="#" className="text-accent hover:underline">Set Learning Goals</a>
                    </li>
                    <li>
                      <a href="#" className="text-accent hover:underline">Manage Child Profile</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full lg:w-3/4 px-4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-grade2">
                    {children[selectedChild].name}'s Progress Overview
                  </h2>
                  <div className="text-sm text-gray-600">
                    Last updated: May 24, 2023
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24</div>
                    <div className="text-gray-700">Games Played</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">450</div>
                    <div className="text-gray-700">Total Minutes</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">12</div>
                    <div className="text-gray-700">Badges Earned</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Subject Progress</h3>
                <div className="space-y-4">
                  {subjectProgress.map(subject => (
                    <div key={subject.subject} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{subject.subject}</span>
                        <span>{subject.completed}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`${subject.color} h-2.5 rounded-full`} 
                          style={{ width: `${subject.completed}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-grade3">Recent Activity</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Game</th>
                          <th className="text-left py-2">Score</th>
                          <th className="text-left py-2">Time</th>
                          <th className="text-left py-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivity.map(activity => (
                          <tr key={activity.id} className="border-b">
                            <td className="py-2">{activity.game}</td>
                            <td className="py-2">{activity.score}</td>
                            <td className="py-2">{activity.time}</td>
                            <td className="py-2">{activity.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-grade4">Recent Achievements</h3>
                  
                  <div className="space-y-4">
                    {achievements.map(achievement => (
                      <div key={achievement.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="text-3xl mr-3">{achievement.icon}</div>
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                          <div className="text-xs text-gray-500 mt-1">Earned on {achievement.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-accent hover:underline">
                      View All Achievements
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-primary">Recommended Next Steps</h3>
                <p className="mb-4">
                  Based on {children[selectedChild].name}'s progress, here are some recommended activities:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Try "Fraction Fun" to improve math skills</li>
                  <li>Practice reading comprehension with "Story Explorer"</li>
                  <li>Complete the "Science Lab" series to boost science understanding</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentsProgressPage;