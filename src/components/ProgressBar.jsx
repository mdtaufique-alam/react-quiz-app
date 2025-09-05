import React from 'react'
import { Target } from 'lucide-react'

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100

  return (
    <div className="card-gradient">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-2 rounded-lg">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Progress</h3>
          <p className="text-sm text-gray-600">Keep going!</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Question {current}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Started</span>
          <span>{current} of {total} completed</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
