import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apiRequest from '../lib/apiRequest';
import Clock from '../components/Clock';
import { AuthContext } from '../context/AuthContext';

function TakeQuizPage() {
  const {currentUser} =useContext(AuthContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const [quiz,setQuiz] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(900); // Default 15 minutes
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get(`/quiz/${id}`);
        setQuiz(res.data)
        setQuizQuestions(res.data.questions);
        setQuizTitle(res.data.title);
        setTimeLimit(res.data.timeLimit*60 || 900); // Use the quiz time limit or default to 15 minutes
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    fetchData();
  }, [id]);


  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleClearSelection = (questionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: null });
  };

  const handleNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentQuestion(prevQuestion => Math.min(prevQuestion + 1, quizQuestions.length - 1));
    } else {
      setCurrentQuestion(prevQuestion => Math.max(prevQuestion - 1, 0));
    }
  };

  const handleSubmit = async () => {
    //calculate score
    const score = quizQuestions.reduce((acc, question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const res = await apiRequest.post('/quiz/submit',{
      quizId: id,
      username: currentUser.username,
      score
    })
    setQuizScore(score);
    setShowSubmitPopup(true);
  };

  const handleClosePopup = () => {
    setShowSubmitPopup(false);
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="container mt-16 mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-purple-800">Quiz: {quizTitle}</h1>
          <Clock initialTime={timeLimit} handleSubmit={handleSubmit} />
        </div>

        <div className="flex space-x-6">
          {/* Question navigation */}
          <div className="w-1/5 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Questions</h2>
            <div className="grid grid-cols-4 gap-2">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`p-2 rounded-md ${
                    currentQuestion === index
                      ? 'bg-purple-600 text-white'
                      : selectedAnswers[quizQuestions[index].id]
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current question */}
          <div className="w-4/5">
            {quizQuestions.length > 0 && quizQuestions[currentQuestion] ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">{quizQuestions[currentQuestion].question}</h2>
                <div className="space-y-2">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <label key={index} className="flex items-center p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors duration-150">
                      <input
                        type="radio"
                        name={`question-${quizQuestions[currentQuestion].id}`}
                        value={option}
                        checked={selectedAnswers[quizQuestions[currentQuestion].id] === option}
                        onChange={() => handleAnswerSelect(quizQuestions[currentQuestion].id, option)}
                        className="mr-3"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => handleClearSelection(quizQuestions[currentQuestion].id)}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Clear Selection
                  </button>
                  <div>
                    <button
                      onClick={() => handleNavigation('prev')}
                      disabled={currentQuestion === 0}
                      className="mr-2 p-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors duration-150"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={() => handleNavigation('next')}
                      disabled={currentQuestion === quizQuestions.length - 1}
                      className="p-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors duration-150"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-200 text-lg font-semibold"
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {showSubmitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{quizTitle}</h2>
            <p className="mb-2">Number of Questions: {quizQuestions.length}</p>
            <p className="mb-4">Your Score: {quizScore} / {quizQuestions.length}</p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeQuizPage;

