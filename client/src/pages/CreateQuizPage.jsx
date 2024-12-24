import React, { useState } from 'react';
import { Plus, Minus, Check, Search } from 'lucide-react';
import categories from '../lib/categories';
import apiRequest from '../lib/apiRequest'; 

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

function CreateQuizPage() {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    difficulty: '',
    categories: [],
    questions: [{ question: '', options: ['', '', '', ''], correctOption: '' }],
    timeLimit: 15 //default
  });

  const [categorySearch, setCategorySearch] = useState('');
  const [showPopup, setShowPopup] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setQuizData(prevData => {
      const updatedCategories = prevData.categories.includes(category)
        ? prevData.categories.filter(c => c !== category)
        : [...prevData.categories, category].slice(0, 6);
      return { ...prevData, categories: updatedCategories };
    });
  };

  const handleQuestionChange = (index, field, value, optionIndex = null) => {
    setQuizData(prevData => {
      const updatedQuestions = [...prevData.questions];
      if (field === 'options') {
        updatedQuestions[index].options[optionIndex] = value;
      } else {
        updatedQuestions[index][field] = value;
      }
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    setQuizData(prevData => ({
      ...prevData,
      questions: [...prevData.questions, { question: '', options: ['', '', '', ''], correctOption: '' }]
    }));
  };

  const removeQuestion = (index) => {
    setQuizData(prevData => ({
      ...prevData,
      questions: prevData.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await apiRequest.post('/quiz/create', quizData)
      setShowPopup(true);
    } catch (error) {
      console.log(error)
    }
  };

  const handleClosePopup = () => { // Added handleClosePopup function
    setShowPopup(false);
    setQuizData({
      title: '',
      description: '',
      categories: [],
      difficulty: '',
      questions: [{ question: '', options: ['', '', '', ''], correctOption: '' }],
      timeLimit: 15,
    });
  };

  const isFormValid = () => {
    return (
      quizData.title &&
      quizData.description &&
      quizData.difficulty &&
      quizData.categories.length > 0 &&
      quizData.questions.every(q => 
        q.question && 
        q.options.every(opt => opt.trim() !== '') &&
        q.correctOption
      ) && 
      quizData.timeLimit
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">Create a New Quiz</h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={quizData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={quizData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 h-32 resize-none overflow-auto"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={quizData.timeLimit}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                min="1"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex space-x-4">
                {DIFFICULTIES.map(difficulty => (
                  <label key={difficulty} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty}
                      checked={quizData.difficulty === difficulty}
                      onChange={handleInputChange}
                      className="form-radio text-purple-600"
                      required
                    />
                    <span className="ml-2">{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories (Select up to 6)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search categories"
                  className="w-full p-2 pr-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 mb-2"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
                <Search className="absolute right-2 top-2 text-gray-400" size={20} />
              </div>
              <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                {categories
                  .filter(category => category.toLowerCase().includes(categorySearch.toLowerCase()))
                  .map(category => (
                    <label key={category} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={quizData.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="form-checkbox text-purple-600"
                        disabled={quizData.categories.length >= 6 && !quizData.categories.includes(category)}
                      />
                      <span className="ml-2 text-sm">{category}</span>
                    </label>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
          {quizData.questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Enter question"
                required
              />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleQuestionChange(index, 'options', e.target.value, optionIndex)}
                    className="flex-grow p-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />
                  <input
                    type="radio"
                    name={`correctOption-${index}`}
                    value={optionIndex}
                    checked={question.correctOption === optionIndex.toString()}
                    onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
                    className="form-radio text-purple-600"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center justify-center w-full p-2 border border-purple-300 rounded-md text-purple-600 hover:bg-purple-50"
          >
            <Plus size={20} className="mr-2" /> Add Question
          </button>
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Quiz
        </button>
      </form>
      {showPopup && ( // Added popup component
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Quiz Submitted Successfully</h2>
            <button
              onClick={handleClosePopup}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateQuizPage;

