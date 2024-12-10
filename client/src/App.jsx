 import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar';

function App() {
  console.log("yo")
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App
