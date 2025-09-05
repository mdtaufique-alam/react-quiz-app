import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const Timer = ({ timeLimit = 30, onTimeUp, isActive = true, questionNumber }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    if (!isActive) return

    // Simple countdown timer - decrements every second
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp() // Trigger time up callback
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, onTimeUp])

  useEffect(() => {
    setTimeLeft(timeLimit)
    setIsWarning(timeLeft <= 10)
  }, [questionNumber, timeLimit])

  useEffect(() => {
    setIsWarning(timeLeft <= 10)
  }, [timeLeft])

  const progress = (timeLeft / timeLimit) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="card-gradient">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg transition-colors ${
          isWarning ? 'bg-red-500' : 'bg-accent-500'
        }`}>
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Time Remaining</h3>
          <p className="text-sm text-gray-600">
            {isWarning ? 'Hurry up!' : 'Take your time'}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-center">
          <div className={`text-3xl font-bold transition-colors ${
            isWarning ? 'text-red-600' : 'text-gray-800'
          }`}>
            {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              isWarning 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-accent-500 to-accent-600'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {isWarning && (
          <div className="text-center">
            <span className="text-sm text-red-600 font-medium animate-pulse">
              ⚠️ Time running out!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Timer
