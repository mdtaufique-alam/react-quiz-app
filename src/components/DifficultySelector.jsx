import React from 'react'
import { Check } from 'lucide-react'

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: 'Perfect for beginners',
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Balanced challenge',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      description: 'For experts only',
      color: 'bg-red-100 text-red-700 border-red-200'
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-h3 text-center mb-6">Select Difficulty Level</h3>
      
      <div className="grid gap-3">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            onClick={() => onDifficultyChange(difficulty.value)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover-scale ${
              selectedDifficulty === difficulty.value
                ? `${difficulty.color} border-current`
                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">{difficulty.label}</div>
                <div className="text-sm opacity-75">{difficulty.description}</div>
              </div>
              {selectedDifficulty === difficulty.value && (
                <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Pro Tip</h4>
            <p className="text-caption">
              Start with Medium difficulty to get a balanced experience. 
              You can always adjust based on your performance!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DifficultySelector