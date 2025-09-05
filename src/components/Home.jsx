import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Trophy, Clock, Users, Settings } from 'lucide-react'
import DifficultySelector from './DifficultySelector'

const Home = () => {
  const navigate = useNavigate()
  const [showDifficultySelector, setShowDifficultySelector] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium')

  const startQuiz = () => {
    navigate('/quiz', { state: { difficulty: selectedDifficulty } })
  }

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl fade-in">
        {/* Desktop Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          <div className="max-w-md mx-auto md:max-w-none">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Quiz Challenge
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Test your knowledge with engaging questions
          </p>
        </div>

        {/* Features - Responsive */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-gray-700 mb-1">Quick</h3>
            <p className="text-xs text-gray-500">Fast quizzes</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <Trophy className="w-5 h-5 text-blue-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-gray-700 mb-1">Track</h3>
            <p className="text-xs text-gray-500">Your progress</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-gray-700 mb-1">For All</h3>
            <p className="text-xs text-gray-500">Everyone</p>
          </div>
          
          {/* Additional features for desktop */}
          <div className="hidden md:block bg-gray-50 rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-5 h-5 bg-blue-600 rounded-full mx-auto mb-2"></div>
            <h3 className="text-xs font-medium text-gray-700 mb-1">Smart</h3>
            <p className="text-xs text-gray-500">Scoring</p>
          </div>
          
          <div className="hidden md:block bg-gray-50 rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-5 h-5 bg-blue-600 rounded-full mx-auto mb-2"></div>
            <h3 className="text-xs font-medium text-gray-700 mb-1">Timer</h3>
            <p className="text-xs text-gray-500">Per question</p>
          </div>
          
          <div className="hidden md:block bg-gray-50 rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-5 h-5 bg-blue-600 rounded-full mx-auto mb-2"></div>
            <h3 className="text-xs font-medium text-gray-700 mb-1">Levels</h3>
            <p className="text-xs text-gray-500">Difficulty</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center space-y-4">
          <button
            onClick={startQuiz}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-lg"
          >
            Start Quiz
          </button>
          
          <button
            onClick={() => setShowDifficultySelector(!showDifficultySelector)}
            className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Choose Difficulty
          </button>
          
          {showDifficultySelector && (
            <div className="mt-4">
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
              />
            </div>
          )}
        </div>

        {/* Additional Info - Responsive */}
        <div className="mt-8 text-center">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">How it works</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-xs text-gray-600">
              <div>
                <div className="font-medium text-blue-600 mb-1">1. Answer</div>
                <p>Choose options</p>
              </div>
              <div>
                <div className="font-medium text-blue-600 mb-1">2. Track</div>
                <p>See progress</p>
              </div>
              <div>
                <div className="font-medium text-blue-600 mb-1">3. Results</div>
                <p>Get feedback</p>
              </div>
              {/* Additional steps for desktop */}
              <div className="hidden md:block">
                <div className="font-medium text-blue-600 mb-1">4. Learn</div>
                <p>Insights</p>
              </div>
              <div className="hidden md:block">
                <div className="font-medium text-blue-600 mb-1">5. Score</div>
                <p>Smart points</p>
              </div>
              <div className="hidden md:block">
                <div className="font-medium text-blue-600 mb-1">6. Repeat</div>
                <p>Keep learning</p>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
