import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight} from 'lucide-react'
import categories  from '../lib/categories';
import quizData from '../dummydata';
import QuizCard from '../components/QuizCard';
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

function ExplorePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(9);

  useEffect(() => {
    const fetchQuizzes = async () => {
    //   const response = await fetch('https://api.example.com/quizzes');
    //   const data = await response.json();
      setQuizzes(quizData);
      setFilteredQuizzes(quizData);
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const results = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(quiz.category)) &&
      (selectedDifficulty === '' || quiz.difficulty === selectedDifficulty)
    );
    setFilteredQuizzes(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedDifficulty, quizzes]);

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    
  };

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedDifficulty('');
    setCategorySearch('');
  };

  return (
    <div className="container mx-auto mt-16 px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Section */}
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
              <Filter className="mr-2" /> Filters
            </h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-purple-600">Categories</h3>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Search categories"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div className="max-h-48 overflow-y-auto pr-2">
                {filteredCategories.map(category => (
                  <label key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 form-checkbox text-purple-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-purple-600">Difficulty</h3>
              {DIFFICULTIES.map(difficulty => (
                <label key={difficulty} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty}
                    checked={selectedDifficulty === difficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="mr-2 form-radio text-purple-600"
                  />
                  <span className="text-sm">{difficulty}</span>
                </label>
              ))}
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-md hover:bg-purple-200 transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Quiz Display Area */}
        <div className="md:w-3/4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search for quizzes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 pr-4 text-gray-900 border rounded-lg outline-none focus:ring-2 focus:ring-purple-300"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Quiz Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentQuizzes.map(quiz => (
              <QuizCard quiz={quiz}/>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-purple-100 text-purple-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              {currentPage > 1 && (
                <button onClick={() => paginate(currentPage - 1)} className="px-3 py-1 rounded bg-purple-100 text-purple-700">
                  {currentPage - 1}
                </button>
              )}
              <button className="px-3 py-1 rounded bg-purple-600 text-white">
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <button onClick={() => paginate(currentPage + 1)} className="px-3 py-1 rounded bg-purple-100 text-purple-700">
                  {currentPage + 1}
                </button>
              )}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-purple-100 text-purple-700 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;

