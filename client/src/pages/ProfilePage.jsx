import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Edit, Trophy, Book, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../lib/apiRequest'


function ProfilePage() {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)
  const [user,setUser] = useState({
    avatar: '',
    username: '',
    email: '',
    joinDate: '',
    bio: '',
    quizzesCreated: [],
    quizzesTaken: [],
  })

  const fetchData = async()=>{
    const res = await apiRequest.get('/user/profile');
    const data = res.data;
    setUser({
      ...data,
      quizzesCreated: data.quizzesCreated || [],
      quizzesTaken: data.quizzesTaken || [],
    });
  }

  useEffect(()=>{
    fetchData()
  },[])


  const handleDeleteQuiz = async (quizId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this quiz?");
      if (!confirmed) return;
  
      const response = await apiRequest.delete(`/quiz/delete/${quizId}`);
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          quizzesCreated: prevUser.quizzesCreated.filter((quiz) => quiz.id !== quizId),
        }));
        fetchData()
        alert("Quiz deleted successfully!");

      } else {
        alert("Failed to delete the quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("An error occurred while deleting the quiz.");
    }
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
            onClick={() => navigate('/profile/update')}
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
                  <li key={quiz._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{quiz.title}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-4">{quiz.plays} plays</span>
                      <button
                        onClick={() => handleDeleteQuiz(quiz._id)}
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
                {user.quizzesTaken.length>0 && user.quizzesTaken.map((quiz) => (
                  quiz.quiz && quiz.quiz.title ? (
                  <li key={quiz._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{quiz.quiz.title}</span>
                    <div className="text-sm">
                      <span className="text-green-600 font-semibold mr-2">{quiz.score}/{quiz.totalQuestions}</span>
                      <span className="text-gray-500">
                          {new Date(quiz.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            })
                          }
                      </span>
                    </div>
                  </li>
                  ) : null
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

