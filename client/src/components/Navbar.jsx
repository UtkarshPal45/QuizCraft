import React from 'react';
import { Link } from 'react-router-dom';

function CustomButton({ children, className, variant, size, ...props }) {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantStyles = {
    default: "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg"
  };
  const sizeStyles = {
    default: "h-10 py-2 px-4",
    lg: "h-12 px-8 text-lg"
  };

  const buttonClass = `${baseStyle} ${variantStyles[variant || 'default']} ${sizeStyles[size || 'default']} ${className || ''}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}

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

