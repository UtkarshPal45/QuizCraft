import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

function TakeQuizPage() {
  const timeLimit = 900
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimit); // 15 minutes in seconds

  // In a real application, you would fetch the quiz questions using the id
  const quizQuestions = [
    { id: 1, question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'] },
    { id: 2, question: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'] },
    { id: 3, question: 'What is the smallest planet in our solar system?', options: ['Earth', 'Venus', 'Mercury', 'Mars'] },
    { id: 4, question: 'Who wrote "Hamlet"?', options: ['Shakespeare', 'Hemingway', 'Dickens', 'Tolstoy'] },
    { id: 5, question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Pb', 'Fe'] },
    { id: 6, question: 'Which country is known as the Land of the Rising Sun?', options: ['China', 'Japan', 'Korea', 'Thailand'] },
    { id: 7, question: 'What is the square root of 64?', options: ['6', '8', '10', '12'] },
    { id: 8, question: 'What is the main ingredient in guacamole?', options: ['Tomato', 'Onion', 'Avocado', 'Pepper'] },
    { id: 9, question: 'Who is the author of "1984"?', options: ['George Orwell', 'Aldous Huxley', 'F. Scott Fitzgerald', 'J.D. Salinger'] },
    { id: 10, question: 'Which gas do plants use for photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'] },
    { id: 11, question: 'How many continents are there?', options: ['5', '6', '7', '8'] },
    { id: 12, question: 'What is the largest mammal on Earth?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'] },
    { id: 13, question: 'What is the capital of Italy?', options: ['Rome', 'Florence', 'Venice', 'Milan'] },
    { id: 14, question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Jupiter', 'Saturn', 'Venus'] },
    { id: 15, question: 'What is the freezing point of water in Celsius?', options: ['0', '32', '100', '212'] },
    { id: 16, question: 'Who discovered gravity?', options: ['Einstein', 'Newton', 'Galileo', 'Curie'] },
    { id: 17, question: 'Which element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'] },
    { id: 18, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'] },
    { id: 19, question: 'Who is known as the Father of Computers?', options: ['Alan Turing', 'Charles Babbage', 'John von Neumann', 'Ada Lovelace'] },
    { id: 20, question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'] },
    { id: 21, question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Diamond', 'Iron', 'Quartz'] },
    { id: 22, question: 'Who wrote "Pride and Prejudice"?', options: ['Jane Austen', 'Charlotte Bronte', 'Mary Shelley', 'Emily Dickinson'] },
    { id: 23, question: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '250,000 km/s'] },
    { id: 24, question: 'Which country is famous for the Eiffel Tower?', options: ['Italy', 'France', 'Germany', 'Spain'] },
    { id: 25, question: 'What is the largest desert in the world?', options: ['Sahara', 'Gobi', 'Antarctic', 'Kalahari'] },
    { id: 26, question: 'Who is the CEO of Tesla?', options: ['Elon Musk', 'Bill Gates', 'Steve Jobs', 'Larry Page'] },
    { id: 27, question: 'Which organ is responsible for pumping blood in the human body?', options: ['Liver', 'Heart', 'Brain', 'Kidney'] },
    { id: 28, question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'] },
    { id: 29, question: 'Who painted "Starry Night"?', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Monet'] },
    { id: 30, question: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Saturn', 'Uranus'] }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLimit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

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

  const handleSubmit = () => {
    // Handle quiz submission here
    console.log('Selected Answers:', selectedAnswers);
  };

  return (
    <div className="container mt-16 mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-purple-800">Quiz: {id}</h1>
          <div className="flex items-center">
            <Clock className="mr-2 text-purple-600" />
            <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
          </div>
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
    </div>
  );
}

export default TakeQuizPage;