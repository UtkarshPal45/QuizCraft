 import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar';
import ExplorePage from './pages/ExplorePage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import TakeQuizPage from './pages/TakeQuizPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/quizDetails" element={<QuizDetailsPage/>} />
          <Route path="/takeQuiz" element={<TakeQuizPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App
