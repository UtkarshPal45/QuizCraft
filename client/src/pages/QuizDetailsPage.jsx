import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Book } from 'lucide-react';

function QuizDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real application, you would fetch the quiz details using the id
  const quizDetails = {
    id: id,
    title: 'Sample Quiz',
    description: 'This is a sample quiz description. It covers various topics and is designed to test your knowledge on different subjects.',
    difficulty: 'Medium',
    categories: ['Science', 'History'],
    questionCount: 10,
    duration: 15, // in minutes
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${id}/take`);
  };

  return (
    <div className="container mt-16 mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">{quizDetails.title}</h1>
        <p className="text-gray-600 mb-6">{quizDetails.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <span className="font-semibold mr-2">Difficulty:</span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              quizDetails.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              quizDetails.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {quizDetails.difficulty}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Categories:</span>
            <div className="flex flex-wrap gap-1">
              {quizDetails.categories.map(category => (
                <span key={category} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Book className="mr-2" />
            <span>{quizDetails.questionCount} Questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span>{quizDetails.duration} Minutes</span>
          </div>
        </div>
        
        <button
          onClick={handleStartQuiz}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200 text-lg font-semibold"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizDetailsPage;