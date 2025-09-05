import React from 'react'
import { Zap, Target, Brain } from 'lucide-react'

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = [
    {
      id: 'easy',
      name: 'Easy',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      description: 'Perfect for beginners',
      timeLimit: 20
    },
    {
      id: 'medium',
      name: 'Medium',
      icon: Target,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Balanced challenge',
      timeLimit: 30
    },
    {
      id: 'hard',
      name: 'Hard',
      icon: Brain,
      color: 'from-red-500 to-red-600',
      description: 'For the experts',
      timeLimit: 45
    }
  ]

  return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Choose Difficulty</h2>
        <p className="text-sm text-gray-600">Select your challenge level</p>
      </div>
      
      <div className="space-y-2">
        {difficulties.map((difficulty) => {
          const Icon = difficulty.icon
          const isSelected = selectedDifficulty === difficulty.id
          
          return (
            <button
              key={difficulty.id}
              onClick={() => onDifficultyChange(difficulty.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-800">{difficulty.name}</h3>
                    {isSelected && (
                      <span className="text-blue-600 text-xs font-medium">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{difficulty.timeLimit}s • {difficulty.id === 'easy' ? '7' : difficulty.id === 'medium' ? '9' : '10'} questions</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2">
          <div className="text-blue-600 text-sm">💡</div>
          <div>
            <h4 className="font-medium text-blue-800 text-xs mb-1">Pro Tip</h4>
            <p className="text-blue-700 text-xs">
              Higher difficulty = more challenging questions and less time. Score weighted accordingly!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DifficultySelector
