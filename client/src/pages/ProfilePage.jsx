import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Edit, Trophy, Book, Trash2 } from 'lucide-react';

// Mock data for demonstration
const user = {
  username: 'quizmaster123',
  email: 'quizmaster@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  joinDate: '2023-01-15',
  bio: 'Passionate about creating and taking quizzes! Always learning and sharing knowledge.',
  quizzesCreated: [
    { id: 1, title: 'History Trivia', plays: 150 },
    { id: 2, title: 'Science Quiz', plays: 89 },
    { id: 3, title: 'Pop Culture Challenge', plays: 203 },
  ],
  quizzesTaken: [
    { id: 4, title: 'Geography Explorer', score: '8/10', date: '2023-06-10' },
    { id: 5, title: 'Math Wizardry', score: '7/10', date: '2023-06-08' },
    { id: 6, title: 'Literature Legends', score: '9/10', date: '2023-06-05' },
  ],
};

function ProfilePage() {
  const navigate = useNavigate();

  const handleDeleteQuiz = (quizId) => {
    // Here you would typically send a request to your backend to delete the quiz
    console.log(`Deleting quiz with id: ${quizId}`);
    // Then update the local state or refetch the user data
  };

  return (
    <div className="container mt-16 mx-auto px-4 py-8 h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
        <div className="md:col-span-1 bg-white p-8">
          <div className="text-center mb-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-200"
            />
            <h1 className="text-2xl font-bold text-purple-800 mb-2">{user.username}</h1>
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              <span>{user.email}</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Joined on {new Date(user.joinDate).toLocaleDateString()}
            </div>
            <p className="text-gray-700">{user.bio}</p>
          </div>
          <button
            onClick={() => navigate('/update-profile')}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-200 flex items-center justify-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Profile
          </button>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-800">
              <Trophy className="w-5 h-5 mr-2" />
              Quizzes Created
            </h2>
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              <ul className="space-y-2">
                {user.quizzesCreated.map((quiz) => (
                  <li key={quiz.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{quiz.title}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-4">{quiz.plays} plays</span>
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-800">
              <Book className="w-5 h-5 mr-2" />
              Quizzes Taken
            </h2>
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              <ul className="space-y-2">
                {user.quizzesTaken.map((quiz) => (
                  <li key={quiz.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{quiz.title}</span>
                    <div className="text-sm">
                      <span className="text-green-600 font-semibold mr-2">{quiz.score}</span>
                      <span className="text-gray-500">{quiz.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

