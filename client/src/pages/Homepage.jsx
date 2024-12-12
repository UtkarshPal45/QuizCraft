import React from 'react';
import { Brain, Users, PenTool, Zap } from 'lucide-react';
import CustomButton from '../components/CustomButton';
import FeatureCard from '../components/FeatureCard';


function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800 font-sans">
      
      <main className="pt-16">
        <section className="container mx-auto px-12 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-purple-800 leading-tight">Craft Your Knowledge, Quiz by Quiz</h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-3xl mx-auto leading-relaxed">Join our community of learners and creators. Revise concepts, learn new terms, and contribute your own quizzes.</p>
          <div className="flex justify-center space-x-4">
            <CustomButton size="lg">Start Quizzing</CustomButton>
            <CustomButton size="lg" variant="outline">Create a Quiz</CustomButton>
          </div>
        </section>

        <section className="container mx-auto px-24 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Brain className="w-12 h-12 mb-4" />}
              title="Learn Anything"
              description="Explore a wide range of topics and subjects through interactive quizzes."
            />
            <FeatureCard 
              icon={<Users className="w-12 h-12 mb-4" />}
              title="Community Driven"
              description="Join a vibrant community of learners and quiz creators."
            />
            <FeatureCard 
              icon={<PenTool className="w-12 h-12 mb-4" />}
              title="Create & Share"
              description="Craft your own quizzes and share your knowledge with others."
            />
            <FeatureCard 
              icon={<Zap className="w-12 h-12 mb-4" />}
              title="Daily Challenges"
              description="Test your skills with our daily quizzes and track your progress."
            />
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-md pb-1 -mt-3">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2023 QuizCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

