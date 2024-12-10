import React from 'react'

export default function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
        <div className="text-purple-600 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-purple-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
