import React from 'react'
import { Clock, Book } from 'lucide-react'

//change quiz.questionCount & duartion according to schema
export default function QuizCard({quiz}) {
  
  return (
    <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
        <h3 className="text-xl font-semibold mb-2 text-purple-700">{quiz.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{quiz.description}</p>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{quiz.category}</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {quiz.difficulty}
                </span>
            </div>
                <div className="flex justify-between items-center">
                  <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 text-sm">
                    Start Quiz
                  </button>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{quiz.duration} mins</span>
                    <Book className="w-4 h-4 ml-3 mr-1" />
                    <span>{quiz.questionCount} Qs</span>
                  </div>
             </div>
    </div>
  )
}
