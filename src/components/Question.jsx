import React from 'react'
import { CheckCircle, Circle } from 'lucide-react'

const Question = ({ question, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions }) => {
  if (!question) return null

  const handleOptionClick = (optionIndex) => {
    onAnswerSelect(question.id, optionIndex)
  }

  const handleKeyDown = (event, optionIndex) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOptionClick(optionIndex)
    }
  }

  return (
    <div className="flex-1 flex flex-col space-y-4">
      {/* Question Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
          <span>{question.category}</span>
          <span className="text-blue-500">•</span>
          <span className="capitalize">{question.difficulty}</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 leading-relaxed px-2">
          {question.question}
        </h2>
      </div>

      {/* Answer Options - Responsive */}
      <div className="space-y-2 md:space-y-3 flex-1">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-full p-4 md:p-5 text-left rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer font-medium ${
                isSelected ? 'border-blue-500 bg-blue-50 text-blue-700' : ''
              }`}
              aria-pressed={isSelected}
              role="radio"
              aria-label={`Option ${index + 1}: ${option}`}
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isSelected ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span className="text-base font-medium">{option}</span>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Minimal progress indicator */}
      <div className="pt-2">
        <div className="text-center text-xs text-gray-500">
          {selectedAnswer !== undefined ? 'Answer selected ✓' : 'Select an answer to continue'}
        </div>
      </div>
    </div>
  )
}

export default Question
