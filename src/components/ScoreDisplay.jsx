import React from 'react'
import { Trophy, Star } from 'lucide-react'

const ScoreDisplay = ({ score, total }) => {
  const percentage = total > 0 ? (score / total) * 100 : 0
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-500 to-green-600'
    if (percentage >= 60) return 'from-yellow-500 to-yellow-600'
    if (percentage >= 40) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Outstanding! 🌟'
    if (percentage >= 80) return 'Excellent! 🎉'
    if (percentage >= 70) return 'Great job! 👏'
    if (percentage >= 60) return 'Good work! 👍'
    if (percentage >= 50) return 'Not bad! 😊'
    return 'Keep trying! 💪'
  }

  return (
    <div className="card-gradient">
      <div className="flex items-center gap-3 mb-4">
        <div className={`bg-gradient-to-r ${getScoreColor()} p-2 rounded-lg`}>
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Current Score</h3>
          <p className="text-sm text-gray-600">{getScoreMessage()}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {score} / {total}
          </div>
          <div className="text-sm text-gray-600">
            {Math.round(percentage)}% correct
          </div>
        </div>
        
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, index) => {
            const filled = index < Math.floor(percentage / 20)
            return (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  filled ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            )
          })}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-full bg-gradient-to-r ${getScoreColor()} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay
