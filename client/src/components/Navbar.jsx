import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';


function Navbar() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li><Link to="/" className="font-bold text-xl text-purple-800">QuizCraft</Link></li>
          <li className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <Link to="/explore" className="hover:text-purple-600">Explore</Link>
            <Link to="/categories" className="hover:text-purple-600">Categories</Link>
            <Link to="/create" className="hover:text-purple-600">Create Quiz</Link>
            <Link to="/daily" className="hover:text-purple-600">Daily Quiz</Link>
          </li>
          <li className="flex space-x-2">
            <CustomButton variant="outline">Login</CustomButton>
            <CustomButton>Sign Up</CustomButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

