import React, { useState, useEffect } from 'react'
import { Trophy, Star, Award, Crown } from 'lucide-react'

const HighScores = ({ currentScore, totalQuestions, difficulty, onClose }) => {
  const [scores, setScores] = useState([])
  const [isNewHighScore, setIsNewHighScore] = useState(false)

  useEffect(() => {
    loadScores()
    checkNewHighScore()
  }, [currentScore, totalQuestions, difficulty])

  const loadScores = () => {
    const savedScores = localStorage.getItem('quizHighScores')
    if (savedScores) {
      setScores(JSON.parse(savedScores))
    }
  }

  const checkNewHighScore = () => {
    const percentage = (currentScore / totalQuestions) * 100
    const newScore = {
      score: currentScore,
      total: totalQuestions,
      percentage: Math.round(percentage),
      difficulty,
      date: new Date().toISOString(),
      timestamp: Date.now()
    }

    const savedScores = JSON.parse(localStorage.getItem('quizHighScores') || '[]')
    const isNewHigh = savedScores.length < 10 || 
      savedScores.some(s => s.percentage < percentage) ||
      savedScores.length === 0

    setIsNewHighScore(isNewHigh)

    if (isNewHigh) {
      saveScore(newScore)
    }
  }

  const saveScore = (newScore) => {
    const savedScores = JSON.parse(localStorage.getItem('quizHighScores') || '[]')
    savedScores.push(newScore)
    savedScores.sort((a, b) => b.percentage - a.percentage)
    savedScores.splice(10) // Keep only top 10
    
    localStorage.setItem('quizHighScores', JSON.stringify(savedScores))
    setScores(savedScores)
  }

  const clearScores = () => {
    localStorage.removeItem('quizHighScores')
    setScores([])
  }

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Crown className="w-5 h-5 text-yellow-500" />
      case 1: return <Award className="w-5 h-5 text-gray-400" />
      case 2: return <Award className="w-5 h-5 text-amber-600" />
      default: return <Star className="w-4 h-4 text-gray-400" />
    }
  }

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-yellow-600'
      case 1: return 'from-gray-300 to-gray-500'
      case 2: return 'from-amber-500 to-amber-700'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">High Scores</h2>
                <p className="text-blue-100">Your quiz achievements</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
          {isNewHighScore && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-green-600 text-2xl">🎉</div>
                <div>
                  <h3 className="font-semibold text-green-800">New High Score!</h3>
                  <p className="text-green-700 text-sm">
                    You scored {currentScore}/{totalQuestions} ({Math.round((currentScore/totalQuestions)*100)}%) on {difficulty} difficulty
                  </p>
                </div>
              </div>
            </div>
          )}

          {scores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No scores yet</h3>
              <p className="text-gray-500">Complete a quiz to see your high scores here!</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Top Performances</h3>
                <button
                  onClick={clearScores}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              {scores.map((score, index) => (
                <div
                  key={score.timestamp}
                  className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    index === 0 ? 'border-yellow-300 bg-yellow-50 shadow-lg' : 'border-gray-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${getRankColor(index)} shadow-sm`}>
                      {getRankIcon(index)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-800 text-lg">
                          #{index + 1}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize font-medium">
                          {score.difficulty}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">
                        {score.score}/{score.total} ({score.percentage}%)
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(score.date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 font-medium">Score</div>
                      <div className="text-2xl font-bold text-blue-600">{score.score}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default HighScores
