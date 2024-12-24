import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../lib/apiRequest';

function Navbar() {
  const {currentUser, updateUser} = useContext(AuthContext)

  const logout = async ()=>{
    try {
      const res= await apiRequest.post('/auth/logout')
      updateUser(null)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li className="hidden md:flex space-x-6">
            <Link to="/" className="font-bold text-xl text-purple-800">QuizCraft</Link>
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <Link to="/explore" className="hover:text-purple-600">Explore</Link>
            <Link to="/create-quiz" className="hover:text-purple-600">Create Quiz</Link>
            <Link to="/daily" className="hover:text-purple-600">Daily Quiz</Link>
          </li>
          <li className="flex space-x-2 items-center">
            {currentUser ? (
              <>
                <Link to="/profile" className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold mr-2">
                    {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.username} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        currentUser.username.charAt(0)
                      )
                    }
                  </div>
                  <span className="text-purple-800 font-medium">{currentUser.username}</span>
                </Link>
                <CustomButton variant="outline" onClick={logout}>Logout</CustomButton>
              </>
            ) : (
              <>
                <Link to="/login">
                  <CustomButton variant="outline">Login</CustomButton>
                </Link>
                <Link to="/signup">
                  <CustomButton>Sign Up</CustomButton>
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

