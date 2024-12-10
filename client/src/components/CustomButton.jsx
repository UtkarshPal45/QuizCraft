import React from 'react'

export default function CustomButton({ children, className, variant, size, ...props }) {
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
